---
title: "Building a Sub-1KB Web Framework — Live Debugging with AI"
description: "A live coding session migrating rappstack to CloudFlare Workers + Hono, debugging ESBuild plugins with Claude Code, and demonstrating sub-1KB reactive web apps with full hydration."
date: 2026-03-14
tags:
  - rappstack
  - web-framework
  - cloudflare
  - hono
  - bun
  - esbuild
  - claude-code
  - live-coding
  - typescript
  - performance
  - agent-doc
video_url: https://www.youtube.com/watch?v=oFFHVjQaYdA
---

# Building a Sub-1KB Web Framework — Live Debugging with AI

This is a raw live coding session where I work on [rappstack](https://github.com/nicholasgasior/rappstack) — my composable web application framework built on [rmemo](https://github.com/nicholasgasior/rmemo) and [relysjs](https://github.com/nicholasgasior/relysjs). The session covers infrastructure migration, architecture walkthrough, and real debugging with [Claude Code](https://claude.com/claude-code).

<iframe width="560" height="315" src="https://www.youtube.com/embed/oFFHVjQaYdA" title="Building a Sub-1KB Web Framework — Live Debugging with AI" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

**Fair warning:** This is an unscripted session. There's genuine frustration, dead-end debugging, and the kind of raw developer experience that polished tutorials edit out. That's the point.

## The Performance Story

The headline number: **sub-1KB** for the reactive framework itself ([relementjs](https://www.npmjs.com/package/relementjs) — check the `size-limit` in `package.json`). But what matters more is what that translates to in real applications:

- **[briantakita.me](https://briantakita.me)** — 1.2KB total JavaScript for the full interactive site, including search, hydration, and reactive state
- **[brookebrodack.com](https://brookebrodack.com)** — 4.2KB total JavaScript driving video players, animations, and interactive content

These aren't framework overhead numbers — they're the total JS payload including actual application features. For comparison, React's hello world starts around 50KB before you write a single line of business logic.

## Architecture: Composable Layers

Rappstack splits everything into three layers:

| Layer | Purpose | Example Package |
|-------|---------|----------------|
| **domain** | Business logic, shared types | `@rappstack/domain--any--blog` |
| **server** | Server-side rendering, middleware | `@rappstack/domain--server` |
| **browser** | Hydration, client interactivity | `@rappstack/ui--browser` |

This separation means your client bundle only contains browser-layer code. Server logic never ships to the browser. Domain logic is shared but tree-shaken per target.

### Hyop: Minimal Hydration

The hydration system is called **hyop** (hydration operation). Instead of shipping a full virtual DOM diffing engine:

1. Server renders HTML with `data-hyop` attributes
2. A tiny script (~200 bytes) scans for hyop attributes on load
3. Each hyop maps to a function that takes the element and adds interactivity
4. No virtual DOM, no reconciliation, no framework runtime

This is conceptually similar to htmx but with a build system — you get module imports, tree-shaking, and TypeScript, at the cost of needing ESBuild (or Bun build).

## Infrastructure Migration

This session captures the middle of migrating from:
- **Contabo VPS** → **CloudFlare Workers** (better edge performance, easier automation)
- **Elysia** → **Hono** (more portable across runtimes — Bun, Node, Deno, CloudFlare Workers natively)
- **Local assets** → **CloudFlare R2** (edge-cached static assets via custom ESBuild plugins)

The `@nicholasgasior/esbuild-plugin-object-store-assets` plugin handles uploading build output to R2 and rewriting asset URLs.

## ESBuild Plugin System

One of the more interesting architectural decisions: custom file imports via ESBuild plugins.

- **`.md.ts`** — Markdown files compiled to ES modules with frontmatter + rendered HTML as exports
- **`.css.ts`** — CSS generated programmatically via TypeScript factory functions
- **`.svg.ts`** — SVG generated via TypeScript (used for CAD drawings, diagrams)

The generic `esm-file` plugin lets any file type become an importable module as long as you provide a factory function that returns the content. Blog posts are just markdown files auto-imported via a generated index.

## Debugging with Claude Code

The most relatable part of the session: spending 30+ minutes debugging duplicate blog post imports and a broken code generator. The bugs:

1. **`statSync` is not a function** — The code used `fs.statSync` which doesn't exist in the Bun compat layer. Claude instantly spotted it and replaced with `existsSync`.
2. **Missing `.md` extension pattern** — The code generator only matched `.ts`, `.js`, `.tsx` files. Claude added `.md` to the glob pattern.

The contrast is stark: I spent significant time manually navigating file trees trying to understand the problem. Claude identified and fixed both bugs in seconds. As I said in the video: *"Before Claude, I probably spent like a couple hours trying to figure this out."*

## Reflections

Some candid takeaways from the session:

- **TypeScript fatigue** — Coming back after 2+ years in Python/Rust: "the luster has worn off." The IDE navigation issues (IntelliJ not jumping to implementations, only type definitions) add friction.
- **Framework DX debt** — Rappstack works and the output is impressively small, but the developer experience needs polish. Custom conventions (trailing underscores for factory functions, `b_` prefix for reactive signals) create a learning curve.
- **AI as debugging accelerator** — The session demonstrates both the power and the pattern: try manually, hit friction, hand off to Claude, get instant results. The AI doesn't replace understanding, but it dramatically reduces the time from "I know something's wrong" to "here's the fix."

## Links

- [rappstack packages](https://www.npmjs.com/org/rappstack) — NPM organization
- [rmemo](https://www.npmjs.com/package/rmemo) — Reactive memo library
- [relementjs](https://www.npmjs.com/package/relementjs) — Sub-1KB reactive element library
- [briantakita.me](https://briantakita.me) — 1.2KB JS blog
- [brookebrodack.com](https://brookebrodack.com) — 4.2KB JS interactive site
- [Claude Code](https://claude.com/claude-code) — AI coding assistant used throughout
- [agent-doc](https://crates.io/crates/agent-doc) — Interactive document sessions (briefly shown)
