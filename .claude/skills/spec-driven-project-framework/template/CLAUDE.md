# Project instructions

This repository follows spec-driven development. The design documents in `docs/` are the source of truth for what to build.

- **Build from the documents:** `docs/specification.md`, `docs/style-guide.md`, `docs/data-api-design.md`, `docs/plan.md`, and `docs/tasks.md`. The files in `docs/examples/` and `docs/reference/` are examples and guides, not this project's design.
- **Follow them exactly.** Use the tech stack and build option in `docs/plan.md` ADR-00, the entities, field names, and endpoints in `docs/data-api-design.md`, and the colors and component rules in `docs/style-guide.md`. A section marked "N/A because…" means it doesn't apply.
- **Don't guess.** If something you need is missing or unclear in the documents, stop and ask. If you must assume something to continue, write "ASSUMPTION:" and explain it.
- **One task at a time.** When asked to build a task, build only that task, even if the documents describe more, and stop once its "Done when" check in `docs/tasks.md` can pass. Do more only when explicitly asked.
- **One tier at a time.** Build P2 tasks only after the P1 tier gate in `docs/tasks.md` is recorded as passed, and P3 only after P2. Never start a later tier unless told to.
- **A person checks every task.** When you finish, explain how to run its "Done when" check, but don't say it passes or mark it Done. The team runs the check and updates `docs/tasks.md`.
- **Follow `docs/reference/build-and-test-guide.md`** for the build rung you're on (prototype, validation build, or final build).
- **Build in the folder you're given** (the repository root, `validation/` for the validation build, or `prototype/` for a prototype). Never put app code in `docs/`.
- **`prototype/` and `validation/` are throwaway.** Never build from them or copy them into the app. Both stay out of version control (see `.gitignore`).
- **Documents first.** If the build and a document disagree, tell the user to fix the document; don't change it yourself unless asked. The team owns the documents in `docs/`.
