# FieldWorks — Tasks

> **When:** Week 5 draft, retained for Weeks 6–8 · **Owner:** Delivery Lead — Quinn Clayburn · **Done when:** every item in the SVC Self-Check at the end is true.
>
> **Status:** Review draft — no approvals or task statuses should be marked final
>
> **Approved on:** ___ **by:** Delivery Lead — Quinn Clayburn ___ · Architecture Lead — Mustafa Almajmaie ___ · Product Owner — William Byers ___
>
> **Filled-in Example:** `docs/examples/tasks-example.md`

Tasks break the Plan into small steps you can build and check one at a time.

---

## 1. Task List

*One row per task, P1 first, in the Plan's build order. A good task starts with a verb, can be finished in under a day, and has a one-sentence "Done when" check that says where to look (a file, the browser console, or a screen). When a task completes a requirement, its Done when is that requirement's acceptance test; groundwork tasks get their own concrete check. T0 is filled in, because every build starts by scaffolding the app.*

| ID | Task | Priority | Traces to (R# / ADR) | Depends on | Done when | Status |
|---|---|---|---|---|---|---|
| T0 | Scaffold the app from the collection-template skill | P1 | ADR-00 | — | The template's sample pages open in the browser | Not started |
| T1 | Implement the Asset, ChecklistItem, Inspection, InspectionResult, and Deficiency data models | P1 | R1–R18, ADR-00 | T0 | Each model uses the field names and relationships in Data & API Section 1 | Blocked (Q1) |
| T2 | Implement localStorage persistence | P1 | R1–R18, ADR-00 | T1 | Fictional fixture data persists across refreshes and browser restarts in the same browser unless localStorage is cleared or unavailable | Blocked (Q1) |
| T3 | Validate stored data and handle retrieval errors | P1 | R17, R23, R27, ADR-00 | T2 | The data layer returns an explicit retrieval error when stored data is invalid or unavailable | Blocked (Q1) |
| T4 | Build the prototype notice | P1 | R28, ADR-00 | T2, T6, T8, T9 | Asset Registration, Asset Detail, and PMCS Inspection explain browser-only storage and its retention limits | Blocked (Q1, Q2) |
| T5 | Build the Asset List | P1 | R4, R13, R17, R23, R27 | T2, T3 | Valid fixture data displays registered assets and readiness; a failed read shows a text retrieval error and Retry action | Blocked (Q1) |
| T6 | Build Asset Registration and required-field validation | P1 | R1–R3, R26–R28 | T2, T3 | R1–R3 acceptance tests pass: one valid asset saves once, invalid fields are rejected, and duplicate IDs are rejected regardless of surrounding spaces or letter case | Blocked (Q4) |
| T7 | Preserve registration values and handle save failures | P1 | R2, R5, R26–R28 | T6 | R5 acceptance test passes: forced save failure reports no success and retains every entered value for retry | Blocked (Q1) |
| T8 | Build Asset Detail | P1 | R4, R12, R13, R17, R26–R28 | T5, T6 | R4 and R12 acceptance tests pass: new assets show Not assessed and Open deficiencies display required fields and inspection links | Blocked (Q3) |
| T9 | Build the PMCS Inspection screen | P1 | R6, R26–R28 | T8 | R6 acceptance test passes: V-001 and configured C1–C3 checklist items appear without E-001 associations | Blocked (Q4) |
| T10 | Validate inspection answers and Not applicable reasons | P1 | R7, R26–R27 | T9 | R7 acceptance test passes: unanswered items or N/A entries without reasons remain unsaved and receive identified errors | Blocked (Q4) |
| T11 | Validate failed-item deficiency details | P1 | R8, R26–R27 | T10 | R8 acceptance test passes: failed items require a nonblank description and Critical or Noncritical severity | Blocked (Q3) |
| T12 | Submit inspection, results, and deficiencies atomically | P1 | R9, R11, R18 | T11 | R9 acceptance test passes: one stable Inspection ID, linked InspectionResult records, and one Open Deficiency per failed item save together in one updated localStorage dataset | Blocked (Q1) |
| T13 | Prevent partial inspection saves and retain the draft | P1 | R10, R11 | T12 | R10 acceptance test passes: forced failure leaves no partial records and retry saves one complete inspection and deficiency set | Blocked (Q1) |
| T14 | Implement fail-safe readiness calculation | P1 | R4, R13, R16–R18, R27 | T12 | Fixture tests verify readiness precedence before and after resolution, account for all remaining Open deficiencies, and return Status unavailable for invalid or unavailable inputs | Blocked (Q3) |
| T15 | Build Inspection Detail | P1 | R11, R12 | T12, T14 | R11 acceptance test passes: submitted answers remain unchanged and no UI action deletes or edits them | Blocked (Q6) |
| T16 | Build Deficiency Detail and Resolution | P1 | R12, R14–R16, R18, R26–R27 | T14, T15 | R14–R16 acceptance tests pass: blank or whitespace-only notes show validation errors and leave the deficiency Open; successful saves preserve history and show the resolved ID, updated readiness, and remaining critical issues; failed saves retain the note and leave the deficiency Open | Blocked (Q3) |
| T17 | Apply keyboard, focus, and text-based status behavior | P1 | R26, R27 | T5–T16 | R26–R27 acceptance tests pass: P1 controls are keyboard operable and readiness, validation, and retrieval errors remain understandable without color | Not started |
| T18 | Test the complete P1 journey | P1 | R1–R18, R26–R28 | T4, T5–T17 | A fresh fixture run covers registration, PMCS, deficiency reporting and resolution, readiness recalculation, save failure and retry, and the R28 notice on registration, detail, and PMCS screens | Not started |
| T19 | Build Asset History | P2 | R19, R20 | T15 | R19–R20 acceptance tests pass with newest-first events and retrieval-failure retry | Not started |
| T20 | Build Asset Search and readiness filters | P2 | R21–R23 | T14 | R21–R23 acceptance tests pass for combined filters, no matches, and retrieval-failure retry | Not started |
| T21 | Test the 100-asset P2 performance fixture | P2 | R29 | T5 | R29 acceptance test passes across five warmed-up measurements of no more than 3 seconds each | Not started |
| T22 | Add optional inspection notes | P3 | R24, R25 | T12 | R24–R25 acceptance tests pass at zero, 1,000, and 1,001 characters | Not started |

**Status values:** Not started · In progress · Done · Blocked (Q#). A blocked task must have the corresponding question in the Specification's Open Questions.

---

## 2. Cross-Check

| Req ID | Data & API | Plan | Task(s) |
|---|---|---|---|
| R1 | Asset entity; `POST /assets` | #1 Data layer; #3 Asset Registration | T1, T6 |
| R2 | Asset fields; `POST /assets` 400 error | #3 Asset Registration | T6, T7 |
| R3 | Unique trimmed/case-insensitive `asset_id`; 409 error | #3 Asset Registration | T6 |
| R4 | Asset readiness in `GET /assets` and `GET /assets/{id}` | #2 Asset List; #4 Asset Detail; #8 Readiness Logic | T5, T8, T14 |
| R5 | `POST /assets` 500 save failure | #3 Asset Registration | T7 |
| R6 | ChecklistItem; `GET /assets/{id}/checklist` | #5 PMCS Inspection | T9 |
| R7 | InspectionResult `result` and `na_reason`; 400 error | #5 PMCS Inspection | T10 |
| R8 | Deficiency description/severity; 400 error | #5 PMCS Inspection | T11 |
| R9 | Inspection, InspectionResult, and Deficiency; atomic submission | #6 Inspection Submission and Detail | T12 |
| R10 | Stable submission ID and atomic save/retry behavior | #6 Inspection Submission and Detail | T13 |
| R11 | Submitted-record preservation | #6 Inspection Submission and Detail | T12, T15 |
| R12 | `GET /assets/{id}/deficiencies`; `GET /deficiencies/{id}` | #4 Asset Detail; #7 Deficiency Resolution | T8, T15, T16 |
| R13 | Open Critical deficiency readiness | #2 Asset List; #8 Readiness Logic | T5, T14 |
| R14 | `PATCH /deficiencies/{id}` resolution fields | #7 Deficiency Resolution | T16 |
| R15 | Blank or whitespace-only resolution note; 500 save failure | #7 Deficiency Resolution | T16 |
| R16 | Resolution readiness recalculation and confirmation | #7 Deficiency Resolution; #8 Readiness Logic | T14, T16 |
| R17 | Status unavailable for invalid or unavailable inputs | #2 Asset List; #4 Asset Detail; #8 Readiness Logic | T3, T5, T8, T14 |
| R18 | Preserve prior Open deficiencies | #6 Inspection Submission and Detail; #8 Readiness Logic | T12, T14, T16 |
| R26 | Cross-cutting keyboard behavior | #3–#7 interactive screens | T17 |
| R27 | Text readiness and validation errors | #2–#8 screens | T3, T17 |
| R28 | Prototype notice and retention disclosure | #1 Data layer; registration, asset detail, and PMCS screens | T4 |
| ADR-00 | Vue, collection-template, localStorage, GitHub Pages | Plan Approach | T0–T4 |

**Result:** All P1 requirements are traced; no P1 task lacks a requirement or ADR; P1 tasks precede P2/P3 tasks; readiness is implemented before Deficiency Resolution.

---

## 3. Gap Log

| What the agent got wrong or guessed | Which document & section caused it | Fix applied | Fixed in re-run? |
|---|---|---|---|
| Selected `FieldWorks` as the localStorage key prefix; no key-naming rule is specified. | Data & API Design §0 (build option/persistence) and Plan §2 (ADR-00) specify localStorage but not a key prefix. | Pending team decision; no document or validation-code change made during Part A. | |
| Left `checklistItems.json` empty because no complete seed records were specified, despite the Spec's C1–C3 demonstration checklist; descriptions and asset-type assignments remain unspecified. | Specification §4 (acceptance-test setup and R6) names C1–C3; Specification §5 Q4 leaves checklist content/assignment pending; Data & API Design §1 requires `asset_type` and `description`. | Pending Q4 decision; no document or validation-code change made during Part A. | |
| Asset List displays “Readiness is unavailable” and Asset Detail displays “Could not load this asset” on retrieval failure, without the specified status label “Status unavailable.” | Specification §4 R17 and Style Guide §4 (Status indicator). | Updated in the validation implementation during T14 to show “Status unavailable” with an error on both views; source documents remain unchanged. Verify in the Week 7 re-run. | |
| Asked whether Asset ID is an existing organizational identifier or user-assigned and what guidance the form should display; the team has not decided. | Specification §5 Q4 explicitly leaves the identifier source and form instructions open. | For Part A only, use neutral “Asset ID” wording without implying who assigns it; Q4 remains unresolved pending team decision. | |
| T8's R12 click-through check depends on the Inspection Detail view, but T15 builds that view later; the task order and dependencies do not say whether T8 should add a placeholder or defer verification. | Tasks §1 T8 Done when maps to the full R12 acceptance test, while T15 depends on later T12/T14; Plan §3 places Inspection Submission and Detail after Asset Detail. | For Part A, keep T8 scoped to linking to the planned inspection route; T15's browser check now confirms the click-through. Review T8 dependency/Done-when alignment in Week 7. | |
| T8 traces R13, but its Done when covers only R4/R12 while T14 owns full readiness logic; the required Open Critical status is unclear before T14. | Tasks §1 T8 and T14; Plan §3 Asset List, Asset Detail, and Readiness Logic; Specification §0 Principle 3 and §4 R13; Q3 remains open in §5. | For Part A, apply only R13's mandatory Open Critical → Not ready override on the list/detail; defer other readiness states and unavailable-input handling to T14. Q3 remains unresolved. | |
| T9 requested C1–C3 descriptions and asset-type assignment; the specification names the test item codes but does not define descriptions or confirm Equipment checklist applicability. | Specification §4 acceptance-test setup/R6 and §5 Q4; Data & API Design §1 requires ChecklistItem `asset_type` and `description`; Tasks §1 T9. | For Part A only, use clearly labeled, non-operational placeholder descriptions for Vehicle items C1–C3 with no E-001 association; Equipment checklist applicability and approved content remain unresolved. | |
| T4 appears before T6, T8, and T9 in the task list but depends on all three, so it cannot be completed in strict list order. | Tasks §1 T4 dependency column and task ordering. | For Part A, defer T4 until T6, T8, and T9 are attempted; review the task order/dependencies in Week 7. | |
| T12 requires one updated localStorage dataset and a stable retry ID, but the documents do not specify the physical storage representation; Q1 remains proposed and unapproved. | Specification §5 Q1; Data & API Design §4 inspection-submission notes; Tasks §1 T12. | For Part A only, use one new localStorage key for the inspection, result, and deficiency arrays; validate before one write, retain the draft on failure, and reuse the stable Inspection ID on retry. Q1 remains unresolved and this approach needs team review/approval before Part B. | |
| T14 needs a full readiness order, but the proposed rule in Specification §2 is still unapproved under Q3. | Specification §2 proposed readiness rule and §5 Q3; Tasks §1 T14; Data & API Design §4 readiness notes. | For Part A only, use the proposed Specification §2 order; Q3 remains unresolved and requires team review/approval before Part B. | |
| T16 needs to resolve deficiencies, but the documents leave unclear who may resolve Critical deficiencies and whether repair requires reinspection. | Specification §5 Q3; Specification §4 R14–R16 and Data & API Design §4 define resolution fields/behavior but not authority or reinspection gates; Tasks §1 T16. | For Part A only, implement the explicit R14–R16 flow without adding a role or reinspection gate; Q3 remains unresolved and requires team review/approval before Part B. | |

---

## 4. Build Notes

- **Live URL:** *(Add the GitHub Pages address after T0 is published.)*
- **Simulated:** *(List each simulated requirement and how the prototype simulates it.)*
- **Not built:** *(List each unbuilt P2 or P3 task, or write “None.”)*

---

## 5. Changelog

| Version | Date | Change |
|---|---|---|
| v6 | 2026-11-19 | Moved the prototype notice to T4 and placed it in build order after the PMCS screen. Reorganized the task list into sequential P1, P2, and P3 numbering. Retained explicit resolution, storage-failure, and readiness checks. |
| v5 | 2026-11-19 | Split the previous persistence task into separate persistence, retrieval-validation, and prototype-notice tasks. Added explicit whitespace, failed-save, and remaining-critical-blocker checks to T16. |
| v4 |  | Refined P1 task boundaries and save-failure coverage. |
| v3 |  | Updated task dependencies and cross-check entries. |
| v2 |  | Expanded the task list from the Plan's screen and build order. |
| v1 |  | Added the initial FieldWorks task draft. |

---

## SVC Self-Check

- [ ] **Simple** — each task is one verb-led action with a one-sentence, screen- or browser-console-based Done when check.
- [ ] **Valuable** — every task traces to a requirement or ADR.
- [ ] **Complete** — every P1 requirement has a task; P1 tasks come first in build order; the cross-check has no empty cells; the team approves the draft before the Week 6 build; gaps receive fixes or documented reasons; Build Notes are completed by the end of Week 8.
