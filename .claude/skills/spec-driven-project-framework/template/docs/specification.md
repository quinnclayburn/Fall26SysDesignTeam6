# [Product/Service Name] — Specification

> **When:** Frame phase (Section 0), Specify phase (the rest), refined in Design phase · **Owner:** Product Owner · **Done when:** every item in the SVC Self-Check at the end is true.
>
> **Version:** 1.0
>
> **Approved on:** ___ **by:** Product Owner ___ · Architecture Lead ___ · Delivery Lead ___
>
> **Filled-in Example:** `docs/examples/specification-example.md`

The Spec is the source of truth for *what* you're building. Write it so a teammate — or an AI agent — could build from it without asking you a question.

---

## 0. Constitution

*2–3 rules this product must never break, no matter what feature is added. If a rule wouldn't stop any feature, it isn't doing its job.*

| # | Principle | Why it exists |
|---|-----------|---------------|
| 1 | | |
| 2 | | |

---

## 1. Problem & Evidence

**Problem and success:** *(One or two sentences from Business Case Section 1 — who has the problem, and how you'll know it's solved. Update it if anything has changed; this is the version builders and AI agents read.)*

**Evidence:** *(3–5 short conversations or observations with people like your user, outside your team, plus the prototype test. Real quotes or what you saw, not opinions.)*

| ID | What we heard or saw | From whom |
|----|----------------------|-----------|
| E1 | | |

**Riskiest assumption:** *(The one thing that, if wrong, sinks the product — and how you'll find out.)*

---

## 2. Scope

**In scope:** *(What this version will do.)*

**Out of scope:** *(What it will NOT do. This list stops the AI build from adding extras.)*

---

## 3. User Scenarios

*3–5 short stories of someone using the product. Tag each with a priority — these are the **tiers** the build follows (see `docs/reference/build-and-test-guide.md`):*
- ***P1** — must have. Without it, the product doesn't solve the problem. Keep P1 to 1–2 scenarios that make a complete journey.*
- ***P2** — should have. The product still works without it.*
- ***P3** — nice to have. Cut first if time runs short.*

**S1: [name]** — Priority: P1 / P2 / P3
- Actor:
- Trigger:
- Steps:
- Success outcome:
- Failure outcome:

*(Repeat for each scenario: S2, S3…)*

---

## 4. Requirements & Acceptance Tests

*Write each requirement as one sentence using one of these [EARS](https://alistairmavin.com/ears/) patterns:*

| Pattern | Use it for | Template |
|---|---|---|
| Always | Rules that are always true | The system shall … |
| When | A user action or event | When [trigger], the system shall … |
| While | Behavior during a state | While [state], the system shall … |
| If … then | Errors and unwanted situations | If [condition], then the system shall … |

*Each requirement takes the priority of its scenario, and each scenario's failure outcome gets its own* If … then *requirement. Requirements that apply on every screen — speed, privacy, accessibility — get their own priority and a number you can test ("loads in under 3 seconds," not "fast"). Its acceptance test says what to do and what should happen, with real values — if you can't write one, the requirement is too vague. Every P1 requirement cites its evidence (E#) or a standard it must meet (such as WCAG), or says ASSUMPTION. Requirement IDs never change once assigned.*

| ID | Requirement | Priority | Acceptance test (do → expect) | Evidence |
|----|-------------|----------|-------------------------------|----------|
| R1 | | | | |
| R2 | | | | |

---

## 5. Open Questions

*The team's one list of unresolved questions — from any document or task. Don't let a builder or an AI guess. If the answer changes a document, update that document before marking the question Resolved.*

| ID | Question | Raised by | Owner | Status |
|----|----------|-----------|-------|--------|
| Q1 | | | | Open / Resolved: [answer] |

---

## SVC Self-Check

- [ ] **Simple** — each requirement is one sentence in one EARS pattern; no jargon a new teammate wouldn't know.
- [ ] **Valuable** — the Constitution has 2–3 principles that would actually stop a feature; the Evidence table has 3+ rows from real people outside the team, plus the prototype test; each P1 requirement cites evidence or a standard, or says ASSUMPTION; the riskiest assumption is named.
- [ ] **Complete** — 3–5 scenarios, each with actor, trigger, steps, and both outcomes; P1 is 1–2 scenarios that make a complete journey; every requirement has a unique ID, a priority, and an acceptance test; no open question blocks a P1 requirement; the team has approved it.
