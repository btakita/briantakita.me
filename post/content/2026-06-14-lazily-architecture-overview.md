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

<figure>
<svg viewBox="0 0 720 304" role="img" aria-label="lazily's four stacked layers, bottom to top: Layer 1 reactive core (Context, Cell, Slot, Signal, Effect); Layer 2 execution contexts (single-thread Context, ThreadSafeContext, AsyncContext); Layer 3 wire plane (Snapshot/Delta over FFI, IPC, WebSocket, WebRTC); Layer 4 cross-language family (lazily-rs, lazily-zig, lazily-py) sharing one wire protocol." xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;max-width:720px;font-family:ui-sans-serif,system-ui,sans-serif">
  <style>
    .lz1-box{fill:rgb(var(--color-card));stroke:rgb(var(--color-border));stroke-width:1.5}
    .lz1-base{fill:rgb(var(--color-card));stroke:rgb(var(--color-accent));stroke-width:2}
    .lz1-tag{fill:rgb(var(--color-accent));font-size:11px;font-weight:700;letter-spacing:.08em}
    .lz1-title{fill:rgb(var(--color-text-base));font-size:16px;font-weight:700}
    .lz1-sub{fill:rgb(var(--color-text-base));opacity:.74;font-size:13px}
  </style>
  <rect class="lz1-box" x="8" y="8" width="704" height="66" rx="8"/>
  <text class="lz1-tag" x="28" y="34">LAYER 4</text>
  <text class="lz1-title" x="28" y="56">Cross-language family</text>
  <text class="lz1-sub" x="300" y="56">lazily-rs · lazily-zig · lazily-py — one wire protocol</text>
  <rect class="lz1-box" x="8" y="82" width="704" height="66" rx="8"/>
  <text class="lz1-tag" x="28" y="108">LAYER 3</text>
  <text class="lz1-title" x="28" y="130">Wire plane</text>
  <text class="lz1-sub" x="300" y="130">Snapshot / Delta · FFI · IPC · WebSocket · WebRTC</text>
  <rect class="lz1-box" x="8" y="156" width="704" height="66" rx="8"/>
  <text class="lz1-tag" x="28" y="182">LAYER 2</text>
  <text class="lz1-title" x="28" y="204">Execution contexts</text>
  <text class="lz1-sub" x="300" y="204">Context (1 thread) · ThreadSafeContext · AsyncContext</text>
  <rect class="lz1-base" x="8" y="230" width="704" height="66" rx="8"/>
  <text class="lz1-tag" x="28" y="256">LAYER 1</text>
  <text class="lz1-title" x="28" y="278">Reactive core</text>
  <text class="lz1-sub" x="300" y="278">Context · Cell · Slot · Signal · Effect</text>
</svg>
</figure>

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

<figure>
<svg viewBox="0 0 720 230" role="img" aria-label="A Cell set invalidates its dependents two ways: a Slot is marked dirty and recomputes lazily on the next get (pull), while a Signal's puller Effect re-reads immediately (push) over a glitch-free memo slot." xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;max-width:720px;font-family:ui-sans-serif,system-ui,sans-serif">
  <defs>
    <marker id="lz2-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" fill="rgb(var(--color-accent))"/>
    </marker>
  </defs>
  <style>
    .lz2-box{fill:rgb(var(--color-card));stroke:rgb(var(--color-border));stroke-width:1.5}
    .lz2-eager{fill:rgb(var(--color-card));stroke:rgb(var(--color-accent));stroke-width:2}
    .lz2-t{fill:rgb(var(--color-text-base));font-size:15px;font-weight:700}
    .lz2-s{fill:rgb(var(--color-text-base));opacity:.74;font-size:12.5px}
    .lz2-lbl{fill:rgb(var(--color-accent));font-size:12px;font-weight:600}
    .lz2-edge{stroke:rgb(var(--color-text-base));stroke-opacity:.55;stroke-width:1.5;fill:none}
  </style>
  <rect class="lz2-box" x="14" y="92" width="120" height="50" rx="8"/>
  <text class="lz2-t" x="74" y="116" text-anchor="middle">Cell</text>
  <text class="lz2-s" x="74" y="133" text-anchor="middle">.set()</text>
  <path class="lz2-edge" d="M134 117 H236" marker-end="url(#lz2-arr)"/>
  <text class="lz2-lbl" x="185" y="106" text-anchor="middle">invalidate</text>
  <path class="lz2-edge" d="M244 110 V60 H440" marker-end="url(#lz2-arr)"/>
  <path class="lz2-edge" d="M244 124 V178 H440" marker-end="url(#lz2-arr)"/>
  <text class="lz2-lbl" x="300" y="52" >pull</text>
  <text class="lz2-lbl" x="300" y="200">push</text>
  <rect class="lz2-box" x="446" y="36" width="260" height="56" rx="8"/>
  <text class="lz2-t" x="464" y="60">Slot</text>
  <text class="lz2-s" x="464" y="80">marked dirty · recompute on next get</text>
  <rect class="lz2-eager" x="446" y="150" width="260" height="62" rx="8"/>
  <text class="lz2-t" x="464" y="176">Signal</text>
  <text class="lz2-s" x="464" y="195">puller Effect re-reads NOW</text>
  <text class="lz2-s" x="464" y="208">memo slot underneath → glitch-free</text>
