const express = require('express');

const app = express();

/**
 * 不限制请求方法和路径，不管对与错
 * 只要是请求，都会经过这里
 * 必须将use放在最顶部
 * req:请求 对象
 * res:响应对象
 * next:下一个中间件
 */
//没有限制的中间件，在所有地方都能用到
app.use((req, res, next) => {
  //打印日志
  req.lyb = '冷弋白'; //在所有位置都能访问到
  //交出执行权，往后继续执行
  next();
});

//可配置多个函数
app.use(
  (req, res, next) => {
    //打印日志
    req.lyb = '冷弋白'; //在所有位置都能访问到
    //交出执行权，往后继续执行
    next('route'); //给next传参route将会跳过后面的所有函数中间件
  },
  (req, res, next) => {
    next();
  }
);

//限制请求路径的中间件
app.use('/user/:id', (req, res, next) => {
  //打印日志
  req.lyb = '冷弋白'; //在所有位置都能访问到
  //交出执行权，往后继续执行
  next();
});

app.get('/', function (req, res) {
  res.send('现在是get请求');
});

app.post('/', function (req, res) {
  res.send('现在是post请求');
});

app.patch('/lyb', function (req, res) {
  res.send('现在是patch请求');
});

app.delete('/lyb', function (req, res) {
  res.send('现在是delete请求');
});

app.listen(3000, () => {
  console.log('http://localhost:3000');
});
