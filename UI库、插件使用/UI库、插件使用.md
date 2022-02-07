<img src="http://lengyibai.gitee.io/img-bed/img/lyb.png" style="width:200px;margin:0 auto;border-radius:50%" />

<p style="font-size:50px;font-weight:bold;width:100%;text-align:center;color:#fff;text-shadow:0 0 15px">冷弋白</p>
<p style="text-align:center;color:#aaa;position: relative;top:-10px;text-shadow:0 0 10px"><a href='https://wpa.qq.com/msgrd?v=3&uin=1329670984&site=qq&menu=yes' style='text-decoration: none;
'>点击此处联系我</a></p>

# betterScroll

## 官网

> [https://better-scroll.github.io/docs/zh-CN](https://better-scroll.github.io/docs/zh-CN)
>
> 移动端必备滚动
>
> 拥有弹簧效果

## 安装

> `npm i -S better-scroll`

## 引入

> 在需要使用此插件的组件内引入

```js
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
},
```

# ES6转ES5

## 安装

> `npm install -g babel-cli`
>
> `npm install babel-preset-es2015 --save`

## 转换

> `babel es6.js --out-file es5.js --presets es2015 -w`

# 提交规范

> 提交自动格式化
>
> 只能通过`npx cz`提交

<!--安装-->

```shell
npx husky-init
npm i
npm i @commitlint/cli @commitlint/config-conventional commitizen cz-conventional-changelog-zh -D
npm i @commitlint/config-conventional @commitlint/cli -D
npx husky add .husky/commit-msg "npx --no-install commitlint --edit $1"

```

<!--package.json-->

```json
{
  "scripts": {
  "commit": "cz"
  },
  "config": {
    "commitizen": {
      "path": "./node_modules/cz-conventional-changelog-zh",
      "defaultType": "[Feat]",
      "types": {
        "[Feat] ": {
          "description": "新功能",
          "title": "Features"
        },
        "[Bug] ": {
          "description": "修复bug",
          "title": "Bug Fixes"
        },
        "[Docs] ": {
          "description": "文档增删改",
          "title": "Documentation"
        },
        "[Style] ": {
          "description": "样式修改",
          "title": "Styles"
        },
        "[Refactoring] ": {
          "description": "重构代码",
          "title": "Code Refactoring"
        },
        "[Pref] ": {
          "description": "性能优化",
          "title": "Performance Improvements"
        },
        "[Test] ": {
          "description": "增加测试",
          "title": "Tests"
        },
        "[Build] ": {
          "description": "构建系统外部修改",
          "title": "Builds"
        },
        "[CI] ": {
          "description": "对CI配置文件和脚本的更改",
          "title": "Continuous Integrations"
        },
        "[Chore] ": {
          "description": "除src目录或测试文件以外的修改",
          "title": "Chores"
        },
        "[Revert] ": {
          "description": "回退历史版本",
          "title": "Reverts"
        },
        "[Conflict] ": {
          "description": "修改冲突",
          "title": "Conflict"
        },
        "[Font] ": {
          "description": "字体文件更新",
          "title": "Fonts"
        },
        "[Delete] ": {
          "description": "删除文件",
          "title": "Delete Files"
        },
        "[Stash] ": {
          "description": "暂存文件",
          "title": "Stash Files"
        }
      }
    }
  }
}
```

> 将 `.husky > pre-commit`文件内的`npm`指令改为`npm run lint`
>
> 创建`commitlint.config.js`

<!--commitlint.config.js-->

```js
module.exports = {
  extends: ['@commitlint/config-conventional']
}
```

