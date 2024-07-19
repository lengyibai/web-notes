# Pixi.js



## Application

### new Application() 参数

```js
const app = new PIXI.Application({
    width: 800,
    height: 600,
    backgroundColor: 0x1099bb,
    useContextAlpha: false, // 禁用 alpha 缓冲区
    antialias: true, // 开启抗锯齿功能
    backgroundAlpha:0.5, //背景透明度
    autoStart: false, //是否开启渲染，默认开启，特殊情况下可能需要自己手动开启
});
```

### 成员

### 方法

```js
//渲染开关
app.start()
app.stop()
```

## 事件

```js
circle.on("pointerenter", (e) => {
  console.log(e);
});
circle.eventMode = "static";
```

| 事件名            | 事件描述                     |
| ----------------- | ---------------------------- |
| pointerdown       | 按下                         |
| pointerenter      | 进入                         |
| pointerover       | 进入                         |
| pointerleave      | 离开                         |
| pointerout        | 离开                         |
| pointerup         | 抬起                         |
| globalpointermove | 在屏幕移动，不管是否在元素上 |

## Assets 资源加载

### 可加载资源

> - Textures (`avif`, `webp`, `png`, `jpg`, `gif`)
> - Sprite sheets (`json`)
> - Bitmap fonts (`xml`, `fnt`, `txt`)
> - Web fonts (`ttf`, `woff`, `woff2`)
> - Json files (`json`)
> - Text files (`txt`)



### 单个加载

```js
const texturePromise = await Assets.load('https://pixijs.com/assets/bunny.png');
```

### 加载无后缀文件

```js
//loadParser：loadTextures | loadWebFont | loadJson | loadTxt
promise = Assets.load({
  src: 'https://example.com/ambiguous-file-name',
  loadParser: 'loadTextures'
})
```

### 批量加载

```js
PIXI.Assets.load([
  "spritesheets/character.json", // 人物动画精灵表
  "scene/background.png", // 背景图片
]).then(()=>{
    const background = PIXI.Sprite.from("scene/background.png");
})
```

### 别名批量加载

```js
const data = await Assets.load([
  { alias: "mc", src: "https://pixijs.com/assets/spritesheet/mc.json" },
]);
console.log(data.mc)
```

### 手动分类，按需加载

> 通过别名`alias`设置的资源可通过`Assets.get('别名')`来获取缓存中的资源

```js
Assets.add({ alias: 'flowerTop', src: 'https://pixijs.com/assets/flowerTop.png' });
Assets.add({ alias: 'eggHead', src: 'https://pixijs.com/assets/eggHead.png' });
const texturesPromise = Assets.load(['flowerTop', 'eggHead']); 

texturesPromise.then((textures) => {
  const flower = Sprite.from(textures.flowerTop);
  const egg = Sprite.from(textures.eggHead);
  app.stage.addChild(flower, egg);
});
```

### 捆绑批量加载

```js
Assets.addBundle("animals", {
  bunny: "/img/diamond.png",
  chicken: "/img/gold.png",
  thumper: "/img/hero_debris.png",
});
const assets = await Assets.loadBundle("animals");
const bunny = new Sprite(assets.bunny);
app.stage.addChild(bunny);
```

### 通过 JSON 加载

```json
{
  "bundles": [
    {
      "name": "AAA",
      "assets": [
        {
          "alias": "diamond",
          "src": "/img/diamond.png"
        },
        {
          "alias": "gold",
          "src": "/img/gold.png"
        }
      ]
    },
    {
      "name": "BBB",
      "assets": [
        {
          "alias": "debris",
          "src": "/img/hero_debris.png"
        },
        {
          "alias": "coin",
          "src": "/img/hero_lottery_coin.png"
        }
      ]
    }
  ]
}

```

```js
Assets.init({ manifest: "/json/manifest1.json" }).then(() => {
  PIXI.Assets.loadBundle("AAA").then((assets) => {
    const sprite = new Sprite(assets.diamond);
    app.stage.addChild(sprite);
  });
});
```

### 从缓存中取值

```js
const animations = PIXI.Assets.cache.get("spritesheets/character.json")
```

## Sprite 

> PS：`texture`可加载图片和视频

### new Sprite() 参数

```js
 const sprite = new PIXI.Sprite({
    texture: treeTexture, //资源
    anchor: { x: 0.5, y: 0.5 }, //与 css background-position 类似，但会影响旋转中心点
  });
```

### 常用API

```js
//坐标设置
sprite.x = 0 
sprite.y = 0
```

### AnimatedSprite 精灵表动画

```js
const data = await Assets.load([
  { alias: "mc", src: "https://pixijs.com/assets/spritesheet/mc.json" },
]);
const explosionTextures = [];

for (let i = 0; i < Object.keys(data.mc.data.frames).length; i++) {
    //这里是拼接mc.json中每一帧的名字
    const texture = Assets.get(`Explosion_Sequence_A ${i + 1}.png`);
    //将每一帧的贴图进行存储
    explosionTextures.push(texture);
}

//使用动画序列
const explosion = new AnimatedSprite(explosionTextures);
//从第一帧开始播放
explosion.gotoAndPlay(0);
```

