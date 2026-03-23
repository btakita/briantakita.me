---
title: "Ep6: Deterministic Primitives — Skill to Binary Series"
description: "The design principle that emerged: put deterministic operations in the binary, let agents handle probabilistic coordination. Session wrap-up and reflections on AI-assisted development velocity."
date: 2026-03-23
featured: false
tags:
  - agent-doc
  - rust
  - philosophy
  - claude-code
  - live-coding
series: skill-to-binary
video_url: https://www.youtube.com/watch?v=xNBkZAJuUys
---


# Ep6: Deterministic Primitives

Episode 6 of the [Skill to Binary series](/posts/skill-to-binary-agent-doc-live). The shortest session at 19:35 — a wrap-up that reflects on the design principle that emerged across the full series. agent-doc v0.25.2 ships. The boundary reposition problem is resolved. Brian articulates why the series title is not just a refactoring story but a philosophy.

<iframe width="560" height="315" src="https://www.youtube.com/embed/xNBkZAJuUys" title="Ep6: Deterministic Primitives" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## Agents for Coordination, Software for Determinism

Brian opens with a clear statement of the architectural philosophy: "As much as possible, put things in the software. I know that there's also a large contingent of people who say the opposite — put it as much as possible into the agents' skills, or not even skills, just let it run. But I think that agents are really good for coordination and calling things logically, like doing pipelines that kind of figure out what you need to do. But they're not deterministic. So if you can create software for all the deterministic operations — like the little atoms, the primitives — then that's helpful. And that's a tool that the agents can use to improve the outcomes."

This is the architectural philosophy behind agent-doc's design. The CLI binary (Rust) handles all deterministic operations — git commits, file patching, boundary repositioning, IPC message delivery, snapshot diffing. Claude Code (the agent/skill) handles the non-deterministic parts: deciding what to write, how to structure a response, what code to generate. The boundary between these is intentional. Boundary repositioning logic being in the plugin (deterministic, rule-based: "always put boundary at end of exchange after applying response patch") rather than instructed to the agent per-session ("please remember to move the boundary") is a direct application of this principle. The agent cannot reliably remember to do operational bookkeeping every cycle. The software can.

The dominant narrative in AI tooling pushes toward "just prompt it" for everything. The counter-position — that deterministic operations belong in software — has strong theoretical backing: agents introduce variance at every step they execute. Composing multiple non-deterministic steps compounds that variance. Each time a deterministic operation is moved from software to agent instruction, you are converting a reliable primitive into a probabilistic one.

The practical test: "Can this operation fail silently?" Boundary repositioning failing silently means the user types in the wrong section and loses work. That must be deterministic. Response generation producing a suboptimal answer is acceptable variance.

## The Boundary Position Bug — Final Resolution

The complete fix flow documented in this session: `agent-doc commit` updates the git snapshot with the correct boundary position, then immediately emits a lightweight IPC message with `reposition_boundary: true` and no content patch. The plugin receives this message and moves the boundary marker to the end of the current exchange in the live editor buffer. No disk write occurs to the working tree file, so no "externally modified" dialog fires. The snapshot is already correct for the next diff computation.

This is the three-way consistency solution: snapshot correct (for diffing), editor buffer correct (for user typing), no spurious disk write (for UX cleanliness). The final solution required understanding three separate concerns that all converged on the boundary marker: the git snapshot, the working tree file, and the IDE buffer. These are three different representations of "the document." All three needed to agree on boundary position, but the operations that update each one have different characteristics: git commits are slow and synchronous, disk writes trigger IDE reload dialogs, IPC buffer patches are fast and invisible. The solution routes boundary updates through the fastest, least disruptive channel (IPC) while keeping the authoritative record (snapshot) correct.

## Skill vs. Plugin Architecture

"As much as possible put things in the software. The skill is in Claude Code's system prompt essentially — it's instructions to the agent. The plugin is code running in a deterministic environment."

agent-doc has three execution contexts:
1. The **Rust CLI binary** — file I/O, git operations, IPC emission, snapshot management.
2. The **JetBrains plugin (Kotlin/JVM)** — IDE buffer patches, boundary repositioning, VCS event responses.
3. The **Claude Code skill (Markdown in CLAUDE.md)** — natural language instructions telling Claude which binary commands to run, in what order, under what conditions.

The skill is not code in the traditional sense — it is probabilistic instruction. The binary and the plugin are deterministic code. The architectural principle: move as much logic as possible from the skill (probabilistic) into the binary or plugin (deterministic).

Brian also surfaced the wide command surface this creates: history, init, install, diff, reset, clean, audit-docs, start, route, prompt, commit, claim, focus, layout, sync, patch, watch, outline, resync, skill, plugin, write, stream, template, info, recover, pre-flight, compact, convert, mode, undo, extract, transfer-claims. "This is a pretty wide API. I don't mind it being wide, but I'm not like working with this on the command line yet so I'm not super familiar with it."

