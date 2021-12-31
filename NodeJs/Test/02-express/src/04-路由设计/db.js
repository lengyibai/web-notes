const fs = require('fs');
//转换成异步
const { promisify } = require('util');
const path = require('path');
//原生的异步API不支持promise，通过proisify即可支持
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

//获取接口文件的绝对路径
const dbPath = path.join(__dirname, 'db.json');

exports.getDb = async () => {
  //读取接口文件的结对路径并获取数据（虽然可以直接./db.json）
  const data = await readFile(dbPath, 'utf8');
  //将在服务端获取到的数据转成json发送给客户端
  return JSON.parse(data);
};

//将修改好的内容写入接口文件内
exports.saveDb = async db => {
  //将客户端传过来的json数据转换成字符串
  const data = JSON.stringify(db, null, '  '); //代表换行，缩进为两个空格
  //写入接口文件
  await writeFile(dbPath, data);
};
