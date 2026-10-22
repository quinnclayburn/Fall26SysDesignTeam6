---
name: spec-driven-project-framework
description: Set up or design a spec-driven development project — a document set (business case, specification, style guide, data & API design, plan, tasks) that an AI agent builds from one task at a time, with a front-end test build leading to a final build through tiered (P1/P2/P3) features. Use when asked to scaffold a spec-driven project, copy the project framework into a repo, create spec/plan/tasks docs, or design a customized spec-driven process for a team or solo project of any size.
version: 1.0
updated: 2026-10-02
---

# Spec-Driven Project Framework

A reusable process where **documents are the source of truth** and builds exist to test them. Six documents (business case, specification, style guide, data & API design, plan, tasks) are traced together by requirement IDs, checked by an SVC (Simple / Valuable / Complete) self-check, and built one task at a time, tier by tier.

Choose a mode from the request.

## Mode 1 — Copy the template into an empty repo

Use when the user wants the framework as-is, or says "set up", "scaffold", "copy the framework".

1. Check the target is an empty repo (only `.git`, maybe a LICENSE/.gitignore). If it has content, ask before continuing; never overwrite existing `README.md`, `CLAUDE.md`, or `docs/`.
2. Copy exactly three things from `template/` (relative to this skill) to the repo root: `docs/`, `README.md`, `CLAUDE.md`:
   ```bash
   cp -R <skill-dir>/template/docs <skill-dir>/template/README.md <skill-dir>/template/CLAUDE.md <repo>/
   ```
   Do not copy anything else (no `.claude/`, no app starter files).
3. Append `prototype/` and `validation/` to the repo's `.gitignore` (create it if missing).
4. Ask only for: product/project name, scale (solo / small team / larger), phase length (e.g. days, weeks), and who owns each role. Replace `[Product/Service Name]` in the README and `docs/*.md` titles, and fill the role names if given. **Leave every document's content blank** — the owners write it.
5. If the user already knows the stack, note it for ADR-00 but don't fill the Plan.
6. Tell the user the next step: `docs/business-case.md`, then Spec Section 0; and the path in `template/README.md` ("Start here") and `docs/reference/build-and-test-guide.md`.

The template is stack-neutral. For a front-end test build, follow the ladder in `build-ladder.md`; pick the stack in ADR-00 (any web-app starter skill or scaffold the user already has fits in there).

## Mode 2 — Use the framework as a pattern for a custom implementation

Use when the user wants a tailored process ("design a spec-driven process for X", "adapt this to…", a non-software context, a very short or very long timeline).

1. Read `pattern.md` (the invariants and each document's purpose), then `adapting.md` (scale presets).
2. Ask for: the context, who is involved, timescale, and what "built" means (app, report, service, curriculum…).
3. Generate a customized document set using the template files in `template/docs/` as the structural reference. **Keep the invariants; change everything else** — rename sections, merge or shrink documents, mark non-applicable sections "N/A because…", swap the build ladder rungs for ones that fit.
4. State every assumption as "ASSUMPTION:" and list what you merged, shrank, or skipped, and why.

## Rules that hold in both modes

- Don't write document content for the owners unless asked; AI may draft only when the user says so, and Evidence rows must come from real people.
- Never edit the user's existing documents without being asked.
- Build one task at a time, one tier at a time; a person runs every "Done when" check (see `template/CLAUDE.md`).

## Files in this skill

| File | Purpose |
|---|---|
| `pattern.md` | The framework distilled: invariants, document chain, ID tracing |
| `adapting.md` | Presets by scale and context; what to merge, shrink, or skip |
| `build-ladder.md` | Template → prototype → front-end test build → final build, with tiers |
| `template/` | Copy-ready `docs/`, `README.md`, `CLAUDE.md` |
