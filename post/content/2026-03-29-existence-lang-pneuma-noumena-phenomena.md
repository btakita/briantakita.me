---
title: "Existence-Lang: Pneuma, Noumena & Phenomena in Software Ontology"
description: "A deep dive into existence-lang ontology development — building a formal language for modeling reality in software systems. Explores pneuma, noumena, phenomena, universal applicability, precision as possibility space, and permaculture as systemic design."
date: 2026-03-29
featured: true
tags:
  - existence-language
  - ontology
  - pneuma
  - noumena
  - phenomena
  - philosophy
  - software-architecture
  - permaculture
  - systemic-design
  - agent-doc
  - rust
  - claude-code
  - live-coding
  - vibe-coding
  - agentic-programming
video_url: https://www.youtube.com/watch?v=IWNj9GPb2OI
---

# Existence-Lang: Pneuma, Noumena & Phenomena in Software Ontology

A 2.5-hour live session continuing the development of [existence-lang](https://github.com/existence-lang/existence) — a formal language for modeling reality that applies equally to software systems, philosophical inquiry, and systemic design.

<iframe width="560" height="315" src="https://www.youtube.com/embed/IWNj9GPb2OI" title="Existence-Lang: Pneuma, Noumena & Phenomena in Software Ontology" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

**What you'll see:** Working bottom-up through existence-lang CLI installability, refining ontology term definitions, exploring the pneuma/noumena/phenomena triad, and a conversation with John Cassel about permaculture design principles and their parallels to ontology-driven development. This is thinking out loud while coding — vibe coding at the intersection of philosophy and software.

## Pneuma, Noumena, Phenomena

The session explores a fundamental triad that maps surprisingly well to software abstractions:

- **Pneuma** — The totality. Both known and unknown, seen and unseen. The vital breath pervading all of Existence. In existence-lang terms, Pneuma is Existence itself as the Universal Set.

- **Noumena** — The unseen aspects of reality. Two distinct kinds emerge: *content-free noumena* (abstractable only as "unknown" — structurally inaccessible, like NULL in databases) and *contingently unattended noumena* (abstractable once attention is applied — currently unknown but resolvable).

- **Phenomena** — The seen and expressible. What we observe, abstract, and communicate. The portion of pneuma brought into expression.

The NULL analogy proved particularly productive: noumena relates to phenomena the way NULL relates to known database values. Both are content-free pointers to unknowable/unknown states that distinguish "unknown" from "doesn't exist."

## Universal Applicability Principle

A core principle that emerged and was refined: every term in the ontology applies to every entity at every scope. There are no exclusive labels. All entities are Systems, have Perspectives, expose Abstractions and Interfaces.

When mapping ontology to a domain, describe how each term applies to each entity — never assign terms as exclusive role labels for architecture components. This prevents the common mistake of treating ontology as a taxonomy where each thing gets one category.

## Precision as Possibility Space

A subtle but important distinction:

- **Vague precision** = abstraction with full possibility space (encompasses noumena)
- **Precise precision** = abstraction with smaller possibility space
- Both are accurate at their respective levels

"An accurate abstraction includes the acknowledgment of its own limits. A vague definition that honestly encompasses the unabstractable is more accurate than a precise definition that pretends completeness."

The ontology always operates through abstraction. It never expresses raw pneuma — it works through abstractions at varying levels of precision.

## Scope and Resolution in Bounded vs Unbounded Systems

A key distinction that emerged: in bounded-information systems, scope and resolution trade off — wider scope means lower resolution, because finite information is spread thinner. But in unbounded systems — creative systems where information grows through activity — scope can increase without losing resolution. There's no inherent trade-off.

This matters because many of the systems we care most about are creative and therefore unbounded: permaculture sites, software projects, research programs, markets in their early phases. The bounded case is a simplification, not the default.

## Creative Systems and Steady State

Some systems start unbounded and creative — information grows as participants interact, succeed, fail, and evolve. These can transition to bounded "steady state" once incumbents or monopolists gatekeep the channels. But creativity is constrained, not necessarily extinguished — it depends on whether the boundary is permeable and whether the system has mechanisms for renewal.

This pattern appears across domains: markets that become monopolistic, codebases that calcify around legacy decisions, ecosystems that reach climax community. The question isn't whether boundedness kills creativity — it's whether the system retains mechanisms for cyclical renewal.

## Permaculture as Systemic Design

A response to John Cassel's outreach about permaculture design principles inspired an exploration of parallels:

- **Design practice framework**: guiding ethics, principles, vocabulary of categories for system interactions, toolbox of design methods
- **Discovery processes**: designers manage calculated risks through strategic intervention, reasoning about factor concentration without knowing each factor individually
- **Multi-criteria design**: systems designed across different scopes and contexts, accounting for emergent behavior and whole-system dynamics

The parallel: both permaculture and existence-lang provide a vocabulary for reasoning about complex systems where you can't know everything, but you can design with honest acknowledgment of what you don't know.

## Existence-Lang CLI & Dependency Management

On the practical side, the session works through existence-lang CLI installability and dependency management for the 114-node canonical ontology. The `existence fetch` command declares and resolves dependencies for markdown-based repos — a non-runtime dependency system for knowledge structures.

## Tools

- [existence-lang](https://github.com/existence-lang/existence) — Formal ontology language ([crates.io](https://crates.io/crates/existence))
- [agent-doc](https://github.com/btakita/agent-doc) — Interactive document sessions
- Claude Code — AI coding assistant
- Rust, tmux
