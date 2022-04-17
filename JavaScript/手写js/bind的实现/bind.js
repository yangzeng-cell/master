Function.prototype.hybind = function (thisArg, ...args) {
  let fn = this;
  thisArg = thisArg != null ? Object(thisArg) : globalThis;

  return function newFn(...argArray) {
    thisArg.fn = fn;
    let argTotal = [...args, ...argArray];
    let result = thisArg.fn(...argTotal);
    delete thisArg.fn;
    return result;
  };
};

function foo() {
  console.log("foo被执行", this);
  return 20;
}

function sum(num1, num2, num3, num4) {
  console.log(num1, num2, num3, num4);
}

// 系统的bind使用
var bar = foo.bind("abc");
bar();

// var newSum = sum.bind("aaa", 10, 20, 30, 40)
// newSum()

// var newSum = sum.bind("aaa")
// newSum(10, 20, 30, 40)

// var newSum = sum.bind("aaa", 10)
// newSum(20, 30, 40)

// 使用自己定义的bind
// var bar = foo.hybind("abc")
// var result = bar()
// console.log(result)

var newSum = sum.hybind("abc", 10, 20);
var result = newSum(30, 40);
