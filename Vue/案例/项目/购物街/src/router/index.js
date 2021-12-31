import Vue from 'vue';
import VueRouter from 'vue-router';

const Home = () => import('../views/home/Home.vue');
const Category = () => import('../views/category/Category.vue');
const Cart = () => import('../views/cart/Cart.vue');
const Profile = () => import('../views/profile/Profile.vue');
const Detail = () => import('../views/detail/Detail.vue');

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    meta: {
      title: '主页',
      isShow: true,
    },
    path: '/home',
    component: Home,
  },
  {
    meta: {
      title: '分类',
      isShow: true,
    },
    path: '/category',
    component: Category,
  },
  {
    meta: {
      title: '购物车',
      isShow: true,
    },
    path: '/cart',
    component: Cart,
  },
  {
    meta: {
      title: '我的',
      isShow: true,
    },
    path: '/profile',
    component: Profile,
  },
  {
    meta: {
      title: '商品详情',
      isShow: false, //用于隐藏tab栏
    },
    path: '/detail/:iid',
    component: Detail,
  },
];

const router = new VueRouter({
  routes,
  // mode: 'history',
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
});
export default router;
