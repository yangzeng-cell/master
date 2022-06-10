function Person(name, age) {
  this.name = name;
  this.age = age;
}

function Student(name, age) {
  // Person.call(this, name, age);
}
//可以替代Person.call/apply
//就是通过Person为构造函数创建一个对象，并传入参数，第三个参数是给创建的实例指定构造函数。如果没有指定则指向Person
const stu = Reflect.construct(Person, ["张胜男", 18], Student);
console.log(stu.age);
console.log(stu.__proto__ === Student.prototype); //true
