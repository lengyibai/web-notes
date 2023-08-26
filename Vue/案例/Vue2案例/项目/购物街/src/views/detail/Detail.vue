<template>
  <div class="detail">
    <detail-nav-bar @titleClick="titleClick" ref="nav" />
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
    >
      <detail-swiper :top-images="goods.topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-comment-info :commentInfo="commentInfo" ref="comment" />
      <detail-param-info :param-info="paramInfo" ref="param" />
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" />
      <goods-list :goods="recommends" ref="recommend" />
    </scroll>
    <detail-bottom-bar @addCart="addToCart" />
    <back-top v-show="isShowBackTop" ref="backTop" @click.native="backClick" />
  </div>
</template>
<script>
  import DetailNavBar from './childComps/DetailNavBar';
  import DetailSwiper from './childComps/DetailSwiper.vue';
  import DetailBaseInfo from './childComps/DetailBaseInfo.vue';
  import DetailShopInfo from './childComps/DetailShopInfo.vue';
  import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue';
  import DetailParamInfo from './childComps/DetailParamInfo.vue';
  import DetailCommentInfo from './childComps/DetailCommentInfo.vue';
  import DetailBottomBar from './childComps/DetailBottomBar.vue';

  import Scroll from '@/components/common/scroll/Scroll.vue';
  import GoodsList from '@/components/content/goods/GoodsList.vue';

  import {
    getDetail,
    Goods,
    Shop,
    GoodsParam,
    getRecommend,
  } from '@/network/detail.js';
  import { mapActions } from 'vuex';
  import { debounce } from '@/common/utils.js';
  import { backTopMixin } from '@/common/mixin.js';
  export default {
    name: 'Detail',
    components: {
      DetailNavBar,
      Scroll,
      GoodsList,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,
      Scroll,
    },
    data() {
      return {
        iid: null,
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        itemParams: {},
        commentInfo: {},
        recommends: [],
        themeTopYs: [],
        getThemeTopY: null,
        currentIndex: 0,
      };
    },
    //SEDAD:ASMDS
    mixins: [backTopMixin],
    created() {
      //保存传入的iid
      this.iid = this.$route.params.iid;

      //获取iid请求的详情数据
      getDetail(this.iid).then(res => {
        const data = res.data.result;
        //获取商品信息
        this.goods = new Goods(
          data.itemInfo,
          data.columns,
          data.shopInfo.services,
        );
        //获取商家信息
        this.shop = new Shop(data.shopInfo);
        //获取商品详细数据
        this.detailInfo = data.detailInfo;
        //获取参数信息
        this.paramInfo = new GoodsParam(
          data.itemParams.info,
          data.itemParams.rule,
        );
        //获取评论信息（有些商品没有评论，需要进行判断）
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0];
        }
      });
      //请求推荐页数据
      getRecommend().then(res => {
        this.recommends = res.data.data.list;
      });

      //获取每个区域的顶部坐标
      this.getThemeTopY = debounce(() => {
        //进行防抖处理
        this.themeTopYs = [];
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.param.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        this.themeTopYs.push(Number.MAX_VALUE);
      }, 250);
    },
    methods: {
      ...mapActions(['addCart']),
      imageLoad() {
        //每张图片加载时触发一次，获取每个区域的顶部坐标
        this.getThemeTopY();
      },
      //点击顶部导航栏滚动到某个区域
      titleClick(index) {},
      //滚动到某个区域，改变某个导航栏样式
      contentScroll(position) {
        const positionY = -position.y;
        for (let i of this.themeTopYs.keys()) {
          if (
            this.currentIndex != i &&
            positionY >= this.themeTopYs[i] &&
            positionY < this.themeTopYs[i + 1]
          ) {
            this.currentIndex = i;
            //改变nav组件的currentIndex值
            this.$refs.nav.currentIndex = this.currentIndex;
          }
        }
        this.listenShowBackTop(position);
      },
      addToCart() {
        //获取购物车需要展示的信息
        const product = {};
        product.image = this.goods.topImages[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.realPrice;
        product.iid = this.iid;

        //将商品添加到购物车
        this.addCart(product).then(res => {
          this.$toast(res); //添加进购物车提示
        });
      },
    },
  };
</script>
<style scoped>
  .detail {
    position: relative;
    height: 100vh;
  }
  .content {
    height: calc(100% - 1.375rem - 1.719rem); /* 55/32 */
    overflow: hidden;
    border: 4px solid #fff;
  }
</style>
