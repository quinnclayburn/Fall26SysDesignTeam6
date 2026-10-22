// Renders the two non-chart widget types: a single big-number "kpi" stat,
// or a list of status "badges" pills.
export default {
  name: 'stat-card-component',
  props: {
    widget: {
      type: Object,
      required: true,
    },
    size: {
      type: String,
      default: 'normal', // 'normal' | 'large' (used on the detail page)
    },
  },
  setup(props) {
    const formattedValue = Vue.computed(() => {
      const kpi = props.widget.kpi;
      if (!kpi) return '';
      if (kpi.unit === '$') {
        return `$${Number(kpi.value).toLocaleString()}`;
      }
      if (kpi.unit === '%') {
        return `${kpi.value}%`;
      }
      return Number(kpi.value).toLocaleString();
    });

    const trendIsUp = Vue.computed(() => (props.widget.kpi?.trend ?? 0) >= 0);

    const statusBadgeClass = (status) => {
      if (status === 'ok') return 'text-bg-success';
      if (status === 'warning') return 'text-bg-warning';
      if (status === 'error') return 'text-bg-danger';
      return 'text-bg-secondary';
    };

    return { formattedValue, trendIsUp, statusBadgeClass };
  },
  template: /* html */ `
    <div v-if="widget.type === 'kpi' && widget.kpi" class="stat-card" :class="{ 'stat-card-lg': size === 'large' }">
      <div class="stat-value" :class="size === 'large' ? 'display-5' : 'h2'">{{ formattedValue }}</div>
      <div
        class="stat-trend small"
        :class="trendIsUp ? 'text-success' : 'text-danger'"
        :aria-label="(trendIsUp ? 'Up' : 'Down') + ' ' + Math.abs(widget.kpi.trend) + ' percent vs previous period'">
        <i class="bi" :class="trendIsUp ? 'bi-arrow-up-short' : 'bi-arrow-down-short'"></i>
        {{ Math.abs(widget.kpi.trend) }}% vs previous period
      </div>
    </div>

    <div v-else-if="widget.type === 'badges'" class="d-flex flex-wrap gap-2" role="list">
      <span
        v-for="badge in widget.badges"
        :key="badge.label"
        role="listitem"
        class="badge rounded-pill"
        :class="statusBadgeClass(badge.status)">
        <i class="bi bi-circle-fill me-1 small"></i>{{ badge.label }}
      </span>
    </div>

    <p v-else class="text-muted mb-0">No data available.</p>
  `,
};
