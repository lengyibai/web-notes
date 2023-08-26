# Typescript

> `npm install -g typescript`
>
> `npm install -g ts-node`
>
> `npm install -D tslib @types/node`

## 类

```ts
class Husband {
  名字: string;
  private 私房钱: number;
  protected 家产: number;
  constructor() {
    this.名字 = '张三';
    this.私房钱 = 100000;
    this.家产 = 1000000;
  }

  son() {
    return `爸爸有私房钱${ this.私房钱 }元`;
  }
  take(拿走的钱: number) {
    if (拿走的钱 > this.私房钱) {
      console.log('真没那么多');
    } else {
      this.私房钱 -= 拿走的钱
    }
    return this.私房钱
  }
}

class Wife extends Husband {
  getInfo() {
    console.log(`我老公叫${ this.名字 }，他告诉了我家里有${ this.家产 }元，但没告诉我他的私房钱，这是他的隐私`)
    console.log(`但是儿子悄悄跟我说：${ this.son() }`);
    console.log(`然后我就拿走了99999元，现在他只有${ this.take(99999) }元`);
  }
}

const w = new Wife();
w.getInfo()

```

## interface

> 写一个同名`interface`可为其添加新属性

```ts
interface Person {
  age: number;
}

interface Person {
  age: number;
}

let tom: Person = {
  name: 'Tom',
  age: 25,
};
```

### 允许任意属性

```ts
interface Person {
  name: string;
  age: number;
  //string 是属性类型，值为 any 类型，如果不是 any 是 string，那 age 就不能是number，任意类型为 string 相当于 name 和 age 统一设定成了 string，所以只能为 any，但也可为联合类型
  [propName: string]: any; 
}

let tom: Person = {
    a:'a',
    b:'a',
    c:'a',
};
```

## 函数

### 重载

> 返回值不明确

```ts
function reverse(x: number | string): number | string | void {
    if (typeof x === 'number') {
        return Number(x.toString().split('').reverse().join(''));
    } else if (typeof x === 'string') {
        return x.split('').reverse().join('');
    }
}
```

> 重载解决

```ts
function reverse(x: number): number;
function reverse(x: string): string;
function reverse(x: number | string): number | string | void {
    if (typeof x === 'number') {
        return Number(x.toString().split('').reverse().join(''));
    } else if (typeof x === 'string') {
        return x.split('').reverse().join('');
    }
}
```

## 断言

> 固定类型

```ts
function fn(a:'GET'|'POST'){
  console.log(a);

}

const obj = {
  a: 'GET'
} as const; //必须加了断言才能传参，否则会识别为String类型，而不是文字类型

fn(obj.a)
```

### is 断言

> 使用`unknown`可避免将`any`赋给任何值

```ts
interface User {
  name: string
}

function foo(user: User) {
  console.log('hello, ' + user.name);
}

const userData = JSON.stringify({ name: 'Jany' })

const user: unknown = JSON.parse(
  userData
);

//user is User 的意思是：当 isUser 函数返回值为 true 的时候，就把 user 这个值断言为 User 类型
function isUser(user: any): user is User {
  return typeof user === 'object' &&
    typeof user.name === 'string'
}

if (isUser(user)) {
  foo(user);
}
```

### 将一个父类断言为更加具体的子类

> 当类之间有继承关系时，类型断言也是很常见的

```ts
interface ApiError extends Error {
    code: number;
}
interface HttpError extends Error {
    statusCode: number;
}

function isApiError(error: Error) {
    if (typeof (error as ApiError).code === 'number') {
        return true;
    }
    return false;
}
```

> 如果是类

```ts
class ApiError extends Error {
    code: number = 0;
}
class HttpError extends Error {
    statusCode: number = 200;
}

function isApiError(error: Error) {
    if (error instanceof ApiError) {
        return true;
    }
    return false;
}
```

### window报错

```ts
window.foo = 1;

// window 上不存在 foo 属性

// 解决
(window as any).foo = 1;
```

### 将返回值为any的断言为精确的类型

```ts
function getCacheData(key: string): any {
    return (window as any).cache[key];
}

interface Cat {
    name: string;
    run(): void;
}

const tom = getCacheData('tom') as Cat;
tom.run();
```

### 易错例子

> TypeScript 并不关心 user 和 person 之间定义时是什么关系，而只会看它们最终的结构有什么关系——所以它与 user extends person 是等价的：

```ts
interface user {
  name: string;
}

interface person {
  name: string;
  age: number;
}

let user: person = {
  name: '冷弋白',
  age: 20,
};

let lyb: user = user;

//等价于
interface Animal {
    name: string;
}
interface Cat extends Animal {
    run(): void;
}
```

### 类型断言 vs 类型声明

> `user` 断言为 `person`，只需要满足 `person` 兼容 `user` 或 `user` 兼容 `person` 即可
>
> `person` 赋值给 `user`，需要满足 `user` 兼容 `person` 才行

```ts
interface user {
  name: string;
}

interface person {
  name: string;
  age: number;
}

let user: user = {
  name: '冷弋白',
};

let lyb = user as person;

let lyb: person = user;
//类型 "user" 中缺少属性 "age"，但类型 "person" 中需要该属性
```



## 枚举

> 可以通过`value`查`key`，也可通过key查`value`
> 一般只能赋数字，手动赋值后面的都会`+1`赋初值

```ts
enum Color { Red, Green = 3, Blue }
console.log(Color[0], Color.Green, Color.Blue); //Red 3 4 
```

# 常见报错

> 将值`as`为`string`

```
不能将类型“string | null”分配给类型“string | number | boolean”。
不能将类型“null”分配给类型“string | number | boolean”。ts(2322)
```

> 在对象可能为未定义的属性后面加`!`

```
对象可能为“未定义”。ts(2532)
```

> 不存在原生的`style`属性

```js
const particles: NodeListOf<HTMLElement> = lib.querySelectorAll('.particle');
```

> 给类设置类型，类型就是类自身

```
不能将类型“default”分配给类型...
```
