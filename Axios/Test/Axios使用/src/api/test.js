import { getReq, postReq, putReq, patchReq, deleteReq } from "./network/request.js";

//#####··········GET请求··········#####//
//####········获取用户列表········####//
export const getUserList = () => {
  return getReq("/heroList");
};

//####········获取指定用户信息········####//
export const getUserInfo = (id) => {
  return getReq("/heroList", { id });
};
//####········获取备份用户列表········####//
export const getBackupUserList = () => {
  return getReq("/heroList_backup");
};

//####········获取指定备份用户信息········####//
export const getBackupUserInfo = (id) => {
  return getReq("/heroList_backup", { id });
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
//####········删除用户········####//
export const delUser = (id) => {
  return deleteReq(`/heroList/${id}`);
};
