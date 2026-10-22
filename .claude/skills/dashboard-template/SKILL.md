---
name: dashboard-template
description: Generate a new Vue.js analytics/KPI dashboard web app (no-build) from the dashboard-template scaffold, with a simulated backend in data.js. Use when asked to create a new dashboard, scaffold a metrics/analytics app, or generate a widget-grid site from this template.
version: 1.2
updated: 2026-09-28
---

# Dashboard Template Skill

Generate a new Vue.js dashboard web app from the dashboard-template scaffold. This skill copies the template files into a folder and explains how to customize them for your app's widgets, data, and look.

## Template conventions

1. **One JSON file per entity or data source** in `data/`, named after it (e.g. `data/attendance.json`). Use your data design's field names exactly, and never rename fields in code.
2. **All data access goes through `data.js`**, with one function per API endpoint the app uses. Widgets point to those functions; nothing fetches data files directly.
3. **Brand styles go in `style.css`** (colors as CSS variables, plus rules for buttons, cards, and navigation) and **chart colors in `widgets.js`**.
4. **Keep the app out of `docs/`.** GitHub Pages can publish from the repository root or `docs/`, and `docs/` is usually taken by documentation.

## Relationship to other skills

This is a **standalone, sibling skill** to `collection-template`, not an overlay of it. The two base scaffolds are alternative starting points:

| | `collection-template` | `dashboard-template` |
|---|---|---|
| Domain shape | Browsable collection of items with detail pages | Grid of KPI/chart widgets driven by a layout spec |
| Core data | One JSON file per entity (sample: `data/items.json`) | One JSON file per data source under `data/`, one or more per widget |
| Key files | `data.js`, `collection-page-component.js`, `item-detail-page-component.js` | `data.js`, `dashboard-layout.json`, `widgets.js`, `echart-component.js`, `widget-card-component.js`, `stat-card-component.js`, `widget-detail-page-component.js` |
| Extra CDN dependency | — | Apache ECharts |

Both share the same conventions: Vue 3 and Vue Router 4 via pinned CDN links with no build step, Bootstrap 5, a `data.js` simulated backend, and the same `navbar-component.js` / `about-page-component.js` pattern. Both also work with the `simulated-login` and `chat-panel` overlays, which add their own files and a navbar item.

## Architecture Overview

The template is a **front-end only** Vue 3 single-page application that uses:

- **Vue 3** (Composition API) — loaded via CDN, no build step required
- **Vue Router 4** — hash-based client-side routing
- **Bootstrap 5** — CSS framework (loaded via CDN)
- **Apache ECharts** — charting library (loaded via CDN)
- **`data.js`** — the simulated backend: one function per endpoint
- **`data/*.json`** — sample data, one file per data source
- **`widgets.js`** — the widget registry: each widget's id, title, description, chart or stat type, `source` function, and field names
- **`dashboard-layout.json`** — the grid of rows and columns, and which widget goes in each cell. It's app configuration, not data, so it's read directly.

Library versions are pinned in `index.html` so every build loads the same code.

## Scaffolding Instructions

1. Copy all files from `template-files/` into the target folder, preserving the folder structure and including the hidden `.nojekyll` file (it stops GitHub Pages from processing the site with Jekyll). Use the repository root if the app will be published with GitHub Pages.
2. Open `index.html` and update the `<title>` to the app name.
3. Open `data.js` and set `APP_ID` to a short name for the app.
4. Replace the files in `data/` with one JSON file per data source, and rewrite the functions in `data.js` to match the app's endpoints (see "The data layer" below).
5. Define each widget in `widgets.js` (see "Adding a widget" below), and lay them out in `dashboard-layout.json`: each column has a Bootstrap-style `span` out of 12 and a `widget` id.
6. Update `components/navbar-component.js` and `components/about-page-component.js` for the app.
7. Apply the brand's styles in `style.css` and the `COLORS` in `widgets.js`.

