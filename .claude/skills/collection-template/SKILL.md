---
name: collection-template
description: Generate a new Vue.js web app (no-build) from the collection-template scaffold, with a simulated backend in data.js. Use when asked to create a new app, scaffold a project, or generate a site from this template.
version: 1.2
updated: 2026-09-28
---

# Collection Template Skill

Generate a new Vue.js web app from the collection-template scaffold. This skill copies the template files into a folder and explains how to customize them for your app's data, screens, and look.

## Template conventions

1. **One JSON file per entity** in `data/`, named after the entity (e.g. `data/events.json`). Use your data design's field names exactly, and never rename fields in code.
2. **All data access goes through `data.js`**, with one function per API endpoint the app uses. Components never fetch data files directly.
3. **Brand styles go in `style.css`:** colors as CSS variables, plus rules for buttons, cards, form fields, and navigation.
4. **Keep the app out of `docs/`.** GitHub Pages can publish from the repository root or `docs/`, and `docs/` is usually taken by documentation.

## Architecture Overview

The template is a **front-end only** Vue 3 single-page application that uses:

- **Vue 3** (Composition API) — loaded via CDN, no build step required
- **Vue Router 4** — hash-based client-side routing
- **Bootstrap 5** — CSS framework (loaded via CDN)
- **`data.js`** — the simulated backend: one function per endpoint
- **`data/*.json`** — sample data, one file per entity

Library versions are pinned in `index.html` so every build loads the same code.

## Scaffolding Instructions

1. Copy all files from `template-files/` into the target folder, preserving the folder structure and including the hidden `.nojekyll` file (it stops GitHub Pages from processing the site with Jekyll). Use the repository root if the app will be published with GitHub Pages.
2. Open `index.html` and update the `<title>` to the app name.
3. Open `data.js` and set `APP_ID` to a short name for the app.
4. Replace `data/items.json` with one JSON file per entity, and rewrite the functions in `data.js` to match the app's endpoints (see "The data layer" below).
5. Update `components/navbar-component.js`, `components/landing-page-component.js`, and `components/about-page-component.js` for the app.
6. Apply the brand's styles in `style.css`.

**To preview**, serve the folder with any static file server (e.g. VS Code's Live Server extension, or `python3 -m http.server`).

**To publish**, push to GitHub and enable GitHub Pages (Settings > Pages > deploy from the root of the `main` branch).

## The data layer

`data.js` is the only file that reads or writes data. It stands in for a backend until a real one replaces it.

- **Reading:** `loadEntity('events')` returns saved changes if there are any, otherwise the rows in `data/events.json`.
- **Saving:** `saveEntity('events', rows)` stores the updated rows in the browser (localStorage), so changes survive a reload.
- **One function per endpoint,** named after what it does, with the endpoint in a comment:

```javascript
// GET /v1/events
export async function getEvents() {
  return loadEntity('events');
}

// POST /v1/events — throws an Error when required fields are missing (400).
export async function createEvent(fields) {
  if (!fields.name || !fields.event_date) {
    throw new Error('Name and date are required.');
  }
  const events = await loadEntity('events');
  const event = { id: crypto.randomUUID(), ...fields };
  events.push(event);
  saveEntity('events', events);
  return event;
}
```

- **Errors:** return `null` for "not found" (404); throw an `Error` with a readable message for bad input (400) or not allowed (403).
- **Response shapes:** each function returns exactly the fields its endpoint's success response is designed to return.
- **Starting over:** `resetData()` clears saved changes and goes back to the sample data.

## Customizing components

Each component in `components/` is a self-contained Vue component with an inline template. Edit the `template` property to change the HTML and the `setup()` function to add logic.

- **`navbar-component.js`** — Top navigation bar. Update the brand name and router links.
- **`landing-page-component.js`** — Home page. Rewrite the welcome text.
- **`collection-page-component.js`** — Grid listing of all items. Change the card layout or add filtering and sorting.
- **`item-detail-page-component.js`** — Single item view, loaded with `getItem(id)`. Add fields or a richer layout.
- **`about-page-component.js`** — About page.

Rename `items`, the routes, and these components to match the app's entities (e.g. `events`, `/events/:id`).

## Adding a real backend

Replace the body of each function in `data.js` with a call to the real backend, keeping the same function names and return shapes. The rest of the app doesn't change. For example, with a REST API:

```javascript
// GET /v1/events
export async function getEvents() {
  const response = await fetch('/v1/events');
  if (!response.ok) throw new Error('Could not load events.');
  return response.json();
}
```

The same approach works with a hosted database such as Supabase: query the table inside the function and return the same fields.

## File Reference

The following files are in the `template-files/` directory:

- [app.js](./template-files/app.js) — Vue app setup, routing, and initial data load through `data.js`
- [data.js](./template-files/data.js) — The simulated backend: one function per endpoint
- [data/items.json](./template-files/data/items.json) — Sample data for the `items` entity
- [index.html](./template-files/index.html) — HTML shell with pinned CDN dependencies
- [style.css](./template-files/style.css) — Global styles
- `.nojekyll` — Empty file that tells GitHub Pages to serve the files as they are
- [components/landing-page-component.js](./template-files/components/landing-page-component.js) — Home page
- [components/about-page-component.js](./template-files/components/about-page-component.js) — About page
- [components/navbar-component.js](./template-files/components/navbar-component.js) — Navigation bar
- [components/collection-page-component.js](./template-files/components/collection-page-component.js) — Collection grid
- [components/item-detail-page-component.js](./template-files/components/item-detail-page-component.js) — Item detail
