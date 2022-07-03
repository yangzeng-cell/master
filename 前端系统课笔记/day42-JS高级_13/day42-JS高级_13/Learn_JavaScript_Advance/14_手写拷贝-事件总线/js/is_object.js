// 需求: 判断一个标识符是否是对象类型
function isObject(value) {
  // null,object,function,array
  // null -> object
  // function -> function -> true
  // object/array -> object -> true
  const valueType = typeof value
  return (value !== null) && ( valueType === "object" || valueType === "function" )
}

// const name = "why"
// const age = 18
// const foo = {}
// const bar = function() {}
// const arr = []

// console.log(isObject(null)) // false
// console.log(isObject(bar)) // true
// console.log(isObject(name)) // false
// console.log(isObject(foo)) // true
// console.log(isObject(arr)) // true
