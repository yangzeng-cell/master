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

var name = "window";
var person1 = {
  name: "person1",
  foo1() {
    console.log(this.name);
  },
  foo2: () => console.log(this.name),
  foo3() {
    return function () {
      console.log(this.name);
    };
  },
  foo4() {
    return () => {
      console.log(this.name);
    };
  },
};
