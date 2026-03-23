---
title: "Ep4: IPC Timeout Deep Dive — Skill to Binary Series"
description: "Why does the boundary reposition time out? Debugging the IPC layer between agent-doc and the JetBrains plugin, CRDT vs semantic ordering, and the argument for file descriptors over polling."
date: 2026-03-23
featured: false
tags:
  - agent-doc
  - ipc
  - rust
  - claude-code
  - live-coding
series: skill-to-binary
video_url: https://www.youtube.com/watch?v=j0684b9NZ-o
---
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "Ep4: IPC Timeout Deep Dive — Skill to Binary Series",
  "description": "Why does the boundary reposition time out? Debugging the IPC layer between agent-doc and the JetBrains plugin, CRDT vs semantic ordering, and the argument for file descriptors over polling.",
  "thumbnailUrl": "https://img.youtube.com/vi/j0684b9NZ-o/maxresdefault.jpg",
  "uploadDate": "2026-03-23",
  "duration": "PT42M",
  "contentUrl": "https://www.youtube.com/watch?v=j0684b9NZ-o",
  "embedUrl": "https://www.youtube.com/embed/j0684b9NZ-o",
  "author": {
    "@type": "Person",
    "name": "Brian Takita",
    "url": "https://briantakita.me"
  }
}
</script>


# Ep4: IPC Timeout Deep Dive

Episode 4 of the [Skill to Binary series](/posts/skill-to-binary-agent-doc-live). The session opens with an unresolved IPC timeout that Brian had hit the night before a phone call interrupted the session. Picking it back up the next day with fresh eyes, the debugging goes deep into the IPC architecture between the agent-doc Rust binary and the JetBrains plugin — and surfaces several interconnected architectural problems.

<iframe width="560" height="315" src="https://www.youtube.com/embed/j0684b9NZ-o" title="Ep4: IPC Timeout Deep Dive" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## The IPC Timeout That Wouldn't Go Away

The core symptom: boundary reposition IPC runs after git commit, but the 2-second timeout fires before the plugin consumes the message. The plugin's watch service polls every 500 milliseconds, so two seconds should be more than enough — which means something is holding up the consumer.

The eventual diagnosis: a git commit triggers a VCS refresh event inside IntelliJ. While the plugin is busy processing that VCS refresh, the IPC message sits in the queue. The plugin's watch service loop has not gotten back to consuming the pending patch. The very event that triggers the IPC message is also what delays its consumption — a self-reinforcing latency loop.

agent-doc uses a two-process architecture: the Rust binary writes IPC messages as JSON files to a shared directory, and the JetBrains plugin polls that directory on a 500ms cycle. These are separate processes (JVM vs. native binary) communicating via filesystem rather than shared memory or sockets. The "timeout" is not a network-style timeout but a client-side poll-and-wait loop where the binary writes a message and waits for the plugin to consume it by deleting the file.

The deeper issue: after a refactor, the commit path only updated the git snapshot, not the working tree. This created a window where the user types new text below the old boundary position, the next agent response patch uses the boundary position from the snapshot (now correct), but the working tree boundary hasn't moved yet. The user's in-progress typing ends up above the response — inverted conversational flow.

## Three Options for Boundary Reposition

Claude presented three options for fixing the boundary position race:

- **Option 1:** Skip IPC for reposition entirely; let the next `write` cycle handle it.
- **Option 2:** After the response IPC patch, send a second standalone IPC patch that only moves the boundary.
- **Option 3:** Bundle a `reposition_boundary: true` flag into the original response IPC patch so the plugin repositions the boundary in the same processing cycle it applies the content patch.

Brian rejected Option 1 on UX grounds: the fallback of doing a full disk write creates a disruptive "file externally modified" dialog in the IDE — sudden, jarring, and easy to accidentally dismiss with ESC (which rejects the change). Option 3 was chosen because it collapses two round-trips into one: the response content and the boundary reposition are handled atomically in a single plugin processing cycle.

This is a microcosm of the "exactly-once delivery" problem. The tempting fix (send a second message after the first succeeds) introduces a new timing window. The correct fix (make the first message self-sufficient) eliminates the window by making the operation atomic at the consumer.

## File Descriptors vs. Polling

Brian was blunt about the polling model: "This is why I want file descriptors. The plugin's watch service polls every 500 milliseconds with 10 polls at a 100 millisecond interval. I don't get that. Can we use an FD watcher instead?"

