export default {
    state: {
        isCollapse: false,//控制菜单展开收起
        tadsLst: [  //面包屑
            {
                path: '/',
                name: 'home',
                label: '首页',
                icon: 's-home',
                url: 'Home/Home'
            },
        ]
    },
    mutations: {
        collapesMenu(state) {
            state.isCollapse = !state.isCollapse
        },
        // 更新面包屑
        selectMenu(state, item) {
            //判断添加的数据是否为首页
            if (item.name !== 'home') {
                // const index = state.tadsLst.findIndex(item => item.name === item.name)
                const find = state.tadsLst.find(item2 => item2.name === item.name)
                // 如果不在
                if (!find) {
                    state.tadsLst.push(item)
                }

            }
        },
        // 删除指定的tag
        closeTag(state, item) {
            const index = state.tadsLst.findIndex(val => val.name == item.name)
            state.tadsLst.splice(index, 1)
        }
    }
}