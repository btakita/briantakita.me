---
title: "532 Commits in One Day: What Multi-Agent Sessions Reveal About Security and Debugging"
description: "A single day with 11 parallel agent-doc sessions produced 532 git commits across bug fixes, correspondence, and feature development. The debugging session alone took 292 commits to untangle snapshot rollbacks, duplicate writes, and session lifecycle failures. Here's what dog-fooding an agentic tool teaches you about multi-user security and complex debugging."
date: 2026-04-01
featured: true
tags:
  - agent-doc
  - security
  - tmux
  - rust
  - claude-code
  - agentic-programming
---

# 532 Commits in One Day: What Multi-Agent Sessions Reveal About Security and Debugging

I spent a day running 11 parallel AI agent sessions through [agent-doc](https://github.com/btakita/agent-doc), each working on a different task in its own markdown document. By the end of the day, I had 532 git commits — not code commits in the traditional sense, but conversation commits: each one capturing a prompt I typed or an agent response patch written back to the document. Every exchange is committed to git as part of agent-doc's normal workflow.

292 of those commits were spent debugging agent-doc itself — prompts asking Claude to investigate snapshot rollbacks, agent responses proposing fixes, test results, and the back-and-forth of tracing session lifecycle failures. The rest were split across tool development, correspondence, interview prep, and client work — all running simultaneously in separate tmux panes, orchestrated by editor focus.

*(Yes, this is dated April 1st. The 532 commits are real.)*

That day made two things clear: multi-agent workflows create security surfaces that don't exist in single-agent systems, and the only way to debug a tool this complex is to dog-food it on itself.

*A note on process: this blog post was itself authored through an agent-doc session. I pointed Claude at the git logs and task documents from that day and said "review what happened." The agent traced 532 commits across 11 documents to produce this narrative. That traceability — the ability to reconstruct a day's work from commits — is one of the themes of this post.*

## The Setup

Agent-doc turns markdown documents into interactive AI conversation sessions. Each document gets its own Claude Code instance running in a tmux pane. An editor plugin (JetBrains or VS Code) detects which document you're focused on and routes the corresponding Claude pane to the foreground. Think of it as multiplexed AI sessions, orchestrated through your editor.

The key design principle: **every agent response is committed to git.** When you invoke agent-doc, it computes a diff of your edits since the last cycle, the agent responds, and the response is written back to the document and committed. The commit history captures the full conversation.

**Agent-doc documents are designed to run in a private repository.** The session documents contain the full conversation between you and the agent — tool calls, file reads, command outputs. This is a feature: it creates a complete audit trail. But it means the repository must be private, because the audit trail captures everything.

On March 31st, I had 11 documents open simultaneously:

| Document(s)      | Commits | Purpose |
|------------------|---------|---------|
| agent-doc bugs   | 292 | Snapshot/session bug debugging |
| [corky](https://github.com/btakita/corky) | 60 | Tool development |
| briantakita.me   | 27 | Blog and site work |
| various contacts | 131 | Correspondence sessions |
| client projects  | 22 | Client work |

Each document had its own Claude session, each with tool access to the filesystem, git, and external services. All running in parallel.

## Security: What Multi-Agent Sessions Expose

Nothing went wrong that day — no credentials were leaked, no data was exposed. But running 11 concurrent agent sessions through a private repository makes the security surface impossible to ignore.

When an agent has access to the filesystem and git, routine audit checks of the private commit history can reveal patterns worth monitoring:

- Agents accessing files outside their document's scope
- Tool calls that reference credentials or sensitive configuration
- Cross-session information flow (one agent reading another session's document)
- Document links (`links` frontmatter) that synchronize context between sessions — powerful for workflow, but each link expands the data surface
- Unintended data in committed responses

In a private repository with a single user, these are normal behaviors — the audit trail is a feature. **But what happens when this scales to multiple users?**

### Prompt Injection Across Sessions

This is the fundamental unsolved problem. Agent-doc sessions are markdown files — the document *is* the prompt. In a multi-user setup, one person's edits to a shared document become another agent's context.

Imagine two developers sharing a repository with agent-doc sessions:
- Developer A writes a question in a session document
- Developer B (or a malicious actor with repo access) edits the same document, injecting instructions
- Developer A's agent processes the document, following the injected instructions as if they were legitimate prompts

The agent trusts the document content because the document *is* the prompt. There's no distinction between "content written by the authorized user" and "content written by someone else with repo access." The document itself becomes the injection surface.

**This is why agent-doc documents belong in private repositories.** The trust model assumes the repository owner is the only person editing session documents. Multi-user agent-doc sessions will ship with a shared security model that addresses this — per-user signing, edit attribution, and content integrity verification are on the roadmap. Until then, the private repo boundary is the security boundary.

### Credential Exposure as a Hypothetical

In prior sessions, audit reviews of the commit history revealed instances where agents included credential values in their output during debugging tasks. The agent optimizes for task completion — it doesn't model who will read its output. A `$(pass ...)` wrapper around secret access prevents this, and agent-doc now includes guardrails that enforce this pattern.

The point: **regular audits of private git commits can catch exposures that would otherwise go unnoticed.** The commit history is the defense — as long as the repository stays private.

## The Bug Cascade (292 Commits of Dog-Fooding)

The bulk of the day was spent debugging agent-doc with agent-doc. This is the nature of dog-fooding a tool that manages its own development sessions — the bugs you find are in the tool you're using to find them.

The 292 commits weren't one bug. They were a cascade of interrelated failures in the snapshot, session lifecycle, and IPC layers.

### Snapshot Rollback

The most insidious bug: a new agent session starting with a **stale snapshot** and rolling back previously committed responses.

Here's the sequence: Agent A writes a response to a document and commits it. The session dies (context exhaustion, crash, timeout). When the user navigates back to the document, the editor sync detects no active pane and starts a new session (Agent B). Agent B runs preflight, which calls `agent-doc commit` — but Agent B's snapshot is from *before* Agent A's response was written. So it stages the old snapshot content, effectively **un-committing** the response.

The user sees their response disappear from the git gutter. The agent re-processes the prompt and generates the response again — sometimes producing a duplicate. All of this is traceable in the commit history: the response appears, disappears, and reappears across three commits.

### Session Detection Failures

The editor plugin routes agent sessions by detecting which document has focus. When a session dies, the plugin should detect the dead pane and start a new one. But the detection was unreliable:

- The old pane might show "Resume this session..." but be unresponsive
- The session registry (`sessions.json`) still listed the dead pane as active
- The new session registered with a different UUID, but the document's frontmatter pointed to the old one

This created ghost sessions — panes that appeared alive to the registry but were actually dead, preventing new sessions from starting correctly.

### Duplicate Response Writes

When the snapshot rollback and session detection failures combined, the same response could be written multiple times. Agent A writes the response, dies. Agent B starts with a stale snapshot, rolls back the response, sees the user's prompt in the diff (since the response is now uncommitted), and re-generates it. If Agent B also dies before committing, Agent C repeats the process.

The commit history shows the response appearing and disappearing like a flicker. Each appearance is a new agent writing the same response to a fresh snapshot.

### The IPC Synchronization Layer

Underneath these bugs was the three-way IPC system that connects the editor, agent-doc, and tmux:

- **Editor → agent-doc:** IPC socket for patch delivery (agent writes to editor buffer)
- **agent-doc → tmux:** Session routing, pane management, stash/unstash
- **tmux → Claude:** Process lifecycle, restart with `--continue`, stdin injection

When the snapshot bugs surfaced, they didn't present as snapshot bugs. They looked like editor sync failures — the wrong content in the buffer, patches delivered to the wrong state. Diagnosing whether the issue was in the IPC layer, the snapshot logic, or the session lifecycle required tracing across all three systems simultaneously.

Each debugging cycle produced commits: "added operation-level logging" → "traced the write/commit gap" → "found it — new session starts with pre-write snapshot" → "fix: divergence detection in commit()." That trail made it possible to avoid re-investigating dead ends across 292 commits.

## Dog-Fooding as a Development Strategy

Here's the meta-lesson: agent-doc is itself a complex challenge. The interaction model — multiple agents, concurrent document edits, CRDT merge, IPC to editor plugins, tmux orchestration — is novel. There's no established SPEC to follow. The specification is being iterated as we discover what works and what breaks.

The complexity is worth it because it makes *other* complex problems tractable. The 11 simultaneous sessions I ran that day — correspondence, client work, interview prep, tool development — were all productive. The debugging session that consumed 292 commits resulted in fixes that prevent snapshot rollbacks, detect session lifecycle failures, and add operation-level logging for future diagnosis.

The only way to find these bugs was to use agent-doc at scale. Chat-based debugging can't hold 292 commits of investigation context. IDE debugging can't trace across three IPC systems simultaneously. The document-based session model held state across crashes, preserved the investigation history when Claude restarted, and let me annotate and redirect without losing context.

This is fundamentally different from chat-based debugging:

- **The document persists.** When Claude crashed and restarted, the document preserved the entire investigation. CRDT merge meant my annotations survived.
- **Multiple investigations run in parallel.** 11 documents active simultaneously. Discoveries in one informed the others.
- **The git history tells the story.** Every response is committed. You can reconstruct exactly what happened, when, and why.
- **The blog post writes itself.** When I decided to write about this, I pointed Claude at the session documents. The agent traced 532 commits to produce this narrative — from commits, not from memory.

## What I Changed

After this day, several structural improvements were made:

1. **Snapshot divergence detection** — `commit()` now detects when the file has content beyond the snapshot and auto-fixes before staging. Prevents rollbacks from stale snapshots.
2. **Session dedup guard** — Before starting a new session, validate that no existing pane is already serving the file. Cross-reference all running panes against the session registry.
3. **Operation-level logging** — Every `write`, `commit`, and snapshot save is logged with timestamps, content lengths, and session UUIDs. The session-level logs confirmed sessions were stable; the operation logs revealed the write/commit gap.
4. **Session registry cleanup** — Every command that touches `sessions.json` now prunes dead panes and detects duplicates.
5. **Secret guardrails** — The `/livestream` skill deny-lists sensitive files, scans for secret patterns, and requires `$(pass ...)` for all credentials. Applicable to any session where the audit trail might be shared.

*Each of these changes has its own commit trail in the session documents. The logging feature was proposed, discussed, implemented, and tested within a single document. That's not documentation written after the fact — it's documentation as a byproduct of the work itself.*

## The Bigger Picture

Agent systems are distributed systems, and they inherit all the failure modes of distributed systems.

Snapshot rollbacks happen because the consistency boundary isn't where you think it is. Session lifecycle failures happen because the liveness boundary isn't where you think it is. And credential exposure happens because the security boundary isn't where you think it is.

If you're building tools where AI agents have real access to real systems — especially in multi-user or multi-agent environments — you need:

- **Private repositories** for session documents — the audit trail captures everything
- **Regular audits** of the commit history for unexpected behavior
- **Explicit security boundaries** that the agent understands, not just conventions
- **Observable session state** so you can debug what happened after the fact
- **Persistent investigation surfaces** that survive agent crashes
- **Version discipline** across every binary in the execution path
- **Traceable process** — every prompt, every response, every decision committed to a history you can audit

532 commits in one day, across 11 documents, with full traceability. That's the power of interactive document sessions — and the attack surface they create. The tension between those two is the real lesson.

Build the audit trail first. Then make sure you control who can read it.

---

*agent-doc is open source: [github.com/btakita/agent-doc](https://github.com/btakita/agent-doc). A shared security model for multi-user sessions is under development. This blog post's own session document demonstrates the traceability described throughout.*
