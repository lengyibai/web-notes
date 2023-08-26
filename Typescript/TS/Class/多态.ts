class Animal {
  action() {
    console.log("运动");
  }
}

class Dog extends Animal {
  action() {
    console.log("走");
  }
}
class Fish extends Animal {
  action() {
    console.log("游");
  }
}

// 多态
function action(action: Animal[]) {
  action.forEach((item) => {
    item.action();
  });
}

action([new Dog(), new Fish()]);
