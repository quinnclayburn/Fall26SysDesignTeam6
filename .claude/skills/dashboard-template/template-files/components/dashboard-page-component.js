import WidgetCardComponent from './widget-card-component.js';

export default {
  name: 'dashboard-page-component',
  components: {
    'widget-card-component': WidgetCardComponent,
  },
  setup() {
    const dashboardStore = Vue.inject('dashboardStore');
    return { dashboardStore };
  },
  template: /* html */ `
    <section class="container-fluid py-4 px-3 px-md-4">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h1 class="h3 mb-0">Dashboard</h1>
        <span class="badge text-bg-light border">
          Layout driven by dashboard-layout.json
        </span>
      </div>

      <div v-if="dashboardStore.isLoading" class="alert alert-secondary" role="status">
        Loading dashboard...
      </div>

      <div v-else-if="dashboardStore.error" class="alert alert-danger" role="alert">
        {{ dashboardStore.error }}
      </div>

      <div v-else>
        <div
          v-for="row in dashboardStore.layout"
          :key="row.row"
          class="row g-3 mb-3">
          <div
            v-for="col in row.columns"
            :key="col.widget"
            class="col-12"
            :class="'col-md-' + col.span">
            <widget-card-component
              v-if="dashboardStore.widgetsById[col.widget]"
              :widget="dashboardStore.widgetsById[col.widget]" />
            <div v-else class="alert alert-warning py-2 px-3 small" role="alert">
              Unknown widget id "{{ col.widget }}". Check widgets.js and dashboard-layout.json.
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
};
