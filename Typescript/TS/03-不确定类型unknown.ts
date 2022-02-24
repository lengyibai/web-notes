let flag: boolean = false;
/**
 * any 类型的变量可以赋值给任何类型的其他变量，但 unknown 不可以
 * unknown 类型只能赋值给 unknown 和 any 类型的变量，不用 any 的原因是为了防止变量被滥用
 *
 */
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

export {};
