---
title: "Skill to Binary: Debugging agent-doc Live — 6-Part Mini-Series"
description: "A 7.5-hour live coding mini-series documenting the migration of agent-doc's boundary management from the Claude Code skill into deterministic binary/plugin code — and the cascade of bugs discovered along the way."
date: 2026-03-23
featured: true
tags:
  - agent-doc
  - corky
  - crdt
  - ipc
  - rust
  - claude-code
  - live-coding
  - vibe-coding
  - agentic-programming
  - whisper
  - cuda
playlist_url: https://www.youtube.com/playlist?list=PL4Ma0srhCY3PVBZF3D541tPyPPm1BhnEI
---

# Skill to Binary: Debugging agent-doc Live

A 6-part mini-series (7:34 total) documenting one of those bugs that starts small and spirals. What began as a prompt ordering issue in [agent-doc](https://github.com/btakita/agent-doc) turned into a full architectural migration — moving boundary management from the Claude Code skill into deterministic binary code.

<iframe width="560" height="315" src="https://www.youtube.com/embed/videoseries?list=PL4Ma0srhCY3PVBZF3D541tPyPPm1BhnEI" title="Skill to Binary — Debugging agent-doc Live" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

**What you'll see:** Real debugging across 6 sessions. CRDT merge bugs, IPC timeouts, a snowball corruption bug, JetBrains plugin cursor issues, and philosophical detours about deterministic vs probabilistic code. This is not a tutorial — it's the messy reality of building tools while using them.

## The Episodes

### [Ep 1: The CRDT Ordering Bug](/posts/skill-to-binary-ep1-crdt-ordering) (1:58:46)

The session starts with a deceptively simple bug: user prompts appearing below agent responses instead of above. CRDT merge guarantees no data loss but doesn't preserve semantic ordering. The root cause turns out to be an editor caching issue in the IPC path. Along the way, a digression about "vibe coder" labels and why prescriptive language compresses nuance.

### [Ep 2: The Snowball Bug](/posts/skill-to-binary-ep2-snowball-bug) (1:31:49)

Moving boundary management into the binary reveals a cascading corruption bug — each cycle makes the state worse. The fix: unconditional boundary reinsertion. Also discovers a JetBrains plugin bug where responses get inserted at the cursor position instead of the exchange boundary.

### [Ep 3: AST Parsing & GPU Transcription](/posts/skill-to-binary-ep3-ast-gpu-transcription) (1:59:39)

Replacing regex-based markdown parsing with pulldown-cmark AST. Adding CUDA GPU transcription to [corky](https://github.com/btakita/corky) and building out the YouTube publishing pipeline. The session where the tooling starts catching up to the workflow.

### [Ep 4: IPC Timeout Deep Dive](/posts/skill-to-binary-ep4-ipc-timeout) (0:42:00)

Why does the boundary reposition time out? Debugging the IPC layer between the agent-doc binary and the JetBrains plugin. CRDT vs semantic ordering, polling architecture, and the argument for file descriptor-based signaling.

### [Ep 5: Preflight & Browser Extension](/posts/skill-to-binary-ep5-preflight) (1:02:17)

Designing the `preflight` command — the orchestration entry point that replaces the old `submit` flow. YouTube comment automation research leads to planning a browser extension. The IPC boundary reposition bug finally gets fixed with a plugin-side reposition flag.

### [Ep 6: Deterministic Primitives](/posts/skill-to-binary-ep6-deterministic-primitives) (0:19:35)

The wrap-up. Reflecting on the design principle that emerged: put deterministic operations in the binary, let agents handle probabilistic coordination. Agents are great for pipelines and config — they're not great for operations that must be correct every time.

## The Publishing Pipeline

This series was itself produced using the tools being built in the videos. The workflow:

1. **Light edit** — ffmpeg silence detection (-30dB, 3s threshold) removes waiting-for-agent dead air
2. **GPU transcription** — corky's Whisper CUDA backend generates closed captions
3. **Upload** — `corky youtube publish` handles video + SRT caption upload
4. **Playlist** — `corky youtube playlist create` + `corky youtube playlist add` (new in corky 0.21.0)

Total: 8:52 raw recording reduced to 7:34 after silence removal, re-encoded from 19.5 GB to 1.9 GB.

## Tools

- [agent-doc](https://github.com/btakita/agent-doc) — Interactive document sessions for AI agents
- [corky](https://github.com/btakita/corky) — Correspondence kit with email sync, social posting, transcription, and YouTube pipeline
- [Claude Code](https://claude.ai/claude-code) — Anthropic's CLI for Claude
