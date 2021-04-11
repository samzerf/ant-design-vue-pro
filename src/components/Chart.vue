<template>
  <div ref="chart"></div>
</template>

<script>
import * as echarts from "echarts";
import debounce from "lodash/debounce";
import { addListener, removeListener } from "resize-detector";
export default {
  props: {
    option: {
      type: Object,
      default: () => {},
    },
  },
  watch: {
    option(val) {
      this.chart.setOption(val);
    },
  },
  created() {
    this.resize = debounce(this.resize, 300);
  },
  mounted() {
    this.renderChart();
    addListener(this.$refs.chart, this.resize);
  },
  beforeDestroy() {
    removeListener(this.$refs.chart, this.resize);
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    renderChart() {
      this.chart = echarts.init(this.$refs.chart);
      this.chart.setOption(this.option);
    },
    resize() {
      this.chart.resize();
    },
  },
};
</script>
