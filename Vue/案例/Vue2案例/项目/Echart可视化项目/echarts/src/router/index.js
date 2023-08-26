import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/ScreenPage",
    component: () => import("@/views/ScreenPage.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
