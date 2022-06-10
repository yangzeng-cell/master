var name = "window";
var person = {
  name: "person",
  sayName() {
    console.log(this.name);
  },
};

function sayName() {
  var sss = person.sayName;
  sss();
  person.sayName();
  person.sayName();
  (b = person.sayName)();
}

sayName();
