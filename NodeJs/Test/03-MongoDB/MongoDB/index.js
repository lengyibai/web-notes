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

const mongoose = require('mongoose');

//连接数据库
mongoose
  .connect('mongodb://localhost/User', { useNewUrlParser: true })
  .then(() => {
    console.log('数据库连接成功');
  })
  .catch(err => console.log(err, '数据库连接失败'));

//创建集合规则
const format = new mongoose.Schema({
  name: {
    type: String,
    required: [true, '年龄不能为空'],
    //字符串的最大长度和最小长度
    minlength: [2, '名字不能低于两个字符'],
    maxlength: [5, '昵称不能大于五个字符'],
    trim: true,
  },
  age: {
    type: Number,
    required: [true, '年龄不能为空'],
    validate: {
      validator: v => {
        return v && v >= 18;
      },
      message: '传入的值不符合验证规则',
    },
  },
  hobbies: [String],
  time: {
    type: String,
    default: () => {
      return moment().format('YYYY-MM-DD HH:mm:ss');
    },
  },
});

//创建集合
const Users = mongoose.model('学生表', format);

/* Users.create(
  { name: '张三', age: '18', hobbies: ['吃饭', '睡觉', '打豆豆', '敲代码'] },
  { name: '李四', age: '19', hobbies: ['吃饭', '睡觉', '打豆豆'] },
  { name: '王五', age: '20', hobbies: ['吃饭', '睡觉'] },
  { name: '赵六', age: '21', hobbies: ['吃饭', '打豆豆', '敲代码'] },
).then(res => {
  res.forEach(item => {
    console.log(item.name + '添加成功');
  });
}); */

//获取数据
app.get('/', (req, result) => {
  Users.find()
    .then(res => result.send(res))
    .then(res => {
      console.log('访问了一次');
    });
});

//获取要修改的数据
app.get('/modify', (req, result) => {
  Users.findOne({ _id: req.query.id }).then(res => result.send(res));
});

//添加数据
app.post('/', async (req, res) => {
  const data = req.body;
  Users.create({
    name: data.name,
    age: data.age,
    hobbies: data.hobbies,
  })
    .then(res => console.log(res))
    .catch(error => {
      //捕获所有错误信息
      const err = error.errors;
      for (var attr in err) {
        console.log(err[attr]['message']);
      }
    });
  res.end();
});

//修改数据
app.patch('/', async (req, res) => {
  const data = req.body;
  const oldData = await Users.findOne({ _id: data._id });
  Object.keys(data).forEach(item => {
    if (data[item] == '') {
      data[item] = oldData[item];
    }
  });
  await Users.updateOne(
    { _id: data._id },
    { name: data.name, age: data.age, hobbies: data.hobbies },
  );
  res.end();
});

//删除数据
app.delete('/', async (req, res) => {
  const data = req.body;
  await Users.findOneAndDelete({ _id: data.id }).then(res => {
    console.log(res.name + '删除成功');
  });
  res.end();
});

app.listen(3000, () => {
  console.log('http://localhost:3000');
});
