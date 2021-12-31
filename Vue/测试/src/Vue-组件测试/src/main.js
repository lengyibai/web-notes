import Vue from 'vue';
import App from './App.vue';
import './assets/css/default.css';
import './plugins/vantUI';

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
