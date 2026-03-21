---
title: "Building Agent-Doc: Live Debugging tmux Race Conditions & CRDT Document Sessions"
description: "A live coding session working on agent-doc, corky, and tmux-router — covering Google OAuth app verification, tmux pane proliferation debugging, CRDT document session management, and markdown AST parsing."
date: 2026-03-18
featured: true
tags:
  - agent-doc
  - corky
  - tmux
  - crdt
  - rust
  - claude-code
  - live-coding
  - vibe-coding
  - agentic-programming
video_url: https://www.youtube.com/watch?v=N8EX3zJLHUA
---

# Building Agent-Doc: Live Debugging tmux Race Conditions & CRDT Document Sessions

This is a raw, unscripted live coding session across two recordings. I'm working on [agent-doc](https://github.com/btakita/agent-doc) — a Rust CLI tool for structured AI conversations in markdown — along with [corky](https://github.com/btakita/corky) (my correspondence kit) and tmux-router (the session orchestration layer).

<iframe width="560" height="315" src="https://www.youtube.com/embed/N8EX3zJLHUA" title="Building Agent-Doc: Live Debugging tmux Race Conditions & CRDT Document Sessions" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

**What you'll see:** Real debugging, speculation that turns out to be wrong, race conditions that resist easy fixes, and the kind of iterative problem-solving that happens when you're building tools while using them. This is vibe coding — not a tutorial.

## Making Corky Public

The session opens with the tail end of getting corky's Google OAuth consent screen submitted for public verification. Right now corky uses a private Google Cloud app, which means anyone who wants to use it needs to set up their own GCP credentials. The public app removes that friction — once verified, users can just `corky init` and authenticate.

Google says 2–6 weeks for verification. In the meantime, I added built-in default credentials to corky so the setup flow can fall back gracefully when no user-specific config exists.

## The tmux Proliferation Bug

The bulk of the first session is spent hunting a persistent bug: tmux panes multiplying across windows when they shouldn't be. Here's the setup:

Agent-doc uses tmux to manage multiple Claude Code sessions side-by-side. Each document gets its own pane, and tmux-router handles swapping panes in and out of the visible window. When you focus on a different document in your editor, tmux-router brings that document's Claude pane to the foreground.

The problem? Switch between tmux sessions, come back, and suddenly panes have scattered across multiple windows. The stash window (where inactive panes live) gets duplicated. Resyncing doesn't always fix it.

### What I Thought vs. What It Was

My initial speculation: the bug was caused by focusing on another tmux session, then returning to the editor without re-focusing the claiming session. I thought the focus bypass was letting the router target the wrong session.

Wrong. The router doesn't rely on the currently focused tmux session — it reads the `tmux_session` frontmatter field from the document. The actual cause was **concurrent route operations combined with split failures**. When the IDE triggers routes for multiple documents simultaneously, each one tries to split a window. But tmux has a minimum pane size — once the window is too small, the split fails. The failed operations were creating new windows instead of stashing the pane.

### The Fix

Two changes in tmux-router:
1. **Stash fallback**: When a split fails, stash the pane in the stash window instead of creating a new one. If the stash window is full, create `stash-2`, `stash-3`, etc.
2. **Wrong-window detection**: Resync now checks whether panes are in the correct window, not just the correct session. Panes in the wrong window get consolidated.

Six new tests to cover the scenarios. The speculation about focus was wrong, but it pointed me in the right direction — the real issue was in the same area (route execution), just a different mechanism.

## Component Modes and the Pending System

Between debugging sessions, I added a few features to agent-doc:

**Component modes** — template-mode documents now have configurable behavior for each named component. A component can be `replace` (overwrite on each response), `append` (accumulate), or `prepend`. The exchange component defaults to `append`; status defaults to `replace`.

**The pending component** — a new section that tracks what the agent is currently working on. The motivation: I kept losing prompts. When you type a question while the agent is responding, the CRDT preserves your text in the document, but the next diff cycle might not address it. The pending component captures the full prompt as a checklist that survives across cycles.

## The Document Corruption Bug

Here's a fun one: I put an `<!-- agent:pending -->` tag inside backticks in the document, intending to discuss the tag itself. The parser treated the backtick content as a real component opener and corrupted the document structure.

The issue wasn't in the parser — it was in the sanitizer. CommonMark spec says single-backtick inline code requires matching backtick counts, and the parser correctly identified it wasn't inline code. But the sanitizer's regex for component tags didn't account for this edge case.

This led to a broader question: **should agent-doc use a proper markdown AST parser?** Right now it uses regex-based parsing for component tags and HTML comments. A proper AST (like [cmark](https://docs.rs/cmark/latest/cmark/)) would correctly handle inline code, fenced code blocks, and other contexts where `<!-- ... -->` shouldn't be treated as a real comment.

The answer is yes — and it's roughly 50KB of additional dependency. Worth it for correctness.

## The Prompt Loss Problem

The most subtle bug of the session: prompts being silently dropped.

The scenario: you type a question while the agent is responding. The CRDT merge correctly preserves your text — you can see it in the document. But when the next cycle runs, the diff contains both your prompt and the previous response (which was just committed). The skill sees them as one blob and only processes the response portion. Your prompt gets swallowed.

The root cause is a skill-side attention problem, not a CRDT issue. The snapshot gets updated when `agent-doc write` runs, which includes the response. So next cycle's diff should only contain user changes. But if the commit in step 0b happens after the user has already written their prompt, the diff contains both.

The fix path involves the boundary marker system (which landed in a later release) and more disciplined diff processing — addressing every line in the diff, not just the parts that look like new user input.

## Over-Specification vs. Under-Specification

There's a moment in the stream where I step back and ask: how much should you specify in agent instructions?

As a programmer, I can track what's happening as features develop. But with agent loops, things move fast — faster than my ability to manually specify every behavior. The skill file for agent-doc is already dense with workflow steps, edge cases, and conventions.

The balance I'm landing on: **specify the invariants, not the implementation**. Tell the agent what must be true (snapshots must be updated atomically, user edits must never be overwritten), and let it figure out how. Over-specify the critical paths (git commit workflow, CRDT merge ordering). Under-specify everything else.

This is an ongoing experiment. The glove has to fit the person operating the agents.

## Tools Used

- [agent-doc](https://crates.io/crates/agent-doc) — Structured AI document sessions in markdown
- [corky](https://github.com/btakita/corky) — Correspondence kit (email, social, YouTube)
- [Claude Code](https://claude.com/claude-code) — AI coding assistant
- tmux-router — Session orchestration for multi-pane AI workflows

## Links

- [agent-doc on crates.io](https://crates.io/crates/agent-doc)
- [agent-doc on GitHub](https://github.com/btakita/agent-doc)
- [Previous session: Dog-fooding agent-doc Part 1](https://briantakita.me/posts/dogfooding-agent-doc-part1-blog)
