# Day10 作业布置

## 一. 完成课堂所有的代码

```
  boxEl.onmouseover = function () {
      console.log("boxEl onmouseover");
    }

    boxEl.onmouseout = function () {
      console.log("boxEl onmouseout");
    }

    spanEl.onmouseover = function () {
      console.log("spanEl onmouseover");
    }

    spanEl.onmouseout = function () {
      console.log("spanEl onmouseout");
    }
    
     // 方案二 事件委托
    var boxEl = document.querySelector(".box")
    boxEl.onmouseover = function (event) {
      if (event.target !== event.currentTarget) {
        console.log(event.target);
      }
    }
    
      // 搜素功能
    btnEl.onclick = function (event) {
      console.log("搜索功能");
      console.log(inputEl.value);
    }
    inputEl.onkeydown = function (event) {
      if (event.key === "Enter") {
        console.log(event.target.value);
      }
    }

    document.onkeyup = function (event) {
      console.log("document键盘事件", event.key, event.code);
      if (event.code === "KeyS") {
        console.log("用户在网页中点击了s");
        inputEl.focus();
      }
    }
    
       // 输入的过程
    inputEl.oninput = function () {
      console.log("正在输入内容 input事件:", inputEl.value);
    }
    // 确定最终值(输入完毕失去焦点)的时候才会触发
    inputEl.onchange = function () {
      console.log("内容发生改变 change事件", inputEl.value);
    }

    // 3 监听重置和提交
    formEl.onreset = function (event) {
      console.log("发生了重置事件");
      event.preventDefault()
    }
    formEl.onsubmit = function (event) {
      console.log("发生了提交事件");
      event.preventDefault()
    }
    
       // 注册事件监听
    window.addEventListener("load", () => {
      var boxEl = document.querySelector(".box")
      boxEl.style.backgroundColor = "red"
      var imgEl = document.querySelector("img")
      console.log(imgEl.offsetHeight, imgEl.offsetWidth);

    })
    window.addEventListener("DOMContentLoaded", () => {
      // 1 这里可以操作box box已经加载完毕
      var imgEl = document.querySelector("img")
      console.log(imgEl.offsetHeight, imgEl.offsetWidth);
    })
    window.onresize = function () {
      console.log("窗口发生改变时");
    }
```



## 二. 整理常见的事件，并且说出mouseenter和mouseover的区别

常见事件

- 鼠标事件
  - click
  - contextmenu 鼠标右键
  - mouseenter
  - mouseleave
  - mouseover
  - mouseout
  - mousemove 鼠标移动
- 键盘事件
  - keydown
  - keypress
  - keyup
    - 通过key和code区分
- 表单事件
  - change
  - input
  - focus
  - blur
  - reset
  - submit



mouseenter

- 不会冒泡 
- 进入子元素的时候不会有任何行为

mouseover

- 会进行冒泡行为
- 进入子元素 会先out父元素 在over子元素 在over父元素

## 三. 说说load和DOMContentLoaded的区别

load

- 浏览器加载完所有的HTML 还加载完所有的外部资源 样式 图片等

DOMContentLoaded

- HTML文档所有资源都加载完成 并构建了DOM树 但是一些外部资源还没有加载完成 如图片的src

## 四. 实现课堂登录的案例实战

![image-20220520235721586](https://tva1.sinaimg.cn/large/e6c9d24egy1h2fb8ed2jgj20ie0d7q3e.jpg)



## 五. 实现购物车案例数量的变化

![image-20220520235737553](https://tva1.sinaimg.cn/large/e6c9d24egy1h2fb8ncc5bj20x60f00uv.jpg)



























