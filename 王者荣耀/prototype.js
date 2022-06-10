// console.log(Object.__proto__);
// console.log(Object.prototype);

// var obj = {};

// console.log(obj.__proto__);

function Foo(value) {
  this.value = value;
}

var bar = new Foo("1");
console.log(bar.__proto__);

console.log(Foo.prototype);
console.log(Foo.__proto__);