</svg>
</figure>

## Layer 2 — execution contexts

The same primitives, the same `Slot → Cell → Signal` progression, exposed over three execution models:

- **`Context`** (single-threaded) — the fast path. `RefCell`-backed, mutex-free, slot-id-indexed contiguous storage, thread-local dependency tracking. Zero mandatory runtime dependencies.
- **`ThreadSafeContext`** — one reactive graph shared across OS threads, requiring `Send + Sync + 'static`. The graph lock is released *before* user callbacks run, so callbacks can re-enter the same context without deadlocking; in-flight recompute waiters park on per-slot generation `Condvar` sidecars and a completion only wakes waiters for that slot. If a slot is invalidated mid-compute, the stale result is discarded and the getter retries.
- **`AsyncContext`** (feature-gated) — `signal_async`, `get_signal` (non-blocking `Option<T>` snapshot), and `get_signal_async` (awaits an up-to-date value), backed by `memo_async` + an async puller effect.

Two honest caveats on the async path, both documented in the spec:

- **Eagerness is runtime-driven** — resolution is async, so the puller drives the recompute to completion on the runtime *shortly after* the write, not synchronously within it.
- **Propagation isn't memo-suppressed on an equal recompute** — async invalidation force-reruns effect dependents on every upstream change. The value stays correct and no glitch value is ever observed, but the run-count isn't suppressed the way the sync graph suppresses it.

<figure>
<svg viewBox="0 0 720 210" role="img" aria-label="The same primitives across three execution contexts: single-threaded Context (RefCell, mutex-free), then ThreadSafeContext (Mutex plus Condvar, Send plus Sync), then AsyncContext (memo_async plus async puller, runtime-driven eagerness) — all the same API and semantics." xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;max-width:720px;font-family:ui-sans-serif,system-ui,sans-serif">
  <defs>
    <marker id="lz3-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" fill="rgb(var(--color-accent))"/>
    </marker>
  </defs>
  <style>
    .lz3-box{fill:rgb(var(--color-card));stroke:rgb(var(--color-border));stroke-width:1.5}
    .lz3-t{fill:rgb(var(--color-text-base));font-size:14.5px;font-weight:700;font-family:ui-monospace,SFMono-Regular,Menlo,monospace}
    .lz3-s{fill:rgb(var(--color-text-base));opacity:.74;font-size:12.5px}
    .lz3-cap{fill:rgb(var(--color-accent));font-size:13px;font-weight:600}
    .lz3-edge{stroke:rgb(var(--color-text-base));stroke-opacity:.55;stroke-width:1.5;fill:none}
    .lz3-brace{stroke:rgb(var(--color-accent));stroke-opacity:.5;stroke-width:1.5;fill:none}
  </style>
  <rect class="lz3-box" x="12" y="30" width="210" height="98" rx="8"/>
  <text class="lz3-t" x="117" y="62" text-anchor="middle">Context</text>
  <text class="lz3-s" x="117" y="84" text-anchor="middle">single-thread</text>
  <text class="lz3-s" x="117" y="103" text-anchor="middle">RefCell · mutex-free</text>
  <path class="lz3-edge" d="M222 79 H253" marker-end="url(#lz3-arr)"/>
  <rect class="lz3-box" x="255" y="30" width="210" height="98" rx="8"/>
  <text class="lz3-t" x="360" y="62" text-anchor="middle">ThreadSafeContext</text>
  <text class="lz3-s" x="360" y="84" text-anchor="middle">Mutex + Condvar</text>
  <text class="lz3-s" x="360" y="103" text-anchor="middle">Send + Sync</text>
  <path class="lz3-edge" d="M465 79 H496" marker-end="url(#lz3-arr)"/>
  <rect class="lz3-box" x="498" y="30" width="210" height="98" rx="8"/>
  <text class="lz3-t" x="603" y="62" text-anchor="middle">AsyncContext</text>
  <text class="lz3-s" x="603" y="84" text-anchor="middle">memo_async + async puller</text>
  <text class="lz3-s" x="603" y="103" text-anchor="middle">runtime-driven eagerness</text>
  <path class="lz3-brace" d="M117 144 V160 H603 V144"/>
  <text class="lz3-cap" x="360" y="186" text-anchor="middle">same API · same semantics</text>
