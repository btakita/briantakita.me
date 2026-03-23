---
title: "Ep2: The Snowball Bug — Skill to Binary Series"
description: "Moving boundary management into the binary reveals a cascading corruption bug. Conditional reinsertion causes each cycle to perpetuate a missing boundary. Also: AI agents as probabilistic algorithms and context window optimization."
date: 2026-03-23
featured: false
tags:
  - agent-doc
  - crdt
  - ipc
  - rust
  - claude-code
  - live-coding
series: skill-to-binary
video_url: https://www.youtube.com/watch?v=lEnOxyT5crY
---

# Ep2: The Snowball Bug

**Part of the [Skill to Binary series](/post/2026-03-23-skill-to-binary-agent-doc-live) — migrating agent-doc boundary management from the Claude Code skill into deterministic binary code.**

<iframe width="560" height="315" src="https://www.youtube.com/embed/lEnOxyT5crY" title="Ep2: The Snowball Bug" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

Episode 2 of 6. 1:31:49. The binary takes over boundary management — and immediately surfaces a cascading corruption bug that each cycle makes worse.

## Boundary Management Belongs in the Binary

Brian opens the session bluntly: "The skill should never be responsible for boundary insertion." His reasoning is architectural. Boundary insertion is deterministic — remove stale boundaries, insert a fresh one at the end of the exchange, unconditionally. No LLM reasoning needed. The test he articulates: "If you bypass the skill when adding terms or questions, will all right paths need this? If yes, it belongs in the binary."

The context: agent-doc has multiple write paths — the skill workflow (invoked via Claude), `agent-doc run`, `agent-doc stream`, and a watch daemon. Boundary management had been implemented inside `SKILL.md` during a rapid iteration, which meant only the skill path executed it. Every binary-invoked path skipped the boundary step entirely because it was not in the compiled code. Any non-skill write left the document with a missing or stale agent boundary.

The fix is ownership: `agent-doc write` takes the full sequence. Remove all stale boundaries. Insert a fresh boundary at the end of the exchange. Apply patches at the new boundary position. Unconditionally reinsert the boundary after patching. The binary owns the invariant; the skill owns the reasoning.

The principle behind it is broader: deterministic infrastructure operations must not be delegated to probabilistic agents. The skill is a suggestion — LLMs follow skill instructions most of the time but not always. Any operation that must be correct on every invocation, across every code path, needs to live in compiled tested code. A single context-window loss or skill deviation corrupts document state under the old architecture. Under the new one, any agent failure degrades gracefully — the binary self-corrects on the next write cycle.

## The Snowball Bug

Around the 57-minute mark, the agent diagnoses the exact failure mechanism. Brian reads back: "This is snowballing. Once the cycle loses the boundary, every subsequent cycle also loses it because the original doc had no boundary, so the pre-patch insertion creates one, the patch consumes it, and the post-patch check fails to reinsert."

The pre-existing logic had a conditional guard. The post-patch reinsertion was conditional on `original_doc_had_boundary`. The sequence:

1. Remove all existing boundaries from document
2. Insert fresh boundary at end of exchange
3. Apply patches — which replace the exchange content, consuming the boundary from step 2
4. Check: did the original doc have a boundary? If yes, reinsert.

The bug fires on the first cycle where the document arrives without an agent boundary. At that point: step 1 removes nothing, step 2 inserts a fresh boundary, step 3 consumes it, step 4 finds the original had no boundary and skips reinsertion. The document exits the cycle without a boundary — the same condition that caused the miss in the first place. Every subsequent cycle repeats the same path. The corrupted state is self-reinforcing.

The fix is one line: make step 4 unconditional for any template document that has an exchange component. The document type, not the document's current content, determines whether a boundary is needed. The post-write invariant is always "there is exactly one agent boundary at the end of the exchange." Enforce it unconditionally.

The lesson generalizes: when an invariant is load-bearing for downstream correctness, reinstating it should not be conditional on the prior state that already violated it. The right framing is "what must be true after this operation?" not "what was true before?"

## JetBrains Plugin Cursor-Position Insertion Bug

Around 46 minutes, a separate but interacting bug surfaces. Brian, live-debugging: "Did it by a cursor — that's not good. It's kind of broken now." The response patch appeared mid-document, inline at his cursor position. His diagnosis: "The binary wrote it correctly to disk. The plugin then helpfully reorganized it in memory."

The IPC patch payload did not include an explicit target insertion position. The IntelliJ Document API, given no position, defaulted to inserting content at the current cursor location. The user had the cursor mid-document. The agent's response landed there instead of at the end of the exchange. Committed on-disk state was correct; in-editor state was wrong. The plugin's cursor-position insertion also stripped the agent boundary from its expected location, handing the snowball bug its trigger condition.

This is a two-writer coherence problem. When two systems can both modify the same document — binary writes disk, plugin writes editor buffer — they must have the same understanding of where content belongs. "Append to cursor" is correct for user typing. It is wrong for programmatic patch application. The IPC payload needs explicit position semantics: a line number, a named anchor (the agent boundary marker), or a replacement range. No dependence on transient editor cursor state.

