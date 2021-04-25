# NodeList

`NodeList` 对象是节点的集合，通常是由属性，如[`Node.childNodes`](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/childNodes) 和 方法，如[`document.querySelectorAll`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/querySelectorAll) 返回的。

`NodeList` **不是一个数组**，是一个类似数组的对象(*Like Array Object*)。虽然 `NodeList` 不是一个数组，但是可以使用 `forEach()` 来迭代。你还可以使用 [`Array.from()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/from) 将其转换为数组。

不过，有些浏览器较为过时，没有实现 `NodeList.forEach()` 和 `Array.from()`。你可以用 [`Array.prototype.forEach()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach) 来规避这一问题。请查看[该例](https://developer.mozilla.org/zh-CN/docs/Web/API/NodeList#example)。

在一些情况下，`NodeList` 是一个实时集合，也就是说，如果文档中的节点树发生变化，`NodeList` 也会随之变化。例如，[`Node.childNodes`](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/childNodes) 是实时的：

```
var parent = document.getElementById('parent');
var child_nodes = parent.childNodes;
console.log(child_nodes.length); // 我们假设结果会是“2”
parent.appendChild(document.createElement('div'));
console.log(child_nodes.length); // 但此时的输出是“3”
```

在其他情况下，`NodeList` 是一个静态集合，也就意味着随后对文档对象模型的任何改动都不会影响集合的内容。比如 [`document.querySelectorAll`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/querySelectorAll) 就会返回一个静态 `NodeList`。

最好牢记这种不同，尤其是在当你选择 `NodeList` 中所有项遍历的方式，或缓存它的长度的时候。

## [属性](https://developer.mozilla.org/zh-CN/docs/Web/API/NodeList#属性)

- [`NodeList.length`](https://developer.mozilla.org/zh-CN/docs/Web/API/NodeList/length)

  `NodeList` 中包含的节点个数。

## [方法](https://developer.mozilla.org/zh-CN/docs/Web/API/NodeList#方法)

- [`NodeList.item()`](https://developer.mozilla.org/zh-CN/docs/Web/API/NodeList/item)

- [`NodeList.entries()`](https://developer.mozilla.org/zh-CN/docs/Web/API/NodeList/entries)

  Returns an [`iterator`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Iteration_protocols), allowing code to go through all key/value pairs contained in the collection. (In this case, the keys are numbers starting from 0 and the values are nodes.)

- [`NodeList.forEach()`](https://developer.mozilla.org/zh-CN/docs/Web/API/NodeList/forEach)

  Executes a provided function once per `NodeList` element, passing the element as an argument to the function.

- [`NodeList.keys()`](https://developer.mozilla.org/zh-CN/docs/Web/API/NodeList/keys)

  Returns an [`iterator`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Iteration_protocols), allowing code to go through all the keys of the key/value pairs contained in the collection. (In this case, the keys are numbers starting from 0.)

- [`NodeList.values()`](https://developer.mozilla.org/zh-CN/docs/Web/API/NodeList/values)

  Returns an [`iterator`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Iteration_protocols) allowing code to go through all values (nodes) of the key/value pairs contained in the collection.

## [例子](https://developer.mozilla.org/zh-CN/docs/Web/API/NodeList#例子)

可以使用 [for](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for) 循环遍历一个` NodeList` 对象中的所有的节点：

```
for (var i = 0; i < myNodeList.length; ++i) {
  var item = myNodeList[i];  // 调用 myNodeList.item(i) 是没有必要的
}
```

**不要尝试使用 `for...in` 或者 `for each...in` 来遍历一个 `NodeList` 对象中的元素**，因为，如果你把上述两个属性也看成 [`element`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element) 对象的话，`NodeList` 对象中的 `length` 和 `item` 属性也会被遍历出来，这可能会导致你的脚本运行出错。此外，`for...in` 不能保证访问这些属性的顺序。

[for...of](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...of) 循环**将会**正确的遍历 `NodeList` 对象：

```
var list = document.querySelectorAll('input[type=checkbox]');
for (var checkbox of list) {
  checkbox.checked = true;
}
```

最近，浏览器也支持一些遍历方法，比如 [`forEach()`](https://developer.mozilla.org/zh-CN/docs/Web/API/NodeList/forEach) 与 [`entries()`](https://developer.mozilla.org/zh-CN/docs/Web/API/NodeList/entries)、[`values()`](https://developer.mozilla.org/zh-CN/docs/Web/API/NodeList/values)、和 [`keys()`](https://developer.mozilla.org/zh-CN/docs/Web/API/NodeList/keys)。

也有一种使用数组 `Array` 的 [`Array.prototype.forEach`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach) 来遍历 `NodeList` 的方法

### [为什么 NodeList 不是数组？](https://developer.mozilla.org/zh-CN/docs/Web/API/NodeList#为什么_nodelist_不是数组？)

`NodeList` 对象在某些方面和数组非常相似，看上去可以直接使用从 `Array.prototype` 上继承的方法。然而，除了 `forEach` 方法，`NodeList` 没有这些类似数组的方法。

JavaScript 的继承机制是基于原型的。数组元素之所以有一些数组方法（比如 `forEach` 和 `map`），是因为它的原型链上有这些方法，如下:

`myArray --> Array.prototype --> Object.prototype --> null`（想要获取一个对象的原型链，可以连续地调用 `Object.getPrototypeOf`，直到原型链尽头）。

`forEach`，`map` 这些方式其实是 `Array.prototype` 这个对象的方法。

和数组不一样的是，`NodeList` 的原型链是这样的：

```
myNodeList --> NodeList.prototype --> Object.prototype --> null
```

NodeList的原型上除了类似数组的 `forEach` 方法之外，还有 `item`，`entries`，`keys` 和 `values` 方法。