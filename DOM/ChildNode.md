# ChildNode





`**ChildNode**` 混合了所有(拥有父对象) [`Node`](https://developer.mozilla.org/zh-CN/docs/Web/API/Node) 对象包含的公共方法和属性。其由 [`Element`](https://developer.mozilla.org/zh-CN/docs/Web/API/Element)、[`DocumentType`](https://developer.mozilla.org/zh-CN/docs/Web/API/DocumentType) 和 [`CharacterData`](https://developer.mozilla.org/zh-CN/docs/Web/API/CharacterData) 对象实现。

## [属性](https://developer.mozilla.org/zh-CN/docs/Web/API/ChildNode#属性)

没有继承任何属性，也没有任何专有属性。

## [方法](https://developer.mozilla.org/zh-CN/docs/Web/API/ChildNode#方法)

没有继承的方法。

- [`ChildNode.remove()`](https://developer.mozilla.org/zh-CN/docs/Web/API/ChildNode/remove) 

  将 `ChildNode` 从其父节点的子节点列表中移除。

- [`ChildNode.before()`](https://developer.mozilla.org/zh-CN/docs/Web/API/ChildNode/before) 

  在其父节点的子节点列表中插入一些 [`Node`](https://developer.mozilla.org/zh-CN/docs/Web/API/Node) 或 [`DOMString`](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMString) 对象。插入位置为 `ChildNode` 之前。[`DOMString`](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMString) 对象会被以 [`Text`](https://developer.mozilla.org/zh-CN/docs/Web/API/Text) 的形式插入。

- [`ChildNode.after()`](https://developer.mozilla.org/zh-CN/docs/Web/API/ChildNode/after) 

  在其父节点的子节点列表中插入一些[`Node`](https://developer.mozilla.org/zh-CN/docs/Web/API/Node) 或 [`DOMString`](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMString) 对象。插入位置为 `ChildNode` 之后。[`DOMString`](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMString) 对象会被以 [`Text`](https://developer.mozilla.org/zh-CN/docs/Web/API/Text) 的形式插入。

- [`ChildNode.replaceWith()`](https://developer.mozilla.org/zh-CN/docs/Web/API/ChildNode/replaceWith) 

  使用一组 [`Node`](https://developer.mozilla.org/zh-CN/docs/Web/API/Node) 或 [`DOMString`](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMString) 对象替换 `ChildNode`。[`DOMString`](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMString) 对象会以 [`Text`](https://developer.mozilla.org/zh-CN/docs/Web/API/Text) 的形式插入。