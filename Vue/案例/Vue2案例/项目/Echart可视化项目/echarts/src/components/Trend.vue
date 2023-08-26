<template>
  <div class="Seller">
    <div class="title" @click="showChoice = !showChoice">
      <span>{{ showTitle }}</span>
      <span class="iconfont title-icon">&#xe6eb;</span>
      <div class="select-con" v-show="showChoice">
        <div
          class="select-item"
          @click="handleSelect(item.key)"
          v-for="item in selectType"
          :key="item.key"
        >
          {{ item.text }}
        </div>
      </div>
    </div>
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
      showChoice: false, //是否显示可选项
      choiceType: "map", //显示数据类型
    };
  },
  computed: {
    selectType() {
      if (!this.allData) {
        return [];
      } else {
        return this.allData.type.filter((item) => {
          return item.key !== this.choiceType;
        });
      }
    },
    showTitle() {
      if (!this.allData) {
        return "";
      } else {
        return this.allData[this.choiceType].title;
      }
    },
  },
  created() {
    this.$socket.registerCallBack("trendData", this.getData);
  },
  mounted() {
    this.initChart();
    this.$socket.send({
      action: "getData",
      socketType: "trendData",
      chartName: "trend",
      value: "",
    });

    /* 自适应 */
    window.addEventListener("resize", this.screenAdapter);
    this.screenAdapter();
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.screenAdapter);
    this.$socket.unrRegisterCallBack("trendData");
  },
  methods: {
    //#####··········初始化图表··········#####//
    initChart() {
      this.chartInstance = this.$echarts.init(this.$refs.sellerRef, "chalk");

      //初始化样式
      const initOptions = {
        grid: {
          left: "5%",
          right: "5%",
          top: "20%",
          bottom: "5%",
          containLabel: true, //包含坐标轴文字边距
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
        },
        yAxis: {
          type: "value",
        },
        /* 悬浮显示背景色 */
        tooltip: {
          trigger: "axis",
        },
        legend: {
          left: "5%",
          top: "7.5%",
          icon: "circle",
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
    },
    //#####··········获取数据··········#####//
    getData(data) {
      //对数据进行从小到大排序
      this.allData = data;
      this.updateChart();
    },
    //#####··········通过页数更新图表··········#####//
    updateChart() {
      // 半透明的颜色值
      const colorArr1 = [
        "rgba(11, 168, 44, 0.5)",
        "rgba(44, 110, 255, 0.5)",
        "rgba(22, 242, 217, 0.5)",
        "rgba(254, 33, 30, 0.5)",
        "rgba(250, 105, 0, 0.5)",
      ];
      // 全透明的颜色值
      const colorArr2 = [
        "rgba(11, 168, 44, 0)",
        "rgba(44, 110, 255, 0)",
        "rgba(22, 242, 217, 0)",
        "rgba(254, 33, 30, 0)",
        "rgba(250, 105, 0, 0)",
      ];
      //X 类目轴数据
      const timeArr = this.allData.common.month;
      //Y 轴数据
      const valueArr = this.allData[this.choiceType].data;
      const seriesArr = valueArr.map((item, index) => {
        return {
          name: item.name,
          type: "line",
          data: item.data,
          stack: this.choiceType,
          areaStyle: {
            color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: colorArr1[index],
              },
              {
                offset: 1,
                color: colorArr2[index],
              },
            ]),
          },
        };
      });
      //图例数据
      const legendArr = valueArr.map((item) => {
        return item.name;
      });
      // 将样式拆分到初始化方法，只保留数据更新在更新方法处
      const dataPption = {
        xAxis: {
          data: timeArr,
        },
        legend: {
          data: legendArr,
        },
        series: seriesArr,
      };

      this.chartInstance.setOption(dataPption);
    },
    //#####··········屏幕适配··········#####//
    screenAdapter() {
      const titleFontSize = (this.$refs.sellerRef.offsetWidth / 100) * 3.6;
      const adapterOptions = {
        legend: {
          itemWidth: titleFontSize,
          itemHeight: titleFontSize,
          itemGap: titleFontSize,
          textStyle: {
            fontSize: titleFontSize / 2,
          },
        },
      };
      this.chartInstance.setOption(adapterOptions);
      //手动调用 echarts 的resize 方法
      this.chartInstance.resize();
    },
    //#####··········筛选显示··········#####//
    handleSelect(type) {
      this.choiceType = type;
      this.updateChart();
    },
  },
};
</script>
<style scoped lang="less">
.Seller {
  width: 100%;
  height: 100%;
  .title {
    position: absolute;
    left: 10px;
    top: 10px;
    font-weight: bolder;
    z-index: 1;
    font-size: 20px;
    color: #fff;
    cursor: pointer;
    .title-icon {
      margin-left: 10px;
    }
    .select-con {
      cursor: pointer;
    }
  }
  .com-chart {
    width: 100%;
    height: 100%;
  }
}
</style>
