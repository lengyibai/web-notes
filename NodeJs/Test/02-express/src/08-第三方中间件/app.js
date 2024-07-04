const express = require(`express`);
const app = express();
const router = require('./router');

//第三方中间件(控制台打印日志)
const morgan = require('morgan');
// app.use(morgan('tiny'));
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms')
);

//解析 Content-Type为 application/json格式的请求体
app.use(express.json());
//解析Content-Type yg application/x-WWM-form-u1 encoded格式的请求体
app.use(express.urlencoded());
//解析 Content-Type 为 application/octet- stream格式的请求体
app.use(express.raw());
//解析 Content-Type 为text/plain格式的请求体
app.use(express.text());

//挂载路由
// app.use(router);
//可传递参数，即原来需要写成"/lyb/:id"，现在可直接/:id
app.use('/lyb', router);

//定制404内容，路由匹配不到报404
app.use((req, res, next) => {
  res.status(404).send('404');
});

//在所有的中间件之后挂载错误处理中间件(参数格式固定)
app.use((err, req, res, next) => {
  console.log('错误' + err);
  res.status(500).json({
    error: err.message,
  });
});

app.listen(3000, () => {
  console.log(`http://localhost:3000`);
});
