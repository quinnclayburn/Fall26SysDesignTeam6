# FieldWorks — Style Guide

> **When:** Week 2, alongside the Spec · **Owner:** Delivery Lead (whole team approves) · **Done when:** every item in the SVC Self-Check at the end is true.
>
> **Version:** 1.0
>
> **Approved on:** ___ **by:** Delivery Lead: Quinn Clayburn · Product Owner: William Byers · Architecture Lead: Mustafa Almajmaie
>
> **Filled-in Example:** `docs/examples/style-guide-example.md`

The Style Guide tells every screen — and every AI agent — exactly how the product looks and sounds, so nobody has to guess. It targets **WCAG 2.2 AA** accessibility.

---

## 1. Brand & Voice


- **Brand principles:** FieldWorks takes its visual direction from the military field manual reference: warm paper, dark printed headings, double-line framing, and orderly sections. Vehicle and equipment records should resemble clearly organized inspection forms, with maintenance information taking priority over decoration. Use flat backgrounds and restrained borders; avoid camouflage, distressed text, decorative military insignia, and textures behind readable content.
- **Tone:** Practical, direct, and brief. Use familiar maintenance terms and explain what the user can do next. Avoid military jargon and decorative commands.
- **Button example:** “Report a problem” or “Save inspection.” Labels name the action rather than using “Submit.”
- **Error example:** “Enter an asset name before saving.” Identify the affected field and how to correct it.
- **Logo:** No separate image logo. Display “FIELDWORKS” in the Heading 1 style, with “Vehicle & Equipment Maintenance” below in body text. Keep the name as selectable text. Do not stretch it or use an official military seal.

---

## 2. Colors

Use these six colors throughout the app. Ink also serves as the border color. Paper is used for button text on dark backgrounds, so no additional white is needed.


| Name | Hex | Use | Contrast vs. background |
|------|-----|-----|-------------------------|
| Primary — Olive | #454D35 | Primary buttons, links, active navigation | 6.42:1 on Parchment; 7.89:1 on Paper. Paper text on Olive: 7.89:1. |
| Text / Border — Ink | #24231F | Headings, body text, labels, field borders, framing | 11.38:1 on Parchment; 13.98:1 on Paper. |
| Background — Parchment | #E7D9CC | Page background, secondary button hover, disabled controls | — |
| Surface — Paper | #F7F1E5 | Cards, form fields, navigation, light text on dark buttons | Decorative surface; use Ink borders where a control boundary must be visible. |
| Error — Rust | #8B3028 | Error text, error borders, critical issue indicators | 5.96:1 on Parchment; 7.32:1 on Paper. |
| Warning — Amber | #775414 | Warning text and indicators requiring attention | 4.96:1 on Parchment; 6.09:1 on Paper. |

Ratios were calculated using the WCAG relative-luminance formula and rounded to two decimal places. All listed text combinations exceed 4.5:1, and control borders exceed 3:1. Verify the color pairs in WebAIM Contrast Checker before final sign-off.

Always pair status colors with written labels, using the wording and severity rules from the specification. Do not reduce text opacity or place text directly over photographs or textures.

---

## 3. Type & Spacing

| Role | Font | Size | Weight |
|------|------|------|--------|
| Heading 1 / product name | Georgia, serif fallback | 32px | Bold (700) |
| Heading 2 | Georgia, serif fallback | 24px | Bold (700) |
| Body / form inputs | Arial, sans-serif fallback | 16px | Regular (400) |
| Buttons / form labels / navigation | Arial, sans-serif fallback | 16px | Bold (700) |
| Supporting text / asset IDs | Arial, sans-serif fallback | 14px | Regular (400) |

- **Text treatment:** Body line height is 1.5; heading line height is 1.25. Use uppercase only for the product name and short section labels. Keep instructions and paragraph text in sentence case. Use Ink for supporting text rather than fading it.
- **Spacing scale:** 8 / 16 / 24 / 32 / 48px, from an 8px base unit. Apply this scale to margins, padding, and gaps. Border thickness and focus outlines are separate from the spacing scale.
- **Max content width:** 1200px, centered. Use 24px page padding on screens at least 768px wide and 16px below 768px. Stack paired content panels into one column below 768px; allow navigation and action groups to wrap without clipping.
- **Manual framing:** Use a 4px double Ink border around the product header with 24px padding. Use 1px Ink borders elsewhere. Corners are square, and panels have no decorative shadows. Section numbers may precede headings when they help identify a section; do not number individual controls for decoration.

