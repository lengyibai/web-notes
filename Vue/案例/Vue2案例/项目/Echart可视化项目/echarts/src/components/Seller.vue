<template>
  <div class="Seller">
    <div class="com-chart" ref="sellerRef"></div>
  </div>
</template>
<script>
export default {
  name: "Seller",
  data() {
    return {
      chartInstance: null, //图表方法
      allData: null, //图表数据
      currentPage: 1, //当前显示的页数
      totalPage: 0, //总页数
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
      this.chartInstance = this.$echarts.init(this.$refs.sellerRef, "chalk");

      //初始化样式
      const initOptions = {
        title: {
          text: "商家销售统计",
          textStyle: {
            fontSize: 66,
          },
          left: 20,
          top: 20,
        },
        grid: {
          left: "5%",
          right: "5%",
          top: "20%",
          bottom: "5%",
          containLabel: true, //包含坐标轴文字边距
        },
        xAxis: {
          type: "value",
        },
        yAxis: {
          type: "category",
        },
        /* 悬浮显示背景色 */
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "line",
            z: 0, //层级
            lineStyle: {
              width: 66,
              color: "#2D3443",
            },
          },
        },
        series: [
          {
            type: "bar",
            barWidth: 66, //厚度
            /* 是否在柱状图内显示文字 */
            label: {
              show: true,
              position: "right",
              textStyle: {
                color: "#ccc",
                fontSize: 20,
              },
            },
            itemStyle: {
              barBorderRadius: [0, 33, 33, 0],
              /* 内置渐变器，0，0代表左上，0,1代表右上，1，0代表左下，1,1代表右下，0,0,1,0则代表从左到右 */
              color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 1, [
                {
                  offset: 0,
                  color: "#5052EE",
                },
                {
                  offset: 1,
                  color: "#AB6EE5",
                },
              ]),
            },
          },
        ],
      };
      this.chartInstance.setOption(initOptions);

      // 鼠标移入移出控制自动切换
      this.chartInstance.on("mouseover", () => {
        clearInterval(this.timer);
      });
      this.chartInstance.on("mouseout", () => {
        this.startInterval();
      });
    },
    //#####··········获取数据··········#####//
    async getData() {
      const { data } = await this.$axios.get("/seller");

      //对数据进行从小到大排序
      this.allData = data.sort((a, b) => {
        return a.value - b.value;
      });

      // 每五个元素显示一页
      this.totalPage = Math.ceil(this.allData.length / 5);
      this.updateChart();
      this.startInterval();
    },
    //#####··········通过页数更新图表··········#####//
    updateChart() {
      //通过当前页来截取要显示的数据
      const start = (this.currentPage - 1) * 5;
      const end = this.currentPage * 5;
      const showData = this.allData.slice(start, end);

      //用于显示Y轴名称
      const sellerNames = showData.map((item) => {
        return item.name;
      });

      // 用于显示X轴数据
      const sellerValues = showData.map((item) => {
        return item.value;
      });

      // 将样式拆分到初始化方法，只保留数据更新在更新方法处
      const dataPption = {
        yAxis: {
          data: sellerNames,
        },
        series: [
          {
            data: sellerValues,
          },
        ],
      };

      this.chartInstance.setOption(dataPption);
    },
    //#####··········计时器切换页··········#####//
    startInterval() {
      if (this.timer) {
        clearInterval(this.timer);
      }
      this.timer = setInterval(() => {
        this.currentPage++;
        if (this.currentPage > this.totalPage) {
          this.currentPage = 1;
        }
        this.updateChart();
      }, 1000);
    },
    //#####··········屏幕适配··········#####//
    screenAdapter() {
      const titleFontSize = (this.$refs.sellerRef.offsetWidth / 100) * 3.6;
      const adapterOptions = {
        title: {
          textStyle: {
            fontSize: titleFontSize,
          },
        },
        /* 悬浮显示背景色 */
        tooltip: {
          axisPointer: {
            z: 0, //层级
            lineStyle: {
              width: titleFontSize,
              color: "#2D3443",
            },
          },
        },
        series: [
          {
            barWidth: titleFontSize, //厚度
            /* 是否在柱状图内显示文字 */
            label: {
              textStyle: {
                fontSize: titleFontSize / 2,
              },
            },
            itemStyle: {
              barBorderRadius: [0, titleFontSize / 2, titleFontSize / 2, 0],
            },
          },
        ],
      };
      this.chartInstance.setOption(adapterOptions);
      //手动调用 echarts 的resize 方法
      this.chartInstance.resize();
    },
  },
};
</script>
<style scoped lang="less">
.Seller {
  width: 100%;
  height: 100%;
  .com-chart {
    width: 100%;
    height: 100%;
  }
}
</style>
