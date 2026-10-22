# How to Complete plan.md

The Spec says *what* to build. The Plan says *how*, in what order, and what might go wrong. Write it in the Design phase, alongside `data-api-design.md`. Decide ADR-00 first — the Data & API Design is waiting on its database.

For a filled-in version, see `docs/examples/plan-example.md`.

---

## Do I need an ADR?

If someone might later ask *"why didn't we just do X instead?"*, write it down now. Typical ADRs: the tech stack, how login works, where files are stored, how permissions are enforced. Name at least one alternative you didn't pick, and the actual trade-off.

---

## Ordering the build

Build one scenario end to end (data → data-access layer → screen) before starting the next. Start with the one that shows your data (usually browsing), so you have a clickable app early. Then build the riskiest one, so problems show up with time left to fix them.

---

## Rating risks

Use Low / Medium / High for both Likelihood and Impact — no scoring formula needed. The value is in thinking about it before it happens. A risk is something that *might* go wrong; something that already has is a task or a blocker. An assumption is a risk you're choosing to accept: say what changes if it turns out false.

---

## Common Mistakes

- ❌ "Why this one: it's easier" — say *what* it makes easier and what you give up.
- ❌ Rows that are really tasks ("write the upload function"). A row is a screen or part of the product; tasks come later.
- ❌ Building the easy screens first and the risky part last, when there's no time left to fix it.
- ❌ Leaving a screen out. If it isn't in Section 3, the agent will invent it.
- ❌ Deleting an ADR you changed your mind on. Add a new one and mark the old one "Replaced by ADR-0X" — the history is part of the story you'll tell later.
