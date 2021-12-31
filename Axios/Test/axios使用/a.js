const instance = axios.create({
  baseURL: 'http://localhost:3000',
  time: 5000,
});

//请求数据
const fn1 = id => {
  return instance({
    method: 'GET',
    url: `/lyb/${id}`,
    params: {},
  });
};

//发送数据
const fn2 = data => {
  return instance({
    method: 'POST',
    url: '/lyb',
    data,
  });
};

//更新数据（所有数据推送到后端，如果只推送了name，并没有推送年龄，年龄将会为空）
const fn3 = (name, id) => {
  return instance({
    method: 'put',
    url: `/lyb/${id}`,
    data: {
      name,
    },
  });
};

//更新数据（将修改的数据推送到后端，如果只推送了name，并没有推送年龄，那将只会修改name，年龄不会改变）
const fn5 = data => {
  return instance({
    method: 'PATCH',
    url: `/lyb/${data.id}`,
    data,
  });
};

//删除数据
const fn4 = id => {
  return instance({
    method: 'DELETE',
    url: `/lyb/${id}`,
  });
};
export { fn1, fn2, fn3, fn4, fn5, instance };
