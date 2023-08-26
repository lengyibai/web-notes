<img src="http://lengyibai.gitee.io/img-bed/img/lyb.png" style="width:200px;margin:0 auto;border-radius:50%" />

<p style="font-size:50px;font-weight:bold;width:100%;text-align:center;color:#fff;text-shadow:0 0 15px">冷弋白</p>
<p style="text-align:center;color:#aaa;position: relative;top:-10px;text-shadow:0 0 10px"><a href='https://wpa.qq.com/msgrd?v=3&uin=1329670984&site=qq&menu=yes' style='text-decoration: none;
'>点击此处联系我</a></p>
# Linux指令操作

## 文件操作

> 读取文件

```js
const fs = require('fs');

/**
 * 读取文件
 * utf-8表示转换读取的文件内容，防止中文乱码
 * 也可以直接给data加上.toString()
 */
const readFile = (p) => {
  const path = require('path');
  const filePath = path.resolve(__dirname, p);
  return new Promise((resolve) => {
    const fs = require('fs');
    fs.readFile(filePath, 'utf-8', (err, data) => {
      resolve(data);
    });
  });
};
```

> 写入文件(如果没有对应文件，会自动创建)

```js
const writeFile = (url, data) => {
  const fs = require("fs");
  const path = require("path");
  const filePath = path.resolve(__dirname, url);
  fs.writeFile(filePath, JSON.stringify(data, null, 2), (err, data) => {
    console.log(`创建成功`);
  });
};
```

> 读取路径内的文件，以数组形式输出
>
> 必须是绝对路径

```js
const getPathFiles = (src) => {
  return new Promise((resolve) => {
    const path = require('path');
    const fs = require('fs');
    const filePath = path.resolve(__dirname, src);
    fs.readdir(filePath, function (err, files) {
      resolve(files);
    });
  });
};
```

## 路径操作

### 获取绝对路径

> 返回当前执行的 js 文件的绝对路径
>
> 第二参数可直接被绝对路径拼接

```js
let path = require('path');
let filePath = path.resolve(__dirname, 'index.html');
console.log(filePath);
```

### 路径拼接

> 路径拼接语法
>
> 它会返回不同系统的拼接方式
>
> `Linux`为`/`，`Windows`为`\`

```js
const path = require('path')
//路径拼接
let finialPath = path.join('我的文件','Web前端','Web前端笔记','NodeJs','node.md)
//当前系统为Windows，则返回：我的文件\Web前端\Web前端笔记\NodeJs\nod.md
```

#### Content-Type

> 当`res.end('')`输出的内容带有字符串则需要添加此代码
>
> 只有字符才需要`utf-8`编码，图片及其他格式的内容则需要特定的格式
>
> 对照表：https://tool.oschina.net/commons

```js
res.setHeader('Content-Type', 'text/html;charset=utf-8');
```

| 文件扩展名 | Content-Type(Mime-Type)  |
| ---------- | ------------------------ |
| .txt       | text/plain               |
| .jpg       | image/jpeg               |
| .png       | image/png                |
| .html      | text/html                |
| .css       | text/css                 |
| .js        | application/x-javascript |

# Express

## 安装

> npm i -S express
>
> npm i -g nodemon

## 创建服务

```js
const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('现在是get请求');
});

app.post('/', (req, res) => {
  res.send('现在是post请求');
});

app.patch('/', (req, res) => {
  res.send('现在是put请求');
});

app.delete('/', (req, res) => {
  res.send('现在是delete请求');
});

app.listen(3000, () => {
  console.log('http://localhost:3000');
});
```

## API

```js
const express = require('express');

const app = express();

