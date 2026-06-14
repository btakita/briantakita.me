---
title: "The lazily Architecture: One Reactive Graph from Local Memory to the Network"
description: "A full-architecture tour of lazily — the reactive core (Context, Cell, Slot, Signal, Effect), the three execution contexts (single-threaded, thread-safe, async), the Snapshot/Delta wire protocol that carries the same graph state across IPC, WebSocket, WebRTC, and FFI, and the cross-language family. With use cases and diagrams."
date: 2026-06-14
featured: true
tags:
  - lazily
  - reactive-signals
  - rust
  - architecture
  - distributed-systems
  - signals
---

# The lazily Architecture

Most reactive libraries are one box: a dependency graph that lives in one process, on one thread, in one language. [lazily](https://crates.io/crates/lazily) is built as four stacked layers that share one idea — **a node is dirty until something needs it** — and carry that idea outward from a single thread all the way to a remote peer over WebRTC.

This post is the wide-angle tour. If you want the deep dive on the lazy/eager primitive composition specifically, read the [Slot → Cell → Signal post](https://briantakita.me/posts/lazily-slot-cell-signal-composition); here we zoom out to the whole stack.

```
┌─────────────────────────────────────────────────────────────┐
│  Layer 4 — Cross-language family                             │
│  lazily-rs · lazily-zig · lazily-py   (one wire protocol)   │
├─────────────────────────────────────────────────────────────┤
│  Layer 3 — Wire plane                                        │
│  Snapshot / Delta  ·  FFI · IPC · WebSocket · WebRTC        │
├─────────────────────────────────────────────────────────────┤
│  Layer 2 — Execution contexts                               │
│  Context (1 thread) · ThreadSafeContext · AsyncContext     │
├─────────────────────────────────────────────────────────────┤
│  Layer 1 — Reactive core                                    │
│  Context · Cell · Slot · Signal · Effect                   │
└─────────────────────────────────────────────────────────────┘
```

Each layer is optional. You can use Layer 1 alone as an in-memory reactive cache and never touch the rest. But because every layer speaks the same model, a value you derived on one thread can be serialized, permission-filtered, and mirrored onto a browser tab across the internet without rewriting your graph.

## Layer 1 — the reactive core

Five primitives, all owned by a `Context`:

- **Context** — owns the dependency graph and all reactive state. The "world" for a set of computations; in a web framework it maps to a request scope or component tree.
- **Cell** — a mutable input, the source of truth. `cell.set()` only invalidates dependents when the value actually changes (a `PartialEq` guard).
- **Slot** — a *lazy* derived value (`ctx.computed` / `ctx.memo`). It auto-discovers its dependencies (anything it reads while computing) and recomputes only when read. Invalidation just marks it dirty.
- **Signal** — an *eager* derived value (`ctx.signal`). It recomputes the instant a dependency invalidates — before the write returns — so observers never see an unset window (`v1 → v2`, no flicker).
- **Effect** — a side-effect callback that runs immediately, tracks what it reads, and reruns after those dependencies change. Can return a cleanup closure.

```rust
use lazily::Context;

let ctx = Context::new();
let counter = ctx.cell(0i32);

let doubled = ctx.computed(|ctx| counter.get(ctx) * 2); // lazy
let live    = ctx.signal(|ctx| counter.get(ctx) + 1);   // eager

counter.set(&ctx, 5);
assert_eq!(doubled.get(&ctx), 10); // recomputes on read
assert_eq!(live.get(&ctx), 6);     // already materialized
```

Three properties hold across the whole core:

- **Dynamic dependencies** — edges are re-discovered on every recompute. Conditional branches that read different Cells update the graph automatically. No stale subscriptions, no manual cleanup.
- **Memo guard** — a `ctx.memo()` whose recompute produces an equal value suppresses downstream dirtying and effect reruns.
- **Diamond glitch-freedom + batching** — `D = f(A, g(A))` never surfaces a mixed new-`A`/old-`g(A)` intermediate, and writes inside `ctx.batch(...)` settle to one consistent flush when the outermost batch exits.

The thing worth noting architecturally: `Signal` is not a second engine. It's a memoized Slot plus a small puller `Effect` that re-reads the slot after every invalidation. So eager values *inherit* the memo guard, glitch-freedom, and batch coalescing of the lazy core for free.

```
 Cell ──(set)──► invalidate dependents
   │
   ├──► Slot   : marked dirty, recompute on next get   (pull)
   └──► Signal : puller Effect re-reads NOW            (push)
                 └─ memo slot underneath → glitch-free
```

## Layer 2 — execution contexts

The same primitives, the same `Slot → Cell → Signal` progression, exposed over three execution models:

- **`Context`** (single-threaded) — the fast path. `RefCell`-backed, mutex-free, slot-id-indexed contiguous storage, thread-local dependency tracking. Zero mandatory runtime dependencies.
- **`ThreadSafeContext`** — one reactive graph shared across OS threads, requiring `Send + Sync + 'static`. The graph lock is released *before* user callbacks run, so callbacks can re-enter the same context without deadlocking; in-flight recompute waiters park on per-slot generation `Condvar` sidecars and a completion only wakes waiters for that slot. If a slot is invalidated mid-compute, the stale result is discarded and the getter retries.
- **`AsyncContext`** (feature-gated) — `signal_async`, `get_signal` (non-blocking `Option<T>` snapshot), and `get_signal_async` (awaits an up-to-date value), backed by `memo_async` + an async puller effect.

Two honest caveats on the async path, both documented in the spec:

- **Eagerness is runtime-driven** — resolution is async, so the puller drives the recompute to completion on the runtime *shortly after* the write, not synchronously within it.
- **Propagation isn't memo-suppressed on an equal recompute** — async invalidation force-reruns effect dependents on every upstream change. The value stays correct and no glitch value is ever observed, but the run-count isn't suppressed the way the sync graph suppresses it.

```
 single-thread ──► ThreadSafeContext ──► AsyncContext
   RefCell           Mutex + Condvar        memo_async + async puller
   mutex-free        Send + Sync            runtime-driven eagerness
        └──────── same API, same semantics ───────┘
```

## Layer 3 — the wire plane

This is where lazily stops being "a library" and becomes "a distributable model." The core idea: **don't ship live Rust contexts, closures, or typed handles across a boundary. Ship two message types.**

- **`IpcMessage::Snapshot`** — the full graph state (nodes + edges) at an epoch.
- **`IpcMessage::Delta`** — sequential ops (set value, invalidate, add/remove edge) advancing the epoch.

An **epoch contract** keeps a consumer consistent: a peer applies deltas in order, and a gap means "request a fresh snapshot." A **permission boundary** filters which nodes a given peer is allowed to see *before* serialization, so the same producer can feed differently-scoped consumers.

Crucially, an eager `Signal` needs **no new wire type**. Only its backing memo slot is graph state, so it serializes as an ordinary slot node — already materialized, so it always emits a concrete value on change rather than a bare invalidate. Remote peers consume signals from an eager producer with zero protocol changes.

The same Snapshot/Delta pair rides every transport:

- **FFI (C ABI)** — an opaque `LazilyFfiChannel` with Rust-owned byte buffers; every accepted frame is re-encoded as canonical `IpcMessage` JSON, so FFI callers share the exact state plane as everyone else.
- **IPC** — Unix socket / pipe / local TCP.
- **WebSocket** — frames carry the same messages to a browser.
- **WebRTC data channel** — the `Str0mNet` backend (built on [str0m](https://github.com/algesten/str0m)'s sans-IO ICE/DTLS/SCTP) carries Snapshot/Delta peer-to-peer, with a Cloudflare Worker for signaling/peer discovery. The localhost two-socket round trip already exercises the real UDP/DTLS/SCTP/timer path in-process.

```
           ┌── permission filter ──┐
 Context ──┤                       ├── Snapshot/Delta ──┬─ FFI (C ABI)
 (Layer 1) │  per-peer scoping     │   (epoch-ordered)  ├─ IPC socket
           └───────────────────────┘                    ├─ WebSocket
                                                         └─ WebRTC (Str0mNet)
                                                                  │
                                                          signaling Worker
                                                          (peer discovery)
```

Transport code owns framing, memory ownership, reliability, and back-pressure. lazily semantics live entirely in the shared message schema — which is what lets the next layer exist.

## Layer 4 — the cross-language family

lazily is implemented three times with shared semantics, all speaking the same Snapshot/Delta protocol:

| | lazily-rs | lazily-zig | lazily-py |
|---|---|---|---|
| Context | owned struct | explicit allocator | plain `dict` |
| Slot creation | `Box<dyn Fn>` | `comptime` fn ptrs | lambdas |
| Cell equality | `PartialEq` | `std.meta.eql` | `!=` |
| Thread safety | explicit `ThreadSafeContext` | mutex by default | GIL |

Because the wire plane is the contract, a Rust host can derive state and a Python or Zig peer can mirror it — or vice versa — with no shared memory and no FFI of live objects. The languages agree on *messages*, not on *implementations*.

## Use cases across the stack

- **Backend request pipeline (Layer 1, lazy).** A handler exposes 50 derived values; a given request reads 5. Lazy Slots compute exactly those 5 — no manual gating, no wasted work.
- **Live dashboard (Layer 2, eager).** A widget bound to `derived_total` must never render a blank frame waiting for a read to "wake" the value. An eager Signal keeps it materialized; the UI always pulls a current value.
- **Multi-threaded compute graph (Layer 2, thread-safe).** One reactive graph shared across a thread pool, with re-entrant callbacks and per-slot recompute parking — no global recompute storm.
- **Cross-process / cross-host mirror (Layer 3).** Derive on the server, push permission-filtered Snapshot/Delta to a browser over WebSocket or peer-to-peer over WebRTC. The consumer reconstructs the graph and reads it like a local one.
- **Polyglot system (Layer 4).** A Rust service and a Python tool share derived state over IPC without either embedding the other's runtime.

## Takeaway

lazily's design bet is that **one consistency model should scale across boundaries** rather than being reinvented at each one. Lazy-by-default eliminates wasted work in memory; eager Signals give you no-flicker UI values *in the same graph*; the Snapshot/Delta protocol carries that exact graph across threads, processes, hosts, and languages without sharing live objects. You pick lazy or eager per value, single-threaded or shared or async per context, and local or networked per transport — and it's the same model the whole way down.

```bash
cargo add lazily
```

Source: [lazily-rs on GitHub](https://github.com/btakita/lazily-rs) · [crates.io](https://crates.io/crates/lazily) · companion post: [Slot → Cell → Signal](https://briantakita.me/posts/lazily-slot-cell-signal-composition)
