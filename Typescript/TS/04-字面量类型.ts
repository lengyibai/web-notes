type align = "top" | "bottom" | "left" | "right";
let a: align = "bottom"; //只允许选择以上几个

//#####··········字面量推理··········#####//
type Method = "GET" | "POST";
function request(url: string, method: Method) {}

//#··第一种方法··#//
/* type Request = {
  url: string;
  method: Method;
};
let options: Request = {
  url: "lengyibai.gitee.io/tv",
  method: "GET",
};
request(options.url, options.method); */

//#··第二种方法··#//
/* let options = {
  url: "lengyibai.gitee.io/tv",
  method: "GET",
};
request(options.url, options.method as Method); */

//#··第三种方法··#//
let options = {
  url: "lengyibai.gitee.io/tv",
  method: "GET",
} as const;
request(options.url, options.method);

export {};
