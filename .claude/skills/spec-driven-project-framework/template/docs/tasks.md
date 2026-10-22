# [Product/Service Name] — Tasks

> **When:** Task phase, then updated through the Validate, Fix, and Build phases · **Owner:** Delivery Lead · **Done when:** every item in the SVC Self-Check at the end is true.
>
> **Approved on:** ___ **by:** Delivery Lead ___ · Architecture Lead ___ · Product Owner ___
>
> **Filled-in Example:** `docs/examples/tasks-example.md`

Tasks break the Plan into small steps you can build and check one at a time.

---

## 1. Task List

*One row per task, P1 first, then P2, then P3, in the Plan's build order. A good task starts with a verb, can be finished in under a day, and has a one-sentence "Done when" check that says where to look (a file, the browser console, or a screen). When a task completes a requirement, its Done when is that requirement's acceptance test; groundwork tasks get their own concrete check. T0 is filled in, because every build starts by scaffolding the app.*

| ID | Task | Priority | Traces to (R# / ADR) | Depends on | Done when | Status |
|----|------|----------|----------------------|------------|-----------|--------|
| T0 | Scaffold the project from the starter named in ADR-00 | P1 | ADR-00 | — | The starter runs and shows its sample screen (or, for a non-app project, the folder structure exists) | Not started |
| T1 | | P1 | | T0 | | Not started |
| T2 | | | | | | |

*Status: Not started · In progress · Done · Blocked (Q#) — when a task is blocked, add the question to the Spec's Open Questions and put its ID here.*

**Tier gate:** *Tier 2 (P2) tasks don't start until every Tier 1 (P1) task is Done and its acceptance tests have been re-run; Tier 3 (P3) waits on Tier 2 the same way. Record each gate when it passes: `Tier 1 passed on ___ by ___`.*

---

## 2. Cross-Check (Task phase)

*Before the validation build, follow every P1 requirement through the documents. An empty cell is a gap — fix the document, not this table.*

| Req ID | Data & API (entity / endpoint) | Plan (ADR / screen #) | Task(s) |
|--------|--------------------------------|-----------------------|---------|
| R1 | | | |

**Result:** *(e.g. "All P1 requirements traced; no task without a requirement or ADR.")*

---

## 3. Gap Log (Validate and Fix phases)

*During the validation build, log every place the agent guessed, got stuck, or misread a document. In the Fix phase, each document's owner fixes their gaps; then mark whether the re-run confirmed the fix.*

| What the agent got wrong or guessed | Which document & section caused it | Fix applied | Fixed in re-run? |
|-------------------------------------|------------------------------------|-------------|------------------|
| | | | |

---

## 4. Build Notes (Build phase)

*What the final build simulated or left out. Together with the documents, this is the handoff to whoever builds or runs it next.*

- **Where it runs:** *(URL, path, or how to launch it.)*
- **Simulated:** *(Each simulated requirement ID and how it's simulated, e.g. "R1: a 'log in as…' picker instead of real login.")*
- **Not built:** *(Each task you didn't build, with its priority — P2 or P3 only — or "None.")*

---

## SVC Self-Check

- [ ] **Simple** — each task is one action starting with a verb, small enough to finish in under a day, with a one-sentence Done when check.
- [ ] **Valuable** — every task traces to a requirement or ADR; nothing is built "just because."
- [ ] **Complete** — every P1 requirement has at least one task; tasks are grouped by tier, P1 first in the Plan's build order; the cross-check has no empty cells; the team approved it before the validation build; every gap has a fix or a reason it wasn't fixed; the Build Notes are filled in by the end of the Build phase.
