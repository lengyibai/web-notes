<template>
  <van-swipe class="van-swiper" :autoplay="3000" :stop-propagation="false">
    <van-swipe-item v-for="(item, index) in banners" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt="" v-lazy="item.image" @load="imageLoad" />
      </a>
    </van-swipe-item>
  </van-swipe>
</template>
<script>
  export default {
    props: {
      banners: {
        type: Array,
        default() {
          return {
            isLoad: false,
          };
        },
      },
    },
    methods: {
      imageLoad() {
        if (!this.isLoad) {
          this.$emit("swiperImageLoad");
          this.isLoad = "true";
        }
      },
    },
  };
</script>
<style scoped>
  .van-swiper {
    height: 150px;
    overflow: hidden;
  }
</style>
