const express = require('express');

const { getDb, saveDb } = require('./db');

const router = express.Router();

router.get(`/`, async (req, res, next) => {
  try {
    //获取接口数据
    const db = await getDb();
    res.status(200).json(db.lyb);
  } catch (error) {
    //将错误信息传递给错误处理中间件
    next(error);
  }
});

//获取接口指定数据
router.get(`/:id`, async (req, res, next) => {
  try {
    const db = await getDb();
    // 对象id为数字类型，路径为字符串，需要进行转换比较
    const lyb = db.lyb.find(lyb => lyb.id.toString() === req.params.id);
    if (!lyb) {
      res.status(404).json({
        err: '不存在',
      });
    }
    return res.status(200).json({ lyb });
  } catch (error) {
    //将错误信息传递给错误处理中间件
    next(error);
  }
});

//添加
router.post(`/`, async (req, res, next) => {
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
  } catch (error) {
    //将错误信息传递给错误处理中间件
    next(error);
  }
});

//修改
router.patch(`/:id`, async (req, res, next) => {
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
  } catch (error) {
    //将错误信息传递给错误处理中间件
    next(error);
  }
});

//删除
router.delete(`/:id`, async (req, res, next) => {
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
  } catch (error) {
    //将错误信息传递给错误处理中间件
    next(error);
  }
});

// export default router;
module.exports = router;
