<template>
    <div class="tag">
        <el-tag class="tag-box" v-for="(item, index) in tag" :key="item.label" :closable="item.name !== 'home'"
            @close="handleClose(item, index)" @click="showInput(item)"
            :effect="$route.name == item.name ? 'dark' : 'plain'">
            {{ item.label }}
        </el-tag>
    </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
    data() {
        return {
        }
    },
    computed: {
        ...mapState({
            tag: state => state.tad.tadsLst
        })
    },
    methods: {
        ...mapMutations(['closeTag']),
        //删除tag
        handleClose(item, index) {
            // 调用vue中的store的mutations方法
            this.closeTag(item)
            const length = this.tag.length
            //删除之后的逻辑
            if (item.name == this.$router.name) {
                return
            }

            //表识删除的最后一项
            if (index == length) {
                this.$router.push({
                    name: this.tag[index - 1].name
                })
                this.$emit('EventClick', this.tag[index-1])

            } else {
                this.$router.push({
                    name: this.tag[index].name
                })
                this.$emit('EventClick', this.tag[index])

            }


        },
        //点击tag跳转
        showInput(item, index) {
            this.$router.push({ name: item.name })
            this.$emit('EventClick', item)
        },
    }
}
</script>

<style lang="less" scoped>
.tag {
    margin-left: 5px;

    .tag-box {
        margin-left: 15px;


    }
}
</style>