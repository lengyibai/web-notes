import Vue from 'vue';
import aaa from './assets/js/aaa.js';
// 方法1
Vue.mixin({
    data() {
        return {
            aaa,
        };
    },
});
// 方法2
Vue.prototype.aaa = aaa;
