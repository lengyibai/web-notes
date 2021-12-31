<template>
  <div class="goods-item" @click="itemClick()">
    <img :src="showImage" v-lazy="showImage" alt="" />
    <div class="goods-info">
      <p>{{ goodsItem.title }}</p>
      <span class="price">{{ goodsItem.price }}</span>
      <span class="collect">{{ goodsItem.cfav }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoodsListItem',
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    showImage() {
      return this.goodsItem.image || this.goodsItem.show.img;
    },
  },
  methods: {
    itemClick() {
      //详情页需要后退返回，所以此处replace不可取
      this.$router.push('/detail/' + this.goodsItem.iid);
    },
  },
};
</script>

<style scoped>
.goods-item {
  padding-bottom: 1.25rem /* 40/32 */;
  position: relative;
  width: 48%;
  height: 9.375rem /* 300/32 */;
  box-sizing: border-box;
}

.goods-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0.156rem /* 5/32 */;
}

.goods-info {
  font-size: 0.375rem /* 12/32 */;
  position: absolute;
  bottom: 0.156rem /* 5/32 */;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}

.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 0.094rem /* 3/32 */;
}

.goods-info .price {
  color: var(--color-high-text);
  margin-right: 0.625rem /* 20/32 */;
}

.goods-info .collect {
  position: relative;
}

.goods-info .collect::before {
  content: '';
  position: absolute;
  left: -0.469rem /* 15/32 */;
  top: -1px;
  width: 0.438rem /* 14/32 */;
  height: 0.438rem /* 14/32 */;
  background: url('~@/assets/img/collect.svg') 0 0/0.438rem 0.438rem /* 14/32 */;
}
</style>
