<template>
  <el-menu
    default-active="1-4-1"
    class="el-menu-vertical-demo box"
    @open="handleOpen"
    @close="handleClose"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    :collapse="isCollapse"
  >
    <h3 class="h3">{{ isCollapse ? "后台" : "通用后台管理系统" }}</h3>
    <el-menu-item
      @click="EventClick(item)"
      v-for="item in noChildern"
      :key="item.name"
      :index="item.name"
    >
      <i :class="`el-icon-${item.icon}`"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>
    <el-submenu v-for="item in Childern" :key="item.label" :index="item.label">
      <template slot="title">
        <i :class="`el-icon-${item.icon}`"></i>
        <span slot="title">{{ item.label }}</span>
      </template>
      <el-menu-item-group>
        <el-menu-item
          @click="EventClick(item2)"
          v-for="item2 in item.children"
          :key="item2.name"
          :index="item2.path"
          >{{ item2.label }}</el-menu-item
        >
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>
  
<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.box {
  height: 100vh;
  border: none;
  .h3 {
    font-size: 16px;
    font-weight: 400;
    color: #fff;
    line-height: 48px;
    text-align: center;
  }
}
</style>
  
<script>
export default {
  data () {
    return {
    };
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath);
    },
    //菜单切换
    EventClick (item) {
      console.log(this.$route.path);
      // if(this.$route.path === item.path && )
      this.$router.push(item.path)
      this.$store.commit('selectMenu', item)

      this.$emit('EventClick', item)
    },

  },
  computed: {
    //菜单数据
    itemData () {
      //判断当前数据，如果缓存没有拿当前store
      return JSON.parse(localStorage.getItem('menu')) || this.$store.state.tad.menu
    },
    //没有子菜单
    noChildern () {
      return this.itemData.filter(item => !item.children)
    },
    //有子菜单
    Childern () {
      return this.itemData.filter(item => item.children)
    },
    isCollapse () {
      return this.$store.state.tad.isCollapse
    },
  }
}
</script>