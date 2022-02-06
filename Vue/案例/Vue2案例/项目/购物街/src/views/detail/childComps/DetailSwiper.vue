<template>
  <van-swipe
    class="van-swiper"
    :autoplay="3000"
    :stop-propagation="false"
    @change="onChange"
  >
    <van-swipe-item v-for="(item, index) in topImages" :key="index">
      <img :src="item" alt="" v-lazy="item" />
    </van-swipe-item>
    <template #indicator>
      <div class="custom-indicator">
        {{ current + 1 }}/{{ topImages.length }}
      </div>
    </template>
  </van-swipe>
</template>
<script>
  export default {
    props: {
      topImages: {
        type: Array,
        default() {
          return [];
        },
      },
    },
    data() {
      return { current: 0 };
    },
    methods: {
      onChange(index) {
        this.current = index;
      },
    },
  };
</script>
<style scoped>
  .van-swiper {
    height: 9.375rem /* 300/32 */;
    overflow: hidden;
  }
  .custom-indicator {
    position: absolute;
    right: 0px;
    bottom: 0px;
    padding: 5px 8px;
    font-size: 16px;
    color: #fff;
    background: rgba(0, 0, 0, 0.25);
  }
</style>
