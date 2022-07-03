Function.prototype.myCall = function (thisArg, ...arg) {
  thisArg = thisArg != null ? Object(thisArg) : globalThis;
  var fn = this;
  thisArg.fn = fn;
  const result = thisArg.fn(...arg);
  delete thisArg.fn;
  return result;
};

function foo() {
  console.log(this);
}

foo.myCall(null);
