let arr = [
  { id: 1, name: "mike", gender: "girl", age: 48 },
  { id: 2, name: "mike", gender: "girl", age: 55 },
  { id: 3, name: "mike", gender: "girl", age: 18 },
  { id: 4, name: "mike", gender: "girl", age: 9 },
];

const item = arr.find((item) => {
  console.log("------");
  return item.id === 1;
});

console.log(item);

Array.prototype.myFind = function (callback, thisArg) {
  for (let i = 0; i < this.length; i++) {
    if (callback.call(thisArg, this[i], i, this)) {
      return this[i];
    }
  }
};
console.log("-------------------------");
const item1 = arr.myFind((item) => item.name === "mike");
const item2 = arr.myFind((item) => item.id === 2);
console.log(item1, item2);

Array.prototype.MyForEach = function (callback, thisArg) {
  for (let i = 0; i < this.length; i++) {
    callback.apply(thisArg, [this[i], i, this]);
  }
};

console.log(
  arr.MyForEach((item) => {
    console.log(item);
  })
);
// 默认是降序
arr.sort((item1, item2) => {
  return item1.age - item2.age;
});
console.log(arr);
// 升序
arr.sort((item1, item2) => {
  return item2.age - item1.age;
});
console.log(arr);

Array.prototype.myfilter = function (callback, thisArg) {
  let newArr = [];
  for (let i = 0; i < this.length; i++) {
    if (callback.call(thisArg, this[i], i, this)) {
      newArr.push(this[i]);
    }
  }
  return newArr;
};

function isBigEnough(element) {
  return element >= 10;
}
var filtered = [12, 5, 8, 130, 44].filter(isBigEnough);

console.log("-------------", filtered);

var filtered1 = [12, 5, 8, 130, 44].myfilter(isBigEnough);

console.log(filtered1);
