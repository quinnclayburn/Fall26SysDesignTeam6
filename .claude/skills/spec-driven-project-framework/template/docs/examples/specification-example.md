# Club Photos — Specification

> **Example.** This is a filled-in version of `specification.md` for the photo-club app used throughout the guides, shown at the end of Week 8. Use it to see the level of detail expected — not as text to copy.
>
> **Version:** 1.1
>
> **Approved on:** 2026-09-24 **by:** Product Owner Sam Rivera · Architecture Lead Priya Shah · Delivery Lead Alex Kim

---

## 0. Constitution

| # | Principle | Why it exists |
|---|-----------|---------------|
| 1 | Only logged-in club members can see photos. | Members agreed to share photos with the club, not the public. |
| 2 | Uploaded photos are never compressed or resized. | Losing quality over group text is the problem we're solving. |
| 3 | Only admins can add photos. | Keeps the gallery organized by event. |

---

## 1. Problem & Evidence

**Problem and success:** The photography club's 40 members and 2 admins share event photos over group text, which lowers their quality and buries older photos within days. Success: within a month of launch, 70% of members have viewed the gallery after an event, and admins stop posting photos to the group text.

**Evidence:**

| ID | What we heard or saw | From whom |
|----|----------------------|-----------|
| E1 | "The hike photos were gone from the group text in two days." | Club member, interview |
| E2 | "I send 40 photos in batches and they come out blurry. Only admins should post, or it gets messy." | Admin, interview |
| E3 | "I'd look at the club's photos more if I didn't have to scroll back through the chat to find them." | Club member, interview |
| E4 | 3 of 4 people looked for an event by date first, so newest-first felt natural. | Prototype test (paper) |
| E5 | All 4 logged in without help; nobody asked what the login was for. | Prototype test (paper) |

**Riskiest assumption:** Members will log in just to see photos. We'll watch whether the 4 members in the prototype test complete login without help.

---

## 2. Scope

**In scope:** Browsing photos by event, admins creating events and uploading photos, viewing one photo full-size, searching events by name.

**Out of scope:** Comments or likes, member uploads, editing or deleting photos, a mobile app.

---

## 3. User Scenarios

**S1: Browse an event's photos** — Priority: P1
- Actor: Club member
- Trigger: Wants to see photos from a recent event
- Steps: Logs in → opens the gallery → picks an event → scrolls through its photos
- Success outcome: Sees every photo from that event at full quality
- Failure outcome: The event has no photos yet → sees "No photos yet for this event."

**S2: Upload photos after an event** — Priority: P1
- Actor: Admin
- Trigger: An event just ended
- Steps: Logs in → picks the event (or creates it) → selects photo files → uploads
- Success outcome: The photos appear in that event's gallery
- Failure outcome: A file is the wrong type or too large → that file is rejected with a clear reason; the others still upload

**S3: View one photo full-size** — Priority: P2
- Actor: Club member
- Trigger: Wants a closer look at a photo
- Steps: Opens an event → clicks a photo
- Success outcome: Sees the photo full-size with the event name and date
- Failure outcome: The photo fails to load → sees "This photo couldn't be loaded. Try again."

**S4: Find an event by name** — Priority: P3
- Actor: Club member
- Trigger: Looking for an older event
- Steps: Types part of the event name into search
- Success outcome: Sees the matching events
- Failure outcome: Nothing matches → sees "No events match that name."

---

## 4. Requirements & Acceptance Tests

| ID | Requirement | Priority | Acceptance test (do → expect) | Evidence |
|----|-------------|----------|-------------------------------|----------|
| R1 | While a user is not logged in, the system shall show only the login page. | P1 | Open the gallery link while logged out → login page appears, no photos visible | E5 |
| R2 | When a member opens the gallery, the system shall list all events, newest first. | P1 | With 3 events added → all 3 listed, most recent at the top | E1, E3, E4 |
| R3 | When a member selects an event, the system shall show all of that event's photos. | P1 | Open an event with 12 photos → all 12 appear | E1 |
| R4 | If an event has no photos, then the system shall show "No photos yet for this event." | P1 | Open a new, empty event → message appears | ASSUMPTION |
| R5 | The system shall allow only admins to upload photos. | P1 | Log in as a member → no upload option anywhere | E2 |
| R6 | When an admin uploads photo files to an event, the system shall store the original files and show them in that event's gallery. | P1 | Upload 3 JPGs → all 3 appear; download one → same file size as the original | E2 |
| R7 | If an uploaded file is not a JPG or PNG, or is larger than 20 MB, then the system shall reject that file and show the reason. | P1 | Upload a PDF and a valid JPG together → PDF rejected with "Only JPG or PNG files"; JPG uploads | E2 |
| R8 | When a member selects a photo, the system shall show it full-size with the event name and date. | P2 | Click any photo → full-size view with event name and date | |
| R9 | When a member searches for an event name, the system shall show events whose names contain the search text. | P3 | Search "spring" → "Spring Show 2026" appears; search "zzz" → "No events match that name." | |
| R10 | When an admin creates an event with a name and date, the system shall add it to the gallery. | P1 | Create "Fall Walk", 2026-10-03 → it appears at the top of the event list | E2 |
| R11 | When a member opens an event with 100 photos, the system shall show them all within 3 seconds on a home connection. | P2 | Open an event with 100 photos → all visible within 3 seconds | |
| R12 | The system shall give every photo alt text with its event name and photo number. | P1 | Inspect any photo in the gallery → alt text reads like "Fall Walk, photo 3" | WCAG 2.2 AA |

---

## 5. Open Questions

| ID | Question | Raised by | Owner | Status |
|----|----------|-----------|-------|--------|
| Q1 | Can members download full-quality photos? | Product Owner, Week 2 | Product Owner | Resolved: Yes — originals are stored (R6). |
| Q2 | Do admins need to delete photos? | Product Owner, Week 2 | Product Owner | Resolved: Not in this version — added to Out of scope. |
| Q3 | How does an event get created? No requirement covers it. | Architecture Lead, Week 3 | Product Owner | Resolved: Added R10 (v1.1). |
| Q4 | Load time and alt text were listed as constraints with no tests. Should they be requirements? | Architecture Lead, Week 3 | Product Owner | Resolved: Added R11 and R12 (v1.1). |
| Q5 | Do we need to record who uploaded each photo? | Architecture Lead, Week 3 | Product Owner | Resolved: No — no requirement needs it, so `uploaded_by` was cut from Data & API. |
| Q6 | Can two events have the same name? R10 doesn't say. | Delivery Lead, Week 8 (T9) | Product Owner | Resolved: Yes — events are told apart by date. No other document change needed. |
