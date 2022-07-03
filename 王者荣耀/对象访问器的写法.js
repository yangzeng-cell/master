var obj = {
  name: "mike",
};
//对象访问器的写法一
Object.defineProperty(obj, "name", {
  configurable: true,
  enumerable: true,
  get() {
    return obj.name;
  },
  set(value) {
    obj.name = value;
  },
});

//对象访问器的写法二
var obj2 = {
  name: "zhang",
  get getName() {
    return this.name;
  },
  set setName(value) {
    this.name = value;
  },
};

class Person {
  constructor(name) {
    this._name = name;
  }
  get name() {
    return this._name;
  }
  set name(value) {
    this._name = value;
  }
}
