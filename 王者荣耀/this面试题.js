// var name = "window";
// var person = {
//   name: "person",
//   sayName() {
//     console.log(this.name);
//   },
// };

// function sayName() {
//   var sss = person.sayName;
//   sss();
//   person.sayName();
//   person.sayName();
//   (b = person.sayName)();
// }

// sayName();

// var name = "window";
// var person1 = {
//   name: "person1",
//   foo1() {
//     console.log(this.name);
//   },
//   foo2: () => console.log(this.name), //指向全局
//   foo3() {
//     return function () {
//       console.log(this.name);
//     };
//   },
//   foo4() {
//     return () => {
//       console.log(this.name);
//     };
//   },
// };
// var person2 = { name: "person2" };
// person1.foo1(); //person1
// person1.foo1.call(person2); //person2
// person1.foo2(); //window
// person1.foo2.call(person2); //window
// person1.foo3()(); //window()
// person1.foo3.call(person2)(); //window
// person1.foo4()(); //person1
// person1.foo4.call(person2)(); //person2
// person1.foo4().call(person2); //person1

// var name = "window";
// function Person(name) {
//   this.name = name;
//   this.foo1 = function () {
//     console.log(this.name);
//   };

//   this.foo2 = () => console.log(this.name);
//   this.foo3 = function () {
//     return function () {
//       console.log(this.name);
//     };
//   };
//   this.foo4 = function () {
//     return () => {
//       console.log(this.name);
//     };
//   };
// }
// var person1 = new Person("person1");
// var person2 = new Person("person2");
// person1.foo1(); //person1
// person1.foo1.call(person2); //person2
// person1.foo2(); //person1
// person1.foo2.call(person2); //person1
// person1.foo3()(); //window
// person1.foo3.call(person2)(); //window
// person1.foo3().call(person2); //person2
// person1.foo4()(); //person1
// person1.foo4.call(person2)(); //person2
// person1.foo4().call(person2); //person1

var name = "window";
function Person(name) {
  this.name = name;
  this.obj = {
    name: "obj",
    foo1() {
      return function () {
        console.log(this.name);
      };
    },
    foo2() {
      return () => {
        console.log(this.name);
      };
    },
  };
}

var person1 = new Person("person1");
var person2 = new Person("person2");

person1.obj.foo1()(); //window
person1.obj.foo1.call(person2)(); //window
person1.obj.foo1().call(person2); //person2
person1.obj.foo2()(); //obj
person1.obj.foo2.call(person2)(); //person2
person1.obj.foo2()(person2); //obj