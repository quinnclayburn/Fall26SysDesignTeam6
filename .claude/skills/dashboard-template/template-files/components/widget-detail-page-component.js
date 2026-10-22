import EchartComponent from './echart-component.js';
import StatCardComponent from './stat-card-component.js';

export default {
  name: 'widget-detail-page-component',
  components: {
    'echart-component': EchartComponent,
    'stat-card-component': StatCardComponent,
  },
  setup() {
    const dashboardStore = Vue.inject('dashboardStore');
    const route = VueRouter.useRoute();

    const widget = Vue.computed(
      () => dashboardStore.widgetsById[route.params.id],
    );

    const isChart = Vue.computed(() =>
      widget.value
        ? ['line', 'bar', 'scatter', 'histogram'].includes(widget.value.type)
        : false,
    );

    const tableHeaders = Vue.computed(() => {
      if (
        !widget.value ||
        !widget.value.rows ||
        widget.value.rows.length === 0
      ) {
        return [];
      }
      return Object.keys(widget.value.rows[0]);
    });

    return { dashboardStore, widget, isChart, tableHeaders };
  },
  template: /* html */ `
    <section class="container py-4">
      <router-link to="/" class="btn btn-link ps-0 mb-3">
        <i class="bi bi-arrow-left me-1"></i>Back to dashboard
      </router-link>

      <div v-if="dashboardStore.isLoading" class="alert alert-secondary" role="status">
        Loading widget...
      </div>

      <div v-else-if="!widget" class="alert alert-warning" role="alert">
        Widget not found.
      </div>

      <div v-else-if="widget.error" class="alert alert-danger" role="alert">
        {{ widget.error }}
      </div>

      <article v-else>
        <h1 class="h3 mb-1">{{ widget.title }}</h1>
        <p class="text-muted">{{ widget.description }}</p>

        <div class="card shadow-sm border-0 mb-4">
          <div class="card-body">
            <echart-component
              v-if="isChart"
              :option="widget.chartOption"
              :aria-label="widget.ariaLabel"
              height="420px" />
            <stat-card-component v-else :widget="widget" size="large" />
          </div>
        </div>

        <div v-if="isChart && widget.rows && widget.rows.length">
          <h2 class="h6">Underlying data</h2>
          <p class="small text-muted">
            An accessible table view of the data behind this chart, for screen readers
            or anyone who prefers numbers to pictures.
          </p>
          <div class="table-responsive">
            <table class="table table-sm table-striped">
              <caption class="visually-hidden">{{ widget.title }} data</caption>
              <thead>
                <tr>
                  <th v-for="header in tableHeaders" :key="header" scope="col">{{ header }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row, index) in widget.rows" :key="index">
                  <td v-for="header in tableHeaders" :key="header">{{ row[header] }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </article>
    </section>
  `,
};
