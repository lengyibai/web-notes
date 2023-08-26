// 案例1
function fn1(a: string | number) {
  if (typeof a === "number") {
    console.log(a + "是数字");
  } else {
    console.log(a + "是字符串");
  }
}
fn1(123);

// 案例2
class Student {
  studying() {
    console.log("学习");
  }
}
class Teacher {
  teaching() {
    console.log("教育");
  }
}

function fn2(a: Student | Teacher) {
  if (a instanceof Student) {
    a.studying();
  }
}
fn2(new Student());

// 案例3
type Fish = {
  swimming: () => void;
};
type Dog = {
  running: () => void;
};
function fn3(animal: Fish | Dog) {
  if ("swimming" in animal) {
    animal.swimming();
  }
}
fn3({
  swimming() {
    console.log("游泳");
  },
});
export {};