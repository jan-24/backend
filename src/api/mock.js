import Mock from 'mockjs';
import homeApi from './mockData/home';
import permission from './mockData/permission';
import user from './mockData/user';
//定义mock请求拦截
//首页
Mock.mock('/api/home/getData', 'get', homeApi.getStatisticalData);

//用户列表
Mock.mock(/api\/user\/getUserList/, 'get', user.getUserList);

//增加用户
Mock.mock('/api/user/createUser', 'post', user.createUser);

//删除用户
Mock.mock('/api/user/deleteUser', 'post', user.deleteUser);

//批量删除
Mock.mock('/api/user/batchremove', 'post', user.batchremove);

//修改用户
Mock.mock('/api/user/updateUser', 'post', user.updateUser);


//登录
Mock.mock('/api/permission/getMenu', 'post', permission.getMenu);
