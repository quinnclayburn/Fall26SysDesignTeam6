# FieldWorks — Specification

> **When:** Week 1 (Section 0), Week 2 (the rest), refined in Week 3 · **Owner:** William Byers, Product Owner · **Done when:** every item in the SVC Self-Check at the end is true.
>
> **Version:** 1.0 — Review Draft · **Updated:** October 28, 2026
>
> **Approved on:** Pending team review  
> **Product Owner:** William Byers  
> **Architecture Lead:** Mustafa  
> **Delivery Lead:** Quinn
>
> **Filled-in Example:** `docs/examples/specification-example.md` (template reference; not reviewed)

This specification defines what FieldWorks should do. It is a complete review draft, not an approved implementation baseline: proposed behavior is labeled ASSUMPTION where it lacks supporting evidence, and Section 5 identifies decisions that must be resolved before P1 release.

---

## 0. Constitution

*These principles establish the non-negotiable boundaries for FieldWorks. Any proposed feature or design decision must comply with them.*

| # | Principle | Why it exists |
|---|-----------|---------------|
| 1 | **Vehicle and equipment maintenance only.** Features must directly support asset identification, preventive maintenance inspections, deficiency reporting, or operational readiness. | Prevents scope expansion into unrelated inventory, purchasing, financial, or general property management functions. |
| 2 | **Deficiencies must remain traceable.** Every reported deficiency must be associated with a specific asset and remain visible until explicitly resolved. | Prevents maintenance problems from disappearing when inspection records or asset statuses change. |
| 3 | **Readiness must reflect unresolved problems.** An asset with an unresolved critical deficiency must not be displayed as fully operational or ready for service. | Prevents misleading readiness information and ensures critical maintenance issues remain visible. |

---

## 1. Problem & Evidence

**Problem and success:** ASSUMPTION — People responsible for vehicle and equipment maintenance need one place to identify assets, record Preventive Maintenance Checks and Services (PMCS), track unresolved deficiencies, and see readiness without losing the connection between a problem and its asset. Success means a representative user can register an asset, complete a PMCS inspection, record and explicitly resolve deficiencies, and see readiness that never reports an asset with an unresolved critical deficiency as ready; these outcomes remain unvalidated with external users.

The Business Case was not available for this draft. No claims about current user practices, measured time savings, or interview results are established here.

**Evidence:** E1–E4 are intentionally empty research slots, not completed research. D1–D3 are supplied design inputs, not external user validation. Only collected evidence should replace a placeholder, with the date, participant role, consent-appropriate identifier, and actual observation or quote.

| ID | What we heard or saw | From whom |
|----|----------------------|-----------|
| E1 | NOT COLLECTED — Interview/observe how an operator identifies an asset and starts PMCS; record actual steps and errors. | External vehicle/equipment operator; participant and date pending |
| E2 | NOT COLLECTED — Interview/observe how a maintainer reports, finds, and resolves a deficiency. | External maintainer; participant and date pending |
| E3 | NOT COLLECTED — Interview/observe how a supervisor determines readiness when problems remain unresolved. | External maintenance supervisor; participant and date pending |
| E4 | NOT RUN — Week 3 prototype test covering S1 and S2, including a critical deficiency, failed save, and resolution; record task completion, errors, assistance, and actual observations. | Representative external users; participants and date pending |
| D1 | Supplied `specification (2).md` defines the three constitutional constraints and specification structure. | Supplied project template; reviewed October 28, 2026 |
| D2 | Current request specifies five scenarios, S1 registration and S2 PMCS as P1, and P1 deficiency/readiness critical behavior; referenced conversation removes general property scope. | Product Owner's task direction and accessible conversation text |
| D3 | Supplied screenshot shows Mustafa proposing Vue, a simulated backend, and GitHub Pages for the prototype and asking to clarify storage, authentication, deficiency tracking, and readiness. This is a feasibility proposal, not an approved architecture or user study. | Mustafa, team conversation screenshot `7585.jpg`; message date not established |

