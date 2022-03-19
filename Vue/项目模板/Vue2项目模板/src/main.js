import Vue from 'vue';
import App from './App';
// import router from './router';
// import store from './store';

Vue.prototype.$bus = new Vue();

Vue.config.productionTip = false;

new Vue({
  // router,
  // store,
  el: '#app',
  render: h => h(App)
});
