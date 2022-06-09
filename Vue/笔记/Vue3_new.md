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

### shallowReactive

> 只能修改绑定的第一层的值
>
> 注：在`DOM`挂载之前依然可以修改深层次的值，挂载之后就不可修改

```js
import { shallowReactive } from "vue";
let data = shallowReactive({
  lyb: "冷弋白",
  obj: {
    age: 21,
  },
});
data.obj.age = 20; //dom挂在之前可修改
setTimeout(() => {
  data.lyb = "lengyibai"; //可修改
  data.obj.age = 18; //不可修改
});
```

## to系列

### toRef

> 将一个对象的属性抽出来并转成`ref`对象进行绑定，修改绑定值，原对象和绑定的`ref`也会跟着改变
>
> 让`toRef`绑定的属性值也具有响应式的前提是原对象也具有响应式

```js
import { toRef, reactive } from "vue";
const obj = reactive({
  lyb: "冷弋白",
});
const name = toRef(obj, "lyb");
setTimeout(() => {
  name.value = "lyb"; //不仅name会被修改并更新视图，reactiveb绑定的对象也会被修改，视图也会更新
});
```

### toRefs

> 接收一个对象，功能与`ref`一样
>
> 当`reactive`对象的属性比较多的时候就需要解构简化代码，但是解构会失去响应式。使用toRefs解构`reactive`对象，解构的属性仍具有响应式。

```js
import { toRefs, reactive } from "vue";
const obj = reactive({
  a: "张三",
  b: "李四",
});
const { a: A, b: B } = toRefs(obj);
setTimeout(() => {
  A.value = "zhangsan";
  B.value = "lisi";
});
```

### toRaw

> 通过`toRaw`方法拿到响应式数据的原始数据，对原始数据进行修改不会更新视图

```js
import { toRaw, reactive } from "vue";
const arr = reactive(["a", "b", "c"]);
setTimeout(() => {
  const lyb = toRaw(arr).splice(2, 1);
  console.log(lyb); //['c']
  console.log(arr); //toRaw(arr)只是引用地址，实际上 splice 也会改变响应式数据，此时为 ['a', 'b']，但不会更新视图
});
```

