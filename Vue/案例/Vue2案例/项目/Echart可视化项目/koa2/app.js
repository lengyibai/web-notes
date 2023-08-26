//#####··········创建koa对象··········#####//
const Koa = require('koa');
const app = new Koa()

//#####··········编写响应函数（中间件）··········#####//
//####········第一层中间件········####//
const duration = require('./middleware/koa_response_duration.js')
app.use(duration)
//####········第二层中间件········####//
const header = require('./middleware/koa_response_header.js')
app.use(header)
//####········第三层中间件········####//
const data = require('./middleware/koa_response_data.js')
app.use(data)

//#####··········绑定端口··········#####//
app.listen(9527)

const webSocketService = require('./service/web_socket_service.js')
//开启服务端监听，监听客户端的连接
//当某一个客户端连接成功之后，就会对这个客户端进行message事件的监听
webSocketService.listen()