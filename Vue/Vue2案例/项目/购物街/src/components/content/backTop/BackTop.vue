<template>
  <div class="back-top">
    <svg slot="item-icon" class="icon" aria-hidden="true">
      <use xlink:href="#icon-fanhuidingbu1"></use>
    </svg>
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
  .back-top {
    position: fixed;
    right: 0.781rem /* 25/32 */;
    bottom: 2.344rem /* 75/32 */;
    z-index: 999;
  }
  .back-top .icon {
    width: 1.094rem /* 35/32 */;
    height: 1.094rem /* 35/32 */;
    background-color: #fff;
    box-shadow: 0 0.094rem /* 3/32 */ 0.094rem /* 3/32 */ 0 #555;
    border-radius: 50%;
    padding: 0.094rem /* 3/32 */;
    box-sizing: border-box;
    color: #ff5777;
  }
</style>
