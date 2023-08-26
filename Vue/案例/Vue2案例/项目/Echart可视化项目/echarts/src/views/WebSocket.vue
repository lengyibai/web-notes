<template>
  <div class="WebScoket">
    <button @click="connect">连接</button>
    <button @click="send" :disabled="disabled">发送数据</button>
  </div>
</template>
<script>
export default {
  name: "WebScoket",
  data() {
    return {
      message: null,
      ws: null,
      disabled: true,
    };
  },
  components: {},
  methods: {
    connect() {
      this.ws = new WebSocket("ws://localhost:9528");
      this.ws.onopen = () => {
        console.log("连接服务端成功了");
        this.disabled = false;
      };
      this.ws.onclose = () => {
        console.log("连接服务端失败了");
        this.disabled = true;
      };
      this.ws.onmessage = (msg) => {
        console.log("已接收数据：", msg.data);
      };
    },
    send() {
      this.ws.send(
        JSON.stringify({
          action: "getData",
          socketType: "trendData",
          chartName: "trend",
          value: "",
        })
      );
    },
  },
};
</script>
<style scoped lang="less">
.WebScoket {
  width: 100%;
  height: 100%;
  background-color: #000;
}
</style>
