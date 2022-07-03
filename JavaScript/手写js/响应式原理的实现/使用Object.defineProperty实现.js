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

const targetMap = new WeakMap();
function getDepend(target, key) {
  let map = targetMap.get(target);
  if (!map) {
    map = new Map();
    targetMap.set(target, map);
  }
  let depend = map.get(key);
  if (!depend) {
    depend = new Depend();
    map.set(key, depend);
  }
  return depend;
}

// const objProxy=new Proxy(obj,{
//     get:function(target,key,receiver){
//         const depend=getDepend(target,key)
//         depend.addDepend(activeReactiveFn)
//         return  Reflect.get(target,key,receiver)
//     },
//     set:function(target,key,newValue,receiver){
//         Reflect.set(target,key,newValue,receiver)
//         const depend=getDepend(target,key)
//         depend.notify()
//     }
// })

const obj = {
  name: "why", // depend对象
  age: 18, // depend对象
};

const reactive = function (obj) {
  Object.keys(obj).forEach((key) => {
    let value = obj[key];
    Object.defineProperty(obj, key, {
      get: function () {
        const depend = getDepend(obj, key);
        depend.addDepend(activeReactiveFn);
        return value;
      },
      set: function (newValue) {
        value = newValue;
        const depend = getDepend(obj, key);
        depend.notify();
      },
    });
  });
  return obj;
};
const infoProxy = reactive({
  address: "广州市",
  height: 1.88,
});

watchFn(() => {
  console.log(infoProxy.address);
});

infoProxy.address = "北京市";

const foo = reactive({
  name: "foo",
});

watchFn(() => {
  console.log(foo.name);
});

foo.name = "bar";
foo.name = "hhh";
