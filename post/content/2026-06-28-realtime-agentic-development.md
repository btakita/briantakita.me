---
title: "Realtime Agentic Development"
description: "Agent harnesses are already becoming realtime development environments. Loops, goals, living specs, salience, and software feedback start to look less like ticket workflows and more like musical looping."
date: 2026-06-28
featured: true
tags:
  - ai-agents
  - agentic-programming
  - agent-doc
  - realtime
  - agile
  - specs
  - developer-tools
  - claude-code
  - codex
  - opencode
---

# Realtime Agentic Development


I keep coming back to this phrase: **realtime agentic development**.

The obvious version is "agents write code faster." That is true, but it is not the interesting part anymore. The interesting part is that the development process itself is becoming realtime. Not just realtime code generation. Realtime specification. Realtime learning. Realtime salience.

Claude Code, Codex, OpenCode, and the harnesses growing around them already exhibit realtime behavior even when they are sitting on top of plain files, terminals, tmux panes, git, and markdown. A `/loop` keeps a session moving. A `/goal` turns a messy backlog into a completion graph. Codex has different mechanics, but a stop hook, a queue, and a persisted document create the same shape: the system does not merely answer once. It keeps sensing, acting, committing, checking, and re-entering.

This changes the unit of software process.

The unit is no longer "write a ticket, implement it, review it." The unit is a live feedback loop where the spec, code, tests, logs, queue, and human attention keep updating each other.

