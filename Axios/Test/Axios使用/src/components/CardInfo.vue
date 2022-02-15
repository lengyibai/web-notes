<template>
  <div class="Card" v-if="data.name">
    <img :src="imgUrl" />
    <span class="name">{{ data.name }}</span>
    <div class="bg" :style="{ backgroundImage: 'url(' + imgUrl + ')' }"></div>
  </div>
</template>
<script>
export default {
  name: "Card",
  props: {
    data: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {};
  },
  computed: {
    imgUrl() {
      return `https://game.gtimg.cn/images/yxzj/img201606/heroimg/${this.data.id}/${this.data.id}.jpg`;
    },
  },
  methods: {},
};
</script>
<style scoped lang="less">
* {
  line-height: 1;
}
.Card {
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 10px;
  margin-bottom: 10px;
  .bg {
    position: absolute;
    inset: 0;
    background-repeat: no-repeat;
    background-size: 200%;
    background-position: center;
    z-index: 0;
    filter: blur(25px) contrast(125%) brightness(75%);
  }
  img {
    width: 150px;
    border-radius: 50%;
    margin-bottom: 25px;
    z-index: 1;
  }
  .name {
    font-size: 50px;
    color: #fff;
    font-weight: bold;
    -webkit-box-reflect: below 5px
      linear-gradient(transparent, transparent 25%, rgba(0, 0, 0, 0.25));
    margin-bottom: 25px;
    z-index: 1;
  }
}
</style>
