# Glossary

Terms used across the documents, one line each. The document in brackets is where you'll use the term most.

| Term | Meaning |
|------|---------|
| **Acceptance test** (also called acceptance criteria) | The steps that prove a requirement works: what to do, and what should happen. [Spec §4] |
| **ADR** (Architecture Decision Record) | One recorded choice between real options, with the reason. ADR-00 is always the tech stack. [Plan §2] |
| **Build option** | What the course build uses for its backend: a simulated backend (the default) or a real one. Recorded in ADR-00 and `data-api-design.md` Section 0. [Plan §2] |
| **Cardinality** | How many of one thing relate to another: one-to-one, one-to-many, many-to-many. [Data & API §2] |
| **Constitution** | 2–3 rules the product must never break, whatever feature is added. [Spec §0] |
| **Contrast ratio** | How much a color stands out from its background, e.g. 4.5:1. [Style Guide §2] |
| **Course skills** | Instructions and starter code in `.claude/skills/` that teach the AI agent how to build with the default stack. Your documents say what to build; the skills say how. |
| **Cross-check** | Following each P1 requirement through every document to its tasks, to find gaps before building. [Tasks §2] |
| **Database (designed for)** | The real database your design targets in System Implementation, e.g. PostgreSQL via Supabase. Recorded in ADR-00 and `data-api-design.md` Section 0. [Plan §2] |
| **Definition of Done** | The checks every task must pass before it's marked Done. [Build & Test guide, Part B] |
| **EARS** | A way to write each requirement as one clear sentence: *Always*, *When*, *While*, or *If…then*. [Spec §4] |
| **Endpoint** | One way the app asks the server for something, e.g. `GET /v1/events`. [Data & API §4] |
| **Entity** | A thing the app keeps track of, usually a noun from the scenarios (Event, Photo). [Data & API §1] |
| **ERD** (Entity Relationship Diagram) | A diagram of the entities and how they connect. [Data & API §2] |
| **Evidence** | What real people said or did that supports a requirement, recorded as E1, E2… [Spec §1] |
| **Foreign key (FK)** | A field that points to another entity's primary key. [Data & API §1] |
| **Gap log** | The list of places an AI agent guessed or got stuck because a document was unclear. [Tasks §3] |
| **Normalization** | Checks (1NF–3NF) that each fact is stored once, in the right place. [Data & API §3] |
| **Open Questions** | The team's one list of unresolved questions (Q1, Q2…), from any document or task. [Spec §5] |
| **P1 / P2 / P3** | Priority: must have / should have / nice to have. P1 is built first. [Spec §3] |
| **Primary key (PK)** | The field that uniquely identifies each row, usually `id`. [Data & API §1] |
| **Prototype test** | Watching 3–5 people try a throwaway prototype of the P1 scenario (paper, a design tool, or AI-built) to find Spec mistakes before building. [Build & Test guide] |
| **Requirement ID** | The label on each requirement (R1, R2…) that every later document points back to. They never change once assigned. [Spec §4] |
| **Simulated backend** | The default build option: data in JSON files and browser storage, with a "log in as…" picker instead of real login. It follows Data & API Design exactly, so System Implementation can replace it with a real backend. [Plan §2] |
| **Spec-driven development** | Writing clear documents first and building from them — changing the document first when something is wrong. |
| **SVC** | Simple, Valuable, Complete — the standard every document is checked against. Each document ends with an SVC Self-Check: it's both the document's "done" list and what it's graded on. |
| **Test build** | An AI build used to test your design, not to ship. By default it uses a simulated backend. The Week 6 validation build and the Week 8 final test build are both test builds. [Build & Test guide] |
| **Validation build** | The Week 6 AI build of the P1 scenarios, run to find gaps in the documents, not to ship. |
| **Vibe coding** | Building straight from an idea or a chat, with no spec — the habit this process replaces. |
| **WCAG** | The Web Content Accessibility Guidelines; this course targets level AA. [Style Guide] |
