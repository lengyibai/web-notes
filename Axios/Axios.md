<img class="lyb" src="http://lengyibai.gitee.io/img-bed/img/lyb.png" style="width:200px;margin:0 auto;border-radius:50%" />

<p style="font-size:50px;font-weight:bold;width:100%;text-align:center;color:#fff;text-shadow:0 0 15px">冷弋白</p>
<p style="text-align:center;color:#aaa;position: relative;top:-10px;text-shadow:0 0 10px"><a href='https://wpa.qq.com/msgrd?v=3&uin=1329670984&site=qq&menu=yes' style='text-decoration: none;
'>点击此处联系我</a></p>

# Axios

## 起步

> `npm install axios`

```html
<script src="https://cdn.bootcdn.net/ajax/libs/axios/0.21.1/axios.min.js"></script>
```

### 安装 json-serve

> `npm install -g json-server`

### 创建文件

> 运行文件：`json-server --watch db.json`
>
> 如果在末尾加`-d 2000`，则是延时两秒返回结果

`db.json`

```json
{
  "countries": [
    {
      "name": "富强",
      "text": "国富民强，是社会主义现代化国家经济建设的应然状态，是中华民族梦寐以求的美好夙愿，是作为国家繁荣昌盛、人民幸福安康的物质基础"
    },
    {
      "name": "民主",
      "text": "人类社会的一种美好诉求。我们追求的民主是人民民主，其实质和核心是人民当家作主"
    },
    {
      "name": "文明",
      "text": "社会进步的重要标志，也是社会主义现代化国家的重要特征。它是社会主义现代化国家文化建设的应有状态，是对面向现代化、面向世界、面向未来的，民族的科学的大众的社会主义文化的概括，是实现中华民族伟大复兴的重要支撑"
    },
    {
      "name": "和谐",
      "text": "中国传统文化的基本理念，它体现了学有所教、劳有所得、病有所医、老有所养、住有所居的生动局面。它是社会主义现代化国家在社会建设领域的价值诉求，是经济社会和谐稳定、持续健康发展的重要保证"
    }
  ],
  "social": [
    {
      "name": "自由",
      "text": "人的意志自由、存在和发展的自由，是人类社会的对美好的向往，也是马克思主义追求的社会价值目标"
    },
    {
      "name": "平等",
      "text": "公民在法律面前的人人平等，不断实现实质平等是其价值取向。它要求尊重和保障人权，每个人都依法享有平等参与、平等发展的权利"
    },
    {
      "name": "公正",
      "text": "社会公平和正义，以人的解放、人的自由平等权利的获得作为前提，是国家、社会应然的根本价值理念"
    },
    {
      "name": "法治",
      "text": "治国理政的基本方式，依法治国是社会主义民主政治的基本要求。它从法制建设来维护和保障公民的根本利益，是实现自由平等、公平正义的制度保证"
    }
  ],
  "people": [
    {
      "name": "爱国",
      "text": "个人对自己祖国依赖关系的深厚情感，也是调节个人与祖国关系的行为准则。它和社会主义紧密结合在一起，要求人们以振兴中华为己任，促进民族团结、维护祖国统一、自觉报效祖国"
    },
    {
      "name": "敬业",
      "text": "对公民职业行为准则的价值评价，时刻要求公民忠于职守，克己奉公，为人民服务，为社会服务，充分体现了社会主义职业精神"
    },
    {
      "name": "诚信",
      "text": "诚实守信，一直以来是人类社会的道德传统，也是社会主义道德建设的重点内容，它强调诚实劳动、信守承诺、为人诚恳"
    },
    {
      "name": "友善",
      "text": "强调公民之间应彼此尊重、互相关心、互相互助，和睦友好，努力形成社会主义的新型人际关系"
    }
  ]
}
```

> 天气接口：`http://wthrcdn.etouch.cn/weather_mini?city=自贡`

## 请求

> 建议`POST`和`PATCH`先定义对象，再将对象发送请求

### GET

> 第一种写法

```js
axios({
  url: 'http://localhost:3000/countries',
  params: {
    name: '文明',
  },
}).then(res => {
  console.log(res);
});
```

