const path = require('path');
const myTheme = path.resolve(__dirname, './src/plugins/vantChange.less');
module.exports = {
  devServer: {
    port: 9527,
    open: true,
    hot: true,
  },
  configureWebpack: {
    resolve: {
      alias: {
        src: '@/',
      },
    },
  },
  publicPath: './',
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          hack: `true; @import "${myTheme}";`,
        },
      },
    },
  },
};
