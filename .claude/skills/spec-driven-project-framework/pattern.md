# The Framework Pattern

## Invariants (never adapt these away)

1. **Documents are the source of truth.** If code and a document disagree, fix the document first, then the code.
2. **One owner per document**, many reviewers. Solo: still name an owner; review in each role's voice.
3. **Requirement IDs trace everywhere.** `R#` in the Spec → fields/endpoints in Data & API Design → ADRs/screens in the Plan → tasks in Tasks. The cross-check table proves nothing is orphaned in either direction. IDs never change once assigned.
4. **Tiers.** Every scenario is P1 / P2 / P3; requirements inherit it. P1 is the smallest version that solves the problem. A tier starts only after the previous tier's gate passes.
5. **Validate before building for real.** A throwaway front-end build of Tier 1 over simulated data, plus a gap log, plus a fresh-session re-run.
6. **Don't guess.** Agents (and people) ask, or write "ASSUMPTION:". Questions live in the Spec's Open Questions table.
7. **A person checks every task** against its one-sentence "Done when".
8. **SVC self-check** ends each document; it is that document's definition of done.
9. **Evidence from real people** backs P1 requirements; AI never writes Evidence.

## The document chain

| Document | Question it answers | Key content |
|---|---|---|
| Business Case | Should we do this at all? | Problem, options (incl. do nothing), cost/benefit, sponsor decision |
| Specification | What exactly are we building? | Constitution, Evidence, scope, scenarios (tiered), EARS requirements + acceptance tests, Open Questions |
| Style Guide | How does it look and sound? | Voice, colors with contrast ratios, type/spacing, components with states |
| Data & API Design | What does it store and expose? | Entities, ERD, normalization, endpoints with roles and errors |
| Plan | How, in what order, what could go wrong? | ADR-00 stack, ADRs, screens/parts in build order, risks |
| Tasks | What do we do next? | Task list with Done-when, cross-check, gap log, build notes, tier gates |
| Status (optional cadence) | Where are we? | Done / next / blockers / AI use |

Dependency order: Business Case → Spec → (Style Guide, Data & API, Plan) → Tasks → code.

## Customizable dimensions

Role names and counts · phase lengths and calendar · stack and hosting (ADR-00) · build option (simulated or real) · which documents apply · example domain · reviewer (instructor, sponsor, client, self) · status cadence. See `adapting.md`.

## Where the details live

`template/docs/*.md` are the canonical document templates; `template/docs/reference/` holds per-document guides and the build & test guide; `template/docs/examples/` is one filled-in set.
