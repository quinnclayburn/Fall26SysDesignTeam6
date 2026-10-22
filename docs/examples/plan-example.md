# Club Photos — Plan

> **Example.** This is a filled-in version of `plan.md` for the photo-club app, shown as it looks after the Week 7 fixes. Use it to see the level of detail expected — not as text to copy.
>
> **Version:** 1.1
>
> **Approved on:** 2026-10-23 **by:** Architecture Lead Priya Shah · Product Owner Sam Rivera · Delivery Lead Alex Kim

---

## 1. Approach

A small web app where members log in, browse events, and view each event's photos. Admins use two extra forms: one to create an event and one to upload photos to it. The real product uses one hosted service, Supabase, for login, the database, and photo storage. For this course's build, `data.js` simulates Supabase with sample data and browser storage, following the Data & API Design exactly, so System Implementation can swap in Supabase without changing the screens.

---

## 2. Key Decisions (ADRs)

| ADR | Decision | Req IDs | Alternatives considered | Why this one |
|-----|----------|---------|-------------------------|--------------|
| ADR-00 | Tech stack — Frontend: Vue, no build (starter skill: collection-template) · Backend: Simulated now; Supabase in System Implementation · Database: PostgreSQL via Supabase (also login and file storage) · Hosting: GitHub Pages (repo root) | R1–R12 | Firebase; React with our own database server | The course default gets P1 working with no accounts or setup. The design targets one free service that covers login, data, and files, which fits the free-tier constraint. |
| ADR-01 | Store photos as files in Supabase Storage; the database keeps only each file's path. **Simulated now:** sample photos use image links, and uploaded photos last only until the page reloads. | R6 | Store image data in the database; link to Google Photos | Keeps originals at full quality (Constitution #2) and keeps the database small. |
| ADR-02 | Log in with an emailed link instead of a password. **Simulated now:** a "log in as…" picker (simulated-login skill) on the home page, which serves as the login page. | R1 | Email and password; Google login | Members don't need another password, and we never store one. |
| ADR-03 | Enforce "admins only" in the backend (Supabase row-level security), not just by hiding buttons. **Simulated now:** `data.js` refuses non-admins (403), and the screens hide admin actions. | R5, R10 | Check the role only in the screens | Hidden buttons can be bypassed by calling the API directly. |

---

## 3. Screens & Build Order

| # | Screen or part | Route | Shows / does | Req IDs | Priority |
|---|----------------|-------|--------------|---------|----------|
| 1 | Sample data and `data.js` (simulated backend) | — | Stands in for Supabase: members, events, and photos, with one function per endpoint; refuses non-admin changes | R1–R10 | P1 |
| 2 | Event list | `/events` | Event cards (name, date), newest first. Admin: a "Create event" button | R2 | P1 |
| 3 | Event gallery | `/events/:id` | Event name and date, then a photo grid (4 columns wide, 2 on phones) with alt text, or "No photos yet for this event." Admin: an "Upload photos" button | R3, R4, R11, R12 | P1 |
| 4 | Home and login picker (simulated) | `/` | Club name, a welcome line, and the "log in as…" picker. Logged-out users see only this screen | R1 | P1 |
| 5 | Create-event form (admin) | `/events/new` | Name and date fields; Save or Cancel | R10 | P1 |
| 6 | Upload form (admin) | `/events/:id/upload` | File picker, then each file's result: uploaded, or rejected with the reason | R5, R6, R7 | P1 |
| 7 | Photo view | `/photos/:id` | One photo full-size, with the event name and date | R8 | P2 |
| 8 | Event search | `/events` | A search box on the event list; "No events match that name." when nothing matches | R9 | P3 |

**Why this order:** P1 is built as two slices, each end to end. Browsing (S1) comes first: it gives a clickable app within three tasks and tests the data design early, since any wrong field name shows up on screen. Uploading (S2) comes next because it's the riskiest part (large files, partial failures, and the simulation's storage limits), so problems surface with time left to fix them. `data.js` grows with each slice: read functions for browsing, admin functions for uploading.

---

## 4. Risks & Assumptions

| Risk or assumption | Likelihood | Impact | Mitigation |
|--------------------|------------|--------|------------|
| Browser storage is too small for real photo uploads | High | Medium | Keep uploaded photos only until reload and mark R6 as simulated (ADR-01). |
| The simulation drifts from the real design, so System Implementation has to redo it | Medium | High | Every `data.js` function matches an endpoint in Data & API Section 4, with the exact field names; checked in the Week 5 cross-check. |
| The simulated login hides that real login isn't built yet | Medium | Medium | List R1 and R5 as simulated in the Build Notes (`tasks.md` Section 4); ADR-02 and ADR-03 describe the real design. |
| A member can reach admin actions | Low | High | `data.js` checks the role on every admin action (ADR-03), built and tested as T8, before the admin screens. |
| Assumption: sample data with 3 events and about 30 photos is enough to test every P1 scenario | Low | Medium | Add one event with 100 photos for the R11 load-time check (T14). |
| Assumption: about 300 photos a year, each under 20 MB (R7), fit Supabase's free storage | Medium | Low | The Business Case budgets up to $60 a year if we outgrow it. |
