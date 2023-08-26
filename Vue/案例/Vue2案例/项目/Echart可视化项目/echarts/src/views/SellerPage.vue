<template>
  <div class="SellerPage">
    <Seller />
  </div>
</template>
<script>
import Seller from "@/components/Seller.vue";

export default {
  name: "SellerPage",
  data() {
    return {};
  },
  components: { Seller },
  methods: {},
};
</script>
<style scoped lang="less">
.SellerPage {
  width: 100%;
  height: 100%;
}
</style>
