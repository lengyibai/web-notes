import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';
import { request } from './network/request';

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');

/* axios({
    // url: 'http://123.207.32.32:8000/home/multidata',//直接获取数据
    url: 'http://wthrcdn.etouch.cn/weather_mini', //通过参数查询
    params: {
        //如果网址有问号，问号可以省略，下面写参数进行自动拼接
        city: '绵竹',
    },
}).then(res => {
    console.log(res);
}); */

/* axios.defaults.baseURL = 'http://wthrcdn.etouch.cn/weather_mini';
axios.defaults.timeout = 3000;
//axios并发请求
axios
    .all([
        axios({
            // url: '/weather_mini',
            params: {
                city: '自贡',
            },
        }),
        axios({
            // url: '/weather_mini',
            params: {
                city: '绵竹',
            },
        }),
    ])
    .then(([res1, res2]) => {
        console.log(res1.data.data.forecast, res2.data.data.forecast); //可直接输出两个对象
    }); */
/*
//简写
axios
    .get('http://wthrcdn.etouch.cn/weather_mini?city=自贡')
    .then(function(res) {
        console.log(res.data.data.forecast);
    });
 */
