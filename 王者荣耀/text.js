// console.log("" == null);
// console.log(Number(""));
// console.log(Number(null));

//立即执行函数
var result = (function app(data) {
  return data;
})(12);

console.log(result);

const btnRtm1 = document.querySelectorAll(".btn");
for (var i = 0; i < btnRtm.length; i++) {
  var btn = btnRtm[i];
  (function (m) {
    btn.onclick = function () {
      console.log(m);
    };
  })(i);
}
// 打印 4 4 4 4 .....
// 立即执行函数可以解决上述问题还有for循环中有异步代码例如setTimeout，也可以用let解决
// 因为在如下代码中，但执行onclick执行的时候，此时for循环已经执行完，i已经变成btnRtm.length 所以执行代码永远是4 4 4
const btnRtm = document.querySelectorAll(".btn");
for (var i = 0; i < btnRtm.length; i++) {
  var btn = btnRtm[i];
  (function (m) {
    btn.onclick = function () {
      console.log(m);
    };
  })(i);
}
// 打印 1 2 3 4....
const btnRtm3 = document.querySelectorAll(".btn");
for (let i = 0; i < btnRtm.length; i++) {
  var btn = btnRtm[i];

  btn.onclick = function () {
    console.log(i);
  };
}
// 打印1 2 3 4 .....

// 匿名函数多种写法
(function (fn) {
  console.log("立即执行函数");
})();

// + - ！都可以，但是不要这样用
+(function foo() {
  console.log("立即执行函数");
})();

obj = {
  name: "mike",
  price: 18,
  value() {
    return "t";
  },
  age: function () {},
};
