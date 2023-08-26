//#####··········处理业务逻辑的中间件，读取某个json文件的数据··········#####//
const path = require('path')
const fileUtils = require('../utils/file_utils.js')
module.exports = async (ctx, next) => {
  //读取url
  const url = ctx.request.url
  //替换url
  let filePath = url.replace('/api', '')
  // 拼接相对路径
  filePath = '../data' + filePath + '.json'
  //拼接绝对路径
  filePath = path.join(__dirname, filePath)
  // 给前端返回数据
  try {
    const ret = await fileUtils.getFileJsonData(filePath)
    ctx.response.body = ret
  } catch (error) {
    const errorMsg = {
      message: '读取文件内容失败',
      status: 404
    }
    ctx.response.body = JSON.stringify(errorMsg)
  }
  await next()
}