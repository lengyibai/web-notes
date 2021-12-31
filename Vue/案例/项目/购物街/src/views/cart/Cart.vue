<template>
  <div class="cart">
    <nav-bar>
      <div slot="center">购物车({{ cartLength }})</div>
    </nav-bar>
    <cart-list />
    <cart-bottom-bar />
  </div>
</template>
<script>
  import NavBar from "@/components/common/navbar/NavBar.vue";
  import CartList from "./childComps/CartList.vue";
  import CartBottomBar from "./childComps/CartBottomBar.vue";

  import { mapGetters } from "vuex";
  export default {
    name: "Cart",
    components: { NavBar, CartList, CartBottomBar },
    props: [],
    data() {
      return {};
    },
    computed: {
      ...mapGetters(["cartLength"]),
    },
    watch: {},
    mixins: [],
    beforeCreated() {},
    created() {},
    beforeMount() {},
    mounted() {},
    beforeUpdate() {},
    updated() {},
    activated() {},
    deactivated() {},
    beforeDestroy() {},
    destroyed() {},
    methods: {},
  };
</script>
<style scoped>
  .cart {
    position: relative;
    height: calc(100vh - 49px);
    overflow: hidden;
  }
</style>