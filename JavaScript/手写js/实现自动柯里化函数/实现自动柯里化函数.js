function hyCurrying(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      return function curried2(...args2) {
        return curried.apply(this, args.concat(args2));
      };
    }
  };
}

function add1(x, y, z) {
  return x + y + z;
}

var curryAdd = hyCurrying(add1);

console.log(curryAdd(10, 20, 30));
console.log(curryAdd(10, 20)(30));
console.log(curryAdd(10)(20)(30));

// function foo(x, y, z, m, n, a, b) {

// }
// console.log(foo.length)

function foo(x, y, z) {
  return x + y + z;
}

console.log(foo.call({}, 1, 2, 3));

var curryFoo = hyCurrying(foo);
console.log(curryFoo.call({}, 1));
