<template>
  <div class="tab-control">
    <!-- 这里只是文字不一样，所以不需要插槽 -->
    <div
      class="tab-control-item"
      :class="{ active: index == currentIndex }"
      @click="itemClick(index)"
      v-for="(item, index) in titles"
      :key="index"
    >
      <span> {{ item }}</span>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      titles: {
        type: Array,
        default() {
          return [];
        },
      },
    },
    data() {
      return {
        currentIndex: 0,
      };
    },
    methods: {
      itemClick(index) {
        this.currentIndex = index;
        this.$emit('tabClick', index);
      },
    },
    components: {},
  };
</script>
<style scoped>
  .tab-control {
    display: flex;
    text-align: center;
    height: 1.375rem /* 44/32 */;
    line-height: 1.375rem /* 44/32 */;
    z-index: 3;
  }
  .tab-control-item {
    flex: 1;
  }
  .active span {
    color: red;
    padding: 5px;
    border-bottom: 2px solid red;
  }
</style>
