// const el = document.getElementById("img") as HTMLImageElement;
// el.src = "地址";

//#####········类型转换，尽量不用········#####//
const a = "冷弋白";
const b: number = a as unknown as number;
console.log(b);

//#####··········非空类型断言··········#####//
function fn(a?: string) {
  console.log(a!.toUpperCase()); //使null和undefined类型可以赋值给其他类型并通过编译
}
fn("lengyibai");
