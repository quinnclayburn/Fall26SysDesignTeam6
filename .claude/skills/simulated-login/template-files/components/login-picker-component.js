import { session, switchUser } from '../session.js';

export default {
  name: 'login-picker-component',
  setup() {
    const onChange = (event) => switchUser(event.target.value);

    return {
      session,
      onChange,
    };
  },
  template: /* html */ `
    <div class="d-flex align-items-center gap-2">
      <span
        class="badge text-bg-warning"
        title="Login is simulated for this build: no real accounts or passwords.">
        Simulated login
      </span>
      <label class="visually-hidden" for="login-picker">Log in as</label>
      <select
        id="login-picker"
        class="form-select form-select-sm w-auto"
        :value="session.user ? session.user.id : ''"
        :disabled="session.isLoading"
        @change="onChange">
        <option value="">Logged out</option>
        <option v-for="user in session.users" :key="user.id" :value="user.id">
          {{ user.name || user.email || user.id }} ({{ user.role }})
        </option>
      </select>
    </div>
  `,
};
