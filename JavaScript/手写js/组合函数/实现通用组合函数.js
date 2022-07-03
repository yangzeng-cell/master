function hyCompose(...fn) {
  let length = fn.length;
  for (let i = 0; i < length; i++) {
    if (typeof fn[i] !== "function") {
      throw new Error("Expected arguments are functions");
    }
  }

  function compose(...args) {
    let index = 0;
    let result = length > 0 ? fn[index].apply(this, args) : args;
    while (++index < length) {
      result = fn[index].apply(this, [result]);
    }
    return result;
  }
  return compose;
}

function double(m) {
  return m * 2;
}

function square(n) {
  return n ** 2;
}

var newFn = hyCompose(double, square);
console.log(newFn(10));