> 第二种写法

```js
axios
  .get('http://localhost:3000/countries', {
    params: {
      name: '富强',
    }
  })
  .then(res => {
    console.log(res.data[0].text);
  });
```

### POST

> `POST`会通过`data`的内容直接添加指定内容到服务器文件
>
> 一般用于用户自定义添加标签，然后描述，将标签存储进一个数组，再将描述内容存储进一个数组，再创建一个对象，将标签和描述循环添加进对象

```json
{
  "lyb": []
}
```

```js
/**
	* 建议将发送的请求数据保存为一个变量进行发送
	* 如果是固定格式，可以采用函数传值的方法发送
	* 尤其是在更新数据的时候
	*/
btn.onclick = function (data) {
  axios
    .post(
      'http://localhost:3000/lyb',
      //设置添加的数据
      data: {
        name: '冷弋白',
        age: '20',
      },
    )
    .then(res => {
      console.log('添加成功');
    });
};
```

> 第二种写法

```js

btn.onclick = function (data) {
  axios({
    method: 'POST',
    url: 'http://localhost:3000/lyb',
    data: {
      name: '冷弋白',
      age: '20',
    },,
  }).then(res => {
    console.log('添加成功');
  });
};
```

```json
"lyb": [
  {
    "name": "冷弋白",
    "age": "20",
    "id": 1
  }
]
```

### PUT

> `PUT`会通过`data`的内容直接更新服务器文件指定内容
>
> 如果有没修改到的值，如只修改了`name`没有修改`age`，`age`将会为空
>
> 一般用于整页都是必填的选项

> 第一种写法

```js
btn.onclick = function () {
  axios
    .put('http://localhost:3000/lyb/1', {name: '冷弋白',age: '20'})
    .then(
      res => {
        console.log('更新成功');
      },
      err => {
        console.log('更新失败');
      }
    );
};
```

> 第二种写法

```js
axios({
    method: 'PUT',
    url: 'http://localhost:3000/lyb/1',
    data: {
      name: '冷弋白',
      age: '20',
    },
  }).then(
    res => {
      console.log('更新成功');
    },
    err => {
      console.log('更新失败');
    }
  );
};
```

### PATCH

> 与`PUT`一样，也是更新数据
>
> 与`PUT`不同的是，`PATCH`只会将修改的内容发送给后端
>
> 比如修改了`name`并没有修改`age`，`age`并不会像`PUT`那样为空
>
> 一般用于选填的选项，如个性资料，但`PATCH`用的多

### DELETE

> `DELETE`会通过`data`的内容直接删除服务器文件指定内容

```js
btn.onclick = function () {
  axios
    .delete('http://localhost:3000/lyb',{
    data: {
      id: 1,
    }}
  })
    .then(
      res => {
        console.log('删除成功');
      },
      err => {
        console.log('删除失败');
      }
    )
    .catch(err => {
      console.log('删除失败');
    });
};
```

> 第二种写法

```js
btn.onclick = function () {
  axios({
    method: 'DELETE', //直接删除id为3的数据
    url: 'http://localhost:3000/lyb/1',
    data: {}  // 请求参数放在请求体
  }).then(
    res => {
      console.log('删除成功');
    },
    err => {
      console.log('删除失败');
    }
  );
};
```

```json
"lyb": []
```

### 并发请求

> 同时请求多个

```js
function fn1() {
  return axios.get("http://localhost:3000/social", {
    name: '自由'
  });
}
function fn2() {
  return axios.get("http://localhost:3000/social", {
    name: '平等'
  });
}
axios.all([fn1(), fn2()]).then(
  //axios.spread((fn1, fn2) => { //原始写法
    ([res1, res2]) => {
    console.log(fn1.data[0].text);
    console.log(fn2.data[0].text);
  })
);
```

### 实例对象

> 创建实例对象

```js
const lyb = axios.create({
  //默认配置
  baseURL: "http://localhost:3000",
  timeout: 5000,
});
lyb.get("/social", {
    name: "自由",
  }).then(res => {
  console.log(res.data[0].text);
});
```

### 请求封装

