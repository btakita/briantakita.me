---
title: "Slot → Cell → Signal: Composing Lazy and Eager Reactivity in One Graph"
description: "How lazily-rs composes three primitives — Cell, Slot, and Signal — so you can pick lazy (compute-on-read) or eager (recompute-on-change, no unset window) per derived value inside a single dependency graph. With use cases and diagrams."
date: 2026-06-14
featured: true
tags:
  - lazily
  - reactive-signals
  - rust
  - architecture
  - performance
  - signals
---

# Slot → Cell → Signal: Composing Lazy and Eager Reactivity

Most reactive libraries make you pick a side. Either the whole graph is *lazy* (values recompute when you read them) or the whole graph is *eager* (values recompute the moment a dependency changes). [lazily](https://crates.io/crates/lazily) refuses the binary. It exposes three primitives that compose along a single progression — `Cell → Slot → Signal` — and lets you choose lazy or eager *per derived value*, all inside one dependency graph.

This post walks the progression, shows how `Signal` is built by composing the two primitives below it (not by bolting on a second engine), and covers when to reach for each.

## The progression at a glance

```
   Cell                Slot                  Signal
 (input)            (lazy derived)        (eager derived)
   │                     │                     │
 mutable             compute-on-read       compute-on-change
 source of truth     pull-based            push-based
 PartialEq guard     dirty-on-invalidate   no unset window (v1 → v2)
   │                     │                     │
   └─────────── one Context, one dependency graph ───────────┘
```

Each step adds exactly one capability and reuses everything before it:

- **`Cell`** is a mutable input — the source of truth. Writing a Cell marks dependents dirty (a `PartialEq` guard means setting a Cell to its current value is a no-op).
- **`Slot`** is a *lazy* derived value. It tracks its dependencies automatically and recomputes only when read. Invalidation just marks it dirty.
- **`Signal`** is an *eager* derived value. It recomputes the instant a dependency is invalidated — before the invalidating write returns — and is always materialized, so observers never see an intermediate unset value.

The whole point is that the third primitive is **composed from the first two**, not parallel to them.

## Cell: the mutable input

```rust
use lazily::Context;

let ctx = Context::new();
let counter = ctx.cell(0i32);

counter.set(&ctx, 5);    // marks dependents dirty
assert_eq!(counter.get(&ctx), 5);
counter.set(&ctx, 5);    // no-op: PartialEq guard, no cascade
```

A Cell is the only thing you mutate directly. Everything else in the graph is *derived* from Cells.

## Slot: lazy derived (compute on read)

A Slot wraps a compute closure. It discovers its dependencies automatically — anything it reads during computation becomes a dependency — and caches the result. When a dependency changes, the Slot is marked dirty but **does not recompute** until the next read.

```rust
let counter = ctx.cell(0i32);
let doubled = ctx.computed(|ctx| counter.get(ctx) * 2);

assert_eq!(doubled.get(&ctx), 0); // computes now: 0
counter.set(&ctx, 5);             // doubled is dirty, NOT recomputed
assert_eq!(doubled.get(&ctx), 10);// recomputes lazily on read: 10
```

This is the right default for most backend work. If a request handler exposes 50 derived values but a given request reads only 5, lazy evaluation computes 5. Eager evaluation would compute all 50 on every upstream change. Use `ctx.memo()` when the value is `PartialEq` and you want an equal recompute to suppress downstream work.

```
 write counter ──► [doubled: dirty] ........ (no work yet)
                                              │
 read doubled  ─────────────────────────────►│ recompute → 10
```

## Signal: eager derived (no unset window)

A Signal is the eager counterpart. It recomputes the instant a dependency is invalidated, *before* the `set`/`set_cell`/`batch` call returns. The value is always materialized, so a dependency change is observed directly as `v1 → v2`, never as a flicker through an unset state.

```rust
let n = ctx.cell(1);
let doubled = ctx.signal(|ctx| n.get(ctx) * 2); // materialized now: 2
n.set(&ctx, 5);                                  // doubled is already 10
assert_eq!(doubled.get(&ctx), 10);
```

```
 write n ──► recompute signal NOW ──► [doubled: 10]   (before set returns)
```

Notice there is no second step. With a Slot you write, then read to drive the recompute. With a Signal the write *is* the trigger.

## How Signal is composed (not a second engine)

This is the part worth dwelling on. `Signal` does not introduce a new graph, a new scheduler, or a new invalidation path. It is **a memoized Slot plus a small puller Effect**:

```
        ┌──────────────────────────────────────────┐
        │  Signal                                    │
        │                                            │
        │   ctx.memo(compute)   ◄── glitch-free,     │
        │        │                  pull-based,      │
        │        │                  memo-guarded     │
        │        ▼                                   │
        │   puller Effect       ──► re-reads the slot│
        │   (depends on slot)       after every      │
        │                           invalidation     │
        └──────────────────────────────────────────┘
              │                         ▲
              │   one shared Context    │
              ▼   one dependency graph  │
        Cells ───────────────────────────
```

- `ctx.memo(compute)` supplies the value cell with a `PartialEq` guard and **glitch-free, pull-based** recomputation (dependencies refresh depth-first before the value itself).
- A puller `effect` reads the slot after every invalidation. The effect runs eagerly on invalidation, which pulls the memo current — that is the entire source of the eagerness.

Because it reuses the tested core, a Signal **inherits** the core's guarantees for free:

- **Memo guard** — an equal recompute suppresses downstream churn.
- **Diamond glitch-freedom** — `D = f(A, g(A))` never surfaces a mixed new-`A` / old-`g(A)` intermediate. The recompute is depth-first, so `D` only ever takes consistent values.
- **Batch coalescing** — writes inside `ctx.batch(...)` settle to one consistent recomputation when the outermost batch exits, not one per write.

One honest trade-off: the puller effect depends on its own backing slot, so a real value change fires exactly one extra *no-op* puller run (it pulls, finds nothing dirty, returns). It is bounded and does not affect user-facing effect counts.

## Lazy vs eager: when to pick which

| | Slot (lazy) | Signal (eager) |
|---|---|---|
| Recomputes | on read (`get`) | immediately on change |
| Wasted work | zero — only what's read | can compute values nobody reads |
| Value availability | may be dirty between reads | always materialized, no unset window |
| Best for | request handling, data pipelines | UI rendering, live mirrors, always-on values |

You do not choose once for the whole graph. You choose per derived value, and lazy and eager values share the same Context, the same dependency tracking, and the same glitch-free guarantees.

## Use cases

**Backend request pipeline — lazy.** A handler derives auth claims, parsed query, rate-limit budget, serialized response, and dozens of optional fields. Most requests touch a handful. Lazy Slots compute exactly the values that response path reads and skip the rest, with no manual gating.

**Live dashboard / UI rendering — eager.** A widget bound to `derived_total` should never render a blank or stale frame while waiting for a read to "wake" the value. A Signal keeps `derived_total` materialized, so the render layer always pulls a current value and the transition is `v1 → v2` with no flicker.

**Real-time mirror / networked snapshot — eager.** When you serialize derived state to push to a peer (lazily ships an IPC/snapshot layer), an eager Signal guarantees a concrete value exists to send the moment an input changes, rather than a dirty marker that has not been driven yet. The producer is eager; remote consumers need no protocol change because a Signal still appears as an ordinary slot node on the wire.

**Mixed graph — both.** A pricing engine can keep expensive, rarely-read breakdowns lazy while keeping the single headline number eager for the UI. One graph, two strategies, chosen per value.

## Parity across context types

The same `Slot → Cell → Signal` composition holds across all three context flavors:

- **`Context`** (single-threaded) — the fast path, `RefCell`-backed, mutex-free.
- **`ThreadSafeContext`** — one reactive graph shared across threads; Signal adds `Send + Sync` bounds.
- **`AsyncContext`** — `signal_async` backed by `memo_async` + an async puller effect. Two honest caveats here: eagerness is runtime-driven (the puller drives the recompute to completion on the runtime shortly after the write, not synchronously within it), and async propagation is not memo-suppressed on an equal recompute — the value stays correct and no glitch value is ever observed, but the run count is not suppressed.

## Takeaway

Lazy-by-default is the correct default for most non-UI work: you never compute what nobody reads. But "lazy or eager" should not be a library-wide religion. `lazily` makes it a per-value decision by composing eager `Signal` out of lazy `memo` + `effect`, so both modes live in one graph and share one set of correctness guarantees.

```bash
cargo add lazily
```

Source: [lazily-rs on GitHub](https://github.com/btakita/lazily-rs) · [crates.io](https://crates.io/crates/lazily)
