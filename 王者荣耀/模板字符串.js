function foo(...arg) {
  console.log(arg);
}
var name = "mike";
var age = 18;
var gender = "girl";
foo`hello ${name} world ${age},${gender}`;
