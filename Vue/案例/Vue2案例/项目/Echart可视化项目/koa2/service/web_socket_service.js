const path = require('path')
const fileUtils = require('../utils/file_utils.js')
const WebSocket = require('ws')
const wss = new WebSocket.Server({
  port: 9528
})


module.exports.listen = () => {
  //对客户端的连接事件进行监听
  //client：代表的是客户端的连接socket对象
  wss.on('connection', client => {
    console.log('有客户端连接成功了：');
    //对客户端的连接对象进行message事件的监听
    //msg：由客户端发给服务端的数据
    client.on('message', async msg => {
      let payload = JSON.parse(msg)
      const action = payload.action
      if (action === 'getData') {
        let filePath = '../data/' + payload.chartName + '.json'
        filePath = path.join(__dirname, filePath)
        //需要在服务端获取的数据的基础上，增加一个data的字段
        //data所对应的值，就是某个json文件的内容
        payload.data = JSON.parse(await fileUtils.getFileJsonData(filePath))
        client.send(JSON.stringify(payload))
      } else {
        //原封不动的将所接收到的数据转发给每个处于连接状态的客户端
        // wss.clients： 所有客户端的连接，循环发送
        wss.clients.forEach(client => {
          client.send(msg.toString())
        })
      }
    })
  })

}