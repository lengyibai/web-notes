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
>
> `npm i node-polyfill-webpack-plugin`

```js
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = defineConfig({
  configureWebpack: {
    plugins: [new NodePolyfillPlugin()]
  },
});
```

## 端口被占用

> `cmd`输入`netstat -ano`
>
> `Ctrl + F`查找被占用的端口
>
> 记住最后一列的数字
>
> 打开任务管理器
>
> 点击详细信息
>
> 通过`PID`排序，找到后结束进程

# Git

## 打开网站快，push却很慢

> 打开`.gitconfig`
>
> `http、https`配置成`clash`代理地址

<!--.gitconfig-->

```
[user]
	name = lengyibai
	email = 1329670984@qq.com
[core]
	autocrlf = false
[http]
	proxy = http://127.0.0.1:7890
	postBuffer = 524288000
[https]
	proxy = http://127.0.0.1:7890
	postBuffer = 524288000
```

> `git push`停留在`writing objects`的问题原因：删除

```
解决方法：git config --global http.postBuffer 524288000
原理：因为http.postBuffer默认上限为1M,上面的命令是把git的配置里http.postBuffer的变量改大为500M2 , 文件大,上传慢
```

> `git push`停留在`total`，以上文件已解决

```
git config --global sendpack.sideband false
```

## 本地与远程文件夹的大小写不一致

> 将大小写不一致的文件夹移出来，再提交推送，再移进去，再提交推送

# css

### 字体图标transform不生效

> 字体图标为行内元素，行内元素无法设置`transform`，需要给字体图标设置`display: inline-block`

# js

### 返回顶部冲突

> 返回顶部与`scroll-behavior: smooth`冲突
>
> 该属性使滚动平滑，而返回顶部一直在修改滚动坐标，导致在抖动甚至返回顶部失效
