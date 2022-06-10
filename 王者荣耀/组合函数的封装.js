function componseFn(...fns) {
  for (let i = 0; i < fns.length; i++) {
    console.log(typeof fns[i]);
    if (typeof fns[i] !== "function") {
      throw new console.error();
    }
  }

  return function (...arg) {
    let result = fns[0].apply(this, arg);

    for (let i = 1; i < fns.length; i++) {
      result = fns[i].apply(this, [result]);
    }
    return result;
  };
}

function pow(num) {
  return num ** 2;
}

function add(num) {
  return ++num;
}

const compose = componseFn(pow, add, add);

console.log(compose(3));

const compose1 = componseFn(pow, add, console.log);

compose1(4);
