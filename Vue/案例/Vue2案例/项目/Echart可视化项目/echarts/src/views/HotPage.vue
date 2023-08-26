<template>
  <div class="HotPage">
    <Hot />
  </div>
</template>
<script>
import Hot from "@/components/Hot.vue";

export default {
  name: "HotPage",
  data() {
    return {};
  },
  components: { Hot },
  methods: {},
};
</script>
<style scoped lang="less">
.HotPage {
  width: 100%;
  height: 100%;
}
</style>
