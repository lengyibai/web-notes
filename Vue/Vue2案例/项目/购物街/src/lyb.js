//后端数据
let obj = {
  str: {
    name: '冷弋白',
    gender: '男',
  },
  num: {
    age: 21,
  },
  is: {
    married: false,
    graduation: false,
  },
};

class Lyb {
  constructor(str, num, is) {
    this.name = str.name;
    this.gender = str.gender;
    this.age = num.age;
    this.married = is.married;
    this.graduation = is.graduation;
  }
}

const lyb = new Lyb(obj.str, obj.num, obj.is);

console.log(lyb.name); //冷弋白