The poll budget math: with 10 attempts at 100ms each, the retry window is only 1 second — yet the timeout was firing at 2 seconds. Something beyond the poll math was causing delays.

IntelliJ plugins run inside the JVM with their own threading model. The polling service is a background task that wakes on a timer. If the plugin thread is occupied with a VCS refresh, UI repaint, or indexing job when the timer fires, the poll loop is delayed until the thread is free. The file descriptor / inotify approach (`inotify_add_watch` on Linux, `kqueue` on macOS) would allow the plugin to block on a kernel event rather than spinning a timer — reducing average latency from ~250ms (average of a 500ms poll) to near-zero, and eliminating the "plugin is busy" problem entirely for the consumption window.

Polling is the wrong default for latency-sensitive inter-process communication when both processes share a filesystem. It wastes CPU, introduces unpredictable latency, and creates interference patterns when the consumer is also doing filesystem-based work. The fact that git commit — the event that triggers the IPC message — also triggers VCS refresh that delays consumption is the problem in concrete form.

## CRDT Merge Ordering — Client ID Assignment

The session also surfaced a CRDT merge ordering bug: "Root cause: client ID swapped. Virus placed higher client ID first. Human content appears before agent content."

agent-doc uses a CRDT (Conflict-free Replicated Data Type) for merging concurrent edits. The CRDT uses deterministic client IDs to break ties when insertions happen at the same logical position simultaneously. The fix: assign the agent a lower client ID than the human, so when both insert at the same boundary position, the agent content (the response) goes first, followed by the human content (the new prompt). This matches the semantic expectation — response then prompt, not prompt then response.

The distinction matters: the CRDT only knows about positional concurrent inserts — it has no notion of "this is a response" vs. "this is a prompt." The semantic ordering is imposed by the choice of client ID assignment. The fix is not in the merge algorithm but in the configuration of identities. Deterministic client IDs are a form of priority encoding — whoever has the lower ID "wins" ties. This is a one-time design decision that permanently shapes the collaborative editing semantics of the system.

## Markdown AST Migration — pulldown-cmark and Its Limits

A partial migration from regex-based Markdown parsing to `pulldown-cmark` AST was attempted this session. The assessment: most scanning functions cannot be cleanly replaced because pulldown-cmark treats HTML comments as opaque events. The agent boundary marker (`<!-- agent-boundary -->`) shows up as an opaque `Event::Html` blob — so all structural logic for boundary detection remains regex-based regardless of the AST migration.

One function was successfully migrated: heading depth detection now uses `collect_headings` via the parser's event stream, which correctly ignores headings inside code blocks — something the old regex approach could not reliably do.

Brian also noted an efficiency concern: a new parser instance is created every time a scan function runs. The fix would be a `ctx` object passed down the call stack with a slot for the parser instance of the current document snapshot — possibly backed by lazily-rs for lazy caching.

The recurring pattern: you introduce a better abstraction (a proper parser) to replace fragile string matching, but the better abstraction has its own blind spot (opaque HTML comments). The result is a hybrid where some operations use the AST and others fall back to regex, carrying two different mental models for "where am I in this document."

## Markdown as a Scrollable UI Substrate

Toward the end of the session, Brian sketched out a speculative idea: simulate a scrolling terminal inside the Markdown document. The concept uses `scroll up` / `scroll down` links rendered as Markdown — pressing the link submits it as a prompt, the plugin replaces the visible "frame" of a terminal output section with the next or previous N lines. Each interaction cycle renders a new frame.

"Interestingly enough, you can basically simulate an entire user interface with Markdown." The same principle extends to chain-of-thought display or any bounded-window view of a larger buffer.

agent-doc is exploring a genuinely novel UI paradigm: the IDE's Markdown renderer is the display surface, and the agent interaction loop is the event loop. All of the IDE's existing capabilities — folding, search, syntax highlighting, VCS tracking — are available as a side effect. The scrollable terminal concept extends this further: the document is not just a conversation log but a general-purpose UI container.

---

**Series navigation:**
- Prev: [Ep3: AST Parsing & GPU Transcription](/posts/skill-to-binary-agent-doc-live)
- Next: [Ep5: Preflight & Browser Extension](/posts/skill-to-binary-ep5-preflight)
- [Series overview](/posts/skill-to-binary-agent-doc-live)
