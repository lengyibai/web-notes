import {
  getReq,
  postReq,
  putReq,
  patchReq,
  deleteReq,
} from "./network/request.js";

//#####··········GET请求··········#####//
//####········获取用户列表········####//
export const getUserList = () => {
  return getReq("/heroList");
};

//####········获取指定用户信息········####//
export const getUserInfo = (id) => {
  return getReq("/heroList", { id });
};

//#####··········POST请求··········#####//
//####········添加用户········####//
export const addUser = (data) => {
  return postReq("/heroList", data);
};

//#####··········PUT请求··········#####//
//####········修改用户········####//
export const editUser = (id, data) => {
  return putReq(`/heroList/${id}`, data);
};

//#####··········PATCH请求··········#####//
//####········修改用户········####//
export const updateUser = (id, data) => {
  return patchReq(`/heroList/${id}`, data);
};

//#####··········DELETE请求··········#####//
//####········修改用户········####//
export const delUser = (id) => {
  return deleteReq(`/heroList/${id}`);
};
