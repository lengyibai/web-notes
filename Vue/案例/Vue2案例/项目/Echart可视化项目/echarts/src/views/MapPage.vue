<template>
  <div class="MapPage">
    <Map />
  </div>
</template>
<script>
import Map from "@/components/Map.vue";

export default {
  name: "MapPage",
  data() {
    return {};
  },
  components: { Map },
  methods: {},
};
</script>
<style scoped lang="less">
.MapPage {
  width: 100%;
  height: 100%;
}
</style>
