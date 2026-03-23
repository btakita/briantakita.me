---
title: "Ep1: The CRDT Ordering Bug — Skill to Binary Series"
description: "CRDT merge preserves data but not semantic ordering. Debugging how user prompts end up below agent responses, discovering IPC caching as the root cause, and a philosophical detour about 'vibe coder' labels."
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
video_url: https://www.youtube.com/watch?v=5m9rTJ-4Xbc
---


<iframe width="560" height="315" src="https://www.youtube.com/embed/5m9rTJ-4Xbc" title="Ep1: The CRDT Ordering Bug — Skill to Binary" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

Episode 1 of the [Skill to Binary series](/posts/skill-to-binary-agent-doc-live) opens mid-debug. The symptom is modest: user-typed prompts appearing below agent responses instead of above them. What follows is nearly two hours of live debugging that uncovers a layered set of problems — a misplaced ordering heuristic, a caching window in the IPC path, and an architectural assumption that didn't survive contact with multiple code paths. Along the way, the session detours into why AI-era labels like "vibe coder" flatten more than they illuminate.

## The Central Bug: CRDT Merge Ordering vs. Semantic Ordering

The session opens with the core observation: "we don't preserve the semantic meaning of order — text should come before the agent response because it doesn't understand the meaning, it only guarantees no data loss."

The specific failure is visible in the diff. A user-typed prompt that existed in the document *before* the agent was invoked ends up appearing *after* the agent's response patch in the final rendered document. The CRDT reordering doesn't distinguish between prompt text the user typed before the agent was invoked (which should precede the response) and concurrent edits the user made while the agent was streaming (which are genuinely concurrent and subject to CRDT ordering rules).