**Riskiest assumption:** ASSUMPTION — Users can consistently classify a deficiency's severity and trust readiness derived from that classification. Validate with E1–E3 and the E4 prototype: ask users to register a sample vehicle, record both a noncritical and a critical problem, interpret readiness, resolve only one of two critical problems, and explain the remaining restriction. Proposed research success criterion: all three participants recognize that the asset remains Not ready while either critical problem is open; any missed restriction triggers a design/rule review, not a claim of validation. The sample size and criterion are assumptions for team approval, not results.

---

## 2. Scope

**In scope:**

- Register and identify vehicles and maintenance equipment using a unique asset identifier, name, type, and model.
- Complete a PMCS checklist for a selected asset, record item results, and retain submitted inspections.
- Report deficiencies with asset and inspection links, severity, description, status, and timestamps; retain unresolved issues across later inspections.
- Explicitly resolve deficiencies with a resolution note while preserving their history.
- Derive readiness from inspection and deficiency records, with unresolved critical problems always blocking ready status.
- Provide basic asset history, fleet filtering, and optional inspection notes as lower-priority enhancements.
- Handle validation and save failures visibly; provide keyboard access and clearly identified simulated prototype behavior.

**Proposed review baseline — ASSUMPTION:** Asset types are Vehicle and Equipment; IDs are unique after trimming whitespace and ignoring letter case. PMCS item results are Pass, Fail, or Not applicable (with a reason). Deficiency severity is Critical or Noncritical and status is Open or Resolved. A failed item creates an Open deficiency. A submitted inspection is immutable; completing a later inspection does not resolve previous deficiencies. An explicit resolution requires a note. Editing severity, reopening resolved issues, and corrections to submitted records require a later approved workflow; they are not implicit capabilities.

**Proposed readiness rule — ASSUMPTION, except the critical-deficiency prohibition mandated by Constitution 3:** Evaluate in this order: (1) one or more Open Critical deficiencies → **Not ready**; (2) no submitted PMCS → **Not assessed**; (3) one or more Open Noncritical deficiencies → **Attention required**; (4) a submitted PMCS and no Open deficiencies → **Ready**. Missing, corrupt, or unavailable readiness inputs → **Unknown**, never Ready. No manual override can bypass an Open Critical deficiency. Inspection expiration, approved checklists, and operational authorization remain questions for Mustafa and the Product Owner; these prototype labels do not establish an official release-to-service decision.

**Out of scope:**

- General property management, unrelated inventory, purchasing, finance, parts ordering, and work-order scheduling.
- GPS, telematics, automatic fault detection, external maintenance-system integrations, and notifications.
- Offline synchronization, concurrent multiuser editing, production identity management, and real operational deployment unless separately approved.
- Deleting assets, submitted inspections, or deficiency history; bulk import/export and attachments.
- Official maintenance certification, approved technical-manual content, or automatic determination of safety from free text.

Vue, a simulated backend, and GitHub Pages are proposed prototype choices from D3, not requirements that settle persistence or authentication. Until Q1–Q3 are resolved, use fictional demonstration records and do not claim secure accounts, shared durable storage, or operational readiness certification.

---

## 3. User Scenarios

P1 means required for the complete core journey; P2 means useful but optional for that journey; P3 is cut first. Exactly two scenarios are P1. The full deficiency and readiness lifecycle belongs to S2 and cannot be deferred with the P2 history/filtering conveniences. Actor names below describe user activities, not approved access-control roles.

**S1: Register a vehicle or equipment asset** — Priority: P1
- Actor: Person responsible for entering maintenance assets.
- Trigger: A vehicle or piece of equipment needs its first FieldWorks record.
- Steps: Open registration; enter asset ID, name, type, and model; submit; open the saved asset.
- Success outcome: Exactly one asset record exists with a stable internal reference and Not assessed readiness until a PMCS is submitted.
- Failure outcome: Missing/invalid fields, duplicate IDs, or storage failure prevent a successful-save message, explain the issue, and retain entered values for correction or retry.

