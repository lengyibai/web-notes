<template>
  <div class="index">
    <LybDragSort>
      <template
        v-slot="{ dragstart, dragover, drop, dragleave, currentIndex, animals }"
      >
        <div
          class="box"
          :class="{ active: currentIndex == index }"
          @dragstart="dragstart(index)"
          @dragover="dragover($event, index)"
          @drop="drop(index)"
          @dragleave="dragleave"
          v-for="(item, index) in animals"
          :key="item.name"
        >
          <div class="move" draggable="true">{{ item.name }}</div>
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
};
</script>
<style scoped lang="less">
.flex {
  display: flex;
  justify-content: center;
  align-items: center;
}
.index {
  width: 100%;
  height: 100%;
  .box {
    position: relative;
    width: 75px;
    height: 75px;
    margin: 12.5px;
    transition: all 0.5s;
    .move {
      .flex();
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: #000;
      font-size: 25px;
      color: #fff;
      z-index: 1;
    }
  }
}
.active {
  transform: scale(1.25);
  opacity: 0.25;
}
</style>
