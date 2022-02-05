<template>
  <div class="App">
    <index />
  </div>
</template>
<script>
import index from '@/views/index.vue';
export default {
  name: 'App',
  components: { index },
  setup() {
    return {};
  },
};
</script>
<style scoped lang="less">
.App {
  width: 100vw;
}
</style>
