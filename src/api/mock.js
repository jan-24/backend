import Mock from 'mockjs';
import homeApi from './mockData/home';
import permission from './mockData/permission';
//定义mock请求拦截
Mock.mock('/api/home/getData', 'get', homeApi.getStatisticalData);

Mock.mock('/api/permission/getMenu', 'post', permission.getMenu);
