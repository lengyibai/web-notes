// import router from '@/router';
// import { login, logout } from '@/api/index.js';
// export default {
//   // 登录用户信息
//   login(context, account) {
//     // 请求登录接口
//     login(account).then(res => {
//       if (res.data.data) {
//         // 登录成功后存储用户信息
//         context.commit('setUserInfo', res.data.data);
//         // 并存储 token
//         context.commit('setToken', res.data.data.accessToken);
//         // 跳转路由
//         router.push({ path: '/' });
//       }
//     });
//   },

//   //退出登录
//   logout(context) {
//     logout().then(() => {
//       context.commit('clearToken');
//     });
//     router.push({ name: 'Login' });
//   }
// };
