// widgets.js
//
// This file is the "widget registry" for the dashboard. Each entry describes
// one widget: which data.js function supplies its data (`source`), what kind
// of visual it renders, and which fields to use.
//
// To add a new widget:
//   1. Add a JSON file under ./data/ and a function for it in data.js
//      (or reuse an existing one).
//   2. Add an entry to the `widgets` object below with a unique id.
//   3. Reference that id in dashboard-layout.json so it appears on the grid.
//
// Supported `type` values:
//   'line'      - time-series line chart (needs x, y)
//   'bar'       - category bar chart (needs x, y)
//   'scatter'   - x/y scatterplot (needs x, y)
//   'histogram' - distribution of a single numeric field (needs field, bins)
//   'kpi'       - single big-number stat card (needs metricId)
//   'badges'    - list of status pills (no extra fields needed)

import {
  getKpiMetrics,
  getRevenueTimeseries,
  getServiceStatuses,
  getCategorySales,
  getEngagement,
  getResponseTimes,
} from './data.js';

export const widgets = {
  kpi_active_users: {
    id: 'kpi_active_users',
    title: 'Active Users',
    description: 'Total number of unique users active in the last 30 days.',
    type: 'kpi',
    source: getKpiMetrics,
    metricId: 'active_users',
  },
  kpi_total_revenue: {
    id: 'kpi_total_revenue',
    title: 'Total Revenue',
    description: 'Total revenue generated in the last 30 days.',
    type: 'kpi',
    source: getKpiMetrics,
    metricId: 'total_revenue',
  },
  kpi_conversion_rate: {
    id: 'kpi_conversion_rate',
    title: 'Conversion Rate',
    description: 'Percentage of sessions that resulted in a purchase.',
    type: 'kpi',
    source: getKpiMetrics,
    metricId: 'conversion_rate',
  },
  kpi_error_rate: {
    id: 'kpi_error_rate',
    title: 'Error Rate',
    description: 'Percentage of requests that resulted in a server error.',
    type: 'kpi',
    source: getKpiMetrics,
    metricId: 'error_rate',
  },
  revenue_trend: {
    id: 'revenue_trend',
    title: 'Revenue Trend',
    description: 'Daily revenue over the past 30 days.',
    type: 'line',
    source: getRevenueTimeseries,
    x: 'date',
    y: 'value',
  },
  status_badges: {
    id: 'status_badges',
    title: 'System Status',
    description: 'Current health status of key backend services.',
    type: 'badges',
    source: getServiceStatuses,
  },
  category_sales: {
    id: 'category_sales',
    title: 'Sales by Category',
    description: 'Total sales grouped by product category.',
    type: 'bar',
    source: getCategorySales,
    x: 'category',
    y: 'value',
  },
  engagement_scatter: {
    id: 'engagement_scatter',
    title: 'Sessions vs. Conversion',
    description:
      'Relationship between session count and conversion rate for each cohort.',
    type: 'scatter',
    source: getEngagement,
    x: 'sessions',
    y: 'conversion',
  },
  response_time_histogram: {
    id: 'response_time_histogram',
    title: 'Response Time Distribution',
    description:
      'Distribution of server response times (in milliseconds) across recent requests.',
    type: 'histogram',
    source: getResponseTimes,
    field: 'value',
    bins: 8,
  },
};

// Shared color palette so charts look consistent across the dashboard.
const COLORS = {
  line: '#0d6efd',
  bar: '#6f42c1',
  scatter: '#fd7e14',
  histogram: '#20c997',
};

/**
 * Group raw histogram values into a fixed number of equal-width buckets.
 * Returns { labels, counts } for charting.
 */
function binValues(values, bins) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const width = (max - min) / bins || 1;
  const counts = new Array(bins).fill(0);

  values.forEach((value) => {
    let index = Math.floor((value - min) / width);
    if (index >= bins) index = bins - 1;
    if (index < 0) index = 0;
    counts[index] += 1;
  });

  const labels = counts.map((_, i) => {
    const low = Math.round(min + i * width);
    const high = Math.round(min + (i + 1) * width);
    return `${low}\u2013${high}`;
  });

  return { labels, counts };
}

/**
 * Build an Apache ECharts `option` object for a chart-type widget.
 * See https://echarts.apache.org/en/api.html#echarts for the ECharts API.
 */
export function buildChartOption(widget, rows) {
  switch (widget.type) {
    case 'line': {
      return {
        tooltip: { trigger: 'axis' },
        grid: { left: 48, right: 16, top: 24, bottom: 32 },
        xAxis: {
          type: 'category',
          data: rows.map((row) => row[widget.x]),
          axisLabel: { fontSize: 10 },
        },
        yAxis: { type: 'value' },
        series: [
          {
            data: rows.map((row) => Number(row[widget.y])),
            type: 'line',
            smooth: true,
            areaStyle: { opacity: 0.12 },
            itemStyle: { color: COLORS.line },
          },
        ],
      };
    }

    case 'bar': {
      return {
        tooltip: { trigger: 'axis' },
        grid: { left: 48, right: 16, top: 24, bottom: 48 },
        xAxis: {
          type: 'category',
          data: rows.map((row) => row[widget.x]),
          axisLabel: { fontSize: 10, rotate: 15 },
        },
        yAxis: { type: 'value' },
        series: [
          {
            data: rows.map((row) => Number(row[widget.y])),
            type: 'bar',
            itemStyle: { color: COLORS.bar, borderRadius: [4, 4, 0, 0] },
          },
        ],
      };
    }

    case 'scatter': {
      return {
        tooltip: {
          trigger: 'item',
          formatter: (params) =>
            `${widget.x}: ${params.value[0]}<br/>${widget.y}: ${params.value[1]}`,
        },
        grid: { left: 56, right: 16, top: 24, bottom: 40 },
        xAxis: { type: 'value', name: widget.x },
        yAxis: { type: 'value', name: widget.y },
        series: [
          {
            data: rows.map((row) => [
              Number(row[widget.x]),
              Number(row[widget.y]),
            ]),
            type: 'scatter',
            symbolSize: 10,
            itemStyle: { color: COLORS.scatter },
          },
        ],
      };
    }

    case 'histogram': {
      const values = rows.map((row) => Number(row[widget.field]));
      const { labels, counts } = binValues(values, widget.bins || 8);
      return {
        tooltip: { trigger: 'axis' },
        grid: { left: 48, right: 16, top: 24, bottom: 56 },
        xAxis: {
          type: 'category',
          data: labels,
          name: 'ms',
          axisLabel: { fontSize: 10, rotate: 35 },
        },
        yAxis: { type: 'value', name: 'Count' },
        series: [
          {
            data: counts,
            type: 'bar',
            barWidth: '90%',
            itemStyle: { color: COLORS.histogram, borderRadius: [4, 4, 0, 0] },
          },
        ],
      };
    }

    default:
      return {};
  }
}

/**
 * Build a short, human-readable summary of a chart widget's data for
 * screen-reader users (used as the aria-label on the chart container).
 */
export function buildAriaLabel(widget, rows) {
  const count = rows.length;
  switch (widget.type) {
    case 'line':
      return `Line chart: ${widget.title}, ${count} data points.`;
    case 'bar':
      return `Bar chart: ${widget.title}, ${count} categories.`;
    case 'scatter':
      return `Scatter plot: ${widget.title}, ${count} points.`;
    case 'histogram':
      return `Histogram: ${widget.title}, based on ${count} samples.`;
    default:
      return widget.title;
  }
}

const CHART_TYPES = ['line', 'bar', 'scatter', 'histogram'];

export function isChartType(type) {
  return CHART_TYPES.includes(type);
}
