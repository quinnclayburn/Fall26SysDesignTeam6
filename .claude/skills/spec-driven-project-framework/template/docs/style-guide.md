# [Product/Service Name] — Style Guide

> **When:** Specify phase, alongside the Spec · **Owner:** Delivery Lead (whole team approves) · **Done when:** every item in the SVC Self-Check at the end is true.
>
> **Version:** 1.0
>
> **Approved on:** ___ **by:** Delivery Lead ___ · Product Owner ___ · Architecture Lead ___
>
> **Filled-in Example:** `docs/examples/style-guide-example.md`

The Style Guide tells every screen — and every AI agent — exactly how the product looks and sounds, so nobody has to guess. It targets **WCAG 2.2 AA** accessibility. *Not a screen-based product (a CLI, a report, a service)? Keep the sections that apply — voice, wording, formats — and mark the rest "N/A because…".*

---

## 1. Brand & Voice

- **Brand principles:** *(2–3 sentences on the personality the design should convey. Make them specific enough to rule things out.)*
- **Tone:** *(e.g. casual, warm, brief.)*
- **Button example:** *(e.g. "Add photos," not "Submit media.")*
- **Error example:** *(e.g. "That file is too large — the limit is 20 MB," not "Error 413.")*
- **Logo:** *(File location and one "don't," e.g. don't stretch it — or "None.")*

---

## 2. Colors

*3–7 colors. Check each one against the background with the [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) and record the ratio. Targets: at least 4.5:1 for normal text; 3:1 for large text (24px, or about 19px bold) and for borders of buttons and form fields.*

| Name | Hex | Use | Contrast vs. background |
|------|-----|-----|-------------------------|
| Primary | | Main brand color, primary buttons | |
| Text | | Body text | |
| Background | | Page background | — |
| Error | | Error messages | |
| Border | | Borders of form fields and buttons | |

---

## 3. Type & Spacing

*No more than 2 font families, and one spacing scale built from a base unit — nothing in between.*

| Role | Font | Size | Weight |
|------|------|------|--------|
| Heading 1 | | | |
| Heading 2 | | | |
| Body | | | |

- **Spacing scale:** *(e.g. 8 / 16 / 24 / 32 / 48px, from an 8px base unit.)*
- **Max content width:** *(e.g. 1200px)*

---

## 4. Components

*The reusable pieces every screen uses. Include how each one looks on hover, keyboard focus, and when disabled or showing an error — an AI agent will guess these if you don't say. Every button, link, and field must be reachable with the keyboard and show a visible focus outline.*

| Component | Rules |
|-----------|-------|
| Button (primary) | |
| Button (secondary) | |
| Card | |
| Form field | |
| Navigation | |

---

## SVC Self-Check

- [ ] **Simple** — 3–7 colors, no more than 2 font families, one spacing scale.
- [ ] **Valuable** — every rule would change how a screen gets built; the brand principles actually rule things out.
- [ ] **Complete** — every section is filled or marked "N/A because…"; every color meets its contrast target; components include hover, focus, disabled, and error states; the whole team has approved it.