#### 常用API

```js
//动画速率
animatedSprite.animationSpeed = 1
```

#### 常用方法

```js
//从第
```

### TilingSprite 平铺精灵

> 常用于通过一小片段制作平铺制作背景

```js
const texture = await Assets.load('https://pixijs.com/assets/p2.jpeg');
const tilingSprite = new TilingSprite({
    texture,
    width: 256 * 2,
    height: 256 * 2,
});
```

## Container 容器

> 将多个元素存储，可统一销毁，避免循环元素逐个销毁

### new Container() 参数

```js
const container = new PIXI.Container({
  x: app.screen.width / 2,
  y: app.screen.height / 2,
  isRenderGroup: true, //当内部有大量元素，可开启独立的渲染组
});
```

### 常用API

## Graphics 矢量图形

> 需要先绘制图形，再设置颜色等参数，否则将无法显示

### 遮罩内容溢出隐藏

> 遮罩也可以使用`Sprite`

```js
const frame = new PIXI.Graphics()
.rect(0, 0, 208, 208)
.fill(0x666666)
.stroke({ color: "red", width: 4 });

//绘制遮罩，遮罩必须有颜色才会显示内容
const mask = new PIXI.Graphics().rect(0, 0, 200, 200).fill("black");
const maskContainer = new PIXI.Container();
maskContainer.mask = mask;
maskContainer.addChild(mask);

// 创建一个 Text 实例，用于显示文本
const text = new Text({
    text: "This text will scroll up and be masked",
    style: {
      fontSize: 24,
      fill: 0x1010ff,
      wordWrap: true,
      wordWrapWidth: 180,
    },
    x: 10,
});

maskContainer.addChild(text);
frame.addChild(maskContainer);
```

### GraphicsContext 共享图形

> 当要批量绘制一些图形或者`SVG`，可绘制一个并复用

```js
const circleContext = new GraphicsContext().circle(100, 100, 50).fill("red");

for (let i = 0; i < 5; i++) {
  const circle = new Graphics(circleContext);
  circle.x = i * 200;
  app.stage.addChild(circle);
}
```

### 成员

### 方法

```json
//描边
stroke({
  alignment: '0-1'; //0-描边完全在内部 1-描边完全在内部，描边会消失
})
```

## Text

### 字体文件加载

> 文件名就是字体名称，但是如果子图有分隔符，需要在`fontFamily`用空格分隔
>
> 建议用于静态文本、少量文本

```js
Assets.addBundle('fonts', [
    { alias: 'ChaChicle', src: 'https://pixijs.com/assets/webfont-loader/ChaChicle.ttf' },
]);
const fonts = await Assets.loadBundle("fonts");

const text = new Text({
  text:'hello',
  style:{
    fontFamily:'ChaChicle'
  }
})
```

### 文字放大会模糊

> 可以将字体大小设置成放大后的大小，然后将字体缩小成正常大小
>

### BitmapFont 位图

> 当文字需要频繁更改时，建议使用位图
>
> 位图使用时的要根据`info`标签里的`face`来设置`fontFamily`，此时不能根据文件名来设置
>
> 建议用于动态文本、大量文本

```js
await Assets.load('https://pixijs.com/assets/bitmap-font/desyrel.xml');

const bitmapFontText = new BitmapText({
    text: 'lengyibai',
    style: {
        fontFamily: 'Desyrel',
    },
});
```

### 文字渐变

```js
  const richText = new Text({
    text: "RichRichRichRichRichRichRichRichRichRichRichRichRichRichRichRichRichRichRichRichRichRichRichRichRichRichRichRichRichRichRiRichRichRichRichRichRichRichRichRichRichRichRichRichRichRichRichRichRichRichRichRichRichRichRichRichRichRichRichRichRiRichRichRichRichRichRichRichRichRichRichRichRichRichRichRichRichRichRichRichRichRichRichRichRichRichRichRichRic",
    style: new TextStyle({
      fontFamily: "微软雅黑",
      fontSize: 30,
      fontStyle: "italic",
      fontWeight: "bold",
      stroke: { color: "white", width: 5, join: "miter" },
      dropShadow: {
        color: "#000000",
        blur: 10,
        angle: Math.PI / 2,
        distance: 5,
        alpha: 0.5,
      },
      wordWrap: true,
      breakWords: true,
      wordWrapWidth: 1000,
    }),
  });

  const textInfo = richText.getBounds();

  const fill = new FillGradient(0, textInfo.height / 2, textInfo.width / 2, textInfo.height / 2); //从左到右
  // const fill = new FillGradient(0, 0, 0, textInfo.height / 2); //从上到下
  // const fill = new FillGradient(
  //   textInfo.height / 2,
  //   textInfo.width / 2,
  //   textInfo.width / 2,
  //   textInfo.height / 2); //从左下到右上
  // const fill = new FillGradient(0, 0, textInfo.width / 2, textInfo.height / 2); //从左上到右下

  // 定义渐变的颜色和位置
  const colors = [
    { color: "red", position: 1 },
    { color: "blue", position: 1 },
  ];

  // 将颜色转换为数字并添加到渐变中
  colors.forEach(({ color, position }) => {
    const colorNumber = Color.shared.setValue(color).toNumber();
    fill.addColorStop(position, colorNumber);
  });

  richText.style.fill = fill;
  app.stage.addChild(richText);
```



