# Project instructions

This repository is a team's System Design project. The design documents in `docs/` are the source of truth for what to build.

- **Build from the team's documents:** `docs/specification.md`, `docs/style-guide.md`, `docs/data-api-design.md`, `docs/plan.md`, and `docs/tasks.md`. The files in `docs/examples/` and `docs/reference/` are examples and guides, not this project's design.
- **Follow them exactly.** Use the tech stack and build option in `docs/plan.md` ADR-00, the entities, field names, and endpoints in `docs/data-api-design.md`, and the colors and component rules in `docs/style-guide.md`.
- **Don't guess.** If something you need is missing or unclear in the documents, stop and ask. If you must assume something to continue, write "ASSUMPTION:" and explain it.
- **One task at a time.** When asked to build a task, build only that task, even if the documents or skills describe more, and stop once its "Done when" check in `docs/tasks.md` can pass. Do more only when explicitly asked.
- **A person checks every task.** When you finish, explain how to run its "Done when" check, but don't say it passes or mark it Done. The team runs the check and updates `docs/tasks.md`.
- **Use the course skills** in `.claude/skills/` for how to build with the default stack.
- **Build in the folder you're given** (the repository root, or `validation/` for the Week 6 validation build). Never put app code in `docs/`.
- **`prototype/` is throwaway.** Never build from it or copy it into the app.
- **Don't change the documents in `docs/` unless asked.** The team owns them.
