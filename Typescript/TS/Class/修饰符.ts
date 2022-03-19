class Person {
  //通过 private 修饰的变量，在外部是无法访问的，只能在 Person 内部 this 访问，默认为 public
  private name: string = "lengyibai";
  //通过 protected 修饰的变量可在内部和继承的子类访问
  protected age: number = 21;
  // 通过 readonly 修饰的变量只能在内部构造器内修改，外部及子类无法修改，但可以通过构造器传参隐式修改
  readonly id: number = 101;
  getName() {
    return this.name;
  }
  constructor(id: number) {
    this.id = id;
  }
}

class Student extends Person {
  constructor() {
    super(102);
    console.log(this.age);
  }
}

const p = new Person(103);
console.log(p.id);


export {};
