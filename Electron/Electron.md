<img class="lyb" src="http://lengyibai.gitee.io/img-bed/img/lyb.png" style="width:200px;margin:0 auto;border-radius:50%" />

<p style="font-size:50px;font-weight:bold;width:100%;text-align:center;color:#fff;text-shadow:0 0 15px">冷弋白</p>
<p style="text-align:center;color:#aaa;position: relative;top:-10px;text-shadow:0 0 10px"><a href='https://wpa.qq.com/msgrd?v=3&uin=1329670984&site=qq&menu=yes' style='text-decoration: none;
'>点击此处联系我</a></p>

# Electron

## 安装

| 指令                                                         | 描述                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| cnpm install --save-dev electron <br />cnpm install --save-dev @electron-forge/cli | 安装`electron`                                               |
| cnpm install electron-builder --save--dev                    | 安装打包工具                                                 |
| npm run build                                                | 打包指令，由于网络问题可能下载失败，需要将报错信息内的链接复制到浏览器单独下载，然后移动到`C:\Users\lengyibai\AppData\Local\electron\Cache`文件夹 |

## 配置

```json
"build": {  // 这里是electron-builder的配
  "productName":"xxxx",//项目名 这也是生成
  "appId": "com.xxx.xxxxx",//包名
  "copyright":"xxxx",//版权  信息
  "directories": { // 输出文件夹
    "output": "build"
  },
  // windows相关的配置
  "win": {
    "icon": "xxx/icon.ico"//图标路径
  }
},
```

