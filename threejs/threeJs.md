# ThreeJS

## 渲染器

```ts
const renderer = new THREE.WebGLRenderer();

//需要在requestAnimationFrame实时更新
renderer.render(scene, camera);
```

### 常用API

#### 设置画布大小

```ts
renderer.setSize(window.innerWidth, window.innerHeight);
```

## 场景

```ts
const scene = new THREE.Scene();
```

## 轨道控制器

```ts
const orbit_controls = new OrbitControls(camera, renderer.domElement);

//需要在requestAnimationFrame实时更新动画
orbit_controls.update();
```

### 常用API

#### 阻尼效果

```ts
//设置阻尼效果
controls.enableDamping = true;
//设置阻尼系数
controls.dampingFactor = 0.05;
```

### 世界坐标辅助器

```ts
const axesHelper = new THREE.AxesHelper(100);
scene.add(this.axesHelper);
```

## 相机

### 透视相机

```ts
const camera = new THREE.PerspectiveCamera(
  75, //fov — 视野，以角度来表示，默认值是50
  innerWidth / innerHeight, //aspect — 长宽比，默认值是1（正方形画布）
  0.1, //near — 可看到的最近距离，默认值是0.1
  1000, //far — 可看到的最远距离，默认值是2000
);

```

### 常用API

#### 设置位置

```ts
camera.position.x = 2;
camera.position.y = 2;
camera.position.z = 5;
```

## 几何体

```ts
//创建平面
const plan_geometry = new THREE.PlaneGeometry(1, 1);
//创建立方体
const box_geometry = new THREE.BoxGeometry(1, 1, 1)
```

### 常用API

#### 居中

```ts
geometry.center()
```

## 纹理

```ts
//创建基础纹理
const mesh_basic_material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })

material = new THREE.MeshBasicMaterial({
  color: 0xffffff, //纹理本体颜色
  map: texture, //纹理贴图
  transparent: true; //材质透明部分镂空
  side: THREE.DoubleSide, //渲染正反面
  aoMap: ao_map, //环境遮挡贴图
  aoMapIntensity: 1, //环境贴图强度
  lightMap: hight_map, //光照贴图
  reflectivity: 0.5, //反射强度
});
```

### 纹理加载器

```ts
const texture_loader = new THREE.TextureLoader();


texture.colorSpace = THREE.SRGBColorSpace; //显示物体本质颜色

//加载纹理
const texture = textureLoader.load("/textures/Bricks066_1K-JPG_Color.jpg");
//加载环境遮挡贴图
const ao_map = textureLoader.load("/textures/Bricks066_1K-JPG_AmbientOcclusion.jpg");
//加载高光贴图
const hight_map = textureLoader.load("/textures/Bricks066_1K-JPG_Roughness.jpg");
//导入HDR加载器
const hdr_loader = new RGBELoader();
hdr_loader.load("/textures/buikslotermeerplein_4k.hdr", (envMap) => {
  envMap.mapping = THREE.EquirectangularReflectionMapping; //设置球形映射
  scene.background = envMap; //设置为场景环境
  material.envMap = envMap; //设置镜面反射
});
```

### 常用API

#### 显示线框

```ts
mesh_basic_material.wireframe = true
```

#### 设置颜色

```ts
mesh_basic_material.color.set(value);
```

### 透明度

```ts
mesh_basic_material.opactiy = 0.5
```



## 物体类

> 物体类也可以放入物体类

```ts
const mesh = new THREE.Mesh(geometry, material)

//加入场景
scene.add(mesh)
```

### 常用API

```

```

## GUI

### 事件注册

```ts
const event_obj = {
  hello() {
    console.warn("你好");
  },
  world() {
    console.warn("世界");
  },
};

const gui = new GUI();
gui.add(event_obj, "hello").name("你好");
gui.add(event_obj, "world").name("世界");
```

### 类型

```ts
//普通按钮
gui.add(event_obj, "hello").name("你好");

//滑动值
folder.add(mesh.position, "x").min(-5).max(5).name("调整X").step(0.1);

//开关
gui.add(mesh.material, "wireframe").name("父元素边框模式");

//颜色
const colors = {
  color1: "#00ff00",
};
gui.addColor(colors, "cubeColor").onChange((value) => {
  mesh_basic_material.color.set(value);
});

//选择器
gui.add(texture, "colorSpace", {
  sRGB: THREE.SRGBColorSpace,
  Linear: THREE.LinearSRGBColorSpace,
}).onChange(() => {
  texture.needsUpdate = true;//生效选择
}).name("颜色空间");
```

### 文件夹分组

```ts
const folder = gui.addFolder("立方体坐标");

folder.add(mesh.position, "x").min(-5).max(5).name("调整X").step(0.1);
```

## 雾化

> 雾的颜色要贴合场景背景色

```ts
//线性雾，0-50的距离没有雾，50开始显示雾
scene.fog = new THREE.Fog(0x999999, 0, 50);
//指数雾，相机附近提供清晰的视野，
// scene.fog = new THREE.FogExp2(0x999999, 0.05);
//设置场景背景
scene.background = new THREE.Color(0x999999);
```

