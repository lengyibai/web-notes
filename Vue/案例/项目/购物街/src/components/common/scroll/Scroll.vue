<template>
  <div class="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
  import BScroll from "better-scroll";
  import ObserveImage from "@better-scroll/observe-image";
  BScroll.use(ObserveImage);
  export default {
    props: {
      probeType: {
        //通过传值来操作判断是否实时监听坐标
        type: Number,
        default: 0,
      },
      pullUpLoad: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        scroll: null,
      };
    },
    components: {},
    mounted() {
      this.scroll = new BScroll(".wrapper", {
        pullUpLoad: this.pullUpLoad, //上拉加载
        // pullDownRefresh: true, //下拉刷新
        probeType: this.probeType, //开启侦测滚动坐标
        autoEndDistance: 1,
        observeImage: true, //解决不确定高度的图片滑动问题
        click: true,
        useTransition: false,
      });
      //监听滚动位置
      this.scroll.on("scroll", (position) => {
        this.$emit("scroll", position);
      });
      //监听上拉加载
      this.scroll.on("pullingUp", () => {
        this.$emit("pullingUp");
        /**
         * 发送网络请求，请求更多页
         * 等数据请求完毕，并展示出来后
         * 再调用以下事件
         */
        setTimeout(() => {
          this.scroll.finishPullUp();
        }, 500);
      });
    },
    methods: {
      scrollTo(x, y, time = 300) {
        this.scroll.scrollTo(x, y, time);
      },
      refresh() {
        this.scroll && this.scroll.refresh();
      },
    },
  };
</script>
<style scoped></style>
