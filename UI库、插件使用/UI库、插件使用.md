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

# Element UI

## 表格自适应宽度(非分配)

```vue
<el-table-column label="标题" prop="title" :width="lyb('title',dataList)" />
<script>
  export default {
    computed(){
      lyb() {
        return function flexColumnWidth(str, tableData, flag = 'max') {
          // str为该列的字段名(传字符串);tableData为该表格的数据源(传变量);
          // flag为可选值，可不传该参数,传参时可选'max'或'equal',默认为'max'
          // flag为'max'则设置列宽适配该列中最长的内容,flag为'equal'则设置列宽适配该列中第一行内容的长度。
          str = str + '';
          let columnContent = '';
          if (!tableData || !tableData.length || tableData.length === 0 || tableData === undefined) {
            return;
          }
          if (!str || !str.length || str.length === 0 || str === undefined) {
            return;
          }
          if (flag === 'equal') {
            // 获取该列中第一个不为空的数据(内容)
            for (let i = 0; i < tableData.length; i++) {
              if (tableData[i][str].length > 0) {
                // console.log('该列数据[0]:', tableData[0][str])
                columnContent = tableData[i][str];
                break;
              }
            }
          } else {
            // 获取该列中最长的数据(内容)
            let index = 0;
            for (let i = 0; i < tableData.length; i++) {
              if (tableData[i][str] === null) {
                return;
              }
              const now_temp = tableData[i][str] + '';
              const max_temp = tableData[index][str] + '';
              if (now_temp.length > max_temp.length) {
                index = i;
              }
            }
            columnContent = tableData[index][str];
          }
          console.log('该列数据[i]:', columnContent);
          // 以下分配的单位长度可根据实际需求进行调整
          let flexWidth = 0;
          for (const char of columnContent) {
            if ((char >= 'A' && char <= 'Z') || (char >= 'a' && char <= 'z')) {
              // 如果是英文字符，为字符分配8个单位宽度
              flexWidth += 8;
            } else if (char >= '\u4e00' && char <= '\u9fa5') {
              // 如果是中文字符，为字符分配15个单位宽度
              flexWidth += 20;
            } else {
              // 其他种类字符，为字符分配8个单位宽度
              flexWidth += 9;
            }
          }
          if (flexWidth < 80) {
            // 设置最小宽度
            flexWidth = 80;
          }
          // if (flexWidth > 250) {
          //   // 设置最大宽度
          //   flexWidth = 250
          // }
          return flexWidth + 'px';
        };
      },
    }
  }
</script>
```



## 时间选择器

```vue
<el-date-picker
  :picker-options="pickerOptions"
/>
```

> 禁止选择未来时间

```js
data() {
  return {
    pickerOptions: {
      disabledDate(time) {
        return time.getTime() > Date.now();
      },
    },
  }
}
```

> 禁止选择过去时间

```js
data() {
  return {
    pickerOptions: {
      disabledDate(time) {
        return time.getTime() < Date.now() - 86400000;
      },
    },
  }
}
```

## 选择器远程搜索

```vue
<template>
	<el-select
    v-model="form_reg.organAdminMobile"
    filterable
    remote
    reserve-keyword
    placeholder="请输入关键词"
    :remote-method="remoteMethod"
    :loading="loading"
  >
    <el-option
      v-for="item in searchUser"
      :key="item.id"
      :label="item.mobile"
      :value="item.mobile"
    ></el-option>
  </el-select>
</template>
<script>
	import { users } from "@/api/system.js";
	export default {
    data(){
      return {
        form_reg: {
          organAdminMobile: 0
        }, // 机构注册表单
        searchUser: [],//搜索系统管理员手机号
        loading: false,//创建表单搜索手机号显示
      }
    }
    method:{
      /* 系统管理员设置远程搜索 */
      remoteMethod(v) {
        this.loading = true;
        users({ mobile: v }).then((res) => {
          this.loading = false;
          this.searchUser = res.data.data.records
        });
      },
  	}
  }
</script>
```



## 自定义排序

