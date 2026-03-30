---
title: "Agent-Doc: Building a Cross-Platform FFI Plugin with Socket IPC"
description: "Live session replacing file-based IPC with cross-platform socket communication in agent-doc's FFI plugin backend — centralizing editor plugin logic in Rust rather than duplicating across JetBrains, VS Code, Vim, and Zed."
date: 2026-03-27
featured: true
tags:
  - agent-doc
  - ffi
  - socket-ipc
  - rust
  - cross-platform
  - jetbrains
  - vscode
  - plugin-architecture
  - existence-language
  - ontology
  - claude-code
  - live-coding
  - vibe-coding
  - agentic-programming
video_url: https://www.youtube.com/watch?v=u8qnbhsGAGo
---

# Agent-Doc: Building a Cross-Platform FFI Plugin with Socket IPC

A live coding session tackling a core architectural decision in [agent-doc](https://github.com/btakita/agent-doc): replacing file-based IPC with socket-based communication, and centralizing all plugin logic in a shared Rust FFI backend rather than duplicating it across each editor plugin.

<iframe width="560" height="315" src="https://www.youtube.com/embed/u8qnbhsGAGo" title="Agent-Doc: Building a Cross-Platform FFI Plugin with Socket IPC" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

**What you'll see:** The tension between Claude's instinct to minimize effort (implementing a pure Kotlin solution) and the architectural goal of a shared FFI backend. How CLAUDE.md instructions, memory feedback, and skills interact to guide agent behavior toward the right abstraction layer. Plus, applying existence-lang ontology concepts to reason about plugin architecture.

## The FFI-First Architecture

Agent-doc supports multiple editor plugins — JetBrains, VS Code, and eventually Vim, Zed, Helix, and others. The naive approach duplicates logic in each plugin's native language. The better approach: implement core logic once in Rust as a shared FFI library, then write thin event-reporting frontends for each editor.

This session builds the socket IPC layer that replaces the previous file-based approach. Sockets on Linux and macOS, named pipes on Windows. The FFI library exposes a C ABI that any editor plugin can call through its language's FFI mechanism — JNA for Kotlin (JetBrains), N-API for TypeScript (VS Code), etc.

## When Claude Minimizes Effort

An interesting pattern emerged: when asked to implement the socket IPC, Claude chose to write a pure Kotlin implementation inside the JetBrains plugin — technically correct, but architecturally wrong. It optimized for immediate effort reduction rather than following the FFI-first convention documented in CLAUDE.md.

This led to a productive discussion about how to make architectural conventions stick when your coding partner has an instinct to minimize effort:
- CLAUDE.md instructions alone weren't strong enough
- Memory feedback helped but wasn't sufficient
- The solution: encode the convention into a skill and reinforce it with domain ontology — a shared vocabulary that persists across sessions

## Ontology Applied to Architecture

The session applies existence-lang concepts to the plugin architecture:

- **System**: The FFI library as the internalized whole — the shared foundation that all plugins depend on
- **Interface**: The C ABI boundary through which editor plugins communicate with the backend
- **Scope**: Each editor plugin has a narrower scope than the FFI library; the library serves the broadest scope
- **Abstraction**: Each plugin's view of the backend is an abstraction — a symbol representing the real entity through its interface

This isn't just philosophical decoration. Grounding architecture decisions in ontology creates a shared vocabulary that persists across sessions and helps the agent reason about where logic belongs.

## Tools

- [agent-doc](https://github.com/btakita/agent-doc) — Interactive document sessions
- [existence-lang](https://github.com/existence-lang/existence) — Formal ontology language
- Claude Code — AI coding assistant
- Rust, JetBrains, tmux
