<img src="http://lengyibai.gitee.io/img-bed/img/lyb.png" style="width:200px;margin:0 auto;border-radius:50%" />

<p style="font-size:50px;font-weight:bold;width:100%;text-align:center;color:#fff;text-shadow:0 0 15px">冷弋白</p>
<p style="text-align:center;color:#aaa;position: relative;top:-10px;text-shadow:0 0 10px"><a href='https://wpa.qq.com/msgrd?v=3&uin=1329670984&site=qq&menu=yes' style='text-decoration: none;
'>点击此处联系我</a></p>
# 指令

## 终端指令

| 指令                                                         | 释义                                 |
| ------------------------------------------------------------ | ------------------------------------ |
| npm init -y                                                  | 创建`package.json`                   |
| npm i                                                        | 一次性安装`dependencies`中的全部依赖 |
| npm i xxx@版本号                                             | 安装指定版本                         |
| npm i xxx@latest                                             | 安装最新版本                         |
| npm un -S xxx                                                | 删除 xxx 模块(包含依赖项)            |
| npm un -S -g xxx                                             | 删除全局模块 xxx                     |
| npm list -g                                                  | 查看全局安装的模块                   |
| npm update xxx                                               | 更新模块                             |
| npm install -g cnpm --registry=https://registry.npm.taobao.org | 安装淘宝镜像                         |
| npm config set registry http://registry.npm.taobao.org       | 切换镜像源                           |
| npm config get registry                                      | 查看当前使用的镜像源                 |
| npm config set registry https://registry.npmjs.org/          | 还原镜像源                           |

## 依赖命令

| 指令                     | 释义            |
| ------------------------ | --------------- |
| npm i element-ui -S      | 安装 element-ui |
| npm install axios --save | 安装 axios      |

## vscode无法使用脚本

> 以管理员身份运行vscode;
>
> get-ExecutionPolicy
>
> set-ExecutionPolicy RemoteSigned
>
> get-ExecutionPolicy

# 配置别名

> 配合别名插件使用

```json
configureWebpack: {
  resolve: {
    alias: {
      src: '@/',
    },
  },
},
```

# Vue

## Vue 页面顺序规范

```html
<template>
  <div>vue页面规范</div>
</template>
<script>
  // 模块系统
  import a from './module/a.vue';
  import moment from 'momnet';
  export default {
    name: 'MyComponentName',
    components: {},
    props: [],
    data() {
      return {};
    },
    computed: {},
    watch: {},
    mixins: [],
    beforeCreated() {},
    created() {},
    beforeMount() {},
    mounted() {},
    beforeUpdate() {},
    updated() {},

    //以下两个函数必须将router-view标签使用keep-alive标签包裹起来才能生效
    activated() {},
    deactivated() {},
    beforeDestroy() {},
    destroyed() {},
    methods: {},
  };
</script>

<style scoped>
  // 页面样式
</style>
```

## 生命周期函数

