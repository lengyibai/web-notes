import Vue from 'vue';
import { Swipe, SwipeItem, Lazyload, Loading, Toast } from 'vant';

Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Lazyload, {
  lazyComponent: true,
});
Vue.use(Loading);
Vue.use(Toast);
Toast.success({ duration: 5000 });
