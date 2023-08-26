<template>
  <div class="TrendPage">
    <Seller />
  </div>
</template>
<script>
import Seller from "@/components/Trend.vue";

export default {
  name: "TrendPage",
  data() {
    return {};
  },
  components: { Seller },
  methods: {},
};
</script>
<style scoped lang="less">
.TrendPage {
  width: 100%;
  height: 100%;
}
</style>
