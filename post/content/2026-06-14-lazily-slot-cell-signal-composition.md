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

<figure>
<svg viewBox="0 0 720 270" role="img" aria-label="The Cell to Slot to Signal progression: Cell is a mutable input (source of truth, PartialEq guard); Slot is a lazy derived value (compute-on-read, pull-based, dirty-on-invalidate); Signal is an eager derived value (compute-on-change, push-based, no unset window v1 to v2) — all in one Context and one dependency graph." xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;max-width:720px;font-family:ui-sans-serif,system-ui,sans-serif">
  <defs>
    <marker id="lz5-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" fill="rgb(var(--color-accent))"/>
    </marker>
  </defs>
  <style>
    .lz5-box{fill:rgb(var(--color-card));stroke:rgb(var(--color-border));stroke-width:1.5}
    .lz5-eager{fill:rgb(var(--color-card));stroke:rgb(var(--color-accent));stroke-width:2}
    .lz5-t{fill:rgb(var(--color-text-base));font-size:17px;font-weight:700}
    .lz5-k{fill:rgb(var(--color-accent));font-size:12px;font-weight:600}
    .lz5-s{fill:rgb(var(--color-text-base));opacity:.78;font-size:12.5px}
    .lz5-edge{stroke:rgb(var(--color-text-base));stroke-opacity:.55;stroke-width:1.5;fill:none}
    .lz5-cap{fill:rgb(var(--color-text-base));opacity:.8;font-size:13px;font-weight:600}
  </style>
  <rect class="lz5-box" x="12" y="20" width="206" height="172" rx="8"/>
  <text class="lz5-t" x="115" y="52" text-anchor="middle">Cell</text>
  <text class="lz5-k" x="115" y="72" text-anchor="middle">input</text>
  <text class="lz5-s" x="115" y="106" text-anchor="middle">mutable</text>
  <text class="lz5-s" x="115" y="130" text-anchor="middle">source of truth</text>
  <text class="lz5-s" x="115" y="154" text-anchor="middle">PartialEq guard</text>
  <path class="lz5-edge" d="M218 106 H252" marker-end="url(#lz5-arr)"/>
  <rect class="lz5-box" x="254" y="20" width="206" height="172" rx="8"/>
  <text class="lz5-t" x="357" y="52" text-anchor="middle">Slot</text>
  <text class="lz5-k" x="357" y="72" text-anchor="middle">lazy derived</text>
  <text class="lz5-s" x="357" y="106" text-anchor="middle">compute-on-read</text>
  <text class="lz5-s" x="357" y="130" text-anchor="middle">pull-based</text>
  <text class="lz5-s" x="357" y="154" text-anchor="middle">dirty-on-invalidate</text>
  <path class="lz5-edge" d="M460 106 H494" marker-end="url(#lz5-arr)"/>
  <rect class="lz5-eager" x="496" y="20" width="212" height="172" rx="8"/>
  <text class="lz5-t" x="602" y="52" text-anchor="middle">Signal</text>
  <text class="lz5-k" x="602" y="72" text-anchor="middle">eager derived</text>
  <text class="lz5-s" x="602" y="106" text-anchor="middle">compute-on-change</text>
  <text class="lz5-s" x="602" y="130" text-anchor="middle">push-based</text>
  <text class="lz5-s" x="602" y="154" text-anchor="middle">no unset window (v1 → v2)</text>
  <path class="lz5-edge" d="M115 192 V222 H602 V192"/>
  <text class="lz5-cap" x="360" y="248" text-anchor="middle">one Context · one dependency graph</text>
</svg>
</figure>

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

<figure>
<svg viewBox="0 0 720 180" role="img" aria-label="A lazy Slot: writing the counter marks doubled dirty with no work yet; only reading doubled triggers the recompute to 10." xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;max-width:720px;font-family:ui-sans-serif,system-ui,sans-serif">
  <defs>
    <marker id="lz6-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" fill="rgb(var(--color-accent))"/>
    </marker>
  </defs>
  <style>
    .lz6-box{fill:rgb(var(--color-card));stroke:rgb(var(--color-border));stroke-width:1.5}
    .lz6-go{fill:rgb(var(--color-card));stroke:rgb(var(--color-accent));stroke-width:2}
    .lz6-t{fill:rgb(var(--color-text-base));font-size:14px;font-weight:600;font-family:ui-monospace,SFMono-Regular,Menlo,monospace}
    .lz6-s{fill:rgb(var(--color-text-base));opacity:.7;font-size:12.5px}
    .lz6-edge{stroke:rgb(var(--color-text-base));stroke-opacity:.55;stroke-width:1.5;fill:none}
  </style>
  <rect class="lz6-box" x="12" y="28" width="158" height="46" rx="8"/>
  <text class="lz6-t" x="91" y="56" text-anchor="middle">write counter</text>
  <path class="lz6-edge" d="M170 51 H236" marker-end="url(#lz6-arr)"/>
  <rect class="lz6-box" x="238" y="28" width="178" height="46" rx="8"/>
  <text class="lz6-t" x="327" y="56" text-anchor="middle">doubled: dirty</text>
  <text class="lz6-s" x="446" y="56">…no work yet</text>
  <rect class="lz6-box" x="12" y="106" width="158" height="46" rx="8"/>
  <text class="lz6-t" x="91" y="134" text-anchor="middle">read doubled</text>
  <path class="lz6-edge" d="M170 129 H472" marker-end="url(#lz6-arr)"/>
  <rect class="lz6-go" x="474" y="106" width="190" height="46" rx="8"/>
  <text class="lz6-t" x="569" y="134" text-anchor="middle">recompute → 10</text>
</svg>
</figure>

## Signal: eager derived (no unset window)

