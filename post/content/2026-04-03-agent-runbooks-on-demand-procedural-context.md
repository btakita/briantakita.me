---
title: "Runbooks — On-Demand Procedural Context for AI Agents"
description: "A convention for externalizing step-by-step procedures from CLAUDE.md and AGENTS.md into on-demand runbook files, saving context window tokens while keeping agent workflows discoverable."
date: 2026-04-03
featured: true
tags:
  - ai-agents
  - claude-code
  - conventions
  - context-management
  - agentic-programming
  - developer-experience
---

# Runbooks — On-Demand Procedural Context for AI Agents

Every token in your CLAUDE.md costs you something. It's loaded on every interaction, shaping every response. The more procedural bulk you pack into it, the less room the agent has for the actual problem at hand.

Release checklists. Deploy procedures. Precommit workflows. Incident response steps. These are important, but they're not *always* important. An agent writing a utility function doesn't need your 40-line release checklist occupying context. Yet most teams inline everything into a single instruction file because there's no clear convention for where else to put it.

## The problem: context bloat in instruction files

CLAUDE.md (or AGENTS.md, or whatever your AI harness calls its instruction file) serves two purposes that are in tension:

1. **Policy** — conventions, architecture decisions, rules that apply to every interaction
2. **Procedure** — step-by-step instructions that apply to specific workflows

Policy is always-on context. It should be in the instruction file. Procedure is on-demand context. It should be loaded when needed and absent when not.

When you inline procedures into CLAUDE.md, you pay the full token cost on every interaction. In my own projects, by identifying and extracting 12 runbooks, I cut 212 lines from instruction files — a 28% reduction in persistent context that was irrelevant most of the time.

## Runbooks vs rules

AI coding tools already have "rules" — `.cursor/rules/`, `.windsurf/rules/`, Zed's `.rules`. Rules are **declarative policy**: coding conventions, architectural guidelines, behavioral constraints. They shape *how the agent thinks*.

Runbooks are different. They're **imperative procedures**: step-by-step instructions for specific tasks. They tell the agent *what to do*, not how to think.

- **Rule**: "Use snake_case for Python functions. Run tests before committing."
- **Runbook**: "Step 1: Run `make check`. Step 2: Verify output. Step 3: Stage changed files. Step 4: Review diff for secrets..."

The loading model is orthogonal — both rules and runbooks can be eager or lazy. What differs is the content type. A rule is guidance. A runbook is a checklist. Naming them differently tells the agent (and the human) what to expect when they open the file.

## The convention: `runbooks/*.md`

