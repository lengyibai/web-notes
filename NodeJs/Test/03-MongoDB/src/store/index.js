import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    hobby: ['吃饭', '睡觉', '打豆豆', '敲代码'],
  },
  mutations: {},
});

export default store;
