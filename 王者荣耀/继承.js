function Person(name, age) {
  this.name = name;
  this.age = age;
  console.log("person 类");
}

Person.prototype.getName = function () {
  return this.name;
};
Person.prototype.setName = function (name) {
  this.name = name;
};
Person.see = function () {
  console.log("person的静态方法");
};

function Student(name, age, weight, heigth) {
  Person.call(this, name, age);
  this.weight = weight;
  this.heigth = heigth;
  console.log("stiudent 类");
}

// Student.prototype = new Person("mike", 18);

// const stu = new Student("mei", 49, 50, 180);

// console.log(stu.getName());
// Person.see();

// Student.getWeight = function () {
//   console.log(this.weight);
// };

// Student.getWeight();

// 使用这个方法来处理Object.create()的兼容性问题
function createObject(o) {
  function F() {}
  F.prototype = o;
  return new F();
}
// 封装工具函数实现继承
function inhert(Subtype, Supertype) {
  // Subtype.prototype = createObject(Supertype.prototype);
  Subtype.prototype = Object.create(Supertype.prototype);
  Object.defineProperty(Subtype, "constructor", {
    configurable: false,
    enumerable: false,
    value: Supertype,
    writable: true,
  });
}
inhert(Student, Person);
Object.assign(Student, Person);

Student.see();
const stu = new Student("mei", 49, 50, 180);
console.log(stu.getName());
