// Function.prototype.MyApply = function (thisArg, argArray = []) {
//   thisArg = thisArg == null ? globalThis : Object(thisArg);
//   var fn = this;
//   // thisArg.fn = fn;
//   // 第二种写法
//   Object.defineProperty(thisArg, "fn", {
//     configurable: true,
//     enumerable: false,
//     value: fn,
//   });
//   const result = thisArg.fn(...argArray);
//   delete thisArg.fn;
//   return result;
// };

// var str = "aaaaaaaaa";

// const res = Array.prototype.slice.MyApply(str);
// console.log(res);

// function thix() {
//   console.log(arguments);
//   return this;
// }

// const res1 = thix.MyApply(str, "111");
// console.log(res1);
// 封装，因为call,apply代码中有相同的代码
Function.prototype.execFn = function (thisArg, argArray) {
  thisArg = thisArg == null ? globalThis : Object(thisArg);
  const fn = Symbol();
  Object.defineProperty(thisArg, "fn", {
    configurable: true,
    enumerable: false,
    value: this,
  });
  const result = thisArg.fn(...argArray);
  delete thisArg.fn;
  return result;
};

Function.prototype.MyApply1 = function (thisArg, argArray = []) {
  return this.execFn(thisArg, argArray);
};
Function.prototype.mycall = function (thisArg, ...otherArg) {
  return this.execFn(thisArg, ...otherArg);
};
var str = "aaaaaaaaa";

const res = Array.prototype.slice.MyApply1(str);
console.log(res);

function thix() {
  console.log(arguments);
  return this;
}

const res1 = thix.MyApply1(str, "111");
console.log(res1);
