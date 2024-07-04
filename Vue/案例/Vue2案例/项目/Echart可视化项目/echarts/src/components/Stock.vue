<template>
  <div class="Stock">
    <div class="com-chart" ref="stockRef"></div>
  </div>
</template>
<script>
export default {
  name: "Stock",
  data() {
    return {
      chartInstance: null, //图表方法
      allData: null, //图表数据
      titleFontSize: 0,
      currentIndex: 0,
      timer: null,
    };
  },
  mounted() {
    this.initChart();
    this.getData();
    this.screenAdapter();

    /* 自适应 */
    window.addEventListener("resize", this.screenAdapter);
  },
  beforeDestroy() {
    clearInterval(this.timer);
    window.removeEventListener("resize", this.screenAdapter);
  },
  methods: {
    //#####··········初始化图标··········#####//
    initChart() {
      this.chartInstance = this.$echarts.init(this.$refs.stockRef, "chalk");

      //初始化样式
      const initOptions = {
        title: {
          text: "库存和销量分析",
          left: "2.5%",
          top: "2.5%",
        },
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
      const { data } = await this.$axios.get("/stock");
      this.allData = data;
      this.updateChart();
    },
    //#####··········通过页数更新图表··········#####//
    updateChart() {
      const centerArr = [
        ["18%", "40%"],
        ["50%", "40%"],
        ["82%", "40%"],
        ["34%", "75%"],
        ["66%", "75%"],
      ];
      const colorArr = [
        ["#4FF778", "#0BA82C"],
        ["#E5DD45", "#E8B11C"],
        ["#E8821C", "#E55445"],
        ["#5052EE", "#AB6EE5"],
        ["#23E5E5", "#2E72BF"],
      ];
      const start = this.currentIndex * 5;
      const end = (this.currentIndex + 1) * 5;
      const showData = this.allData.slice(start, end);
      const seriesArr = showData.map((item, index) => {
        return {
          type: "pie",
          center: centerArr[index],
          hoverAnimation: false, //关闭鼠标移入饼图动画效果
          labelLine: {
            show: false, // 隐藏指示线
          },
          label: {
            position: "center",
            color: colorArr[index][0],
          },
          data: [
            {
              name: item.name + "\n" + item.sales,
              value: item.sales,
              itemStyle: {
                color: new this.$echarts.graphic.LinearGradient(0, 1, 0, 0, [
                  {
                    offset: 0,
                    color: colorArr[index][0],
                  },
                  {
                    offset: 1,
                    color: colorArr[index][1],
                  },
                ]),
              },
            },
            {
              name: item.name + "\n" + item.sales,
              value: item.stock,
              itemStyle: {
                color: "#333843",
              },
            },
          ],
        };
      });
      // 将样式拆分到初始化方法，只保留数据更新在更新方法处
      const dataPption = {
        series: seriesArr,
      };
      this.chartInstance.setOption(dataPption);
      this.startInterval();
    },
    //#####··········屏幕适配··········#####//
    screenAdapter() {
      const titleFontSize = (this.titleFontSize =
        (this.$refs.stockRef.offsetWidth / 100) * 3.6);
      const innerRadius = titleFontSize * 2.5;
      const outterRadius = innerRadius * 1.125;
      const adapterOptions = {
        title: {
          textStyle: {
            fontSize: titleFontSize,
          },
        },
        series: [],
      };

      for (let i = 0; i < 5; i++) {
        adapterOptions.series.push(
          {
            type: "pie",
            radius: [outterRadius, innerRadius],
            label: {
              fontSize: titleFontSize / 1.5,
            },
          },
          {
            type: "pie",
            radius: [outterRadius, innerRadius],
            label: {
              fontSize: titleFontSize / 1.5,
            },
          }
        );
      }

      this.chartInstance.setOption(adapterOptions);
      //手动调用 echarts 的resize 方法
      this.chartInstance.resize();
    },
    //#####··········计时器切换··········#####//
    startInterval() {
      if (this.timer) {
        clearInterval(this.timer);
      }
      this.timer = setInterval(() => {
        this.currentIndex++;
        if (this.currentIndex > 1) {
          this.currentIndex = 0;
        }
        this.updateChart();
      }, 1000);
    },
  },
};
</script>
<style scoped lang="less">
.Stock {
  width: 100%;
  height: 100%;
  .com-chart {
    width: 100%;
    height: 100%;
  }
  .arrow-left,
  .arrow-right {
    position: absolute;
    left: 5%;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    z-index: 1;
    font-size: 100px;
    color: #fff;
  }
  .arrow-right {
    left: initial;
    right: 5%;
  }
  .title {
    position: absolute;
    right: 5%;
    bottom: 5%;
    font-size: 50px;
    color: #fff;
  }
}
</style>
