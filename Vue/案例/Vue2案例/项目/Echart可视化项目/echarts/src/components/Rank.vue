<template>
  <div class="Rank">
    <div class="com-chart" ref="rankRef"></div>
  </div>
</template>
<script>
export default {
  name: "Rank",
  data() {
    return {
      chartInstance: null, //图表方法
      allData: null, //图表数据
      startValue: 0, //区域缩放起点值
      endValue: 9, //区域缩放终点至
      timer: null,
    };
  },
  mounted() {
    this.initChart();
    this.getData();

    /* 自适应 */
    window.addEventListener("resize", this.screenAdapter);
    this.screenAdapter();
  },
  beforeDestroy() {
    clearInterval(this.timer);
    window.removeEventListener("resize", this.screenAdapter);
  },
  methods: {
    //#####··········初始化图标··········#####//
    initChart() {
      this.chartInstance = this.$echarts.init(this.$refs.rankRef, "chalk");

      //初始化样式
      const initOptions = {
        title: {
          text: "地区销售排行",
          left: 20,
          top: 20,
        },
        grid: {
          top: "40%",
          left: "5%",
          right: "5%",
          bottom: "5%",
          containLabel: true,
        },
        tooltip: {
          show: true,
        },
        xAxis: {
          type: "category",
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            type: "bar",
          },
        ],
      };
      this.chartInstance.setOption(initOptions);
      this.chartInstance.on("mouseover", () => {
        clearInterval(this.timer);
      });
      this.chartInstance.on("mouseout", () => {
        this.startInterval();
      });
    },
    //#####··········获取数据··········#####//
    async getData() {
      const { data } = await this.$axios.get("/rank");
      this.allData = data.sort((a, b) => b.value - a.value);
      this.updateChart();
      this.startInterval();
    },
    //#####··········通过页数更新图表··········#####//
    updateChart() {
      const colorArr = [
        ["#0ba82c", "#4ff778"],
        ["#2e72bf", "#23e5e5"],
        ["#5052ee", "#ab6ee5"],
      ];
      //所有省份形成的数组
      const provinceArr = this.allData.map((item) => {
        return item.name;
      });
      //所有省份的值
      const valueArr = this.allData.map((item) => {
        return item.value;
      });
      const dataPption = {
        xAxis: {
          data: provinceArr,
        },
        dataZoom: {
          show: false,
          startValue: this.startValue,
          endValue: this.endValue,
        },
        series: [
          {
            data: valueArr,
            itemStyle: {
              color: (arg) => {
                let targetColorArr = null;
                if (arg.value > 300) {
                  targetColorArr = colorArr[0];
                } else if (arg.value > 200) {
                  targetColorArr = colorArr[1];
                } else {
                  targetColorArr = colorArr[2];
                }
                return new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: targetColorArr[0],
                  },
                  {
                    offset: 1,
                    color: targetColorArr[1],
                  },
                ]);
              },
            },
          },
        ],
      };
      this.chartInstance.setOption(dataPption);
    },
    //#####··········屏幕适配··········#####//
    screenAdapter() {
      const titleFontSize = (this.$refs.rankRef.offsetWidth / 100) * 3.6;
      const adapterOption = {
        title: {
          textStyle: {
            fontSize: titleFontSize,
          },
        },
        series: [
          {
            // 柱的宽度
            barWidth: titleFontSize,
            // 实现柱顶部半圆形效果
            itemStyle: {
              barBorderRadius: [
                // 左上角
                titleFontSize / 2,
                // 右上角
                titleFontSize / 2,
                0,
                0,
              ],
            },
          },
        ],
      };
      this.chartInstance.setOption(adapterOption);
      this.chartInstance.resize();
    },

    //#####··········开始播放动画··········#####//
    startInterval() {
      this.timer && clearInterval(this.timer);
      this.timer = setInterval(() => {
        this.startValue++, this.endValue++;
        if (this.endValue > this.allData.length - 1) {
          this.startValue = 0;
          this.endValue = 9;
        }
        this.updateChart();
      }, 500);
    },
  },
};
</script>
<style scoped lang="less">
.Rank {
  width: 100%;
  height: 100%;
  .com-chart {
    width: 100%;
    height: 100%;
  }
}
</style>
