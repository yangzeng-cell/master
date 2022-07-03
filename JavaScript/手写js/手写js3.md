## 只出现一次的数字



给定一个非空整数数组，除了某个元素只出现一次以外，其余每个元素均出现两次。找出那个只出现了一次的元素。

```text
示例 1:
输入: [2,2,1]
输出: 1
示例 2:
输入: [4,1,2,1,2]
输出: 4
```

- 遍历数组，由于需要返回值，这里使用map方法
- 使用过滤函数，过滤数组中值与当前遍历的元素的值相同的元素
- 现在得到了一个存在多个集合的数组，而数组中唯一值的那个元素的集合肯定值存在它自己
- 查询这个集合中长度只有1的集合，再取这个集合的第一个元素，即是只出现一次的数字

```js
const singleNumber = (nums) => {
  const numsGroup = nums.map(num => nums.filter(v => v === num));
  return numsGroup.find(num => num.length === 1)[0];
};
```

##  修改嵌套层级很深对象的 key



```js
// 有一个嵌套层次很深的对象，key 都是 a_b 形式 ，需要改成 ab 的形式，注意不能用递归。

const a = {
  a_y: {
    a_z: {
      y_x: 6
    },
    b_c: 1
  }
}
// {
//   ay: {
//     az: {
//       yx: 6
//     },
//     bc: 1
//   }
// }
```

**方法1：序列化 JSON.stringify + 正则匹配**

```js
const regularExpress = (obj) => {
  try {
    const str = JSON.stringify(obj).replace(/_/g, "");
    return JSON.parse(str);
  } catch (error) {
    return obj;
  }
};;
```

**方法2：递归**

```js
const recursion = (obj) => {
  const keys = Object.keys(obj);
  keys.forEach((key) => {
    const newKey = key.replace(/_/g, "");
    obj[newKey] = recursion(obj[key]);
    delete obj[key];
  });
  return obj;
};
```

## 旋转数组



给定一个数组，将数组中的元素向右移动 k 个位置，其中 k 是非负数

```text
输入: [1,2,3,4,5,6,7] 和 k = 3
输出: [5,6,7,1,2,3,4]
解释:
向右旋转 1 步: [7,1,2,3,4,5,6]
向右旋转 2 步: [6,7,1,2,3,4,5]
向右旋转 3 步: [5,6,7,1,2,3,4]
```

- 首先计算出需要循环移动的次数；
- 通过数组的 `unshift()` 和 `pop()`方法实现旋转，循环执行 `k` 次。

> - `unshift()` 方法将把它的参数插入数组的头部，并将已经存在的元素顺次地移到较高的下标处，该方法不会创建新数组，而是直接修改原数组。
> - `pop()` 方法将删除数组的最后一个元素，把数组长度减 1，并且返回它删除的元素的值

```js
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
const rotate = function (nums, k) {
  const l = nums.length;
  k = k % l;
  for (let i = 0; i < k; i++) {
    nums.unshift(nums.pop());
  }
};
```

**方法二**

- 首先还是计算出需要截取的数组元素的长度；
- 通过数组的 `splice()` 方法截取需要移动的元素，然后使用扩展运算符‘...‘将截取的元素当作参数，通过 `unshift()` 方法将截取的 元素放到数组的前边。

> - splice() 方法可删除从 index 处开始的零个或多个元素，然后返回被删除的项目。
> - 数组的扩展运算符...相当于将数组展开,主要的使用场景是用于数组复制、合并等。
> - unshift() 方法的第一个参数将成为数组的 index 为0的新元素，如果还有第二个参数，它将成为 index 为1的新元素，以此类推。

```js
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
const rotate = function (nums, k) {
  const l = nums.length;
  k = k % l;
  nums.unshift(...nums.splice(l - k, k));
};
```

## 写一个函数来判断它是否是 3 的幂次方



给定一个整数，写一个函数来判断它是否是 3 的幂次方

```text
输入: 27
输出: true
输入: 45
输出: false
```

**题目分析**

- 3 的幂，顾名思义，需要判断当前数字是否可以一直被 3 整除
- 特殊情况：如果 n === 1，即 3 的 0 次幂的情况，应输出 true

```js
/**
 * @param {number} n
 * @return {boolean}
 */
const isPowerOfThree = function (n) {
  if (n < 1) {
    return false;
  }
  while (n > 1) {
    // 如果该数字不能被 3 整除，则直接输出 false
    if (n % 3 !== 0) {
      return false;
    } else {
      n = n / 3;
    }
  }
  return true;
};
```

**递归求解**

- 思路

> 或许，我们可以考虑使用递归的方法实现。递归的思路类似于循环，只不过将循环体改为方法的递归调用。

1. 判断特殊情况 `n === 1` 时，直接返回 true
2. 判断特殊情况 `n <= 0` 时，直接返回 false
3. 若待定值 n 可以被 3 整除，则开始递归
4. 若不满足上述条件，则返回 false

```js
/**
 * @param {number} n
 * @return {boolean}
 */
const isPowerOfThree = function (n) {
  // n === 1，即 3 的 0 次幂，返回 true
  if (n === 1) {
    return true;
  }
  if (n <= 0) {
    return false;
  }
  if (n % 3 === 0) {
    // 递归调用 isPowerOfThree 方法
    return isPowerOfThree(n / 3);
  }
  return false;
};
```

## 验证回文串



给定一个字符串，验证它是否是回文串，只考虑字母和数字字符，可以忽略字母的大小写。

说明：本题中，我们将空字符串定义为有效的回文串。

```text
示例1
输入: "A man, a plan, a canal: Panama"
输出: true
示例 2:

输入: "race a car"
输出: false
```

**思路**

> 首先，去除字符串中的非字母和数字，然后，利用数组将字符串翻转，再和原字符串进行比较，即可得到结果。

**详解**

- 将传入的字符串，利用 `toLowerCase()` 方法统一转化为小写，再利用正则表达式 `/[ ^ A-Za-z0-9]/g` 在字符串中去除非字母和数字，得到字符串 `arr`。
- 将字符串 `arr` 转换为数组，利用数组的方法反转数组，再将数组转为字符串 `newArr`。
- 将字符串 `arr` 和 字符串 `newArr` 进行比较，相等即为回文串，不相等则不为回文串

```js
/**
 * @param {string} s
 * @return {boolean}
 */
const isPalindrome = (s) => {
  // 方便比较,统一转化为小写,并去除非字母和数字
  const arr = s.toLowerCase().replace(/[^A-Za-z0-9]/g, '');
  // 将新字符串转换为数组,利用数组的方法获得反转的字符串
  const newArr = arr.split('').reverse().join('');
  // 将2个字符进行比较得出结果
  return arr === newArr;
};
```

## 下面输出什么



```js
var length = 10

function fn(){
    console.log(this.length)
}
var obj = {
  length:5,
  method:function(fn){
    fn()
    arguments[0]()
    console.log(arguments,'arguments')
  }
}

obj.method(fn)
obj.method(fn, 123)
var a = {n:1}
var b = a 
a = {n:2}
a.x = a
console.log(a.x)
```