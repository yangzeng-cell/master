Function.prototype.hyCall = function (thisArg, ...args) {
  let fn = this;
  thisArg = thisArg != null ? Object(thisArg) : globalThis;
  thisArg.fn = fn;
  let result = thisArg.fn(...args);
  delete thisArg.fn;
  return result;
};
function foo() {
  console.log("foo函数被执行", this);
}

function sum(num1, num2) {
  console.log("sum函数被执行", this, num1, num2);
  return num1 + num2;
}

foo.call(undefined);
var result = sum.call({}, 20, 30);
// console.log("系统调用的结果:", result)
// 自己实现的函数的hycall方法
// 默认进行隐式绑定
// foo.hycall({name: "why"})
foo.hyCall(undefined);
var result = sum.hyCall("abc", 20, 30);
console.log("hycall的调用:", result);
