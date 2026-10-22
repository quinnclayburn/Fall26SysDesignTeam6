# How to Build & Test From Your Documents

Before any build, you run a quick prototype test in Week 3. Then you build the product twice, both times with an AI agent, one task at a time:

- **Part A — Validation build (Weeks 6–7):** the agent builds the P1 tasks so you can find gaps in your documents.
- **Part B — Final test build (Week 8):** the agent builds each task and you test it — P1 first, then P2 if time allows.

**The one rule for both:** if the build and a document disagree, fix the document first, then the code. The documents are the source of truth.

For how a finished gap log and task list look, see `docs/examples/tasks-example.md`.

---

## What each document does during a build

| Document | Use it for |
|----------|-----------|
| **Specification** | What to build, and the acceptance test for each requirement |
| **Style Guide** | Colors, fonts, spacing, components, and wording — apply exactly |
| **Data & API Design** | Field names, types, and endpoint shapes — match exactly |
| **Plan** | Tech stack, build option, decisions (ADRs), and the screens — how things are built and why |
| **Tasks** | The order to build in, one row at a time |
| **Business Case** | Only if a scope question comes up |

---

## If you're simulating the backend (the default)

Your build option is recorded in `plan.md` ADR-00. A simulation still has to follow `data-api-design.md` exactly, so it tests your design and can be swapped for a real backend in System Implementation:

- **Data:** one JSON file per entity in `data/`, using the exact field names from Section 1.
- **Endpoints:** one function per endpoint in Section 4, all in `data.js`, each returning the documented response shape (e.g. `getEvents()` returns what `GET /v1/events` would). That's the file a real backend replaces later.
- **Login:** the `simulated-login` skill adds a "log in as…" picker with roles. Never store real passwords.

The course skills set all of this up. Your job is to make sure the names and shapes match your Data & API Design.

If a requirement can only be shown, not proven, in a simulation (such as blocking direct API calls), mark it **simulated** and name its requirement ID.

---

## The Build Loop (both builds)

Open your repo in VS Code and start an agent session — GitHub Copilot by default, or Claude Code. The agent can read your documents in `docs/`, and it automatically follows the project instructions in `CLAUDE.md` and uses the course skills in `.claude/skills/`. (For Copilot, the repo's `.vscode/settings.json` turns on `CLAUDE.md`; if the agent ignores the rules, check that the **Chat: Use Claude Md File** setting is on.) Then, for each task in `tasks.md`, in order:

1. **Give the agent this prompt**, with the task ID and folder filled in (your part says which folder):

   ```
   Build task [T#] from docs/tasks.md in [folder].
   Use the tech stack and build option in docs/plan.md ADR-00. Follow docs/specification.md,
   docs/style-guide.md, docs/data-api-design.md, and docs/plan.md exactly. Touch nothing outside this task.
   If anything is missing or unclear, stop and ask. If you must assume something,
   write "ASSUMPTION:" and explain it.
   When you finish, tell me how to check the task's "Done when" in docs/tasks.md.
   ```

2. **Handle questions and assumptions** — Part A and Part B handle these differently (below).
3. **Finish the task** the way your part says, then move to the next one.

Don't explain anything in chat that isn't written in the documents. If the agent needs it, it belongs in a document.

---

## Prototype Test (Week 3)

Make a throwaway prototype of the P1 scenario. Your team chooses the form: sketches on paper, a digital tool (Figma, Canva, slides), or a clickable page the AI builds for you. Then:

1. Watch 3–5 people like your user try it while they think aloud. Don't help them. The Product Owner leads, but the whole team attends at least some sessions.
2. Add what you saw to the Evidence table in `specification.md` Section 1 (E#).
3. Fix the Spec where it was wrong, or write "no change, because…". Note which screens worked: they go into the Plan's Screens & Build Order table (Section 3) in Week 4.

The prototype is a test, not a source of truth. Your documents still decide what gets built. If the AI builds it, use the folder `prototype/` (it's in `.gitignore`) and delete it afterward. Never build from it or copy it into the app.

---

## Part A — Validation Build (Weeks 6–7)

The goal is **not** working code. It's a list of every place your documents left the agent guessing.

- **Who:** the whole team, together and live, for 60–90 minutes. One person types; everyone else watches for guesses.
- **Which tasks:** P1 only, in order. Unfinished tasks are fine — the gap log is the goal.
- **Folder:** `validation/`, in every prompt. It's listed in `.gitignore`, so it's never committed.
- **Code and statuses:** the validation build is throwaway. Start with T0. Don't change any task statuses, and delete the folder after the Week 7 re-run. Week 8 starts fresh from your fixed documents.
- **When the agent asks or assumes:** log it in the gap log (`tasks.md` Section 3) with the document and section that caused it, then answer just enough for it to continue. Also log it when the agent invents a field, endpoint, screen, or message, or builds something different from what a document says.
- **Testing:** not required.
- **Week 7 — fix, then re-run.** Each owner fixes their own document, bumps its version, and gets it re-approved. Then delete everything in `validation/` (the old code holds your Week 6 answers) and start a **new** session (so the agent has no memory of them either). Run the loop on the same tasks, starting with T0, and mark each gap "Fixed in re-run?" Yes or No.

---

## Part B — Final Test Build (Week 8)

- **Folder:** the repo root, in every prompt.
- **Set up:** run T0 first. Once it's Done, commit it as your starting point, then turn on GitHub Pages (Settings > Pages > deploy from the root of the `main` branch) and check that the live URL opens the app. Every later commit updates the live site.
- **Which tasks:** P1 first, in order, then P2 if time allows. Mark each task In progress when you start it.
- **When the agent asks or assumes:** update the document first, then tell the agent where to find the answer. If you can't answer yet, add the question to the Spec's Open Questions and mark the task "Blocked (Q#)."
- **Testing:** a person performs the task's Done when check. For a task that completes a requirement, that's its acceptance test from the Spec, exactly as written. If it calls the API (or a simulated data function), check the fields and status codes match Data & API Design too.
- **Done:** mark a task Done only when all three are true — it passes its Done when check, actually performed; it matches `data-api-design.md` and `style-guide.md` wherever it touches data or screens; and a teammate has checked it. This is the **Definition of Done**. If it fails, give the agent what failed and retest.

When a group of related tasks is done, test them together — for example, create an event, upload photos, and check they appear in the gallery.

### Final check
Once every P1 task is done (and any P2 you got to):

- [ ] Walk through every P1 scenario in the Spec, start to finish, as that user.
- [ ] Every P1 acceptance test passes — rerun them all, not just the last ones.
- [ ] Every screen matches the Style Guide.
- [ ] Every table and endpoint matches Data & API Design — nothing added or changed silently.
- [ ] The app opens at its GitHub Pages URL with the sample data.
- [ ] The Build Notes (`tasks.md` Section 4) list the live URL, anything simulated (login, storage) with its requirement IDs, and anything you didn't build (P2 or P3 only). These notes are the handoff to System Implementation.

---

## Common Mistakes

- ❌ Explaining the product to the agent in chat instead of letting the documents speak. You'll hide the gaps you're looking for.
- ❌ Fixing the agent's code instead of the document that confused it.
- ❌ Letting the agent mark its own work done. A person performs every Done when check.
- ❌ Starting P2 before every P1 task is Done.

**Testing is manual: perform the steps in each acceptance test. If you wrote good acceptance tests in the Spec, you've already written your test plan.** Automated tests are left out on purpose to keep the course build simple; your acceptance tests become the starting point for them in System Implementation.
