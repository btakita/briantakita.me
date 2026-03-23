---
title: "Ep3: AST Parsing & GPU Transcription — Skill to Binary Series"
description: "Replacing regex with pulldown-cmark AST, debugging boundary markers across IPC paths, adding CUDA GPU transcription to corky, and designing the YouTube publishing pipeline."
date: 2026-03-23
featured: false
tags:
  - agent-doc
  - rust
  - whisper
  - cuda
  - claude-code
  - live-coding
series: skill-to-binary
video_url: https://www.youtube.com/watch?v=ntdcp2pH2qw
---

# Ep3: AST Parsing & GPU Transcription

Part of the [Skill to Binary: Debugging agent-doc Live](/2026-03-23-skill-to-binary-agent-doc-live) series.

<iframe width="560" height="315" src="https://www.youtube.com/embed/ntdcp2pH2qw" title="Ep3: AST Parsing & GPU Transcription" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

Episode 3 of the Skill to Binary series (1:59:39). The session covers three converging threads: replacing regex-based markdown parsing with a proper AST in agent-doc, tracking down the boundary marker bug across split IPC paths, and adding CUDA GPU transcription to corky so that hour-long video files stop taking forever to process. The tooling starts catching up to the workflow.

---

## Markdown AST Refactor: Replacing Regex with pulldown-cmark

Brian opens the session reviewing a completed AI run and immediately flags the parsing strategy: "Use the AST, the markdown... we should use markdown AST instead of regex for all markdown-related parsing within the agent-doc Rust library." The library in question — `pulldown-cmark` — was already listed in the project's dependencies but not wired in for internal parsing. The goal is to walk the AST to identify document components instead of running regexes over raw text.

The first concrete deliverable is checkbox state detection via AST — recognizing `- [ ]` and `- [x]` list items without pattern matching against the raw string.

The reason this matters beyond cleanliness: regex-based markdown parsing is context-blind. A `#` inside a code fence is not a heading. A `---` inside a list is not a thematic break. For agent-doc specifically, misidentification of document structure is not merely wrong output — it is document corruption. If the parser reads a code fence as the top of an exchange component, the agent inserts or deletes content at the wrong location. Those bugs are non-obvious and hard to reproduce. Moving to `pulldown-cmark` eliminates the entire class by construction.

---

## Boundary Marker Bug Across IPC Paths

The recurring symptom: typed prompts appear below the agent's response patch instead of above it. The Claude agent in the session narrows down the root cause precisely:

> "The binary reads the document from disk, extracts boundary ID, sends IPC patch JSON with boundary ID to plugin. Plugin reloads from disk and looks for the boundary. The problem is the IPC path never writes to disk. If the document has no boundary — lost in the previous cycle, compaction, or manual edit — found boundary ID is none. IPC patch has no boundary ID. Plugin skips boundary path. Follows caret-based insertion."

> "The binary snowball fix only runs in the disk-write path. IPC path bypasses it entirely."

Two fixes land in versions 0.2.11 → 0.2.12:

1. **Binary fix**: when building the IPC patch and no boundary exists, insert one into the document on disk first, then include that ID in the patch.
2. **Plugin fix**: remove the caret fallback entirely. When no boundary exists, fall back to inserting at the end of the exchange component — never at the caret position.

An additional invariant: `agent.commit` now calls "reposition boundary to end" after each successful commit cycle, so the boundary always trails the exchange and user edits cannot accidentally land below it.

This is a textbook split-brain architecture problem. The Rust binary and the IntelliJ plugin are two write paths that diverged in their handling of boundary recovery. The binary had the snowball fix; the IPC path never got it. The bug only shows up when a boundary has been lost — which happens on compaction, manual editing, or after certain error conditions — uncommon but real. The reposition invariant converts a class of positional bugs into a guaranteed structural property of the document. It eliminates a category, not just a symptom.

Brian also proposes rendering the boundary as a faint horizontal line or gutter indicator in the IDE plugin, making the invisible protocol marker visible. Invisible markers in the markdown source are a constant debugging friction point; a gutter hint turns that into observable system state.

---

## YouTube Publishing Pipeline Design

Brian walks through his manual video publishing process on stream and names the problem: "I keep on repeating the same steps for each video. Please create a function." The steps as he describes them:

1. Transcribe video using corky + GPU (generates `.srt` closed captions)
2. Upload video with generated captions
3. Generate blog post from transcript topics
4. Update video description to include link to the blog post
5. Post to LinkedIn and/or Twitter, scheduled for optimal time

The design tension: corky is the API automation tool (YouTube, Gmail, Twitter), while agent-doc is the document-oriented session tool. A multi-step content workflow spans both. Where does the workflow encoding live — as a corky subcommand, as an agent-doc session document, or as a shell script? Brian lands on: the automation goes in corky, the editorial judgment stays in the document session. They are different tools for different categories of work.

This episode is itself produced by the workflow it is describing. The tooling and the content it produces are the same system.

---