Put your procedural files in a `runbooks/` directory under whichever agent config directory you use. The directory name is still an emerging convention (see [Where to put them](#where-to-put-them-the-directory-question) below), but the pattern is the same regardless:

```
your-project/
├── .agent/runbooks/        # or .agents/runbooks/, .ai/runbooks/
│   ├── precommit.md
│   ├── prerelease.md
│   ├── deploy.md
│   └── incident-response.md
├── CLAUDE.md              # (or AGENTS.md, .cursorrules, etc.)
└── ...
```

Each runbook is a standalone markdown file with a clear title, a one-line description, and the procedural steps. Your instruction file references them with a single line instead of inlining the full procedure.

**Before** (in CLAUDE.md):

```markdown
## Precommit Checklist

1. Run tests and linting
   - Rust: `make check` (clippy + test)
   - JS/TS: `bun test` or `npm test`
   - Python: `pytest`

2. Add tests for new behavior
   - New functions/methods need unit tests
   - Bug fixes need regression tests
   - Edge cases identified during implementation need coverage

3. Audit instruction files (if changed)
   - `module-harness audit` (validates CLAUDE.md, AGENTS.md, SPEC.md consistency)
   - Verify CLAUDE.md reflects any architectural changes

4. Review diff
   - No secrets, credentials, or API keys in the diff
   - No debug/temporary code left behind
   - No unrelated changes bundled in
```

**After** (in CLAUDE.md):

```markdown
Before committing, follow `.agent/runbooks/precommit.md`.
```

25 lines replaced by 1. The agent reads the runbook on demand when it's actually committing code. Every other interaction gets those tokens back.

## Real examples

Here are two runbooks from [agent-loop](https://github.com/btakita/agent-loop), the workspace where these were first extracted:

### `.agent/runbooks/precommit.md`

A 25-line checklist covering four steps: run tests, add tests for new behavior, audit instruction files, and review the diff for secrets and debug code. Applies to every commit but doesn't need to occupy context during research, planning, or code review conversations.

### `.agent/runbooks/prerelease.md`

A 40-line multi-target release procedure covering common steps plus target-specific sections for cargo (crates.io), PyPI, npm, GitHub Releases, and binary installs. This procedure is needed maybe once per release cycle... not on every interaction.

These two runbooks alone save 63 lines of persistent context from the main instruction file. But the pattern scales further — I extracted 10 more runbooks from skill files (release workflows, security audits, email sending, module validation), saving an additional 149 lines. Some skills saw over 50% of their content moved to on-demand loading — procedures that only matter during specific operations, not on every invocation.

**Total across 12 runbooks: 212 lines saved, 28% reduction in agent instruction surface.**

### Nested runbooks: skills with sub-procedures

The pattern goes deeper. Claude Code skills themselves can contain runbooks, creating three tiers of progressive disclosure:

```
.claude/skills/agent-doc/
├── SKILL.md              # Level 2: loaded when skill triggers
└── runbooks/
    └── compact-exchange.md  # Level 3: loaded only on sub-task
```

The `/agent-doc` skill's `compact-exchange.md` is a 35-line procedure for compacting a document's exchange section (read, summarize, archive, replace, commit). It would bloat the skill's core instructions if inlined, but it's only needed when the user explicitly requests compaction.

This gives you three tiers of context management:
1. **Skill metadata** (always loaded) — name + description, ~2 lines
2. **SKILL.md** (on trigger) — core workflow, loaded when the skill activates
3. **Skill runbooks** (on sub-task) — specific procedures, loaded only when that sub-task fires

Each tier loads only when needed. The agent pays the token cost of tier 3 only during the specific operation that requires it.

## Where to put them: the directory question

The runbooks pattern works regardless of which directory you choose. But where should that directory live? The community hasn't settled this yet. Several conventions are emerging in parallel:

| Convention | Examples | Status |
|-----------|----------|--------|
| **`.ai/`** | [AgentInfra](https://github.com/JayCheng113/AgentInfra), [dot-ai](https://github.com/luisrudge/dot-ai) (archived), [agnostic-ai](https://github.com/betagouv/agnostic-ai) | Early-stage, ~40 stars combined |
| **`.agents/`** | [ACS spec](https://acs.jackby03.com/), [.agents Protocol](https://dotagentsprotocol.com/), [dot-agents](https://www.dot-agents.com/) | Multiple competing specs |
| **`.agent/`** | [dotagent](https://github.com/johnlindquist/dotagent) (122 stars), [AGENTS.md issue #71](https://github.com/agentsmd/agents.md/issues/71) | Most-starred proposal |
| **Tool-specific** | `.claude/`, `.cursor/rules/`, `.windsurf/rules/`, `.github/instructions/` | Established but vendor-locked |

None of these has won yet. The runbooks convention is intentionally agnostic — what matters is the *pattern* (externalize procedures into on-demand files), not the parent directory name.

In my own projects, I use **`.agent/runbooks/`** for three reasons:

1. **Namespace convention is singular.** Dot-directories follow the concept pattern: `.github/` (not `.githubs/`), `.vscode/`, `.cursor/`, `.claude/`. A directory is a namespace, not an address — `.agent/` means "agent config", following established convention.
2. **Natural compound nouns.** "Agent runbook" reads naturally. "Agents runbook" doesn't. Same for "agent context" vs "agents context."
3. **Most-starred prior art.** [dotagent](https://github.com/johnlindquist/dotagent) (122 stars) already uses `.agent/` — the highest-traction proposal in this space. The `.agents/` specs (ACS, .agents Protocol) are newer but have less real-world adoption.

Note: `AGENTS.md` is plural for a different reason — it's an address ("hey agents, read this file"). A directory is a namespace, and namespaces follow the concept pattern.

But `.ai/runbooks/` or `.agents/runbooks/` would work identically. Pick whichever aligns with the directory convention you're already using, or whichever feels right.

**What's your preference?** I'd genuinely like to hear which directory convention you're using or leaning toward. The ecosystem needs to converge, and real usage data matters more than spec committees.

## Precedent: the landscape is converging on this pattern

The idea of separating procedural from declarative agent instructions isn't new. The ecosystem has been converging on it from multiple directions.

**Progressive disclosure in Claude Code Skills.** Anthropic's [Agent Skills architecture](https://claude.com/blog/equipping-agents-for-the-real-world-with-agent-skills) uses a three-tier model: metadata (name + description) is loaded at startup so the agent knows *when* to use a skill, the full SKILL.md body loads only when triggered, and supplementary files load on-demand during execution. This explicitly separates the trigger ("what") from the procedure ("how").

**Cursor's activation modes.** `.cursor/rules/*.mdc` files support four modes: Always (policy), Auto Attached (glob-matched to file types), Agent Requested (agent decides when to load), and Manual (user-triggered). The Always/Auto split is exactly the policy/procedure distinction.

**GitHub Copilot's scoped instructions.** `.github/instructions/*.instructions.md` files use `applyTo` frontmatter with glob patterns (e.g., `applyTo: "**/*.ts"`) to scope instructions to specific contexts rather than loading everything always.

**Gemini CLI's `@file.md` imports.** `GEMINI.md` supports `@file.md` syntax to factor a large instruction file into modular pieces, loaded on reference.

**AGENTS.md nested files.** The [AGENTS.md spec](https://agents.md/) (stewarded by the Linux Foundation's Agentic AI Foundation) supports nested per-directory files concatenated root-to-leaf. OpenAI's own repo has 88 nested AGENTS.md files. This is directory-scoped policy, not procedure, but it demonstrates the appetite for splitting monolithic instruction files.

**Windsurf and JetBrains AI.** Both moved from single-file (`.windsurfrules`, `.junie/guidelines.md`) to directory-based rules (`.windsurf/rules/*.md`, `.aiassistant/rules/*.md`).

**AgentInfra's `.ai/` directory.** [AgentInfra](https://github.com/JayCheng113/AgentInfra) proposes a `.ai/` directory with a three-layer loading model: L1 = CLAUDE.md entry point (~400 tokens), L2 = task-driven `.ai/` docs (~2-4K tokens), L3 = on-demand source code. Early-stage but aligned with the same insight.

**Enterprise AI runbooks.** Digital Workforce [distinguishes](https://digitalworkforce.com/rpa-news/building-effective-ai-agents-the-essential-role-of-descriptions-and-runbooks/) between agent *descriptions* (trigger conditions + capabilities) and *runbooks* (step-by-step procedures). The description tells the system when to activate; the runbook tells the agent what to do.

The pattern is clear: every major tool is moving from "one file with everything" toward "policy file + on-demand procedural files." Agent runbooks are the explicit, cross-harness version of this pattern.

## Design principles

**1. One procedure per file.** Each runbook should cover exactly one workflow. If "deploy" has staging and production variants, make two files or use sections within one file.

**2. Runbooks are imperative, instruction files are declarative.** CLAUDE.md says *what* (conventions, rules, architecture). Runbooks say *how* (step-by-step procedures). This separation mirrors the distinction between policy and procedure in any well-run organization.

**3. Reference, don't duplicate.** The instruction file should contain a one-line pointer: "Before releasing, follow `.agent/runbooks/prerelease.md`." The agent reads the file when it reaches that step. No duplication, no drift.

**4. Keep runbooks self-contained.** A runbook should make sense without reading the instruction file first. Include enough context that the agent (or a human) can follow it cold.

**5. Version-control them.** Runbooks are code. They evolve with the project. They belong in the repo, not in a wiki or a shared doc that drifts out of sync.

## Cross-harness compatibility

This convention isn't tied to any single tool. Any AI coding assistant that can read project files can follow a reference to `.agent/runbooks/precommit.md`:

| Tool | Instruction file | How it loads runbooks |
|------|-----------------|----------------------|
| **Claude Code** | CLAUDE.md / AGENTS.md | Agent reads referenced files on demand |
| **Cursor** | `.cursor/rules/*.mdc` | Agent Requested mode or file reference |
| **GitHub Copilot** | `.github/copilot-instructions.md` | Scoped instructions with `applyTo` globs |
| **Windsurf** | `.windsurf/rules/*.md` | Agent reads referenced files |
| **Gemini CLI** | GEMINI.md | `@file.md` import syntax |
| **Aider** | CONVENTIONS.md | `--read` flag or `.aider.conf.yml` |
| **Codex (OpenAI)** | AGENTS.md | Nested per-directory + file reads |

The runbooks themselves are plain markdown. No special syntax, no vendor lock-in. The only requirement is that the agent can read a file when told to.

## Getting started

1. Create a `runbooks/` directory (e.g., `.agent/runbooks/`, `.ai/runbooks/`, or wherever fits your project)
2. Move any multi-step procedures from your instruction file into individual runbook files
3. Replace the inlined procedure with a one-line reference
4. Commit the runbooks alongside your instruction file

Start with whatever procedure is longest in your current instruction file. That's where you'll get the most context savings immediately.

---

*This convention emerged from building [agent-doc](https://github.com/btakita/agent-doc), a CLI for interactive document sessions with AI agents. When your tools run inside context-limited sessions, every token of persistent instruction matters. Runbooks are the natural answer: load what you need, when you need it.*
