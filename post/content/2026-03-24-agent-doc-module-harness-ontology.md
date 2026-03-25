---
title: "Module Harness, Back-Testing, and Building a Domain Ontology with Agents"
description: "A live session exploring module-level harness context for agent-doc, back-testing concepts for evaluating harness effectiveness, agent teams vs organic architecture, and the first real usage of existence language to build a domain ontology — with the agent defining its own terminology."
date: 2026-03-24
featured: true
tags:
  - agent-doc
  - module-harness
  - existence-language
  - ontology
  - evals
  - rust
  - claude-code
  - live-coding
  - vibe-coding
  - agentic-programming
video_url: https://www.youtube.com/watch?v=OrGJi8Hh_bQ
---

# Module Harness, Back-Testing, and Building a Domain Ontology with Agents

Another live coding session working on [agent-doc](https://github.com/btakita/agent-doc). This one starts with tmux session sync recovery, moves into a new concept — module-level harness context — and ends with the first concrete usage of existence language to build a domain ontology where the agent defines its own terminology.

<iframe width="560" height="315" src="https://www.youtube.com/embed/OrGJi8Hh_bQ" title="Module Harness, Back-Testing, and Building a Domain Ontology with Agents" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

**What you'll see:** Tmux session recovery from a catastrophic bug, the birth of a new concept for structuring agent context at the module level, philosophical tangents on agent teams and back-testing, and a surprisingly productive ontology-building session where Claude defines terms like eval, contract, spec, harness, and audit — and I iterate on the definitions in real time. This is vibe coding — not a tutorial.

## Tmux Session Sync Recovery

The session opens in the aftermath of a nasty bug: all the panes in tmux session zero got killed, leaving the system running on session six. The root cause was agent-doc reading stale `tmux_session` values from frontmatter when the source of truth had moved to the project configuration file. Different task files had different session values, and the binary got confused when they diverged.

The fix: consolidate the tmux session source of truth into `agent-doc` project config, and add repair logic so that when a configured session is dead, the system auto-syncs to a live one. This also surfaced the need for better safety — we now have guards preventing the agent from accidentally killing all panes in a session.

## The Module Harness Concept

The big idea of the session: **put specs, agentic contracts, and evals inside the source files themselves as structured doc comments**.

I've been noticing that certain mistakes get repeated across sessions. The agent doesn't always remember module-level constraints, and the existing project-wide specs are too high-level to catch module-specific issues. The hypothesis: if every module carries its own harness context as a structured comment at the top of the file, the agent has exactly the context it needs when working on that module.

The shape looks like this: each module file gets a doc comment with three sections — **spec** (what the public interface does), **agentic contracts** (guarantees the module upholds for callers), and **evals** (named, testable scenarios that measure behavior). The harness is language-agnostic — the same structure works whether the comment syntax is `//`, `#`, or `/* */`.

### Why Module-Level, Not Just Project-Level?

Project-level specs describe *what the software should do* — functional requirements independent of architecture. Module-level harness context describes *what this specific module promises*. They're complementary layers:

- **Project specs**: functional, high-level, what should the software do
- **Module harness**: architectural, granular, what does this module guarantee

The harness also serves as **persistent structured memory** at the module level. Without it, the agent must re-derive module behavior from source on every interaction — expensive, error-prone, and inconsistent. With it, the agent reads the spec to understand promises, checks contracts for safety guarantees, and references evals for measurable correctness criteria.

### Keeping It Flexible

One concern: specs embedded in source files might get ignored or drift out of sync with implementation. I've seen this happen in other projects. The mitigation is that the harness is a *living document* — the agent updates it as part of the development workflow, not as a separate maintenance task. Drift detection becomes part of the audit cycle.

I'm also deliberately not over-prescribing the architecture yet. There's a lot of undiscovered territory in how agents should interact with module-level context. The strategy: keep the primitives tight, maintain flexibility, and let patterns emerge through usage.

## Back-Testing: Evaluating Harness Effectiveness

Inspired by quantitative finance, I floated the idea of **back-testing** for agent harness evaluation. The concept: take a git revision as a starting point, define a target spec, and measure how effectively different harness configurations get the agent from point A to point B.

The analogy to portfolio back-testing is direct:
- **Start state**: a git commit (the beginning of a development task)
- **Target**: a spec describing the desired end state
- **Variable**: the harness configuration (CLAUDE.md rules, module specs, contracts, evals)
- **Metric**: token usage, correctness, time to completion

You could use git worktrees to run parallel experiments with different harness configurations and score them. An evolutionary algorithm could even iterate on the harness itself, optimizing for the least token usage to achieve a given spec.

The complication: in real development, specs aren't static. They evolve through dog-fooding and discovery. A back-test with known specs is fundamentally different from the live experience of figuring out what the software should do while building it. But for evaluating harness effectiveness on well-defined tasks, back-testing could be powerful.

I'm not building this yet — it would be extremely token-expensive — but the concept is planted for when the tooling matures.

## Agent Teams Are a Human Artifact

A tangent that I think is worth expanding on: the idea that "agent teams" — CTO agent, developer agent, QA agent — are an artifact of how humans partition work, not necessarily how agents should be organized.

We break software development into roles because humans have finite capacity. A single person can only be responsible for so much effectively. But agents don't have the same constraints. The team structure — with its communication overhead, handoff points, and role boundaries — exists to manage *human* limitations.

When people create agent architectures that mirror human org charts, I think they're importing assumptions that don't apply. Managers who are comfortable assigning agents to person-shaped roles might be missing the bigger picture: agents are more like software components than team members. They can be ephemeral, they can hold multiple concerns simultaneously, and they don't need the social coordination overhead that human teams require.

Where it gets interesting: instead of dedicated role-agents, you could have module-level agentic context where each module carries its own behavioral specification. The "QA role" isn't a separate agent — it's encoded in the contracts and evals that live inside the module itself. The audit becomes a self-healing mechanism rather than a separate workflow step.

I'm staying cautious about prescribing architecture here. The territory is too new, and premature prescription locks you in when you have the least information.

## Building a Domain Ontology with Existence Language

The highlight of the session: asking Claude to **define its own terminology** for the module harness domain using existence language.

Existence language is my ontology framework — a set of canonical terms (Entity, System, Domain, Scope, Context, Resolution, Focus, etc.) that serve as building blocks for modeling any domain. I've used domain-driven design for over two decades, but this was the first time I've used existence language with an agent to construct a formal ontology for a software project.

The process: I asked Claude to create an ontology for module harness, precisely defining terms like eval, contract, spec, harness, and audit. What came back was remarkable — not just definitions, but layered analysis connecting each term to the base existence language ontology.

### Key Definitions (Agent-Generated, Human-Iterated)

**Eval** — A named, testable scenario that specifies and verifies a module's behavior. A repeatable pattern connecting spec to evidence. Each eval has a name (identifier), a scenario (input/precondition), and an expected outcome. Evals serve dual purposes: they document what should be tested (specification) and provide named targets for quantitative measurement (metrics). An eval may map to an existing test function or describe an aspirational scenario.

**Contract** — An invariant or guarantee a module upholds for its callers. Contracts describe cross-cutting guarantees that span multiple functions. This is the most valuable section for agent callers — an agent deciding whether to call a function needs to know: will this panic? Is it safe to call concurrently? Does it modify shared state? Contracts reduce agent hesitation and defensive coding.

**Spec** — The behavioral definition of a module's public interface. What it does, not how. Each entry describes one public function, type, or trait and the observable behavior callers can expect. A spec is the primary navigation tool for agents before modifying code. A spec that drifts from reality is worse than no spec — it creates false confidence.

**Harness** — Structured context applied to a module that bounds what an agent needs to know for effective operation. The narrowest useful scope for coding agents. It provides just enough context to make informed changes without reading every line of implementation. A harness manifests as a structured doc comment at the top of each source file. The pattern appears at multiple scales: module-level (single file), crate/package-level (README), and project-level (CLAUDE.md).

**Audit** — A systematic process of evaluating a module's harness against its actual state, applying evals to detect drift and measure coverage. Here's where it got interesting: I pushed back on the initial definition, which was too passive. In my experience with audit-docs, audits aren't just reports — they're *actionable*. An agentic audit that finds missing spec entries doesn't just report the gap; it generates the entries. The audit becomes a **self-healing mechanism** when the agent can act on its own findings. The updated definition captures both outputs: a quantifiable results report (scores, coverage ratios, drift metrics) and actionable items (work queue for agent remediation).

### Why This Matters

Having the agent report how it understands the ontology is powerful for two reasons:

1. **Alignment verification** — You can see exactly what the agent thinks these terms mean, catch misunderstandings early, and iterate toward shared definitions.
2. **Living documentation** — The ontology isn't a static document I wrote alone. It's co-created through dialog, which means it captures nuances that emerge from actual usage rather than theoretical design.

I can imagine running continuous agents that monitor project artifacts — emails, code reviews, conversations — and update ontology definitions based on how terms are actually used. Sentiment analysis is primitive compared to what's possible: tracking how the meaning of domain terms evolves across a project's lifetime.

## IPC Timeout and CRDT Merge Fixes

Near the end of the session, we tracked down a content duplication bug. The root cause: an IPC timeout during `agent-doc write`. The binary would exit with an error code but still save the patch file. The plugin would later consume the patch, and the content would get applied twice when the skill retried from disk.

The fix involved two changes: cleaning up patch files on IPC timeout to prevent double-application, and adding content verification after plugin patch consumption to detect silent failures. The test suite grew to 420 tests covering these edge cases.

There was also a CRDT merge issue where content got inserted at the wrong position during concurrent editing — a merge arrived while I was typing and the insertion point got confused. I didn't capture enough detail to reproduce it in this session, but it's on the radar.

## agent-doc v0.26.0 Release

The session wrapped with the v0.26.0 release of agent-doc, incorporating:
- Tmux session sync repair logic
- IPC silent failure verification
- Content verification after plugin patch consumption
- Module harness as a dev dependency
- Updated ontology documentation

Also released updates to tmux-router and module-harness as separate packages.

## Tools Used

- [agent-doc](https://crates.io/crates/agent-doc) — Structured AI document sessions in markdown
- [module-harness](https://github.com/btakita/module-harness) — Module-level harness context for agent development
- [Claude Code](https://claude.com/claude-code) — AI coding assistant
- tmux-router — Session orchestration for multi-pane AI workflows
- existence-language — Ontology framework for domain modeling

## Links

- [agent-doc on crates.io](https://crates.io/crates/agent-doc)
- [agent-doc on GitHub](https://github.com/btakita/agent-doc)
- [Previous session: Live Debugging tmux Race Conditions & CRDT Document Sessions](https://briantakita.me/posts/agent-doc-tmux-crdt-live)