---

## 4. Components

**Shared interaction rules:** Every interactive control is keyboard reachable and uses a native button, link, or form element where possible. Keyboard focus uses a 3px Ink outline with a 3px offset against Paper or Parchment; ensure it remains visible and is not clipped or hidden. Buttons and navigation links have a minimum 48px height, with at least 8px between separate controls. Disabled buttons use native disabled behavior, a Parchment fill, Ink text and border, no opacity reduction, and no hover response; explain unavailable actions nearby when the reason is not evident. Errors appear in text and are associated with the affected control. Decorative panels are not added to the keyboard tab order.

| Component | Rules |
|-----------|-------|
| Button (primary) | Olive background, Paper text, 1px Olive border, square corners, and 8px vertical / 16px horizontal padding. Hover: Ink background and border; Paper text remains. Focus: shared outline. Disabled: shared disabled style. If the action fails, show a Rust message beside the relevant form or action area and preserve the user's entries. |
| Button (secondary) | Paper background, Ink text, 1px Ink border; same sizing as primary. Hover: Parchment background and underlined label. Focus and disabled: shared rules. Show action errors as adjacent Rust text. |
| Card (asset or inspection record) | Paper background, 1px Ink border, square corners, 16px padding, and 16px between cards. Use a heading, clearly labeled values, and explicit action links or buttons. The card itself has no hover or focus effect because it is not a control; links and buttons inside use their own states. If its data cannot load, show a Rust error message inside the card. Disabled styling applies only to its controls. |
| Form field | Visible Arial Bold label above the field with an 8px gap. Paper background, Ink text, 1px Ink border, square corners, 8px padding, and a minimum 48px height for single-line controls. Hover: Olive border. Focus: shared outline. Error: Rust border and a specific Rust message below; indicate invalid state and associate the message programmatically. Never use a placeholder as the only label. Disabled: Parchment background, Ink text, and no hover change. Required fields are identified in text. |
| Navigation | Paper top bar below the framed header, with 16px padding and 24px gaps between links. Use the destinations defined in the Plan. Links use Ink; hover adds an underline. Active destination uses Olive, bold text, an underline, and `aria-current="page"` to identify the active page for assistive technologies. Keyboard focus uses the shared 3px Ink outline with a 3px offset to clearly identify the focused link during keyboard navigation. Omit unavailable destinations or show explanatory noninteractive text rather than a misleading link. If a destination fails to load, retain navigation and show a Rust message in the content area. |
| Inline link | Olive, underlined text on Paper or Parchment. Hover: Ink text with a thicker underline. Focus: shared outline. Unavailable actions are explanatory text rather than links without destinations. Errors belong next to the affected content. |
| Status indicator | Written status label with a 1px matching border, square corners, and 8px padding. Use Ink for neutral information, Olive for operational status where defined, Amber for warnings, and Rust for critical problems. Background remains Paper. Include an icon only alongside the label. Indicators are noninteractive, so hover, focus, and disabled states are N/A. If status cannot be determined, show “Status unavailable” in Ink rather than implying readiness. |
| Record table | Paper background, Ink text, bold column headings, and 1px Ink row dividers. Cells use 16px padding. Long content wraps; on narrow screens, contain horizontal scrolling within the table region rather than the entire page. Rows are not controls and have no hover, focus, or disabled state; embedded links/buttons follow their own rules. Empty results use a plain explanatory message; failed loading uses Rust text. |

---

## SVC Self-Check

- [X] **Simple** — 3–7 colors, no more than 2 font families, one spacing scale.
- [X] **Valuable** — every rule would change how a screen gets built; the brand principles actually rule things out.
- [ ] **Complete** — every section is filled or marked "N/A because…"; every color meets its contrast target; components include hover, focus, disabled, and error states; the whole team has approved it.
