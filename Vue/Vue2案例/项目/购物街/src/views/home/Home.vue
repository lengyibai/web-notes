<template>
  <div class="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
      class="tabControl"
      v-show="isTabFixed"
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      ref="tabControl1"
    />
    <scroll
      @scroll="contentScroll"
      @pullingUp="loadMore"
      class="content"
      ref="scroll"
      :probe-type="3"
      :pullUpLoad="true"
    >
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad" />
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view />
      <tab-control
        :class="{ fixed: isTabFixed }"
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl2"
      />
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top
      v-show="isShowBackTop"
      ref="backTop"
      @click.native="backClick"
    ></back-top>
  </div>
</template>

<script>
  //子组件
  import HomeSwiper from './childComps/HomeSwiper.vue';
  import RecommendView from './childComps/RecommendView.vue';
  import FeatureView from './childComps/Feature.vue';

  //公共组件
  import NavBar from '@/components/common/navbar/NavBar.vue';
  import TabControl from '@/components/content/tabControl/TabControl.vue';
  import GoodsList from '@/components/content/goods/GoodsList.vue';
  import Scroll from '@/components/common/scroll/Scroll.vue';

  //公共方法
  import { getHomeMultidata, getHomeGoods } from '@/network/home.js';
  import { backTopMixin } from '@/common/mixin.js';

  export default {
    components: {
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
      GoodsList,
      Scroll,
    },
    mixins: [backTopMixin],
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          pop: {
            page: 0,
            list: [],
          },
          new: {
            page: 0,
            list: [],
          },
          sell: {
            page: 0,
            list: [],
          },
        },
        currentType: 'pop',
        tabOffsetTop: 0,
        isTabFixed: false,
        saveY: 0,
      };
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list;
      },
    },
    created() {
      //请求多个数据
      this.getHomeMultidata();
      //请求商品数据
      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell');
    },
    methods: {
      /* 事件监听 */
      swiperImageLoad() {
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      },
      //监听点击的哪个Tab栏
      tabClick(index) {
        this.currentType = Object.keys(this.goods)[index];
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
      },
      //监听滚动
      contentScroll(position) {
        //返回顶部按钮
        this.listenShowBackTop(position);
        //吸顶效果
        this.isTabFixed = -position.y > this.tabOffsetTop;
      },
      //上拉加载更多
      loadMore() {
        this.getHomeGoods(this.currentType);
      },

      /* 将请求函数写在methods内，避免create臃肿 */
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          this.banners = res.data.data.banner.list;
          this.recommends = res.data.data.recommend.list;
        });
      },
      //获取商品
      getHomeGoods(type) {
        const page = this.goods[type].page + 1;
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.data.list);
          this.goods[type].page += 1;
        });
      },
    },
  };
</script>

<style scoped>
  .home {
    position: relative;
    height: calc(100vh - 49px);
  }
  .tab-control {
    top: 1.375rem /* 44/32 */;
    background-color: #fff;
  }
  .content {
    position: absolute;
    top: 1.375rem /* 44/32 */;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: hidden;
  }
  .tabControl {
    position: relative;
    top: 0;
  }
</style>
