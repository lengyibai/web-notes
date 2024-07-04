<template>
  <div>
    <h1>当前数据</h1>
    <table>
      <thead>
        <th>姓名</th>
        <th>年龄</th>
        <th>兴趣</th>
        <th>时间</th>
        <th>操作</th>
      </thead>
      <tbody>
        <tr v-for="(item, index) in data" :key="index">
          <td>{{ item.name }}</td>
          <td>{{ item.age }}</td>
          <td>
            <span v-for="(item, index) in item.hobbies" :key="index"
              >{{ item }}
            </span>
          </td>
          <td>{{ item.time }}</td>
          <td>
            <button @click="Fn3(`/modify/${item._id}`)">修改</button>
            <button @click="Fn4(item._id)">删除</button>
          </td>
        </tr>
      </tbody>
    </table>
    <button type="button" @click="Fn2('/add')" class="btn btn-warning">
      添加
    </button>
  </div>
</template>
<script>
  import { fn1, fn2, fn3, fn4 } from '../network/index';
  export default {
    name: '',
    data() {
      return {
        data: {},
      };
    },
    mounted() {
      //获取数据
      this.refresh();
    },
    methods: {
      //刷新数据
      refresh() {
        fn1().then(res => {
          this.data = res.data;
        });
      },

      //添加数据
      Fn2(path) {
        if (this.$route.path !== path) {
          this.$router.push(path); //使用replace避免可前进后退
        }
      },

      //修改数据
      Fn3(path) {
        if (this.$route.path !== path) {
          this.$router.push(path); //使用replace避免可前进后退
        }
      },

      //删除数据
      Fn4(id) {
        //调用delete请求函数
        fn4(id).then(res => {
          this.refresh(); //重新加载服务器数据
        });
      },
    },
  };
</script>
<style scoped>
  body {
    display: flex;
    height: 100vh;
  }

  table {
    margin: auto;
    border-collapse: collapse;
  }
  th,
  td {
    padding: 5px;
    text-align: center;
    border: 1px solid #000;
  }

  thead {
    text-align: center;
  }
</style>
