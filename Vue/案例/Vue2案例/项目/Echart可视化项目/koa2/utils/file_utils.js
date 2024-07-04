//#####··········读取文件的工具方法··········#####//
const fs = require('fs');
module.exports.getFileJsonData = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}