**To preview**, serve the folder with any static file server (e.g. VS Code's Live Server extension, or `python3 -m http.server`).

**To publish**, push to GitHub and enable GitHub Pages (Settings > Pages > deploy from the root of the `main` branch).

## The data layer

`data.js` is the only file that reads or writes data. It stands in for a backend until a real one replaces it.

- **Reading:** `loadEntity('attendance')` returns saved changes if there are any, otherwise the rows in `data/attendance.json`.
- **Saving:** `saveEntity('attendance', rows)` stores the updated rows in the browser (localStorage), so changes survive a reload.
- **One function per endpoint,** named after what it returns, with the endpoint in a comment:

```javascript
// GET /v1/attendance
export async function getAttendance() {
  return loadEntity('attendance');
}
```

- **Saving example:** `updateServiceStatus(label, status)` in the template shows a PATCH endpoint that validates its input and saves the change.
- **Errors:** return `null` for "not found" (404); throw an `Error` with a readable message for bad input (400) or not allowed (403).
- **Response shapes:** each function returns exactly the fields its endpoint's success response is designed to return.
- **Starting over:** `resetData()` clears saved changes and goes back to the sample data.

## Adding a widget

1. Add a JSON file under `data/` and a function for it in `data.js`, or reuse an existing function if several widgets share the same data.
2. Import the function in `widgets.js` and add an entry with a unique id:
   ```javascript
   attendance_trend: {
     id: 'attendance_trend',
     title: 'Attendance Trend',
     description: 'Members attending each event.',
     type: 'line', // 'line' | 'bar' | 'scatter' | 'histogram' | 'kpi' | 'badges'
     source: getAttendance,
     x: 'event_date', // chart types only
     y: 'count',      // chart types only
   },
   ```
3. Reference that id from `dashboard-layout.json` so it appears on the grid, and set a `span` (out of 12) for its column width.
4. The widget automatically gets a detail page at `#/widget/<id>` with a larger chart or stat and an accessible data table — no extra wiring required.

### Widget types

| `type` | Renders as | Required fields | Data shape |
|---|---|---|---|
| `line` | Time-series line chart | `x`, `y` | one row per point |
| `bar` | Category bar chart | `x`, `y` | one row per category |
| `scatter` | X/Y scatterplot | `x`, `y` | one row per point |
| `histogram` | Binned distribution | `field`, `bins` | one row per raw sample |
| `kpi` | Big-number stat card with trend | `metricId` | rows keyed by `id`, with `value`, `unit`, and `trend` fields (see `data/kpi_metrics.json`) |
| `badges` | List of status pills | — | `label` and `status` (`ok` \| `warning` \| `error`) fields |

## Customizing components

Each component in `components/` is a self-contained Vue component with an inline template. Edit the `template` property to change the HTML and the `setup()` function to add logic.

- **`navbar-component.js`** — Top navigation bar. Update the brand name and router links.
- **`dashboard-page-component.js`** — Renders the grid from `dashboard-layout.json`. Rarely needs edits beyond the heading and loading text.
- **`widget-card-component.js`** — Card for a single grid cell; chooses chart or stat rendering and links to the detail page.
- **`echart-component.js`** — Thin wrapper around an ECharts instance; handles mount, resize, and cleanup.
- **`stat-card-component.js`** — Renders `kpi` and `badges` widgets.
- **`widget-detail-page-component.js`** — Full-size chart or stat plus an accessible data table for a single widget.
- **`about-page-component.js`** — About page.

## Adding a real backend

Replace the body of each function in `data.js` with a call to the real backend, keeping the same function names and return shapes. The widgets, layout, and components don't change. For example, with a REST API:

```javascript
// GET /v1/attendance
export async function getAttendance() {
  const response = await fetch('/v1/attendance');
  if (!response.ok) throw new Error('Could not load attendance.');
  return response.json();
}
```

The same approach works with a hosted database such as Supabase: query the table inside the function and return the same fields.

## File Reference

The following files are in the `template-files/` directory:

- [app.js](./template-files/app.js) — Vue app setup, routing, and loading each widget's data through its `source` function
- [data.js](./template-files/data.js) — The simulated backend: one function per endpoint
- [widgets.js](./template-files/widgets.js) — Widget registry and ECharts option builders
- [dashboard-layout.json](./template-files/dashboard-layout.json) — Grid layout spec (rows, columns, widget ids, spans)
- [index.html](./template-files/index.html) — HTML shell with pinned CDN dependencies (Vue, Vue Router, ECharts)
- [style.css](./template-files/style.css) — Global styles
- `.nojekyll` — Empty file that tells GitHub Pages to serve the files as they are
- [components/navbar-component.js](./template-files/components/navbar-component.js) — Navigation bar
- [components/dashboard-page-component.js](./template-files/components/dashboard-page-component.js) — Main dashboard grid page
- [components/widget-card-component.js](./template-files/components/widget-card-component.js) — Single grid-cell card (chart or stat)
- [components/echart-component.js](./template-files/components/echart-component.js) — ECharts wrapper
- [components/stat-card-component.js](./template-files/components/stat-card-component.js) — KPI and badges renderer
- [components/widget-detail-page-component.js](./template-files/components/widget-detail-page-component.js) — Widget detail page with data table
- [components/about-page-component.js](./template-files/components/about-page-component.js) — About page
- [data/kpi_metrics.json](./template-files/data/kpi_metrics.json), [data/revenue_timeseries.json](./template-files/data/revenue_timeseries.json), [data/status_badges.json](./template-files/data/status_badges.json), [data/category_sales.json](./template-files/data/category_sales.json), [data/engagement_scatter.json](./template-files/data/engagement_scatter.json), [data/response_times.json](./template-files/data/response_times.json) — Sample data, one file per data source
