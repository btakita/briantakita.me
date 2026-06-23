---
title: "Reactive State Machines: How lazily-rs Drives agent-doc's Cycle State"
description: "A finite state machine shouldn't be a pile of scattered if-checks. This post shows how lazily-rs's StateMachine primitive — a Cell-backed FSM with a pure transition function and reactive observers — became the single transition authority for agent-doc's per-document cycle state, replacing ad-hoc phase guards with one declared table. With diagrams of the phase graph, the FSM-plus-durable-journal architecture, and how the same reactive graph that runs your UI can run your protocol."
date: 2026-06-23
featured: true
tags:
  - lazily
  - reactive-signals
  - rust
  - state-machine
  - agent-doc
  - architecture
  - concurrency
---

# Reactive State Machines: How lazily-rs Drives agent-doc's Cycle State

A finite state machine is one of the oldest tools in software. So why do so many of them end up as a scattered pile of `if state.phase != Committed` checks pasted across two dozen functions? This post is about a small primitive — [lazily](https://crates.io/crates/lazily)'s `StateMachine` — and how it became the single transition authority for [agent-doc](https://crates.io/crates/agent-doc)'s per-document cycle state, replacing implicit phase guards with one declared table that a compiler can check and a test can exhaust.

If you've read the [lazily architecture tour](https://briantakita.me/posts/lazily-architecture-overview), you know the library is a reactive graph: `Cell → Slot → Signal → Effect`, all owned by a `Context`. The state machine is built *out of those same primitives* — so a transition doesn't just mutate a variable, it invalidates a reactive graph that anyone can observe.

## The bug: a cycle state with no spine

agent-doc drives an AI agent through a response cycle for a markdown session document. Every cycle moves through phases:

```
PreflightStarted → ResponseCaptured → WriteApplied → Committed
                                                       (Abandoned is a terminal)
```

That phase lives in a per-document JSON sidecar on disk (`.agent-doc/state/cycles/<hash>.json`) so a crashed or restarted process can recover. Each phase advance is a public mutator — `mark_response_captured`, `mark_write_applied`, `mark_committed`, plus a swarm of bookkeeping mutators that record pending ids, queue heads, and reaped items.

The problem was that *the legality of a transition was implicit*. It was enforced by:

- a monotonic rank guard (`cycle_phase_rank`) that only knew about the five phases, and
- hand-written `if state.phase != X { return }` checks duplicated across roughly two dozen mutators.

That left two classes of bug:

1. **Terminal regressions.** A bookkeeping `record_*` call landing after `mark_committed` would happily write into an already-closed cycle. Each mutator had to remember to guard against it, and some paths forgot.
2. **Lost updates on the non-phase fields.** The rank guard protected the phase, but the cycle state carries ~30 other fields (pending ids, queue heads, capture hashes). A `mark_committed` racing a `record_pending_done_ids` did load → mutate → save on the same file with no coordination, and one writer's field could silently overwrite the other's.

<figure>
<svg viewBox="0 0 720 300" role="img" aria-label="Two concurrent writers both load the same cycle JSON sidecar, each mutate one field (one sets phase to Committed, the other appends a pending id), and each saves — the second save overwrites the first, losing the committed phase. A load-mutate-save cycle with no transition authority." xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;max-width:720px;font-family:ui-sans-serif,system-ui,sans-serif">
  <defs>
    <marker id="sm1-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" fill="rgb(var(--color-accent))"/>
    </marker>
  </defs>
  <style>
    .sm1-box{fill:rgb(var(--color-card));stroke:rgb(var(--color-border));stroke-width:1.5}
    .sm1-json{fill:rgb(var(--color-card));stroke:rgb(var(--color-accent));stroke-width:1.5;stroke-dasharray:4 3}
    .sm1-t{fill:rgb(var(--color-text-base));font-size:14px;font-weight:700}
    .sm1-s{fill:rgb(var(--color-text-base));opacity:.74;font-size:12px}
    .sm1-mono{fill:rgb(var(--color-text-base));font-size:11.5px;font-family:ui-monospace,SFMono-Regular,Menlo,monospace}
    .sm1-edge{stroke:rgb(var(--color-text-base));stroke-opacity:.55;stroke-width:1.5;fill:none}
    .sm1-bad{stroke:rgb(220,38,38);stroke-opacity:.8;stroke-width:2;fill:none}
  </style>
  <rect class="sm1-json" x="270" y="22" width="180" height="48" rx="8"/>
  <text class="sm1-t" x="360" y="44" text-anchor="middle">cycle.json</text>
  <text class="sm1-s" x="360" y="61" text-anchor="middle">phase: WriteApplied</text>
  <rect class="sm1-box" x="20" y="120" width="240" height="92" rx="8"/>
  <text class="sm1-t" x="140" y="144" text-anchor="middle">writer A: mark_committed</text>
  <text class="sm1-mono" x="34" y="166">load() → phase=WriteApplied</text>
  <text class="sm1-mono" x="34" y="183">set phase=Committed</text>
  <text class="sm1-mono" x="34" y="200">save()</text>
  <rect class="sm1-box" x="460" y="120" width="240" height="92" rx="8"/>
  <text class="sm1-t" x="580" y="144" text-anchor="middle">writer B: record_pending_ids</text>
  <text class="sm1-mono" x="474" y="166">load() → phase=WriteApplied</text>
  <text class="sm1-mono" x="474" y="183">append pending_done_ids</text>
  <text class="sm1-mono" x="474" y="200">save()</text>
  <path class="sm1-edge" d="M360 70 V100 H140 V120" marker-end="url(#sm1-arr)"/>
  <path class="sm1-edge" d="M360 70 V100 H580 V120" marker-end="url(#sm1-arr)"/>
  <path class="sm1-edge" d="M140 212 V242 H360" marker-end="url(#sm1-arr)"/>
  <path class="sm1-bad" d="M580 212 V258 H360" marker-end="url(#sm1-arr)"/>
  <text class="sm1-s" x="360" y="278" text-anchor="middle" style="fill:rgb(220,38,38)">second save clobbers phase=Committed — lost update</text>
</svg>
</figure>

The atomic-rename persist (`#lzsidecaratomic`) already fixed *torn reads* — no reader ever sees a half-written file. But atomic writes don't fix *lost updates* between two complete load → mutate → save cycles. For that you need a transition authority: one place that decides whether an event is legal *before* anyone touches disk.

## The primitive: a Cell-backed state machine

lazily's `StateMachine` is deliberately small. It holds two things: a `CellHandle<S>` for the current state, and a pure transition function `Fn(&S, &E) -> Option<S>`.

```rust
use lazily::{Context, StateMachine};

#[derive(PartialEq, Clone)]
enum Light { Red, Green, Yellow }
enum Tick { Advance }

let ctx = Context::new();
let m = StateMachine::new(&ctx, Light::Red, |s, _: &Tick| match s {
    Light::Red    => Some(Light::Green),
    Light::Green  => Some(Light::Yellow),
    Light::Yellow => Some(Light::Red),
});

m.send(&ctx, Tick::Advance);
assert_eq!(m.state(&ctx), Light::Green);
```

The transition function is the entire machine. `send` evaluates it against the current state; `Some(next)` updates the cell, `None` rejects the event (a guard). That's the whole API surface for mutation.

Three properties fall out for free, because the state lives in a reactive `Cell`:

- **Guards are just `None`.** Illegal transitions are rejected by the transition function returning `None`. There's no separate "can I do this?" layer to keep in sync with the "do this" layer.
- **No-op self-transitions are suppressed.** The underlying `Cell` has a `PartialEq` guard, so a transition that returns `Some(equal_state)` is accepted but doesn't invalidate dependents. That makes duplicate terminal events (like a second `Committed`) idempotent rather than noisy.
- **The state is reactive.** `state_handle()` exposes the backing cell, so any `ctx.computed`, `ctx.signal`, or `ctx.effect` that reads it automatically recomputes when the machine transitions. No manual notification wiring.

<figure>
<svg viewBox="0 0 720 280" role="img" aria-label="A StateMachine holds a CellHandle for state and a pure transition function. send evaluates the transition; Some updates the cell and invalidates a reactive graph of dependents (a Slot, a Signal, an Effect), while None rejects the event with no graph churn. A duplicate Some(equal_state) is accepted but suppressed by the PartialEq cell guard." xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;max-width:720px;font-family:ui-sans-serif,system-ui,sans-serif">
  <defs>
    <marker id="sm2-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" fill="rgb(var(--color-accent))"/>
    </marker>
  </defs>
  <style>
    .sm2-box{fill:rgb(var(--color-card));stroke:rgb(var(--color-border));stroke-width:1.5}
    .sm2-base{fill:rgb(var(--color-card));stroke:rgb(var(--color-accent));stroke-width:2}
    .sm2-t{fill:rgb(var(--color-text-base));font-size:14.5px;font-weight:700}
    .sm2-s{fill:rgb(var(--color-text-base));opacity:.74;font-size:12px}
    .sm2-mono{fill:rgb(var(--color-text-base));font-size:12px;font-family:ui-monospace,SFMono-Regular,Menlo,monospace}
    .sm2-edge{stroke:rgb(var(--color-text-base));stroke-opacity:.55;stroke-width:1.5;fill:none}
    .sm2-rej{stroke:rgb(220,38,38);stroke-opacity:.6;stroke-width:1.5;fill:none;stroke-dasharray:5 3}
  </style>
  <rect class="sm2-base" x="16" y="110" width="200" height="80" rx="8"/>
  <text class="sm2-t" x="116" y="138" text-anchor="middle">StateMachine</text>
  <text class="sm2-mono" x="34" y="160">state: CellHandle&lt;S&gt;</text>
  <text class="sm2-mono" x="34" y="178">transition: Fn(&amp;S,&amp;E)->Option&lt;S&gt;</text>
  <text class="sm2-mono" x="280" y="92">.send(event)</text>
  <path class="sm2-edge" d="M216 138 H300" marker-end="url(#sm2-arr)"/>
  <rect class="sm2-box" x="302" y="112" width="150" height="56" rx="8"/>
  <text class="sm2-t" x="377" y="138" text-anchor="middle">transition()</text>
  <text class="sm2-s" x="377" y="155" text-anchor="middle">pure: current × event</text>
  <path class="sm2-edge" d="M452 132 H500 V86 H540" marker-end="url(#sm2-arr)"/>
  <text class="sm2-s" x="498" y="78">Some(next)</text>
  <path class="sm2-rej" d="M452 148 H500 V200 H540" marker-end="url(#sm2-arr)"/>
  <text class="sm2-s" x="498" y="214" style="fill:rgb(220,38,38)">None → rejected</text>
  <rect class="sm2-box" x="542" y="30" width="166" height="118" rx="8"/>
  <text class="sm2-t" x="625" y="54" text-anchor="middle">Cell updated</text>
  <text class="sm2-s" x="625" y="72" text-anchor="middle">invalidates graph:</text>
  <text class="sm2-s" x="556" y="92">• Slot (lazy recompute)</text>
  <text class="sm2-s" x="556" y="110">• Signal (eager, no flicker)</text>
  <text class="sm2-s" x="556" y="128">• Effect (on_transition)</text>
  <text class="sm2-s" x="556" y="200" style="fill:rgb(var(--color-text-base));opacity:.6">PartialEq guard suppresses</text>
  <text class="sm2-s" x="556" y="216" style="fill:rgb(var(--color-text-base));opacity:.6">equal-state self-transitions</text>
</svg>
</figure>

And because lazily ships the same primitive over three execution contexts, you pick the threading model by picking the type:

- **`StateMachine`** — single-threaded, `RefCell`-backed, the fast path.
- **`ThreadSafeStateMachine`** — `Send + Sync`, shares one reactive graph across OS threads.
- **`AsyncStateMachine`** — Tokio-backed; `send`/`state` stay synchronous (cells are the sync input layer), while observers like `on_transition` use async effects.

## The fix: one transition table

agent-doc's `CyclePhaseMachine` wraps `ThreadSafeStateMachine<CyclePhase, CycleEvent>`. The entire legal lifecycle of a document cycle is now one pure function:

```rust
pub fn transition_phase(current: &CyclePhase, event: &CycleEvent) -> Option<CyclePhase> {
    match event {
        CycleEvent::StartPreflight => Some(CyclePhase::PreflightStarted),
        CycleEvent::ResponseCaptured => match current {
            PreflightStarted | ResponseCaptured => Some(ResponseCaptured),
            WriteApplied | Committed | Abandoned => None,   // no backward edge
        },
        CycleEvent::WriteApplied => match current {
            PreflightStarted | ResponseCaptured | WriteApplied => Some(WriteApplied),
            Committed | Abandoned => None,
        },
        CycleEvent::Committed => match current {
            PreflightStarted | ResponseCaptured | WriteApplied | Committed => Some(Committed),
            Abandoned => None,
        },
        CycleEvent::Abandoned => match current {
            PreflightStarted | ResponseCaptured | WriteApplied => Some(Abandoned),
            Committed | Abandoned => None,                  // terminals are sticky
        },
        // ...recoverable timeouts + bookkeeping
    }
}
```

Every public mutator now routes through that table *first*. A `mark_committed` that lands races-safter a `record_pending_done_ids` no longer fights over fields — both submit a `CycleEvent`, and the table is the sole arbiter of what the phase becomes. A bookkeeping event on an already-`Committed` cycle returns `None` and the mutator becomes a clean no-op, so terminal regressions are rejected at the boundary instead of papered over per-call.

<figure>
<svg viewBox="0 0 760 360" role="img" aria-label="The CyclePhase transition graph. StartPreflight forces PreflightStarted. ResponseCaptured, WriteApplied, and Committed each advance forward and are rejected from terminal states. Abandoned is reachable only from open states and is terminal. Committed is terminal. A duplicate Committed is a stable self-transition suppressed by the cell guard." xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;max-width:760px;font-family:ui-sans-serif,system-ui,sans-serif">
  <defs>
    <marker id="sm3-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" fill="rgb(var(--color-accent))"/>
    </marker>
    <marker id="sm3-no" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" fill="rgb(220,38,38)"/>
    </marker>
  </defs>
  <style>
    .sm3-box{fill:rgb(var(--color-card));stroke:rgb(var(--color-border));stroke-width:1.5}
    .sm3-open{fill:rgb(var(--color-card));stroke:rgb(var(--color-accent));stroke-width:2}
    .sm3-term{fill:rgb(var(--color-card));stroke:rgb(120,120,130);stroke-width:2}
    .sm3-t{fill:rgb(var(--color-text-base));font-size:13.5px;font-weight:700;font-family:ui-monospace,SFMono-Regular,Menlo,monospace}
    .sm3-lbl{fill:rgb(var(--color-accent));font-size:11.5px;font-weight:600}
    .sm3-edge{stroke:rgb(var(--color-text-base));stroke-opacity:.6;stroke-width:1.6;fill:none}
    .sm3-no{stroke:rgb(220,38,38);stroke-opacity:.55;stroke-width:1.4;fill:none;stroke-dasharray:5 3}
  </style>
  <rect class="sm3-open" x="24" y="150" width="150" height="56" rx="8"/>
  <text class="sm3-t" x="99" y="184" text-anchor="middle">PreflightStarted</text>
  <rect class="sm3-open" x="234" y="150" width="150" height="56" rx="8"/>
  <text class="sm3-t" x="309" y="184" text-anchor="middle">ResponseCaptured</text>
  <rect class="sm3-open" x="444" y="150" width="130" height="56" rx="8"/>
  <text class="sm3-t" x="509" y="184" text-anchor="middle">WriteApplied</text>
  <rect class="sm3-term" x="614" y="150" width="130" height="56" rx="8"/>
  <text class="sm3-t" x="679" y="184" text-anchor="middle">Committed</text>
  <rect class="sm3-term" x="234" y="288" width="150" height="56" rx="8"/>
  <text class="sm3-t" x="309" y="322" text-anchor="middle">Abandoned</text>
  <path class="sm3-edge" d="M99 150 V96 H309 V150" marker-end="url(#sm3-arr)"/>
  <text class="sm3-lbl" x="204" y="88" text-anchor="middle">StartPreflight (forced)</text>
  <path class="sm3-edge" d="M174 178 H234" marker-end="url(#sm3-arr)"/>
  <text class="sm3-lbl" x="204" y="170" text-anchor="middle">ResponseCaptured</text>
  <path class="sm3-edge" d="M384 178 H444" marker-end="url(#sm3-arr)"/>
  <text class="sm3-lbl" x="414" y="170" text-anchor="middle">WriteApplied</text>
  <path class="sm3-edge" d="M574 178 H614" marker-end="url(#sm3-arr)"/>
  <text class="sm3-lbl" x="594" y="170" text-anchor="middle">Committed</text>
  <path class="sm3-edge" d="M679 206 V240 H309 V288" marker-end="url(#sm3-arr)"/>
  <text class="sm3-lbl" x="430" y="232">Abandoned (open → terminal)</text>
  <path class="sm3-edge" d="M679 150 V120 H730 V178 H744" marker-end="url(#sm3-arr)"/>
  <text class="sm3-lbl" x="744" y="112">dup = idempotent</text>
  <path class="sm3-no" d="M679 206 C620 260, 420 260, 384 206" marker-end="url(#sm3-no)"/>
  <text class="sm3-lbl" x="500" y="262" style="fill:rgb(220,38,38)">backward = None (rejected)</text>
  <path class="sm3-no" d="M309 288 C360 250, 640 250, 679 206" marker-end="url(#sm3-no)"/>
  <text class="sm3-lbl" x="520" y="278" style="fill:rgb(220,38,38)">terminal → terminal = None</text>
</svg>
</figure>

The crucial design move is what the state machine is *not*. It is not the source of truth. The durable JSON sidecar remains the crash-recovery log — every process can replay it when the controller is absent, stale, or restarting. The state machine is the **pure transition authority**: it answers "is this event legal, and if so what's the next phase?" The sidecar is then appended in one serialized job. Crash recovery seeds the machine from the sidecar on startup; sidecar beats stale memory.

<figure>
<svg viewBox="0 0 760 320" role="img" aria-label="Architecture: a public mutator submits a CycleEvent to the CyclePhaseMachine (a ThreadSafeStateMachine in a ThreadSafeContext). The pure transition table accepts or rejects it. On accept, the in-memory projection updates and the durable sidecar is appended via atomic rename in one serialized job. On reject, the mutator is a clean no-op. On controller restart, the machine is seeded from the sidecar." xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;max-width:760px;font-family:ui-sans-serif,system-ui,sans-serif">
  <defs>
    <marker id="sm4-arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" fill="rgb(var(--color-accent))"/>
    </marker>
    <marker id="sm4-no" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" fill="rgb(220,38,38)"/>
    </marker>
  </defs>
  <style>
    .sm4-box{fill:rgb(var(--color-card));stroke:rgb(var(--color-border));stroke-width:1.5}
    .sm4-fsm{fill:rgb(var(--color-card));stroke:rgb(var(--color-accent));stroke-width:2}
    .sm4-jrn{fill:rgb(var(--color-card));stroke:rgb(120,120,130);stroke-width:2;stroke-dasharray:4 3}
    .sm4-t{fill:rgb(var(--color-text-base));font-size:13.5px;font-weight:700}
    .sm4-s{fill:rgb(var(--color-text-base));opacity:.74;font-size:11.5px}
    .sm4-mono{fill:rgb(var(--color-text-base));font-size:11.5px;font-family:ui-monospace,SFMono-Regular,Menlo,monospace}
    .sm4-edge{stroke:rgb(var(--color-text-base));stroke-opacity:.55;stroke-width:1.5;fill:none}
    .sm4-lbl{fill:rgb(var(--color-accent));font-size:11.5px;font-weight:600}
  </style>
  <rect class="sm4-box" x="16" y="120" width="170" height="80" rx="8"/>
  <text class="sm4-t" x="101" y="146" text-anchor="middle">public mutator</text>
  <text class="sm4-mono" x="32" y="168">mark_committed()</text>
  <text class="sm4-mono" x="32" y="185">record_pending_ids()</text>
  <path class="sm4-edge" d="M186 160 H236" marker-end="url(#sm4-arr)"/>
  <text class="sm4-lbl" x="211" y="152" text-anchor="middle">event</text>
  <rect class="sm4-fsm" x="238" y="110" width="220" height="100" rx="8"/>
  <text class="sm4-t" x="348" y="136" text-anchor="middle">CyclePhaseMachine</text>
  <text class="sm4-s" x="348" y="152" text-anchor="middle">ThreadSafeStateMachine&lt;CyclePhase, CycleEvent&gt;</text>
  <text class="sm4-mono" x="252" y="174">transition_phase()</text>
  <text class="sm4-mono" x="252" y="190">pure: Some(next) | None</text>
  <path class="sm4-edge" d="M458 140 H512 V90 H556" marker-end="url(#sm4-arr)"/>
  <text class="sm4-lbl" x="510" y="82">accept</text>
  <path class="sm4-edge" d="M458 180 H512 V238 H556" marker-end="url(#sm4-no)" stroke="rgb(220,38,38)" stroke-opacity=".55"/>
  <text class="sm4-lbl" x="510" y="254" style="fill:rgb(220,38,38)">reject → no-op</text>
  <rect class="sm4-box" x="558" y="58" width="186" height="78" rx="8"/>
  <text class="sm4-t" x="651" y="84" text-anchor="middle">in-memory projection</text>
  <text class="sm4-s" x="651" y="102" text-anchor="middle">phase + reactive graph</text>
  <text class="sm4-s" x="651" y="120" text-anchor="middle">state_is / on_transition</text>
  <rect class="sm4-jrn" x="558" y="200" width="186" height="78" rx="8"/>
  <text class="sm4-t" x="651" y="226" text-anchor="middle">durable sidecar</text>
  <text class="sm4-s" x="651" y="244" text-anchor="middle">cycles/&lt;hash&gt;.json</text>
  <text class="sm4-s" x="651" y="262" text-anchor="middle">atomic rename · crash log</text>
  <path class="sm4-edge" d="M651 136 V200" marker-end="url(#sm4-arr)"/>
  <text class="sm4-lbl" x="700" y="172">append (serialized)</text>
  <path class="sm4-edge" d="M558 238 C480 300, 360 300, 348 210" marker-end="url(#sm4-arr)" stroke-dasharray="4 3"/>
  <text class="sm4-lbl" x="380" y="296">restart: seed from sidecar</text>
</svg>
</figure>

Splitting "is this legal?" from "persist this" is what makes the concurrency story tractable. The transition table is pure and trivially exhaustively testable — no filesystem, no async, no mocks. The persistence path stays simple — it only ever writes states the table already accepted.

## Reactive observers, not callbacks

Because the phase lives in a lazily cell, observing a transition doesn't mean registering a callback on a custom event bus. It means reading the graph:

```rust
// Eager: true exactly while the cycle is committed.
let done = machine.state_is(&ctx, CyclePhase::Committed);

// on-enter / on-exit from a single observer.
machine.on_transition(&ctx, |old, new| {
    log::info!("cycle {old:?} -> {new:?}");
});
```

`state_is` returns an eager `SignalHandle<bool>` — it always reflects the current phase without a manual read, so a UI or a gate checking "is this cycle still open?" never sees a stale value. `on_transition` is just an `Effect` over the same cell, fired with `(old, new)` so one observer can dispatch per-state enter/exit logic. Both inherit lazily's memo guard and glitch-freedom for free.

This is the payoff of building a state machine *out of* reactive primitives rather than next to them: the same graph that invalidates a derived UI value when a `Cell` changes invalidates a derived gate when the machine transitions. One consistency model, not two.

## Why not just an enum and a match?

You can absolutely write `transition_phase` as a free function over a bare enum and cover most of the value. The reason to reach for the primitive is everything *around* the table:

- **Threading without rewriting.** When the cycle state needed to move off one thread and into a shared controller, the path was changing `StateMachine` to `ThreadSafeStateMachine`. The transition function, the tests, and the observers didn't change — the `Send + Sync` bound is on the wrapper, not on your domain logic.
- **Observers that stay correct under batching.** A `mark_committed` that lands inside a `ctx.batch(...)` settles with every other invalidation in one consistent flush. An `on_transition` effect doesn't fire mid-storm on a half-updated graph.
- **Idempotency from the cell guard.** Terminals are sticky, and a duplicate `Committed` is accepted-but-suppressed because the `PartialEq` cell refuses to invalidate on an equal value. You don't hand-write "is this already the phase?" checks; the primitive does it.

## Takeaway

The cycle-state bug wasn't really about a missing lock or a forgotten `if`. It was about a state machine that had no spine — legality was smeared across two dozen call sites, so it drifted. Giving it a spine meant:

1. **One pure transition table** as the sole authority for what phase comes next.
2. **A durable journal** (the sidecar) that survives crashes and seeds the machine on restart.
3. **Reactive observers** so gates, UI, and logging read the same graph the machine writes.

And because that spine is a lazily `ThreadSafeStateMachine`, it's the same `Cell → Slot → Signal → Effect` model the rest of the system already uses. The state machine isn't a special case bolted onto the reactive library — it's what the reactive library looks like when you only need one cell and a pure function over it.

```bash
cargo add lazily
```

Source: [lazily-rs on GitHub](https://github.com/btakita/lazily-rs) · [docs](https://lazily-hub.github.io/lazily-rs/) · [spec](https://lazily-hub.github.io/lazily-spec/) · [crates.io](https://crates.io/crates/lazily) · companion posts: [lazily architecture](https://briantakita.me/posts/lazily-architecture-overview) · [Slot → Cell → Signal](https://briantakita.me/posts/lazily-slot-cell-signal-composition)
