# FieldWorks — Plan

> **When:** Week 3 (Sections 1–2), Week 4 (Sections 3–4) · **Owner:** Architecture Lead (in a team of 4, the Plan owner) · **Done when:** every item in the SVC Self-Check at the end is true.
>
> **Version:** 1.0
> **Approved on:** Pending team approval
> **By:** Architecture Lead — Mustafa Almajmaie
> Product Owner — William Byers
> Delivery Lead — Quinn Clayburn
> **Filled-in Example:** `docs/examples/plan-example.md`

The Spec says *what* to build. The Plan says *how*, in what order, and what might go wrong.

---

## 1. Approach

FieldWorks is a proposed web-based maintenance management system that will allow users to register vehicles and equipment, complete preventive maintenance inspections, record deficiencies, and monitor equipment readiness. The system will be designed using Vue for the frontend, a simulated backend for the prototype, and GitHub Pages for hosting. The proposed design will use browser localStorage to simulate data persistence while defining a relational database structure for future implementation. The system will prioritize asset registration, inspection tracking, deficiency management, and accurate readiness reporting to ensure unresolved critical deficiencies are never displayed as ready for service.

---

## 2. Key Decisions (ADRs)

*An ADR (Architecture Decision Record) is one row per real choice between options. ADR-00 is always your tech stack — decide it first, early in Week 3, because the database goes into `data-api-design.md` Section 0. The course defaults are filled in; change one only for a real reason, and say why in "Why this one."*

| ADR | Decision | Req IDs | Alternatives considered | Why this one |
|---|---|---|---|---|
| ADR-00 | Tech stack — Frontend: Vue, no build (starter skill: collection-template); Backend: Simulated; Database: PostgreSQL (proposed real database), with browser localStorage for prototype persistence; Hosting: GitHub Pages (repo root). | R1–R18, R26–R28 | React instead of Vue; a real backend instead of a simulated backend; MySQL instead of PostgreSQL; server-hosted application instead of GitHub Pages. | Vue follows the course's default frontend approach, while a simulated backend and GitHub Pages avoid the need for server infrastructure during the prototype. PostgreSQL provides a relational design for assets, inspections, and deficiencies. localStorage allows browser-based simulation but does not provide secure shared storage or database transactions. |

## 3. Screens & Build Order

*Every screen a user sees, plus any non-screen part (such as the data layer), in the order you'll build them — anything you leave out, the agent will invent. Carry over what worked in the Week 3 prototype test. P1 first, one scenario end to end before the next: first the one that shows your data (usually browsing), then the riskiest.*

| # | Screen or part | Route | Shows / does | Req IDs | Priority |
|---|---|---|---|---|---|
| 1 | Data layer | N/A | Define Asset, ChecklistItem, Inspection, InspectionResult, and Deficiency models; implement localStorage persistence, validation, and prototype notice. | R1-R18, R28 | P1 |
| 2 | Asset List | `/assets` | Display registered assets and readiness; show errors when data cannot be loaded. | R4, R13, R17, R23, R27 | P1 |
| 3 | Asset Registration | `/assets/new` | Register vehicles and equipment; validate required fields, reject duplicate IDs, and retain entries after errors. | R1-R5, R26-R28 | P1 |
| 4 | Asset Detail | `/assets/{id}` | Display saved asset information, initial readiness, and links to PMCS and Open deficiencies. | R4, R12, R13, R17, R26-R28 | P1 |
| 5 | PMCS Inspection | `/assets/{id}/inspections/new` | Display applicable checklist; collect Pass, Fail, or N/A results and required deficiency details. | R6-R8, R26-R28 | P1 |
| 6 | Inspection Submission and Detail | `/inspections/{id}` | Save inspection, results, and deficiencies together; retain drafts on failure and preserve submitted records. | R9-R11, R18 | P1 |
| 7 | Deficiency Resolution | `/deficiencies/{id}` | Load the selected deficiency; display its details and require resolution notes. On successful save, show the resolved deficiency ID, updated readiness, and any remaining critical issues. On save failure, retain the note, keep the deficiency Open, and display an error. | R12, R14-R16, R18 | P1 |
| 8 | Readiness Logic | N/A | Calculate readiness from submitted inspections and all Open deficiencies; prevent false Ready status. | R4, R13, R16-R18, R27 | P1 |
| 9 | Asset History | `/assets/{id}/history` | Show submitted inspections and resolved deficiencies in newest-first order. | R19-R20 | P2 |
| 10 | Search and Filters | `/assets` | Search by asset ID or name and filter by readiness; handle no matches and retrieval errors. | R21-R23 | P2 |
| 11 | Optional Inspection Notes | `/assets/{id}/inspections/new` | Add and validate optional notes once the Inspection schema is approved for this feature. | R24-R25 | P3 |

**Why this order:** Build the data layer and basic asset display first, then complete registration and asset detail as the first P1 scenario. Next, complete the PMCS-to-deficiency-resolution journey with fail-safe readiness calculations before adding P2 history/search and P3 notes.
---

## 4. Risks & Assumptions

| Risk or assumption | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Browser localStorage may be cleared or unavailable, causing loss of prototype data. | Medium | High | Use fictional data, explain storage limitations, validate saves, and maintain test data for recovery. |
| Inspection submission may save incomplete records or fail partway through. | Medium | High | Validate the inspection, results, and deficiencies together; save one updated localStorage dataset; retain the draft until saving succeeds; reuse a stable submission ID to prevent duplicates; and test a forced save failure followed by a retry. |
| Readiness may incorrectly show Ready while a critical deficiency remains Open. | Medium | High | Calculate readiness using all unresolved deficiencies and test critical-failure scenarios. |
| Authentication and user permissions are not finalized. | Medium | High | Use a single-user prototype without real accounts and confirm future access rules with the team. |
| Checklist assignment and deficiency-resolution rules may be unclear. | Medium | High | Confirm checklist and resolution rules with the Product Owner before implementation. |
| GitHub Pages and localStorage cannot provide production database features. | Medium | Medium | Clearly label the prototype and document PostgreSQL as the proposed future database. |
| Team implementation may take longer than expected. | Medium | Medium | Prioritize P1 features, test each workflow, and defer P2/P3 features if needed. |
---

## SVC Self-Check
- [x] **Simple** — the approach reads in under a minute; each ADR states one decision.
- [x] **Valuable** — every ADR and screen has a requirement ID; every "Why this one" names a real trade-off, not "it was easier."
- [ ] **Complete** — ADR-00 names the full stack, starter skill, and database; every P1 requirement is covered by a screen or part; P1 comes first, one scenario end to end at a time; every risk has a mitigation; the team has approved it before Tasks are written.


