<template>
  <div class="cartList">
    <scroll class="content" ref="scroll">
      <cart-list-item
        v-for="(item, index) in cartList"
        :key="index"
        :product="item"
      />
    </scroll>
  </div>
</template>
<script>
  //子组件
  import CartListItem from "./CartListItem.vue";

  //公共组件
  import Scroll from "@/components/common/scroll/Scroll.vue";

  //公共方法
  import { mapGetters } from "vuex";
  export default {
    name: "",
    components: { CartListItem, Scroll },
    props: [],
    data() {
      return {};
    },
    computed: {
      //获取vuex的getter内的函数
      ...mapGetters(["cartList", "cartLength"]),
    },
    activated() {
      //进入购物车刷新一下高度，解决页面高度没有随着商品增加而增加导致无法滑动
      this.$refs.scroll.refresh();
    },
  };
</script>
<style scoped>
  .cartList {
    height: calc(100% - 44px - 40px);
  }
  .content {
    height: 100%;
    overflow: hidden;
  }
</style>