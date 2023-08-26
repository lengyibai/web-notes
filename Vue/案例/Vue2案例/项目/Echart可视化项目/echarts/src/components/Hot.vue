<template>
  <div class="Seller">
    <div class="com-chart" ref="sellerRef"></div>
    <span
      class="iconfont arrow-left"
      :style="{
        fontSize: titleFontSize + 'px',
      }"
      @click="toLeft"
      >&#xe6ef;</span
    >
    <span
      class="iconfont arrow-right"
      :style="{
        fontSize: titleFontSize + 'px',
      }"
      @click="toRight"
      >&#xe6ed;</span
    >
    <span
      class="title"
      :style="{
        fontSize: titleFontSize + 'px',
      }"
      >{{ catName }}</span
    >
  </div>
</template>
<script>
export default {
  name: "Seller",
  data() {
    return {
      chartInstance: null, //图表方法
      allData: null, //图表数据
      currentIndex: 0, //当前所展示出的一级分类数据
      titleFontSize: 0,
    };
  },
  computed: {
    catName() {
      if (!this.allData) {
        return "";
      } else {
        return this.allData[this.currentIndex].name;
      }
    },
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
          text: "热销商品的占比",
          left: "2.5%",
          top: "2.5%",
        },
        tooltip: {
          show: true,
          formatter: (arg) => {
            let total = 0;
            const thirdCatory = arg.data.children;
            thirdCatory.forEach((item) => {
              total += item.value;
            });
            let retStr = "";
            thirdCatory.forEach((item) => {
              retStr += `
                ${item.name}:${parseInt((item.value / total) * 100)}%
                <br />
              `;
            });
            return retStr;
          },
        },
        legend: {
          top: "15%",
          icon: "circle",
        },
        series: {
          type: "pie",
          label: {
            show: false,
          },
          emphasis: {
            label: {
              show: true,
            },
          },
        },
      };
      this.chartInstance.setOption(initOptions);
    },
    //#####··········获取数据··········#####//
    async getData() {
      const { data } = await this.$axios.get("/hotproduct");
      this.allData = data;
      this.updateChart();
    },
    //#####··········通过页数更新图表··········#####//
    updateChart() {
      const legendData = this.allData[this.currentIndex].children.map(
        (item) => {
          return item.name;
        }
      );
      const seriesData = this.allData[this.currentIndex].children.map(
        (item) => {
          return {
            name: item.name,
            value: item.value,
            children: item.children,
          };
        }
      );
      // 将样式拆分到初始化方法，只保留数据更新在更新方法处
      const dataPption = {
        legend: {
          data: legendData,
        },
        series: {
          data: seriesData,
        },
      };
      this.chartInstance.setOption(dataPption);
    },
    //#####··········屏幕适配··········#####//
    screenAdapter() {
      const titleFontSize = (this.titleFontSize =
        (this.$refs.sellerRef.offsetWidth / 100) * 3.6);
      const adapterOptions = {
        title: {
          textStyle: {
            fontSize: titleFontSize,
          },
        },
        legend: {
          itemWidth: titleFontSize / 2,
          itemHeight: titleFontSize / 2,
          itemGap: titleFontSize / 2,
          textStyle: {
            fontSize: titleFontSize / 2,
          },
        },
        series: {
          radius: titleFontSize * 4.5,
          center: ["50%", "60%"],
        },
      };
      this.chartInstance.setOption(adapterOptions);
      //手动调用 echarts 的resize 方法
      this.chartInstance.resize();
    },

    //#####··········图表切换··········#####//
    toLeft() {
      this.currentIndex--;
      if (this.currentIndex < 0) {
        this.currentIndex = this.allData.length - 1;
      }
      this.updateChart();
    },
    toRight() {
      this.currentIndex++;
      if (this.currentIndex > this.allData.length - 1) {
        this.currentIndex = 0;
      }
      this.updateChart();
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
