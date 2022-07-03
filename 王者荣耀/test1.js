obj = {
  name: "zhangsan",
  age: 18,
  height: 2,
  friends: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  // *[Symbol.iterator]() {
  //   yield obj.age;
  //   yield obj.height;
  // },
  [Symbol.iterator]() {
    let index = 0;
    return {
      next: () => {
        if (index < this.friends.length) {
          return { done: false, value: this.friends[index++] };
        } else {
          return { done: true, value: undefined };
        }
      },
    };
  },
};

delete obj.name;
console.log(obj);
obj.value = 12;
obj["job"] = "play";

console.log(obj);

for (const key in obj) {
  console.log(obj[key]);
}
console.log("--------------------------------------");

const keys = Object.keys(obj);
for (var i = 0; i < keys.length; i++) {
  console.log(obj[keys[i]]);
}
console.log("--------------------------------------");
for (const iterator of obj) {
  console.log(iterator);
}
