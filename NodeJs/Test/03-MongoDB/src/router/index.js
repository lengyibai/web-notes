import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const list = () => import('../views/list');
const add = () => import('../views/add');
const modify = () => import('../views/modify');

const routes = [
  {
    path: '/',
    redirect: 'list',
  },
  {
    meta: {
      title: '用户列表',
    },
    path: '/list',
    component: list,
  },
  {
    meta: {
      title: '添加用户',
    },
    path: '/add',
    component: add,
  },
  {
    meta: {
      title: '修改用户',
    },
    path: '/modify/:id',
    component: modify,
  },
];

const router = new VueRouter({
  routes,
  mode: 'history',
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
});
export default router;
