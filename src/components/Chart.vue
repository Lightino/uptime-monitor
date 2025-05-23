<template>
  <div class="animate-fade-up">
    <div ref="chart"></div>
  </div>
</template>

<script>
import ApexCharts from "apexcharts";
import _ from "lodash";
import { useEndpointStore } from "../stores/useEndpointStore";

export default {
  setup() {
    const endpointStore = useEndpointStore()

    return { endpointStore }
  },
  name: "MyChart",
  props: {
    latestResponseMs: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      chart: null,
      responseTimes: [],
      timestamps: [],
    };
  },
  mounted() {
    this.initChart();
    this.seedInitialData();
    this.updateChart(); 
  },
  watch: {
    latestResponseMs(newVal) {
      this.addNewPoint(newVal);
    },
  },
  methods: {
    initChart() {
      const options = {
        chart: {
          type: "area",
          height: 350,
          animations: {
            enabled: true,
            easing: "easeinout",
            speed: 800,
            animateGradually: { enabled: true, delay: 150 },
            dynamicAnimation: { enabled: true, speed: 350 },
          },
          toolbar: { show: false },
        },
        series: [{
          name: "Response Time (ms)",
          data: [],
        }],
        xaxis: {
          categories: [],
          labels: { rotate: -45 },
        },
        stroke: { curve: "smooth", width: 2 },
        grid: {
          strokeDashArray: 2,
          borderColor:
            "color-mix(in oklab, var(--color-base-content) 40%, transparent)",
        },
        tooltip: { enabled: true },
      };

      this.chart = new ApexCharts(this.$refs.chart, options);
      this.chart.render();
    },
    seedInitialData() {
      // const now = new Date();
      for (let i = 1; i <= this.endpointStore.endpoints[this.endpointStore.selectedEndpoint].responseTimeArray['data'].length; i++) {
        // const past = new Date(now.getTime() - i * 5 * 60 * 1000);
        this.timestamps.push(i);
        this.responseTimes = this.endpointStore.endpoints[this.endpointStore.selectedEndpoint].responseTimeArray['data'];
      }
    },
    addNewPoint(ms) {
      const now = new Date();
      this.timestamps.push(this.formatTime(now));
      this.responseTimes.push(ms);

      if (this.timestamps.length > 10) {
        this.timestamps.shift();
        this.responseTimes.shift();
      }

      this.updateChart();
    },
    updateChart() {
      this.chart.updateOptions({
        xaxis: {
          categories: this.timestamps,
        },
      });

      this.chart.updateSeries([{
        name: "Response Time (ms)",
        data: this.responseTimes,
      }]);
    },
    formatTime(date) {
      return `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
    },
    randomMs() {
      return Math.floor(Math.random() * 500 + 50); 
    },
  },
  beforeUnmount() {
    if (this.chart) {
      this.chart.destroy();
    }
  },
};
</script>
