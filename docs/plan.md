# [Product/Service Name] — Plan

> **When:** Week 3 (Sections 1–2), Week 4 (Sections 3–4) · **Owner:** Architecture Lead (in a team of 4, the Plan owner) · **Done when:** every item in the SVC Self-Check at the end is true.
>
> **Version:** 1.0
>
> **Approved on:** ___ **by:** Architecture Lead ___ · Product Owner ___ · Delivery Lead ___
>
> **Filled-in Example:** `docs/examples/plan-example.md`

The Spec says *what* to build. The Plan says *how*, in what order, and what might go wrong.

---

## 1. Approach

*2–4 plain sentences. Someone non-technical should understand the shape of the solution.*

---

## 2. Key Decisions (ADRs)

*An ADR (Architecture Decision Record) is one row per real choice between options. ADR-00 is always your tech stack — decide it first, early in Week 3, because the database goes into `data-api-design.md` Section 0. The course defaults are filled in; change one only for a real reason, and say why in "Why this one."*

| ADR | Decision | Req IDs | Alternatives considered | Why this one |
|-----|----------|---------|-------------------------|--------------|
| ADR-00 | Tech stack — Frontend: Vue, no build (starter skill: collection-template) · Backend: Simulated · Database: ___ · Hosting: GitHub Pages (repo root) | | | |
| ADR-01 | | | | |

*Changed your mind later? Don't delete the old row — add a new ADR and write "Replaced by ADR-0X" in the old one.*

---

## 3. Screens & Build Order

*Every screen a user sees, plus any non-screen part (such as the data layer), in the order you'll build them — anything you leave out, the agent will invent. Carry over what worked in the Week 3 prototype test. P1 first, one scenario end to end before the next: first the one that shows your data (usually browsing), then the riskiest.*

| # | Screen or part | Route | Shows / does | Req IDs | Priority |
|---|----------------|-------|--------------|---------|----------|
| 1 | | | | | P1 |
| 2 | | | | | |

**Why this order:** *(One or two sentences.)*

---

## 4. Risks & Assumptions

*Anything that might go wrong, and anything you're taking on faith — including accounts, APIs, or tools you depend on but don't control. Rate Likelihood and Impact as Low / Medium / High.*

| Risk or assumption | Likelihood | Impact | Mitigation |
|--------------------|------------|--------|------------|
| | | | |

---

## SVC Self-Check

- [ ] **Simple** — the approach reads in under a minute; each ADR states one decision.
- [ ] **Valuable** — every ADR and screen has a requirement ID; every "Why this one" names a real trade-off, not "it was easier."
- [ ] **Complete** — ADR-00 names the full stack, starter skill, and database; every P1 requirement is covered by a screen or part; P1 comes first, one scenario end to end at a time; every risk has a mitigation; the team has approved it before Tasks are written.
