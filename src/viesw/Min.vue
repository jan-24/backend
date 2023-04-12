<template>
    <el-container>
        <el-aside width="auto">
            <commpot-aside @EventClick="EventClick" />
        </el-aside>
        <el-container>
            <el-header>
                <commpot-header ref="header" />
            </el-header>
            <div>
                <commpon-tag @EventClick="EventClick" @EventClick2="EventClick2"/>
            </div>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import CommpotAside from "../components/CommpotAside.vue";
import CommpotHeader from "../components/CommpotHeader.vue";
import CommponTag from "../components/CommpotTag.vue"
export default {
    data() {
        return {

        }
    },
    components: {
        CommpotAside,
        CommpotHeader,
        CommponTag
    },
    methods: {
        EventClick(item) {
            this.$refs.header.coltCss(item)
        },
        EventClick2(item){
            console.log(item);
            this.$refs.header.coltCss(item)
        }
    }
}
</script>

<style>
.el-header {
    padding: 0;
}
</style>
