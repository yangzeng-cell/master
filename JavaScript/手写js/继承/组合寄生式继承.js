function Person(name, age, friends) {
  this.name = name;
  this.age = age;
  this.friends = friends;
}

Person.prototype.running = function () {
  console.log("running~");
};

Person.prototype.eating = function () {
  console.log("eating~");
};

function Student(name, age, friends, sno, score) {
  Person.call(this, name, age, friends);
  this.sno = sno;
  this.score = score;
}

function extendFn(subFn, superFn) {
  subFn.prototype = Object.create(superFn.prototype);
  Object.defineProperty(subFn.prototype, "constructor", {
    enumerable: true,
    configurable: false,
    writable: true,
    value: subFn,
  });
}

extendFn(Student, Person);
Student.prototype.studying = function () {
  console.log("studying~");
};

var stu = new Student("why", 18, ["kobe"], 111, 100);
console.log(stu);
stu.studying();
stu.running();
stu.eating();

console.log(stu.constructor.name);

function createObj(obj) {
  function Fn() {}
  Fn.prototype = obj;
  return new Fn();
}
