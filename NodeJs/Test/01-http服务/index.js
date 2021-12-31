const fs = require('fs');
const http = require('http');
const server = http.createServer();
//封装请求页面的函数
function fn(url, res) {
  fs.readFile(url, (err, data) => {
    if (err) {
      res.end('404 Not Found');
    } else {
      //返回请求的数据
      res.end(data);
    }
  });
}
server.on('request', function (req, res) {
  res.setHeader('Content-Type', 'text/html;charset=utf-8');
  const url = req.url; //获取地址栏中的请求路径
  //不同的路径返回不同的页面
  if (url === '/') {
    fn('./resource/home.html', res);
  } else if (url === '/image') {
    res.setHeader('Content-Type', 'image/png');
    fn('./resource/小头像.png', res);
  } else {
    res.end('404 Not Found');
  }
});

server.listen(3000, function () {
  console.log('服务器运行中：http://localhost:3000/');
});