**S2: Perform PMCS and manage deficiencies through resolution** — Priority: P1
- Actor: Person inspecting or maintaining an asset.
- Trigger: A registered asset needs a PMCS inspection or follow-up on a reported problem.
- Steps: Select the asset; complete the applicable checklist; describe and classify each failed item; submit; review the saved inspection, linked Open deficiencies, and readiness; later enter a resolution note for a repaired deficiency and explicitly resolve it; review updated readiness and retained history.
- Success outcome: The inspection and its deficiencies save together; all Open deficiencies remain visible on the asset; a critical issue immediately blocks Ready; resolving one issue preserves all other issues; readiness is recomputed from remaining records.
- Failure outcome: Incomplete answers, missing deficiency details, invalid resolution, unavailable data, or a failed save prevent completion or misleading Ready status and preserve entered work for retry.

**S3: Review maintenance history** — Priority: P2
- Actor: Person reviewing prior maintenance activity.
- Trigger: They need to understand previous inspections or repairs for one asset.
- Steps: Open an asset; open history; view submitted inspections and resolved deficiencies in reverse chronological order; inspect a record's linked details.
- Success outcome: Prior activity is easy to review with timestamps and asset/inspection links; P1 current deficiency visibility does not depend on this optional history view.
- Failure outcome: A failed history load shows an error and retry action, rather than an empty-history claim.

**S4: Find assets requiring attention** — Priority: P2
- Actor: Person reviewing fleet maintenance needs.
- Trigger: They want to locate a specific asset or assets with a given readiness state.
- Steps: Open the asset list; search by identifier or name; filter by readiness; open a matching asset.
- Success outcome: Matching assets display the same readiness as their detail pages; clearing filters restores the list.
- Failure outcome: A list retrieval failure shows an error and retry action; a valid query with no matches clearly reports no matches.

**S5: Add optional inspection context** — Priority: P3
- Actor: Person performing an inspection.
- Trigger: They want to record context beyond checklist answers and required deficiency descriptions.
- Steps: Enter an optional inspection note before submission; submit; reopen the inspection.
- Success outcome: The saved note appears with the inspection; leaving it blank does not prevent submission.
- Failure outcome: An overly long note shows a limit error and retains the text for editing without submitting a truncated note.

---

## 4. Requirements & Acceptance Tests

Each requirement uses an EARS pattern: Always (The system shall), When, While, or If … then. IDs are stable. S1 maps to R1–R5; S2 to R6–R18; S3 to R19–R20; S4 to R21–R23; S5 to R24–R25. R26–R29 apply across the product. Detailed behavior without collected evidence is explicitly labeled ASSUMPTION, including where project direction establishes the feature but not its details.

Acceptance tests below are proposed, not executed. Run each against a fresh fixture unless a sequence is stated. Use fictional assets V-001 (Vehicle, Truck One, Model A) and E-001 (Equipment, Generator One, Model B). Use a demonstration checklist with three items (C1, C2, C3); these are test identifiers, not an approved PMCS checklist. A simulated save/load failure is a controlled test condition. “Saved” means acknowledged by the selected persistence mechanism; durability and authentication expectations cannot be signed off until Q1 and Q2 are resolved.

