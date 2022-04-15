<template>
  <div class="LybDragSort">
    <div class="transition-group" is="transition-group">
      <div
        class="box"
        :class="{ active: currentIndex == index }"
        @dragstart="dragstart(index)"
        @dragover="dragover($event, index)"
        @drop="drop(index)"
        @dragleave="dragleave"
        v-for="(item, index) in data"
        :key="item[id]"
      >
        <slot name="box" :data="{ item, index }"></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Array,
      default() {
        return [];
      },
    },
    id: {
      type: String,
      default: "name",
    },
  },
  name: "LybDragSort",
  data() {
    return {
      animals: [
        {
          name: "鼠",
        },
        {
          name: "牛",
        },
        {
          name: "虎",
        },
        {
          name: "兔",
        },
        {
          name: "龙",
        },
        {
          name: "蛇",
        },
        {
          name: "马",
        },
        {
          name: "羊",
        },
        {
          name: "猴",
        },
        {
          name: "鸡",
        },
        {
          name: "狗",
        },
        {
          name: "猪",
        },
      ],
      fromIndex: 0,
      currentIndex: null,
    };
  },
  methods: {
    exchange(arr, index, target) {
      if (index > target) {
        arr.splice(target, 0, arr[index]);
        arr.splice(index + 1, 1);
      } else {
        arr.splice(target + 1, 0, arr[index]);
        arr.splice(index, 1);
      }
    },

    dragstart(index) {
      this.fromIndex = index;
    },

    dragover(e, index) {
      e.preventDefault();
      this.currentIndex = index;
    },

    drop(index) {
      this.currentIndex = null;
      this.exchange(this.data, this.fromIndex, index);

      console.log(this.data);
    },

    dragleave() {
      this.currentIndex = null;
    },
  },
};
</script>
<style scoped lang="less">
.flex {
  display: flex;
  justify-content: center;
  align-items: center;
}
.LybDragSort {
  .flex();
  width: 100%;
  height: 100%;
  .transition-group {
    .flex();
    flex-wrap: wrap;
    .box {
      transition: all 0.5s;
    }
  }
}

.active {
  transform: scale(1.25);
  opacity: 0.25;
}
</style>
