export default {
  name: 'about-page-component',
  template: /* html */ `
    <section class="container py-4">
      <h1 class="h3 mb-3">About this template</h1>
      <p class="text-muted">
        This is a minimal, front-end-only dashboard starter built with Vue 3,
        Bootstrap 5, and <a href="https://echarts.apache.org/" target="_blank" rel="noopener">Apache ECharts</a>.
        It has no build step &mdash; every file is loaded directly by the browser.
      </p>

      <h2 class="h5 mt-4">How the layout works</h2>
      <p>
        The grid you see on the <router-link to="/">Dashboard</router-link> page is
        driven entirely by <code>dashboard-layout.json</code>. It describes rows and,
        within each row, columns with a Bootstrap-style <code>span</code> (out of 12)
        and a <code>widget</code> id:
      </p>
      <pre class="bg-light border rounded p-3 small"><code>{
  "layout": [
    { "row": 1, "columns": [
      { "span": 6, "widget": "revenue_trend" },
      { "span": 6, "widget": "status_badges" }
    ]}
  ]
}</code></pre>

      <h2 class="h5 mt-4">How widgets work</h2>
      <p>
        Each widget id in the layout must match an entry in <code>widgets.js</code>.
        That file is a small registry describing where a widget's data comes from
        (a function in <code>data.js</code>, which reads a JSON file in <code>data/</code>)
        and how to chart it (line, bar, scatter, histogram, kpi, or badges).
      </p>

      <h2 class="h5 mt-4">Adding a new widget</h2>
      <ol>
        <li>Add a JSON file under <code>data/</code> and a function for it in <code>data.js</code>.</li>
        <li>Add an entry to <code>widgets.js</code> with a unique id, title, description, type, <code>source</code> function, and field names.</li>
        <li>Reference that id from <code>dashboard-layout.json</code> so it shows up on the grid.</li>
      </ol>
      <p>
        Every widget automatically gets a detail page at <code>#/widget/&lt;id&gt;</code>
        with a larger chart and an accessible data table.
      </p>

      <h2 class="h5 mt-4">Going further</h2>
      <p class="mb-0">
        Because every widget gets its data through <code>data.js</code>, the functions
        there can be swapped for calls to a real API or database without changing how
        the layout or widgets are structured.
      </p>
    </section>
  `,
};
