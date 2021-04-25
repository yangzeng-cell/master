### 4.1 React-Diff

React的思路是递增法。通过对比新的列表中的节点，在原本的列表中的位置是否是递增，来判断当前节点是否需要移动。

**1. 实现原理**

来看这样一个例子。

![img](D:\memo\JavaScript\img\7cc8e69cb5b04387b7b259622a91bbe6~tplv-k3u1fbpfcp-watermark.image)

`nextList`为新的列表，`prevList`为旧列表。这个例子我们一眼能看出来，新列表是不需要进行移动的。下面我用`react`的递增思想，解释一下为什么新列表中的节点不需要移动。

我们首先遍历`nextList`，并且找到每一个节点，在`prevList`中的位置。

```js
function foo(prevList, nextList) {
    for (let i = 0; i < nextList.length; i++) {
        let nextItem = nextList[i];
        for (let j = 0; j < prevList.length; j++) {
            let prevItem = prevList[j]
            if (nextItem === prevItem) {

            }
        }
    }
}
```

找到位置以后，与上一个节点的位置进行对比，如果当前的位置大于上一个位置，说明当前节点不需要移动。因此我们要定义一个`lastIndex`来记录上一个节点的位置。

```js
function foo(prevList, nextList) {
    let lastIndex = 0
    for (let i = 0; i < nextList.length; i++) {
        let nextItem = nextList[i];
        for (let j = 0; j < prevList.length; j++) {
            let prevItem = prevList[j]
            if (nextItem === prevItem) {
                if (j < lastIndex) {
                    // 需要移动节点
                } else {
                    // 不需要移动节点，记录当前位置，与之后的节点进行对比
                    lastIndex = j
                }
            }
        }
    }
}
```

在上面的例子中，`nextList`每个节点在`prevList`的位置为`0 1 2 3`。每一项都要比前一项要大，所以不需要移动，这就是`react`的`diff`算法的原理。

**2. 找到需要移动的节点**

在上一小节中，我们是通过对比值是否相等，查找的对应位置。但是在vdom中，每一个节点都是一个vNode，我们应该如何进行判断呢？

答案就是`key`，我们通过对每个节点的`key`进行赋值，并且让处于同一`children`数组下的`vnode`的`key`都不相同，以此来确定每个节点的唯一性，并进行新旧列表的对比。

```js
function reactDiff(prevChildren, nextChildren, parent) {
    let lastIndex = 0
    for (let i = 0; i < nextChildren.length; i++) {
        let nextChild = nextChildren[i];
        for (let j = 0; j < prevChildren.length; j++) {
            let prevChild = prevChildren[j]
            if (nextChild.key === prevChild.key) {
                patch(prevChild, nextChild, parent)
                if (j < lastIndex) {
                    // 需要移动节点
                } else {
                    // 不需要移动节点，记录当前位置，与之后的节点进行对比
                    lastIndex = j
                }
            }
        }
    }
}
```

**3. 移动节点**

首先我们先明确一点，移动节点所指的节点是`DOM`节点。`vnode.el`指向该节点对应的真实`DOM`节点。`patch`方法会将更新过后的`DOM`节点，赋值给**新的**`vnode`的`el`属性。

> 为了画图方便，我们用`key`的值来表示`vnode`节点。为了行文方便，我们把`key`值为`a`的`vnode`简写为`vnode-a`，`vnode-a`对应的真实DOM节点为`DOM-A`

![img](D:\memo\JavaScript\img\ab3a37a997a84b95af9f39326bf2a24f~tplv-k3u1fbpfcp-watermark.image)

我们来将上图的例子代入`reactDiff`中执行。我们遍历**新列表**，并查找`vnode`在**旧列表**中的位置。当遍历到`vnode-d`时，之前遍历在**旧列表**的位置为`0 < 2 < 3`，说明`A C D`这三个节点都是不需要移动的。此时`lastIndex = 3`, 并进入下一次循环，发现`vnode-b`在**旧列表**的`index`为`1`，`1 < 3`，说明`DOM-B`要移动。

通过观察我们能发现，只需要把`DOM-B`移动到`DOM-D`之后就可以了。也就是**找到需要移动的VNode，我们称该VNode为α，将α对应的真实的DOM节点移动到，α在`新列表`中的前一个VNode对应的真实DOM的后面。**

![img](D:\memo\JavaScript\img\6e757d546440478b83e938f3824f9364~tplv-k3u1fbpfcp-watermark.image)

在上述的例子中，就是将`vnode-b`对应的真实DOM节点`DOM-B`, 移动到`vnode-b`在新列表中的前一个`VNode`——`vnode-d`对应的真实DOM节点`DOM-D`的后面

```js
function reactDiff(prevChildren, nextChildren, parent) {
    let lastIndex = 0
    for (let i = 0; i < nextChildren.length; i++) {
        let nextChild = nextChildren[i];
        for (let j = 0; j < prevChildren.length; j++) {
            let prevChild = prevChildren[j]
            if (nextChild.key === prevChild.key) {
                patch(prevChild, nextChild, parent)
                if (j < lastIndex) {
                    // 移动到前一个节点的后面
                    let refNode = nextChildren[i - 1].el.nextSibling;
                    parent.insertBefore(nextChild.el, refNode)
                } else {
                    // 不需要移动节点，记录当前位置，与之后的节点进行对比
                    lastIndex = j
                }
            }
        }
    }
}
```

为什么是这样移动的呢？首先我们列表是`从头到尾`遍历的。这就意味着对于当前`VNode`节点来说，该节点之前的所有节点都是排好序的，如果该节点需要移动，那么只需要将DOM节点移动到前一个`vnode`节点之后就可以，因为在**新列表**中`vnode`的顺序就是这样的。

**4. 添加节点**

上一小节我们只讲了如何移动节点，但是忽略了另外一种情况，就是在**新列表**中有全新的`VNode`节点，在**旧列表**中找不到。遇到这种情况，我们需要根据新的`VNode`节点生成`DOM`节点，并插入`DOM`树中。

至此，我们面临两个问题：1.如何发现全新的节点、2. 生成的`DOM`节点插入到哪里

![img](D:\memo\JavaScript\img\f7f3ae4ecace400a801b35c156e2edfc~tplv-k3u1fbpfcp-watermark.image)

我们先来解决第一个问题，找节点还是比较简单的，我们定义一个`find`变量值为`false`。如果在**旧列表**找到了`key` 相同的`vnode`，就将`find`的值改为`true`。当遍历结束后判断`find`值，如果为`false`，说明当前节点为新节点

