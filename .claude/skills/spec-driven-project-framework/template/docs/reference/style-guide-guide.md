# How to Complete style-guide.md

The Style Guide tells every screen — and every AI agent — how the product looks and sounds. Write it in the Specify phase, alongside the Spec. Start with the brand principles: every later choice should fit them, and if a color or font doesn't, it doesn't belong. The Style Guide constrains everyone's work, so the whole team approves it.

For a filled-in version, see `docs/examples/style-guide-example.md`.

---

## Contrast in one minute

Contrast is how much a color stands out from what's behind it, written as a ratio like 4.5:1. WCAG AA — the usual standard — asks for:

- **4.5:1** for normal text
- **3:1** for large text (24px, or about 19px bold) and for the borders of buttons and form fields

Light grays and bright yellows often fail. The checker tells you in seconds — if a color misses, pick a darker or lighter shade now, not after the build.

---

## Common Mistakes

- ❌ Brand principles so general they fit any product ("modern and clean").
- ❌ A light-gray border or placeholder that nobody can see — check the borders too, not just the text.
- ❌ Spacing values off the scale (15px when your base unit is 8px).
- ❌ Leaving out hover, focus, and error states. The AI build will invent them, and every screen will invent them differently.
- ❌ Changing colors mid-build without bumping the version and getting the team's approval.
