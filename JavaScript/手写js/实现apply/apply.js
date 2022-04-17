Function.prototype.hyApply = function (thisArg, args) {
  let fn = this;
  thisArg = thisArg != null ? Object(thisArg) : globalThis;
  thisArg.fn = fn;
  args = args || [];
  let result = thisArg.fn(...args);
  delete thisArg.fn;
  return result;
};

function sum(num1, num2) {
  console.log("sum被调用", this, num1, num2);
  return num1 + num2;
}

function foo(num) {
  return num;
}

function bar() {
  console.log("bar函数被执行", this);
}

// 系统调用;
// var result = sum.apply("abc", 20);
// console.log(result);

// 自己实现的调用;
var result = sum.hyApply("abc", [20, 30]);
console.log(result);

var result2 = foo.hyApply("abc", [20]);
console.log(result2);

bar.hyApply(0);
