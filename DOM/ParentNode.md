# ParentNode

`**ParentNode**` 混合了所有(拥有子元素的) [`Node`](https://developer.mozilla.org/zh-CN/docs/Web/API/Node) 对象包含的共有方法和属性。

`ParentNode` 是一个原始接口，不能够创建这种类型的对象；它在 [`Element`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element)、[`Document`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document) 和 [`DocumentFragment`](https://developer.mozilla.org/zh-CN/docs/Web/API/DocumentFragment) 对象上被实现。

## [属性](https://developer.mozilla.org/zh-CN/docs/Web/API/ParentNode#属性)

- [`ParentNode.childElementCount`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/childElementCount) 只读

  返回一个当前 `ParentNode` 所含有的后代数量。

- [`ParentNode.children`](https://developer.mozilla.org/zh-CN/docs/orphaned/Web/API/ParentNode/children) 只读

  返回一个包含 `ParentNode` 所有后代 [`Element`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element) 对象的动态 [`HTMLCollection`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLCollection) 对象，忽略所有非元素子节点。

- [`ParentNode.firstElementChild`](https://developer.mozilla.org/zh-CN/docs/orphaned/Web/API/ParentNode/firstElementChild) 只读

  返回父节点的第一个 [`Element`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element) 后代，没有时返回 `null`。

- [`ParentNode.lastElementChild`](https://developer.mozilla.org/zh-CN/docs/orphaned/Web/API/ParentNode/lastElementChild) 只读

  返回父节点的最后一个 [`Element`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element) 后代，没有时返回 `null`。

## [方法](https://developer.mozilla.org/zh-CN/docs/Web/API/ParentNode#方法)

- [`ParentNode.append()`](https://developer.mozilla.org/zh-CN/docs/orphaned/Web/API/ParentNode/append) 

  在父节点 `ParentNode` 的最后一个后代后面插入一组 [`Node`](https://developer.mozilla.org/zh-CN/docs/Web/API/Node) 对象或 [`DOMString`](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMString) 对象。[`DOMString`](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMString) 对象会以同等的 [`Text`](https://developer.mozilla.org/zh-CN/docs/Web/API/Text) 节点插入。

- [`ParentNode.prepend()`](https://developer.mozilla.org/zh-CN/docs/orphaned/Web/API/ParentNode/prepend) 

  在父节点 `ParentNode` 第一个后代前插入一组 [`Node`](https://developer.mozilla.org/zh-CN/docs/Web/API/Node) 对象或者 [`DOMString`](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMString) 对象。[`DOMString`](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMString) 对象会以同等的 [`Text`](https://developer.mozilla.org/zh-CN/docs/Web/API/Text) 节点插入。

- [`ParentNode.querySelector()`](https://developer.mozilla.org/zh-CN/docs/Web/API/ParentNode/querySelector)

  返回以当前元素为根元素，匹配给定选择器的第一个元素 [`Element`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element)。

- [`ParentNode.querySelectorAll()`](https://developer.mozilla.org/zh-CN/docs/Web/API/ParentNode/querySelectorAll)

  返回一个 [`NodeList`](https://developer.mozilla.org/zh-CN/docs/Web/API/NodeList)，表示以当前元素为根元素的匹配给定选择器组的元素列表。