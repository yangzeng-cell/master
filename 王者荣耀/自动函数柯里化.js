function autoCarry(fn) {
  return function carryFn(...val) {
    if (val.length >= fn.length) {
      // 考虑到this的绑定
      fn.apply(this, val);
      // fn(...val)
    } else {
      return function (...val2) {
        // 考虑到this的绑定
        return carryFn.apply(this, [...val, ...val2]);
        // return carryFn(...val, ...val2)
      };
    }
  };
}

function foo(x, y, z) {
  console.log(x + y + z);
}

const foo1 = autoCarry(foo);
foo1(1)(2)(3);
foo1(1, 2, 3);
foo1(1, 2)(3);

foo.apply();
