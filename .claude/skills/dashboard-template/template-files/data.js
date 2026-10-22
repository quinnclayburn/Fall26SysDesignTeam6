// data.js — the simulated backend.
//
// Every read and write in the app goes through this file.
// - One function per API endpoint the app uses.
// - Sample data comes from data/<source>.json, using the app's field names
//   exactly as designed.
// - Changes are saved in the browser (localStorage), so they survive a reload.
//
// When you add a real backend, replace the body of each function with a call
// to it. Nothing else in the app should need to change.

// Change this to your app's name. GitHub Pages sites from the same account
// share browser storage, so each app needs its own prefix.
const APP_ID = 'dashboard-starter';

// Read a data source's rows: saved changes first, otherwise the sample JSON file.
async function loadEntity(entity) {
  try {
    const saved = localStorage.getItem(`${APP_ID}:${entity}`);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    // Storage unavailable or corrupted: fall back to the sample data.
  }

  const response = await fetch(`data/${entity}.json`);
  if (!response.ok) {
    throw new Error(`Could not load data/${entity}.json`);
  }
  return response.json();
}

// Save a data source's rows to the browser.
function saveEntity(entity, rows) {
  localStorage.setItem(`${APP_ID}:${entity}`, JSON.stringify(rows));
}

// GET /v1/kpi-metrics
export async function getKpiMetrics() {
  return loadEntity('kpi_metrics');
}

// GET /v1/revenue-timeseries
export async function getRevenueTimeseries() {
  return loadEntity('revenue_timeseries');
}

// GET /v1/service-statuses
export async function getServiceStatuses() {
  return loadEntity('status_badges');
}

// GET /v1/category-sales
export async function getCategorySales() {
  return loadEntity('category_sales');
}

// GET /v1/engagement
export async function getEngagement() {
  return loadEntity('engagement_scatter');
}

// GET /v1/response-times
export async function getResponseTimes() {
  return loadEntity('response_times');
}

// PATCH /v1/service-statuses/{label} — an example of saving a change.
// Returns null when the service isn't found (404); throws an Error for an
// invalid status (400).
export async function updateServiceStatus(label, status) {
  if (!['ok', 'warning', 'error'].includes(status)) {
    throw new Error('Status must be ok, warning, or error.');
  }
  const services = await loadEntity('status_badges');
  const service = services.find((row) => row.label === label);
  if (!service) {
    return null;
  }
  service.status = status;
  saveEntity('status_badges', services);
  return service;
}

// Clear all saved changes and go back to the sample data.
export function resetData() {
  Object.keys(localStorage)
    .filter((key) => key.startsWith(`${APP_ID}:`))
    .forEach((key) => localStorage.removeItem(key));
}
