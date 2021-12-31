export default {
  addCart(context, payload) {
    //当完成了操作即会向外传递resolve，通过then的res参数接收
    return new Promise((resolve, reject) => {
      //判断cartList是否存在添加到购物车的商品，存在则返回该商品给oldProduct
      let oldProduct = context.state.cartList.find(
        item => item.iid == payload.iid
      );
      if (oldProduct) {
        //存在相同的商品则为true
        context.commit('addCount', oldProduct);
        resolve('当前商品数量+1');
      } else {
        //不存在则给新商品增加对象属性count用于下次增加
        payload.count = 1;
        //并添加进购物车
        context.commit('addToCart', payload);
        resolve('已添加进购物车');
      }
    });
  },
};
