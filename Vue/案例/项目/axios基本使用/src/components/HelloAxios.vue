<template>
    <div>{{ weather }}</div>
</template>
<script>
    import { request } from '../network/request';
    export default {
        data() {
            return {
                weather: '',
            };
        },
        methods: {},
        component: {},
        created() {
            request({
                url: '/weather_mini',
                params: {
                    city: '自贡',
                },
            })
                .then(res => {
                    this.weather = res.data.data.forecast;
                    console.log(res);
                })
                .catch(err => {
                    console.log(err);
                });
        },
    };
</script>
<style scope></style>
