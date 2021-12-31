module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  plugins: [
    [
      'import',
      {
        libraryName: 'vant',
        libraryDirectory: 'es',
        //自动按需修改vant组件样式
        style: name => `${name}/style/less`,
      },
      'vant',
    ],
  ],
};
