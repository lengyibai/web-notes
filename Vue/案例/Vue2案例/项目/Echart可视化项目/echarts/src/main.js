import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import "@/assets/index.css";
import "@/assets/font/iconfont.css";
import SocketService from "@/utils/socket_service.js";
SocketService.Instance.connect();
Vue.prototype.$socket = SocketService.Instance;

axios.defaults.baseURL = "http://localhost:9527/api";

Vue.prototype.$echarts = window.echarts;
Vue.prototype.$axios = axios;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
