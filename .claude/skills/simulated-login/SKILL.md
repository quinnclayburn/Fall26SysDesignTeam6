---
name: simulated-login
description: Add a simulated "log in as…" picker with user roles to a collection-template or dashboard-template Vue.js web app. Use when the app needs login, users, roles, or admin-only actions and uses the template's simulated backend. Use after scaffolding with a base template skill.
version: 1.2
updated: 2026-10-01
---

# Simulated Login Skill

Add a simulated login to a scaffolded `collection-template` or `dashboard-template` app. Instead of real accounts and passwords, a "log in as…" picker in the navbar switches between sample users, and the app shows or hides features by role.

## Prerequisites

**Scaffold a base app first** with the `collection-template` or `dashboard-template` skill. This skill adds to that app; it doesn't replace anything.

## Conventions

- **Users and roles match the app's design.** Give `data/users.json` the same fields as the app's user entity, and use the roles the app's endpoints allow. Don't add a field the design doesn't have: the picker shows each user's `name`, or their `email` (or `id`) when there's no `name`.
- **The login endpoints belong in the API design.** The four functions below stand in for `GET /v1/users`, `POST /v1/login`, `POST /v1/logout`, and `GET /v1/me` (or the app's own names for them). If the app's API design doesn't list them yet, add them there before building. `GET /v1/users` exists only so the picker has users to choose from, so mark it simulated only.
- **It's a simulation, and the app says so.** The picker shows a "Simulated login" badge. Never store real passwords or real people's details in `data/users.json`.
- **When you add a real backend,** replace the login functions in `data.js` with real login calls. `session.js` and the components don't change.

## What this skill adds

- **`data/users.json`** — sample users, each with an `id`, a display `name` (replace it with the app's own user fields), and a `role`.
- **Four functions in `data.js`** — `getUsers`, `logIn`, `logOut`, and `getCurrentUser`. The logged-in user is remembered in browser storage, so it survives a reload.
- **`session.js`** — holds the current user where every component can see it, plus `hasRole(role)` for showing or hiding features.
- **`components/login-picker-component.js`** — the "log in as…" picker with the "Simulated login" badge.

## Step-by-step Modifications

### 1. Copy the new files

Copy these files from `template-files/` into the app folder, preserving the folder structure:

- `data/users.json`
- `session.js`
- `components/login-picker-component.js`

Then edit `data/users.json` so the users have the app's user fields and roles.

### 2. Add the login functions to `data.js`

Add these functions to the end of `data.js`, after the existing endpoint functions. They use the `loadEntity` helper and `APP_ID` that are already in the file.

```javascript
// ---- Simulated login ----

// GET /v1/users — everyone the "log in as…" picker can choose from.
export async function getUsers() {
  return loadEntity('users');
}

// POST /v1/login — log in as a sample user. There are no passwords: the
// login is simulated. Returns null when the user isn't found (404).
export async function logIn(userId) {
  const users = await loadEntity('users');
  const user = users.find((row) => row.id === userId) || null;
  if (user) {
    localStorage.setItem(`${APP_ID}:current-user`, user.id);
  }
  return user;
}

// POST /v1/logout
export function logOut() {
  localStorage.removeItem(`${APP_ID}:current-user`);
}

// GET /v1/me — the logged-in user, or null when nobody is logged in (401).
export async function getCurrentUser() {
  const userId = localStorage.getItem(`${APP_ID}:current-user`);
  if (!userId) {
    return null;
  }
  const users = await loadEntity('users');
  return users.find((row) => row.id === userId) || null;
}
```

`resetData()` also logs the user out, because it clears everything saved under `APP_ID`.

### 3. Modify `app.js`

**a) Add the imports** alongside the other imports at the top of the file:

```javascript
import LoginPickerComponent from './components/login-picker-component.js';
import { loadSession } from './session.js';
```

**b) Load the session** at the start of the `setup()` function inside `Vue.createApp({...})`:

```javascript
loadSession();
```

**c) Register the component** after the other `app.component(...)` calls, before `app.use(router)`:

```javascript
app.component('login-picker-component', LoginPickerComponent);
```

### 4. Modify `components/navbar-component.js`

Add the picker as the last item inside the `<div class="ms-auto d-flex gap-2">` block:

```html
<login-picker-component></login-picker-component>
```

### 5. Protect role-restricted actions

Do this for every endpoint that only some roles may call. Check the role in **two places**:

**a) In `data.js`, the endpoint refuses** the wrong role (403) — this is the rule itself:

```javascript
// POST /v1/items — admins only.
export async function createItem(fields) {
  const user = await getCurrentUser();
  if (!user || user.role !== 'admin') {
    throw new Error('Only admins can add items.');
  }
  // ...the existing code that validates and saves the item
}
```

**b) In the component, the screen hides** what the user can't do — this is only a convenience:

```javascript
import { hasRole } from '../session.js';

// in setup(), return it so the template can use it:
return { hasRole };
```

```html
<button v-if="hasRole('admin')" class="btn btn-primary">Add item</button>
```

Always do both. Hiding a button doesn't stop someone from calling the function; the check in `data.js` does.

### 6. Optional: require login for every page

If the documents say logged-out users see only a login or home page, add a route guard in `app.js`, after `router` is created. It waits for the session to load, then sends logged-out users to the home page. Add `session` to the `./session.js` import from step 3a:

```javascript
router.beforeEach(async (to) => {
  await loadSession();
  if (!session.user && to.path !== '/') {
    return '/';
  }
});
```

## File Reference

| File | Action | Purpose |
|------|--------|---------|
| `data/users.json` | **Create** | Sample users with roles |
| `session.js` | **Create** | The current user and `hasRole(role)`, shared by every component |
| `components/login-picker-component.js` | **Create** | "Log in as…" picker with the "Simulated login" badge |
| `data.js` | **Modify** | Add `getUsers`, `logIn`, `logOut`, and `getCurrentUser` |
| `app.js` | **Modify** | Import and register the picker, and load the session |
| `components/navbar-component.js` | **Modify** | Add the picker to the navbar |
| Components and `data.js` functions with restricted actions | **Modify** | Check the role in `data.js` and hide the action on screen |
