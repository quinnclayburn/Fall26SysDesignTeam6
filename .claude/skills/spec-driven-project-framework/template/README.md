# [Product/Service Name] — Spec-Driven Project

**What this is:** a project run through a small set of design documents — business case, specification, style guide, data and API design, plan, and tasks. **The documents are the source of truth.** You build the product with an AI agent (or by hand), one task at a time, first as a throwaway test build to find gaps in the documents, then as the final build. The builds test the design; fixing the document always comes before fixing the code.

This works for a team or one person, over a week or a year. See the "Adapting the Process" section to size it to your project.

## Start here

1. Fill in `docs/business-case.md` (should we do this at all?) and the Constitution (Section 0 of `docs/specification.md`).
2. Work down the phases below, one document at a time. Each document has a template in `docs/`, a short guide in `docs/reference/`, and a filled-in example in `docs/examples/`. New to a term? See `docs/reference/glossary.md`.
3. Climb the build ladder in `docs/reference/build-and-test-guide.md`: prototype test → validation build (front end, simulated data, Tier 1 only) → fix and re-run → final build, tier by tier.
4. Make sure `prototype/` and `validation/` are listed in `.gitignore`.

## Roles

| Role | Owns | Also |
|---|---|---|
| **Product Owner** | Business Case, Specification | Answers open questions from the other roles; leads the prototype test |
| **Architecture Lead** | Plan, Data & API Design | Reviews the Spec for feasibility |
| **Delivery Lead** | Style Guide, Tasks, Status | Runs the validation build |

Each document has exactly one owner, and everyone reviews every document. **Working solo?** One person holds all three roles, but still names an owner per document and reviews each one in the role's voice. **A larger team?** Split a role's documents between people; every person who splits a role signs its approval lines.

## The Process at a Glance

| Phase | Focus | Main documents | Exit check |
|---|---|---|---|
| 1. Frame | The problem and the rules | `business-case.md`, Constitution (`specification.md` §0) | Business Case SVC passes; sponsor decided |
| 2. Specify | What to build | `specification.md`, `style-guide.md` | Spec and Style Guide drafts pass SVC |
| 3. Design | How to build it; its data | `plan.md`, `data-api-design.md` | Prototype test done; Spec, Plan, Data & API approved |
| 4. Task | Break it down; check the docs agree | `tasks.md` | Cross-check has no empty cells |
| 5. Validate | Test the docs with a front-end build of Tier 1 | Gap log (`tasks.md` §3) | Every gap logged and assigned |
| 6. Fix | Fix the docs, re-run | All docs | Gaps fixed in re-run, or reason recorded |
| 7. Build | Final build, tier by tier | All docs | Each tier gate passed |
| 8. Sign-off | Final check and handoff | All docs | All approvals dated; Build Notes filled |

The phases are an order, not a calendar. Give each a day, a week, or a month. Phases may overlap in small projects, but no phase's exit check may be skipped.

**Tiers:** every scenario in the Spec is tagged **P1** (must have), **P2** (should have), or **P3** (nice to have). P1 together is the smallest version that still solves the problem — it's what the validation build covers and what the final build does first. A tier starts only after the previous tier's gate passes.

**The one rule that applies in every phase:** if something is wrong, fix the document first, then anything that depends on it (Spec → Style Guide / Data & API Design / Plan → Tasks → code).

**Versions and approval:** each document's header holds its version and an approval line. Whenever an approved document's content changes, its owner bumps the version (1.0 → 1.1) and the reviewers re-approve it by updating the names and date. Adding Open Questions rows or changing task statuses doesn't count as a change, and Tasks has no version.

**Using AI on the documents.** You may use AI to draft, critique, or tighten a document, but the owners own every word.
- **Evidence comes from real people.** AI-written quotes, personas, or survey results never go in the Evidence table.
- **People make the decisions.** Priorities, the Constitution, ADR choices, and approvals are yours. AI can suggest options, but it doesn't choose.
- **Check everything it adds.** AI fills gaps with plausible guesses — the same problem the validation build exposes. If you can't explain a line, cut it.
- **Say how you used it.** Add an **AI use** line to each Status entry.

## Status

At the cadence you chose (daily, weekly, or per milestone), add a short entry to the top of `docs/STATUS.md`: what was done, what's next, blockers, open questions, and how AI was used. The Delivery Lead owns the file; everyone contributes. A sponsor or reviewer can reply in the entry.

## Technology Choices

Nothing is imposed. Record every choice in `docs/plan.md` ADR-00 and answer two separate questions, whose answers can differ:

- **Build option:** what the test builds use — typically a **simulated backend** (sample data files plus one data-access module).
- **Designed for:** the real database and services the design targets.

Whether simulated or real, **the design stays the same**: entities, field names, endpoints, and response shapes match `docs/data-api-design.md` exactly, so a real backend can replace the simulation without redesign. If the project has no screens or no stored data, mark the sections that don't apply "N/A because…".

**Agent instructions:** `CLAUDE.md` holds the rules every AI build follows. Tools that read a different instruction file can be pointed at it.

**Repo layout:**

```
/                        project root: the final build lives here
├── (app or deliverable files, as your ADR-00 stack requires)
├── docs/                design documents, STATUS.md, plus the guides and examples
├── prototype/           throwaway prototype (never committed)
├── validation/          throwaway validation build (never committed; delete after re-run)
├── CLAUDE.md            the agent's project instructions
└── README.md
```

Never put app code in `docs/`. If the build is published publicly, sample data must be made up — never real people's names, emails, or photos.

## Adapting the Process

**Free to adapt:** mark a section "N/A because…"; add rows, sections, or detail; choose your own stack, database, and build option; rename roles; set your own phase lengths.

**Record a Decision (in `docs/STATUS.md`) before:** removing or replacing a section, merging documents, or changing how an exit check is met.

**Never changed:** one owner per document · requirement IDs traced through every document · a validation build with a gap log before the final build · fixing the document before the code · a person checks every task.

## Quality Check

Each document's SVC Self-Check (Simple, Valuable, Complete) is its definition of done. A phase's exit check is that the self-checks for its documents are all true.

## Sources

- **[GitHub Spec Kit](https://github.com/github/spec-kit)** — spec-driven development: the spec → plan → tasks flow, the Constitution, and building with an AI agent one task at a time.
- **Shelly, G. B., & Rosenblatt, H. J. (2012). *Systems analysis and design* (9th ed.). Course Technology, Cengage Learning.** — business case, data modeling and normalization.
- **[EARS](https://alistairmavin.com/ears/)**, Alistair Mavin — the four sentence patterns for requirements.
- **[Documenting Architecture Decisions](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions)**, Michael Nygard — Architecture Decision Records.
- **[WCAG 2.2](https://www.w3.org/TR/WCAG22/)**, W3C — accessibility standard behind the Style Guide.
- **[Thinking Aloud: The #1 Usability Tool](https://www.nngroup.com/articles/thinking-aloud-the-1-usability-tool/)**, Nielsen Norman Group — the prototype test method.
- **[Agent Skills](https://agentskills.io/)** — the open format this framework is packaged in.
