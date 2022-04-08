<img src="http://lengyibai.gitee.io/img-bed/img/lyb.png" style="width:200px;margin:0 auto;border-radius:50%" />

<p style="font-size:50px;font-weight:bold;width:100%;text-align:center;color:#fff;text-shadow:0 0 15px">冷弋白</p>
<p style="text-align:center;color:#aaa;position: relative;top:-10px;text-shadow:0 0 10px"><a href='https://wpa.qq.com/msgrd?v=3&uin=1329670984&site=qq&menu=yes' style='text-decoration: none;
'>点击此处联系我</a></p>

# node

## 报node-sass错

> `npm config set sass_binary_site https://npm.taobao.org/mirrors/node-sass/`
>
> 再进行`npm i`

## 无法运行项目

> 运行项目未显示一大串加载代码且只有一行加载提示，并且加载过程中打开了浏览器空白页
>
> 如果`@vue/cli-service`为`@5`版本，则下载`@4`

## Webpack版本报错

> webpack < 5 used to include polyfills for node.js core modules by default

```js
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = defineConfig({
  configureWebpack: {
    plugins: [new NodePolyfillPlugin()]
  },
});
```