| ID | Requirement | Priority | Acceptance test (do → expect) | Evidence |
|----|-------------|----------|-------------------------------|----------|
| R1 | When a user submits a valid registration, the system shall create one asset with a stable internal reference, trimmed asset ID, name, type, and model. | P1 (S1) | Register V-001 with Truck One, Vehicle, Model A, then open it → all four fields match and exactly one internal reference exists; register E-001 as Equipment → a distinct reference exists. | D2; ASSUMPTION — field schema |
| R2 | If a registration lacks a required field or uses a type other than Vehicle or Equipment, then the system shall reject it with a field-specific error while retaining entered values. | P1 (S1) | Submit with blank model, then with type Property → no record is created; the relevant error appears and V-001/name values remain. | D1 principle 1; ASSUMPTION — validation |
| R3 | If a submitted asset ID matches an existing ID after trimming and case normalization, then the system shall reject registration as a duplicate. | P1 (S1) | Create V-001; submit ` v-001 ` → duplicate error and one asset total. | ASSUMPTION — uniqueness rule |
| R4 | When registration succeeds without a submitted inspection, the system shall display the asset as Not assessed. | P1 (S1) | Register E-001 and return to its detail and list views → both show Not assessed, never Ready. | ASSUMPTION — initial readiness |
| R5 | If registration persistence fails, then the system shall show a save error and retain the entered registration without reporting success. | P1 (S1) | Force a failed save for V-001 → no success message; all inputs remain; retry successfully → one saved asset. | ASSUMPTION — failure handling |
| R6 | When a user starts PMCS for a registered asset, the system shall display that asset's identifier and its applicable checklist. | P1 (S2) | Open PMCS from V-001 with the configured C1–C3 checklist → V-001 and all three items appear; no E-001 association is present. | D2; ASSUMPTION — checklist assignment pending Q4 |
| R7 | If an inspection has an unanswered item or Not applicable without a reason, then the system shall prevent submission and identify the incomplete item. | P1 (S2) | Set C1 Pass, C2 Not applicable with no reason, and leave C3 unanswered → no saved inspection; C2/C3 errors appear; supply reason and C3 Pass → validation passes. | ASSUMPTION — completeness policy |
| R8 | If a failed checklist item lacks a nonblank description or a Critical or Noncritical severity, then the system shall prevent inspection submission and identify the missing detail. | P1 (S2) | Set C1 Fail with empty description and severity → submission blocked; add “Brake response absent” and Critical → item validation passes. | ASSUMPTION — deficiency validation |
| R9 | When a valid inspection is submitted, the system shall persist the inspection and one Open deficiency per failed item as one complete operation with stable IDs, asset links, inspection links, and creation timestamps. | P1 (S2) | Submit V-001 with C1 Critical Fail, C2 Noncritical Fail, C3 Pass → one inspection and two Open deficiencies share V-001 and the inspection reference; both have unique IDs and timestamps; no E-001 links exist. | D1 principle 2; ASSUMPTION — atomic save/data fields |
| R10 | If inspection persistence fails, then the system shall retain the draft and report failure without leaving a partially saved inspection or deficiency set. | P1 (S2) | Force failure during the two-deficiency save in R9 → zero new committed inspection/deficiency records and draft retained; retry → one complete inspection and two deficiencies. | D1 principle 2; ASSUMPTION — transaction strategy pending Q1 |
| R11 | The system shall retain submitted inspections and deficiency history without exposing deletion or modification of submitted inspection results. | P1 (S2) | Submit an inspection and resolve one linked deficiency → original answers and both deficiency records remain; available user actions cannot delete them or edit submitted answers. | D1 principle 2; ASSUMPTION — immutability policy |
| R12 | While an asset has Open deficiencies, the system shall display each on its detail view with its identifier, severity, description, status, and originating inspection link. | P1 (S2) | Reopen V-001 from R9 → both Open deficiencies and their fields/links are visible; follow each link → original inspection opens. | D1 principle 2; ASSUMPTION — displayed fields |
| R13 | While an asset has any Open Critical deficiency, the system shall display Not ready on every readiness-bearing view and prevent any Ready override. | P1 (S2) | Give V-001 two Open Critical deficiencies; submit a later all-Pass inspection and resolve only one critical issue → list/detail still show Not ready; no available override yields Ready. | D1 principle 3; D2 — critical behavior P1 |
| R14 | When a user explicitly resolves an Open deficiency with a nonblank resolution note, the system shall preserve the original record and add Resolved status, the note, and a resolution timestamp. | P1 (S2) | Resolve deficiency D-001 with “Replaced faulty component and rechecked” → D-001 retains its original asset, inspection, description, severity, and creation time while gaining the note/status/time; D-002 remains Open. | D1 principle 2; ASSUMPTION — resolution fields and authority pending Q2/Q3 |
| R15 | If a resolution note is blank or its save fails, then the system shall leave the deficiency Open and show an error without reporting resolution success. | P1 (S2) | Resolve the last Open Critical issue with spaces only, then with a valid note under forced save failure → both attempts leave it Open and Not ready; failed-save note is retained for retry. | D1 principles 2–3; ASSUMPTION — validation/retry |
| R16 | When an inspection or deficiency resolution is successfully saved, the system shall recompute readiness using the ordered readiness rule in Section 2. | P1 (S2) | Test fixtures: no inspection/no issues → Not assessed; submitted inspection/Open Critical → Not ready; submitted inspection/only Open Noncritical → Attention required; submitted inspection/no Open issues → Ready; resolve the final critical issue while a noncritical issue remains → Attention required. | D1 principle 3; ASSUMPTION — other states pending Q3 |
| R17 | If readiness inputs cannot be loaded or validated, then the system shall show Unknown with an error instead of Ready. | P1 (S2) | Load a previously Ready asset with deficiency retrieval failing, then with an invalid severity value → Unknown/error on detail and list; restoring valid inputs restores the calculated state. | D1 principle 3; ASSUMPTION — fail-safe presentation |
| R18 | When a later inspection is submitted, the system shall preserve all prior Open deficiencies until each is explicitly resolved. | P1 (S2) | Save a critical issue on V-001, then submit C1–C3 all Pass → original issue remains Open with its original inspection link and V-001 remains Not ready. | D1 principles 2–3 |
| R19 | When a user opens asset history, the system shall show submitted inspections and resolved deficiency events for that asset in descending timestamp order with links to their records. | P2 (S3) | Seed V-001 events at 09:00, 10:00, and 11:00 UTC and an E-001 event at 12:00 UTC → V-001 history shows 11:00, 10:00, 09:00 only; each link opens the correct record. | ASSUMPTION — history convenience |
| R20 | If history retrieval fails, then the system shall show a retrieval error and retry action instead of claiming the asset has no history. | P2 (S3) | Force history load failure → error/retry shown, no “no history” message; retry after recovery → seeded records appear. | ASSUMPTION — failure handling |
| R21 | When a user applies asset search and readiness filters, the system shall show only assets matching both the case-insensitive identifier-or-name search and the selected readiness state. | P2 (S4) | Seed V-001 Truck One Not ready, V-002 Truck Two Ready, and E-001 Generator One Not assessed; search `truck` and filter Not ready → only V-001; clear both → all three; compare list/detail → same status. | ASSUMPTION — search/filter semantics |
| R22 | If a valid asset query has no matches, then the system shall display a no-matches message with a clear-filters action. | P2 (S4) | Search `ZZZ-999` → no matches; clear filters → original three assets return. | ASSUMPTION — empty state |
| R23 | If asset list retrieval fails, then the system shall show an error and retry action instead of reporting zero assets. | P2 (S4) | Force list failure → error/retry shown; restore retrieval and retry → seeded assets appear. | ASSUMPTION — failure handling |
| R24 | When a valid inspection includes an optional note of at most 1,000 characters, the system shall preserve the note with that inspection. | P3 (S5) | Submit notes of zero and 1,000 characters on separate valid inspections → both save; reopening reproduces the submitted text exactly. | ASSUMPTION — optional context/limit |
| R25 | If an optional inspection note exceeds 1,000 characters, then the system shall block submission and show the limit while retaining the full entered text. | P3 (S5) | Enter 1,001 characters and submit → limit error, no save, all 1,001 characters retained; shorten to 1,000 → submission succeeds. | ASSUMPTION — note validation |
| R26 | The system shall make all P1 controls operable by keyboard with visible focus and no keyboard trap. | P1 (cross-cutting) | Complete S1 and S2 using Tab, Shift+Tab, arrows where applicable, Enter, and Space → every control is reachable/operable, focus is visible, and every dialog can be exited. | ASSUMPTION — project accessibility target; test does not establish full WCAG conformance |
| R27 | The system shall convey readiness and validation errors through text in addition to any color coding. | P1 (cross-cutting) | Inspect all five readiness states and trigger R2/R8/R15 errors with color ignored → each status and corrective error is understandable from text alone. | ASSUMPTION — accessible status presentation |
| R28 | While the application uses simulated authentication or storage, the system shall display a persistent prototype notice describing the active simulation and its data-retention limitations. | P1 (cross-cutting) | Open registration, PMCS, and asset detail in the approved prototype mode → each shows a notice matching actual storage lifetime and simulated identity behavior; no notice claims real authentication or shared storage unless implemented and approved. | D3; ASSUMPTION — disclosure content depends on Q1/Q2 |
| R29 | When a user opens the asset list containing 100 fixture assets in a warmed-up local prototype session, the system shall render the list within 3 seconds. | P2 (cross-cutting) | On the team's documented test browser/device, seed 100 assets and measure navigation-to-render five times after one warm-up → every measured run is at most 3 seconds; record device/browser and timings. | ASSUMPTION — provisional performance target, not measured |

