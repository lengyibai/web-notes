<template>
  <div>
    <div class="container">
      <h3>添加用户</h3>
      <div class="form-group">
        <label>用户名</label>
        <input
          name="name"
          type="text"
          class="form-control"
          placeholder="请填写用户名"
          multiple="false"
          autocomplete="off"
          ref="name"
          v-model="data.name"
        />
        <span>{{ data.name }}</span>
      </div>
      <div class="form-group">
        <label>年龄</label>
        <input
          name="age"
          type="text"
          class="form-control"
          placeholder="请填写年龄"
          autocomplete="off"
          ref="age"
          v-model="data.age"
        />
        <span>{{ data.age }}</span>
      </div>
      <div class="form-group">
        <label>请选择爱好</label>
        <div>
          <label
            class="checkbox-inline"
            v-for="(item, index) in $store.state.hobby"
            :key="index"
          >
            <input type="checkbox" :value="item" v-model="data.hobbies" />
            {{ item }}
          </label>
        </div>
        <span>{{ data.hobbies }}</span>
      </div>
      <button @click="add" type="submit" class="btn btn-primary">
        添加用户
      </button>
    </div>
  </div>
</template>
<script>
  import { fn2 } from '../network/index';
  export default {
    name: '',
    data() {
      return {
        data: {
          name: '',
          age: '',
          hobbies: [],
        },
      };
    },
    methods: {
      add() {
        fn2(this.data).then(() => {
          if (this.$route.path !== '/list') {
            this.$router.replace('list');
          }
        });
      },
    },
  };
</script>
<style scoped></style>