</svg>
</figure>

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

<figure>
<svg viewBox="0 0 760 330" role="img" aria-label="A Layer 1 Context passes through a per-peer permission filter, producing epoch-ordered Snapshot/Delta messages that fan out over four transports — FFI (C ABI), IPC socket, WebSocket, and WebRTC (Str0mNet) — with the WebRTC path using a signaling Worker for peer discovery." xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;max-width:760px;font-family:ui-sans-serif,system-ui,sans-serif">
  <defs>
    <marker id="lz4-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" fill="rgb(var(--color-accent))"/>
    </marker>
  </defs>
  <style>
    .lz4-box{fill:rgb(var(--color-card));stroke:rgb(var(--color-border));stroke-width:1.5}
    .lz4-wire{fill:rgb(var(--color-card));stroke:rgb(var(--color-accent));stroke-width:2}
    .lz4-t{fill:rgb(var(--color-text-base));font-size:14px;font-weight:700}
    .lz4-s{fill:rgb(var(--color-text-base));opacity:.74;font-size:12px}
    .lz4-edge{stroke:rgb(var(--color-text-base));stroke-opacity:.55;stroke-width:1.5;fill:none}
  </style>
  <rect class="lz4-box" x="12" y="118" width="130" height="60" rx="8"/>
  <text class="lz4-t" x="77" y="144" text-anchor="middle">Context</text>
  <text class="lz4-s" x="77" y="162" text-anchor="middle">(Layer 1)</text>
  <path class="lz4-edge" d="M142 148 H186" marker-end="url(#lz4-arr)"/>
  <rect class="lz4-box" x="188" y="108" width="168" height="80" rx="8"/>
  <text class="lz4-t" x="272" y="142" text-anchor="middle">permission filter</text>
  <text class="lz4-s" x="272" y="162" text-anchor="middle">per-peer scoping</text>
  <path class="lz4-edge" d="M356 148 H400" marker-end="url(#lz4-arr)"/>
  <rect class="lz4-wire" x="402" y="118" width="156" height="60" rx="8"/>
  <text class="lz4-t" x="480" y="144" text-anchor="middle">Snapshot / Delta</text>
  <text class="lz4-s" x="480" y="162" text-anchor="middle">epoch-ordered</text>
  <path class="lz4-edge" d="M558 148 H588 V40 H608" marker-end="url(#lz4-arr)"/>
  <path class="lz4-edge" d="M588 106 H608" marker-end="url(#lz4-arr)"/>
  <path class="lz4-edge" d="M588 148 H608" marker-end="url(#lz4-arr)"/>
  <path class="lz4-edge" d="M588 148 V214 H608" marker-end="url(#lz4-arr)"/>
  <rect class="lz4-box" x="610" y="20"  width="140" height="40" rx="7"/>
  <text class="lz4-t" x="680" y="45" text-anchor="middle">FFI (C ABI)</text>
  <rect class="lz4-box" x="610" y="86"  width="140" height="40" rx="7"/>
  <text class="lz4-t" x="680" y="111" text-anchor="middle">IPC socket</text>
  <rect class="lz4-box" x="610" y="128" width="140" height="40" rx="7"/>
  <text class="lz4-t" x="680" y="153" text-anchor="middle">WebSocket</text>
  <rect class="lz4-wire" x="610" y="194" width="140" height="40" rx="7"/>
  <text class="lz4-t" x="680" y="219" text-anchor="middle">WebRTC (Str0mNet)</text>
  <path class="lz4-edge" d="M680 234 V282" marker-end="url(#lz4-arr)"/>
  <rect class="lz4-box" x="560" y="284" width="190" height="40" rx="7"/>
  <text class="lz4-t" x="655" y="303" text-anchor="middle">signaling Worker</text>
  <text class="lz4-s" x="655" y="318" text-anchor="middle">peer discovery</text>
</svg>
</figure>

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
