const express = require('express');
const app = express();

//配置表单请求体
app.use(express.json());

//解决跨域
var cors = require('cors');
app.use(cors());

//获取准确时间
var moment = require('moment'); //引入moment
moment.locale('zh-cn'); //设置时区

// 引入mongoose第三方模块 用来操作数据库
const mongoose = require('mongoose');
// 数据库连接
mongoose
  .connect('mongodb://localhost/article', { useNewUrlParser: true })
  // 连接成功
  .then(() => console.log('数据库连接成功'))
  // 连接失败
  .catch(err => console.log(err, '数据库连接失败'));

// 用户集合规则
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

// 文章集合规则
const postSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    //关联用户集合
    ref: '用户',
  },
});

// 用户集合
const User = mongoose.model('用户', userSchema);
// 文章集合
const Post = mongoose.model('文章', postSchema);

// 创建用户
// User.create({ name: '冷弋白' }).then(res => console.log(res));

// 创建文章
/* Post.create({
  title: '有一个人前来买瓜',
  author: '6138def8c5d5ece87892f450',
}).then(res => console.log(res)); */

//通过文章作者查找文章
Post.find()
  .populate('author')
  .then(res => console.log(res));

app.listen(9527, () => {
  console.log('http://localhost:9527');
});
