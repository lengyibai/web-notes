# Uniapp

## 内置组件

### text

| 属性名     | 默认值 | 说明                                                         |
| ---------- | ------ | ------------------------------------------------------------ |
| selectable | false  | 长按文字可选中                                               |
| space      |        | 显示连续空格，<br />ensp：中文字符空格一半大小<br />emsp：中文字符空格大小<br />nbsp：根据字体设置的空格大小 |
| decode     | false  | 是否解码如`&nbsp;&lt;&gt;`                                   |



## API

### tabBar跳转

```js
uni.switchTab({
  url: "/pages/tabBar/hero/hero",
});
```