### 成员

#### resolution 降低分辨率

> 默认为`1`，当低于`1`的时候文本会变模糊，高于`1`会出现锯齿，但相应的会变清晰

## Textures 纹理

### 创建图片纹理

```js
const image = new Image();
image.src = 'path/to/your/image.gif';
image.onload = () => {
  const texture = PIXI.Texture.from(image);
  const sprite = new PIXI.Sprite(texture);
  app.stage.addChild(sprite);
};
```

### 创建视频纹理

```js
const video = document.createElement('video');
video.src = '/video.mp4';
video.autoplay = true;
video.loop = true;
video.muted = true;

// 等待视频加载后创建纹理
video.addEventListener('loadeddata', () => {
    const texture = PIXI.Texture.from(video);
    const sprite = new PIXI.Sprite(texture);

    sprite.width = app.view.width;
    sprite.height = app.view.height;

    app.stage.addChild(sprite);
});
```

## Rectangle 边界框

> 可用于限制元素的移动范围，将元素的坐标与`Rectangle`提供的`API`进行边界检测

```js
const dudeBounds = new Rectangle(x, y, width, height);
```

### 碰撞检测

```js
const texture = PIXI.Texture.from('path/to/your/image.png');

// 创建两个 Sprite 对象
const object1 = new PIXI.Sprite(texture);
object1.position.set(100, 100);
app.stage.addChild(object1);

const object2 = new PIXI.Sprite(texture);
object2.position.set(150, 150);
app.stage.addChild(object2);

// 定义更新函数，用于移动物体并检测碰撞
app.ticker.add(() => {
    // 移动物体
    object1.x += 1;
    object1.y += 1;
    object2.x -= 1;
    object2.y -= 1;

    // 更新矩形的位置
    const rect1 = new PIXI.Rectangle(object1.x, object1.y, object1.width, object1.height);
    const rect2 = new PIXI.Rectangle(object2.x, object2.y, object2.width, object2.height);

    // 检测碰撞
    if (rect1.intersects(rect2)) {
        console.log('碰撞发生');
        // 处理碰撞逻辑
    }
});
```

## 滤镜

> 在部分场景，可能需要开启设置`new Application()`的参数：`useBackBuffer: true`，避免滤镜使用失败

```js
const pandaTexture = await Assets.load(`https://pixijs.com/assets/panda.png`);
const rainbowGradient = await Assets.load(`https://pixijs.com/assets/rainbow-gradient.png`);

const container = new Container();

const sprite = new Sprite({
    texture: pandaTexture,
    position: { x: size / 2, y: size / 2 },
});

const sprite2 = new Sprite({
    texture: rainbowGradient,
    blendMode: allBlendModes[i],
});

container.addChild(sprite, sprite2);
```

### 模糊

```js
const littleRobot = Sprite.from('https://pixijs.com/assets/pixi-filters/depth_blur_moby.jpg');
const blurFilter1 = new BlurFilter();
littleDudes.filters = [blurFilter1];
blurFilter1.blur = 20;
```



## 性能优化

### Graphics 矢量图形

> 销毁图形，避免内存泄漏

```js
const circle = new Graphics(circleContext);
circle.destroy();
```

> 重绘形状

```js
circle.clear();
circle.circle(100, 100, 50).fill("red");
```

### 滤镜

> 关闭滤镜

```js
container.filters = null
```

#### 设置滤镜范围

```js
 container.filterArea = new Rectangle(x,y,w,h)
```

## MeshPlane 网格平面

> 可用于对图片顶点进行操作，如实现水面波动、像素分解效果、草丛波动、旗帜飘动等对像素的操作
>
> 以下为草地波浪效果

```js

const texture = await Assets.load("https://pixijs.com/assets/bg_grass.jpg");

const plane = new MeshPlane({ texture, verticesX: 10, verticesY: 10 });
plane.x = 100;
plane.y = 100;

//获取顶点位置的缓冲区
const { buffer } = plane.geometry.getAttribute("aPosition");

let timer = 0;

app.ticker.add(() => {
for (let i = 0; i < buffer.data.length; i++) {
  buffer.data[i] += Math.sin(timer / 10 + i) * 0.5;
}
buffer.update();
timer++;
});

app.stage.addChild(plane);
```



## 通用API

| API               | 描述                                           |
| ----------------- | ---------------------------------------------- |
| pivot.x / pivot.y | 将数值设置为元素宽度的一半，则会绕元素中心旋转 |
| tint              | 给元素上色                                     |

