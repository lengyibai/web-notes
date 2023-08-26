<img class="lyb" src="http://lengyibai.gitee.io/img-bed/img/lyb.png" style="width:200px;margin:0 auto;border-radius:50%" />

<p style="font-size:50px;font-weight:bold;width:100%;text-align:center;color:#fff;text-shadow:0 0 15px">冷弋白</p>
<p style="text-align:center;color:#aaa;position: relative;top:-10px;text-shadow:0 0 10px"><a href='https://wpa.qq.com/msgrd?v=3&uin=1329670984&site=qq&menu=yes' style='text-decoration: none;
'>点击此处联系我</a></p>

# Less

## 起步

```shell
npm install less@3.0.4 less-loader@5 -D
```

## 配置全局less样式

> `cnpm i vue-cli-plugin-style-resources-loader style-resources-loader --save-dev`

<!--vue.config.js文件配置-->

```js
const path = require('path');
module.exports = {
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.join(__dirname, './src/style/common.less')],
    },
  },
};
```

