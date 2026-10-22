# How to Build & Test From Your Documents

The documents come first; the builds exist to test them. You climb a four-rung ladder, and every build is done with an AI agent (or a person) **one task at a time**:

| Rung | Build | Scope | Output | Kept? |
|------|-------|-------|--------|-------|
| 1 | **Prototype test** | The Tier 1 scenario, faked | Evidence and Spec fixes | Thrown away (`prototype/`) |
| 2 | **Validation build** | Tier 1 (P1) tasks, as a front end over simulated data | The gap log | Thrown away (`validation/`) |
| 3 | **Fix and re-run** | Same tasks, fresh session, fixed documents | Gaps marked fixed or not | Thrown away |
| 4 | **Final build** | Tier by tier: P1, then P2, then P3 | The design, built | Kept (repo root) |

**The one rule on every rung:** if the build and a document disagree, fix the document first, then the code. The documents are the source of truth.

For how a finished gap log and task list look, see `docs/examples/tasks-example.md`. *Working solo or on a short timeline? Skip nothing on the invariants; shrink everything else — see "Scaling down" at the end.*

---

## What each document does during a build

| Document | Use it for |
|----------|-----------|
| **Specification** | What to build, the tier of each requirement, and its acceptance test |
| **Style Guide** | Look, feel, and wording — apply exactly |
| **Data & API Design** | Field names, types, and endpoint shapes — match exactly |
| **Plan** | Tech stack (ADR-00), decisions, and the screens or parts in build order |
| **Tasks** | The order to build in, one row at a time |
| **Business Case** | Only if a scope question comes up |

---

## Tiers: how the specification drives the build

Every scenario in the Spec is tagged with a tier, and each requirement inherits it:

- **Tier 1 — P1, must have.** The smallest version that still solves the problem. It is the only tier built in the validation build.
- **Tier 2 — P2, should have.** The product works without it; it makes it noticeably better.
- **Tier 3 — P3, nice to have.** Cut first.

**Tier gate:** a tier starts only when the one before it is complete — every task Done, every acceptance test re-run, and the gate recorded in `tasks.md`. Scope changes are tier changes in the Spec, never silent additions in code.

---

## The front-end test build (rungs 2–3)

The validation build is a **front end over a simulated back end**, so you can find document gaps without building real infrastructure. It must prove the design, not the technology:

- **Data:** one sample-data file per entity, using the exact field names from Data & API Design Section 1.
- **Endpoints:** one function per endpoint in Section 4, all in one data-access module, each returning the documented response shape (e.g. `getEvents()` returns what `GET /v1/events` would). That module is the one thing a real backend replaces later; nothing else in the app talks to data.
- **Login and permissions:** a "log in as…" picker or similar stub with the documented roles. Never store real credentials.
- **Screens:** exactly the Plan's screen list, styled by the Style Guide.
- **Simulated requirements:** if a requirement can only be shown, not proven, in the simulation (such as blocking direct API calls), mark it **simulated** and name its requirement ID in the Build Notes.

The stack is whatever ADR-00 says. Not building a screen-based product? Apply the same idea: stub the data layer and the outputs, build the Tier 1 path, and log the gaps.

---

## The Build Loop (every build rung)

Open the repo in your agent tool. The agent reads `CLAUDE.md` and the documents in `docs/`. Then, for each task in `tasks.md`, in order:

1. **Give the agent this prompt**, with the task ID and folder filled in:

   ```
   Build task [T#] from docs/tasks.md in [folder].
   Use the tech stack and build option in docs/plan.md ADR-00. Follow docs/specification.md,
   docs/style-guide.md, docs/data-api-design.md, and docs/plan.md exactly. Touch nothing outside this task.
   If anything is missing or unclear, stop and ask. If you must assume something,
   write "ASSUMPTION:" and explain it.
   When you finish, tell me how to check the task's "Done when" in docs/tasks.md.
   ```

2. **Handle questions and assumptions** — rungs 2–3 and rung 4 handle these differently (below).
3. **Finish the task** the way your rung says, then move to the next one.

Don't explain anything in chat that isn't written in the documents. If the agent needs it, it belongs in a document.

---

## Rung 1 — Prototype test

Make a throwaway prototype of the Tier 1 scenario: sketches on paper, a design tool, or a clickable page the AI builds. Then:

