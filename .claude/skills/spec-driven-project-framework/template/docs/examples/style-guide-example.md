# Club Photos — Style Guide

> **Example.** This is a filled-in version of `style-guide.md` for the photo-club app. Use it to see the level of detail expected — not as text to copy.
>
> **Version:** 1.0
>
> **Approved on:** 2026-09-18 **by:** Delivery Lead Alex Kim · Product Owner Sam Rivera · Architecture Lead Priya Shah

Targets **WCAG 2.2 AA** accessibility.

---

## 1. Brand & Voice

- **Brand principles:** Quiet and gallery-like: the photos are the star, so the interface stays out of the way. Calm and quick — a member should reach an event's photos in two clicks.
- **Tone:** friendly, calm, brief. Talk like a fellow club member, not a computer.
- **Button example:** "Upload photos," not "Submit media."
- **Error example:** "That file is too large — the limit is 20 MB," not "Error 413: Payload too large."
- **Logo:** None yet. Use the name "Club Photos" in Heading 2 style.

---

## 2. Colors

| Name | Hex | Use | Contrast vs. background |
|------|-----|-----|-------------------------|
| Primary | #1F4E79 | Primary buttons, active navigation | 8.1:1 ✅ (white text on it: 8.7:1 ✅) |
| Accent | #A34A28 | Links | 5.5:1 ✅ |
| Text | #1C1C1C | Body text, headings | 15.9:1 ✅ |
| Muted text | #5C5C5C | Dates, captions, form labels | 6.2:1 ✅ |
| Border | #8A8A8A | Form field and card borders | 3.2:1 ✅ |
| Error | #B00020 | Error messages and error borders | 6.8:1 ✅ |
| Background | #F7F7F5 | Page background | — |

---

## 3. Type & Spacing

| Role | Font | Size | Weight |
|------|------|------|--------|
| Heading 1 | Inter | 32px | Bold |
| Heading 2 | Inter | 24px | Semibold |
| Body | Inter | 16px | Regular |

- **Spacing scale:** 8 / 16 / 24 / 32 / 48px, from an 8px base unit.
- **Max content width:** 1200px. The photo grid shows 4 columns on wide screens, 2 on phones.

---

## 4. Components

| Component | Rules |
|-----------|-------|
| Button (primary) | Primary background, white text, 8px corner radius, 8px × 16px padding. Hover: 10% darker. Focus: 2px Primary outline, offset 2px. Disabled: 40% opacity, no hover. |
| Button (secondary) | White background, 1px Primary border, Primary text; otherwise the same as the primary button. |
| Card (event or photo) | White background, 1px Border, 8px corner radius, 16px padding. Hover: shadow appears. Focus: 2px Primary outline. |
| Form field | Label above in Muted text; 1px Border; 8px padding. Focus: 2px Primary border. Error: Error-colored border, with the message below in Error color. |
| Navigation | Top bar with the club name on the left and links on the right, 24px apart. Active link: Primary color, underlined. |
