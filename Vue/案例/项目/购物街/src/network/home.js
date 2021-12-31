import { instance } from './request';
const getHomeMultidata = () => {
  return instance({
    url: '/home/multidata',
  });
};
const getHomeGoods = (type, page) => {
  return instance({
    url: '/home/data',
    params: {
      type,
      page,
    },
  });
};

export { getHomeMultidata, getHomeGoods };
