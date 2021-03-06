<img class="lyb" src="https://img-bed-five.vercel.app/img/lyb.png" style="width:200px;margin:0 auto;border-radius:50%" />

<p style="font-size:50px;font-weight:bold;width:100%;text-align:center;color:#fff;text-shadow:0 0 15px">冷弋白</p>
<p style="text-align:center;color:#aaa;position: relative;top:-10px;text-shadow:0 0 10px"><a href='https://wpa.qq.com/msgrd?v=3&uin=1329670984&site=qq&menu=yes' style='text-decoration: none;
'>点击此处联系我</a></p>
# 代码封装

## 数据归类

<!--写在网络请求文件内-->

### 针对多/单tab栏多卡片

> 传入数组，数组内包含对象
>
> 返回数组，数组内包含对象
>
> PS：数据归类一般用于当前页面需要的数据分布在请求数据的各个对象里，如果是数据分布在请求数据的一级对象，则无需数据归类

```js
function ServiceOrderList(data) {
  // 用于存储tab栏的数据
  function Data(data) {
    return {
      num: data.order_sn,
      name: data.order_serf.name,
      phone: data.user.phone,
    };
  }
  return data.map((item) => {
    return Data(item);
  });
}
```

### 针对多tab栏多卡片

> 前提是已经一次性获取了多个tab栏的数据

```js
export class GetGoodsList {
  /**
   * data:后端数据
   * index:tab栏标识符
   * tabsName:tab栏名称合集
   */
  constructor(data, index, tabsName) {
    try {
      //这里面存储构造函数
      let obj = {};
      obj[tabsName[index]] = function(data) {
        // 用于存储指定tab栏的数据
        this.data = [];
        class Data {
          constructor(data) {
            this.id = data.id;
            this.name = data.name;
          }
        }
        let that = this;
        // 没有this的data是后端的数据
       this.data = data.map((item, index) => {
          // 将数据里面的对象传入类中，并将类通过数组下标设置进存储指定tab栏的数据数组中
          return new Data(item);
        });
      };
      // 返回指定tab栏的数组数据
      return new obj[tabsName[index]](data).data;
    } catch (error) {}
  }
}
```

### 购物车数据归类

```js
export class CartList {
  constructor(data) {
    let goodList = [];
    class List {
      constructor(data) {
        class GoodList {
          constructor(data) {
            this.cover_img = data.image;
            this.name = data.text;
            this.info = data.info;
            this.max = data.max;
            this.num = data.num;
            this.price = data.price;
          }
        }
        this.type = data.categoryName;
        this.isSelect = false;
        this.goodList = data.goodList.map(item => {
          return new GoodList(item);
        });
      }
    }
    goodList = data.map(item => {
      return new List(item);
    });
    return goodList;
  }
}
```

## 页面数据删除更新

> 发送删除请求后，只能依靠发送的`id`，对本地数据进行匹配删除

```js
collectionGood(id).then(() => {
  Toast.clear();
  Toast.success('取消收藏成功');

  this.data.forEach((item, index) => {
    if (item.id == id) {
      this.data.splice(index, 1);
    }
  });
});
```

## 日历数据统计

> 通过后端返回的数据，统计每个事、物每天的数据，用于统计图表

```js
let arr = [
  // 第一天
  {
    date: '2021-12-26',
    list: [
      {
        name: '张三',
        bugfix: '2个',
      },
      {
        name: '李四',
        bugfix: '1个',
      },
      {
        name: '王五',
        bugfix: '3个',
      },
    ],
  },
  // 第二天
  {
    date: '2021-12-27',
    list: [
      {
        name: '张三',
        bugfix: '4个',
      },
      {
        name: '李四',
        bugfix: '3个',
      },
      {
        name: '王五',
        bugfix: '5个',
      },
    ],
  },
  // 第三天
  {
    date: '2021-12-28',
    list: [
      {
        name: '张三',
        bugfix: '3个',
      },
      {
        name: '李四',
        bugfix: '6个',
      },
      {
        name: '王五',
        bugfix: '2个',
      },
    ],
  },
  // 第四天
  {
    date: '2021-12-29',
    list: [
      {
        name: '张三',
        bugfix: '5个',
      },
      {
        name: '李四',
        bugfix: '3个',
      },
      {
        name: '王五',
        bugfix: '7个',
      },
    ],
  },
  // 第五天
  {
    date: '2021-12-30',
    list: [
      {
        name: '张三',
        bugfix: '6个',
      },
      {
        name: '李四',
        bugfix: '4个',
      },
      {
        name: '王五',
        bugfix: '2个',
      },
    ],
  },
];

let time = [];
let data = [];
let users = [];

// 循环 5 天的数据
arr.forEach((item, i) => {
  // 将 5 天的具体时间添加进数组
  time[i] = item.date;
  // 将一天所有员工的数据存储到临时变量
  let _users = item.list;
  // 循环一天每个员工的数据
  _users.forEach((_, i) => {
    // 目前只有三个员工，所以只循环 3 次，并给 data 设置三条数据
    data[i] = {
      // 每条数据就是一个员工
      name: _users[i].name,
      // 循环 5 天的数据，将每天指定员工bugfix整理出来
      time_data: arr.map(item => item.list[i].bugfix),
    };
  });
});

// 将三个员工的名字整理出来出来
users = data.map(item => {
  return item.name;
});

console.log(time);
console.log();
console.log(data);
console.log();
console.log(users);
```

# Element UI

| 描述                 | 代码                                                         |
| -------------------- | ------------------------------------------------------------ |
| 给表格顶部背景加颜色 | `:header-cell-style="{ background: '#f5f7fa', color: '#606266' }"` |



# 逻辑

## 按钮

> 给按钮设置屏蔽，需要在点击按钮触发的函数内再做二次验证进行屏蔽操作
>
> 不单单只屏蔽按钮表面那么简单

## 数据处理案例

> 来自：一共有三个栏目，后端传过来的是任意栏目或所有栏目，会将三个栏目自动选上，由于栏目并不是完整的，所以需要把没有匹配到的栏目取消填充，也就是置空
>
> 实际开发可能`ids`内的`id`分布在三个栏目内比较深的地方，可以把`id`直接`map`出来，可读性更好
>
> 而`b`则是一条栏目数据里的标识符，

```js
/**
 * 如果只存在6，则3和9的位置为字符串：['', 6, '']
 * 如果存在6、9，则3的位置为字符串：['', 6, 9]
 * 得到的数据赋值给c
 */
let ids = [3, 6, 9]; //已知站点id数据顺序
let data = [6];
let res = ids.map(id => {
  return data.find(item => item === id) || '';
});
console.log(c);
```

# 响应式

> 自适应讲究`width: 100%;max-width: 300px`，而非使用`rem`
