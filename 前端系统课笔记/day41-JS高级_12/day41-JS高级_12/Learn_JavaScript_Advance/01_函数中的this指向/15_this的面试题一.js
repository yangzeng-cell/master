var name = "window";

var person = {
  name: "person",
  sayName: function () {
    console.log(this.name);
  }
};

function sayName() {
  var sss = person.sayName;

  sss(); // 绑定: 默认绑定, window -> window

  person.sayName(); // 绑定: 隐式绑定, person -> person

  (person.sayName)(); // 绑定: 隐式绑定, person -> person

  (b = person.sayName)(); // 术语: 间接函数引用, window -> window
}

sayName();
