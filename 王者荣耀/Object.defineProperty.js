var obj = {
  name1: "kike",
  age: 18,
};

Object.defineProperty(obj, "name1", {
  configurable: false,
  value: "zhang",
});

console.log(obj);

// console.log(Object.getOwnPropertyDescriptor(obj, "name1"));

// Object.preventExtensions(obj);
// Object.seal(obj);
Object.freeze(obj);
obj.gender = "girl";
obj.name1 = "sdfafas";
console.log(Object.getOwnPropertyDescriptors(obj));