Verification evidence should record requirement ID, application version, date, tester, fixture, actual result, and screenshot/log reference. Every test currently has status **NOT RUN**. Do not report a pass merely because its expected outcome is specified. Q1–Q4 must be resolved and the affected tests updated before P1 acceptance; Q5–Q7 govern validation and final approval.

---

## 5. Open Questions

Open questions do not authorize silent implementation choices. Proposed rules above make review concrete; an owner must confirm or replace them and update affected sections before marking a question Resolved.

| ID | Question | Raised by | Owner | Status |
|----|----------|-----------|-------|--------|
| Q1 | What persistence will the prototype use: memory, browser storage, or a service; what survives refresh/browser restart; how are atomic inspection/deficiency saves and safe retries achieved; and how will storage failure be tested? Confirm the prototype notice and durability tests for R5/R9/R10/R28. | Mustafa's screenshot; specification follow-up | Mustafa | Open — blocks P1 persistence acceptance; no durable/shared-storage claim approved |
| Q2 | Is authentication omitted, simulated, or real; who may register, inspect, and resolve; what identity is recorded; and how is permission enforced if real accounts are introduced? Confirm whether the single-user fictional-data prototype is acceptable and revise R14/R28 accordingly. | Mustafa's screenshot; specification follow-up | Mustafa, with William on user responsibilities | Open — blocks P1 access/identity sign-off; production identity is out of scope unless approved |
| Q3 | Confirm the readiness states and precedence, the definition of Critical, who can resolve a critical deficiency, whether a reinspection is required after repair, and whether inspections expire; what approved operational guidance supports these decisions? Constitution 3 cannot be relaxed. | Mustafa's screenshot; specification follow-up | Mustafa, with William validating domain rules | Open — blocks P1 readiness/resolution acceptance; proposed R13–R17 rules require review |
| Q4 | Which PMCS checklists apply to each vehicle/equipment type; who supplies and approves them; when is Not applicable allowed; and what asset fields are essential? C1–C3 are fictional test items only. | Specification draft | William, with Mustafa on checklist support | Open — blocks P1 domain acceptance and R1/R6–R8 fixtures |
| Q5 | Who will recruit at least three external participants, collect E1–E3, and run/document the Week 3 E4 prototype test; is the proposed critical-readiness research criterion suitable? | Specification draft | William, with Quinn coordinating | Open — blocks evidence completion and Valuable self-check |
| Q6 | What review process handles a mistakenly resolved deficiency, incorrect severity, or an incorrect submitted inspection without erasing history; are these corrections required for the prototype? | Specification draft | William and Mustafa | Open — explicit correction/reopen workflows excluded pending scope decision; required before real operational use |
| Q7 | Do William, Mustafa, and Quinn approve the revised P1 journey, scope, assumptions, and acceptance criteria after Q1–Q4 are settled? | Specification draft | William, Mustafa, Quinn | Open — approval date pending; blocks Complete self-check |

---

## SVC Self-Check

- [x] **Simple** — each requirement is one sentence in one EARS pattern; no jargon a new teammate wouldn't know.
- [ ] **Valuable** — the Constitution has 2–3 principles that would actually stop a feature; the Evidence table has 3+ rows from real people outside the team, plus the prototype test; each P1 requirement cites evidence or a standard, or says ASSUMPTION; the riskiest assumption is named.
- [ ] **Complete** — 3–5 scenarios, each with actor, trigger, steps, and both outcomes; P1 is 1–2 scenarios that make a complete journey; every requirement has a unique ID, a priority, and an acceptance test; no open question blocks a P1 requirement; the team has approved it.

**Review status:** Structure, five scenarios, two P1 scenarios, EARS requirements, acceptance tests, and assumption labels are present. Valuable remains unchecked because E1–E4 have not been collected. Complete remains unchecked because Q1–Q4 block P1 sign-off and team approval is pending. No interviews, prototype sessions, acceptance-test executions, or approval outcomes are claimed.
