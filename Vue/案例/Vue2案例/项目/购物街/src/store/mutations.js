export default {
  // actions内addCart函数改变量的操作写在mutations内，浏览器Vue工具才能跟踪到
  addCount(state, payload) {
    //添加了相同的商品则商品数量+1
    payload.count++;
  },
  addToCart(state, payload) {
    //自动选中
    payload.isChecked = true;
    //将新商品添加进购物车
    state.cartList.push(payload);
  },
  checkClick(state, payload) {
    state.cartList.forEach(item => {
      //在购物车组件选中商品后修改cartList
      if (item.iid == payload.iid) {
        item.isChecked = !item.isChecked;
      }
    });
  },
};
