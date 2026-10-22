# How to Complete data-api-design.md

This document turns the Spec's **nouns** into data and its **user actions** into endpoints. Write it in the Design phase, alongside the Plan, once ADR-00 names the database. It's the document an AI agent relies on most when building — skipping it is the #1 reason an AI build runs but doesn't match what anyone meant.

For a filled-in version, see `docs/examples/data-api-design-example.md`.

---

## Nouns, actions, and relationships

- **Nouns become entities.** Reread the Spec's scenarios and requirements. Things a user creates, views, or changes ("event," "photo," "member") are your entities.
- **Actions become endpoints, not entities.** "Upload" and "search" are rows in Section 4.
- **Cardinality is one question.** For each pair of entities, ask: does one have zero, one, or many of the other? That's what the ERD shows.
- **Normalization** is the same 1NF–3NF material from your textbook's database chapter.

---

## Document databases

If your tech stack uses a document database (MongoDB, Firestore), keep the same sections with two changes:

- **Section 1:** a child can be **embedded** inside its parent (no separate table or FK) or **referenced** by ID. Embed when the child is always read with the parent and rarely changes on its own (an address inside a member). Reference when it grows without limit, is shared, or changes on its own (photos in an event). The database won't enforce delete rules for you, so say that your app code must.
- **Section 3:** replace the 1NF–3NF checklist with: every relationship is marked embed or reference with a reason; no embedded list can grow without limit; any duplicated data says how it's kept in sync.

---

## Common Mistakes

- ❌ Fields "just in case" — if no requirement needs it, it doesn't belong.
- ❌ A catch-all entity (`data`, `items`) instead of real nouns.
- ❌ Verb paths (`/createEvent`) instead of noun paths (`POST /v1/events`).
- ❌ Storing something twice, such as an event name on every photo — store the `event_id` instead.
- ❌ Treating the AI build as proof the design is right. A working demo only means the agent guessed something plausible. Log what it guessed.

---

**The test:** could a teammate — or an AI agent — build the database and API from this document without asking you a single question? If not, the question belongs in the Spec's Open Questions.
