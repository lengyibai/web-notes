<template>
  <div class="index">
    <LybDragSort :data="imgs">
      <template v-slot:box="{ data }">
        <div class="move" draggable="true">
          <img :src="data.item.src" alt="" />
        </div>
      </template>
    </LybDragSort>
  </div>
</template>
<script>
import LybDragSort from "../components/lyb-drag-sort/index.vue";
export default {
  name: "index",
  data() {
    return {
      imgs: [
        {
          name: "a",
          src: require("@/assets/img/a.png"),
        },
        {
          name: "b",
          src: require("@/assets/img/b.png"),
        },
        {
          name: "c",
          src: require("@/assets/img/c.png"),
        },
        {
          name: "d",
          src: require("@/assets/img/d.png"),
        },
        {
          name: "e",
          src: require("@/assets/img/e.png"),
        },
      ],
    };
  },
  components: { LybDragSort },
  methods: {},
};
</script>
<style scoped lang="less">
.index {
  width: 100%;
  height: 100%;
  .move {
    width: 200px;
    height: 200px;
    margin: 12.5px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
