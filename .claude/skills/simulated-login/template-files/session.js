// session.js — who is "logged in" right now.
//
// The simulated login keeps the current user here so any component can
// show or hide things by role. All reading and saving still goes through
// data.js; this file only keeps the result where every component can see it.

import { getUsers, getCurrentUser, logIn, logOut } from './data.js';

export const session = Vue.reactive({
  user: null, // the logged-in user, or null when logged out
  users: [], // everyone the "log in as…" picker can choose from
  isLoading: true,
  error: '',
});

// Load the user list and whoever was logged in before the last reload.
// Safe to call more than once: every call waits for the same first load.
let loading = null;
export function loadSession() {
  if (!loading) {
    loading = (async () => {
      try {
        session.users = await getUsers();
        session.user = await getCurrentUser();
      } catch (error) {
        session.error = 'Could not load users.';
      } finally {
        session.isLoading = false;
      }
    })();
  }
  return loading;
}

// Log in as another user, or log out when userId is empty.
export async function switchUser(userId) {
  if (!userId) {
    logOut();
    session.user = null;
    return;
  }
  session.user = await logIn(userId);
}

// True when the logged-in user has the given role, e.g. hasRole('admin').
export function hasRole(role) {
  return Boolean(session.user && session.user.role === role);
}
