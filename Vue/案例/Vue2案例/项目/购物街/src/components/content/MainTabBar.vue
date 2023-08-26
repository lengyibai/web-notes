<template>
  <tab-bar>
    <!-- 首页组件 -->
    <tab-bar-item path="/home" activeColor="red">
      <svg slot="item-icon" class="icon" aria-hidden="true">
        <use xlink:href="#icon-home"></use>
      </svg>
      <span slot="item-text">首页</span>
    </tab-bar-item>
    <!-- 分类组件 -->
    <tab-bar-item path="/category" activeColor="green">
      <svg slot="item-icon" class="icon" aria-hidden="true">
        <use xlink:href="#icon-classification"></use>
      </svg>
      <span slot="item-text">分类</span>
    </tab-bar-item>
    <!-- 购物车组件 -->
    <tab-bar-item path="/cart" activeColor="blue">
      <svg slot="item-icon" class="icon" aria-hidden="true">
        <use xlink:href="#icon-gouwuche"></use>
      </svg>
      <span slot="item-text">购物车</span>
    </tab-bar-item>
    <!-- 我的组件 -->
    <tab-bar-item path="/profile" activeColor="purple">
      <svg slot="item-icon" class="icon" aria-hidden="true">
        <use xlink:href="#icon-my1"></use>
      </svg>
      <span slot="item-text">我的</span>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
  import TabBar from "../common/tabbar/TabBar.vue";
  import TabBarItem from "../common/tabbar/TabBarItem.vue";
  export default {
    components: {
      TabBar,
      TabBarItem,
    },
  };
</script>

<style>
  .icon {
    margin-top: 3px;
  }
</style>
