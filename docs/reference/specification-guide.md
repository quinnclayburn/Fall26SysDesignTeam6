# How to Complete specification.md

The Business Case asks *should we do this at all?* The Spec answers *what exactly are we building?* Write the Constitution (Section 0) in Week 1, the rest in Week 2, and sharpen it in Week 3 after the prototype test (see `build-and-test-guide.md`). Every later document points back to its requirement IDs.

For a filled-in version, see `docs/examples/specification-example.md`.

---

## EARS in one minute

Pick the pattern that fits, and keep one requirement per sentence:

- *The system shall* give every photo alt text. — always true
- *When* a member opens the gallery, *the system shall* list all events, newest first. — an action or event
- *While* a user is not logged in, *the system shall* show only the login page. — during a state
- *If* a file is larger than 20 MB, *then the system shall* reject it and show the reason. — errors

If a sentence needs "and" to join two behaviors, split it into two requirements.

---

## Common Mistakes

- ❌ Evidence that's really opinion ("people would love this") or comes from teammates.
- ❌ Scenarios with only a happy path. The failure outcome is where an AI agent guesses most.
- ❌ Vague words in a requirement ("fast," "easy," "user-friendly") — say a number or an observable result.
- ❌ An acceptance test that just repeats the requirement ("it works"). Say what to do and what you should see.
- ❌ Too many P1 scenarios. If everything is P1, nothing is.
- ❌ Writing screens or tech choices into the Spec. How it looks belongs in the Style Guide and Plan; how it's built belongs in the Plan.
- ❌ Answering a question in chat instead of in the Open Questions table. If it isn't written down, the AI build can't use it.
