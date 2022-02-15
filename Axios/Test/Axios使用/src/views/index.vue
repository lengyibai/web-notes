<template>
  <div class="index">
    <transition-group class="hero-list" name="fade" appear>
      <card
        v-for="item in heroList"
        :data="item"
        :style="{ opacity: item.isShow ? 1 : 0 }"
        :key="item.name"
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
        <div class="edit">
          <h1 class="title">操作</h1>
          <input type="text" v-model="name" placeholder="查询的英雄名" />
          <input type="text" v-model="new_name" placeholder="新名字" />
        </div>
        <div class="send">
          <div class="get btn" :class="{ disable: disable }" @click="get">
            获取信息
          </div>
          <div class="add btn" :class="{ disable: disable }" @click="add">
            添加到左边
          </div>
          <div class="patch btn" :class="{ disable: disable }" @click="patch">
            改名
          </div>
          <div class="del btn" :class="{ disable: disable }" @click="del">
            删除
          </div>
          <div class="addAll btn" :class="{ disable: disable }" @click="addAll">
            {{ adding ? "添加中..." : "添加所有英雄" }}
          </div>
          <div class="delAll btn" :class="{ disable: disable }" @click="delAll">
            {{ deling ? "删除中..." : "删除所有英雄" }}
          </div>
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
  getBackupUserList,
  getBackupUserInfo,
} from "@/api/test.js";
export default {
  name: "index",
  props: {},
  data() {
    return {
      heroList: [],
      name: "廉颇",
      new_name: "",
      heroInfo: {},
      disable: false,
      deling: false,
      adding: false,
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
  watch: {
    disable(v) {
      if (v) {
        console.warn("禁止点击");
      } else {
        console.warn("允许点击");
      }
    },
  },
  created() {
    getUserList().then((res) => {
      this.heroList = res.data;
    });
    /* getUserInfo(1).then((res) => {
      console.log(res);
    }); */

    /* getBackupUserInfo(1).then((res) => {
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
    //#####··········从列表匹配英雄索引··········#####//
    findIndex(id) {
      return this.heroList.findIndex((item) => {
        return item.id == id;
      });
    },

    //#####··········从列表匹配英雄数据··········#####//
    findName(name) {
      return this.heroList.find((item) => {
        return item.name == name;
      });
    },
    //#####··········获取某个英雄的数据··········#####//
    get() {
      //查询不能为空
      if (!this.name) return;

      //#··从备份中查找··#//
      getBackupUserList().then((res) => {
        this.heroInfo = res.data.find((item) => {
          return item.name === this.name;
        });
        // 如果没找到则从列表中查找
        if (!this.heroInfo) {
          this.heroInfo = this.heroList.find((item) => {
            return item.name === this.name;
          });
        }
        //查询完毕清空输入框
        this.name = "";
        // 如果为找到则返回空数据
        this.heroInfo = this.heroInfo || {};
      });
    },

    //#####··········从备份添加英雄到列表··········#####//
    add() {
      //添加的英雄信息不能为空 || 不能添加列表已有
      if (!this.heroInfo.id || this.findIndex(this.heroInfo.id) != -1) return;
      this.disable = true;
      addUser(this.heroInfo).then(() => {
        this.heroList.push(this.heroInfo);
        this.disable = false;
      });
    },

    //#####··········修改英雄名··········#####//
    patch() {
      //新名字不能为空 || 新名字不能重复 || 需要英雄的信息 id 不能为空 || 不能更改列表中不存在的数据
      if (
        !this.new_name ||
        this.findName(this.new_name) ||
        !this.heroInfo.id ||
        this.findIndex(this.heroInfo.id) == -1
      )
        return;
      this.disable = true;
      updateUser(this.heroInfo.id, { name: this.new_name }).then((res) => {
        // 更新英雄信息
        this.heroInfo.name = this.new_name;
        //更新列表信息
        this.$set(
          this.heroList[this.findIndex(this.heroInfo.id)],
          "name",
          this.new_name
        );
        // 清空输入框
        this.new_name = "";
        this.disable = false;
      });
    },

    //#####··········删除指定用户··········#####//
    del() {
      // 列表中无删除目标不执行操作
      if (this.findIndex(this.heroInfo.id) == -1) return;
      this.disable = true;
      delUser(this.heroInfo.id).then(() => {
        // 更新列表
        this.heroList.splice(this.findIndex(this.heroInfo.id), 1);
        // 清空英雄信息
        this.heroInfo = {};
        this.disable = false;
      });
    },

    //#####··········添加所有英雄到列表··········#####//
    addAll() {
      this.disable = true;
      this.adding = true;
      let that = this;

      //#··执行请求··#//
      function fn(item, index) {
        return new Promise((resolve) => {
          addUser(item).then((res) => {
            console.warn("请求添加成功");
            // 更新列表
            that.heroList.splice(index, 0, item);
            setTimeout(() => {
              resolve(res);
              // 回到底部
              if (index % 6 == 0) that.toBottom();
            }, 100);
          });
        });
      }

      //#··获取备份数据··#//
      getBackupUserList()
        .then(async (res) => {
          return new Promise(async (resolve) => {
            let flag = false;
            //循环备份数据
            for (let i = 0; i < res.data.length; i++) {
              // 查找本地是否存在相同数据
              flag = this.heroList.findIndex((item) => {
                return item.id == res.data[i].id;
              });
              if (flag != -1) {
                flag = false;
                continue;
              }
              await fn(res.data[i], i);
            }
            resolve();
          });
        })
        .then(() => {
          this.disable = false;
          this.adding = false;
        });
    },

    //#####··········删除所有英雄··········#####//
    async delAll() {
      //如果列表为空，不执行操作
      if (this.heroList.length === 0) return;
      this.disable = true;
      this.deling = true;
      window.scrollTo(0, 0);
      let that = this;

      //#··执行请求··#//
      function fn(id) {
        that.heroList.find((item, index) => {
          if (item.id == id) {
            item.isShow = false;
          }
        });
        return new Promise((resolve) => {
          delUser(id).then((res) => {
            console.warn("请求删除成功");
            setTimeout(() => {
              resolve(res);
            }, 100);
          });
        });
      }
      let timer;
      for (let i = 0; i < this.heroList.length; i++) {
        await fn(this.heroList[i].id);
        clearTimeout(timer);
        timer = setTimeout(() => {
          while (this.heroList.length != 0) {
            // 逐个删除列表数据
            this.heroList.splice(0, 1);
            console.warn("页面内删除完毕");
            this.disable = false;
            this.deling = false;
            this.heroInfo = {};
          }
        }, 300);
      }
    },

    //#####··········回到底部··········#####//
    toBottom() {
      let b =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      window.scrollTo({
        top: b,
        behavior: "smooth",
      });
    },
  },
};
</script>
<style scoped lang="less">
* {
  transition: all 0.5s;
  user-select: none;
  &:hover {
    transition: all 0s;
  }
}
.fade-enter {
  transform: translateX(-100%);
  opacity: 0;
}
.fade-leave-active {
  opacity: 0;
}
.fade-move {
  transition: all 1s;
}

.fade-leave-active {
  transform: translateY(-200%);
  position: absolute; /* 必须为绝对定位 */
}

.disable {
  cursor: not-allowed !important;
  pointer-events: none;
  opacity: 0.25;
}
.index {
  width: 100vw;
  display: flex;
  background-color: #000;
  @media screen and (max-width: 860px) {
    flex-direction: column-reverse;
  }
  .hero-list {
    position: relative;
    width: 75%;
    min-height: 100vh;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    align-content: flex-start;
    @media screen and (max-width: 1300px) {
      grid-template-columns: repeat(5, 1fr);
    }
    @media screen and (max-width: 1080px) {
      grid-template-columns: repeat(4, 1fr);
    }
    @media screen and (max-width: 860px) {
      width: 100%;
    }
    @media screen and (max-width: 660px) {
      grid-template-columns: repeat(3, 1fr);
    }
    @media screen and (max-width: 500px) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media screen and (max-width: 330px) {
      grid-template-columns: repeat(1, 1fr);
    }
  }
  .req {
    position: fixed;
    right: 0;
    width: 25%;
    height: 100vh;
    overflow-y: auto;
    overflow-x: hidden;
    @media screen and (max-width: 860px) {
      position: relative;
      width: 100%;
      height: 50vh;
    }
    @media screen and (max-width: 600px) {
      display: flex;
      height: 35vh;
    }
    @media screen and (max-width: 400px) {
      height: 50vh;
    }
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
      @media screen and (max-width: 1111px) {
        margin-bottom: 10px;
      }
    }
    .form {
      display: flex;
      flex-direction: column;
      align-items: center;
      color: #fff;
      @media screen and (max-width: 860px) {
        flex-direction: row;
      }
      @media screen and (max-width: 600px) {
        flex: 1;
        flex-direction: column;
      }
      .edit {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .title {
          font-size: 40px;
          margin-bottom: 25px;
          @media screen and (max-width: 600px) {
            font-size: 30px;
            margin-bottom: 10px;
          }
        }
        input {
          width: 90%;
          border: none;
          font-size: 25px;
          border-bottom: 2px solid #fff;
          color: #fff;
          text-align: center;
          margin-bottom: 25px;
          @media screen and (max-width: 600px) {
            margin-bottom: 10px;
            font-size: 20px;
          }
        }
      }
      .send {
        width: 100%;
        display: grid;
        grid-gap: 20px;
        padding: 25px;
        grid-template-columns: repeat(2, 1fr);
        @media screen and (max-width: 1111px) {
          grid-template-columns: none;
          padding: 10px 25px;
          grid-gap: 15px;
        }
        @media screen and (max-width: 860px) {
          grid-template-columns: repeat(3, 1fr);
        }

        @media screen and (max-width: 600px) {
          grid-template-columns: repeat(2, 1fr);
          overflow: auto;
        }

        @media screen and (max-width: 400px) {
          grid-template-columns: repeat(1, 1fr);
          grid-gap: 10px;
        }

        .btn {
          width: 100%;
          height: 50px;
          text-align: center;
          line-height: 50px;
          outline: 3px solid #fff;
          user-select: none;
          cursor: pointer;
          border-radius: 5px;
          @color: #fff;
          @color1: #2ecc71;
          &:nth-of-type(1) {
            outline-color: @color1;
            color: @color1;
            &:hover {
              color: @color;
              background-color: @color1;
            }
          }
          @color2: #3498db;
          &:nth-of-type(2) {
            outline-color: @color2;
            color: @color2;
            &:hover {
              color: @color;
              background-color: @color2;
            }
          }
          @color3: #f1c40f;
          &:nth-of-type(3) {
            outline-color: @color3;
            color: @color3;
            &:hover {
              color: @color;
              background-color: @color3;
            }
          }
          @color4: #e74c3c;
          &:nth-of-type(4) {
            outline-color: @color4;
            color: @color4;
            &:hover {
              color: @color;
              background-color: @color4;
            }
          }
          @color5: #a4b0be;
          &:nth-of-type(5) {
            outline-color: @color5;
            color: @color5;
            &:hover {
              color: @color;
              background-color: @color5;
            }
          }
          @color6: #57606f;
          &:nth-of-type(6) {
            outline-color: @color6;
            color: @color6;
            &:hover {
              color: @color;
              background-color: @color6;
            }
          }
          @media screen and (max-width: 600px) {
            height: 35px;
            line-height: 35px;
          }
        }
      }
    }
  }
}
</style>
