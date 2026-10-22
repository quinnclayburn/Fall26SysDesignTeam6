// data.js — the simulated backend.
//
// Every read and write in the app goes through this file.
// - One function per API endpoint the app uses.
// - Sample data comes from data/<entity>.json, using the app's field names
//   exactly as designed.
// - Changes are saved in the browser (localStorage), so they survive a reload.
//
// When you add a real backend, replace the body of each function with a call
// to it. Nothing else in the app should need to change.

// Change this to your app's name. GitHub Pages sites from the same account
// share browser storage, so each app needs its own prefix.
const APP_ID = 'web-app-starter';

// Read an entity's rows: saved changes first, otherwise the sample JSON file.
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

// Save an entity's rows to the browser.
function saveEntity(entity, rows) {
  localStorage.setItem(`${APP_ID}:${entity}`, JSON.stringify(rows));
}

// GET /v1/items
export async function getItems() {
  return loadEntity('items');
}

// GET /v1/items/{id} — returns null when not found (404).
export async function getItem(id) {
  const items = await loadEntity('items');
  return items.find((item) => item.id === id) || null;
}

// POST /v1/items — an example of saving a change.
// Throws an Error when required fields are missing (400).
export async function createItem(fields) {
  if (!fields.name) {
    throw new Error('Name is required.');
  }
  const items = await loadEntity('items');
  const item = { id: crypto.randomUUID(), ...fields };
  items.push(item);
  saveEntity('items', items);
  return item;
}

// Clear all saved changes and go back to the sample data.
export function resetData() {
  Object.keys(localStorage)
    .filter((key) => key.startsWith(`${APP_ID}:`))
    .forEach((key) => localStorage.removeItem(key));
}
