<template>
    <div class="box">
        <div class="box-letf">
            <el-button @click="btnoffs" class="btn" icon="el-icon-menu"></el-button>
            <!-- 面包屑 -->
            <el-breadcrumb separator="/" class="crumbs">
                <el-breadcrumb-item id="css" @click.native="coltCss(item)" v-for="item in tags" :key="item.path"
                    :to="{ path: item.path }">{{ item.label
                    }}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="box-reltf">
            <el-dropdown>
                <span class="el-dropdown-link">
                    <img class="imges" src="../assets/3da892c5e4a63f35ea9f12c162c8acb.jpg" alt="">
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>个人中心</el-dropdown-item>
                    <el-dropdown-item>退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
export default {
    data() {
        return {

        }
    },
    methods: {
        btnoffs() {
            this.$store.commit('collapesMenu')
            console.log(this.$store.state.tad.isCollapse);
        },
        coltCss(item) {
            var crumbss = document.querySelector('.crumbs')
            //拿到所有dom元素
            var c = crumbss.children
            //循环将所有的dom元素的color变成#9c9c9c
            for (var i = 0; i < c.length; i++) {
                // 判断原有的innerHTML等不等于穿过来的innerHTML 等于就
                if (c[i].querySelector('.is-link').innerHTML == item.label) {
                    c[i].querySelector('.is-link').style.cssText = 'color:#fff'
                } else {
                    c[i].querySelector('.is-link').style.color = "#9c9c9c";

                }
            }
            // //将点击某一个dom元素的color变成#fff
            // var linkcss = c[index].querySelector('.is-link')
            // linkcss.style.cssText = 'color:#fff'
        }
    },
    computed: {
        ...mapState({
            tags: state => state.tad.tadsLst
        }),
    },
    comments() {

    },
    mounted() {

    },
}
</script>

<style lang="less" scoped>
.box {
    background-color: #666b70;
    display: flex;
    height: 50px;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;

    // span {
    //     padding-left: 20px;
    //     color: #fff;
    // }

    .box-letf {
        display: flex;
        align-items: center;

        .crumbs {
            font-size: 16px;
            margin-left: 20px;

            /deep/.el-breadcrumb__item {
                .el-breadcrumb__inner {
                    font-weight: 700;

                    &.is-link {
                        color: #9c9c9c;

                        &:hover {
                            color: #fff !important;
                            cursor: pointer;
                        }
                    }
                }

                &:last-child {
                    .el-breadcrumb__inner {
                        color: #fff;
                    }
                }
            }
        }
    }

    .box-reltf {
        .imges {
            width: 40px;
            height: 40px;
            border-radius: 50%;
        }
    }

}
</style>