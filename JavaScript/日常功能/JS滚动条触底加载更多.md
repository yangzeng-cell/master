### 原理

1. 通过监听滚动区域DOM的`scroll`事件, 计算出触底



```javascript
// 滚动可视区域高度 + 当前滚动位置 === 整个滚动高度
scrollDom.clientHeight + scrollDom.scrollTop === scrollDom.scrollHeight
```

1. 触底后触发列表添加, 列表添加使用`createDocumentFragment`, 将多次插入的DOM先存入内存, 最后一次填充进去, 提高性能, 也方便后面的`MutationObserver`监听
2. 使用`MutationObserver`监听列表的DOM添加, 添加完毕后, 隐藏加载中提示

### 示例

[https://codepen.io/klren0312/full/dybgayL](https://links.jianshu.com/go?to=https%3A%2F%2Fcodepen.io%2Fklren0312%2Ffull%2FdybgayL)

![img](https:////upload-images.jianshu.io/upload_images/2245742-d25e7b2c655b3dda.gif?imageMogr2/auto-orient/strip|imageView2/2/w/359/format/webp)

2.gif

### 参考资料

[https://developer.mozilla.org/zh-CN/docs/Web/API/Element/clientHeight](https://links.jianshu.com/go?to=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FAPI%2FElement%2FclientHeight)
 [https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scrollHeight](https://links.jianshu.com/go?to=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FAPI%2FElement%2FscrollHeight)
 [https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scrollTop](https://links.jianshu.com/go?to=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FAPI%2FElement%2FscrollTop)
 [https://developer.mozilla.org/zh-CN/docs/Web/API/GlobalEventHandlers/onscroll](https://links.jianshu.com/go?to=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FAPI%2FGlobalEventHandlers%2Fonscroll)
 [https://developer.mozilla.org/zh-CN/docs/Web/API/Document/createDocumentFragment](https://links.jianshu.com/go?to=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FAPI%2FDocument%2FcreateDocumentFragment)
 [https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver](https://links.jianshu.com/go?to=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FAPI%2FMutationObserver)

### 代码



```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
  <style>
    .hide {
      display: none;
    }
    .scroll {
      height: 200px;
      width: 300px;
      overflow-y: auto;
      border: 1px solid #ddd;
    }
    .loading {
      text-align: center;
    }
    ul {
      margin: 0;
      padding: 0;
    }
    li {
      padding: 10px;
      margin: 10px;
      text-align: center;
      background: #FFF6F6;
      list-style-type: none;
    }
  </style>
</head>
<body>
  <div id="js-scroll" class="scroll">
    <ul id="js-list">
      <li>000000</li>
      <li>000000</li>
      <li>000000</li>
      <li>000000</li>
      <li>000000</li>
    </ul>
    <div class="loading hide" id="js-loading">加载中...</div>
  </div>
  <script>
    let index = 0 // 列表个数
    const listDom = document.getElementById('js-list')
    const loadingDom = document.getElementById('js-loading')

    /**
     * 使用MutationObserver监听列表的 DOM 改变
     */
    const config = {
      attributes: true,
      childList: true,
      subtree: true
    }
    const callback = function(mutationsList, observer) {
      for (let mutation of mutationsList) {
        if (mutation.type === 'childList') {
          if (index === 5) {
            loadingDom.innerText = '加载完毕'
          } else {
            loadingDom.classList.add('hide')
          }
        }
      }
    }
    const observer = new MutationObserver(callback)
    observer.observe(listDom, config)

    /**
     * clientHeight 滚动可视区域高度
     * scrollTop 当前滚动位置
     * scrollHeight 整个滚动高度
     */
    const scrollDom = document.getElementById('js-scroll')
    scrollDom.onscroll = () => {
      if (scrollDom.clientHeight + parseInt(scrollDom.scrollTop) === scrollDom.scrollHeight) {
        if (loadingDom.classList.contains('hide') && index <= 5) {
          loadingDom.classList.remove('hide')
          addList()
        }
        if (index >= 5) {
          observer.disconnect() // 加载完毕停止监听列表 DOM 变化
        }
      }
    }

    /**
     * 添加列表
     */
    function addList () {
      const fragment = document.createDocumentFragment()
      setTimeout(() => {
        ++index
        for (let i = 0; i < 5; i++) {
          const li = document.createElement('li')
          li.innerText = new Array(6).fill(index).join('')
          fragment.appendChild(li)
        }
        listDom.appendChild(fragment)
      } , 1000)
    }

  </script>
</body>
</html>
```



作者：ZZES_ZCDC
链接：https://www.jianshu.com/p/86765f4df7a1
来源：简书
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。