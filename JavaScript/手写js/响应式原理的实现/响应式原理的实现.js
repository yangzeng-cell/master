class Depend {
  constructor() {
    this.reactiveFn = new Set();
  }
  addDepend(fn) {
    if (fn) {
      this.reactiveFn.add(fn);
    }
  }
  notify() {
    this.reactiveFn.forEach((fn) => {
      fn();
    });
  }
}
let activeReactiveFn = null;
function watchFn(fn) {
  activeReactiveFn = fn;
  fn();
  activeReactiveFn = null;
}
const weakmap = new WeakMap();
function getDepend(target, key) {
  let map = weakmap.get(target);
  if (!map) {
    map = new Map();
    weakmap.set(target, map);
  }
  let keyDepend = map.get(key);
  if (!keyDepend) {
    keyDepend = new Depend();
    map.set(key, keyDepend);
  }
  return keyDepend;
}
const obj = {
  name: "why", // depend对象
  age: 18, // depend对象
};

const objProxy = new Proxy(obj, {
  get: function (target, key, receiver) {
    const depend = new getDepend(target, key);
    depend.addDepend(activeReactiveFn);
    return Reflect.get(target, key, receiver);
  },
  set: function (target, key, newValue, receiver) {
    Reflect.set(target, key, newValue, receiver);
    const depend = new getDepend(target, key);
    depend.notify();
  },
});

watchFn(function () {
  console.log("-----第一个name函数开始------");
  console.log("你好啊, 李银河");
  console.log("Hello World");
  console.log(objProxy.name); // 100行
  console.log("-----第一个name函数结束------");
});

watchFn(function () {
  console.log(objProxy.name, "demo function -------");
});

watchFn(function () {
  console.log(objProxy.age, "age 发生变化是需要执行的----1");
});

watchFn(function () {
  console.log(objProxy.age, "age 发生变化是需要执行的----2");
});

watchFn(function () {
  console.log(objProxy.name, "新函数");
  console.log(objProxy.age, "新函数");
});

console.log("------------------------------改变obj的name值");

objProxy.name = "kobe";