The deeper issue: any time a plugin interprets an ambiguous operation using current UI state, it introduces bugs that are nearly impossible to reproduce deterministically.

## AI Agents as Probabilistic Algorithms

In a digression from debugging (roughly 7–14 minutes), Brian steps back: "I'm really treating this as an algorithm, as a non-deterministic algorithm, or like a probabilistic algorithm. We're in a probabilistic space here and we're going to reach a certain outcome of N dimensions."

On premature automation: "If you can specify quantitative conditions and you do it in a way where it's not going to cheat... then yes, by all means, use your evolutionary approach. But if you're wrong, you're just being more efficiently wrong." On local maxima: "You could still hit a local maxima. There's a global one somewhere else that hasn't been searched yet... sometimes you need that psychedelic trip of randomness... to really get past local maxima."

He is explicitly resisting the impulse to further automate the development loop — spin up a virtual agent team, define a fitness function, let it run. His argument: he does not yet have a good enough model of the system to specify the right fitness function. Faster automation without a well-defined and correct fitness function doesn't accelerate progress toward the actual goal. It accelerates progress toward whatever metric you've imprecisely specified.

Treating the LLM as a probabilistic algorithm rather than AI strips away anthropomorphism and focuses attention on what matters: the probability distribution over outputs, the conditions that shift that distribution, and how a caller can steer it toward useful outputs. The skill is not a collaborator following instructions. It is a stochastic function whose expected output can be shaped by context and prompt design, but whose individual outputs cannot be guaranteed. Design accordingly.

Brian's current evaluation mode: "I'm going all qualitative right now and all anecdotal. I am the criteria right now." The argument for staying close to the metal — dogfooding, qualitative evaluation, human-in-the-loop — is an argument for keeping the human's fitness function as ground truth rather than delegating evaluation to a proxy metric that may not capture what the human actually wants.

## Context Window Optimization — Head-Only Snapshots

Around 28–39 minutes, Brian identifies another class of problem: "I think the patch — that we do snapshots — might be noise in the context. Which causes us to lose track of things more often than we should."

The current approach includes a full document snapshot in the context on each cycle. As the document grows, the snapshot consumes an increasing fraction of the context window. When a patch is applied, both the pre-patch and post-patch snapshots may be included — the same content twice, ~90% overlap. Stale full snapshots push recent exchanges further from the model's effective attention.

The proposed fix: use `agent-doc diff` instead. The binary emits a structured diff — added lines with surrounding context, modified lines as old/new pairs, deleted lines, section headers for orientation. The skill reads the diff, not two full snapshots. The change itself becomes more salient because the diff format explicitly marks what is new, rather than asking the model to implicitly compare two nearly-identical large documents.

Brian connects this directly to "losing track of inquiry threads" — when the context window carries a large volume of stale content, the LLM loses sight of in-progress tasks because relevant recent signals are diluted. The broader principle: the context window is a scarce resource. Store full document state on disk (binary responsibility). Derive a compact representation of the cycle's changes (diff). Include only that compact representation in context, with a tool-call reference to the full document if needed.

## Component Naming: `agent:pending` vs `agent:todo`

Around 1:01–1:11, Brian works through a naming problem live. `agent:pending` has been accumulating both in-session items (process this cycle, then clear) and longer-term roadmap items (future cycles, future releases). The conflation causes inconsistent agent behavior — the agent has no signal to distinguish immediate from deferred work.

The split: `agent:pending` becomes session-scoped, volatile — process and clear at end of cycle. `agent:todo` becomes persistent backlog — survives session compaction, represents ongoing work. Brian considers `agent:session` and `agent:roadmap` as alternatives before settling on `pending` and `todo`.

The point: component names in agent-doc are protocol, not cosmetics. The agent's behavior is conditioned on recognizing specific names and acting on them in defined ways. A name that conflates two temporal scopes produces inconsistent behavior because the agent will sometimes resolve the ambiguity one way and sometimes the other. Disambiguating through naming is a cheap fix with outsized impact on reliability.

---

## Series Navigation

- [Series overview — Skill to Binary](/post/2026-03-23-skill-to-binary-agent-doc-live)
- **Ep1:** [The CRDT Ordering Bug](/post/2026-03-23-skill-to-binary-ep1-crdt-ordering-bug) — prompt ordering, editor caching, IPC root cause
- **Ep2:** The Snowball Bug (this post)
- **Ep3:** AST Parsing & GPU Transcription — pulldown-cmark, CUDA Whisper, YouTube pipeline
- **Ep4:** IPC Timeout Deep Dive — polling architecture, file descriptor signaling
- **Ep5:** Preflight & Browser Extension — `preflight` command design, plugin reposition flag
- **Ep6:** Deterministic Primitives — wrap-up, the binary/agent design principle