The wide command surface is a consequence of the philosophy taken seriously: every operation that used to be a step in an agent instruction ("now commit the document") is now a CLI command with defined semantics. This makes the CLI harder to learn but makes agent behavior more reliable. Tools should be precise, atomic, and deterministic — the agent decides when to call them but not how they work internally.

## Code Review Culture and AI Velocity

Brian reflected on how AI-assisted development interacts with team process norms:

"I generally wasn't really big into code reviews as a blocker. I generally like to roll forward as much as possible because that just has more velocity. I think that the people who are strict code reviewer types are probably going to struggle a little bit more with LLMs because it's a lot to keep track of."

He described a specific failure mode: large PRs that get rejected not because the code is wrong but because the scope is too big. As you start on one thing, you discover related issues at a lower level and want to fix them in place. LLM-assisted development tends to generate large, cross-cutting changes because the model holds more context simultaneously than a human and will naturally refactor related code when it encounters it.

The observation about strict review culture: "One approach in my opinion is like being so afraid you're going to do something wrong that you seize up and just play it's a little bit too perfectionist. But I don't think it results in better code — personally I think that actually results in worse code especially with larger projects, because the to-dos will just pile up and just be swept under the rug. And then you start having political battles, which really suck."

Team process norms designed for human-paced development — small PRs, blocking reviews, ticket-per-change — create friction when AI can generate 10x more code per session. This is not an argument against code quality; it is an argument that the mechanisms for ensuring quality need to evolve. Automated testing, continuous integration, and AI-assisted review are better-matched tools for the new velocity.

## The Firehouse Effect of Fast AI Sessions

Brian reflected on the experience of using agent-doc for rapid iteration: "I think that kind of a theme of all this is we are iterating quickly, and that's kind of what I believe agent-doc can give is just fast iteration. And you can kind of go deep down certain paths. And yes, there's a lot of information here. And it is sometimes kind of grueling because it's just a lot coming at you — it's like the firehouse effect."

He was optimistic about adaptation: "My experience with firehoses is that over time it gets better. Because it's pretty new, I'm a little tired from a lot of this, but over time it'll get better and easier to deal with. The brain just learns how to handle what was once novelty."

The compound discovery pattern is intrinsic to agent-doc sessions: each fix reveals a related issue that was masked by the previous bug. Fixing the "prompt above response" bug revealed the IPC timeout. Fixing the timeout revealed the boundary race condition. Fixing the boundary race revealed the snapshot vs. working tree desync. This is not a dysfunction — it is the system converging toward correctness by exposing layers of previously-masked state.

The tiredness Brian describes is real and well-known to developers who work with fast feedback loops: when iteration speed exceeds the brain's natural decision-making cadence, cognitive fatigue accumulates. The agent is tireless; the human in the loop is not. Practices that help: session time-boxing, explicit "done for now" decisions even when the to-do list is non-empty, and using the document (as agent-doc does) to externalize state so the brain does not have to hold it all in working memory.

## Releasing What Works, Deferring What Doesn't

The session ended with agent-doc v0.25.2 released. The pre-flight command was implemented and the skill updated. The boundary reposition race had a fix in place. The Markdown AST migration was partial (headings only). lazily-rs integration was deferred. YouTube comment pinning remained manual.

"I think after this completes, I'm just going to shut off and then work on the video and get it up. It's a really, really long one." Brian's explicit decision to stop and release — "I just kind of want to wrap this up because this has been very long" — is a form of scope management that prevents the session from becoming an ever-growing refactor with no shipped artifact.

The note on lazily-rs: "I don't want to introduce lazily-rs. I think I'm just going to release once we get this pre-flight done. Maybe I'll run into a bit and then depending on the performance we can add it." The temptation is always to keep going — the agent is still running, items remain on the to-do list, and the cognitive momentum is there. The discipline of shipping is the counter-force.

---

## Series Complete

The central thread across all six episodes was the boundary reposition problem — a timing issue that exposed four deeper architectural concerns: filesystem polling vs. event-driven IPC; three-way state consistency between git snapshot, working tree, and IDE buffer; the limits of LLM-proposed designs without explicit adversarial prompting; and the principle that deterministic operations should be in software, not in agent instructions.

The YouTube automation thread in Ep4 and Ep5 illustrated a related theme: official APIs give you reliable access to most functionality, but platform-privileged UI operations require browser automation — building privileged runtime adapters (browser extensions) rather than relying on unstable internal APIs.

Ep6's reflection ties the technical threads to a philosophy that is the real answer to "why move things from the skill into the binary?": agents are good at coordination and calling deterministic primitives; they are not reliable as the implementors of those primitives. The more you encode invariants in software, the more reliable the agent's behavior becomes, because you remove the probabilistic link from the chain of critical operations.

[Back to series overview: Skill to Binary — Debugging agent-doc Live](/posts/skill-to-binary-agent-doc-live)

---

**Series navigation:**
- Prev: [Ep5: Preflight & Browser Extension](/posts/skill-to-binary-ep5-preflight)
- [Series overview](/posts/skill-to-binary-agent-doc-live)