[Agent-doc](https://github.com/btakita/agent-doc) uses the `yrs` Rust crate — a port of Y.js — to merge concurrent edits. When an agent streams a response patch over the IPC channel while the user might also be typing, `yrs` guarantees no data is lost. It makes no guarantee about the reading order relative to human-typed prompts.

An earlier version of the merge code had a function called `reorder_agent_before_human` — an explicit swap to push agent content before human content. This was introduced before the system had an "agent boundary" marker. With the boundary-aware write path, the insert position is already explicit, and the explicit reorder becomes actively harmful: it undoes the semantic ordering the boundary was meant to enforce. Adding a `skip_reorder` flag to disable the swap is the first fix attempted. It helps, but it doesn't fully solve the problem.

The deeper principle this surfaces: semantic ordering (prompt precedes response) and CRDT ordering (causality-based merge) are orthogonal. A CRDT's notion of "which edit came first" is derived from a vector clock, not from the human's intent about reading order. Any system that mixes live human editing with AI streaming output needs an explicit semantic layer on top of the CRDT — the CRDT alone isn't sufficient.

## IPC Caching as Root Cause

After considerable iteration, the actual root cause is identified: "The IPC ordering bug is not in the CRDT merge — it is in the editor document caching."

The mechanism, laid out precisely: agent-doc writes the boundary marker to disk at step 1b. The editor plugin holds an in-memory document model that still has the old content — no boundary. Agent-doc then sends an IPC patch that references the boundary ID. The plugin searches its cached document, finds no boundary with that ID, and falls back to a plain append. Wrong position.

The architecture has three layers: the `agent-doc` Rust binary, which manages document state and writes to disk; the editor plugin (JetBrains/Kotlin in this session), which holds an in-memory cache of the document; and the IPC mechanism, a file-based signaling system rather than a Unix socket or named pipe. When the binary writes the boundary marker to disk, the plugin doesn't see it because the plugin is working from its own cached copy of the file. The boundary ID the IPC patch references simply doesn't exist in the plugin's view of the document.

The JetBrains plugin uses a 500ms polling loop to check for changes. This means there's a window of up to half a second where the plugin's view of the document diverges from disk. Any IPC message arriving in that window will be applied against stale state — and at typical LLM response latency in the hundreds of milliseconds, that window gets hit regularly.

The signal file / IPC approach trades simplicity for correctness: it avoids implementing a real IPC protocol but introduces caching windows that interact badly with timing-sensitive operations. The fix needs to either force a document reload in the plugin after the binary writes the boundary, or restructure the IPC so the boundary insertion and the response patch are delivered atomically in a single operation.

## Plugin Architecture: JetBrains Kotlin vs. VS Code TypeScript

The session compares two plugin implementations that have different timing characteristics.

The JetBrains plugin runs in the same JVM process as the IDE. It has direct access to the editor's document model API without any IPC round-trip for text manipulation — a significant architectural advantage. But it uses a 500ms polling loop to detect changes, which is the source of the caching window above.

The VS Code plugin uses VS Code's built-in `FileSystemWatcher` API, which wraps OS-level file events (inotify on Linux, FSEvents on macOS). These are typically sub-millisecond latency events, meaning the VS Code plugin's cache should stay much closer to disk state.

The concern isn't just about making the polling faster. Even 1ms polling would have a window. The real fix is atomicity: the boundary insertion and the IPC patch should be visible to the plugin as a single operation. Two approaches: include the boundary insertion in the IPC patch itself, or have the binary wait for a plugin acknowledgment that the boundary is visible before sending the response patch.

An incidental observation during this section: the session uses careful language when describing the plugin as "implemented *for* the editor's environment" rather than "implemented *in*." The distinction is deliberate — describing the intent (where it runs) without constraining the implementation mechanism. This is a pattern in declarative prompting: specify what you want, not how to achieve it.

## Deterministic vs. Probabilistic Responsibility: Binary vs. Skill

A recurring theme in the session is placement of invariants: operations that must always be correct should live in the compiled binary, not in the AI skill.

Step 1b — boundary insertion and cleanup — was defined in `SKILL.md`, the Claude Code skill definition that orchestrates the agent-doc workflow. This means it only runs when the skill workflow runs. There's a second entry point: `agent-doc submit` called directly, bypassing the skill entirely. When submit is invoked directly, step 1b never runs, stale boundaries don't get cleaned up, and the ordering breaks.

The fix is to move boundary cleanup into the binary's `document_write_stream` function, making it invariant to how the run was triggered. The session identifies the principle explicitly: "I'm a little nervous about trusting things in SKILL.md as much as possible. I want to make this deterministic and put it into the agent-doc binary because that I know it's going to work every time. SKILL.md is good but it's also ephemeral in that the underlying models change."

This maps onto a general software principle: constraints that must always hold should be enforced at the most fundamental layer all code paths share. Skills are interpreted at runtime by a probabilistic model. The same skill instruction may be executed differently on different invocations as model versions change. Compiled Rust code has none of this variance. Any operation that requires guaranteed execution semantics belongs in the binary.

## Context Window Management and Redundant Document Versions

Midway through the session, a discovery: the skill workflow is loading both the full current document and the full snapshot document into context every cycle. "That is not expected. I thought we were only sending diffs."

The diff computation was happening inside Claude's context window — two full document copies loaded each cycle, the agent comparing them in memory. After 10 cycles, the context contains 20 full document reads, with significant content overlap across versions. Content that appears unchanged across many versions is over-represented, potentially biasing the model toward older states. This may be a contributing mechanism to the "you're right" degradation state.

A proposed better architecture: load the current document fully, store history as deltas from a head snapshot. This is essentially how git stores objects — the current state is fully materialized, history is deltas. Applied to the context window, the agent's attention concentrates on what actually changed, not on reinforced stable content.

A related observation about compaction: archiving the exchange section and removing it from the live document does nothing for the current session's token usage — the agent already has all versions in its context window. Compaction is a future-session optimization, not a current-session benefit. Running it autonomously during an active debugging session is counter-productive.

## "Vibe Coder" and the Philosophy of Labels

The technical debugging pauses for a philosophical detour triggered by a LinkedIn post that called someone in the AI development space "subhuman." The session's response is a careful analysis of how labels function.

"Labels are kind of a proxy for thought. You kind of throw in the label to have a symbol just to point at and then you don't have to think about it."

The specific dynamic identified: a defensive counter-movement in the "vibe coder" discourse where developers reach for new labels — "spec-driven development," "agent harness engineering" — to distance themselves from the lower-status label. This produces more labels, not more clarity.

The ontological argument: "We have a schema which is our ontology, and we have an intention schema which is symbolic. Everybody has a different context for a symbol. Words that we use are going to have different meanings according to our context." A label transmits at the wrong resolution — it collapses a rich practice into a single bit. One person's "vibe coder" means creative and productive; another's means incompetent and undisciplined. The label crosses contexts carrying only the sound, not the meaning.

The practical rule offered: "I try to always be descriptive and not prescriptive with labels. By descriptive, meaning it is also subject to change and it's not a prison forever for somebody. The everlasting prison of a label is a prescriptive narrative that we're trying to impose."

This maps directly onto how precise technical writing handles abstractions: describe what you observe (subject to revision), don't define what something permanently is (impervious to revision). Prescriptive labels are the technical debt of language.

## When to Continue in a Degraded Context vs. Start Fresh

Near the end of the session, the model enters what the session calls a "you're right" state — acknowledging corrections, apologizing, then immediately reverting to the incorrect behavior. The conventional advice is to start a fresh context. The session argues for continuing.

The reasoning is partly practical: starting fresh loses all accumulated context about the problem being solved. The session's document-based approach externalizes state into the document itself, potentially making the "continue" strategy more viable than it is with pure conversation context.

But the reasoning is also about design validation: "I also want to see the issues with the model because I'm creating a tool that ultimately has to interact with all the possible states in the model. I want to be able to create a system that does work whether or not we're in a pristine awesome state or in a 'you're right' state."

The "you're right" state is framed as an optimization landscape problem: the context space is vast, the current position may be in a valley, but continuing to iterate with correct prompts may climb out to a useful local maximum. "Even after it goes through a 'you're right' phase, sometimes it's correct. You know, it is possible that 'you're right' might go through a valley for a while and then might hit that regional maximum too, or even a global maximum."

The session is explicit that this is fuzzing: deliberately exposing agent-doc to degraded states to understand where the failure modes are and what recovery looks like in practice.

## Key Technical Takeaways

Seven findings that carry forward into the rest of the series:

**CRDTs don't preserve semantic order.** They preserve data. Any system mixing AI streaming output with human editing needs an explicit semantic ordering layer — the CRDT alone isn't sufficient.

**IPC caching is the root cause.** The plugin's in-memory document cache diverges from disk after boundary insertion. The plugin falls back to incorrect positioning when it can't find the boundary ID in its cached state.

**Polling vs. event-driven IPC matters.** The JetBrains plugin's 500ms polling window creates a race that fires regularly at LLM response latencies. OS-level file watching would have lower latency, but atomicity of boundary insertion + patch delivery is the real fix.

**Invariants belong in the binary, not the skill.** Operations that must always execute correctly should be in compiled code. Skills are probabilistic and model-dependent. Multiple entry points require shared enforcement at the lowest common layer.

**Full document reads every cycle are expensive and biasing.** A head snapshot plus backward diffs would reduce context token usage and focus the model's attention on what actually changed.

**Compaction is a user operation, not an agent optimization.** Autonomous compaction destroys information the current session is actively using. It should never happen without an explicit user request.

**Continued iteration through degraded states may be viable.** When context is externalized in a document, recovery from "you're right" states may not require starting fresh — but it requires the system to be designed for it.

---

Continue to [Ep2: The Snowball Bug](/posts/2026-03-23-skill-to-binary-ep2-snowball-bug), where moving boundary management into the binary reveals a cascading corruption problem — each cycle makes the state worse before the fix lands.

Back to the [series overview](/posts/skill-to-binary-agent-doc-live).
