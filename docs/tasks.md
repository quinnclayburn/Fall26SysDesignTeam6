# [Product/Service Name] — Tasks

> **When:** Week 5, then updated through Weeks 6–8 · **Owner:** Delivery Lead · **Done when:** every item in the SVC Self-Check at the end is true.
>
> **Approved on:** ___ **by:** Delivery Lead ___ · Architecture Lead ___ · Product Owner ___
>
> **Filled-in Example:** `docs/examples/tasks-example.md`

Tasks break the Plan into small steps you can build and check one at a time.

---

## 1. Task List

*One row per task, P1 first, in the Plan's build order. A good task starts with a verb, can be finished in under a day, and has a one-sentence "Done when" check that says where to look (a file, the browser console, or a screen). When a task completes a requirement, its Done when is that requirement's acceptance test; groundwork tasks get their own concrete check. T0 is filled in, because every build starts by scaffolding the app.*

| ID | Task | Priority | Traces to (R# / ADR) | Depends on | Done when | Status |
|----|------|----------|----------------------|------------|-----------|--------|
| T0 | Scaffold the app from the skill named in ADR-00 | P1 | ADR-00 | — | The template's sample pages open in the browser | Not started |
| T1 | | P1 | | T0 | | Not started |
| T2 | | | | | | |

*Status: Not started · In progress · Done · Blocked (Q#) — when a task is blocked, add the question to the Spec's Open Questions and put its ID here.*

---

## 2. Cross-Check (Week 5)

*Before the Week 6 build, follow every P1 requirement through the documents. An empty cell is a gap — fix the document, not this table.*

| Req ID | Data & API (entity / endpoint) | Plan (ADR / screen #) | Task(s) |
|--------|--------------------------------|-----------------------|---------|
| R1 | | | |

**Result:** *(e.g. "All P1 requirements traced; no task without a requirement or ADR.")*

---

## 3. Gap Log (Weeks 6–7)

*During the Week 6 AI build, log every place the agent guessed, got stuck, or misread a document. In Week 7, each document's owner fixes their gaps; then mark whether the re-run confirmed the fix.*

| What the agent got wrong or guessed | Which document & section caused it | Fix applied | Fixed in re-run? |
|-------------------------------------|------------------------------------|-------------|------------------|
| | | | |

---

## 4. Build Notes (Week 8)

*What the final test build simulated or left out. Together with the documents, this is the handoff to System Implementation.*

- **Live URL:** *(The app's GitHub Pages address.)*
- **Simulated:** *(Each simulated requirement ID and how it's simulated, e.g. "R1: a 'log in as…' picker instead of real login.")*
- **Not built:** *(Each task you didn't build, with its priority — P2 or P3 only — or "None.")*

---

## SVC Self-Check

- [ ] **Simple** — each task is one action starting with a verb, small enough to finish in under a day, with a one-sentence Done when check.
- [ ] **Valuable** — every task traces to a requirement or ADR; nothing is built "just because."
- [ ] **Complete** — every P1 requirement has at least one task; P1 tasks come first in the Plan's build order; the cross-check has no empty cells; the team approved it before the Week 6 build; every gap has a fix or a reason it wasn't fixed; the Build Notes are filled in by the end of Week 8.
