import Vue from 'vue';
import App from './App.vue';
import router from './router';
import './plugins/vantUI';
import './assets/css/index.css';
import './assets/css/base.css';
import './assets/js/flexible.js';
import store from './store/index';
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
