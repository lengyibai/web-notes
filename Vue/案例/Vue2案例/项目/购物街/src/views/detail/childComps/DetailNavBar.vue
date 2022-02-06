<template>
  <div>
    <nav-bar class="nav-bar">
      <div slot="left" class="back" @click="backClick">
        <svg slot="item-icon" class="icon" aria-hidden="true">
          <use xlink:href="#icon-fanhui"></use>
        </svg>
      </div>
      <div slot="center" class="title">
        <span
          class="title-item"
          :class="{ active: currentIndex == index }"
          v-for="(item, index) in title"
          :key="index"
          @click="titleClick(index)"
          >{{ item }}</span
        >
      </div>
    </nav-bar>
  </div>
</template>
<script>
  import NavBar from "@/components/common/navbar/NavBar.vue";
  export default {
    data() {
      return {
        title: ["商品", "评论", "参数", "推荐"],
        currentIndex: 0,
      };
    },
    methods: {
      titleClick(index) {
        this.currentIndex = index;
        this.$emit("titleClick", index);
      },
      backClick() {
        this.$router.back();
      },
    },
    components: { NavBar },
  };
</script>
<style scoped>
  .title {
    display: flex;
  }
  .title-item {
    flex: 1;
  }
  .active {
    color: deeppink;
  }
  .back {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .icon {
    width: 0.5rem /* 16/32 */;
    height: 0.5rem /* 16/32 */;
  }
  .nav-bar {
    color: #000;
    background-color: #fff;
  }
</style>
