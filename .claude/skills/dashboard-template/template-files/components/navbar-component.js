export default {
  name: 'navbar-component',
  template: /* html */ `
    <nav class="navbar sticky-top bg-white border-bottom px-3">
      <span class="navbar-brand mb-0 h1">
        <i class="bi bi-grid-1x2-fill me-2"></i>Dashboard Starter
      </span>

      <div class="ms-auto d-flex gap-2">
        <router-link class="btn btn-outline-primary btn-sm" to="/">
          <i class="bi bi-speedometer2 me-1"></i>Dashboard
        </router-link>
        <router-link class="btn btn-outline-primary btn-sm" to="/about">
          <i class="bi bi-info-circle me-1"></i>About
        </router-link>
      </div>
    </nav>
  `,
};
