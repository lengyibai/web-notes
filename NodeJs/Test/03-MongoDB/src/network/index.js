import axios from 'axios';
export const instance = axios.create({
  baseURL: 'http://localhost:3000',
  time: 5000,
});

export const fn = id => {
  return instance({
    method: 'GET',
    url: '/modify',
    params: {
      id,
    },
  });
};

//请求数据
export const fn1 = () => {
  return instance({
    method: 'GET',
    url: '/',

  });
};

//添加数据
export const fn2 = data => {
  return instance({
    method: 'POST',
    url: '/',
    data,
  });
};

//更新数据
export const fn3 = data => {
  return instance({
    method: 'PATCH',
    url: '/',
    data,
  });
};

//删除数据
export const fn4 = id => {
  return instance({
    method: 'DELETE',
    url: '/',
    data: { id },
  });
};
