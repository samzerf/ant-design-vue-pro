<template>
  <div>
    <Chart :option="chartOption" style="height: 400px" />
  </div>
</template>

<script>
import Chart from "../../components/Chart";
import axios from "axios";
export default {
  components: {
    Chart,
  },
  mounted() {
    this.getChartData();
    // this.timer = setInterval(() => {
    //   this.chartOption.series[0].data = this.chartOption.series[0].data.map(
    //     () => Math.floor(Math.random() * 10)
    //   );
    //   this.chartOption = { ...this.chartOption };
    // }, 3000);
  },
  beforeDestroy() {
    // clearInterval(this.timer);
  },
  data() {
    return {
      chartOption: {},
    };
  },
  methods: {
    getChartData() {
      axios
        .get("/api/dashboard/chart", {
          params: { id: 12345 },
        })
        .then((res) => {
          this.chartOption = {
            title: {
              text: "ECharts 入门示例",
            },
            tooltip: {},
            legend: {
              data: ["销量"],
            },
            xAxis: {
              data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
            },
            yAxis: {},
            series: [
              {
                name: "销量",
                type: "bar",
                data: res.data,
              },
            ],
          };
        });
    },
  },
};
</script>