## 模型

### 模型加载

> 加载`gltf`格式模型

```ts
const gltf_loader = new GLTFLoader();
gltf_loader.load("/public/model/boombox_4k.gltf/boombox_4k.gltf", (gltf) => {
  scene.add(gltf.scene);
});
```

> 解压`glb`格式模型

```ts
const gltf_loader = new GLTFLoader();
const draco_loader = new DRACOLoader();

draco_loader.setDecoderPath("/node_modules/three/examples/jsm/libs/draco/");
//设置glft加载器draco解码器
gltf_loader.setDRACOLoader(draco_loader);
//加载模型
gltf_loader.load("/public/model/BrainStem.glb", (gltf) => {
  scene.add(gltf.scene);
});
```

### 查找模型

```ts
//通过模型名称查找模型，模型名称位于gltf.scene.children.children.name
gltf_loader.load("/public/model/boombox_4k.gltf/boombox_4k.gltf", (gltf) => {
  gltf.scene.getObjectByName("Plane095_1")
});
```

## 包围盒/球(可用于碰撞检测)

### 包围盒

```ts
gltf_loader.load("/public/model/boombox_4k.gltf/boombox_4k.gltf", (gltf) => {
    this.scene.add(gltf.scene);
    const mesh = gltf.scene.getObjectByName("Plane095")!;
    //获取几何体属性
    // const mesh_geometry = mesh.geometry;
    //计算包围盒
    // mesh_geometry.computeBoundingBox();
    //获取包围盒
    // const meshBox = mesh_geometry.boundingBox!;
    //更新模型的世界矩阵，避免被缩放
    // mesh.updateWorldMatrix(true, true);
    //更新包围盒
    // meshBox.applyMatrix4(mesh.matrixWorld);
    //创建包围盒辅助器
    const meshBoxHelper = new THREE.BoxHelper(mesh, 0xffff00);
    //获取包围盒中心
    // const meshBoxCenter = meshBox.getCenter(new THREE.Vector3())
    this.scene.add(meshBoxHelper);
});
```

### 包围球

```ts
gltf_loader.load("/public/model/boombox_4k.gltf/boombox_4k.gltf", (gltf) => {
    this.scene.add(gltf.scene);
    const mesh = gltf.scene.getObjectByName("Plane095")!;
    
    //获取几何体属性
    const mesh_geometry = mesh.geometry;
    
    //获取包围球
    const meshSphere = mesh_geometry.boundingSphere;
    
    //创建包围盒辅助器
    const meshSphereHelper = new THREE.SphereGeometry(meshSphere?.radius, 16, 16);
    
    //设置基础材质
    const material = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
    });
    
    //创建网格
    const cube = new THREE.Mesh(meshSphereHelper, material);
    cube.position.copy(meshSphere!.center);
    this.scene.add(cube);
});
```

### 多个包围盒合并为一个

```ts
this.cube1 = new THREE.Mesh(
  new THREE.SphereGeometry(1, 16, 16),
  new THREE.MeshBasicMaterial({ color: 0x00ff00 }),
);
this.cube2 = new THREE.Mesh(
  new THREE.SphereGeometry(1, 16, 16),
  new THREE.MeshBasicMaterial({ color: 0x00ff00 }),
);
this.cube3 = new THREE.Mesh(
  new THREE.SphereGeometry(1, 16, 16),
  new THREE.MeshBasicMaterial({ color: 0x00ff00 }),
);

this.cube1.position.x = -3;
this.cube2.position.x = 3;
this.cube3.position.x = 0;

this.scene.add(this.cube1);
this.scene.add(this.cube2);
this.scene.add(this.cube3);

const box3 = new THREE.Box3();
const sphere_list = [this.cube1, this.cube2, this.cube3];

for (let index = 0; index < sphere_list.length; index++) {
  //获取包围盒
  const box = new THREE.Box3().setFromObject(sphere_list[index]);
  //合并包围盒
  box3.union(box);
}

//创建包围盒辅助器
const boxHelper = new THREE.Box3Helper(box3, 0xffff00);
this.scene.add(boxHelper);
```

## 动画

```ts
const mesh = new THREE.Mesh(geometry, material);
const tween = new Tween(mesh.position)
  .easing(Easing.Quadratic.Out)
  .to({ x: 4 }, 1000)
  .start()
  .onComplete(() => {
    tween1.start();
  });
const tween1 = new Tween(mesh.position)
  .delay(1000)
  .easing(Easing.Quadratic.Out)
  .to({ y: -4 }, 1000);

//需要在requestAnimationFrame实时更新
tween.update();
tween1.update();
```

## 实时渲染适配

```ts
//实时渲染图形
const rendering = () => {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(rendering);
};
rendering();

//自适应窗口大小
window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight); //更新渲染器宽高
  camera.aspect = window.innerWidth / window.innerHeight; //更新相机宽高比
  camera.updateProjectionMatrix(); //更新相机矩阵
});
```

