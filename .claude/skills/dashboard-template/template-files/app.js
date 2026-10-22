import NavbarComponent from './components/navbar-component.js';
import DashboardPageComponent from './components/dashboard-page-component.js';
import WidgetDetailPageComponent from './components/widget-detail-page-component.js';
import AboutPageComponent from './components/about-page-component.js';
import {
  widgets,
  buildChartOption,
  buildAriaLabel,
  isChartType,
} from './widgets.js';

const routes = [
  {
    path: '/',
    component: DashboardPageComponent,
  },
  {
    path: '/widget/:id',
    component: WidgetDetailPageComponent,
  },
  {
    path: '/about',
    component: AboutPageComponent,
  },
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes,
});

/**
 * Turn a widget definition + its data rows into the fully resolved
 * object the components need for rendering (chart option, kpi value, etc.).
 */
function resolveWidget(widget, rows) {
  const resolved = { ...widget, rows };

  if (isChartType(widget.type)) {
    resolved.chartOption = buildChartOption(widget, rows);
    resolved.ariaLabel = buildAriaLabel(widget, rows);
  } else if (widget.type === 'kpi') {
    const metricRow = rows.find((row) => row.id === widget.metricId);
    resolved.kpi = metricRow
      ? {
          value: metricRow.value,
          unit: metricRow.unit || '',
          trend: Number(metricRow.trend),
        }
      : null;
  } else if (widget.type === 'badges') {
    resolved.badges = rows.map((row) => ({
      label: row.label,
      status: row.status,
    }));
  }

  return resolved;
}

const app = Vue.createApp({
  setup() {
    const dashboardStore = Vue.reactive({
      layout: [],
      widgetsById: {},
      isLoading: true,
      error: '',
    });

    // The layout is app configuration, not data, so it's read directly.
    // Widget data always comes through data.js (see widgets.js).
    fetch('dashboard-layout.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Could not load dashboard-layout.json');
        }
        return response.json();
      })
      .then(async (spec) => {
        dashboardStore.layout = spec.layout || [];

        // Collect the widget ids referenced anywhere in the layout.
        const widgetIds = dashboardStore.layout.flatMap((row) =>
          row.columns.map((col) => col.widget),
        );

        // Call each data.js function only once, even if several widgets share it.
        const sourceCache = new Map();
        const getSourceRows = (source) => {
          if (!sourceCache.has(source)) {
            sourceCache.set(source, source());
          }
          return sourceCache.get(source);
        };

        await Promise.all(
          widgetIds.map(async (id) => {
            const widget = widgets[id];
            if (!widget) {
              return;
            }
            try {
              const rows = await getSourceRows(widget.source);
              dashboardStore.widgetsById[id] = resolveWidget(widget, rows);
            } catch (error) {
              dashboardStore.widgetsById[id] = {
                ...widget,
                error: 'This widget could not load its data.',
              };
            }
          }),
        );

        dashboardStore.isLoading = false;
      })
      .catch(() => {
        dashboardStore.error =
          'There was a problem loading the dashboard layout.';
        dashboardStore.isLoading = false;
      });

    Vue.provide('dashboardStore', dashboardStore);

    return {};
  },
});

app.component('navbar-component', NavbarComponent);

app.use(router);
app.mount('#app');
