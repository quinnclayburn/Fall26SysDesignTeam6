# Adapting the Framework to a Context

Start from the template, then size it. Every preset keeps the invariants in `pattern.md`.

## Presets

| Preset | When | Documents | Process changes |
|---|---|---|---|
| **Solo / short** (hours–1 week) | One person, small deliverable | Business Case: 3 sentences in the Spec's Problem section (mark the document "N/A because merged"). Spec, Plan, Tasks: one page each. Style Guide and Data & API: only if relevant | One owner, all roles; prototype test on 1–2 people; 30-minute validation build; Status optional; second-person check becomes "re-run next day" |
| **Small team** (2–4 people, 1–3 months) | Default template | All six documents | Roles as in the README; a team of 4 splits Architecture Lead (Plan vs Data & API); weekly Status |
| **Larger / long** (5+ people or 3+ months) | Multiple streams | All six, per product or per stream, plus an index of requirement ID ranges per stream | Add a per-tier release plan; keep one gap log per stream; Status per milestone; reviewers sign each version bump |
| **Non-software** (report, curriculum, event, research) | No screens or database | Business Case, Spec, Plan, Tasks; Style Guide → "voice and format guide"; Data & API → "N/A because no stored data", or reinterpret as the data sets or formats you produce | The "front-end test build" becomes a rough draft of the Tier 1 deliverable (an outline, a sample chapter, a dry run) |

## Customization checklist

- [ ] Names: product, roles, reviewer (replace "instructor"/"sponsor").
- [ ] Phase lengths and whether phases overlap.
- [ ] Stack in ADR-00 and whether the first build is simulated.
- [ ] Which sections are "N/A because…" (never silently delete one).
- [ ] Status cadence and who reads it.
- [ ] Tier definitions: what P1 means for this project in one sentence.
- [ ] Approval rule: who must sign each document.

## Common adaptations

- **Existing codebase:** write the Spec and Data & API Design from what exists, mark anything inferred as ASSUMPTION, and treat the first validation build as a check that the docs match reality.
- **Real backend from day one:** ADR-00 says so; the validation build still stubs external services so gaps in the docs, not the infrastructure, are what you learn.
- **Client or sponsor work:** sponsor decision and Spec approval are the client's signature; Status entries carry their replies.
- **No users to interview:** say so in the Evidence table and name the closest proxy; the riskiest assumption becomes the first thing the prototype test checks.