```js
function reactDiff(prevChildren, nextChildren, parent) {
    let lastIndex = 0
    for (let i = 0; i < nextChildren.length; i++) {
        let nextChild = nextChildren[i],
            find = false;
        for (let j = 0; j < prevChildren.length; j++) {
            let prevChild = prevChildren[j]
            if (nextChild.key === prevChild.key) {
                find = true
                patch(prevChild, nextChild, parent)
                if (j < lastIndex) {
                    // 移动到前一个节点的后面
                    let refNode = nextChildren[i - 1].el.nextSibling;
                    parent.insertBefore(nextChild.el, refNode)
                } else {
                    // 不需要移动节点，记录当前位置，与之后的节点进行对比
                    lastIndex = j
                }
                break
            }
        }
        if (!find) {
            // 插入新节点
        }
    }
}
```

找到新节点后，下一步就是插入到哪里了，这里的逻辑其实是和移动节点的逻辑是一样的。我们观察上图可以发现，新的`vnode-c`是紧跟在`vnode-b`后面的，并且`vnode-b`的DOM节点——`DOM-B`是已经排好序的，所以我们只需要将`vnode-c`生成的DOM节点插入到`DOM-B`之后就可以了。

但是这里有一种特殊情况需要注意，就是新的节点位于**新列表**的第一个，这时候我们需要找到**旧列表**第一个节点，将新节点插入到原来第一个节点之前就可以了。

```js
function reactDiff(prevChildren, nextChildren, parent) {
    let lastIndex = 0
    for (let i = 0; i < nextChildren.length; i++) {
        let nextChild = nextChildren[i],
            find = false;
        for (let j = 0; j < prevChildren.length; j++) {
            let prevChild = prevChildren[j]
            if (nextChild.key === prevChild.key) {
                find = true
                patch(prevChild, nextChild, parent)
                if (j < lastIndex) {
                    // 移动到前一个节点的后面
                    let refNode = nextChildren[i - 1].el.nextSibling;
                    parent.insertBefore(nextChild.el, refNode)
                } else {
                    // 不需要移动节点，记录当前位置，与之后的节点进行对比
                    lastIndex = j
                }
                break
            }
        }
        if (!find) {
            // 插入新节点
            let refNode = i <= 0
                            ? prevChildren[0].el
                            : nextChildren[i - 1].el.nextSibling
            mount(nextChild, parent, refNode);
        }
    }
}
```

**5. 移除节点**

有增就有减，当旧的节点不在**新列表**中时，我们就将其对应的DOM节点移除。

![img](D:\memo\JavaScript\img\9cf836312b6345d98b4ea8c9efe80a9a~tplv-k3u1fbpfcp)

```js
function reactDiff(prevChildren, nextChildren, parent) {
    let lastIndex = 0
    for (let i = 0; i < nextChildren.length; i++) {
        let nextChild = nextChildren[i],
            find = false;
        for (let j = 0; j < prevChildren.length; j++) {
            let prevChild = prevChildren[j]
            if (nextChild.key === prevChild.key) {
                find = true
                patch(prevChild, nextChild, parent)
                if (j < lastIndex) {
                    // 移动到前一个节点的后面
                    let refNode = nextChildren[i - 1].el.nextSibling;
                    parent.insertBefore(nextChild.el, refNode)
                } else {
                    // 不需要移动节点，记录当前位置，与之后的节点进行对比
                    lastIndex = j
                }
                break
            }
        }
        if (!find) {
            // 插入新节点
            let refNode = i <= 0
                            ? prevChildren[0].el
                            : nextChildren[i - 1].el.nextSibling
            mount(nextChild, parent, refNode);
        }
    }
    for (let i = 0; i < prevChildren.length; i++) {
        let prevChild = prevChildren[i],
            key = prevChild.key,
            has = nextChildren.find(item => item.key === key);
        if (!has) parent.removeChild(prevChild.el)
    }
}
```

**6. 优化与不足**

以上就是React的diff算法的思路。

