<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button
        :is-checked="isSelectAll"
        class="check-all"
        @click.native="unselect"
      />
    </div>
    <span>全选</span>
    <span>合计：{{ totalPrice }}</span>
    <div class="Settlement">
      <span>去结算({{ checkLength }})</span>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';

import CheckButton from '@/components/content/checkButton/CheckButton.vue';
export default {
  name: '',
  components: { CheckButton },
  props: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters(['cartList']),
    totalPrice() {
      return (
        '￥' +
        this.cartList
          .filter(item => {
            return item.isChecked;
          })
          .reduce((preValue, item) => preValue + item.price * item.count, 0)
          .toFixed(2)
      );
    },
    checkLength() {
      return this.cartList
        .filter(item => item.isChecked)
        .reduce((preValue, item) => preValue + item.count, 0);
    },
    isSelectAll() {
      if (this.cartList.length == 0) {
        return false;
      } else {
        return this.cartList.every(item => item.isChecked);
      }
    },
  },
  methods: {
    unselect() {
      if (this.isSelectAll) {
        this.cartList.forEach(item => {
          item.isChecked = false;
        });
      } else {
        this.cartList.forEach(item => {
          item.isChecked = true;
        });
      }
    },
  },
};
</script>
<style scoped>
.bottom-bar {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 1.25rem /* 40/32 */;
  background-color: #fff;
  border-top: 1px solid #ccc;
}
.check-content {
  position: relative;
  width: 40px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.check-all {
  position: relative;
  width: 15px;
  line-height: 15px;
}
.Settlement {
  position: relative;
  margin-left: auto;
  padding: 0 10px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ff5000;
  color: #fff;
}
</style>
