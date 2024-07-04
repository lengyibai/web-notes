<template>
  <div class="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
  export default {};
</script>

<style scoped>
  .tab-bar {
    position: fixed;
    width: 100vw;
    display: flex;
    flex-direction: row;
    background-color: #f6f6f6;
    bottom: 0;
    box-shadow: 0 -1px 3px 0 #ccc;
    z-index: 3;
  }
</style>
