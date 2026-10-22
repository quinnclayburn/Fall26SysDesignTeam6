// A thin, reusable wrapper around an Apache ECharts instance.
// See https://echarts.apache.org/en/api.html#echarts for the underlying API.
export default {
  name: 'echart-component',
  props: {
    option: {
      type: Object,
      required: true,
    },
    ariaLabel: {
      type: String,
      default: 'Chart',
    },
    height: {
      type: String,
      default: '260px',
    },
  },
  setup(props) {
    const hostRef = Vue.ref(null);
    let chart = null;

    const handleResize = () => {
      if (chart) {
        chart.resize();
      }
    };

    Vue.onMounted(() => {
      chart = echarts.init(hostRef.value);
      chart.setOption(props.option);
      window.addEventListener('resize', handleResize);
    });

    Vue.watch(
      () => props.option,
      (newOption) => {
        if (chart) {
          chart.setOption(newOption, true);
        }
      },
      { deep: true },
    );

    Vue.onBeforeUnmount(() => {
      window.removeEventListener('resize', handleResize);
      if (chart) {
        chart.dispose();
        chart = null;
      }
    });

    return { hostRef };
  },
  template: /* html */ `
    <div
      ref="hostRef"
      class="echart-host"
      role="img"
      :aria-label="ariaLabel"
      :style="{ height: height }">
    </div>
  `,
};
