<template>
  <div>
    <keep-alive exclude="Detail">
      <router-view />
    </keep-alive>
    <main-tab-bar v-if="$route.meta.isShow" />
  </div>
</template>
<script>
  import MainTabBar from './components/content/MainTabBar.vue';
  export default {
    data() {
      return {};
    },
    methods: {},
    components: { MainTabBar },
  };
</script>
<style scoped>
  * {
    font-size: 0.438rem /* 14/32 */;
  }
</style>