> 通过实例对象封装，用于默认配置
>
> 拦截器需要单独设置，建议给每个请求方式单独创建实例对象
>
> 如果拦截器需要获取`Vue`实例内的变量，可将封装的导出，引入到`Vue`实例

`network/request.js`

```js
import axios from 'axios';
export const instance = axios.create({
    baseURL: 'http://localhost:3000',
    time: 5000,
  });
//绑定请求拦截器
instance.interceptors.request.use(config => {
  return config;
});

//绑定响应拦截器
instance.interceptors.response.use(res => {
  return res;
});
```

#### 组件请求合集

```js
import { instance } from './request';

//请求数据
const fn1 = id => {
  return instance({
    method: 'GET',
    url: `/lyb/${id}`,
    params: {},
  });
};

//发送数据
const fn2 = (name, age) => {
  return instance({
    method: 'POST',
    url: '/lyb',
    data: {
      name,
      age,
    },
  });
};

//更新数据
const fn3 = (name, age, id) => {
  return instance({
    method: 'PUT',
    url: `/lyb/${id}`,
    data: {
      name,
      age,
    },
  });
};

//删除数据
const fn4 = id => {
  return instance({
    method: 'DELETE',
    url: `/lyb/${id}`,
  });
};

export { fn1, fn2, fn3, fn4 };
```

> 在`Vue`实例下绑定拦截器：在封装的请求文件导出封装的函数
>
> 然后引入

```js
import { instance }
//在Vue实例中引用
data: {
  isShow: false,
},
created() {
  //绑定请求拦截器
  instance.interceptors.request.use(config => {
    this.isShow = true; //可设置
    return config;
  });
  //绑定响应拦截器
  instance.interceptors.response.use(res => {
    this.isShow = false;
    return res;
  });
  this.fn();
},
```

## 请求封装

```js
const social = axios.create({
  //默认配置
  baseURL: "http://wthrcdn.etouch.cn",
  timeout: 5000,
});
social({
  method: 'GET',
  url: '/weather_mini',
  params: {
    city: '自贡'
  },
}).then(res => {
  console.log(res);
});
```

## 实战

> 每次进入页面获取地址栏`token`，需要`token`才能请求数据

`request.js`

```js
export const lyb = axios.create({
  //设置token
  headers: {
    token: Vue.prototype.$token,
  },
  baseURL: 'http://test.haolinmeng.com',
  time: 10000,
});
```

`App.vue`

```html
<script>
  import Vue from 'vue';
  import { $lybPA1 } from '@/common/lyb.js';
  export default {
    //获取并设置新的token
    created() {
      this.setToken();
    },
    updated() {
      this.setToken();
    },
    methods: {
      //每次进入页面设置token
      setToken() {
        //定义token用于写入vue原型对象
        let token = '';
        // 判断地址栏是否存在token
        if (this.$route.query.token) {
          // 存在则赋值
          token = this.$route.query.token;
          //存在则写入本地存储
          $lybPA1.set('token', token);
        } else if ($lybPA1.get('token')) {
          //地址栏没有token则从本地存储获取
          token = $lybPA1.get('token');
        } else {
          console.error('未找到token');
        }
        //写入原型对象用于发送请求使用
        Vue.prototype.$token = token;
      },
    },
  };
</script>
```

## 拦截器

> 一般情况下写在 Vue 的`created()`函数内，在组件创建完后创建拦截器，但 axios 实例对象需要单独设置[实例对象拦截器](#请求封装)

### 请求拦截器

> 在请求数据时触发

```js
axios.interceptors.request.use(config => {
  this.isShow = true; //用于显示loading
  return config;
});
```

### 响应拦截器

> 在获取到数据时触发

```js
axios.interceptors.response.use(res => {
  this.isShow = false;
  return res;
});
```

## 取消请求

> 不能写在请求实例上，只能写在请求方法上

```js
import Vue from 'vue';
import axios from 'axios';
cancelToken: new axios.CancelToken(c => {
  Vue.prototype.$cancel = c; //通过当前函数来更改cancel
}),
//组件内调用 this.$cancel() 取消请求
```
