////··········联合类型··········////
// a:string|number
////··········类型别名··········////
type IDtype = {
  lyb: String;
};
//#####··········基本类型··········#####//
let str: string | number = "lyb";
let num: number = 123;
let a: null = null;
let b: undefined = undefined;

//#####··········复杂类型··········#####//
//####········数组········####//
let arr1: string[] = ["lyb"];
// 元组：数据类型固定
let arr2: [string, number] = ["张三", 18];

//####········对象········####//

//####········函数········####//
//#··函数类型写法··#//
type MyFunction = () => void;
const fn3: MyFunction = () => {};
//###······函数返回值写法······###//
//#··不带返回值加 void··#//
function fn1(): void {}
//#··带返回值写法，通常不写返回值类型注解，会自动推导··#//
function fn2(): number {
  return 3;
}
//#··当匿名函数作为参数时，匿名函数内的参数可以不写类型注解，会自动通过上下文环境推导出来··#//
const arr = [1, 2, 3];
arr.forEach(item => {});
//###······函数参数类型······###//
//#··基础类型··#//
function fn4(a: string) {}
//可选（与联合类型的 类型 | undefined 一致）
function fn5(a: string, b?: number) {}
fn5("冷弋白");
//#··对象类型··#//
function fn6(a: { x: string; y: number }) {}
fn6({ x: "冷弋白", y: 21 });

//#####··········其他类型··········#####/
//####········unknown········####//
let flag: boolean = false;
//any 类型的变量可以赋值给任何类型的其他变量，但 unknown 不可以
/* let result: any; */
//unknown 类型只能赋值给 unknown 和 any 类型的变量，不用 any 的原因是为了防止变量被滥用
let result: unknown;
//#··以下例子为不确定类型··#//
function foo(): string {
  return "abc";
}
function bar(): number {
  return 123;
}
if (flag) {
  result = foo();
} else {
  result = bar();
}

//####········void········####//
function useState<T>(state: T) {
  let currentState = state;
  const changeState = (newState: T) => {
    currentState = newState;
  };
  return [currentState, changeState];
}

const [counter, changeState] = useState(10);
console.log(counter, changeState);