1. Watch 3–5 people like your user try it while they think aloud. Don't help them.
2. Add what you saw to the Evidence table in `specification.md` Section 1 (E#).
3. Fix the Spec where it was wrong, or write "no change, because…". Note which screens worked — they go into the Plan's Screens & Build Order table.

The prototype is a test, not a source of truth. If the AI builds it, use `prototype/` (it's in `.gitignore`), delete it afterward, and never build from it or copy it into the app. *Solo, or no users available?* Test with whoever is closest to a real user and say so in the Evidence table.

---

## Rungs 2–3 — Validation build, fix, and re-run

The goal is **not** working code. It's a list of every place your documents left the agent guessing.

- **Who:** everyone with a stake in the documents, together and live if possible, for 60–90 minutes. One person drives; the others watch for guesses. Solo: you drive and watch.
- **Which tasks:** Tier 1 only, in order. Unfinished tasks are fine — the gap log is the goal.
- **Folder:** `validation/`, in every prompt. It's listed in `.gitignore`, so it's never committed.
- **Throwaway:** start with T0. Don't change any task statuses, and delete the folder after the re-run. The final build starts fresh from your fixed documents.
- **When the agent asks or assumes:** log it in the gap log (`tasks.md` Section 3) with the document and section that caused it, then answer just enough for it to continue. Also log it when the agent invents a field, endpoint, screen, or message, or builds something different from what a document says.
- **Testing:** not required.
- **Fix, then re-run:** each owner fixes their own document, bumps its version, and gets it re-approved. Then delete everything in `validation/` (the old code holds your answers) and start a **new** agent session (so the agent has no memory of them either). Run the loop on the same tasks, starting with T0, and mark each gap "Fixed in re-run?" Yes or No.

---

## Rung 4 — Final build

- **Folder:** the repo root, in every prompt.
- **Set up:** run T0 first. Once it's Done, commit it as your starting point. If the app is published somewhere, publish it now and check that the address opens it; every later commit updates it.
- **Which tasks:** Tier 1 in order, then Tier 2, then Tier 3 — each only after the previous tier's gate. Mark each task In progress when you start it.
- **When the agent asks or assumes:** update the document first, then tell the agent where to find the answer. If you can't answer yet, add the question to the Spec's Open Questions and mark the task "Blocked (Q#)."
- **Swapping in a real backend:** if ADR-00 says the final build uses a real backend, replace the data-access module behind the same endpoint contract. No field name, status code, or response shape may change; if one must, change `data-api-design.md` first.
- **Testing:** a person performs the task's Done when check. For a task that completes a requirement, that's its acceptance test from the Spec, exactly as written. If it calls the API (or a simulated data function), check the fields and status codes match Data & API Design too.
- **Done:** mark a task Done only when all three are true — it passes its Done when check, actually performed; it matches `data-api-design.md` and `style-guide.md` wherever it touches data or screens; and a second person has checked it (solo: re-run the check on a different day or after a break). This is the **Definition of Done**. If it fails, give the agent what failed and retest.

When a group of related tasks is done, test them together — for example, create a record, attach a file, and check it appears in the list.

### Tier gate check
At the end of each tier, before starting the next:

- [ ] Every task in the tier is Done.
- [ ] Every acceptance test for the tier's requirements passes — rerun them all, not just the last ones.
- [ ] Every screen matches the Style Guide.
- [ ] Every table and endpoint matches Data & API Design — nothing added or changed silently.
- [ ] The gate is recorded in `tasks.md` (`Tier N passed on ___ by ___`).

### Final check
After the last tier you build:

- [ ] Walk through every scenario in the built tiers, start to finish, as that user.
- [ ] The Build Notes (`tasks.md` Section 4) list where it runs, anything simulated with its requirement IDs, and anything you didn't build (P2 or P3 only). These notes are the handoff to whoever builds or runs it next.

---

## Scaling down

Keep the invariants (one owner per document, requirement IDs traced through, fix the document first, a validation build with a gap log, a person checks every task). Shrink the rest: a solo or one-week project can keep each document to a page, run the prototype test on one person, run the validation build alone in 30 minutes, and skip optional documents with "N/A because…". See the skill's `adapting.md` for presets.

---

## Common Mistakes

- ❌ Explaining the product to the agent in chat instead of letting the documents speak. You'll hide the gaps you're looking for.
- ❌ Fixing the agent's code instead of the document that confused it.
- ❌ Letting the agent mark its own work done. A person performs every Done when check.
- ❌ Starting Tier 2 before every Tier 1 task is Done.

**Testing is manual by default: perform the steps in each acceptance test. If you wrote good acceptance tests in the Spec, you've already written your test plan.** They're also the starting point for automated tests later.