A Signal is the eager counterpart. It recomputes the instant a dependency is invalidated, *before* the `set`/`set_cell`/`batch` call returns. The value is always materialized, so a dependency change is observed directly as `v1 → v2`, never as a flicker through an unset state.

```rust
let n = ctx.cell(1);
let doubled = ctx.signal(|ctx| n.get(ctx) * 2); // materialized now: 2
n.set(&ctx, 5);                                  // doubled is already 10
assert_eq!(doubled.get(&ctx), 10);
```

<figure>
<svg viewBox="0 0 720 130" role="img" aria-label="An eager Signal: writing n recomputes the signal immediately, so doubled is already 10 before the set call returns." xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;max-width:720px;font-family:ui-sans-serif,system-ui,sans-serif">
  <defs>
    <marker id="lz7-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" fill="rgb(var(--color-accent))"/>
    </marker>
  </defs>
  <style>
    .lz7-box{fill:rgb(var(--color-card));stroke:rgb(var(--color-border));stroke-width:1.5}
    .lz7-now{fill:rgb(var(--color-card));stroke:rgb(var(--color-accent));stroke-width:2}
    .lz7-t{fill:rgb(var(--color-text-base));font-size:14px;font-weight:600;font-family:ui-monospace,SFMono-Regular,Menlo,monospace}
    .lz7-s{fill:rgb(var(--color-text-base));opacity:.7;font-size:12.5px}
    .lz7-edge{stroke:rgb(var(--color-text-base));stroke-opacity:.55;stroke-width:1.5;fill:none}
  </style>
  <rect class="lz7-box" x="12" y="34" width="120" height="46" rx="8"/>
  <text class="lz7-t" x="72" y="62" text-anchor="middle">write n</text>
  <path class="lz7-edge" d="M132 57 H198" marker-end="url(#lz7-arr)"/>
  <rect class="lz7-now" x="200" y="34" width="220" height="46" rx="8"/>
  <text class="lz7-t" x="310" y="62" text-anchor="middle">recompute signal NOW</text>
  <path class="lz7-edge" d="M420 57 H486" marker-end="url(#lz7-arr)"/>
  <rect class="lz7-box" x="488" y="34" width="160" height="46" rx="8"/>
  <text class="lz7-t" x="568" y="62" text-anchor="middle">doubled: 10</text>
  <text class="lz7-s" x="310" y="102" text-anchor="middle">before set returns</text>
</svg>
</figure>

Notice there is no second step. With a Slot you write, then read to drive the recompute. With a Signal the write *is* the trigger.

## How Signal is composed (not a second engine)

This is the part worth dwelling on. `Signal` does not introduce a new graph, a new scheduler, or a new invalidation path. It is **a memoized Slot plus a small puller Effect**:

<figure>
<svg viewBox="0 0 720 330" role="img" aria-label="A Signal is composed of a glitch-free, pull-based, memo-guarded ctx.memo(compute) plus a puller Effect that re-reads the slot after every invalidation. Both share one Context and one dependency graph with the underlying Cells." xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;max-width:720px;font-family:ui-sans-serif,system-ui,sans-serif">
  <defs>
    <marker id="lz8-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" fill="rgb(var(--color-accent))"/>
    </marker>
  </defs>
  <style>
    .lz8-outer{fill:none;stroke:rgb(var(--color-accent));stroke-width:2}
    .lz8-box{fill:rgb(var(--color-card));stroke:rgb(var(--color-border));stroke-width:1.5}
    .lz8-label{fill:rgb(var(--color-accent));font-size:14px;font-weight:700}
    .lz8-t{fill:rgb(var(--color-text-base));font-size:14.5px;font-weight:700;font-family:ui-monospace,SFMono-Regular,Menlo,monospace}
    .lz8-s{fill:rgb(var(--color-text-base));opacity:.74;font-size:12.5px}
    .lz8-edge{stroke:rgb(var(--color-text-base));stroke-opacity:.6;stroke-width:1.5;fill:none}
    .lz8-cap{fill:rgb(var(--color-text-base));opacity:.78;font-size:12.5px}
  </style>
  <rect class="lz8-outer" x="150" y="16" width="420" height="214" rx="10"/>
  <text class="lz8-label" x="170" y="42">Signal</text>
  <rect class="lz8-box" x="186" y="58" width="348" height="62" rx="8"/>
  <text class="lz8-t" x="360" y="84" text-anchor="middle">ctx.memo(compute)</text>
  <text class="lz8-s" x="360" y="104" text-anchor="middle">glitch-free · pull-based · memo-guarded</text>
  <path class="lz8-edge" d="M360 120 V152" marker-end="url(#lz8-arr)"/>
  <rect class="lz8-box" x="186" y="154" width="348" height="62" rx="8"/>
  <text class="lz8-t" x="360" y="180" text-anchor="middle">puller Effect</text>
  <text class="lz8-s" x="360" y="200" text-anchor="middle">re-reads the slot after every invalidation</text>
  <rect class="lz8-box" x="288" y="276" width="144" height="44" rx="8"/>
  <text class="lz8-t" x="360" y="303" text-anchor="middle">Cells</text>
  <path class="lz8-edge" d="M330 276 V230" marker-end="url(#lz8-arr)"/>
  <path class="lz8-edge" d="M390 230 V276" marker-end="url(#lz8-arr)"/>
  <text class="lz8-cap" x="360" y="252" text-anchor="middle">one shared Context · one dependency graph</text>
</svg>
</figure>

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

Source: [lazily-rs on GitHub](https://github.com/btakita/lazily-rs) · [docs](https://lazily-hub.github.io/lazily-rs/) · [spec](https://lazily-hub.github.io/lazily-spec/) · [crates.io](https://crates.io/crates/lazily)
