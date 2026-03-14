---
title: "Dog-fooding agent-doc: CRDT Debugging, Reactive Architecture, and Why God = Existence"
description: "A 2-hour live session debugging CRDT merge bugs in agent-doc, a Rust CLI tool for structured AI conversations in markdown. Covers reactive stream architecture, Existence Lang ontology, and what vibe coding actually looks like."
date: 2026-03-12
tags:
  - agent-doc
  - claude-code
  - rust
  - crdt
  - vibe-coding
  - existence-lang
  - developer-tools
  - ai
  - live-coding
  - philosophy
video_url: https://www.youtube.com/watch?v=B-9uI53cRVE
---

# Dog-fooding agent-doc: CRDT Debugging, Reactive Architecture, and Why God = Existence

<iframe width="560" height="315" src="https://www.youtube.com/embed/B-9uI53cRVE" title="Dog-fooding agent-doc Part 1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

This is my first dev video. No polish, no script, no tutorial energy. Just two hours of me eating my own dog food — using [agent-doc](https://crates.io/crates/agent-doc) to debug agent-doc — and sharing the raw experience.

Fair warning: the screen capture only got 1/4 of my display (XSHM + HiDPI — lesson learned). The audio carries the full story. Already fixed for the next one.

## What is agent-doc?

agent-doc is a Rust CLI tool I'm building that lets you have structured conversations with AI agents directly in markdown files. Instead of the typical one-prompt-at-a-time interaction, you edit a document, and agent-doc watches for changes, diffs them, and routes them to Claude. The responses come back into the document.

Think of it as turning your editor into a collaborative workspace where you and the AI are both editing the same file, mediated by a CRDT (Conflict-free Replicated Data Type) that handles the merge logic.

The tool supports multiple modes:
- **Append mode** — responses appended to the bottom (the original design)
- **Template mode** — responses placed into specific named components within the document
- **Stream mode** — one Claude session per document, real-time reactive flow

## The Hydra: Debugging Multiple Issues at Once

The session starts with me deep in CRDT debugging. I had several bugs converging at once: duplicate responses from `agent-doc compact`, stale session claims from previous runs, and a TMUX pane that refused to refresh when routing to a new document.

This is where agent-doc's document-based approach shows its value. When you're juggling five different bugs in a conversational interface, the LLM gets confused and you lose context. With agent-doc, you can stop time. You lay out the full complexity of the problem in the document, section by section, and analyze it systematically.

I use the Hydra metaphor for this: sometimes you can't break off each scale individually. You have to look at the heads and find where they branch from the same neck. Cut one neck, three heads fall.

## CRDT Merge: The Core Technical Challenge

The CRDT handles concurrent edits between the human and the AI. When I'm typing in my editor and Claude is generating a response simultaneously, the three-way merge needs to reconcile both sets of changes against a shared baseline.

The merge flow in stream mode:
1. User edits, file saves, watch daemon fires immediately (no debounce)
2. agent-doc reads the diff, sends the prompt to Claude
3. Claude streams a response
4. Every 200ms, the agent flushes output — reads the current file (which may have new user edits), does a CRDT merge of agent output + user edits against the baseline, and atomically writes the result
5. Stream completes, file flushes, snapshot updates
6. Next edit triggers a new cycle

The key insight that emerged from this session: **debounce is a pre-CRDT protection**. In stream mode, the CRDT already handles concurrent edits. So we can drop the 500ms debounce entirely and go fully reactive. First file change processes immediately — zero added latency. If the user keeps typing, the CRDT merge handles it in the next flush.

## Truncation Detection and the Recheck Chain

One recurring annoyance: the diff sometimes fires while I'm mid-sentence. Claude sees "What should we do with" and tries to respond to an incomplete thought.

The solution: a delayed recheck chain. When the last line of a diff looks truncated (mid-word, no terminal punctuation), agent-doc waits 200ms and checks again. If content changed, recheck again. Keep going until a terminal condition — either the content stabilizes or we hit a maximum of about 5 seconds.

Single-character inputs like "B" (selecting an option) or "go" bypass truncation detection entirely. Alphanumeric singles are never considered truncated.

## Splitting agent-doc Mode: Stream/Batch + Template/Append

A naming problem surfaced during the session. The original `agent-doc mode` config was doing double duty — it controlled both the execution model (stream vs. batch) and the document format (template vs. append). Now that stream mode exists alongside batch, these need to be separate axes.

The result: two independent config fields.
- **agent-doc write** — `stream` or `batch` (how execution flows)
- **agent-doc format** — `template` or `append` (how the document is structured)

This is cleaner, more composable, and maps directly to how I think about scoping — explicit over implicit.

## Why I Don't Believe in One-Shotting

There's an obsession in the AI coding world with one-shotting features and benchmarking systems on single-pass generation. I don't buy it.

Even if you could one-shot the universe, you wouldn't get human alignment, because the human isn't involved. They're trying to specify everything perfectly upfront across the entire graph of specifications. That's hard enough for a semi-complicated system.

I prefer fast iterations. Like teaching a robot to walk: instead of solving a 20th-order differential equation, use fuzzy logic. Lean one direction, tilt the other way. Stabilize through feedback. agent-doc is built for this iterative loop.

## Existence Lang and Domain-Driven Ontology

The philosophical tangent in the video is real and it matters to the technical work.

I've maintained a personal ontology since around 2015. The core premise: **Existence is God. God is the universal set.** Everything that "is" — every concept, every abstraction, every entity we can talk about — exists. The tooth fairy exists as a concept. Code exists. Unknown unknowns exist. Existence includes itself recursively, like the universal set containing itself.

This isn't metaphysical hand-waving. It's utilitarian. I need to be able to represent any concept in a shared language between me and the AI. If my ontology excludes things by saying "that doesn't exist," I lose modeling power. So I start with the broadest possible scope and narrow down through **scoping** — explicit and implicit.

Implicit scoping is how we normally talk: "the tooth fairy doesn't exist" means it doesn't exist in our shared physical experience. Explicit scoping is when you define your boundaries precisely. Implicit scoping introduces ambiguity. Explicit scoping is composable.

This maps directly to how I design agent-doc. The terminology I use in the CLAUDE.md files, the config names, the mode categories — domain-driven design means being precise about language. When you have precise terms that both the human and the LLM understand, debugging gets clearer and alignment improves.

[Existence Lang](https://existence-lang.github.io/) is the next step: turning this ontology into an executable language. A 14-term kernel from which you can define any contextual system using the same linguistic schema.

## The Tools

- **[agent-doc](https://crates.io/crates/agent-doc)** — Interactive document sessions with AI agents via markdown + CRDT
- **[corky](https://github.com/btakita/corky)** — Correspondence toolkit for drafting and managing communications with AI assistance
- **[Existence Lang](https://existence-lang.github.io/)** — A pattern language for defining systems from existence-scope down to any domain

## What's Next

Part 2 tackles rmemo (a 358-byte reactive library), tag-path semantic search, and shipping v0.16.1 live on camera. The messy, iterative reality of building tools with AI continues.

This is what vibe coding actually looks like. Not a polished tutorial. Just a developer eating his own dog food and sharing the experience.
