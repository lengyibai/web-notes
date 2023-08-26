<template>
  <div class="RankPage">
    <Rank />
  </div>
</template>
<script>
import Rank from "@/components/Rank.vue";

export default {
  name: "RankPage",
  data() {
    return {};
  },
  components: { Rank },
  methods: {},
};
</script>
<style scoped lang="less">
.RankPage {
  width: 100%;
  height: 100%;
}
</style>
