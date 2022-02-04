<img src="http://lengyibai.gitee.io/img-bed/img/lyb.png" style="width:200px;margin:0 auto;border-radius:50%" />

<p style="font-size:50px;font-weight:bold;width:100%;text-align:center;color:#fff;text-shadow:0 0 15px">冷弋白</p>
<p style="text-align:center;color:#aaa;position: relative;top:-10px;text-shadow:0 0 10px"><a href='https://wpa.qq.com/msgrd?v=3&uin=1329670984&site=qq&menu=yes' style='text-decoration: none;
'>点击此处联系我</a></p>
# Vue3

## 响应式原理

```js
let person = {
  name: '冷弋白',
  age: 21,
};

let p = new Proxy(person, {
  get(target, propName) {
    console.warn(`监测到${propName}被读取`);
    return target[propName];
  },
  set(target, propName, value) {
    console.warn(`监测到${propName}被修改为${value}`);
    target[propName] = value;
  },
  deleteProperty(target, propName) {
    console.warn(`监测到${propName}被删除`);
    delete target[propName];
  },
});
```

## setup

> 比`beforeCreate`先执行，`this`是`undefined`

```js
export default {
  setup(props,context) {
    let data = reactive({
      name: '冷弋白',
    });
    function fn() {
      data.name = 'lengyibai';
      console.log(data.name)
    }
    return { data, fn };
  },
};
```

### Vue3内的生命周期

> `beforeDestroy`改名为`beforeUnmount`
>
> `destroyed`改名为`unmounted`
>
> 不能将`beforeCreate`、`created`放入`setup`内
>
> `beforeMount` =`onBeforeMount`
>
> `mounted`=`onMounted`
>
> `beforeUpdate`=`onBeforeUpdate`
>
> `updated` =`onUpdated`
>
> `beforeUnmount` =`onBeforeUnmount`
>
> `unmounted` =`onUnmounted`

```js
import {
  ref,
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
} from 'vue';
export default {
  name: 'index',
  setup() {
    let lyb = ref(1);
    function fn() {
      lyb.value++;
    }

    onBeforeMount(() => console.log('---onBeforeMount---'));
    onMounted(() => console.log('---onMounted---'));
    onBeforeUpdate(() => console.log('---onBeforeUpdate---'));
    onUpdated(() => console.log('---onUpdated---'));
    onBeforeUnmount(() => console.log('---onBeforeUnmount---'));
    onUnmounted(() => console.log('---onUnmounted---'));
    return {
      lyb,
      fn,
    };
  },
};
```

### ref & reactive

> 基本数据类型使用`ref`，`reactive`只用于对象响应式
>
> `ref`在`js`内需要加`.value`后缀

```js
import { reactive, ref } from 'vue';
export default {
  name: 'index',
  setup() {
    let a = reactive({
      name: '冷弋白',
      age: 21,
    });
    let b = ref('lengyibai');
    function fn() {
      a.name = 'lengyibai';
      a.age = 22;
      b.value = 'lyb';
    }
    b;
    return {
      a,
      b,
      fn,
    };
  },
};
```

#### shallowReactive & shallowRef

> `shallowReactive`：只处理对象第一层属性的响应式
>
> `shallowRef`：只处理基本数据类型的响应式, 不进行对象的响应式处理

### props & context

> props
>
> 值为对象，从父组件传递过来，且组件内部声明接收了的属性
>
> 现在支持修改传过来的数据了
>
> context
>
> `attrs`: 值为对象，从父组件传递过来但没有在`props`配置中声明的属性, 相当于 `this.$attrs`
>
> `slots`: 收到的插槽内容, 相当于 `this.$slots`
>
> `emit`: 分发自定义事件的函数, 相当于 `this.$emit`

```js
export default {
  name: 'index',
  props: {
    name: {
      type: String,
      default: '',
    },
  },
  emits: ['hello'],
  setup(props, context) {
    function fn() {
      context.emit('hello', props.name);
    }
    return {
      fn,
    };
  },
};
```

## 引入

### 计算属性

> 计算属性为当成了方法使用

```js
import { reactive, computed } from 'vue';
export default {
  name: 'index',
  setup() {
    let lyb = reactive({
      firstName: '冷',
      lastName: '弋白',
      fullName: '',
    });
    
    //精简写法
    lyb.fullName = computed(() => lyb.firstName + lyb.lastName);
    
    //完整写法（可修改计算属性，不常用）
    lyb.fullName = computed({
      get() {
        return lyb.firstName + lyb.lastName;
      },
      set(value) {
        //value 即为被修改后的值，不能直接赋值给 lyb.fullName，会导致栈溢出
      },
    });
    return {
      lyb,
    };
  },
};
```

### 监听器

#### watch

> 监听器当成函数使用
>
> 如果是采用的`ref`代理对象，并监听对象，则需要手动开始深度监听
>
> `reactive`默认为深度监听

