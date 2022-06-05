<img class="lyb" src="http://lengyibai.gitee.io/img-bed/img/lyb.png" style="width:200px;margin:0 auto;border-radius:50%" />

<p style="font-size:50px;font-weight:bold;width:100%;text-align:center;color:#fff;text-shadow:0 0 15px">冷弋白</p>
<p style="text-align:center;color:#aaa;position: relative;top:-10px;text-shadow:0 0 10px"><a href='https://wpa.qq.com/msgrd?v=3&uin=1329670984&site=qq&menu=yes' style='text-decoration: none;
'>点击此处联系我</a></p>

# 逻辑

## 按钮

> 给按钮设置屏蔽，需要在点击按钮触发的函数内再做二次验证进行屏蔽操作
>
> 不单单只屏蔽按钮表面那么简单

## 数据处理案例

> 来自：一共有三个栏目，后端传过来的是任意栏目或所有栏目，会将三个栏目自动选上，由于栏目并不是完整的，所以需要把没有匹配到的栏目取消填充，也就是置空
>
> 实际开发可能`ids`内的`id`分布在三个栏目内比较深的地方，可以把`id`直接`map`出来，可读性更好
>
> 而`b`则是一条栏目数据里的标识符，

```js
/**
 * 如果只存在6，则3和9的位置为字符串：['', 6, '']
 * 如果存在6、9，则3的位置为字符串：['', 6, 9]
 * 得到的数据赋值给c
 */
let ids = [3, 6, 9]; //已知站点id数据顺序
let data = [6];
let res = ids.map(id => {
  return data.find(item => item === id) || '';
});
console.log(c);
```

# 响应式

> 自适应讲究`width: 100%;max-width: 300px`，而非使用`rem`