## CUDA Feature Flag Problem and cargo install Limitations

Brian notices Whisper transcription is running on CPU. For an hour-long recording that is slow. He wants corky to use CUDA by default when a GPU is available. The agent explains the constraint:

> "Not possible with `cargo install`. Build.rs cannot dynamically enable features. The `transcribe-cuda` feature pulls in `whisper-cuda` as a dependency, which must be selected at the `cargo install` invocation level."

The proposed paths forward:

- **`install.sh` script**: detect GPU at install time, invoke `cargo install --features transcribe-cuda` or `transcribe-metal` as appropriate.
- **Dual binary release**: build `corky` and `corky-cuda` as separate binaries on GitHub Actions, ship both in the GitHub Release, let the install script pick. Complication: GitHub Actions runners do not have CUDA, requiring an NVIDIA CUDA container or cross-compilation.
- **`make release-gpu` target**: for local developer builds, a Makefile target that compiles with CUDA features included so `bin/corky` gets the GPU build.

Mac support gets `transcribe-metal` (Apple Metal compute) as a third feature variant alongside `transcribe-cuda`.

This is a well-known Rust ecosystem pain point. Cargo features are compile-time selectors, not runtime options. There is no single binary that auto-detects hardware at startup and enables the appropriate compute backend. Unlike Python — where you can `import cupy` and fall back to NumPy at runtime — Rust requires the dependency graph to be fixed at compile time. The "simple" UX of `cargo install corky` giving a GPU-accelerated binary on CUDA machines is structurally impossible with standard `cargo install`. The install-script approach is the correct production solution but adds friction for developers expecting the standard cargo flow to just work.

---

## Diff-Based Context Loading for Skill Updates

A context-efficiency improvement discussed in the session: the agent-doc skill now reads only from the document head and runs a diff, rather than loading a full snapshot each cycle.

> "Old flow: read snapshot → 90% duplicate → N tokens. New flow: read head + `agent-doc diff` output → 0.1 × N tokens."

For a document where 90% of content is unchanged between cycles, this reduces context tokens by roughly 10x. The `agent-doc diff` binary command produces the diff directly, making it a first-class operation.

The skill also gains version-aware auto-update: when the installed binary version is newer than the version recorded in the skill file, the preflight check prompts an upgrade. Skill/binary version drift causes subtle behavioral errors that are hard to diagnose; the version check creates a forcing function to keep them in sync.

---

## Whisper Hallucination Artifacts

The transcript for this episode carries visible evidence of the CPU-transcription problem: large segments of silence render as repetitive single-line hallucinations.

```
[00:25:38.080 --> 00:25:39.080]  I'll be doing it on Twitter.
[00:25:39.080 --> 00:25:40.080]  I'll be doing it on Twitter.
... (repeated ~30 times)
```

These correspond to silence, typing-without-speaking, or low-energy filler audio. The Whisper model hallucinates the most statistically likely continuation of its own previous output when it encounters silence.

For a publishing pipeline that uses transcripts to generate blog post topics, hallucinated repetitions are a corruption problem: they inflate token counts, skew topic extraction toward spurious content, and produce nonsensical blog sections if not filtered. The fix is twofold: GPU acceleration so transcription completes fast enough to review before downstream processing, and a post-processing step to the `corky transcribe` command that strips repetitive hallucination sequences via sliding-window deduplication. This is a known technique for Whisper output and would make the transcript pipeline significantly more robust.

---

## Append vs. Replace Mode in Response Handling

Brian reflects on the two response modes:

> "I have this append mode and there's also replace mode, but replace mode feels a little too aggressive because it removes some of the history. I might want to revamp replace mode to include some viable history. But right now I've just been using append mode and compacting as needed."

Append mode builds an ever-growing exchange history, which needs periodic compaction. Replace mode discards prior content, keeping only the current state — useful for focused sessions but destructive to context needed for debugging. The desired behavior — a replace mode that retains viable history — is selective compaction: replace the full response but preserve key decision points. The agent-doc-specific version of this is interesting because the memory lives in a structured markdown file that both human and agent can edit, which opens richer options than a simple token budget.

---

## Navigation

- Previous: [Ep2: The Snowball Bug](/2026-03-23-skill-to-binary-ep2-snowball-bug)
- Next: [Ep4: IPC Timeout Deep Dive](/2026-03-23-skill-to-binary-ep4-ipc-timeout)
- Series: [Skill to Binary: Debugging agent-doc Live](/2026-03-23-skill-to-binary-agent-doc-live)

## Tools

- [agent-doc](https://github.com/btakita/agent-doc) — Interactive document sessions for AI agents
- [corky](https://github.com/btakita/corky) — Correspondence kit with email sync, social posting, transcription, and YouTube pipeline
- [Claude Code](https://claude.ai/claude-code) — Anthropic's CLI for Claude
- [pulldown-cmark](https://github.com/raphlinus/pulldown-cmark) — Pull-down style CommonMark parser for Rust
