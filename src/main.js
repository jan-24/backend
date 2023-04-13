import Vue from 'vue';
import App from './App.vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueRouter from 'vue-router';
import router from './router';
import store from './store';
import './api/mock';
import './utils/px2rem';
import Cookie from 'js-cookie';

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(VueRouter);

//全局前置守卫
router.beforeEach((to, from, next) => {
  const token = Cookie.get('token');
  //判断token存不存在  to.name !== 'login' 判断当前是不是在登录页
  if (!token && to.name !== 'login') {
    //不存在token 跳转登录页
    next({ name: 'login' });
  } else if (token && to.name === 'login') {
    //to.name === 'login' //token存在 并且在登录页面
    //token存在 跳转首页
    next({ name: 'home' });
  } else {
    next();
  }
});
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
