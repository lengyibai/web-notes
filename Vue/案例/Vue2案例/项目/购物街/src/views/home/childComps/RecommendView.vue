<template>
    <div class="recommend">
        <div
            class="recommend-item"
            v-for="(item, index) in recommends"
            :key="index"
        >
            <a :href="item.link">
                <img :src="item.image" alt="" />
                <li>{{ item.title }}</li>
            </a>
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            recommends: {
                type: Array,
                default() {
                    return [];
                },
            },
        },
        data() {
            return {};
        },
        methods: {},
        components: {},
    };
</script>
<style scoped>
    .recommend {
        display: flex;
        text-align: center;
        padding: 0.313rem /* 10/32 */ 0;
        border-bottom: 0.25rem /* 8/32 */ solid #eee;
    }
    .recommend-item {
        flex: 1;
    }
    .recommend-item img {
        min-width: 58px;
        min-height: 58px;
        width: 2.031rem /* 65/32 */;
        height: 2.031rem /* 65/32 */;
    }
    .recommend-item li {
        margin-top: 0.313rem /* 10/32 */;
        color: #777;
    }
</style>