app.get('/', function (req, res) {
  console.log(req.url); //请求地址，即端口号后面的内容，包含/
  console.log(req.method); //请求类型，GET请求
  console.log(req.headers); //请求头信息
  console.log(req.params); //获取动态参数:id
  console.log(req.query); //获取get请求参数
  console.log(req.body); //获取客户端发送过来的json
  res.end();
  /**
  	* res.send('发送请求对象信息'); //不想发送相应数据可直接res.end()
  	* res.status(404); //发送状态码，可接上.json({数据})，发送响应码和json数据
});

app.listen(3000, () => {
  console.log('http://localhost:3000');
});
```

## 解析json

```js
app.use(express.json());
```



# MongoDB

## 安装

> 软件网址：https://www.mongodb.com/try/download/community
>
> 安装启动包：npm i mongoose

## 基础配置

```js
//引入mongoose第三方模块 用来操作数据库
const mongoose = require('mongoose');

//数据库连接(User数据库名)
mongoose
  .connect('mongodb://localhost/User', { useNewUrlParser: true })

  //连接成功
  .then(() => console.log('数据库连接成功'))

  //连接失败
  .catch(err => console.log(err, '数据库连接失败'));

//创建表规则
const format = new mongoose.Schema({
  name: String,
  age: Number,
});

//使用规则创建集合
//1.表名
//2.表规则
const Users = mongoose.model('学生表', format);

//向集合中插入文档
Users.create({ name: '张三', age: '18' }).then(res => {
  console.log(res);
});
```

## API

| 符号 | 描述                                     |
| ---- | ---------------------------------------- |
| $eq  | 与指定的值相等                           |
| $ne  | 与指定的值不相等                         |
| $gt  | 大于指定的值                             |
| $gte | 大于等于指定的值                         |
| $lt  | 小于指定的值                             |
| $lte | 小于等于指定的值                         |
| $in  | 与查询数组中指定的值中的任何一个匹配     |
| $nin | 与查询数组中指定的值中的任何一个都不匹配 |

### 添加数据

```js
Users.create(
  { name: '张三', age: '18' },
  { name: '李四', age: '19' },
  { name: '王五', age: '20' },
  { name: '赵六', age: '21' }
).then(res => {
  res.forEach(item => {
    console.log(item.name + '添加成功');
  });
});
```

### 查询指令

```js
//查询所有数据
Users.find().then(res => console.log(res));

//通过id字段查询
Users.find({ _id: '6135f2d0ee7462d4450af250' }).then(res => console.log(res));

//查询并只返回一条符合条件的数据
Users.findOne({ name: '李四' }).then(res => console.log(res));

//根据条件查询（大于等于18小于等于19）
Users.find({ age: { $gte: 18, $lte: 19 } }).then(res => console.log(res));

//根据条件查询（地址等于四川自贡）
Users.find({ address: { $in: ['四川自贡'] } }).then(res => console.log(res));

//选择要查询的字段（只显示名字，由于id是默认显示，则需要加-禁止显示）
Users.find().select('name -_id').then(res => console.log(res));

//根据年龄大小进行升序排列（-age则降序），且只要是数字就能排序
Users.find().sort('age').then(res => console.log(res));
```

### 修改指令

> 如果第一个花括号内为空，则修改所有数据

```js
//匹配到多条数据只会修改第一条（支持多种信息修改）
Users.updateOne({ name: '李四' }, { name: '张三', age: 21 }).then(res => res.modifiedCount >= 1 ? console.log('修改成功') : console.log('修改失败') );

//匹配到多条数据则会全部修改
Users.updateMany({}, { name: '张三', age: 21 }).then(res => res.modifiedCount >= 1 ? console.log('修改成功') : console.log('修改失败') );
```

### 删除指令

> 如果花括号内为空，则删除所有数据

```js
//匹配到多条数据只会删除第一条
Users.findOneAndDelete({ name: '王五' }).then(res => { res != null ? console.log('删除成功') : console.log('删除失败'); });

//匹配到多条数据则会全部删除
Users.deleteMany({ name: '张三' }).then(res => { res.deletedCount >= 1 ? console.log('删除成功') : console.log('删除失败'); });
```

## 数据验证

```js
name:{
    type: String,
    required: [true, '年龄不能为空'],
    //字符串的最大长度和最小长度
    minlength: [2, '名字不能低于两个字符'],
    maxlength: [5, '昵称不能大于五个字符'],
    //数值的最大长度和最小长度
    min: 18,
    max: 100,
    //只能填以下内容的任意值，否则报错
    enum: ['web', 'java', 'python', 'php'],
    //用户自定义验证，返回true则验证通过，返回false则验证不通过，并显示message报错信息
    validate: {
      validator: v => {
        return v && v.length >= 4;
      },
      message: '传入的值不符合验证规则',
    },
    default: () => {
      return moment().format('YYYY-MM-DD HH:mm:ss');
    },
}
```

