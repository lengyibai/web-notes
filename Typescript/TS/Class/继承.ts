class Person {
  name: string = "";
  age: number = 0;
  eating() {
    console.log("吃饭");
  }
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}

class Student extends Person {
  sno: number = 1001;
  study() {
    console.log("学习");
  }
  constructor(name: string, age: number, sno?: number) {
    super(name, age); //通过super指向父类构造器，才能调用里面的属性及方法，且必须写在第一行
  }
  /* 重写父类方法 */
  eating() {
    super.eating(); //通过super调用父类方法
    console.log("学生吃饭");
  }
}

class Teacher extends Person {
  tno: number = 101;
  teach() {
    console.log("教育");
  }
}

let student = new Student("冷弋白", 21);
let teacher = new Teacher("老师", 31);
console.log(student.name);

student.eating();
