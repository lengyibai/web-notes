import axios from 'axios';
export function request(config) {
    //1、创建axios实例
    const instance = axios.create({
        baseURL: 'http://wthrcdn.etouch.cn',
        timeout: 5000,
    });
    //2、axios拦截器
    instance.interceptors.request.use(
        res => {
            // return res;
        },
        err => {
            console.log(err);
        }
    );
    // instance.interceptors.response;

    return instance(config);
}
