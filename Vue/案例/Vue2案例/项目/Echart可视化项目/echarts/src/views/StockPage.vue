<template>
  <div class="StockPage">
    <Stock />
  </div>
</template>
<script>
import Stock from "@/components/Stock.vue";

export default {
  name: "StockPage",
  data() {
    return {};
  },
  components: { Stock },
  methods: {},
};
</script>
<style scoped lang="less">
.StockPage {
  width: 100%;
  height: 100%;
}
</style>
