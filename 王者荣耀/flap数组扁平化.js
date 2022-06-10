// 使用reduce+concat+isArray+递归完成数据扁平化
function flat(arr = [], deep = 1) {
  if (deep > 0) {
    return arr.reduce((pre, current) => {
      return pre.concat(
        Array.isArray(current) ? flat(current, deep - 1) : current
      );
    }, []);
  }
  return arr;
}

var arr1 = [1, 2, 3, [1, 2, 3, 4, [2, 3, 4]], ,];

console.log(flat(arr1, Infinity));

// 使用forEach+push+isArray+递归
// forEach会自动去除数组空位
function deepFlat(arr = [], deep = 1) {
  const newArr = [];
  (function flat(arr, deep) {
    arr.forEach((item) => {
      Array.isArray(item) && deep > 0
        ? flat(item, deep - 1)
        : newArr.push(item);
    });
  })(arr, deep);
  return newArr;
}
console.log(deepFlat(arr1, Infinity));
// 使用forof的情况，forof不会去除数组空位
function forOfDeepFlat(arr = [], deep = 1) {
  const newArr = [];
  (function flat(arr, deep) {
    for (const item of arr) {
      if (Array.isArray(item) && deep > 0) {
        flat(item, deep - 1);
      } else {
        item !== undefined && newArr.push(item);
      }
    }
  })(arr, deep - 1);
  return newArr;
}

console.log(forOfDeepFlat(arr1, Infinity));

//使用堆栈实现无递归的扁平化

function stackFlat(input) {
  const stack = [...input];
  const res = [];
  while (stack.length) {
    const next = stack.pop();
    if (Array.isArray(next)) {
      stack.push(...next);
    } else {
      next !== undefined && res.push(next);
    }
  }
  return res.reverse();
}

console.log(stackFlat(arr1));

// 使用Generator实现扁平化

function* flattern(arr) {
  for (let item of arr) {
    if (Array.isArray(item)) {
      yield* flattern(item);
    } else {
      if (item !== undefined) {
        yield item;
      }
    }
  }
}

console.log([...flattern(arr1)]);
