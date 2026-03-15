---
title: "Lazily: Reactive Signals Done Right — Lazy vs Eager, Context, Slots, and Cells"
description: "Introducing lazily — a multi-language reactive signals library (Rust, Zig, Python) built on lazy invalidation. Deep dive into Context, Slot, Cell, and Signal abstractions, lazy vs eager reactivity, and how proper hydration (code and body) eliminates waste."
date: 2026-03-15
featured: true
tags:
  - lazily
  - reactive-signals
  - rust
  - zig
  - python
  - architecture
  - agent-doc
  - performance
---

# Lazily: Reactive Signals Done Right

[lazily](https://crates.io/crates/lazily) is a multi-language reactive signals library — currently implemented in [Rust](https://crates.io/crates/lazily), [Zig](https://github.com/btakita/lazily-zig), and [Python](https://github.com/btakita/lazily-py). The core idea: **lazy invalidation with automatic dependency tracking**.

Most reactive systems are eager — when a value changes, everything downstream recomputes immediately. Lazily takes the opposite approach: dependents are *cleared* but only recompute when actually accessed. This eliminates wasted computation for values nobody is reading.

## The Four Abstractions

### Context

The **Context** is the container that owns all reactive state. Every Slot, Cell, and their dependency graph lives within a Context.

```rust
let ctx = Context::new();
```

Think of it as the "world" for your reactive computations. In web frameworks, this maps to a request context, an application scope, or a component tree. The Context owns all allocations and manages the dependency graph.

### Cell

A **Cell** is a mutable input value. When you change a Cell, all dependent Slots are *cleared* (not recomputed — cleared).

```rust
let counter = ctx.cell(0i32);

// Read
let value = ctx.get_cell(&counter); // 0

// Write — clears all dependents
ctx.set_cell(&counter, 5);
```

Key behavior: `set_cell` uses `PartialEq` to check if the value actually changed. Setting a Cell to its current value is a no-op — no cascading invalidation. This is a significant optimization in practice.

### Slot

A **Slot** is a lazily-computed cached value with automatic dependency tracking. It has a compute function that runs on first access (or after being cleared).

```rust
let doubled = ctx.slot(|ctx| {
    let val = ctx.get_cell(&counter);
    val * 2
});

// First access: computes 0 * 2 = 0
assert_eq!(ctx.get(&doubled), 0);

// After cell changes: slot is cleared but NOT recomputed
ctx.set_cell(&counter, 5);

// Accessing the slot triggers recomputation: 5 * 2 = 10
assert_eq!(ctx.get(&doubled), 10);
```

**Dependencies are dynamic.** Every time a Slot recomputes, it re-discovers its dependencies from scratch. If your compute function has conditional branches that access different Cells depending on state, the dependency graph updates automatically. No stale subscriptions, no manual cleanup.

### Signal (Future)

A **Signal** would be the eager counterpart to a Slot — recomputing immediately on invalidation rather than waiting for access. This is the classic observable/effect pattern from frameworks like SolidJS, Preact Signals, and Vue's reactivity system.

lazily deliberately starts with Slots (lazy) because:
- Lazy evaluation composes better — you never compute values nobody reads
- Eager evaluation has footguns (infinite loops, glitches, ordering issues)
- You can always build eager on top of lazy (flush all dirty slots), but not the reverse

## Lazy vs Eager Reactivity

This is the fundamental design choice in reactive systems:

| | Lazy (Slots) | Eager (Signals) |
|---|---|---|
| **When does recomputation happen?** | On access (`get`) | Immediately on change |
| **Wasted work** | Zero — only compute what's read | Can compute values nobody uses |
| **Glitch-free** | By construction | Requires topological sorting |
| **Ordering** | Irrelevant — pull-based | Critical — push-based DAG walk |
| **Use case** | Request handling, data pipelines | UI rendering, real-time updates |

### Why lazy wins for most backends

In a web server handling requests, you might have 50 computed values available but any given request only uses 5 of them. With eager reactivity, all 50 recompute on every change. With lazy, only the 5 that are actually accessed compute.

This is why lazily defaults to lazy — it's the correct default for most non-UI applications. The eager mode (Signals) can be added as an opt-in for UI rendering where immediate updates matter.

### The hydration connection

The name "lazily" isn't accidental. **Lazy evaluation is a form of hydration** — you prepare the computation (dehydrate), and only materialize the value when needed (hydrate). This is exactly how server-side rendering works:

1. Server renders HTML (dehydrated state)
2. Browser loads the page (static, no JS yet)
3. Client hydrates — attaches interactivity only where needed

rappstack's [hyop](https://github.com/nicholasgasior/rappstack) system takes this further: sub-1KB hydration that only activates the interactive parts. No full-page rehydration, no virtual DOM diffing. Lazy by design.

## Water Hydration: The Physical Parallel

There's a striking parallel between code hydration and physical hydration. Both are about eliminating waste to maintain energy.

**Proper water hydration eliminates metabolic waste.** When you're dehydrated:
- Metabolic byproducts accumulate (lactic acid, urea, creatinine)
- Blood viscosity increases, reducing oxygen delivery
- Kidneys can't efficiently filter waste
- Cellular energy production (ATP via mitochondria) drops
- You feel tired — not from lack of energy, but from waste accumulation

Research supports this directly:

- **Mild dehydration impairs cognitive function:** A [2012 study in the Journal of Nutrition](https://doi.org/10.3945/jn.111.142000) found that even 1.36% dehydration in young women caused increased fatigue, headaches, and difficulty concentrating.
- **Dehydration reduces exercise performance:** [Cheuvront & Kenefick (2014)](https://doi.org/10.1002/cphy.c130017) showed that 2% body mass loss from dehydration impairs both physical and cognitive performance.
- **Kidney function and waste elimination:** The kidney requires adequate hydration to maintain glomerular filtration rate (GFR). Chronic mild dehydration is linked to increased kidney stone risk and reduced waste clearance ([Clark et al., 2016](https://doi.org/10.1093/ajcn/nqw103)).
- **Blood viscosity and oxygen transport:** Dehydration increases blood viscosity, which reduces tissue oxygenation and increases cardiovascular strain ([Kenefick & Cheuvront, 2012](https://doi.org/10.1249/MSS.0b013e318232cf95)).

**The programming parallel is exact:** Eager reactive systems are like a dehydrated body — they do unnecessary work (waste products) that accumulates and slows everything down. Lazy evaluation is proper hydration — compute only what's needed, eliminate the rest.

## Multi-Language Implementation

lazily is implemented across three languages with shared semantics but idiomatic APIs:

| | [lazily-rs](https://crates.io/crates/lazily) | [lazily-zig](https://github.com/btakita/lazily-zig) | [lazily-py](https://github.com/btakita/lazily-py) |
|---|---|---|---|
| Context | Owned `Context` struct | Explicit allocator | Plain `dict` |
| Slot creation | `Box<dyn Fn>` closures | `comptime` function pointers | Lambdas |
| Cell equality | `PartialEq` trait | `std.meta.eql` | `!=` operator |
| Thread safety | Feature flag | Mutex by default | GIL |
| Storage | Unified generics | `.direct` / `.indirect` | Object identity |

The spec is shared — same dependency tracking algorithm, same invalidation semantics, same lazy-by-default behavior. Tests are cross-validated across implementations.

## Getting Started

```bash
# Rust
cargo add lazily

# Or from source
git clone https://github.com/btakita/lazily-rs
cargo test
```

```rust
use lazily::Context;

let ctx = Context::new();
let name = ctx.cell("world".to_string());
let greeting = ctx.slot(|ctx| {
    format!("Hello, {}!", ctx.get_cell(&name))
});

assert_eq!(ctx.get(&greeting), "Hello, world!");
ctx.set_cell(&name, "lazily".to_string());
assert_eq!(ctx.get(&greeting), "Hello, lazily!");
```

## Links

- [lazily (Rust)](https://crates.io/crates/lazily) — crates.io
- [lazily-zig](https://github.com/btakita/lazily-zig) — Zig implementation
- [lazily-py](https://github.com/btakita/lazily-py) — Python implementation
- [rappstack](https://www.npmjs.com/org/rappstack) — Composable web framework using lazy hydration
- [rmemo](https://www.npmjs.com/package/rmemo) — Reactive memo library
- [agent-doc](https://crates.io/crates/agent-doc) — Built with this tool