```js
import { ref, reactive, watch } from 'vue';
export default {
  name: 'index',
  setup() {
    /* 情况一：监听一个 ref 定义的基本数据 */
    let num1 = ref(0);
    let num2 = ref(10);
    let user = reactive({
      name: '冷弋白',
      job: {
        salary: 10,
      },
    });
    function fn() {
      num1.value++;
      num2.value++;
      user.name = 'lengyibai';
      user.job.salary++;
    }
    watch(num1, (newVal, oldVal) =>
      console.log('只监听一个：', newVal, oldVal)
    );

    /* 情况二：同时监听多个 ref 定义的基本数据 */
    watch([num1, num2], (newVal, oldVal) =>
      console.log('同时监听多个：', newVal, oldVal)
    );

    /* 情况三：监听对象，能深度监听，但无法获取旧值，且强制开启深度监听，deep无效 */
    watch(user, (newVal) => console.log('监听对象：', newVal));

    /* 情况四：监听指定属性值 */
    watch(
      () => user.name,
      (newVal, oldVal) => console.log('监听对象某属性：', newVal, oldVal)
    );

    /* 情况五：监听对象内的多个属性 */
    watch(
      () => [user.name, user.job.salary],
      (newVal, oldVal) => console.log('监听对象多个属性：', newVal, oldVal)
    );

    /* 情况六：监听对象内带有对象的属性，但无法获取旧值 */
    watch(
      () => user.job,
      (newVal, oldVal) =>
        console.log('监听对象内带有对象的属性', newVal, oldVal),
      { deep: true }
    );

    return {
      num1,
      num2,
      user,
      fn,
    };
  },
};
```

#### watchEffect

> 在`watchEffect`里使用了一个变量，如果这个变量被修改，则触发`watchEffect`，且默认开始第一次触发，类似`computed`

```js
setup() {
  let name = ref('lyb');
  let lyb = 'lengyibai';
  function fn() {
    lyb = '冷弋白';
  }
  watchEffect(() => {
    lyb = name.value;
    console.log('触发修改');
  });
  return { fn, lyb };
},
```

### hooks

> 类似`vue2`的`minxin`混入

<!--usePoint.js-->

```js
import { reactive, onMounted, onBeforeUnmount } from 'vue';
export function savePoint() {
  let point = reactive({
    x: 0,
    y: 0,
  });
  function savePoint(e) {
    point.x = e.pageX;
    point.y = e.pageY;
  }
  onMounted(() => {
    window.addEventListener('click', savePoint);
  });
  onBeforeUnmount(() => {
    window.removeEventListener('click', savePoint);
  });
  return point;
}
```

<!--组件-->

```vue
<template>
  <div class="index">
    <h1>当前鼠标点击坐标为 x：{{ point.x }} | y：{{ point.y }}</h1>
  </div>
</template>
<script>
import { savePoint } from '@/hooks/usePoint.js';
export default {
  name: 'index',
  setup() {
    let point = savePoint();
  },
};
</script>
```

### toRef & toRefs

> 将一个`reactive`生成的响应式对象的所有属性值转为`ref`对象，其`value`值指向另一个对象中的某个属性
>
> 用于`template`模板，省去对象前缀，且支持外部修改
>
> 注：后期添加的数据并不会加入

```vue
<template>
  <div class="index">{{ lyb }}：{{ age }}</div>
</template>
<script>
import { reactive, toRef, toRefs } from 'vue';
export default {
  name: 'index',
  setup() {
    let user = ({
      lyb: '冷弋白',
      info: {
        age: 21,
      },
    });
    return {
      ...toRefs(user), //类似将对象里的所有属性解构
      age: toRef(user.info, 'age'), //类似将对象内的指定属性解构
    };
  },
};
</script>
```

### readonly & shallowReadonly

> `readonly`: 让一个响应式数据只读
>
> `shallowReadonly`：让一个响应式对象第一层只读
>
> PS：如果试图更改，将会警告

```js
function add() {
  let web = {
    name: '前端',
  };
  user.job = readonly(web); //此时新加的对象不支持修改
  setTimeout(() => {
    user.job.name = '666';
    console.log(toRaw(user)); //转为普通原生对象
  }, 1000);
}
```

### toRaw & markRaw

> `toRaw`：将一个由`reactive`生成的响应式对象转为普通原生对象
>
> `markRaw`：标记一个对象，使其无法成为响应式对象，但数据可以修改，只是页面不会更新

```js
setup() {
  let user = reactive({
    name: 'lengyibai',
    info: {
      age: 21,
    },
  });
  function add() {
    let web = {
      name: '前端',
    };
    user.job = markRaw(web); //此时新加的对象不支持响应式
    setTimeout(() => {
      user.job.name = '666';
      console.log(toRaw(user)); //转为普通原生对象
    }, 1000);
  }
  return { user, ...toRefs(user), add };
},
```

### customRef

> 创建一个自定义的`ref`
>
> 以下实现的是`v-model`防抖输入效果

```js
import { customRef } from 'vue';
export default {
  setup() {
    function myRef(value) {
      return customRef((track, trigger) => {
        let timer;
        return {
          get() {
            console.log('读取了');
            track(); //通知 Vue 追踪这个数据的变化，trigger 才会生效
            return value;
          },
          set(newVal) {
            console.log('修改了');
            clearTimeout(timer);
            timer = setTimeout(() => {
              value = newVal;
              trigger(); //通知 Vue 去重新读取数据并解析模板
            }, 500);
          },
        };
      });
    }
    
    let keyWord = myRef('lengyibai');
    return { keyWord };
  },
};
```

### provide & inject

> 适用于祖孙通信，虽然父子通信也行，但建议使用`props`

<!--祖组件-->

```vue
<template>
    <father :user="user" />
</template>
<script>
import { reactive, provide } from 'vue';
import father from '@/components/father.vue';
export default {
  components: { father },
  setup() {
    let user = reactive({
      name: '冷弋白',
      age: 21,
    });
    provide('user', user); //给自己的后代组件传递数据
    return {
      user,
    };
  },
};
```

<!--父组件-->

```vue
<template>
    <son />
</template>
<script>
import Son from '@/components/Son.vue';
export default {
  components: { Son },
  props: ['user'],
  setup(props) {
    let users = props.user;
  },
};
</script>
```

<!--子组件-->

```js
import { inject } from 'vue';
export default {
  setup() {
    let user = inject('user'); //接收爷爷数据
  },
};
```

