module.exports = {
  root: true,
  env: {
    es6: true, //启用 ES6 语法支持以及新的 ES6 全局变量或类型
    node: true, //Node.js 全局变量和 Node.js 作用域
    browser: true, //浏览器全局变量
  },
  extends: [
    "plugin:vue/essential",
    "eslint:recommended",
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    "no-unused-vars": "warn",
  },
};
