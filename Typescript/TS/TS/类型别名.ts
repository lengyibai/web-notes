type type1 = string | number;
type type2 = {
  a: String;
};

function fn1(a: type1) {
  console.log(a);
}
function fn2(a: type2) {
  console.log(a);
}

fn1("a");
fn2({ a: "冷弋白" });

export {};
