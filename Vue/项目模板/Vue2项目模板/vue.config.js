module.exports = {
  devServer: {
    port: 9999,
    open: true,
    hot: true,
  },
  configureWebpack: {
    resolve: {
      alias: {
        src: "@/",
      },
    },
  },
  publicPath: "./",
};
