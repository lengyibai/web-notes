import Vue from 'vue';
import App from './App';

Vue.prototype.$bus = new Vue();

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  render: h => h(App)
});
