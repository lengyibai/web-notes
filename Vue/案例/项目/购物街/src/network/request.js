import axios from 'axios';
import Vue from 'vue';
import { Toast } from 'vant';
Vue.use(Toast);
export const instance = axios.create({
  baseURL: 'http://152.136.185.210:7878/api/m5',
  time: 5000,
});
instance.interceptors.response.use(res => {
  Toast.clear();
  return res;
});