> `beforeCreated(){}`：在实例初始化之后调用，数据观测 `data observer`和 `event/watcher` 事件配置之前被调用
>
> `created(){}`：在实例创建完成后被立即调用，但挂载阶段还没开始，`$el`属性目前不可见。
>
> `beforeMount(){}`：在挂载开始之前被调用：相关的`render`函数首次被调用。该钩子在服务器端渲染期间不被调用
>
> `mounted(){}`：模板上的东西被挂载到`dom`上面后就会回调此函数
>
> `beforeUpdate(){}`：`data`数据发生改变时调用
>
> `updated(){}`：`Dom`发生改变时调用
>
> 以下两个函数必须将`router-view`标签使用`keep-alive`标签包裹起来才会生效
>
> 详情：[keep-alive](#keep-alive)
>
> `activated(){}`：跳转到当前页面，就会执行此函数
>
> `deactivated(){}`：从当前页面跳转到其他页面时调用
>
> `beforeDestroy(){}`：实例销毁之前调用，在这一步实例仍然完全可用。未使用`keep-alive`进行缓存就会被销毁
>
> `destroyed(){}`：实例销毁后调用

## Vue 函数

### nextTick

> 当在函数内添加一个 Dom 元素，此时元素还未渲染，如果紧接着又要对这个 Dom 元素进行操作，需要把操作的代码写进`this.$nextTick(()=>{})`内，因为渲染 Dom 是异步操作，相当于进行了同步处理

### Vue.set()更新视图

> 给对象新增一个属性虽然数据改变了，但视图未更新
>
> `Vue.set()`能够解决这个问题
>
> `Vue.set(object, key, value)`

```js
fn(state) {
    // state.obj['master'] = '冷弋白'; //这样并不会添加进页面
    this.$set(state.obj/state.arr, 'master'/index, '冷弋白');
  
  	//利用新对象替换老对象
  	state.obj = { ...state.obj, master: 123 }
},
```

## Vue 属性

### 计算属性

#### computed

> 计算属性用于存放会计算返回的函数
>
> 多次调用内部函数时，计算属性只会调用一次，只有数值改变才会调用，它会把计算结果缓存，提升性能
>
> 但里面的函数不能用于事件调用，因为事件调用还未触发就已经执行了

```html
<p v-for="(item, index) in arr" :key="index">
  {{ fn }}
  <!-- 这里循环调用了10次 -->
</p>
<script>
      data: {
          arr: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
      },
      computed: {
          fn() {
              console.log('触发计算'); //但这里只出发了一次
              return this.arr.filter(item => {
                  return item % 2 == 0;
              })
          }
      },
      /*computed: {
          fn() {//有参调用
          	return function (a){
              	return a;
              }
          }
      }*/
  });
</script>
<!-- 如果把computed改成methods，‘触发计算’就会触发10次 -->
```

### 侦听器

#### watch

> 如果监听的变量发生改变，就会触发监听函数，参数为改变后的值
>
> 监听事件的函数名与被监听的变量名相等

```html
<script>
  data: {
      name: '冷弋白'
    obj: {
      name: '冷弋白'
    }
  },
  watch: {
      name(newVal,oldVal) {//新值和旧值
          console.log('已触发');
          console.log(newVal); //冷弋彩
      }
    obj: {
      deep:true, //深度监听设置为 true
        name() {
          console.log('已触发');
      }
    }
  }
</script>
```

### 过滤器

#### filters

> 在使用这个变量之前修改它的内容

```js
filters: {
    lyb(price) {
        //保留两位小数并给小数加上人民币前缀
    	return '￥' + price.toFixed(2);
    }
}
```

```html
<!-- 在双花括号中 -->
{{ message | lyb }}

<!-- 在 `v-bind` 中 -->
<div :id="rawId | lyb"></div>
```

## 标签属性

### $refs

> 给组件标签加入`ref="lyb"`
>
> vue 实例通过`this.$refs.lyb`获取该组件的属性值，如果是给`Dom`元素`ref`则不需要`$el`
>
> 如果想获取该组件的`Dom元素`，写成`this.$refs.lyb.$el`即可
>
> 也可以在直接在父组件内修改子组件的变量`this.$refs.lyb.index`
>
> 循环设置`:ref`获取`refs`中的`ref`是数组，调用`this.$refs[index][0]`

```html
<tab-control ref="lyb" />
<script>
    data(){
      return {
        currentIndex
      }
    }
    methods: {
     this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop;
    this.$refs.tabControl.currentIndex = this.currentIndex;
  },
</script>
```

### v-bind:

> `v-bind:src='图片地址'`|| `:src='图片地址'`
>
> _建议把图片链接写进变量，再使用变量_
>
> v-bind:属性=表达式
>
> 设置元素属性如 `src`,`title`,`class` 等等
>
> 可以省略`v-bind`

#### .sync

> 子组件将支持修改父组件的传值

```html
<!--父组件-->
<comp :foo.sync="bar"></comp>

<!--子组件-->
<script>
  //当子组件需要更新父组件值
  this.$emit('update:foo', 'lyb')
</script>
```

#### :class

> 判断条件添加：
>
> `:class='{类名:flag}'`或`:class='{类名:flag, 类名:flag}'`
>
> 批量添加：
>
> `:class="['类名', '类名']"` || `:class="数组名"`
>
> 可以存入变量内 `a:['类名',{类名:flag}]`
>
> 如果有非法字符如`-`，可以使用引号引起来

```html
<div :style="a">你好</div>
<script>
        data: {
            a: [{
                width: '100px',
                height: '100px',
                backgroundColor: '#000'
            }, {
                color: 'red'
            }],
            b:{
                width: '100px',
                height: '100px',
                backgroundColor: '#000'
            }
        }
</script>
```

### v-for

> `v-for='(item, index) in arr'`
>
> 并且是同步修改，也就是数组长度或元素发生了改变，会重新生成
> 可将`arr`改为数字
>
> 注：不要使用对象或数组之类的非基本类型值作为 `v-for` 的 `key`。请用字符串或数值类型的值。

> 循环对象

```html
<div v-for="(value, name, index) in object">
  下标：{{index}}
  属性名：{{name}}
  属性值：{{value}}
</div>
<script>
  data(){
    return {
      user: {
        year: '2000',
        author: '冷弋白',
        age: '21'
      }
    }
  }
</script>
```

#### 关于循环动态设置图片路径

```html
<div v-for="item in imgs" :key="item.id">
  <img :src="item.url" alt="" />
</div>
<script>
  data() {
  return {
    imgs: [
      {
        url: require('./img/0.png'),
      },
      {
        url: require('./img/1.png'),
      },
      {
        url: require('./img/2.png'),
      },
    ],
  };
</script>
```



### v-html

> `v-html='<h1>你好世界</h1>'`
>
> 相当于 innerHTML，但不同的是可以进行+字符串拼接

### v-if

> `v-if='true'`与`v-show`效果一样，但它隐藏元素原理是从`Dom`树里删除元素，反之又添加回来，频繁操作，对性能消耗大

#### v-else-if

> 需要写在带有`v-if`的标签的闭合标签下方

#### v-else

> 需要写在带有`v-if`的标签的闭合标签下方

```html
<div v-if="type === 'A'">A</div>
<div v-else-if="type === 'B'">B</div>
<div v-else-if="type === 'C'">C</div>
<div v-else>Not A/B/C</div>
```

### v-model

> `v-model='变量'`
>
> 只适用于表单元素，特别是单/复选框，且单选框加了此属性，可以省略`name`，返回一个`Boolean`值

#### 复选框数组存值

> 选中一个值，会将值按照点击顺序存进数组，选中状态也会随着数组元素改变
>
> 注意：`value`必填

```html
<input type="checkbox" id="a" value="冷" v-model="arr" />
<label for="a">冷</label>
<input type="checkbox" id="b" value="弋" v-model="arr" />
<label for="b">弋</label>
<input type="checkbox" id="c" value="白" v-model="arr" />
<label for="c">白</label>
<script>
	new Vue({
  data: {
    arr: []
  }
})	
</script>
```

#### 修饰符

| 修饰符  | 使用                  | 描述                                                         |
| ------- | --------------------- | ------------------------------------------------------------ |
| .lazy   | v-model.lazy="变量"   | 需要等输入框失去焦点或敲回车才会同步变量值                   |
| .number | v-model.number="变量" | 自动将输入的值转换为数字类型<br />但开始输入数字后，会自动清除后面的字符串及数字 |
| .trim   | v-model.trim="变量"   | 自动过滤用户输入的首尾空白字符                               |

#### radio

```html
	男：<input type="radio" name="sex" value="男" v-model="sex" /> 
  女：<input type="radio" name="sex" value="女" v-model="sex" />
  <b>性别：{{ sex }}</b>
<script>
  let app = new Vue({
    el: '.app',
    data: {
      sex: '男', //默认选中男
    },
    methods: {},
  });
</script>
```

#### checkbox

> 可将多个选中的值实时追加进数组，取消选中自动删除添加进去的

```html
<input type="checkbox" v-model="isAgree" />
<button :disabled="!isAgree">下一步</button>
<script>
  new Vue({
    data: {
      isAgree: false,
    },
  });
</script>
```

#### select

> 当`select`设置了多选`multiple`时，会自动将多选值存进数组

```html
<div class="app">
  <select v-model="fruit" multiple>
    <option disabled="disabled" value>请选择</option>
    <option value="香蕉">香蕉</option>
    <option value="苹果">苹果</option>
    <option value="雪梨">雪梨</option>
  </select>
  <br />
  <b>{{ fruit }}</b>
</div>
<script>
  new Vue({
    data: {
      fruit: '',
    },
    methods: {},
  });
</script>
```

### v-on

> `v-on:click="函数名"`，也可以`@click="函数名"`，但在`for`循环内需要加括号
>
> 可以传递参数`@click='fn(a, b)'`
>
> 绑定多个事件：
>
> `v-on="{mousedown: fn1, mouseup: fn2}"`
>
> `@click="fn1(), fn2()"`

#### 事件

| 事件    | 使用                                  | 描述                                                      |
| ------- | ------------------------------------- | --------------------------------------------------------- |
| $event  | @click="fn($event)"，fn(e) {}         | 在事件函数的小括号内加入 `$event`，可传递事件对象         |
| @input  | @input='fn'                           | 在输入框输入时触发                                        |
| @keyup. | @keyup.enter='fn' \|\| @keyup.13='fn' | 后面接键盘的 ASCLL 码值                                   |
| @play   | @play='fn'                            | 只能写在 audio 标签内，监听音乐是否播放                   |
| @pause  | @pause='fn'                           | 只能写在 audio 标签内，监听音乐是否暂停                   |
| @load   | @load='fn'                            | 写在某个带有`src`属性的标签里，等资源加载完后触发，如图片 |

#### 事件修饰符

| 修饰符   | 使用                 | 描述                                                         |
| -------- | -------------------- | ------------------------------------------------------------ |
| .native  | @click.native="fn"   | 组件无法监听事件，加入此修饰符即可                           |
| .stop    | @click.stop='fn'     | 阻止冒泡，父子元素都注册了点击事件，触发子元素不会触发父元素 |
| .self    | @click.self          | 只会阻止自己身上的冒泡，也就是只阻止一层冒泡                 |
| .prevent | @submit.prevent='fn' | 阻止默认行为，提交事件不再重载页面                           |
| .capture | @click.capture='fn'  | 捕获：先触发父元素，再触发子元素                             |
| .once    | @click.once          | 只会执行一次插值，如实时监听修改、.prevent，{{  }}           |

#### 按键修饰符

| 按键码  | 使用          | 描述                      |
| ------- | ------------- | ------------------------- |
| .enter  | @keyup.enter  | 回车，用在输入框          |
| .delete | @keyup.delete | 退格和`del`键，用在输入框 |
| .esc    | @keyup.esc    | 退出，用在输入框          |
| .space  | @keyup.space  | 空格，用在输入框          |
| .up     | @keyup.up     | 方向，用在输入框          |
| .down   | @keyup.down   | 方向，用在输入框          |
| .left   | @keyup.left   | 方向，用在输入框          |
| .right  | @keyup.right  | 方向，用在输入框          |
| .tab    | @keyup.tab    | `tab`键盘                 |

#### 系统修饰键

| 修饰键 |
| ------ |
| .ctrl  |
| .alt   |
| .shift |

#### 组合按键

| 使用                  | 描述                                          |
| --------------------- | --------------------------------------------- |
| @click.ctrl.exact     | 只有按住ctrl才能点击                          |
| @click.exact          | 只有没有按住系统修饰符才会触发                |
| @keyup.ctrl.67        | ctrl + c快捷键，用在输入框                    |
| @keyup.67             | c键，用在输入框                               |
| @keyup.67.click.exact | 只有点击了，再点击C才会触发，并且可以多次触发 |

#### 鼠标按键

| 按键    | 使用          | 描述     |
| ------- | ------------- | -------- |
| .left   | @click.left   | 鼠标左键 |
| .right  | @click.right  | 鼠标右键 |
| .middle | @click.middle | 鼠标中键 |



### v-show

> `v-show='true'`
>
> true:显示，false:隐藏，

### v-text

> `v-text='你好世界'`
>
> 相当于 innerText，但不同的是可以进行+字符串拼接，{{变量名}}与这个的效果是一样的

## 组件化

> 问：为什么组件内只能使用 data 函数来返回对象
>
> 答：因为对象直接返回对象是返回的内存地址，修改对象内的值，其他地方使用的组件内的值会同步修改

### 父传子 props

> 子组件无法修改父组件传递过来的值，但子组件可以修改对象

`App.vue`

```html
<hello-vuex :lyb="lyb" /><!-- 通过a来接收变量 -->
<script>
  data() {
      return { 
        a: '冷弋白',
        b: [1, 2, 3]
      };
  },
</script>
```

`lyb.vue`

```js
props: {
    a: {//接收a传递过来的值
        type: String,//限制只能传递字符串
        default: '冷弋白',//默认值
    },
    b: {
        type: Array,
        default() {
            return [];
            /**
            * 数组及对象类型特殊
            * 必须使用函数返回值来设置默认值
            */
        },
    },
};
```

### 子传父$emit

> 子组件通过`this.$emit('item-click', item)`发射事件及参数，父组件直接`@item-click="自定义参数名"`接收
>
> 子组件触发事件就会触发父组件使用的那个事件

`子组件:lyb`

```html
<!-- 点击就会触发父组件内的函数 -->
<button @click="fn">{{ send }}</button>
<script>
  methods: {
      fn() {
        this.$emit('lyb', '冷弋白');
      },
   },
</script>
```

`父组件`

```html
<lyb @lyb="ljk" />
<script>
  methods:{
      ljk(name) {
        console.log(name);
      },
   }
</script>
```

### 父访问子

#### $children

> 通过`this.$children[0].变量/函数`或`this.$refs.ref.变量/函数`获取

`子组件`

```html
<button @click="fn">{{ send }}</button>

<script>
  export default {
    components: {},
    data() {
      return {
        index: 666,
      };
    },
  };
</script>
```

`父组件`

```html
<lyb ref="lyb" />

<button @click="fn">获取</button>

<script>
  export default {
    name: 'App',
    components: { Lyb },
    methods: {
      fn() {
        //通过$children获取子组件变量
        console.log(this.$children[0].index);
        //通过$refs获取子组件变量
        console.log(this.$refs.lyb.index);
      },
    },
  };
</script>
```



### slot 插槽

> 只有使用插槽才能往父组件内的子组件标签里塞元素
>
> 由于插槽会被替换，插槽内的`:class v-if`等就会失效，所以必须包裹一个 div，给添加这些来进行判断增加样式

`App.vue`

```html
<template>
  <div>
    <page-one>
      <span slot="right">搜索</span>
    </page-one>
  </div>
</template>

<script>
  import pageOne from './views/pageOne.vue';
  export default {
    components: { pageOne },
  };
</script>
```

`page.vue`

```html
<template>
  <div>
    <slot name="left"><span>返回</span></slot>
    <!-- 默认为返回 -->
    <input type="text" />
    <slot name="right"><span>取消</span></slot>
  </div>
</template>
```

#### 新版插槽

> 以上插槽已废弃：因为需要标签才能把内容塞进子组件，无法将纯文本塞进去，这并不优雅
>
> 插槽内容的类名，在组件那边也会生效

```html
<!-- 旧版 -->
<span slot="lyb">冷弋白</span>
<!-- 会连同span标签塞进子组件 -->

<!-- 新版 -->
<template v-slot:lyb>
  冷弋白
</template>
<!-- 只会把纯文本塞进子组件 -->
```

### 组件v-model

> 语法糖

`lyb`

```js
this.$emit('input', this.value);
```

`App.js`

```html
<lyb v-model="value"></lyb>
<script>
export default {
    data() {
      return {
        value: '',
      };
    },
    components: { BigInput },
    watch: {
      value() {
        console.log(this.value);
      },
    },
    methods: {},
  };
</script>
```

## mixins 混入

> 在 js 文件创建一个 Vue 实例
>
> 将 js 内的组件引入到组件当中，会把 js 文件内的实例混入到当前组件中，实现组件功能复用
>
> 例如回到顶部按钮

**抽离到单独的 js 文件**

```js
import BackTop from '@/components/content/backTop/BackTop.vue';

//混入返回顶部
export const backTopMixin = {
  components: {
    BackTop,
  },
  data() {
    return {
      isShowBackTop: false,
    };
  },
  methods: {
    backClick() {
      this.$refs.scroll.scrollTo(0, -150, 0);
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
    listenShowBackTop(position) {
      this.isShowBackTop = -position.y > 1000;
    },
  },
};
```

**导入**

```js
import Vue from 'vue';
import { backTopMixin } from './mixins/mixins.js';

//在main.js全局混入（不常用）
new Vue({
  mixins: [backTopMixin],
  render: h => h(App),
}).$mount('#app');

//组件内混入
export default {
  mixins: [backTopMixin],
};
```

### Vue.prototype

> 直接`this.$lyb.lyb()`就能使用

`main.js`

```js
import Vue from 'vue';
const lyb = {
  a: '冷弋白',
  lyb() {
    console.log('555');
  },
};
Vue.prototype.$lyb = lyb;
```

## event bus

> 事件总线：子组件与子组件之间互相修改数据
>
> 实则只要组件引入了事件总线，都可以接收任何组件发送的事件参数

`main.js`

```js
Vue.prototype.$bus = new Vue(); // event Bus 用于无关系组件间的通信。
```

`子组件1`

> 向`$bus`发送一个事件

```html
<script>
  import { eventBus } from '@/main.js';
  export default {
    fn() {
      this.$bus.$emit('change', 'lengyibai');
    },
  };
</script>
```

`子组件2`

> 接收发送的事件参数

```html
<script>
  import { eventBus } from '@/main.js';
  export default {
    data() {
      return {
        lyb: '冷弋白',
      };
    },
    created() {
      this..$on('change', value => {
        this.lyb = value;
      });
    },
  };
</script>
```

## Vue API

> `this`方法

| API       | 描述                      |
| --------- | ------------------------- |
| $children | 当前组件下的子组件        |
| $el       | 组件的`Dom`元素           |
| $parent   | 当前组件的父组件          |
| $refs     | 获取所有设置了`ref`的组件 |

## 过渡/动画

<!--过渡效果-->

```css
/* 进入前状态 */
.fade-enter,
.fade-leave-active {
  opacity: 0;
}

/* 进入动画属性 */
.fade-enter-active {
  transition: all 0.25s;
}

/* 离开动画属性 */
.fade-leave-active {
  transition: all 0.1s;
}
```

<!--动画效果-->

```css
.bounce-enter-active {
  animation: bounce-in 0.5s;
}

.bounce-leave-active {
  animation: bounce-out 0.5s;
}

@keyframes bounce-in {
  0% {
    transform: translateX(100%) scale(0.5);
  }

  50% {
    transform: translateX(0%) scale(0.5);
  }

  100% {
    transform: translateX(0%) scale(1);
  }
}

@keyframes bounce-out {
  0% {
    transform: translateX(0%) scale(1);
  }

  50% {
    transform:
      translateX(0%) scale(0.5);
  }

  100% {
    transform: translateX(-100%) scale(0.5);
  }
}
```

### 单组件过渡

```html
<transition name="slide-fade">
  <p v-if="show">hello</p>
</transition>
```

### 多组件过渡

> 注意：循环的`key`不能为`index`

```html
<transition-group name="list" tag="p">
  <span v-for="item in items" :key="item">
    {{ item }}
  </span>
</transition-group>
```

# Vue CLI

## 安装

> npm i -g @vue/cli
>
> npm i -g @vue/cli-service
>
> vue -V
>
> 卸载：C:\Users\13296\AppData\Roaming\npm

## 关闭 Eslint 指定的报错

> 在`package`加入，引号内使用报错信息末尾

```json
"rules": {
    "vue/no-unused-components": "off",
    "vue/require-v-for-key": "off"
},
```

<img src="img/closeEslint-01.png" alt="image-20210609152406239" style="zoom: 67%;" />

# Vue Router

## 安装

> npm i vue-router -S

`main.js`

```js
import store from './store';
```

```js
<router-link :to="...">
//等同于
this.router.push('...')

<router-link :to="..." replace>
//等同于
this.router.replace(...)
```

## router-link 属性

> 将会被渲染为一个`标签`

| 属性               | 描述                                                   |
| ------------------ | ------------------------------------------------------ |
| to                 | 当被点击后，内部会立刻把 `to` 的值传到 `router.push()` |
| tag                | 可以更改组件标签的类型，如按钮 `tag="button"`          |
| replace            | 直接替换地址栏，所以不能前进后退，该属性没有属性值     |
| router-link-active | 自带类名，自动添加进被点击的导航内                     |

## 自定义标签跳转

**路由代码跳转**

> `if`语句用于判断当前路由信息的路径是否为路标路由信息，因为重复跳转会报错，而使用`router-link`则不会
>
> 如果要满足一定条件才能点击，可以使用`pointer-events: none`鼠标穿透

```html
<button @click="fn('/2')">点击</button>
<!-- 自定义标签跳转（不推荐使用），如果使用的路径存在路由嵌套，需要将路由嵌套的完整路径复制给函数的参数 -->
```

```js
methods: {
    fn(path) {
        //this.$router.push(path); //跳转到指定路由页面
        this.$router.replace(path); //使用replace避免可前进后退
    },
}
```

> 解决连续点击路由报错
>
> 在引入路由后重写路由方法

```js
import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};
```

## 重定向

> 传递`name`或`path`

| API      | 描述                           |
| -------- | ------------------------------ |
| redirect | 直接跳转到重定向路径           |
| alias    | 地址栏不变，但路由匹配到`path` |



## 路由懒加载

```js
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const list = () => import('../views/list');

const routes = [
  {
    path: '/',
    redirect: 'list',
  },
  {
    meta: {
      title: '用户列表',
    },
    path: '/list',
    component: list,
  },
];

const router = new VueRouter({
  routes,
  mode: 'history',
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
});

export default router;

```

### 按组分块懒加载(不常用)

> 加入特殊注释，如果`webpackChunkName`相等，将会统一打包在一个 js 文件内

```js
const list = () => import(/* webpackChunkName: "a" */ '../views/list');
```

## 向组件传递参数

> 通过`this.$route.params.xxx`获取参数来发送网络请求获取接口数据
>
> 注意：带参数传递，路由将会出问题，只能使用`this.$router.back()`返回

### params

> 注意：通过params传参只能使用`name`来设置路由，使用`path`会导致`params`失效

| 模式                          | $route.params                        | 匹配路径            |
| ----------------------------- | ------------------------------------ | ------------------- |
| /user/:username               | { username: 'evan' }                 | /user/evan          |
| /user/:username/post/:post_id | { username: 'evan', post_id: '123' } | /user/evan/post/123 |

### query

> 给 to 传递对象，下列代码在地址栏显示为`http://localhost:8080/#/profile?name=冷弋白&age=20`
>
> 可使用`path`、`name`来设置路由

| 路径                         | $route.query                |
| ---------------------------- | --------------------------- |
| /user/lyb?name=冷弋白&age=21 | { name: '冷弋白' , age: 21} |

## $router.push

```js
// 字符串
this.$router.push('home');

// 对象(使用path将无法使用params传参，除非使用name)
this.$router.push({ path: 'home' });

// 命名的路由
this.$router.push({ name: 'user', params: { userId: '123' } });

// 带查询参数，地址栏将变成 /register?plan=private
this.$router.push({ path: 'register', query: { plan: 'private' } });
```

## 路由 API

| API                       | 描述                                                  |
| ------------------------- | ----------------------------------------------------- |
| this.$router.go(-1)       | 网页后退，等同于`this.$router.back()`                 |
| this.$route.params.参数名 | 获取地址栏最后一个`/`后面的名称                       |
| this.$route.path          | 对应当前路由的路径                                    |
| this.$route.query         | 对于路径 `/foo?user=1`，则有 `$route.query.user == 1` |
| this.$route.fullPath      | 获取完整链接                                          |
| this.$route.meta.isShow   | 获取`meta`元素                                        |

## 路由嵌套

> 如下嵌套，点击`homepage`不会是`/homepage`，而是`/home/homepage`
>
> 但是渲染的路由页面将是在首页，所以需要给首页文件加上`router-link`和`router-view`标签

```js
{
    path: '/page1',
    component: page1,
    children: [
        {
            path: '',
            redirect: 'page1son1',
        },
        {
            path: 'page1son1',
            component: page1son1,
        },
        {
            path: 'page1son2',
            component: page1son2,
        },
    ],
},
```

## 导航守卫

### 全局导航守卫

> 异步调用
>
> `router.beforeEach((from, to, next) => {})`：进入点击的下一个路由前执行，可用于验证
>
> `router.afterEach(to, from) => {}`：导航页面跳转成功就会执行此函数

**参数to & from**

| API      | 描述                                                       |
| -------- | ---------------------------------------------------------- |
| fullPath | 包含参数的路径，如query是/home?name=lyb，params是/home/lyb |
| hash     | 设置滚动锚点                                               |
| name     | 路由别名                                                   |
| params   | 参数                                                       |
| path     | 不包含query参数但包含params的路径，如/home                 |
| query    | 参数                                                       |



> `to`：即将进入的路由
>
> `from`：上一个路由
>
> `next()`：必须写，且写在函数体内，否则就无法跳转到下一个导航页面
>
> 可以在括号内写路径，适用于判断用户是否为登录状态，不是则跳转到登录页面

`router/index.js`

```js
router.beforeEach((to, from, next) => {
  //next()正确用法判断
  if (to.name !== 'Login' && !isAuthenticated) {
    next({ name: 'Login' })
  } else {
     next() 
  }
});
```

### 路由独享守卫

> `beforeEnter: (to, from, next) => {}`： 与全局守卫触发条件一样，但不会因`url`路由参数改变而触发
>
> 点击被写入独享守卫的路由就会触发
>
> 用于点击指定的路由导航触发

```js
{
    beforeEnter: (to, from, next) => {
        console.log('用户路由独享守卫已执行');
        next();
    },
    meta: {//给每个路由添加用于修改浏览器标签的对象属性
        title: '用户',
    },
    path: '/page1',
    component: page1,
},
```

### 组件内的守卫

> `beforeRouteEnter(to,from,next){}`
>
> 渲染该组件的路由导航被触发时调用
>
> 不能使用`this`，组件实例还未创建
>
> `beforeRouteUpdate(to,from,next){}`
>
> 在当前页面嵌套路由跳转时调用
>
> 此时组件实例已创建，可以使用`this`
>
> `beforeRouteLeave(to,from,next){}`
>
> 导航离开该组建的路由时调用，通常用来预防用户在还未保存修改前突然离开，弹出提醒未保存窗口
>
> 此时组件实例已创建，可以使用`this`

```js
export default {
  beforeRouteEnter(to, from, next) {
    console.log('我已渲染');
    next(); //如果不加，组件将不会渲染
  },
  beforeUpdate(to, from, next) {
    console.log('我已更新');
    //不能使用next()，会报错
  },
  beforeRouteLeave(to, from, next) {
    console.log('我已离开');
    next(); //如果不加，路由将无法跳转
  },
};
```

## keep-alive

> 给`router-view`被这个标签包裹，生命周期函数`activated`和`deactivated`才会有效
>
> 详情：[生命周期函数](#生命周期函数)
>
> 会缓存上一次跳转的路由
>
> 注意：此标签会导致一个路由多个命名视图失效，只会显示默认视图

| 属性    | 描述                                                         |
| ------- | ------------------------------------------------------------ |
| exclude | 选择不被缓存的组件，多个组件使用逗号分隔，此时需要给组件设置别名`name` |
| include | 选择被缓存的路由，同上                                       |

`App.js`

```html
<keep-alive>
  <router-view></router-view>
</keep-alive>
```

`page1.js`

```js
export default {
  data() {
    return {
      path: '/page1/page1son1', //存放初始默认跳转的地址
    };
  },
  activated() {
    if (this.$route.path !== this.path) {
      this.$router.replace(this.path); //当跳转到当前页面时，路由设置为上一次页面的路由地址，也就是存放的path
    }
  },
  beforeRouteLeave(to, from, next) {
    this.path = this.$route.path; //离开当前页面时将当前页面的路由地址存起来
    console.log('我已离开');
    next();
  },
};
```

**取消缓存**

> 此时，组件内的`name`不可省略，将需要取消缓存的组件`name`写给`keep-alive`标签的`exclude`属性，引号内切勿加空格

`App.js`

```html
<keep-alive exclude="page2,page3">
  <router-view></router-view>
</keep-alive>
```

`page1.vue`

```js
export default {
  name: 'page2',
  /* 验证是否成功 */
  created() {
    console.log('****服务组件已重新被创建');
  },
  activated() {
    console.log('****服务组件处于活跃');
  },
  destroyed() {
    console.log('****服务组件已销毁'); //如果未取消缓存，将不会执行此函数，即不会被销毁
  },
};
```

## 滚动行为

> 

`App.vue`

```html
<template>
  <div class="app">
    <div class="top">
      <router-link :to="{ path: '/A', hash: '#A' }">跳转到A</router-link>
      <router-link :to="{ path: '/B', hash: '#B' }">跳转到B</router-link>
      <router-link :to="{ path: '/C', hash: '#C' }">跳转到C</router-link>
    </div>
    <div class="main">
      <div class="a" id="A">第一</div>
      <div class="b" id="B">第二</div>
      <div class="c" id="C">第三</div>
    </div>
  </div>
</template>
```

`router/index.js`

```js
const router = new VueRouter({
  routes,
  scrollBehavior(to, from, save) {
    if (save) {
      //save记录上一次的位置
      return save;
    } else {
      return {
        //绑定锚点
        selector: to.hash,
        //平滑滚动
        behavior: 'smooth',
        //
        offset: {
          y: 65,
        },
      };
    }
  },
});
```



# Vuex

## 安装

> npm i vuex -S

## 状态管理模式

> 何时使用`Vuex`？
>
> 当遇到的组件通信非父子组件通信，而是组件嵌套的，如爷孙通信
>
> 甚至出现跨组件通信（爷-爷组件通信），就需要使用`Vuex`
>
> 比如存在登录状态、用户名称、头像、地理位置、商品的收藏、购物车中的物品
>
> 将多个爷爷组件需要用到的变量、方法，通过`Vuex`共享出来

`main.js`

```js
import store from './store';
```

> [state](#state)：存放变量
>
> [getters](#getters)： 处理数据，同计算属性
>
> [mutations](#mutations)：修改数据
>
> [actions](#actions)：接收异步数据及逻辑运算
>
> [module](#modules)：创建多个`Vuex`
>
> 目前只有`state`和`getters`在`App.js`或组件内使用`$store.state.变量名`和`$store.getters.方法名`获取

`store/index.js`

```js
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const moduleA = {
  state: {
    name: 'lyb',
  },
  mutations: {},
  actions: {},
  getters: {},
};
const moduleB = {
  state: {},
  mutations: {},
  actions: {},
  getters: {},
};
const store = new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  getters: {},
  modules: {
    moduleA,
    moduleB,
  },
});
export default store;

```

`组件`

```html
<template>
  <div class="btn">
    <button @click="sub">&nbsp;-&nbsp;</button>
    <button @click="add">&nbsp;+&nbsp;</button>
    <button @click="addN(5)">点我+5</button>
    <button @click="addN(10)">点我+10</button>
    <button @click="addStu">添加学生</button>
    <button @click="addStus()">新提交风格添加学生</button>
    <button @click="master">Vue.set添加对象属性</button>
    <button @click="masters">Vue.set延迟添加对象属性</button>
    <button @click="moduleAfn">moduleAFn1</button>
    <br />
    <button @click="moduleAfn12">moduleAfn12</button>
  </div>
</template>
<script>
  export default {
    data() {
      return {};
    },
    methods: {
      add() {
        this.$store.commit('inc'); //使用vuex对象内的函数，通过commit提交函数
      },
      sub() {
        this.$store.commit('dec');
      },
      addN(count) {
        this.$store.commit('fn3', count); //可传参
      },
      addStu() {
        let stu = { name: 'lyb', age: 20 };
        this.$store.commit('fn4', stu); //当有多个参数，可使用对象传递
      },
      addStus() {
        let stu = { name: 'lyb', age: 20 };
        this.$store.commit({
          //使用对象传递的另一方式，但这种方法只会把括号内整个对象传过去，使用payLoad接收，相比上一个接收方式更为复杂，但能获取type
          type: 'fn5',
          stu,
        });
      },
      master() {
        this.$store.commit('fn6');
      },
      masters() {
        this.$store.dispatch('fn7', '携带的参数').then(res => {
          console.log('里面已经完成了');
          console.log(res);
        });
      },
      moduleAfn() {
        this.$store.commit('fn8', 'moduleA');
      },
      moduleAfn12() {
        this.$store.dispatch('fn12');
      },
    },
  };
</script>
<style scope>
  .btn {
    position: fixed;
    top: 0;
  }
</style>
```

`App.js`

```html
<template>
  <div>
    <p>
      获取vuex变量：{{ $store.state.counter }} {{ $store.state.counter }}
      <br />
      获取vuex通过计算属性后的值： {{$store.getters.fn,}} {{ $store.getters.fn1
      }}
      <br />
      学生：{{ $store.state.arr }}
      <br />
      年龄大于20：{{ $store.getters.fn2(18) }}
      <br />
      学生名：{{ $store.state.arr1 }}
      <br />
      modules：{{ $store.state.moduleA.name }}
      <br />
      modules使用getters：{{ $store.getters.fn11 }}
    </p>
    <hello-vuex />
  </div>
</template>
<script>
  import HelloVuex from './components/HelloVuex.vue';
  export default {
    data() {
      return {};
    },
    methods: {},
    components: { HelloVuex },
  };
</script>
```

## state

> 组件通过`this.$store.state.变量`来调用
>
> 使用`state`内变量的函数都需要传参数：`fn(state)`
>
> 当前函数内未使用`state`内的变量，但当前函数使用其他函数，其他函数却在使用，这时候需要给当前函数传参`state`

`组件`

```js
methods:{
  fn() {
    this.$store.state.lyb
  },
}
```

`store`

```js
state:{
  lyb: '冷弋白'
}
```

### mapState

> 组件导入`mapState`辅助函数
>
> 可直接在组件的`computed`内获取`state`内的函数

`store/index.js`

```js
const store = new Vuex.Store({
  state: {
    lyb: '冷弋白'
  },
}
```

`组件`

```js
import { mapGetters } from 'vuex';
export default {
  computed：{  
    //第一种写法
    ...mapState(['lyb']), //100
    //第二种写法(用于避免与computed内的名称冲突)
    ...mapState({
      a: 'lyb',
    }),
	},
    methods:{
      //原来
  		consoloe.log(this.$store.state.lyb)
      
      //现在
  		consoloe.log(this.lyb)
    }
}
```

## mutations

> 此处建议只用于修改变量，逻辑操作虽然可以写，但建议写在`actions`里
>
> 切勿将定时器及异步操作及逻辑操作写在此处
>
> 组件通过`this.$store.commit('函数名')`来提交(调用)函数
>
> 响应规则：要将变量写进`mutations`才能被浏览器`Vue`工具跟踪，否则会被隐藏

### mutations 携带参数

`组件`

```js
methods:{
    addN(count) {
        this.$store.commit("fn3", count); //可传参
    }
}
```

`store`

```js
mutations:{
    fn3(state, count) {
        state.counter += count;
    }
}
```

#### 传递对象

> 当有多个参数，可使用对象传递

`组件`

```js
methods:{
    addStu() {
        let stu = { name: "lyb", age: 20 };
        this.$store.commit("fn4", stu);
    }
}
```

`store`

```js
mutations:{
    fn4(state, stu) {
        console.log(stu.name);
    }
}
```

### 通过常量调用函数

> 大项目使用

`store/mutations-type.js`

```js
export const INC = 'inc';
export const FN1 = 'fn1';
export const FN2 = 'fn1';
export const FN3 = 'fn2';
```

`store/index.js`

```js
import { FN1,FN2,FN3 } from "../store/mutations-type";
mutations:{
    getters: {
        [FN1](state) {
        },
        [FN2](state, getters) {
            //state不能省，fn隐式使用
            return getters.fn * 2;
        }
    }
}
```

`组件`

```js
import { INC } from "../store/mutations-type";
methods:{
    add() {
        this.$store.commit(INC);
    }
}
```

### mapMutations

> 组件导入`mapMutations`辅助函数
>
> 可直接在组件的`methods`内获取`mutations`内的函数

`store/mutations.js`

```js
mutations: {
  fn(lyb){
    console.log(lyb)
  }
},
```

`组件`

```js
import { mapMutations } from 'vuex';
export default {
  methods：{
    //第一种写法
    ...mapMutations(['fn']), //100
    //第二种写法(用于避免与methods内的函数名冲突)
    ...mapMutations({
      a: 'fn',
    }),
      
  	//原来
  	this.$store.commit('fn',lyb)
    
		//现在
		this.fn(lyb)
	}
}
```

## getters

> 在标签内使用直接`$store.getters.fn`即可调用

`组件`

```js
methods:{
  fn() {
    this.$store.getters.fn()
  },
}
```

`store`

```js
getters:{
  fn(state) {
    return state.counter * state.counter;
  },
  fn1(state, getters) {
    //在getters内部调用，state不可省略
    return getters.fn * 2;
  },
}
```

### 传参注意

> `getters`内的函数只有两个参数`state`和`getters`
>
> 对`getters`传参需要返回一个函数，对函数进行传参

`store/index.js`

```js
getters:{
    fn2(state) {
        return function (age) {
            return state.arr.filter(a => a.age > age).map(b => b.name)
        }
    }
}
```

`App.vue`

```js
{
  {
    $store.getters.fn2(18);
  }
}
```

### mapGetters

> 组件导入`mapGetters`辅助函数
>
> 可直接在组件的`computed`内获取`getters`内的函数

`store/getters.js`

```js
abb(state) {
  return x => {
    return x * 10;
  };
},
```

`组件`

```js
import { mapGetters } from 'vuex';
export default {
  computed: {
    //第一种写法
    ...mapGetters(['lyb']), 
    //第二种写法(用于避免与computed内的名称冲突)
    ...mapGetters({
      a: 'lyb',
    }),
  },
  methods: {
    fn() {
      //原来
      this.$store.state.lyb(10)

      //现在
      this.lyb(10);
    },
  },
};
```

## actions

> 和`mutation`有同样的操作，用来替代它做异步及逻辑操作
>
> 组件通过`this.$store.dispatch('函数名')`来提交(调用)函数

`store/index.js`

```js
action:{
    fn7(context,接收参数) {
        setTimeout(() => {
            context.commit('fn6'); //三秒后执行此函数
            console.log('执行');
        }, 3000);
    }
}
```

`组件`

```js
methods:{
    masters() {
    	this.$store.dispatch("fn7",'可传递参数');
	}
}
```

### 向外传递异步操作完成信息

`store/index.js`

```js
actions: {
    fn7(context, payLoad) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                context.commit('fn6');
                resolve('已确认'); //还能额外传递参数
            }, 2000);
        });
    },
},
```

`组件`

```js
masters() {
    this.$store.dispatch("fn7", "携带的参数").then((res) => {
        console.log("里面已经完成了");
        console.log(res); //还能额外获取传递过来的参数
    });
},
```

### mapActions

> 组件导入`mapActions`辅助函数
>
> 可直接在组件的`methods`内获取`actions`内的函数

`store/getters.js`

```js
export default {
  addCart(state) {
    setTimeOut(() => {
      console.log('冷弋白');
    });
  },
};
```

`组件`

```js
import { mapActions } from 'vuex';
export default {
  methods: {
    //第一种写法
    ...mapActions(['addCart']), //100
    //第二种写法(用于避免与methods内的函数名冲突)
    ...mapActions({
      a: 'addCart',
    }), //100
    fn() {
      //原来
      this.$store.dispatch('addCart', '可传递参数');

      //现在
      this.addCart('可传递参数');
    },
  },
};
```

## modules

> 模块里的`state`内的数据需要使用`$store.state.moduleA.name`调用
>
> 除`state`，其他的使用方法都不变

`store/index.js`

```js
const moduleA = {
  state: {
    name: '我是modules内的moduleA内的name',
  },
  mutations: {
    fn8(state, payLoad) {
      state.name = payLoad;
    },
  },
  actions: {},
  getters: {},
};
const store = new Vuex.Store({
  modules: {
    moduleA,
    moduleB,
  },
});
```

`组件`

```html
<template>
  <div>{{ $store.state.moduleA.name }}</div>
</template>
<script>
  methods:{
      moduleAfn() {
          this.$store.commit("fn8", "moduleA");
      }
  }
</script>
```

### modules 内 getters

> 如果想使用原来`store`内`state`内的数据，直接传参`rootState`

```js
fn11(state, getters, rootState) {
    return getters.fn10 + rootState.counter;
},
```

### modules 内 action

> `action`的`context.commit()`只能使用当前模块的`mutation`内的函数
>
> 使用`context.rootState||context.rootGetters`可以拿到原来`store`内的`state`和`getters`

### 抽离

> `mutations.js`
>
> `getters.js`
>
> `action.js`
>
> `modules`由于有多个模块，需要单独创建`modules`文件夹，文件夹内就是每个模块 js 文件

# 移动端开发

## 手机访问 localhost

> 命令行：`IPCONFIG`
>
> 获取电脑 IPv4 地址
>
> 关闭防火墙



# 小知识

| 小知识                                                       |
| ------------------------------------------------------------ |
| `data`内无法获取`data`内的其他数据，但能获取其他地方的数据，如路由参数`this.$router.query.id` |
| 修改了数据但视图未更新，会不会是因为没有设置`this.$set`      |
|                                                              |

