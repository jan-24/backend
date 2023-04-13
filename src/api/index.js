import http from '@/utils/request';

// 请求首页数据

export const getData = () => {
  // 返回promise对象
  return http.get('/home/getData');
};

export const getMenu = (data) => {
  // 返回promise对象
  return http.post('/permission/getMenu', data);
};
