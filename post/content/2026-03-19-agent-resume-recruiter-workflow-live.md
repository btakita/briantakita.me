---
title: "Building Agent Resume: AI-Powered Resume Generation from Recruiter Conversations"
description: "A live coding session building agent-resume — a TOML-based system for generating tailored resumes from recruiter conversations, phone call transcriptions, and email correspondence using corky and agent-doc."
date: 2026-03-19
featured: true
tags:
  - agent-resume
  - corky
  - agent-doc
  - rust
  - claude-code
  - live-coding
  - vibe-coding
  - agentic-programming
video_url: https://www.youtube.com/watch?v=IenfqO2vmAw
---

# Building Agent Resume: AI-Powered Resume Generation from Recruiter Conversations

Another raw, unscripted live coding session. This time the focus is on the recruiter-facing side of my toolchain: using [corky](https://github.com/btakita/corky) for email correspondence and phone call transcription, building a new project called **agent-resume**, and continuing to refine [agent-doc](https://github.com/btakita/agent-doc)'s CRDT document sessions.

<iframe width="560" height="315" src="https://www.youtube.com/embed/IenfqO2vmAw" title="Building Agent Resume: AI-Powered Resume Generation from Recruiter Conversations" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

**What you'll see:** Real recruiter workflow automation, resume gap analysis with AI agents, CRDT debugging, and the messy reality of building tools while actively using them for job applications. This is vibe coding — not a tutorial.

## Agent Resume: Experience as Data

The session opens with a new project: **agent-resume**. The idea is simple but powerful — store all your professional experience in a structured TOML file:

- Jobs, roles, skills, technologies, consulting engagements
- Each entry is a data point the agent can query

When a recruiter sends a job description, an AI agent can cross-reference the TOML database against the requirements and generate a resume that's tailored to that specific role. No more manually adjusting bullet points for each application.

### Gap Analysis

The real power shows up in gap analysis. The agent reads the job requirements, compares them against your experience database, and identifies:

- **Direct matches** — technologies and roles you've held
- **Adjacent experience** — related technologies that demonstrate transferable skills
- **Actual gaps** — areas where you genuinely lack experience

This turned up some interesting results. For instance, I had Holochain/protocol.love consulting work that I'd never included in previous resumes. The agent flagged it as potentially relevant for distributed systems roles, then after reviewing the actual codebase, correctly recommended *not* including it — the prototype was too basic and would dilute the narrative around stronger projects like agent-doc and corky.

That's the kind of judgment call that makes agent-assisted resume building valuable. It's not just keyword matching — it's contextual evaluation of whether experience actually strengthens your story.

## Corky: The Recruiter Correspondence Pipeline

This session demonstrates the full corky pipeline for recruiter interactions:

1. **Email ingestion** — Corky loads recruiter emails automatically and creates contact profiles with correspondence history
2. **Phone call transcription** — Record calls, drop the audio file into corky, and it transcribes *and diarizes* the conversation (attributing who said what)
3. **Context assembly** — All correspondence, transcriptions, and the TOML experience database feed into agent-doc
4. **Resume generation** — The agent drafts a tailored resume and cover email, with all the context it needs to be specific and accurate
5. **Email drafting** — Corky drafts the response email and pushes to Gmail Drafts for review

The workflow ran end-to-end for two different recruiter conversations in this session. The second one was more interesting — better role, higher compensation — but the process was identical. That's the point: the tooling handles the mechanical parts so you can focus on the decisions that matter.

## Agent-Doc: Parallel Commands and CRDT Refinements

### Worktrees as a First-Class Command

Agent-doc got a new `parallel` command (later renamed to `deep`) for running multiple agent tasks simultaneously via git worktrees. Instead of prompting Claude to create worktrees manually, you can now write:

```
parallel
- Job 1: implement feature X
- Job 2: fix bug Y
- Job 3: update documentation
```

Each job gets its own worktree and runs independently. This is a DSL-level improvement — the functionality existed before through prompting, but making it an explicit command reduces friction and makes the workflow more repeatable.

### CRDT Prompt Ordering Fix

A persistent annoyance: when typing in the exchange component while the agent is patching a response, the CRDT merge would sometimes place the user's text *above* the agent's response instead of below it. This breaks the natural conversation flow.

The fix involved post-merge heuristics to nudge human input below the agent's patch response. The discussion explored three approaches:

1. **Client-ID tie-breaking** — Simple but fragile
2. **Post-merge attribution via YRS** — Track per-character origins and reorder after merge. More complex but robust with no heuristics
3. **Agent input component** — Use a dedicated `<!-- agent:input -->` component to separate user typing from agent responses

Option 2 won — YRS (the Yjs CRDT library in Rust) already tracks per-character attribution, so the data is there. It's more implementation work upfront but eliminates the class of ordering bugs entirely.

### FFI Shared Library Architecture

An interesting architectural note: agent-doc's CRDT logic lives in a Rust shared library that gets dynamically loaded via FFI by editor plugins. The JetBrains plugin, VS Code plugin, and future plugins are all thin wrappers around this shared library.

This was motivated by early issues where each plugin had its own regex-based markdown parsing logic, leading to inconsistencies. Centralizing into Rust gives consistent behavior across all editors and lets me use proper tree-sitter parsing instead of fragile regexes.

## Tmux Pane Affinity: Still Playing Whack-a-Mole

The tmux pane proliferation bug from the [previous session](/posts/agent-doc-tmux-crdt-live) made another appearance. Despite the stash fallback and wrong-window detection fixes, panes were still occasionally escaping to other windows.

The investigation in this session focused on establishing strong one-to-one affinity between agent-doc projects and tmux sessions — blocking any movement or creation of panes in the wrong session. Some edge cases got fixed, but the root cause remained elusive. The orphaned panes may have predated the v0.22 fixes from earlier in the session rather than being newly created.

The honest takeaway: concurrent tmux operations with multiple Claude Code instances are inherently racy, and the fix is incremental. Each edge case caught makes the system more stable, but it's whack-a-mole until the architecture is fundamentally reworked.

## Agent-Doc v0.21.0 Release

The session wrapped with an agent-doc release:

- **Parallel/deep command** for worktree-based concurrent agent tasks
- **CRDT prompt ordering improvements**
- **Tmux pane affinity edge case fixes**
- **Audit-docs** pass before release

Over a hundred versions in at this point. The rapid iteration pace reflects both the tool's maturity trajectory and the meta-nature of the work — building the tool with itself means every session is both development and dogfooding.

## On Lightweight Processes and Future Ambitions

A thread running through the session: the philosophy behind keeping these tools process-light. Two reasons:

1. **Ease of use** — Lower friction means more people can access the power
2. **Future-proofing** — LLMs are improving rapidly. A lightweight, adaptable system can evolve with the technology. Heavy processes become anchors.

The ambition is to turn this toolchain into something others can use — not just for my own workflow, but as a set of tools that demonstrate what's possible when you combine AI agents with well-structured data and lightweight orchestration. The path there requires tightening up installs, improving onboarding, and making the power accessible without requiring my specific setup.

But first: the tools need to be undeniably powerful. That part is coming together.

---

**Tools used:** [agent-doc](https://github.com/btakita/agent-doc), [corky](https://github.com/btakita/corky), agent-resume, [Claude Code](https://claude.ai/claude-code)
