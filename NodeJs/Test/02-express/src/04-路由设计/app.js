const express = require(`express`);
const { getDb, saveDb } = require('./db');
const app = express();

//解析客户端传过来的json格式的数据
app.use(express.json());
//解析客户端传过来的表结构格式的数据
app.use(express.urlencoded());

app.get(`/lyb`, async (req, res) => {
  //获取接口数据
  const db = await getDb();
  if (!db) {
    res.status(404).json({
      err: '不存在',
    });
  }

  //将请求数据返回给客户端
  res.status(200).json(db.lyb);
});

//获取接口指定数据
app.get(`/lyb/:id`, async (req, res) => {
  const db = await getDb();
  res.status(404).send('666');
  // 对象id为数字类型，路径为字符串，需要进行转换比较
  const lyb = db.lyb.find(lyb => lyb.id.toString() === req.params.id);
  if (!lyb) {
    res.status(404).json({
      err: '不存在',
    });
  }
  return res.status(200).json({ lyb });
});

//添加
app.post(`/lyb`, async (req, res) => {
  try {
    //获取客户端提交的表单数据
    const lyb = req.body;

    //判断是否符合命名规则name
    if (!lyb.name) {
      return res.status(422).json({
        error: 'name字段是必须的',
      });
    }

    const db = await getDb();
    //获取接口文件中最后一个数组元素
    const lastLyb = db.lyb[db.lyb.length - 1];

    //判断接口文件是否有值，有则将该值的id+1并赋值给客户端传过来的数据内，没有则赋值1
    lyb.id = lastLyb ? lastLyb.id + 1 : 1;
    //将数据添加进接口数据
    db.lyb.push(lyb);
    //将写入好的数据写入进接口文件
    await saveDb(db);

    //发送成功的响应
    res.status(200).json(lyb);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

//修改
app.patch(`/lyb/:id`, async (req, res) => {
  try {
    //获取客户端提交的表单数据
    const todo = req.body;
    //读取接口文件数据
    const db = await getDb();
    //在接口文件内查找需要修改的任务是否存在，存在则返回该数据
    const ret = db.lyb.find(todo => todo.id.toString() === req.params.id);
    //根据是否存在作出响应
    if (!ret) {
      return res.status(404).end();
    }
    //将客户端传过来的值进行合并
    Object.assign(ret, todo);
    await saveDb(db);
    res.status(200).json(ret);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

//删除
app.delete(`/lyb/:id`, async (req, res) => {
  try {
    //获取客户端发送的id
    const lyb = req.params.id;
    const db = await getDb();
    //获取与id相同的元素的下标
    const index = db.lyb.findIndex(item => item.id.toString() === lyb);
    if (index === -1) {
      return res.status(404);
    }
    //删除指定元素
    db.lyb.splice(index, 1);
    await saveDb(db);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

app.listen(3000, () => {
  console.log(`http://localhost:3000`);
});