目前的`reactDiff`的时间复杂度为`O(m*n)`，我们可以用空间换时间，把`key`与`index`的关系维护成一个`Map`，从而将时间复杂度降低为`O(n)`，具体的代码可以[查看此项目 (opens new window)](https://github.com/sunyanzhe/virtual-dom/blob/master/src/diff/react-diff.js)。

我们接下来看这样一个例子

![img](D:\memo\JavaScript\img\aed2a562a9674f5293e4e51a1b8b9005~tplv-k3u1fbpfcp-watermark.image)

根据`reactDiff`的思路，我们需要先将`DOM-A`移动到`DOM-C`之后，然后再将`DOM-B`移动到`DOM-A`之后，完成`Diff`。但是我们通过观察可以发现，只要将`DOM-C`移动到`DOM-A`之前就可以完成`Diff`。

这里是有可优化的空间的，接下来我们介绍`vue2.x`中的`diff`算法——`双端比较`，该算法解决了上述的问题

### [#](http://interview.poetries.top/excellent-docs/16-框架通识.html#_4-2-vue2-x-diff-双端比较)4.2 Vue2.X Diff —— 双端比较

所谓`双端比较`就是**新列表**和**旧列表**两个列表的头与尾互相对比，，在对比的过程中指针会逐渐向内靠拢，直到某一个列表的节点全部遍历过，对比停止。

**1. 实现原理**

我们先用四个指针指向两个列表的头尾

```js
function vue2Diff(prevChildren, nextChildren, parent) {
  let oldStartIndex = 0,
    oldEndIndex = prevChildren.length - 1
    newStartIndex = 0,
    newEndIndex = nextChildren.length - 1;
  let oldStartNode = prevChildren[oldStartIndex],
    oldEndNode = prevChildren[oldEndIndex],
    newStartNode = nextChildren[nextStartIndex],
    newEndNode = nextChildren[nextEndIndex];
}
```

我们根据四个指针找到四个节点，然后进行对比，那么如何对比呢？我们按照以下四个步骤进行对比

1. 使用**旧列表**的头一个节点`oldStartNode`与**新列表**的头一个节点`newStartNode`对比
2. 使用**旧列表**的最后一个节点`oldEndNode`与**新列表**的最后一个节点`newEndNode`对比
3. 使用**旧列表**的头一个节点`oldStartNode`与**新列表**的最后一个节点`newEndNode`对比
4. 使用**旧列表**的最后一个节点`oldEndNode`与**新列表**的头一个节点`newStartNode`对比

使用以上四步进行对比，去寻找`key`相同的可复用的节点，当在某一步中找到了则停止后面的寻找。具体对比顺序如下图

![img](D:\memo\JavaScript\img\847306f303ab4177891b56cccff1ebd3~tplv-k3u1fbpfcp-watermark.image)

对比顺序代码结构如下:

```js
function vue2Diff(prevChildren, nextChildren, parent) {
  let oldStartIndex = 0,
    oldEndIndex = prevChildren.length - 1
    newStartIndex = 0,
    newEndIndex = nextChildren.length - 1;
  let oldStartNode = prevChildren[oldStartIndex],
    oldEndNode = prevChildren[oldEndIndex],
    newStartNode = nextChildren[newStartIndex],
    newEndNode = nextChildren[newEndIndex];
  
  if (oldStartNode.key === newStartNode.key) {

  } else if (oldEndNode.key === newEndNode.key) {

  } else if (oldStartNode.key === newEndNode.key) {

  } else if (oldEndNode.key === newStartNode.key) {

  }
}
```

当对比时找到了可复用的节点，我们还是先`patch`给元素打补丁，然后将指针进行`前/后移`一位指针。根据对比节点的不同，我们移动的**指针**和**方向**也不同，具体规则如下：

1. 当**旧列表**的头一个节点`oldStartNode`与**新列表**的头一个节点`newStartNode`对比时`key`相同。那么**旧列表**的头指针`oldStartIndex`与**新列表**的头指针`newStartIndex`同时向**后**移动一位。
2. 当**旧列表**的最后一个节点`oldEndNode`与**新列表**的最后一个节点`newEndNode`对比时`key`相同。那么**旧列表**的尾指针`oldEndIndex`与**新列表**的尾指针`newEndIndex`同时向**前**移动一位。
3. 当**旧列表**的头一个节点`oldStartNode`与**新列表**的最后一个节点`newEndNode`对比时`key`相同。那么**旧列表**的头指针`oldStartIndex`向**后**移动一位；**新列表**的尾指针`newEndIndex`向**前**移动一位。
4. 当**旧列表**的最后一个节点`oldEndNode`与**新列表**的头一个节点`newStartNode`对比时`key`相同。那么**旧列表**的尾指针`oldEndIndex`向**前**移动一位；**新列表**的头指针`newStartIndex`向**后**移动一位。

```js
function vue2Diff(prevChildren, nextChildren, parent) {
  let oldStartIndex = 0,
    oldEndIndex = prevChildren.length - 1,
    newStartIndex = 0,
    newEndIndex = nextChildren.length - 1;
  let oldStartNode = prevChildren[oldStartIndex],
    oldEndNode = prevChildren[oldEndIndex],
    newStartNode = nextChildren[newStartIndex],
    newEndNode = nextChildren[newEndIndex];

  if (oldStartNode.key === newStartNode.key) {
    patch(oldvStartNode, newStartNode, parent)

    oldStartIndex++
    newStartIndex++
    oldStartNode = prevChildren[oldStartIndex]
    newStartNode = nextChildren[newStartIndex]
  } else if (oldEndNode.key === newEndNode.key) {
    patch(oldEndNode, newEndNode, parent)

    oldEndIndex--
    newEndIndex--
    oldEndNode = prevChildren[oldEndIndex]
    newEndNode = nextChildren[newEndIndex]
  } else if (oldStartNode.key === newEndNode.key) {
    patch(oldStartNode, newEndNode, parent)

    oldStartIndex++
    newEndIndex--
    oldStartNode = prevChildren[oldStartIndex]
    newEndNode = nextChildren[newEndIndex]
  } else if (oldEndNode.key === newStartNode.key) {
    patch(oldEndNode, newStartNode, parent)

    oldEndIndex--
    nextStartIndex++
    oldEndNode = prevChildren[oldEndIndex]
    newStartNode = nextChildren[newStartIndex]
  }
}
```

在小节的开头，提到了要让指针向内靠拢，所以我们需要循环。循环停止的条件是当其中一个列表的节点全部遍历完成，代码如下

```js
function vue2Diff(prevChildren, nextChildren, parent) {
  let oldStartIndex = 0,
    oldEndIndex = prevChildren.length - 1,
    newStartIndex = 0,
    newEndIndex = nextChildren.length - 1;
  let oldStartNode = prevChildren[oldStartIndex],
    oldEndNode = prevChildren[oldEndIndex],
    newStartNode = nextChildren[newStartIndex],
    newEndNode = nextChildren[newEndIndex];
  while (oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex) {
    if (oldStartNode.key === newStartNode.key) {
      patch(oldStartNode, newStartNode, parent)

      oldStartIndex++
      newStartIndex++
      oldStartNode = prevChildren[oldStartIndex]
      newStartNode = nextChildren[newStartIndex]
    } else if (oldEndNode.key === newEndNode.key) {
      patch(oldEndNode, newEndNode, parent)

      oldEndIndex--
      newndIndex--
      oldEndNode = prevChildren[oldEndIndex]
      newEndNode = nextChildren[newEndIndex]
    } else if (oldStartNode.key === newEndNode.key) {
      patch(oldvStartNode, newEndNode, parent)

      oldStartIndex++
      newEndIndex--
      oldStartNode = prevChildren[oldStartIndex]
      newEndNode = nextChildren[newEndIndex]
    } else if (oldEndNode.key === newStartNode.key) {
      patch(oldEndNode, newStartNode, parent)

      oldEndIndex--
      newStartIndex++
      oldEndNode = prevChildren[oldEndIndex]
      newStartNode = nextChildren[newStartIndex]
    }
  }
}
```

至此整体的循环我们就全部完成了，下面我们需要考虑这样两个问题：

- 什么情况下`DOM`节点需要移动
- `DOM`节点如何移动

我们来解决第一个问题：**什么情况下需要移动**，我们还是以上图为例。

![img](D:\memo\JavaScript\img\d8c96a75e48346aea2c7de1d8bfa6f67~tplv-k3u1fbpfcp-watermark.image)

当我们在第一个循环时，在`第四步`发现**旧列表的尾节点**`oldEndNode`与**新列表的头节点**`newStartNode`的`key`相同，是可复用的`DOM`节点。通过观察我们可以发现，**原本在旧列表末尾的节点，却是新列表中的开头节点，没有人比他更靠前，因为他是第一个，所以我们只需要把当前的节点移动到原本旧列表中的第一个节点之前，让它成为第一个节点即可**。

```js
function vue2Diff(prevChildren, nextChildren, parent) {
 // ...
  while (oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex) {
    if (oldStartNode.key === newStartNode.key) {
       // ...
    } else if (oldEndNode.key === newEndNode.key) {
      // ...
    } else if (oldStartNode.key === newEndNode.key) {
      // ...
    } else if (oldEndNode.key === newStartNode.key) {
      patch(oldEndNode, newStartNode, parent)
      // 移动到旧列表头节点之前
      parent.insertBefore(oldEndNode.el, oldStartNode.el)
      
      oldEndIndex--
      newStartIndex++
      oldEndNode = prevChildren[oldEndIndex]
      newStartNode = nextChildren[newStartIndex]
    }
  }
}
```

![img](D:\memo\JavaScript\img\c7f3368a5a5744bcb2b356d7424093a6~tplv-k3u1fbpfcp-watermark.image)

然后我们进入第二次循环，我们在`第二步`发现，**旧列表的尾节点**`oldEndNode`和**新列表的尾节点**`newEndNode`为复用节点。**原本在旧列表中就是尾节点，在新列表中也是尾节点，说明该节点不需要移动**，所以我们什么都不需要做。

同理，如果是**旧列表的头节点**`oldStartNode`和**新列表的头节点**`newStartNode`为复用节点，我们也什么都不需要做。

![img](D:\memo\JavaScript\img\2520c8511aad44589947be3616f7f50b~tplv-k3u1fbpfcp-watermark.image)

进入第三次循环，我们在`第三部`发现，**旧列表的头节点**`oldStartNode`和**新列表的尾节点**`newEndNode`为复用节点。到这一步聪明如你肯定就一眼可以看出来了，我们只要将`DOM-A`移动到`DOM-B`后面就可以了。

依照惯例我们还是解释一下，**原本旧列表中是头节点，然后在新列表中是尾节点。那么只要在旧列表中把当前的节点移动到原本尾节点的后面，就可以了**。

```js
function vue2Diff(prevChildren, nextChildren, parent) {
  // ...
  while (oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex) {
    if (oldStartNode.key === newStartNode.key) {
      // ...
    } else if (oldEndNode.key === newEndNode.key) {
      // ...
    } else if (oldStartNode.key === newEndNode.key) {
      patch(oldStartNode, newEndNode, parent)
      parent.insertBefore(oldStartNode.el, oldEndNode.el.nextSibling)

      oldStartIndex++
      newEndIndex--
      oldStartNode = prevChildren[oldStartIndex]
      newEndNode = nextChildren[newEndIndex]
    } else if (oldEndNode.key === newStartNode.key) {
     //...
    }
  }
}
```

![img](D:\memo\JavaScript\img\9d0a744cac8045fc9ae4f593a153cc72~tplv-k3u1fbpfcp-watermark.image)

OK，进入最后一个循环。在`第一步`**旧列表**头节点`oldStartNode`与**新列表**头节点`newStartNode`位置相同，所以啥也不用做。然后结束循环，这就是`Vue2 双端比较`的原理。

**2. 非理想情况**

上一小节，我们讲了`双端比较`的原理，但是有一种特殊情况，当四次对比都**没找到**复用节点时，我们只能拿**新列表**的第一个节点去**旧列表**中找与其`key`相同的节点。

![img](D:\memo\JavaScript\img\2dea77f7267b406ca0dc8600096c4dc1~tplv-k3u1fbpfcp-watermark.image)

```js
function vue2Diff(prevChildren, nextChildren, parent) {
  //...
  while (oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex) {
    if (oldStartNode.key === newStartNode.key) {
    //...
    } else if (oldEndNode.key === newEndNode.key) {
    //...
    } else if (oldStartNode.key === newEndNode.key) {
    //...
    } else if (oldEndNode.key === newStartNode.key) {
    //...
    } else {
      // 在旧列表中找到 和新列表头节点key 相同的节点
      let newKey = newStartNode.key,
        oldIndex = prevChildren.findIndex(child => child.key === newKey);
      
    }
  }
}
```

找节点的时候其实会有两种情况：一种在**旧列表**中找到了，另一种情况是没找到。我们先以上图为例，说一下找到的情况。

![img](D:\memo\JavaScript\img\a74e61a47abb4e3ca85ffee65410340d~tplv-k3u1fbpfcp-watermark.image)

当我们在旧列表中找到对应的`VNode`，我们只需要将找到的节点的`DOM`元素，移动到开头就可以了。这里的逻辑其实和`第四步`的逻辑是一样的，只不过`第四步`是移动的尾节点，这里是移动找到的节点。`DOM`移动后，由我们将**旧列表**中的节点改为`undefined`，这是**至关重要**的一步，因为我们已经做了节点的移动了所以我们不需要进行再次的对比了。最后我们将头指针`newStartIndex`向后移一位。

```js
function vue2Diff(prevChildren, nextChildren, parent) {
  //...
  while (oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex) {
    if (oldStartNode.key === newStartNode.key) {
    //...
    } else if (oldEndNode.key === newEndNode.key) {
    //...
    } else if (oldStartNode.key === newEndNode.key) {
    //...
    } else if (oldEndNode.key === newStartNode.key) {
    //...
    } else {
      // 在旧列表中找到 和新列表头节点key 相同的节点
      let newtKey = newStartNode.key,
        oldIndex = prevChildren.findIndex(child => child.key === newKey);
      
      if (oldIndex > -1) {
        let oldNode = prevChildren[oldIndex];
        patch(oldNode, newStartNode, parent)
        parent.insertBefore(oldNode.el, oldStartNode.el)
        prevChildren[oldIndex] = undefined
      }
      newStartNode = nextChildren[++newStartIndex]
    }
  }
}
```

如果在**旧列表**中没有找到复用节点呢？很简单，直接创建一个新的节点放到最前面就可以了，然后后移头指针`newStartIndex`。

![img](D:\memo\JavaScript\img\4bbefb16b2bf4d52bb9b2a5f5ea86ec1~tplv-k3u1fbpfcp-watermark.image)

```js
function vue2Diff(prevChildren, nextChildren, parent) {
  //...
  while (oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex) {
    if (oldStartNode.key === newStartNode.key) {
    //...
    } else if (oldEndNode.key === newEndNode.key) {
    //...
    } else if (oldStartNode.key === newEndNode.key) {
    //...
    } else if (oldEndNode.key === newStartNode.key) {
    //...
    } else {
      // 在旧列表中找到 和新列表头节点key 相同的节点
      let newtKey = newStartNode.key,
        oldIndex = prevChildren.findIndex(child => child.key === newKey);
      
      if (oldIndex > -1) {
        let oldNode = prevChildren[oldIndex];
        patch(oldNode, newStartNode, parent)
        parent.insertBefore(oldNode.el, oldStartNode.el)
        prevChildren[oldIndex] = undefined
      } else {
      	mount(newStartNode, parent, oldStartNode.el)
      }
      newStartNode = nextChildren[++newStartIndex]
    }
  }
}
```

最后当**旧列表**遍历到`undefind`时就跳过当前节点。

```js
function vue2Diff(prevChildren, nextChildren, parent) {
  //...
  while (oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex) {
    if (oldStartNode === undefind) {
    	oldStartNode = prevChildren[++oldStartIndex]
    } else if (oldEndNode === undefind) {
    	oldEndNode = prevChildren[--oldEndIndex]
    } else if (oldStartNode.key === newStartNode.key) {
    //...
    } else if (oldEndNode.key === newEndNode.key) {
    //...
    } else if (oldStartNode.key === newEndNode.key) {
    //...
    } else if (oldEndNode.key === newStartNode.key) {
    //...
    } else {
    // ...
    }
  }
}
```

**3. 添加节点**

我们先来看一个例子

![img](D:\memo\JavaScript\img\85517a9eb0a34165832394b9d4e7627d~tplv-k3u1fbpfcp-watermark.image)

这个例子非常简单，几次循环都是尾节点相同，尾指针一直向前移动，直到循环结束，如下图

![img](D:\memo\JavaScript\img\668208458312440cae49139534fd6d59~tplv-k3u1fbpfcp-watermark.image)

此时`oldEndIndex`以及小于了`oldStartIndex`，但是**新列表**中还有剩余的节点，我们只需要将剩余的节点依次插入到`oldStartNode`的`DOM`之前就可以了。为什么是插入`oldStartNode`之前呢？原因是剩余的节点在**新列表**的位置是位于`oldStartNode`之前的，如果剩余节点是在`oldStartNode`之后，`oldStartNode`就会先行对比，这个需要思考一下，其实还是与`第四步`的思路一样。

```js
function vue2Diff(prevChildren, nextChildren, parent) {
  //...
  while (oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex) {
  // ...
  }
  if (oldEndIndex < oldStartIndex) {
    for (let i = newStartIndex; i <= newEndIndex; i++) {
      mount(nextChildren[i], parent, prevStartNode.el)
    }
  }
}
```

**4. 移除节点**

与上一小节的情况相反，当**新列表**的`newEndIndex`小于`newStartIndex`时，我们将**旧列表**剩余的节点删除即可。这里我们需要注意，**旧列表**的`undefind`。在第二小节中我们提到过，当头尾节点都不相同时，我们会去**旧列表**中找**新列表**的第一个节点，移动完DOM节点后，将**旧列表**的那个节点改为`undefind`。所以我们在最后的删除时，需要注意这些`undefind`，遇到的话跳过当前循环即可。

```js
function vue2Diff(prevChildren, nextChildren, parent) {
  //...
  while (oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex) {
  // ...
  }
  if (oldEndIndex < oldStartIndex) {
    for (let i = newStartIndex; i <= newEndIndex; i++) {
      mount(nextChildren[i], parent, prevStartNode.el)
    }
  } else if (newEndIndex < newStartIndex) {
    for (let i = oldStartIndex; i <= oldEndIndex; i++) {
      if (prevChildren[i]) {
        partent.removeChild(prevChildren[i].el)
      }
    }
  }
}
```

**5. 小结**

至此`双端比较`全部完成，以下是全部代码。

```js
function vue2diff(prevChildren, nextChildren, parent) {
  let oldStartIndex = 0,
    newStartIndex = 0,
    oldStartIndex = prevChildren.length - 1,
    newStartIndex = nextChildren.length - 1,
    oldStartNode = prevChildren[oldStartIndex],
    oldEndNode = prevChildren[oldStartIndex],
    newStartNode = nextChildren[newStartIndex],
    newEndNode = nextChildren[newStartIndex];
  while (oldStartIndex <= oldStartIndex && newStartIndex <= newStartIndex) {
    if (oldStartNode === undefined) {
      oldStartNode = prevChildren[++oldStartIndex]
    } else if (oldEndNode === undefined) {
      oldEndNode = prevChildren[--oldStartIndex]
    } else if (oldStartNode.key === newStartNode.key) {
      patch(oldStartNode, newStartNode, parent)

      oldStartIndex++
      newStartIndex++
      oldStartNode = prevChildren[oldStartIndex]
      newStartNode = nextChildren[newStartIndex]
    } else if (oldEndNode.key === newEndNode.key) {
      patch(oldEndNode, newEndNode, parent)

      oldStartIndex--
      newStartIndex--
      oldEndNode = prevChildren[oldStartIndex]
      newEndNode = nextChildren[newStartIndex]
    } else if (oldStartNode.key === newEndNode.key) {
      patch(oldStartNode, newEndNode, parent)
      parent.insertBefore(oldStartNode.el, oldEndNode.el.nextSibling)
      oldStartIndex++
      newStartIndex--
      oldStartNode = prevChildren[oldStartIndex]
      newEndNode = nextChildren[newStartIndex]
    } else if (oldEndNode.key === newStartNode.key) {
      patch(oldEndNode, newStartNode, parent)
      parent.insertBefore(oldEndNode.el, oldStartNode.el)
      oldStartIndex--
      newStartIndex++
      oldEndNode = prevChildren[oldStartIndex]
      newStartNode = nextChildren[newStartIndex]
    } else {
      let newKey = newStartNode.key,
        oldIndex = prevChildren.findIndex(child => child && (child.key === newKey));
      if (oldIndex === -1) {
        mount(newStartNode, parent, oldStartNode.el)
      } else {
        let prevNode = prevChildren[oldIndex]
        patch(prevNode, newStartNode, parent)
        parent.insertBefore(prevNode.el, oldStartNode.el)
        prevChildren[oldIndex] = undefined
      }
      newStartIndex++
      newStartNode = nextChildren[newStartIndex]
    }
  }
  if (newStartIndex > newStartIndex) {
    while (oldStartIndex <= oldStartIndex) {
      if (!prevChildren[oldStartIndex]) {
        oldStartIndex++
        continue
      }
      parent.removeChild(prevChildren[oldStartIndex++].el)
    }
  } else if (oldStartIndex > oldStartIndex) {
    while (newStartIndex <= newStartIndex) {
      mount(nextChildren[newStartIndex++], parent, oldStartNode.el)
    }
  }
}
```

### [#](http://interview.poetries.top/excellent-docs/16-框架通识.html#_4-3-vue3-diff-最长递增子序列)4.3 Vue3 Diff —— 最长递增子序列

`vue3`的`diff`借鉴于[inferno (opens new window)](https://github.com/infernojs/inferno)，该算法其中有两个理念。第一个是相同的前置与后置元素的预处理；第二个则是最长递增子序列，此思想与`React`的`diff`类似又不尽相同。下面我们来一一介绍。

**1. 前置与后置的预处理**

我们看这两段文字

```text
Hello World
Hey World
```

其实就简单的看一眼我们就能发现，这两段文字是有一部分是相同的，**这些文字是不需要修改也不需要移动的**，真正需要进行修改中间的几个字母，所以`diff`就变成以下部分

```text
text1: 'llo'
text2: 'y'
```

接下来换成`vnode`，我们以下图为例。

![img](D:\memo\JavaScript\img\90a27b4fa05b434889d99ae6fe832b4d~tplv-k3u1fbpfcp-watermark.image)

图中的被绿色框起来的节点，他们是不需要移动的，只需要进行打补丁`patch`就可以了。我们把该逻辑写成代码。

```js
function vue3Diff(prevChildren, nextChildren, parent) {
  let j = 0,
    prevEnd = prevChildren.length - 1,
    nextEnd = nextChildren.length - 1,
    prevNode = prevChildren[j],
    nextNode = nextChildren[j];
  while (prevNode.key === nextNode.key) {
    patch(prevNode, nextNode, parent)
    j++
    prevNode = prevChildren[j]
    nextNode = nextChildren[j]
  }
  
  prevNode = prevChildren[prevEnd]
  nextNode = prevChildren[nextEnd]
  
  while (prevNode.key === nextNode.key) {
    patch(prevNode, nextNode, parent)
    prevEnd--
    nextEnd--
    prevNode = prevChildren[prevEnd]
    nextNode = prevChildren[nextEnd]
  }
}
```

这时候，我们就需要考虑边界情况了，这里有两种情况。一种是`j > prevEnd`；另一种是`j > nextEnd`。

![img](D:\memo\JavaScript\img\52779ed5f26a451d8098e945709132cf~tplv-k3u1fbpfcp-watermark.image)

我们以这张图为例，此时`j > prevEnd`且`j <= nextEnd`，我们只需要把**新列表**中`j`到`nextEnd`之间剩下的节点**插入**进去就可以了。相反， 如果`j > nextEnd`时，我们把**旧列表**中`j`到`prevEnd`之间的节点**删除**就可以了。

```js
function vue3Diff(prevChildren, nextChildren, parent) {
  // ...
  if (j > prevEnd && j <= nextEnd) {
    let nextpos = nextEnd + 1,
      refNode = nextpos >= nextChildren.length
                ? null
                : nextChildren[nextpos].el;
    while(j <= nextEnd) mount(nextChildren[j++], parent, refNode)
    
  } else if (j > nextEnd && j <= prevEnd) {
    while(j <= prevEnd) parent.removeChild(prevChildren[j++].el)
  }
}
```

我们再继续思考，在我们`while`循环时，指针是从两端向内逐渐靠拢的，所以我们应该在循环中就应该去判断边界情况，我们使用`label`语法，当我们触发边界情况时，退出全部的循环，直接进入判断。代码如下：

```js
function vue3Diff(prevChildren, nextChildren, parent) {
  let j = 0,
    prevEnd = prevChildren.length - 1,
    nextEnd = nextChildren.length - 1,
    prevNode = prevChildren[j],
    nextNode = nextChildren[j];
  // label语法
  outer: {
    while (prevNode.key === nextNode.key) {
      patch(prevNode, nextNode, parent)
      j++
      // 循环中如果触发边界情况，直接break，执行outer之后的判断
      if (j > prevEnd || j > nextEnd) break outer
      prevNode = prevChildren[j]
      nextNode = nextChildren[j]
    }

    prevNode = prevChildren[prevEnd]
    nextNode = prevChildren[nextEnd]

    while (prevNode.key === nextNode.key) {
      patch(prevNode, nextNode, parent)
      prevEnd--
      nextEnd--
      // 循环中如果触发边界情况，直接break，执行outer之后的判断
      if (j > prevEnd || j > nextEnd) break outer
      prevNode = prevChildren[prevEnd]
      nextNode = prevChildren[nextEnd]
    }
  }
  
  // 边界情况的判断
  if (j > prevEnd && j <= nextEnd) {
    let nextpos = nextEnd + 1,
      refNode = nextpos >= nextChildren.length
                ? null
                : nextChildren[nextpos].el;
    while(j <= nextEnd) mount(nextChildren[j++], parent, refNode)
    
  } else if (j > nextEnd && j <= prevEnd) {
    while(j <= prevEnd) parent.removeChild(prevChildren[j++].el)
  }
}
```

**2. 判断是否需要移动**

其实几个算法看下来，套路已经很明显了，就是找到移动的节点，然后给他移动到正确的位置。把该加的新节点添加好，把该删的旧节点删了，整个算法就结束了。这个算法也不例外，我们接下来看一下它是如何做的。

当`前/后置`的预处理结束后，我们进入真正的`diff`环节。首先，我们先根据**新列表**剩余的节点数量，创建一个`source`数组，并将数组填满`-1`。

![img](D:\memo\JavaScript\img\75944ec3b6a245989a0eaf7e474ef174~tplv-k3u1fbpfcp-watermark.image)

我们先写这块逻辑。

```js
function vue3Diff(prevChildren, nextChildren, parent) {
  //...
  outer: {
  // ...
  }
  
  // 边界情况的判断
  if (j > prevEnd && j <= nextEnd) {
    // ...
  } else if (j > nextEnd && j <= prevEnd) {
    // ...
  } else {
    let prevStart = j,
      nextStart = j,
      nextLeft = nextEnd - nextStart + 1,     // 新列表中剩余的节点长度
      source = new Array(nextLeft).fill(-1);  // 创建数组，填满-1
     
  }
}
```

那么这个`source`数组，是要做什么的呢？他就是来做新旧节点的对应关系的，我们将**新节点**在**旧列表**的位置存储在该数组中，我们在根据`source`计算出它的`最长递增子序列`用于移动DOM节点。为此，我们先建立一个对象存储当前**新列表**中的`节点`与`index`的关系，再去**旧列表**中去找位置。

在找节点时要注意，**如果旧节点在新列表中没有的话，直接删除就好**。除此之外，我们还需要一个数量表示记录我们已经`patch`过的节点，如果数量已经与**新列表**剩余的节点数量一样，那么剩下的`旧节点`我们就直接删除了就可以了

```js
function vue3Diff(prevChildren, nextChildren, parent) {
  //...
  outer: {
  // ...
  }
  
  // 边界情况的判断
  if (j > prevEnd && j <= nextEnd) {
    // ...
  } else if (j > nextEnd && j <= prevEnd) {
    // ...
  } else {
    let prevStart = j,
      nextStart = j,
      nextLeft = nextEnd - nextStart + 1,     // 新列表中剩余的节点长度
      source = new Array(nextLeft).fill(-1),  // 创建数组，填满-1
      nextIndexMap = {},                      // 新列表节点与index的映射
      patched = 0;                            // 已更新过的节点的数量
      
    // 保存映射关系  
    for (let i = nextStart; i <= nextEnd; i++) {
      let key = nextChildren[i].key
      nextIndexMap[key] = i
    } 
    
    // 去旧列表找位置
    for (let i = prevStart; i <= prevEnd; i++) {
      let prevNode = prevChildren[i],
      	prevKey = prevNode.key,
        nextIndex = nextIndexMap[prevKey];
      // 新列表中没有该节点 或者 已经更新了全部的新节点，直接删除旧节点
      if (nextIndex === undefind || patched >= nextLeft) {
        parent.removeChild(prevNode.el)
        continue
      }
      // 找到对应的节点
      let nextNode = nextChildren[nextIndex];
      patch(prevNode, nextNode, parent);
      // 给source赋值
      source[nextIndex - nextStart] = i
      patched++
    }
  }
}
```

![img](D:\memo\JavaScript\img\01f5d145e4a84e3f922b4d39f80bcb6a~tplv-k3u1fbpfcp-watermark.image)

找到位置后，我们观察这个重新赋值后的`source`，我们可以看出，如果是全新的节点的话，其在`source`数组中对应的值就是初始的`-1`，通过这一步我们可以区分出来哪个为全新的节点，哪个是可复用的。

其次，我们要判断是否需要移动。那么如何判断移动呢？很简单，和`React`一样我们用递增法，如果我们找到的`index`是一直递增的，说明不需要移动任何节点。我们通过设置一个变量来保存是否需要移动的状态。

```js
function vue3Diff(prevChildren, nextChildren, parent) {
  //...
  outer: {
  // ...
  }
  
  // 边界情况的判断
  if (j > prevEnd && j <= nextEnd) {
    // ...
  } else if (j > nextEnd && j <= prevEnd) {
    // ...
  } else {
    let prevStart = j,
      nextStart = j,
      nextLeft = nextEnd - nextStart + 1,     // 新列表中剩余的节点长度
      source = new Array(nextLeft).fill(-1),  // 创建数组，填满-1
      nextIndexMap = {},                      // 新列表节点与index的映射
      patched = 0,
      move = false,                           // 是否移动
      lastIndex = 0;                          // 记录上一次的位置
      
    // 保存映射关系  
    for (let i = nextStart; i <= nextEnd; i++) {
      let key = nextChildren[i].key
      nextIndexMap[key] = i
    } 
    
    // 去旧列表找位置
    for (let i = prevStart; i <= prevEnd; i++) {
      let prevNode = prevChildren[i],
      	prevKey = prevNode.key,
        nextIndex = nextIndexMap[prevKey];
      // 新列表中没有该节点 或者 已经更新了全部的新节点，直接删除旧节点
      if (nextIndex === undefind || patched >= nextLeft) {
        parent.removeChild(prevNode.el)
        continue
      }
      // 找到对应的节点
      let nextNode = nextChildren[nextIndex];
      patch(prevNode, nextNode, parent);
      // 给source赋值
      source[nextIndex - nextStart] = i
      patched++
      
      // 递增方法，判断是否需要移动
      if (nextIndex < lastIndex) {
      	move = false
      } else {
      	lastIndex = nextIndex
      }
    }
    
    if (move) {
    
    // 需要移动
    } else {
	
    //不需要移动
    }
  }
}
```

**3. DOM如何移动**

判断完是否需要移动后，我们就需要考虑如何移动了。一旦需要进行DOM移动，我们首先要做的就是找到`source`的**最长递增子序列**。

```js
function vue3Diff(prevChildren, nextChildren, parent) {
  //...
  if (move) {
	const seq = lis(source); // [0, 1]
  // 需要移动
  } else {

  //不需要移动
  }
}
```

> 什么是最长递增子序列：给定一个数值序列，找到它的一个子序列，并且子序列中的值是递增的，子序列中的元素在原序列中不一定连续。
>
> 例如给定数值序列为：[ 0, 8, 4, 12 ]。
>
> 那么它的最长递增子序列就是：[0, 8, 12]。
>
> 当然答案可能有多种情况，例如：[0, 4, 12] 也是可以的。

上面的代码中，我们调用`lis` 函数求出数组`source`的最长递增子序列为`[ 0, 1 ]`。我们知道 source 数组的值为 `[2, 3, 1, -1]`，很显然最长递增子序列应该是`[ 2, 3 ]`，但为什么计算出的结果是`[ 0, 1 ]`呢？其实`[ 0, 1 ]`代表的是最长递增子序列中的各个元素在`source`数组中的位置索引，如下图所示：

![img](D:\memo\JavaScript\img\81c80851ea784e03b3c995234c70e9a3~tplv-k3u1fbpfcp-watermark.image)

我们根据`source`，对**新列表**进行重新编号，并找出了`最长递增子序列`。

我们从后向前进行遍历`source`每一项。此时会出现三种情况：

1. 当前的值为`-1`，这说明该节点是全新的节点，又由于我们是**从后向前**遍历，我们直接创建好DOM节点插入到队尾就可以了。
2. 当前的索引为`最长递增子序列`中的值，也就是`i === seq[j]`，这说说明该节点不需要移动
3. 当前的索引不是`最长递增子序列`中的值，那么说明该DOM节点需要移动，这里也很好理解，我们也是直接将DOM节点插入到队尾就可以了，因为队尾是排好序的

```js
function vue3Diff(prevChildren, nextChildren, parent) {
  //...
  if (move) {
   // 需要移动
	const seq = lis(source); // [0, 1]
    let j = seq.length - 1;  // 最长子序列的指针
    // 从后向前遍历
    for (let i = nextLeft - 1； i >= 0; i--) {
      let pos = nextStart + i, // 对应新列表的index
        nextNode = nextChildren[pos],	// 找到vnode
      	nextPos = pos + 1，    // 下一个节点的位置，用于移动DOM
        refNode = nextPos >= nextChildren.length ? null : nextChildren[nextPos].el, //DOM节点
        cur = source[i];  // 当前source的值，用来判断节点是否需要移动
    
      if (cur === -1) {
        // 情况1，该节点是全新节点
      	mount(nextNode, parent, refNode)
      } else if (cur === seq[j]) {
        // 情况2，是递增子序列，该节点不需要移动
        // 让j指向下一个
        j--
      } else {
        // 情况3，不是递增子序列，该节点需要移动
        parent.insetBefore(nextNode.el, refNode)
      }
    }
 
  } else {
  //不需要移动
  
  }
}
```

说完了需要移动的情况，再说说不需要移动的情况。如果不需要移动的话，我们只需要判断是否有全新的节点给他添加进去就可以了。具体代码如下：

```js
function vue3Diff(prevChildren, nextChildren, parent) {
  //...
  if (move) {
	const seq = lis(source); // [0, 1]
    let j = seq.length - 1;  // 最长子序列的指针
    // 从后向前遍历
    for (let i = nextLeft - 1； i >= 0; i--) {
      let pos = nextStart + i, // 对应新列表的index
        nextNode = nextChildren[pos],	// 找到vnode
      	nextPos = pos + 1，    // 下一个节点的位置，用于移动DOM
        refNode = nextPos >= nextChildren.length ? null : nextChildren[nextPos].el, //DOM节点
        cur = source[i];  // 当前source的值，用来判断节点是否需要移动
    
      if (cur === -1) {
        // 情况1，该节点是全新节点
      	mount(nextNode, parent, refNode)
      } else if (cur === seq[j]) {
        // 情况2，是递增子序列，该节点不需要移动
        // 让j指向下一个
        j--
      } else {
        // 情况3，不是递增子序列，该节点需要移动
        parent.insetBefore(nextNode.el, refNode)
      }
    }
  } else {
    //不需要移动
    for (let i = nextLeft - 1； i >= 0; i--) {
      let cur = source[i];  // 当前source的值，用来判断节点是否需要移动
    
      if (cur === -1) {
       let pos = nextStart + i, // 对应新列表的index
          nextNode = nextChildren[pos],	// 找到vnode
          nextPos = pos + 1，    // 下一个节点的位置，用于移动DOM
          refNode = nextPos >= nextChildren.length ? null : nextChildren[nextPos].el, //DOM节点
      	mount(nextNode, parent, refNode)
      }
    }
  }
}
```

至此`vue3.0`的diff完成。

**4. 最长递增子序列**

我们以该数组为例

```js
[10,9,2,5,3,8,7,13]
```

我们可以使用动态规划的思想考虑这个问题。动态规划的思想是将一个大的问题分解成多个小的子问题，并尝试得到这些子问题的最优解，子问题的最优解有可能会在更大的问题中被利用，这样通过小问题的最优解最终求得大问题的最优解。

我们先假设只有一个值的数组`[13]`，那么该数组的最长递增子序列就是`[13]`自己本身，其长度为`1`。**那么我们认为每一项的递增序列的长度值均为1**

那么我们这次给数组增加一个值`[7, 13]`, 由于`7 < 13`，所以该数组的最长递增子序列是`[7, 13]`，那么该长度为`2`。**那么我们是否可以认为，当`[7]`小于`[13]`时，以`[7]`为头的递增序列的长度是，`[7]`的长度和`[13]`的长度的和**，即`1 + 1 = 2`。

ok，我们基于这种思想来给计算一下该数组。我们先将每个值的初始赋值为`1`

![img](D:\memo\JavaScript\img\b62114779ce647db906d73ab1a737298~tplv-k3u1fbpfcp-watermark.image)

首先 `7 < 13` 那么`7`对应的长度就是`13`的长度再加1，`1 + 1 = 2`

![img](D:\memo\JavaScript\img\80dc121621324857ab806f8220f264b4~tplv-k3u1fbpfcp-watermark.image)

继续，我们对比`8`。我们首先和`7`比，发现不满足递增，但是没关系我们还可以继续和`13`比，`8 < 13`满足递增，那么`8`的长度也是`13`的长度在加一，长度为`2`

![img](D:\memo\JavaScript\img\2782096530ba4f76ae05d4eece27298f~tplv-k3u1fbpfcp-watermark.image)

我们再对比`3`，我们先让其与`8`进行对比，`3 < 8`，那么`3`的长度是`8`的长度加一，此时`3`的长度为`3`。但是还没结束，我们还需要让`3`与`7`对比。同样`3 < 7`，此时我们需要在计算出一个长度是`7`的长度加一同样是`3`，我们对比两个长度，**如果原本的长度没有本次计算出的长度值大的话，我们进行替换，反之则我们保留原本的值**。由于`3 === 3`，我们选择不替换。最后，我们让`3`与`13`进行对比，同样的`3 < 13`，此时计算出的长度为`2`，比原本的长度`3`要小，我们选择保留原本的值。

![img](D:\memo\JavaScript\img\cca21599c47c429ab0067c093c9e8bd0~tplv-k3u1fbpfcp-watermark.image)

之后的计算依次类推，最后的结果是这样的

![image-20210220201751694](D:\memo\JavaScript\img\image-20210220201751694.png)

我们从中取最大的值`4`，该值代表的**最长递增子序列的个数**。代码如下：

```js
function lis(arr) {
  let len = arr.length,
    dp = new Array(len).fill(1); // 用于保存长度
  for (let i = len - 1; i >= 0; i--) {
    let cur = arr[i]
    for(let j = i + 1; j < len; j++) {
      let next = arr[j]
      // 如果是递增 取更大的长度值
      if (cur < next) dp[i] = Math.max(dp[j]+1, dp[i])
    }
  }
  return Math.max(...dp)
}
```

至此为止，我们讲完了基础的最长递增子序列。然而在`vue3.0`中，我们需要的是最长递增子序列在原本数组中的索引。所以我们还需要在创建一个数组用于保存每个值的最长子序列所对应在数组中的`index`。具体代码如下：

```js
function lis(arr) {
  let len = arr.length,
    res = [],
    dp = new Array(len).fill(1);
  // 存默认index
  for (let i = 0; i < len; i++) {
    res.push([i])
  }
  for (let i = len - 1; i >= 0; i--) {
    let cur = arr[i],
      nextIndex = undefined;
    // 如果为-1 直接跳过，因为-1代表的是新节点，不需要进行排序
    if (cur === -1) continue
    for (let j = i + 1; j < len; j++) {
      let next = arr[j]
      // 满足递增条件
      if (cur < next) {
        let max = dp[j] + 1
        // 当前长度是否比原本的长度要大
        if (max > dp[i]) {
          dp[i] = max
          nextIndex = j
        }
      }
    }
    // 记录满足条件的值，对应在数组中的index
    if (nextIndex !== undefined) res[i].push(...res[nextIndex])
  }
  let index = dp.reduce((prev, cur, i, arr) => cur > arr[prev] ? i : prev, dp.length - 1)
  // 返回最长的递增子序列的index
  return result[index]
}
```