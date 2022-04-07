export default {
  props: {
    text: {
      type: String,
      default: "",
    },
  },
  template: "<li>{{text}}</li>",
  watch: {
    text() {
      console.log("修改了");
    },
  },
};
