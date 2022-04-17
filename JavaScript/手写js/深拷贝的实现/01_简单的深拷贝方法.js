const s1 = Symbol()
const s2 = Symbol()

const obj = {
  name: "why",
  friend: {
    name: "kobe"
  },
  foo: function() {
    console.log("foo function")
  },
  [s1]: "abc",
  s2: s2
}

obj.inner = obj
// 浅拷贝Object.asign(),[...a],{...b}
const info = JSON.parse(JSON.stringify(obj))
// 这种深拷贝不可以拷贝函数，不可以拷贝symbl,不可以拷贝循环引用
console.log(info === obj)
obj.friend.name = "james"
console.log(info)
