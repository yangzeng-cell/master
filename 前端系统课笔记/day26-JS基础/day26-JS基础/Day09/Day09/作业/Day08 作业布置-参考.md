# Day01 作业布置

## 一. 完成课堂所有的代码

```
 <!-- 我是注释 -->
  我是文本
  <div class="box">
    <h2>我是标题</h2>
    <p>我是内容</p>
    我是box
  </div>
  <script>
    // 1 获取三个节点
    var bodyChildNodes = document.body.childNodes
    var commentNode = bodyChildNodes[1]
    var textNode = bodyChildNodes[2]
    var divNode = bodyChildNodes[3]
    var divEl = document.querySelector('.box')
    // 2 节点属性
    console.log(commentNode.nodeType, textNode.nodeType, divNode.nodeType);
    console.log(Node.COMMENT_NODE);
    console.dir(commentNode);
    console.log(commentNode.nodeName, divNode.nodeName);
    console.log(commentNode.tagName, divNode.tagName);

    // 2.3 data(nodeValue)/innerHTML/innerText
    // data 针对非元素的节点获取数据
    // innerHTML 对应的HTML元素也会获取
    // textContent 只会获取文本内容
    console.log(commentNode.data, divNode.data);
    console.log(divNode.innerHTML);
    console.log(divNode.textContent);
    // console.log(divNode.innerText);

    // 设置文本 作用一样
    // divNode.innerHTML = "<h2>呵呵呵呵</h2>"
    // divNode.textContent = "<h2>呵呵呵呵</h2>"


    // 2.4 outerHTML
    console.log(divNode);
    console.log(divNode.outerHTML);
    
     // 1 拿到body
    var bodyEl = document.body

    // 2 拿到box
    var boxEl = bodyEl.firstElementChild


    // 直接获取keyword
    var keywordEls = document.getElementsByClassName("keyword")

    // 可迭代对象 String/数组/节点列表
    var keEls = document.querySelectorAll(".keyword")
    console.log(keEls, keywordEls);
    // for (const iterator of keywordEls) {
    //   console.log(iterator);
    // }
    
    var boxEl = document.querySelector('.box')
    // 在property中使用的驼峰格式
    console.log(boxEl.style.backgroundColor);

    // 2 如果将一个属性的值 设为空的字符串 则使用默认的值
    boxEl.style.display = ""
    
      var boxEl = document.querySelector('.box')
    console.log(getComputedStyle(boxEl).fontSize);
    console.log(getComputedStyle(boxEl).backgroundColor);
    console.log(getComputedStyle(boxEl).color);
    
    <div class="box" data-age="18">
    我是box
  </div>
  <script>
    var boxEl = document.querySelector('.box')
    console.log(boxEl.dataset.age);
```



## 二. 整理元素的导航有哪些？

- 父元素 parentElement
- 子元素 children
- 前兄弟节点 previousElementSibing
- 后兄弟节点 nextElementSibing
- 第一个子节点 firstElementChild
- 最后一个子节点 lastElementChild



## 三. 说说节点（Node）常见的属性

nodeType

- 获取节点的类型  
- 比如 注释节点8 文本节点3 元素节点1

tagName

- 获取元素的标签名词 仅适用于Element节点

nodeName

- 获取元素的标签名词 适用于任何Node节点

innerHTML,textContent

- 前者将元素中的HTML获取为字符串属性 后者仅仅获取文本内容

outerHTML

- 包含了完整的HTML
- 相当于innerHTML加上元素本身

nodeValue/data

- 获取非元素节点的文本内容

hidden

- 用于设置元素隐藏(全局属性)

## 四. 说说attribute和Property的区别和关系

attribute

- 浏览器解析HTML元素时 会将对应的属性(attribute)放在对应的元素对象上
- 具体分为标准的属性和非标准的属性
  - 标准属性: id class href type value等等
  - 非标准属性(自定义) :abc age height

Property

- 对于标准的attribute 会在DOM对象上创建对应的property属性
- 大多数情况下 他们是相互作用的 改变其中一个 另一个也会随之改变
- 大多数情况 推荐获取attribute 使用property方式 因为它默认是有类型的

## 五. 说说修改class和修改style的区别

- 如果动态修改class完成某个功能 推荐动态的添加class
- 如果精准修改某个CSS属性的值 则修改style属性

## 六. 完成如下表格的效果

![表格效果](https://tva1.sinaimg.cn/large/e6c9d24egy1h28av3mn4ij207205paac.jpg)



```
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    table {
      border-collapse: collapse;
    }

    table td {
      padding: 10px 20px;
      border: 1px solid #333;
    }

    /* td.active {
      background-color: #f00;
      color: #fff;
    } */
  </style>
</head>

<body>
  <table>
    <tr>
      <td>1-1</td>
      <td>2-1</td>
      <td>3-1</td>
      <td>4-1</td>
      <td>5-1</td>
    </tr>
    <tr>
      <td>1-2</td>
      <td>2-2</td>
      <td>3-2</td>
      <td>4-2</td>
      <td>5-2</td>
    </tr>
    <tr>
      <td>1-3</td>
      <td>2-3</td>
      <td>3-3</td>
      <td>4-3</td>
      <td>5-3</td>
    </tr>
    <tr>
      <td>1-4</td>
      <td>2-4</td>
      <td>3-4</td>
      <td>4-4</td>
      <td>5-4</td>
    </tr>
    <tr>
      <td>1-5</td>
      <td>2-5</td>
      <td>3-5</td>
      <td>4-5</td>
      <td>5-5</td>
    </tr>
  </table>
  <script>
    // 1 获取1-1
    var tableEl = document.body.firstElementChild
    // var row1El = tableEl.rows[0]
    // var cell1El = row1El.cells[0]
    // console.log(cell1El);

    for (let i = 0; i < tableEl.rows.length; i++) {
      var rowEl = tableEl.rows[i]
      var cellEl = rowEl.cells[i]
      // 设置样式
      cellEl.style.backgroundColor = "red"
      cellEl.style.color = "#fff"

    }
  </script>
</body>

</html>
```



## 七. 完整王者荣耀轮播图切换

- 见文件



![王者荣耀轮播图](https://tva1.sinaimg.cn/large/e6c9d24egy1h2budn4rzcj20h009q76g.jpg)



## 八 在界面中动态的显示当前的时间



- 见文件















