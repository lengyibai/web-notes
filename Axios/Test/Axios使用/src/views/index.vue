<template>
  <div class="index">
    <transition-group class="hero-list" name="fade" appear>
      <card
        v-for="item in heroList"
        :data="item"
        :key="item.name"
        v-show="item.isShow"
      >
      </card
    ></transition-group>
    <div class="req">
      <div class="bg" :style="{ backgroundImage: 'url(' + imgUrl + ')' }"></div>
      <div class="hero-info">
        <card-info :data="heroInfo">
          <div class="type">职业：{{ heroInfo.type }}</div>
          <div class="title">代号：{{ heroInfo.title }}</div>
        </card-info>
      </div>
      <div class="form">
        <h1 class="title">操作</h1>
        <input type="text" v-model="name" placeholder="查询的英雄名" />
        <input type="text" v-model="new_name" placeholder="新名字" />
        <div class="send">
          <div class="get btn" @click="get">获取信息</div>
          <div class="add btn" @click="add">添加到左边</div>
          <div class="patch btn" @click="patch">改名</div>
          <div class="del btn" @click="del">删除</div>
          <div class="addAll btn" @click="addAll">添加所有英雄</div>
          <div class="delAll btn" @click="delAll">删除所有英雄</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Card from "@/components/Card.vue";
import CardInfo from "@/components/CardInfo.vue";
import {
  getUserList,
  getUserInfo,
  addUser,
  editUser,
  updateUser,
  delUser,
} from "@/api/test.js";
export default {
  name: "index",
  props: {},
  data() {
    return {
      heroList: [],
      name: "鬼谷子",
      new_name: "",
      heroInfo: {},
    };
  },
  components: { Card, CardInfo },
  computed: {
    imgUrl() {
      return this.heroInfo.id
        ? `https://game.gtimg.cn/images/yxzj/img201606/heroimg/${this.heroInfo.id}/${this.heroInfo.id}.jpg`
        : "";
    },
  },
  created() {
    this.getAll();

    /* getUserInfo(1).then((res) => {
      console.log(res);
    }); */

    /* addUser({ name: "张三", age: 18 }).then((res) => {
      console.log(res);
    }); */

    /* editUser(4, { name: "李四", age: 21 }).then((res) => {
      console.log(res);
    }); */

    /* updateUser(3, { name: "666", age: 21 }).then((res) => {
      console.log(res);
    }); */

    /* delUser(4).then((res) => {
      console.log(res);
    }); */
  },
  methods: {
    getAll() {
      getUserList().then((res) => {
        this.heroList = res.data;
      });
    },
    get() {
      console.log(this.heroInfo);
      this.heroInfo = this.heroList.filter((item) => {
        return item.name === (this.name || "鬼谷子");
      })[0];
      this.name = "";
      this.heroInfo = this.heroInfo || {};
    },
    add() {
      updateUser(this.heroInfo.id, { isShow: true }).then((res) => {
        this.heroInfo.isShow = true;
      });
    },
    patch() {
      updateUser(this.heroInfo.id, { name: this.new_name }).then((res) => {
        this.heroInfo.name = this.new_name;
        this.new_name = "";
      });
    },
    del() {
      console.log(this.heroInfo);
      updateUser(this.heroInfo.id, { isShow: false }).then((res) => {
        this.heroInfo.isShow = false;
      });
    },

    all(item, flag) {
      return new Promise((resolve) => {
        updateUser(item.id, { isShow: flag }).then((res) => {
          item.isShow = flag;
          resolve(res);
        });
      });
    },
    async addAll() {
      for (let item of this.heroList) {
        await this.all(item, true);
        let timer;
        clearTimeout(timer);
        timer = setTimeout(() => {
          this.toBottom();
        }, 300);
      }
    },
    async delAll() {
      for (let item of this.heroList) {
        await this.all(item, false);
      }
    },
    toBottom() {
      let b =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      console.log(b);
      window.scrollTo({
        top: b,
        behavior: "smooth",
      });
    },
  },
};
</script>
<style scoped lang="less">
/* 进入前状态 */
.fade-enter,
.fade-leave-active {
  opacity: 0;
}

/* 进入和离开动画属性 */
.fade-leave-active,
.fade-enter-active {
  transition: all 0.5s;
}

.index {
  width: 100vw;
  display: flex;
  background-color: #000;
  overflow-x: hidden;
  .hero-list {
    position: relative;
    width: 75%;
    min-height: 100vh;
    display: grid;
    grid-template-columns: repeat(7, 1fr); //关键代码
    align-content: flex-start;
  }
  .req {
    position: fixed;
    right: 0;
    width: 25%;
    height: 100vh;
    overflow-y: auto;
    overflow-x: hidden;
    .bg {
      position: absolute;
      inset: 0;
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
      z-index: -2;
      filter: blur(25px) contrast(125%) brightness(75%);
    }
    .hero-info {
      display: flex;
      flex-direction: column;
      align-items: center;
      color: #fff;
      font-size: 35px;
      font-weight: bold;
      margin-bottom: 25px;
    }
    .form {
      display: flex;
      flex-direction: column;
      align-items: center;
      color: #fff;
      .title {
        font-size: 40px;
        margin-bottom: 25px;
      }
      input {
        border: none;
        font-size: 25px;
        border-bottom: 2px solid #fff;
        color: #fff;
        text-align: center;
        margin-bottom: 25px;
      }
      .send {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(2, 1fr); //关键代码
        grid-gap: 20px;
        padding: 25px;
        .btn {
          width: 100%;
          height: 50px;
          text-align: center;
          line-height: 50px;
          outline: 3px solid #fff;
          user-select: none;
          cursor: pointer;
          border-radius: 5px;
          &:nth-of-type(1) {
            outline-color: #2ecc71;
            color: #2ecc71;
          }
          &:nth-of-type(2) {
            outline-color: #3498db;
            color: #3498db;
          }
          &:nth-of-type(3) {
            outline-color: #f1c40f;
            color: #f1c40f;
          }
          &:nth-of-type(4) {
            outline-color: #e74c3c;
            color: #e74c3c;
          }
          &:nth-of-type(5) {
            outline-color: #a4b0be;
            color: #a4b0be;
          }
          &:nth-of-type(6) {
            outline-color: #57606f;
            color: #57606f;
          }
        }
      }
    }
  }
}
</style>
