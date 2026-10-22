import EchartComponent from './echart-component.js';
import StatCardComponent from './stat-card-component.js';

// Shared "card" chrome used both on the dashboard grid and could be reused
// elsewhere. It decides whether to render a chart or a stat card based on
// the widget's `type`, and links to the widget's detail page.
export default {
  name: 'widget-card-component',
  components: {
    'echart-component': EchartComponent,
    'stat-card-component': StatCardComponent,
  },
  props: {
    widget: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const isChart = Vue.computed(() =>
      ['line', 'bar', 'scatter', 'histogram'].includes(props.widget.type),
    );
    const statAlignClass = Vue.computed(() =>
      props.widget.type === 'badges'
        ? 'align-items-start'
        : 'align-items-center',
    );
    return { isChart, statAlignClass };
  },
  template: /* html */ `
    <article class="card h-100 shadow-sm border-0 widget-card">
      <div class="card-body d-flex flex-column">
        <div class="d-flex justify-content-between align-items-start mb-2">
          <h2 class="h6 card-title mb-0">{{ widget.title }}</h2>
          <router-link
            :to="'/widget/' + widget.id"
            class="widget-detail-link small text-decoration-none flex-shrink-0"
            :aria-label="'View details for ' + widget.title">
            Details <i class="bi bi-arrow-right-short"></i>
          </router-link>
        </div>

        <div v-if="widget.error" class="alert alert-danger py-2 px-3 small mb-0" role="alert">
          {{ widget.error }}
        </div>

        <div v-else-if="isChart" class="flex-grow-1">
          <echart-component
            :option="widget.chartOption"
            :aria-label="widget.ariaLabel"
            height="240px" />
        </div>

        <div v-else class="flex-grow-1 d-flex" :class="statAlignClass">
          <stat-card-component :widget="widget" />
        </div>
      </div>
    </article>
  `,
};
