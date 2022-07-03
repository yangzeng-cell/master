Function.prototype.myBind = function (thisArg, ...arg) {
  thisArg = thisArg != null ? Object(thisArg) : globalThis;
  Object.defineProperty(thisArg, "fn", {
    configurable: true,
    enumerable: false,
    value: this,
  });
  return function (...otherArg) {
    thisArg.fn(...arg, ...otherArg);
  };
};

Function.prototype.myBind2 = function (thisArg, ...arg) {
  thisArg = thisArg != null ? Object(thisArg) : globalThis;
  Object.defineProperty(thisArg, "fn", {
    configurable: true,
    enumerable: false,
    value: this,
  });
  return (...otherArg) => {
    thisArg.fn(...arg, ...otherArg);
  };
};
function foo(a, b) {
  console.log(a, b);
}

const bar = foo.myBind("aaa", 1);
bar(2);
