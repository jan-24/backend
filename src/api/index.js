import http from '@/utils/request';

// 请求首页数据
export const getData = () => {
  // 返回promise对象
  return http.get('/home/getData');
};

//登录
export const getMenu = (data) => {
  // 返回promise对象
  return http.post('/permission/getMenu', data);
};

// 用户列表
export const getUserList = (params) => {
  // 返回promise对象
  return http.get('/user/getUserList', params);
};

// 增加用户
export const createUser = (data) => {
  // 返回promise对象
  return http.post('/user/createUser', data);
};

// 删除用户
export const deleteUser = (data) => {
  // 返回promise对象
  return http.post('/user/deleteUser', data);
};


// 批量删除
export const batchremove = (data) => {
  // 返回promise对象
  return http.post('/user/batchremove', data);
};


// 修改用户
export const updateUser = (data) => {
  // 返回promise对象
  return http.post('/user/updateUser', data);
};
