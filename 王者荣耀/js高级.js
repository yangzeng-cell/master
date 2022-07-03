function foo(a) {
  this.a = a;
  console.log(this.a);
}

var obj = {
  a: 0,
};

var bar = foo.bind(obj);
// bar(2);

// setTimeout(function () {
//   console.log(this, "setTimeout");
// });

// [1, 2, 3, 4].forEach(function () {
//   console.log(this, "forEach");
// }, obj);

console.log(
  [1, 2, 3, 4]
    .filter((item) => item % 2 === 0)
    .map((item) => Math.pow(item, 2))
    .reduce((preValue, currenValue) => preValue + currenValue)
);

console.log(
  [1, 2, 3, 4]
    .filter((item) => item % 2 === 0)
    .reduce((preValue, currenValue) => preValue + Math.pow(currenValue, 2), 0)
);
