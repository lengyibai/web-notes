//#####··········函数··········#####//
//####········返回值········####//
//#··不带返回值加 void··#//
function fn1(): void {}

//#··带返回值··#//
function fn2(): number {
  return 1;
}

//#··当匿名函数作为参数时，匿名函数内的参数可以不写类型注解，会自动通过上下文环境推导出来··#//
const arr = [1, "2", [3]];
arr.forEach((item) => {});

//####········参数类型········####//
//#··基础类型··#//
type AddFnType = (a: number, b: number) => number;
const fn3: AddFnType = function (a: number, b: number) {
  return a + b;
};
const a = fn3(2, 3);
console.log(a * 10);

//#··对象类型··#//
function fn6(a: { x: string; y: number }) {}
fn6({ x: "冷弋白", y: 21 });

//#··函数类型··#//
type Fn = () => void;
function fn7(fn: Fn) {
  fn();
}
function foo() {
  console.log("冷弋白");
}
fn7(foo);

//#··可选类型··#//
//必须写在必选类型的后面
function fn8(a: number, b?: string) {
  console.log(b?.length); //如果使用可选类型的参数的属性，则需要加上 ?，否则报错
}
//等同于
// function fn(a: string | undefined) {}
fn8(21);

//#··默认值··#//
function fn9(a: number = 10, b: number) {
  console.log(a, b);
}
// 传递 undefined 可使用默认值，但尽量将有默认值的参数写在后面
fn9(undefined, 10);

//#··剩余参数··#//
function fn10(num1: number, ...num: number[]): number {
  let sum = num1;
  num.forEach((item) => {
    sum += item;
  });
  return sum;
}
console.log(fn10(10, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1));

//#··this 默认推导··#//
const obj1 = {
  name: "冷弋白",
  info() {
    return this.name;
  },
};
console.log(obj1.info());

//#··this 不明确类型··#//
type T2 = { name: string };
function fn11(this: T2, message: string) {
  console.log(this.name, message);
}
const info = {
  name: "lyb",
  info: fn11,
};
// 隐式绑定 this
info.info("666"); //当函数处于对象内，第一参数的this会使用当前对象，直接略过了第一参数

//显示绑定
fn11.call({ name: "lengyibai" }, "冷弋白");

//####········小案例········####//
function calc(
  num1: number,
  num2: number,
  fn: (num1: number, num2: number) => number
): number {
  return fn(num1, num2);
}

console.log(
  calc(20, 30, (a, b) => {
    return a * b;
  })
);

export {};