<figure>
<svg viewBox="0 0 760 360" role="img" aria-label="Realtime agentic development loop: sense changes, select the next action, act with agent tools, verify with tests and checks, persist with commits and snapshots, learn into the spec, then continue." xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;max-width:760px;font-family:ui-sans-serif,system-ui,sans-serif">
  <defs>
    <marker id="rad-loop-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" fill="rgb(var(--color-accent))"/>
    </marker>
  </defs>
  <style>
    .rad-loop-box{fill:rgb(var(--color-card));stroke:rgb(var(--color-border));stroke-width:1.5}
    .rad-loop-core{fill:rgb(var(--color-card));stroke:rgb(var(--color-accent));stroke-width:2}
    .rad-loop-title{fill:rgb(var(--color-text-base));font-size:15px;font-weight:700}
    .rad-loop-sub{fill:rgb(var(--color-text-base));opacity:.74;font-size:12px}
    .rad-loop-label{fill:rgb(var(--color-accent));font-size:12px;font-weight:700}
    .rad-loop-edge{stroke:rgb(var(--color-accent));stroke-width:2;fill:none;marker-end:url(#rad-loop-arrow)}
    .rad-loop-soft{stroke:rgb(var(--color-text-base));stroke-opacity:.35;stroke-width:1.3;fill:none;stroke-dasharray:5 5}
  </style>
  <rect class="rad-loop-core" x="282" y="136" width="196" height="86" rx="10"/>
  <text class="rad-loop-title" x="380" y="165" text-anchor="middle">Living Spec</text>
  <text class="rad-loop-sub" x="380" y="185" text-anchor="middle">document + code + queue</text>
  <text class="rad-loop-sub" x="380" y="203" text-anchor="middle">human-editable control surface</text>

  <rect class="rad-loop-box" x="34" y="56" width="158" height="64" rx="8"/>
  <text class="rad-loop-label" x="54" y="82">SENSE</text>
  <text class="rad-loop-sub" x="54" y="103">diffs, logs, signals</text>

  <rect class="rad-loop-box" x="302" y="28" width="158" height="64" rx="8"/>
  <text class="rad-loop-label" x="322" y="54">SELECT</text>
  <text class="rad-loop-sub" x="322" y="75">next action</text>

  <rect class="rad-loop-box" x="568" y="56" width="158" height="64" rx="8"/>
  <text class="rad-loop-label" x="588" y="82">ACT</text>
  <text class="rad-loop-sub" x="588" y="103">agent, tools, edits</text>

  <rect class="rad-loop-box" x="568" y="240" width="158" height="64" rx="8"/>
  <text class="rad-loop-label" x="588" y="266">VERIFY</text>
  <text class="rad-loop-sub" x="588" y="287">tests, checks, proof</text>

  <rect class="rad-loop-box" x="302" y="268" width="158" height="64" rx="8"/>
  <text class="rad-loop-label" x="322" y="294">PERSIST</text>
  <text class="rad-loop-sub" x="322" y="315">commit, snapshot</text>

  <rect class="rad-loop-box" x="34" y="240" width="158" height="64" rx="8"/>
  <text class="rad-loop-label" x="54" y="266">LEARN</text>
  <text class="rad-loop-sub" x="54" y="287">spec, runbook, memory</text>

  <path class="rad-loop-edge" d="M192 86 C230 52 263 44 302 58"/>
  <path class="rad-loop-edge" d="M460 58 C505 44 538 52 568 86"/>
  <path class="rad-loop-edge" d="M647 120 C690 163 690 197 647 240"/>
  <path class="rad-loop-edge" d="M568 274 C532 311 497 317 460 302"/>
  <path class="rad-loop-edge" d="M302 302 C258 318 224 310 192 274"/>
  <path class="rad-loop-edge" d="M113 240 C70 198 70 162 113 120"/>

  <path class="rad-loop-soft" d="M192 88 C246 120 282 140 302 160"/>
  <path class="rad-loop-soft" d="M568 88 C514 120 480 140 458 160"/>
  <path class="rad-loop-soft" d="M648 240 C585 224 523 207 478 190"/>
  <path class="rad-loop-soft" d="M112 240 C175 224 237 207 282 190"/>
</svg>
</figure>

## The Spec Is No Longer Upfront

Traditional spec work assumes a phase boundary. First we figure out what we want, then we build it. Agile softened that boundary by making the plan iterative, but most teams still treat the spec as either a ticket artifact or a meeting artifact. It is upstream of the code.

In an agentic workflow, the spec becomes a live control surface.

A markdown session document can contain:

- a high-level goal
- an exchange history
- a current queue
- a backlog
- a pending checklist
- acceptance criteria
- known failures
- links to runbooks
- code navigation notes
- decisions that must survive context compaction

The document is not a transcript after the fact. It is the place where the work is happening.

When I edit the document, the agent sees the diff. If I delete a paragraph, that deletion is signal. If I rename a backlog item, that rename is signal. If a test failure gets appended by a watcher, that event is signal. If I write "this is not the real issue" next to a previous answer, the agent learns from that correction in place.

That is spec-building in realtime. The specification is not a static description of future software. It is an evolving instrument that the human and agent both play.

## Loops And Goals

The two primitives I keep seeing are loops and goals.

A loop is local continuity. It says: keep moving while the next step is well-defined enough. Run the head of the queue. Check the result. Commit. Continue. Stop only when the queue drains, the invariant breaks, the budget is reached, or the human interrupts.

A goal is global shape. It says: given the messy state of this document, what is the completion graph? Which items are actionable now? Which require live verification? Which are blocked on a decision? Which are probably done but need reaping?

The useful workflow needs both.

<figure>
<svg viewBox="0 0 820 360" role="img" aria-label="Realtime loop state transitions: idle, goal framing, queue ready, agent running, verify, persist, then continue, stop, reframe, or interrupt." xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;max-width:820px;font-family:ui-sans-serif,system-ui,sans-serif">
  <defs>
    <marker id="rad-state-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" fill="rgb(var(--color-accent))"/>
    </marker>
  </defs>
  <style>
    .rad-state-box{fill:rgb(var(--color-card));stroke:rgb(var(--color-border));stroke-width:1.5}
    .rad-state-hot{fill:rgb(var(--color-card));stroke:rgb(var(--color-accent));stroke-width:2}
    .rad-state-stop{fill:rgb(var(--color-card-muted));stroke:rgb(var(--color-border));stroke-width:1.5}
    .rad-state-title{fill:rgb(var(--color-text-base));font-size:14px;font-weight:700}
    .rad-state-sub{fill:rgb(var(--color-text-base));opacity:.75;font-size:11.5px}
    .rad-state-edge{stroke:rgb(var(--color-accent));stroke-width:2;fill:none;marker-end:url(#rad-state-arrow)}
    .rad-state-soft{stroke:rgb(var(--color-text-base));stroke-opacity:.42;stroke-width:1.4;fill:none;stroke-dasharray:5 5;marker-end:url(#rad-state-arrow)}
    .rad-state-label{fill:rgb(var(--color-accent));font-size:11.5px;font-weight:700}
  </style>

  <rect class="rad-state-box" x="28" y="64" width="118" height="58" rx="8"/>
  <text class="rad-state-title" x="87" y="89" text-anchor="middle">Idle</text>
  <text class="rad-state-sub" x="87" y="108" text-anchor="middle">waiting for signal</text>

  <rect class="rad-state-box" x="182" y="64" width="128" height="58" rx="8"/>
  <text class="rad-state-title" x="246" y="89" text-anchor="middle">Goal Frame</text>
  <text class="rad-state-sub" x="246" y="108" text-anchor="middle">shape the work graph</text>

  <rect class="rad-state-hot" x="348" y="64" width="128" height="58" rx="8"/>
  <text class="rad-state-title" x="412" y="89" text-anchor="middle">Queue Ready</text>
  <text class="rad-state-sub" x="412" y="108" text-anchor="middle">one head selected</text>

  <rect class="rad-state-hot" x="514" y="64" width="128" height="58" rx="8"/>
  <text class="rad-state-title" x="578" y="89" text-anchor="middle">Agent Running</text>
  <text class="rad-state-sub" x="578" y="108" text-anchor="middle">tools and edits</text>

  <rect class="rad-state-box" x="674" y="64" width="118" height="58" rx="8"/>
  <text class="rad-state-title" x="733" y="89" text-anchor="middle">Verify</text>
  <text class="rad-state-sub" x="733" y="108" text-anchor="middle">tests and proof</text>

  <rect class="rad-state-box" x="514" y="212" width="128" height="58" rx="8"/>
  <text class="rad-state-title" x="578" y="237" text-anchor="middle">Persist</text>
  <text class="rad-state-sub" x="578" y="256" text-anchor="middle">commit and snapshot</text>

  <rect class="rad-state-stop" x="348" y="212" width="128" height="58" rx="8"/>
  <text class="rad-state-title" x="412" y="237" text-anchor="middle">Stop</text>
  <text class="rad-state-sub" x="412" y="256" text-anchor="middle">drained or blocked</text>

  <rect class="rad-state-box" x="182" y="212" width="128" height="58" rx="8"/>
  <text class="rad-state-title" x="246" y="237" text-anchor="middle">Reframe</text>
  <text class="rad-state-sub" x="246" y="256" text-anchor="middle">goal changed</text>

  <rect class="rad-state-stop" x="28" y="212" width="118" height="58" rx="8"/>
  <text class="rad-state-title" x="87" y="237" text-anchor="middle">Interrupt</text>
  <text class="rad-state-sub" x="87" y="256" text-anchor="middle">human takes control</text>

  <path class="rad-state-edge" d="M146 93 H182"/>
  <path class="rad-state-edge" d="M310 93 H348"/>
  <path class="rad-state-edge" d="M476 93 H514"/>
  <path class="rad-state-edge" d="M642 93 H674"/>
  <path class="rad-state-edge" d="M733 122 C733 172 642 172 602 212"/>
  <path class="rad-state-edge" d="M514 242 H476"/>
  <path class="rad-state-edge" d="M514 238 C478 178 458 142 428 122"/>
  <path class="rad-state-soft" d="M348 242 H310"/>
  <path class="rad-state-soft" d="M182 242 H146"/>
  <path class="rad-state-soft" d="M246 212 C246 166 246 146 246 122"/>
  <path class="rad-state-soft" d="M87 212 C87 160 87 142 87 122"/>

  <text class="rad-state-label" x="154" y="84">signal</text>
  <text class="rad-state-label" x="316" y="84">plan</text>
  <text class="rad-state-label" x="483" y="84">dispatch</text>
  <text class="rad-state-label" x="648" y="84">done</text>
  <text class="rad-state-label" x="650" y="175">passes</text>
  <text class="rad-state-label" x="475" y="205">more heads</text>
  <text class="rad-state-label" x="314" y="232">no head</text>
  <text class="rad-state-label" x="255" y="174">new shape</text>
  <text class="rad-state-label" x="96" y="174">manual</text>
</svg>
</figure>

| Primitive | Software meaning | Music meaning |
|---|---|---|
| `/loop` | keep draining the next actionable head | keep the groove cycling |
| `/goal` | arrange the work into a completion graph | decide the song form |
| queue | next playable phrases | clips or patterns |
| tests | timing and tuning constraints | metronome and key center |
| human interrupt | change direction before the loop gets stale | mute, overdub, drop, fill |

Without loops, the agent is just a faster chat box. Without goals, loops become treadmill behavior. A good harness needs to know how to continue, but also how to reframe.

This is why "agentic development" is not just a model capability question. It is a process architecture question. Who owns the next turn? What counts as completion? What evidence allows the loop to continue? What pauses the loop? What gets committed? What gets promoted from scratchpad into spec?

## Realtime Salience

Realtime salience is the part I find hardest to name and most important to design around.

In a normal backlog, priority is declared. Someone says this ticket is P0, this one is P1, this one can wait. That is useful, but it is not the same thing as salience.

Salience is what becomes important because of what is happening now.

A flaky test becomes salient when it repeats across three runs. A small TODO becomes salient when it blocks the queue head. A warning becomes salient when it appears exactly after a dependency upgrade. A design question becomes salient when two agents keep making incompatible assumptions. A stale supervisor becomes salient when every clean closeout still fails to advance the next item.

Agent harnesses expose this naturally because they create lots of structured traces:

- diffs
- commits
- test output
- preflight output
- queue state
- pending items
- session checks
- route attempts
- user corrections
- repeated failure families

The development process becomes a live attention system. The job is not to make the model read everything. The job is to route the right signal into the loop at the moment when it matters.

This is where realtime development differs from "big context" development. Bigger context says: load more. Realtime salience says: notice better.

## Learning While Building

The agent learns in the weak but practical sense that the loop updates its working context continuously.

It learns when a test fails and the failure is written into the document. It learns when the human edits its previous response. It learns when a runbook is extracted because a repeated procedure is wasting context. It learns when the spec changes from "maybe use a CRDT" to "git three-way merge is enough for this boundary." It learns when the queue item is struck, deferred, split, or reworded.

This is not model training. The weights do not change. But the working system changes.

That distinction matters. Most software teams do not need the model to permanently learn their company. They need the active development environment to retain state, surface the right memories, and turn repeated friction into stronger local procedure.

In this sense, agentic learning is closer to musicians rehearsing a piece than to a neural net training run. You play the phrase, hear the rough edge, adjust the voicing, loop again, and gradually the arrangement becomes obvious.

## The Music Loop Analogy

Looping in music is not repetition for its own sake. A good loop is stable enough to orient you and open enough to develop.

A concrete example is Switch Angel's [Coding Trance Music (Full Narrated)](https://youtu.be/GWXCCBsOMSg?is=BygeyAF1zxBopNw5). The performance is literally programming a trance loop in realtime. Code is on screen, the sound changes as the code changes, and the loop becomes the running system.

<iframe width="560" height="315" src="https://www.youtube.com/embed/GWXCCBsOMSg" title="Coding Trance Music (Full Narrated)" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

It starts with a four-on-the-floor kick. Then bass enters as a super saw, gated by a transgate. The key is set to G minor. Octaves move. A filter gets a live control. The bass is cloned into a lead. Delay and random panning add motion. More notes appear. The performer starts "patterning inside of our pattern," then creates a breakdown, builds bass percussion, adds an infinite riser, chops a tape-loop-like segment, brings the kick back, adds clap, restores the transgate, FM-modulates the super saw, and finally changes the kick pattern for more motion.

That is the realtime programming analogy almost exactly:

| Music loop move | Agentic development move |
|---|---|
| lay down kick | establish the invariant that keeps the session grounded |
| add bass | add the first working implementation path |
| set key | choose the local domain language and constraints |
| add filter slider | expose a controllable parameter instead of hard-coding taste |
| clone bass into lead | reuse a working abstraction in a new role |
| pattern inside the pattern | let the spec develop substructure while the loop keeps running |
| breakdown | pause the main drive so the system can reframe |
| riser | build toward a transition the listener can feel coming |
| tape-loop chopping | sample the existing system and recombine it into a new pattern |
| bring kick back | return to the core invariant after exploration |
| add chaos, then control it | widen the search space, then bind it with structure |

A looper pedal starts with a phrase. The phrase repeats. Then you overdub. A bass note changes the harmonic center. A muted layer creates space. A fill marks transition. Too much overdubbing turns the loop into mud, so you remove parts. The skill is not "make infinite sound." The skill is deciding what deserves to stay in the loop.

Agentic development has the same shape.

The first prompt lays down the groove. The agent adds a layer. Tests add constraint. The human edits the spec. A watcher appends a failure. The agent refactors. The human mutes a direction by deleting it from the doc. A goal pass rearranges the backlog into sections. The next loop plays from the new arrangement.

The analogy also explains the failure mode.

Loops can get stale. The system can keep playing the same wrong phrase with increasing confidence. It can answer the same queue head repeatedly. It can keep polishing a local abstraction after the product question has changed. It can keep adding layers until nobody can hear the original idea.

That is why realtime agentic development needs rests, not only loops. It needs stop fences, explicit goals, compaction, queue reaping, live verification, and human interruptions. The point of the loop is not to remove the human. The point is to keep the work moving at a tempo where the human can steer by listening.

## Realtime Agile

The original spirit of agile was feedback. Working software over ceremony. Short iterations. Customer collaboration. Responding to change.

Agentic workflows compress that feedback loop so much that the old ceremony boundaries start to look too coarse.

A sprint is a loop measured in weeks. A pull request is a loop measured in hours or days. A test watcher is a loop measured in seconds. An agent queue can be a loop measured in turns. A markdown spec diff can be a loop measured in keystrokes.

That does not make planning obsolete. It makes planning more continuous.

Realtime agile looks like:

- specs that update as the code discovers reality
- tests that feed the agent instead of merely judging the branch later
- queues that carry small actionable heads through a loop
- goals that periodically re-arrange the work graph
- runbooks that extract repeated process from chat into versioned procedure
- commits that create a recoverable timeline for both code and conversation
- humans who steer attention, taste, constraints, and priority

The process becomes less like a status meeting and more like a control room. You are watching signals, adjusting the patchboard, and deciding which loops should keep running.

## Documents As Realtime Surfaces

The simplest substrate for this is still a document.

That sounds too low-tech until you notice what a document gives you: persistence, diffs, comments, headings, search, links, git history, editor integration, and human readability. A document can be a spec, a queue, a dashboard, a scratchpad, and an audit log at the same time.

A realtime operations dashboard can be a markdown template:

```markdown
## Goal

Recover stuck agent sessions without losing user edits.

## Live Signals

| Signal | State | Since | Action |
|---|---|---:|---|
| tests | failing | 2m | inspect |
| queue | active | 14m | continue |
| supervisor | stale binary | 40s | recycle at boundary |
| ipc | degraded but proven | 5m | do not stop |

## Queue

- [ ] Reproduce the stale supervisor boundary
- [ ] Recycle at the next idle point
- [ ] Verify the queue head advances
- [ ] Commit the runbook update
```

External systems can update the table. The agent can respond to the diff. The human can edit the queue. Git can preserve the before and after. If latency needs to be lower, a file watcher, local daemon, Unix socket, or server can push events into the same document surface.

The important point is the layering: realtime events do not have to bypass the spec. They can become part of it.

## The New Craft

The craft is moving from "write perfect prompts" toward "design good loops."

A good loop has:

- a clear goal
- a bounded next action
- enough state to continue
- enough evidence to stop
- a way to incorporate corrections
- a way to compact history without losing decisions
- a way to promote discoveries into durable spec

This is software development as live arrangement. The agent plays, the tests keep time, the document remembers, the human produces, and the codebase answers back.

The best workflows will not be the ones where the agent writes the most code in one shot. They will be the ones where spec and software co-evolve at the speed of attention.

That is realtime agentic development.
