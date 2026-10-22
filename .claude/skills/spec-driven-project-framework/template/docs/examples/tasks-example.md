# Club Photos — Tasks

> **Example.** This is a filled-in version of `tasks.md` for the photo-club app, shown partway through the Week 8 build. Use it to see the level of detail expected — not as text to copy.
>
> **Approved on:** 2026-10-09 **by:** Delivery Lead Alex Kim · Architecture Lead Priya Shah · Product Owner Sam Rivera

---

## 1. Task List

| ID | Task | Priority | Traces to (R# / ADR) | Depends on | Done when | Status |
|----|------|----------|----------------------|------------|-----------|--------|
| T0 | Scaffold the app from the collection-template skill (ADR-00) | P1 | ADR-00 | — | The template's sample pages open in the browser | Done |
| T1 | Add sample data for members, events, and photos (Data & API Section 1) | P1 | R1–R10, ADR-00 | T0 | Opening each file directly in the browser (e.g. `data/events.json`) shows valid JSON with the field names in Data & API Section 1. No screens change yet. | Done |
| T2 | Write the read functions in `data.js`: `getEvents` and `getEventPhotos` | P1 | R2, R3, R4, ADR-00 | T1 | Calling each function in the browser console returns its documented response shape. No screens change yet. | Done |
| T3 | Build the event list, newest first | P1 | R2 | T2 | R2 acceptance test passes | Done |
| T4 | Build the event gallery, with alt text on every photo | P1 | R3, R12 | T3 | R3 and R12 acceptance tests pass | Done |
| T5 | Show "No photos yet for this event" for empty events | P1 | R4 | T4 | R4 acceptance test passes | Done |
| T6 | Add the simulated login picker to the home page (simulated-login skill) | P1 | R1, ADR-02 | T2 | The picker lists the sample members by email, switches between member and admin, and the choice survives a reload | Done |
| T7 | Send logged-out users to the login page (the home page, ADR-02) | P1 | R1, ADR-02 | T6 | R1 acceptance test passes | Done |
| T8 | Write the admin functions in `data.js`: `createEvent` and `uploadPhotos`, refusing non-admins | P1 | R5, R10, ADR-03 | T6 | In the browser console, as a member both functions are refused with a readable 403 message; as an admin both work. No screens change yet. | Done |
| T9 | Build the create-event form (admin) | P1 | R10 | T8 | R10 acceptance test passes | Done |
| T10 | Build the upload form, keeping uploaded photos until reload | P1 | R6, ADR-01 | T8, T9 | R6 acceptance test passes (simulated: photos last until reload) | In progress |
| T11 | Reject non-JPG/PNG files and files over 20 MB, showing the reason | P1 | R7 | T10 | R7 acceptance test passes | Not started |
| T12 | Test P1 end to end: create event → upload → see photos in gallery | P1 | R2–R7, R10, R12 | T5, T7, T11 | All P1 acceptance tests pass in one run | Not started |
| T13 | Build the full-size photo view | P2 | R8 | T4 | R8 acceptance test passes | Not started |
| T14 | Add an event with 100 sample photos and check how fast it loads | P2 | R11 | T4 | R11 acceptance test passes | Not started |
| T15 | Build event search | P3 | R9 | T3 | R9 acceptance test passes | Not started |

---

## 2. Cross-Check (Week 5)

| Req ID | Data & API (entity / endpoint) | Plan (ADR / screen #) | Task(s) |
|--------|--------------------------------|-----------------------|---------|
| R1 | Member · `POST /v1/login`, `GET /v1/me`; all other endpoints require login | ADR-02 · #4 Home and login picker | T6, T7 |
| R2 | Event · `GET /v1/events` | #1 `data.js` · #2 Event list | T2, T3 |
| R3 | Photo · `GET /v1/events/{id}/photos` | #1 `data.js` · #3 Event gallery | T2, T4 |
| R4 | `GET /v1/events/{id}/photos` returns `[]` | #3 Event gallery | T2, T5 |
| R5 | Member.role · `POST /v1/events/{id}/photos` (403) | ADR-03 · #1 `data.js` | T8 |
| R6 | Photo.file_path · `POST /v1/events/{id}/photos` | ADR-01 · #6 Upload form | T8, T10 |
| R7 | `POST /v1/events/{id}/photos` (`rejected` list) | #6 Upload form | T8, T11 |
| R10 | Event · `POST /v1/events` | ADR-03 · #5 Create-event form | T8, T9 |
| R12 | Event.name · `GET /v1/events/{id}/photos` (order gives the photo number) | #3 Event gallery | T4 |

**Result:** All 9 P1 requirements traced; every task traces to a requirement or ADR.

---

## 3. Gap Log (Weeks 6–7)

| What the agent got wrong or guessed | Which document & section caused it | Fix applied | Fixed in re-run? |
|-------------------------------------|------------------------------------|-------------|------------------|
| Tried to save uploaded photos in browser storage, which filled up after two photos | `data-api-design.md` Section 0 — didn't say how uploads work in the simulated build | Added to Section 0: uploaded photos last only until the page reloads; sample photos use image links (v1.1) | Yes |
| Rejected the whole upload when one file was invalid | `data-api-design.md` Section 4 — upload response didn't show partial success | Changed the response to list `uploaded` and `rejected` files separately (v1.1) | Yes |
| Added a `name` field to Member so the login picker could show it | `data-api-design.md` Section 4 — no login endpoints, so nobody had designed what the picker shows | Added the login endpoints; the picker shows each member's `email` (v1.1) | Yes |
| Built a separate `/login` page next to the picker on the home page | `plan.md` Section 2, ADR-02 — didn't say where the simulated login lives | ADR-02: the home page, with the picker, is the login page; added a route for every screen in Section 3 (v1.1) | Yes |

---

## 4. Build Notes (Week 8)

- **Live URL:** `https://club-photos-team.github.io/club-photos/`
- **Simulated:** R1 — a "log in as…" picker instead of an emailed link (ADR-02). R5 and R10 — admin checks in `data.js`, not database rules (ADR-03). R6 — uploaded photos last only until reload (ADR-01).
- **Not built:** *(Filled in at the end of Week 8.)*
