<template>
  <div class="Map" @dblclick="reverMap">
    <div class="com-chart" ref="MapRef"></div>
  </div>
</template>
<script>
import china from "../../public/static/map/china.json";
import { getProvinceMapInfo } from "@/utils/map_utils.js";

import axios from "axios";
export default {
  name: "Map",
  data() {
    return {
      chartInstance: null, //图表方法
      allData: null, //图表数据
      mapData: {}, //地图缓存
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
    window.removeEventListener("resize", this.screenAdapter);
  },
  methods: {
    //#####··········初始化图表··········#####//
    initChart() {
      this.chartInstance = this.$echarts.init(this.$refs.MapRef, "chalk");

      // 获取中国地图的矢量数据
      this.$echarts.registerMap("china", china);
      const initOptions = {
        title: {
          text: "商家分布",
          left: 20,
          top: 20,
        },
        geo: {
          type: "map",
          map: "china",
          itemStyle: {
            areaColor: "#2E72BF",
            borderColor: "#000",
          },
        },
        legend: {
          left: "5%",
          bottom: "5%",
          orient: "vertical", //垂直摆放
        },
      };
      this.chartInstance.setOption(initOptions);
      this.chartInstance.on("click", async (e) => {
        const provinceInfo = getProvinceMapInfo(e.name);
        if (!provinceInfo.key) return;
        if (!this.mapData[provinceInfo.key]) {
          const ret = await axios.get(
            "http://localhost:8080" + provinceInfo.path
          );
          this.mapData[provinceInfo.key] = ret;
          this.$echarts.registerMap(provinceInfo.key, ret.data);
        }
        const changeOption = {
          geo: {
            map: provinceInfo.key,
          },
        };
        this.chartInstance.setOption(changeOption);
      });
    },
    //#####··········获取数据··········#####//
    async getData() {
      const { data } = await this.$axios.get("/map");
      this.allData = data;
      this.updateChart();
    },
    //#####··········更新图表··········#####//
    updateChart() {
      //图例数据
      const legendArr = this.allData.map((item) => {
        return item.name;
      });
      //处理图标需要的数据
      const seriesArr = this.allData.map((item) => {
        // 一个类别下的所有散点数据
        return {
          type: "effectScatter",
          rippleEffect: {
            scale: 5,
            brushType: "stroke",
          },
          name: item.name,
          data: item.children,
          coordinateSystem: "geo",
        };
      });
      const dataOption = {
        legend: { data: legendArr },
        series: seriesArr,
      };

      this.chartInstance.setOption(dataOption);
    },
    //#####··········屏幕适配··········#####//
    screenAdapter() {
      const titleFontSize = (this.$refs.MapRef.offsetWidth / 100) * 3.6;
      const adapterOption = {
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
      };
      this.chartInstance.setOption(adapterOption);
      this.chartInstance.resize();
    },

    //#####··········回到中国地图··········#####//
    reverMap() {
      const changeOption = {
        geo: {
          map: "china",
        },
      };
      this.chartInstance.setOption(changeOption);
    },
  },
};
</script>
<style scoped lang="less">
.Map {
  width: 100%;
  height: 100%;
  .title {
    position: absolute;
    left: 25px;
    top: 25px;
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
