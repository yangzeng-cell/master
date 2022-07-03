// const obj = {
//   _name: "why",
//   age: 18,
//   height: 1.88,
//   get name() {
//     return this._name;
//   },
//   set name(value) {
//     this._name = value;
//   },
// };
// for (const item of Object.keys(obj)) {
//   let value = obj[item];
//   Object.defineProperty(obj, item, {
//     configurable: true,
//     enumerable: true,
//     get() {
//       return value;
//     },
//     set(data) {
//       value = data;
//     },
//   });
// }
// obj.name = "张三";
// obj.name;
const obj = {
  _name: "why",
  age: 18,
  height: 1.88,
  get name() {
    return this._name;
  },
  set name(value) {
    this._name = value;
  },
};
const newProxy = new Proxy(obj, {
  get(target, key, receiver) {
    console.log(target[key]);
    // return target[key];
    // 用Reflect不去直接操作target,Reflect有返回值，
    // 判断操作是否成功,receiver参数可以设置this的指向,receiver默认指向proxy
    // this的默认指向target
    // 使用receiver可以深度监听get和set,可以监听obj.name,还可以监听到this._name
    return Reflect.get(target, key, receiver);
  },
  set(target, key, newValue, receiver) {
    console.log(`设置${target[key]}=${newValue}`);
    // target[key] = newValue;
    const isSuccess = Reflect.set(target, key, newValue, receiver);
    return isSuccess;
  },
  has(target, key) {
    // return key in target;
    return Reflect.has(target, key);
  },
  deleteProperty(target, key) {
    // if (key in target) {
    //   delete target[key];
    // }
    return Reflect.deleteProperty(target, key);
  },
  defineProperty(target, key, attributes) {
    // return {
    //   configurable: true,
    //   enumerable: true,
    //   writable: true,
    //   value: target[key],
    // };
    return Reflect.defineProperty(target, key, attributes);
  },
  getPrototypeOf(target) {
    console.log("getPrototypeOf");
    // return Object.getPrototypeOf(target); //返回值必须是非空对象或者null
    return Reflect.getPrototypeOf(target);
  },
  getOwnPropertyDescriptor(target, key) {
    // 返回值必须是非空对象或者undefined
    // console.log("getOwnPropertyDescriptor");

    return Reflect.getOwnPropertyDescriptor(target, key);
  },
  ownKeys(target) {
    console.log("ownKeys");
    return Object.keys(target);
  },
  setPrototypeOf(target, prototype) {
    target.__proto__ = prototype;
    return target.__proto__ ? true : false;
  },
  preventExtensions(target) {
    Object.preventExtensions(target);
    return true;
  },
});
//proxy就是代理obj,监听对对象的操作
console.log(newProxy.name);
newProxy.name = "渣男";
newProxy.name;
obj.name = "lisi"; //不会触发proxy的捕获器get/set,需要使用newProxy
