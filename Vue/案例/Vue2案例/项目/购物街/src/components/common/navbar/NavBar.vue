<template>
  <div class="nav-bar">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>
<script>
  export default {
    data() {
      return {};
    },
    methods: {},
    components: {},
  };
</script>
<style scoped>
  .nav-bar {
    display: flex;
    width: 100vw;
    background-color: #ff5777;
    color: #fff;
    line-height: 1.375rem /* 44/32 */;
    height: 1.375rem /* 44/32 */; /* 直接撑起来，并能保证文字居中 */
    text-align: center;
  }
  .left,
  .right {
    width: 1.875rem /* 60/32 */;
    height: 100%;
  }
  .center {
    flex: 1;
  }
</style>
