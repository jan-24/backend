export default {
  state: {
    isCollapse: false, //控制菜单展开收起
    tadsLst: [
      //面包屑
      {
        path: '/',
        name: 'home',
        label: '首页',
        icon: 's-home',
        url: 'Home/Home',
      },
    ],
    //菜单数据
    menu: [],
  },
  mutations: {
    collapesMenu(state) {
      state.isCollapse = !state.isCollapse;
    },
    // 更新面包屑
    selectMenu(state, item) {
      //判断添加的数据是否为首页
      if (item.name !== 'home') {
        // const index = state.tadsLst.findIndex(item => item.name === item.name)
        const find = state.tadsLst.find((item2) => item2.name === item.name);
        // 如果不在
        if (!find) {
          state.tadsLst.push(item);
        }
      }
    },
    // 删除指定的tag
    closeTag(state, item) {
      const index = state.tadsLst.findIndex((val) => val.name == item.name);
      state.tadsLst.splice(index, 1);
    },
    //设置menu的数据
    getMenu(state, vai) {
      state.menu = vai;
      localStorage.setItem('menu', JSON.stringify(vai));
    },
    //动态注册路由
    addMeu(state, router) {
      if (!localStorage.getItem('menu')) return;
      const menu = JSON.parse(localStorage.getItem('menu'));
      state.menu = menu;
      //处理动态路由数据
      const menuAside = [];
      menu.forEach((item) => {
        //有菜单
        if (item.children) {
          item.children = item.children.map((item) => {
            item.component = () => import(`../viesw/${item.url}`);
            return item;
          });
          menuAside.push(...item.children);
        } else {
          item.component = () => import(`../viesw/${item.url}`);
          menuAside.push(item);
        }
      });
      console.log(menuAside, 'menuAside');
      //路由的动态添加
      menuAside.forEach((item) => {
        router.addRoute('Main', item);
      });
    },
  },
};
