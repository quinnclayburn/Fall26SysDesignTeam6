# How to Complete tasks.md

The Plan says how you'll build the product and in what order. Tasks break that into small steps you can build and check one at a time. Write it in the Task phase by walking the Plan's build order (Section 3), keep the gap log in the Validate and Fix phases, and keep statuses and Build Notes current through the Build phase.

For a filled-in version, see `docs/examples/tasks-example.md`.

---

## Writing Done when checks

- A task that **completes a requirement** uses that requirement's acceptance test: "R2 acceptance test passes."
- A **groundwork** task (sample data, the data-access layer, a login stub) can't pass an acceptance test yet, so give it its own check: "`getEvents()` returns the 3 sample events in the browser console."
- Say exactly **where** to check (the file itself, the browser console, or a screen), so nobody builds more than the check needs.

If you can't write a one-sentence check, split the task.

---

## Splitting a big task

❌ *"Build the upload feature"* — too big to check.
✅ *"Build the upload form"*, then *"Reject wrong file types and oversized files"*, then *"Test: create event → upload → photos appear."*

Split by screen, then by behavior (the normal case first, errors second). Keep each scenario's tasks together, so the first few tasks already give you a screen you can click through.

---

## Blocked tasks

When a task can't move — a missing answer, an unclear requirement, a service that isn't ready — add the question to the Spec's Open Questions and set the task's status to "Blocked (Q#)." If the answer changes the Spec, Plan, or Data & API Design, update that document **before** unblocking the task.

---

## Gap Log and Build Notes

- **Gap Log (Validate and Fix phases):** during the validation build, log every gap in Section 3 — see Part A of `build-and-test-guide.md` for what counts as a gap. Assign each one to the document that caused it; that document's owner fixes it in the Fix phase. After the re-run, mark each gap "Fixed in re-run?" Yes or No.
- **Build Notes (Build phase):** fill in Section 4 as you go — where it runs once T0 is working, each requirement you simulate as soon as you simulate it, and, at the end of the Build phase, every task you didn't build. Anything not built must be P2 or P3.

---

## Common Mistakes

- ❌ One giant task per feature — it can never be marked Done until the very end.
- ❌ Tasks that don't trace to anything ("refactor code," "make it look nice").
- ❌ Marking a task Done because the code runs, without performing its Done when check.
- ❌ Starting P2 tasks before every P1 task is Done.
