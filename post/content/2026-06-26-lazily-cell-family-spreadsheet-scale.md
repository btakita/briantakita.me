---
title: "A Spreadsheet at Google-Sheets Scale: Cell Families and Focused Recompute in lazily-rs"
description: "lazily-rs now backs a full-capacity Google Sheets workbook — 10,000,000 cells — and the part that matters isn't the build time, it's that editing one cell and reading a 1,000-cell viewport costs ~11 microseconds no matter how big the sheet is. This post walks through the two new keyed primitives that make it possible — CellMap and CellFamily — and the lazy pull-based model that recomputes only the cells you focus on, with diagrams of coarse-vs-fine-grained reactivity and the spreadsheet graph."
date: 2026-06-26
featured: true
tags:
  - lazily
  - reactive-signals
  - rust
  - performance
  - benchmarks
  - spreadsheet
  - architecture
---

# A Spreadsheet at Google-Sheets Scale: Cell Families and Focused Recompute in lazily-rs

A spreadsheet is the original reactive program. You type a number into one cell, and formulas scattered across the sheet update themselves. It is the canonical demo for every signals library — and also the canonical place where naive reactivity falls over, because a real sheet has *millions* of cells and you are only ever looking at a few dozen of them.

This post is about two new primitives in [lazily](https://crates.io/crates/lazily) — `CellMap` and `CellFamily` — and a benchmark that drives them at the documented capacity of a Google Sheets workbook: **10,000,000 cells**. The headline isn't that it builds the sheet in under a second (it does). It's that once the sheet exists, editing an input and reading a 1,000-cell viewport costs **~11 microseconds — and stays ~11 µs whether the sheet has one million cells or ten**. That flat line is the whole argument for lazy reactivity, and it falls directly out of recomputing only the cells you *focus* on.

If you haven't met the library before, the [architecture tour](https://briantakita.me/posts/lazily-architecture-overview) covers the core graph — `Cell → Slot → Signal → Effect`, all owned by a `Context`. Everything below builds on those primitives.

## The problem: a collection is not a cell

The obvious way to model a sheet of values in a signals library is one cell holding the whole collection:

```rust
let sheet = ctx.cell(HashMap::<CellId, f64>::new());
```

This is *coarse*. Every single-entry edit replaces the whole map, so the `PartialEq` guard sees a different `HashMap` and invalidates **every** reader of the cell — even readers that only ever touched one entry. Over a wire (lazily speaks a Snapshot/Delta sync protocol), it's worse: one keystroke re-sends the entire map.

<figure>
<svg viewBox="0 0 720 250" role="img" aria-label="Coarse reactivity: a single Cell holds the whole HashMap. Setting one entry replaces the whole map, which invalidates every reader — reader A, reader B, and reader C — even though each reader only used one key." xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;max-width:720px;font-family:ui-sans-serif,system-ui,sans-serif">
  <defs>
    <marker id="lzcf1-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" fill="rgb(var(--color-accent))"/>
    </marker>
  </defs>
  <style>
    .lzcf1-box{fill:rgb(var(--color-card));stroke:rgb(var(--color-border));stroke-width:1.5}
    .lzcf1-hot{fill:rgb(var(--color-card));stroke:rgb(var(--color-accent));stroke-width:2}
    .lzcf1-t{fill:rgb(var(--color-text-base));font-size:14px;font-weight:700}
    .lzcf1-s{fill:rgb(var(--color-text-base));opacity:.74;font-size:12px}
    .lzcf1-lbl{fill:rgb(var(--color-accent));font-size:11.5px;font-weight:600}
    .lzcf1-edge{stroke:rgb(var(--color-text-base));stroke-opacity:.55;stroke-width:1.5;fill:none}
  </style>
  <rect class="lzcf1-box" x="12" y="100" width="150" height="50" rx="8"/>
  <text class="lzcf1-t" x="87" y="122" text-anchor="middle">set entry 'a'</text>
  <text class="lzcf1-s" x="87" y="139" text-anchor="middle">replaces whole map</text>
  <path class="lzcf1-edge" d="M162 125 H250" marker-end="url(#lzcf1-arr)"/>
  <rect class="lzcf1-hot" x="252" y="95" width="200" height="60" rx="8"/>
  <text class="lzcf1-t" x="352" y="120" text-anchor="middle">Cell&lt;HashMap&lt;K,V&gt;&gt;</text>
  <text class="lzcf1-s" x="352" y="138" text-anchor="middle">one node, whole collection</text>
  <rect class="lzcf1-box" x="540" y="18" width="166" height="46" rx="8"/>
  <text class="lzcf1-t" x="623" y="40" text-anchor="middle">reader A</text>
  <text class="lzcf1-s" x="623" y="56" text-anchor="middle">uses key 'a'</text>
  <rect class="lzcf1-box" x="540" y="102" width="166" height="46" rx="8"/>
  <text class="lzcf1-t" x="623" y="124" text-anchor="middle">reader B</text>
  <text class="lzcf1-s" x="623" y="140" text-anchor="middle">uses key 'b'</text>
  <rect class="lzcf1-box" x="540" y="186" width="166" height="46" rx="8"/>
  <text class="lzcf1-t" x="623" y="208" text-anchor="middle">reader C</text>
  <text class="lzcf1-s" x="623" y="224" text-anchor="middle">uses key 'c'</text>
  <path class="lzcf1-edge" d="M452 112 H500 V41 H540" marker-end="url(#lzcf1-arr)"/>
  <path class="lzcf1-edge" d="M452 125 H540" marker-end="url(#lzcf1-arr)"/>
  <path class="lzcf1-edge" d="M452 138 H500 V209 H540" marker-end="url(#lzcf1-arr)"/>
  <text class="lzcf1-lbl" x="498" y="80" text-anchor="middle">invalidates ALL readers</text>
</svg>
</figure>

Editing entry `a` wakes up readers B and C for no reason. At spreadsheet scale that is the difference between an interactive sheet and a spinning beachball.

## CellMap: fine-grained, keyed reactivity

`CellMap<K, V>` is a hash collection whose **membership is itself reactive**, with one independently-tracked value cell per entry. Each entry is its own `CellHandle<V>`, so a reader that depends on entry `a` is *not* invalidated when entry `b` changes — only that entry's own dependents recompute.

```rust
use lazily::{CellMap, Context};

let ctx = Context::new();
let scores: CellMap<&'static str, i32> = CellMap::new(&ctx);
let alice = scores.entry(&ctx, "alice", 10);
let bob   = scores.entry(&ctx, "bob", 20);

// A computed over the whole collection recomputes only on *membership* change.
let n = ctx.computed({
    let scores = scores.clone();
    move |ctx| scores.len(ctx)
});
assert_eq!(ctx.get(&n), 2);

// Mutating an existing entry does NOT change membership — `n` is untouched.
alice.set(&ctx, 11);
assert_eq!(ctx.get(&n), 2);
assert_eq!(bob.get(&ctx), 20);
```

Two things are tracked separately:

- **Per-entry value** — each key's `CellHandle<V>` has its own dependents. Editing `alice` invalidates only readers of `alice`.
- **Membership** — a dedicated version cell bumps only when keys are *added or removed*, so `keys()` / `len()` readers recompute on structural change, not on every value edit.

<figure>
<svg viewBox="0 0 720 286" role="img" aria-label="Fine-grained reactivity: each entry is its own Cell. Setting entry 'a' invalidates only reader A; readers B and C are untouched. A separate membership version cell drives len() and keys() readers and bumps only when keys are inserted or removed." xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;max-width:720px;font-family:ui-sans-serif,system-ui,sans-serif">
  <defs>
    <marker id="lzcf2-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" fill="rgb(var(--color-accent))"/>
    </marker>
    <marker id="lzcf2-arrm" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" fill="rgb(var(--color-text-base))" fill-opacity="0.5"/>
    </marker>
  </defs>
  <style>
    .lzcf2-box{fill:rgb(var(--color-card));stroke:rgb(var(--color-border));stroke-width:1.5}
    .lzcf2-hot{fill:rgb(var(--color-card));stroke:rgb(var(--color-accent));stroke-width:2}
    .lzcf2-t{fill:rgb(var(--color-text-base));font-size:13.5px;font-weight:700}
    .lzcf2-s{fill:rgb(var(--color-text-base));opacity:.7;font-size:11.5px}
    .lzcf2-lbl{fill:rgb(var(--color-accent));font-size:11px;font-weight:600}
    .lzcf2-edge{stroke:rgb(var(--color-accent));stroke-width:1.8;fill:none}
    .lzcf2-dim{stroke:rgb(var(--color-text-base));stroke-opacity:.4;stroke-width:1.4;stroke-dasharray:4 4;fill:none}
  </style>
  <rect class="lzcf2-box" x="12" y="14" width="140" height="46" rx="8"/>
  <text class="lzcf2-t" x="82" y="42" text-anchor="middle">set entry 'a'</text>
  <rect class="lzcf2-hot" x="262" y="12" width="130" height="44" rx="8"/>
  <text class="lzcf2-t" x="327" y="39" text-anchor="middle">Cell 'a'</text>
  <rect class="lzcf2-box" x="262" y="74" width="130" height="44" rx="8"/>
  <text class="lzcf2-t" x="327" y="101" text-anchor="middle">Cell 'b'</text>
  <rect class="lzcf2-box" x="262" y="136" width="130" height="44" rx="8"/>
  <text class="lzcf2-t" x="327" y="163" text-anchor="middle">Cell 'c'</text>
  <rect class="lzcf2-box" x="252" y="206" width="170" height="50" rx="8"/>
  <text class="lzcf2-t" x="337" y="228" text-anchor="middle">membership</text>
  <text class="lzcf2-s" x="337" y="244" text-anchor="middle">version cell</text>
  <rect class="lzcf2-hot" x="540" y="12" width="166" height="44" rx="8"/>
  <text class="lzcf2-t" x="623" y="39" text-anchor="middle">reader A · recompute</text>
  <rect class="lzcf2-box" x="540" y="74" width="166" height="44" rx="8"/>
  <text class="lzcf2-s" x="623" y="101" text-anchor="middle">reader B · untouched</text>
  <rect class="lzcf2-box" x="540" y="136" width="166" height="44" rx="8"/>
  <text class="lzcf2-s" x="623" y="163" text-anchor="middle">reader C · untouched</text>
  <rect class="lzcf2-box" x="540" y="208" width="166" height="46" rx="8"/>
  <text class="lzcf2-t" x="623" y="230" text-anchor="middle">len() / keys()</text>
  <text class="lzcf2-s" x="623" y="246" text-anchor="middle">membership reader</text>
  <path class="lzcf2-edge" d="M152 36 H262" marker-end="url(#lzcf2-arr)"/>
  <text class="lzcf2-lbl" x="207" y="26" text-anchor="middle">only A</text>
  <path class="lzcf2-edge" d="M392 34 H540" marker-end="url(#lzcf2-arr)"/>
  <path class="lzcf2-dim" d="M392 96 H540" marker-end="url(#lzcf2-arrm)"/>
  <path class="lzcf2-dim" d="M392 158 H540" marker-end="url(#lzcf2-arrm)"/>
  <path class="lzcf2-edge" d="M422 231 H540" marker-end="url(#lzcf2-arr)"/>
  <text class="lzcf2-lbl" x="481" y="223" text-anchor="middle">add / remove key</text>
</svg>
</figure>

## CellFamily: a lazy, cached factory of cells

`CellFamily<K, V>` layers a value *factory* on top of `CellMap` — the same idea as Recoil/Jotai's `atomFamily`. You give it a function from key to value, and it lazily mints **and caches** one cell per key on first access:

```rust
use lazily::{CellFamily, Context};

let ctx = Context::new();
// factory: every key starts as key * 2
let fam: CellFamily<u32, u32> = CellFamily::new(&ctx, |&k| k * 2);

let c0 = fam.get(&ctx, 0);   // minted on first access -> 0
let c7 = fam.get(&ctx, 7);   // minted -> 14
assert_eq!(fam.get(&ctx, 7).get(&ctx), 14); // same cell, cached
```

The internals are tiny — `get` is just a cached `entry_with` against the underlying `CellMap`:

```rust
pub fn get(&self, ctx: &Context, key: K) -> CellHandle<V> {
    let factory = Rc::clone(&self.factory);
    let k = key.clone();
    self.map.entry_with(ctx, key, move || factory(&k))
}
```

This is exactly what you want for a spreadsheet: a cell *exists* conceptually for every coordinate, but you only pay to materialize the ones you touch. Storage is a **sparse arena** (`Vec<Option<Node>>` with a free-list) — it allocates only the cells you actually create, never the full grid.

## The benchmark: a 10,000,000-cell sheet

The `scale` benchmark builds a spreadsheet-shaped graph of `N` input cells plus `N` formula slots, where each formula reads two inputs:

```
formula[i] = input[i] + input[i-1]
```

At `N = 1_000_000` that's ~2,000,000 reactive nodes. To model a *full-capacity Google Sheets workbook* (documented limit: 10,000,000 cells), run it at `N = 5_000_000` — 5M inputs + 5M formulas = **10M cells**:

```bash
LAZILY_SCALE_N=5000000 cargo bench --features scale-bench --bench scale
```

A single criterion run on a 186 GB host:

| case | mean | per cell |
|---|---:|---:|
| `build` (10M cells) | ~706 ms | ~71 ns |
| `cold_full_recalc` (5M formulas) | ~518 ms | ~104 ns |
| `full_recalc_invalidate_all` (5M) | ~329 ms | ~66 ns |
| **`viewport_recalc` (1k focused cells)** | **~11.4 µs** | ~11 ns |

Building all ten million cells takes about seven tenths of a second. Recomputing every formula from cold is about half a second. Those are the "you asked for everything, you got everything" numbers.

The last row is the interesting one.

## Focus is the whole game

`viewport_recalc` edits **one** input cell and then reads only a **1,000-cell viewport** — the cells a user can actually see. It costs ~11.4 µs. That is roughly **5,000× cheaper** than a full recalc, and — the part that matters — it is *the same* ~11 µs the benchmark measured at 1M cells. Viewport cost is **independent of sheet size**.

<figure>
<svg viewBox="0 0 760 232" role="img" aria-label="Lazy pull model: editing an input marks dependents dirty in O(1) with no compute. On a later read, focused cells in the viewport recompute on pull at about 11 nanoseconds each, for about 11.4 microseconds over a 1,000-cell viewport, while off-viewport cells stay dirty forever and cost zero work." xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;max-width:760px;font-family:ui-sans-serif,system-ui,sans-serif">
  <defs>
    <marker id="lzcf3-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" fill="rgb(var(--color-accent))"/>
    </marker>
  </defs>
  <style>
    .lzcf3-box{fill:rgb(var(--color-card));stroke:rgb(var(--color-border));stroke-width:1.5}
    .lzcf3-hot{fill:rgb(var(--color-card));stroke:rgb(var(--color-accent));stroke-width:2}
    .lzcf3-t{fill:rgb(var(--color-text-base));font-size:13.5px;font-weight:700}
    .lzcf3-s{fill:rgb(var(--color-text-base));opacity:.72;font-size:11.5px}
    .lzcf3-lbl{fill:rgb(var(--color-accent));font-size:11.5px;font-weight:600}
    .lzcf3-edge{stroke:rgb(var(--color-text-base));stroke-opacity:.55;stroke-width:1.6;fill:none}
  </style>
  <rect class="lzcf3-box" x="10" y="86" width="124" height="56" rx="8"/>
  <text class="lzcf3-t" x="72" y="110" text-anchor="middle">edit input[i]</text>
  <text class="lzcf3-s" x="72" y="127" text-anchor="middle">.set()</text>
  <path class="lzcf3-edge" d="M134 114 H168" marker-end="url(#lzcf3-arr)"/>
  <rect class="lzcf3-box" x="170" y="82" width="180" height="64" rx="8"/>
  <text class="lzcf3-t" x="260" y="108" text-anchor="middle">mark dependents dirty</text>
  <text class="lzcf3-s" x="260" y="126" text-anchor="middle">O(1) flag flip · no compute</text>
  <path class="lzcf3-edge" d="M350 100 H378 V52 H410" marker-end="url(#lzcf3-arr)"/>
  <path class="lzcf3-edge" d="M350 128 H378 V180 H410" marker-end="url(#lzcf3-arr)"/>
  <text class="lzcf3-lbl" x="372" y="48" text-anchor="end">focused</text>
  <text class="lzcf3-lbl" x="372" y="188" text-anchor="end">off-viewport</text>
  <rect class="lzcf3-hot" x="410" y="24" width="338" height="60" rx="8"/>
  <text class="lzcf3-t" x="430" y="48">recompute on pull · ~11 ns/cell</text>
  <text class="lzcf3-s" x="430" y="68">1,000-cell viewport ≈ 11.4 µs (any sheet size)</text>
  <rect class="lzcf3-box" x="410" y="150" width="338" height="58" rx="8"/>
  <text class="lzcf3-t" x="430" y="174">stay dirty forever</text>
  <text class="lzcf3-s" x="430" y="193">never recomputed until read · 0 work</text>
</svg>
</figure>

This is the definition of *lazy* reactivity. An edit doesn't compute anything — it flips dirty flags down the dependency edges in O(1). Work happens on **pull**, when something reads a value. The 9,999,000 formulas you aren't looking at stay dirty and cost nothing. Only the cells you *focus on* — the viewport — pay to recompute, and they pay per-cell, not per-sheet.

Eager reactive systems invert this: an edit pushes recomputation through the whole graph immediately, so cost scales with sheet size whether or not anyone is looking. lazily is lazy by default — Slots mark dirty on invalidation and recompute on access — and only opts into eager evaluation when you explicitly ask with `ctx.signal()`. A spreadsheet is the textbook case where lazy wins: enormous graph, tiny focus.

### What about memory?

Building 2,000,000 nodes uses ~414 MiB RSS — about **216 bytes per node**. Because storage is a sparse arena, capacity is bounded by *populated* cells vs. available RAM (≈ RAM ÷ 216 B), not by the grid's theoretical size. The 186 GB host above could hold on the order of 10⁸–10⁹ populated cells — far past any realistically-filled sheet. And the per-cell cost held roughly constant from 1M → 10M, which is the evidence that the model *extrapolates* rather than degrading at capacity.

## Why this composes

`CellMap` and `CellFamily` aren't a spreadsheet feature — they're the keyed-collection layer that was missing from the core graph. The same fine-grained invalidation that keeps a viewport cheap also keeps a wire-sync protocol cheap: lazily addresses collection entries with wire-stable keys, so a Snapshot/Delta stream sends only the entries that actually changed. A reactive UI cache, a derived-view layer over a database, a holon graph — anything shaped like "a big keyed collection where readers touch a small slice" gets the same flat-line behavior.

The lesson the spreadsheet teaches, made mechanical: **don't recompute what no one is looking at.**

## Try it

```bash
cargo add lazily
# scale benchmark (10M-cell sheet)
LAZILY_SCALE_N=5000000 cargo bench --features scale-bench --bench scale
```

- [lazily on crates.io](https://crates.io/crates/lazily)
- [lazily architecture overview](https://briantakita.me/posts/lazily-architecture-overview)
- [Slot, Cell, Signal: composition](https://briantakita.me/posts/lazily-slot-cell-signal-composition)
- [Reactive primitives done right](https://briantakita.me/posts/lazily-reactive-signals)
