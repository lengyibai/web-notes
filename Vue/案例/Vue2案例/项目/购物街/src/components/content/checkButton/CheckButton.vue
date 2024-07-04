<template>
  <div class="check-button" :class="{ check: isChecked }">
    <img src="@/assets/img/tick.svg" alt="" srcset="" />
  </div>
</template>
<script>
  export default {
    name: '',
    components: {},
    props: {
      isChecked: {
        type: Boolean,
        default: false,
      },
      isCheck: {
        type: Boolean,
        default: false,
      },
    },
  };
</script>
<style scoped>
  .check-button {
    border-radius: 50%;
    border: 2px solid #ccc;
  }
  .check {
    background-color: red;
    border-color: #fff;
  }
</style>
