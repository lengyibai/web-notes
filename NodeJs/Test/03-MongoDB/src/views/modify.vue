<template>
  <div>
    <div class="container">
      <h3>修改用户</h3>
      <div class="form-group">
        <label>用户名</label>
        <input
          name="name"
          type="text"
          class="form-control"
          placeholder="请填写用户名"
          ref="name"
          v-model="data.name"
        />
      </div>
      <div class="form-group">
        <label>年龄</label>
        <input
          name="age"
          type="text"
          class="form-control"
          placeholder="请填写年龄"
          ref="age"
          v-model="data.age"
        />
      </div>
      <div class="form-group">
        <label>请选择爱好</label>
        <div ref="label">
          <label
            class="checkbox-inline"
            v-for="(item, index) in $store.state.hobby"
            :key="index"
          >
            <input
              type="checkbox"
              :value="$store.state.hobby[index]"
              v-model="data.hobbies"
            />
            {{ item }}
          </label>
          <span>{{ data.hobbies }}</span>
        </div>
      </div>
      <button @click="modify" type="submit" class="btn btn-primary">
        修改用户
      </button>
    </div>
  </div>
</template>
<script>
  import { fn, fn3 } from '../network/index';
  export default {
    name: '',
    data() {
      return {
        data: {},
        hobbies: [],
      };
    },
    mounted() {
      fn(this.$route.params.id).then(res => {
        this.data = res.data;
        this.hobbies = res.data.hobbies;
      });
    },
    methods: {
      modify() {
        fn3(this.data).then(() => {
          if (this.$route.path !== '/list') {
            this.$router.push('/list');
          }
        });
      },
    },
  };
</script>
<style scoped></style>
