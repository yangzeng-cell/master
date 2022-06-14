// console.log("代码开始执行");

// const promise = new Promise((resolve, reject) => {
//   console.log("promise内部");
//   setTimeout(() => {
//     console.log("setTimeout的执行");
//   });
//   resolve("promise第一次执行");
// });

// promise.then((res) => console.log(res));
// console.log("代码执行完成");

// setTimeout(function () {
//   console.log("setTimeout1");
//   new Promise((resolve, reject) => {
//     resolve();
//   }).then(function () {
//     new Promise(function (resolve) {
//       resolve();
//     }).then(function () {
//       console.log("then4");
//     });
//     console.log("then2");
//   });
// });

// new Promise(function (resolve) {
//   console.log("promise1");
//   resolve();
// }).then(function () {
//   console.log("then1");
// });

// setTimeout(function () {
//   console.log("setTimeout2");
// });

// console.log(2);

// queueMicrotask(() => {
//   console.log("queueMicrotask");
// });

// new Promise(function () {
//   console.log("then3");
// });

/**
 * promise1
 * 2
 * then3
 * then1
 * queueMicrotask
 * setTimeout1
 * then2
 * then4
 * setTimeout2
 */

async function async1() {
  console.log("async start");
  await async2();
  console.log("async1 end");
}

async function async2() {
  console.log("async2");
}

console.log("script start");

setTimeout(function () {
  console.log("setTimeout");
}, 0);

async1();

new Promise((resolve) => {
  console.log("promsie1");
  resolve();
}).then(function () {
  console.log("promsie2");
});

console.log("script end");
