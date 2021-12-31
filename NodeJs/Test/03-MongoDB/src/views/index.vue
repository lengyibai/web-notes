<template>
  <div>
    <div class="container">
      <slot name="title"></slot>
      <form>
        <div class="form-group">
          <label>用户名</label>
          <input type="text" class="form-control" placeholder="请填写用户名" />
        </div>
        <div class="form-group">
          <label>密码</label>
          <input
            type="password"
            class="form-control"
            placeholder="请输入密码"
          />
        </div>
        <div class="form-group">
          <label>年龄</label>
          <input type="text" class="form-control" placeholder="请填写邮箱" />
        </div>
        <div class="form-group">
          <label>邮箱</label>
          <input type="email" class="form-control" placeholder="请填写邮箱" />
        </div>
        <div class="form-group">
          <label>请选择爱好</label>
          <div>
            <label class="checkbox-inline">
              <input type="checkbox" value="足球" /> 足球
            </label>
            <label class="checkbox-inline">
              <input type="checkbox" value="篮球" /> 篮球
            </label>
            <label class="checkbox-inline">
              <input type="checkbox" value="橄榄球" /> 橄榄球
            </label>
            <label class="checkbox-inline">
              <input type="checkbox" value="敲代码" /> 敲代码
            </label>
            <label class="checkbox-inline">
              <input type="checkbox" value="抽烟" /> 抽烟
            </label>
            <label class="checkbox-inline">
              <input type="checkbox" value="喝酒" /> 喝酒
            </label>
            <label class="checkbox-inline">
              <input type="checkbox" value="烫头" /> 烫头
            </label>
          </div>
        </div>
        <button type="submit" class="btn btn-primary">
          <slot name="title"></slot>
        </button>
      </form>
    </div>
  </div>
</template>
<script>
  export default {
    name: '',
    components: {},
    props: {},
    data() {
      return {};
    },
    computed: {},
    watch: {},
    mixins: [],
    beforeCreated() {},
    created() {},
    beforeMount() {},
    mounted() {},
    beforeUpdate() {},
    updated() {},
    activated() {},
    deactivated() {},
    beforeDestroy() {},
    destroyed() {},
    methods: {},
  };
</script>
<style scoped></style>
