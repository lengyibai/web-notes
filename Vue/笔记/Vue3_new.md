<img src="http://lengyibai.gitee.io/img-bed/img/lyb.png" style="width:200px;margin:0 auto;border-radius:50%" />

<p style="font-size:50px;font-weight:bold;width:100%;text-align:center;color:#fff;text-shadow:0 0 15px">冷弋白</p>
<p style="text-align:center;color:#aaa;position: relative;top:-10px;text-shadow:0 0 10px"><a href='https://wpa.qq.com/msgrd?v=3&uin=1329670984&site=qq&menu=yes' style='text-decoration: none;
'>点击此处联系我</a></p>
# Vue3

## 基础模板

> 接下来的示例使用此模板

```vue
<template>
<!--  -->
</template>
<script setup lang="ts">
</script>
<style></style>
```

## ref全家桶

### ref

> 绑定基本数据类型，使其响应式，需要加`.value`
>
> PS：虽然`ref`能绑定复杂数据类型，但底层依旧回去调用`reactive`进行绑定，无疑是多此一举，而且还需要追加`.value`，所以`ref`只适合绑定基础数据类型，复杂数据类型交给[reactive](#reactive)处理

```js
import { ref } from 'vue';

let a = ref('冷弋白');
let b = ref([['冷弋白']]);
let c = ref({lyb:{name:'冷弋白'}});

function fn() {
  a.value = 'lyb';
  b.value.lyb.name = 'lyb'; //支持更深的响应
  c.value[0][0] = 'lyb'; //支持更深的响应
}
```

#### isRef

> 判断是否为`ref`类型

### shallowRef

> 只处理基本数据类型的响应式, 不进行对象的响应式处理，只有整个变量发生改变时才会响应

```js
import { shallowRef } from 'vue';

let lyb = ref({name:'冷弋白'});

function fn() {
  lyb.value.name = 'lyb'; //虽然被修改，但不支持DOM响应
}
```

#### triggerRef

> 配合`shallowRef`使用，通知`DOM`更新
>
> 注：`ref`与`shallowRef`包裹的值如果同时被修改(不区分先后顺序)，`ref`会调动`shallowRef`通知`DOM`修改，因为`ref`相当于隐式调用了`triggerRef`，应当避免同时调用

```js
//同上，略...
function fn() {
  lyb.value.name = 'lyb'; 
  triggerRef(lyb); //此时响应更改
}
```

### 自定义ref

> 在响应前可以做一系列的操作

```js
import { customRef } from 'vue';
function MyRef<T>(value: T) {
  return customRef((trank, trigger) => {
    return {
      get() {
        console.warn('get'); //立即触发一次，当更改值后会再触发一次
        trank();
        return value;
      },
      set(newVal: T) {
        console.warn('set'); //修改值触发，newVal为修改后的值，value为当前要响应的值
        value = newVal;
        trigger();
      },
    };
  });
}
```

## reactive全家桶

### reactive

> 只接收复杂数据类型，不需要`.value`可直接改变值
>
> 不接收基础数据类型，基础数据类型交给[ref](#ref)处理
>
> 注：不可直接将数据赋值给`reactive`绑定的变量，会破坏其响应式，推荐以下写法

```js
import { reactive } from 'vue';
let data = reactive([]);
function fn(){
  setTimeout(()=>{
    const arr = [1, 2, 3]
    data = arr; //bad
    data.push(...arr); //good
  }, 1000)
}

```

### readonly

> 将绑定的值绑定为只读赋给新值

```js
import { reactive, readonly } from "vue";
let data = reactive({
  lyb: "冷弋白",
});
let a = readonly(data);
a.lyb = "lyb"; //禁止修改，控制台警告
```

