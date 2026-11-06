# FieldWorks — Weekly Status

> **When:** End of every week  
> **Owner:** Quinn, Delivery Lead (everyone contributes)  
> **Done when:** This week's entry is added at the top and synced before the weekly deadline.
>
> **Filled-in Example:** `docs/examples/weekly-status-example.md`

This is the one file the instructor checks each week. Each entry should be brief enough to read in approximately one minute.

---

## Week 3 — November 05, 2026

- **Done:**
 - William Byers (Product Owner):  Editable FieldWorks storyboard covering registration, PMCS, failed saves, readiness, and deficiency resolution; test script and observation templates; design walkthrough from four perspectives; local specification v1.1 draft with refined R16 and Q4.
- Quinn Clayburn (Delivery Lead): Reviewed the project documents and prepared this weekly status update.
- Mustafa Almajmaie (Architecture Lead): Completed and committed the technical approach and ADR-00 in docs/plan.md, along with the database/storage decisions, five entities, and ERD in docs/data-api-design.md. Reviewed the entity definitions and requirement IDs against our specification.

- **Next:**
  - **William:** Review the architecture documents and work with Mustafa to resolve product questions.
  - **Quinn:**  Continue reviewing documents, track decisions for approvals, and coordinate the remaining review.
  - **Mustafa:** Complete Plan Sections 3–4 (screens/build order and risks/assumptions) and Data & API Sections 3–4 (normalization and API endpoints); address feedback on atomic saves/retries, identity, and resolution rules.
  - **Team:** Conduct the planned interviews and record findings; these have not yet been completed.
 
- **Blockers:** Design work can continue. Q1–Q4 remain unresolved and block final P1 acceptance sign-off. User interviews and prototype testing remain outstanding.

- **Open questions:** Q1–Q4 remain open: persistence and failure/retry behavior; authentication and identity; readiness and deficiency rules; and PMCS checklists and asset requirements. Q5–Q7 also remain open, covering user research, correction workflows, and team approval.

- **AI use:** Mustafa used ChatGPT to assist with database-design review, requirement mapping, and Mermaid troubleshooting, then checked the results against the specification. Quinn used built-in VS Code Copilot to review the weekly status update to match template.

- **Change request:** The specification was refined based on the design walkthrough; no broader functional scope change is recorded.

- **Instructor response:** jLyst, Approved

---

## Week 2 — October 29, 2026

- **Done:**
 - William Byers (Product Owner):  Drafted the FieldWorks specification, including scope, scenarios, requirements, and acceptance tests. Updated it to align the readiness wording with the Style Guide.
- Quinn Clayburn (Delivery Lead): Prepared the Style Guide draft and the weekly status update.
- Mustafa Almajmaie (Architecture Lead): Reviewed the specification and Style Guide for technical feasibility and suggested clarifications on unavailable readiness status and keyboard navigation. William made the agreed revisions.

- **Next:**
  - **William:** Work with Mustafa to resolve specification questions Q1–Q4 and confirm the product rules needed for P1 design.
  - **Quinn:**  Coordinate the Week 3 document review, track decisions and remaining questions, and update the weekly status.
  - **Mustafa:** Complete Plan Sections 1–2, including ADR-00, and Data & API Sections 0–2, using the team’s decisions on persistence, identity, readiness, and checklists.
 
- **Blockers:** No blocker to starting Week 3 design. Q1–Q4 remain unresolved and block final P1 acceptance sign-off.

- **Open questions:** Q1–Q4 remain open: persistence, authentication and identity, readiness and deficiency rules, and PMCS checklists and asset requirements. Q5–Q7 are also open in the specification, covering user research, correction workflows, and team approval

- **AI use:** Used built-in VS Code Copilot to check for inconsistencies or insufficiencies in the weekly-status update.

- **Change request:** Minor consistency and accessibility clarifications to align the specification and Style Guide; no functional scope change.

- **Instructor response:** jLyst, Approved.


---

## Week 1 — October 22, 2026

- **Done:**
  - **William Byers (Product Owner):** Prepared the FieldWorks business case (`docs/business-case.md`) and Section 0 Constitution (`docs/specification.md`). Established the initial project scope around vehicle and equipment maintenance, inspections, deficiency tracking, and readiness reporting.
  - **Quinn (Delivery Lead):** Created the team GitHub repository, coordinated team responsibilities, and reviewed the initial project drafts.
  - **Mustafa (Architecture Lead):** Assigned architecture responsibilities; technical feasibility review remains pending.

- **Next:**
  - **William:** Develop the problem statement, scope, and initial user scenarios for the Week 2 specification.
  - **Quinn:** Coordinate Week 2 assignments, maintain weekly status updates, and track project progress.
  - **Mustafa:** Review technical feasibility, evaluate the proposed implementation approach, and contribute to Week 2 requirements.

- **Blockers:** None currently preventing progress. Architecture review remains pending.

- **Open questions:** None formally recorded in the specification at this stage.

- **AI use:** None.

- **Change request:** None.

- **Instructor response:** jLyst: Approved, 10/23/2026.

---

*(Add each new week above the previous one.)*