```html
<el-table
  @sort-change="sortChange"
>
  <el-table-column
    sortable="custom"
    prop="online"
  >
    <template slot-scope="scope">
      {{ ["未上线", "已上线"][scope.row.online] }}
    </template>
  </el-table-column>
</el-table>
<script>
export default {
  methods:{
    sortChange({ prop, order }){
      this.query_params.page = 1;
      if (order === 'ascending') {
        //升序
        this.query_params[prop] = 1;
      } else if (order === 'descending') {
        //降序
        this.query_params[prop] = 0;
      } else {
        //无序
        this.query_params[prop] = '';
      }
      this.getList();
    }
  }
}
</script>
```

## 导航栏

> 自定义激活图标颜色
>
> 通过原生关键字`currentColor`继承元素字体颜色，将其赋值给需要跟随导航改变颜色的`SVG`图标

```html
<el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{ 'submenu-title-noDropdown': !isNest }" >
  <svg t="1647187375349" class="icon el-icon-location" style="width:25px;height:25px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="903" width="200" height="200"><path d="M932.717651 806.428143c5.867413 39.912053 40.253181 34.04464 46.120594 51.578653 0 11.120794-5.935639 51.646879-22.992071 56.968485-17.124659 0-40.253181-5.867413-57.309614 0-11.257246 5.799187-23.060297 11.120794-29.064162 22.787395-11.18902 28.859484 11.257246 51.646879 0 62.767672-17.056433 11.120794-51.988007 28.859484-63.177027 17.056433-17.124659-17.056433-17.124659-39.980278-52.056233-39.980278-46.120594 0-46.120594 45.779466-69.112666 45.779465-22.992071 0-63.177027-16.988207-63.177027-34.112865 5.867413-22.787394 17.056433-39.912053-5.935638-62.767673-28.995936-22.787394-63.177027 0-75.048305-11.120794-17.124659-11.120794-23.060297-39.912053-17.124658-56.90026 5.867413-16.988207 46.052369-16.988207 46.052368-62.767673 0-34.112866-40.253181-39.912053-46.052368-62.767672-5.935639-16.988207 5.867413-45.71124 22.992071-51.646879 28.995936-11.120794 46.120594 11.120794 75.048305-11.120794 17.124659-16.988207 11.257246-56.90026 11.257245-68.635086 5.867413-16.988207 28.995936-22.787394 46.120595-22.787394 34.317543 0 22.992071 39.912053 69.112665 45.71124 46.120594 0 40.253181-16.919981 63.177027-45.71124 29.064162 0 52.056233 11.120794 57.309615 22.787394 11.257246 22.85562-11.18902 56.968486 23.060297 79.892332 28.995936 16.988207 57.309614-5.867413 75.048304 0 11.257246 5.867413 17.192884 22.85562 23.060297 45.779465-11.18902 33.430608-63.245253 27.49497-57.309614 79.141848z m-207.406223-114.482777c-138.430009 34.112866-86.373776 234.218935 46.052369 211.909121 132.903724-28.723033 115.23326-240.563928-46.120595-211.840895zM489.318624 491.907522c-138.361783 0-247.659404-108.547138-247.659405-245.885535C241.659219 108.478913 350.956841 0 489.38685 0c138.293557 0 247.659404 108.547138 247.659404 245.953761 0 131.470984-109.365847 245.885535-247.659404 245.885535z m201.53881 56.90026s-92.241189 0-86.30555 62.767673c5.867413 68.635086-86.373776 17.056433-103.430209 74.502498-22.992071 68.635086 11.18902 56.90026 28.995936 102.679726 11.18902 28.791259-46.120594 45.779466-40.253181 97.426344 11.257246 68.635086 69.112666 34.112866 86.373775 74.63895 11.18902 34.112866-28.995936 56.90026-121.168898 56.90026-74.980079 0-218.663469 0-270.651476-5.867413 0 0-149.550803-5.867413-149.550803-102.679726 0 0-5.867413-143.274036 86.373776-245.953761 0 0 98.108602-125.671797 264.715837-125.671797l304.969019 11.257246z" fill="currentColor" p-id="904" /></svg>
</el-menu-item>
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

