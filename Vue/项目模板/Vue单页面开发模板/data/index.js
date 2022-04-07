import todoItem from "./src/components/common/TodoItem/index.js";

export default {
  data() {
    return {
      message: "lengyibai",
    };
  },
  methods: {
    fn() {
      this.message = "666";
    },
  },
  components: {
    "todo-item": todoItem,
  },
};
