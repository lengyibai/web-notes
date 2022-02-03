<template>
    <div class="tab-bar-item" :style="activeStyle" @click="itemClick">
        <slot name="item-icon"></slot>
        <slot name="item-text"></slot>
    </div>
</template>

<script>
    export default {
        props: {
            path: String,
            activeColor: {
                type: String,
                default: "red",
            },
        },
        data() {
            return {};
        },
        computed: {
            isActive() {
                return this.$route.path == this.path; //判断是否处于活跃状态
            },
            activeStyle() {
                return this.isActive ? { color: this.activeColor } : {}; //如果处于活跃状态，给导航栏更改颜色
            },
        },
        methods: {
            itemClick() {
                if (this.$route.path !== this.path) {
                    //this.$router.push(path); //跳转到指定路由页面
                    this.$router.replace(this.path); //使用replace避免可前进后退
                }
            },
        },
    };
</script>

<style scoped>
    .tab-bar-item {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 1.531rem /* 49/32 */;
        text-align: center;
    }
</style>
