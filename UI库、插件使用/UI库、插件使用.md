<img src="http://lengyibai.gitee.io/img-bed/img/lyb.png" style="width:200px;margin:0 auto;border-radius:50%" />

<p style="font-size:50px;font-weight:bold;width:100%;text-align:center;color:#fff;text-shadow:0 0 15px">冷弋白</p>
<p style="text-align:center;color:#aaa;position: relative;top:-10px;text-shadow:0 0 10px"><a href='https://wpa.qq.com/msgrd?v=3&uin=1329670984&site=qq&menu=yes' style='text-decoration: none;
'>点击此处联系我</a></p>

# Vant UI

## 官网

> [https://vant-contrib.gitee.io/vant/#/zh-CN](https://vant-contrib.gitee.io/vant/#/zh-CN)

## 安装库

> npm i vant -S

## 按需引入插件

> npm i babel-plugin-import -D

**在`babel.config.js`配置**

```json
module.exports = {
  plugins: [
    ['import', {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true
    }, 'vant']
  ]
};
```

## 引入

> 在项目目录下创建`plugins`文件夹
>
> 并创建名为`vantUI.js`的文件
>
> 文件内按需引入

```js
import Vue from 'vue';
import { Button NavBar } from 'vant';

//每引入一个组件都需要使用，所以需要单独创建一个文件夹进行管理
Vue.use(Button);
Vue.use(NavBar);
```

> 然后在`main.js`内引入`vantUI.js`即可
>
> 现在在任何组件内都能使用，无需再次引入任何东西

```js
import '@/plugins/vantUI.js';
```

# betterScroll

## 官网

> [https://better-scroll.github.io/docs/zh-CN](https://better-scroll.github.io/docs/zh-CN)
>
> 移动端必备滚动
>
> 拥有弹簧效果

## 安装

> npm i -S better-scroll
>
> npm install @better-scroll/observe-image -S

## 引入

> 在需要使用此插件的组件内引入

```html
<div class="wrapper">
  <div class="content">
    <slot></slot>
  </div>
</div>

<script>
    import BScroll from 'better-scroll';
    import ObserveImage from '@better-scroll/observe-image';
    BScroll.use(ObserveImage);

    mounted() {
          this.scroll = new BScroll('.wrapper', {
          pullUpLoad: true, //上拉加载
          pullDownRefresh: true, //下拉刷新
          probeType: 3, //开启侦测滚动坐标
          bounceTime: 250, //回弹动画时间
          momentumLimitTime: 150, //手快速滑动低于多少开启惯性动画
          observeImage: true, //解决不确定高度的图片滑动问题
          bounce: { //回弹动画
              top: true,
              bottom: true,
              left: true,
              right: true
          },
          useTransition: false,//解决滑动抖动问题
      });
      //监听滚动坐标
      BScroll.on("scroll", position => {
        //发送出去后在<scroll @scroll="fn"></scroll>事件参数即坐标x,y
      	this.$emit('scroll', position);
    });
      BScroll.on("pullingUp", () => {
          /**
           * 上拉加载更多
           * 拖动到最底部会触发此事件
           */
          console.log("上拉加载更多");
          /**
           * 发送网络请求，请求更多页
           * 等数据请求完毕，并展示出来后
           */
          setTimeout(() => {
              //避免频繁调用请求，延迟两秒钟
              BScroll.finishPullUp();
          }, 2000);
      });
    },
    methods: {
      //页面滚动函数
      scrollTo(x, y, time = 300) {
        this.scroll.scrollTo(x, y, time);
      },
    },
  },
</script>
```

### Dom 结构

> `content`必须有高度，一般为`height: calc(100vh - 底部tab栏高度px)`

```html
<div class="wrapper">
  <ul class="content">
    <li>...</li>
    <li>...</li>
  </ul>
</div>
```

# ES6转ES5

## 安装

> npm install -g babel-cli
>
> npm install babel-preset-es2015 --save

## 转换

> babel es6.js --out-file es5.js --presets es2015 -w

