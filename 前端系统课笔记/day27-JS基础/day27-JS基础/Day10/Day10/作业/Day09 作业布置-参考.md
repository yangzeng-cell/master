# Day09 作业布置

## 一. 完成课堂所有的代码





## 二. 说说事件冒泡和事件捕获的理解

事件冒泡: 从最内层的元素向外依次传递的顺序, 默认是事件冒泡

事件捕获: 从外层到内层依次传递的顺序 ,可以通过addEventListener("click",fn,true) 监听事件捕获

## 三. EventTarget的使用

* addEventListener: 注册某个事件类型以及事件处理函数
* removeEventListener : 移除某个事件类型以及事件处理函数
* dispatchEvent : 派发某个事件类型到EventTarget上





## 四. 说说你对事件委托的理解

利用事件的冒泡机制，以及事件对象中可以准确获知触发事件的元素机制(e.target)，将子元素事件委托给父元素处理的现象



## 七. 完成tab切换

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      a {
        text-decoration: none;
      }
      ul,
      li {
        padding: 0;
        margin: 0;
        list-style: none;
      }
      .section {
        width: 872px;
        margin: 100px auto;
      }
      .subnav_type {
        display: flex;
        align-items: center;
        height: 32px;
        background: #f5f5f5;
      }
      .subnav_type .line {
        width: 1px;
        height: 20px;
        background: #e1e1e1;
      }
      .subnav_type .item {
        flex: 1;
      }
      .subnav_type .item_match > a {
        padding: 0 27px;
      }
      .subnav_type .item > a {
        display: block;
        line-height: 29px;
        border-bottom: 3px solid #f5f5f5;
        font-size: 14px;
        color: #999;
        text-align: center;
      }

      .subnav_type a.active {
        border-color: #f4be19;
      }
      /* keywords */
      .keywords {
        display: flex;
        /* 考虑多行 */
        flex-wrap: wrap;
        padding: 8px 0;
        margin-top: 5px;
        cursor: pointer;
      }
      .keywords > .item {
        height: 24px;
        line-height: 24px;
        padding: 0 15px;
        margin: 0 8px 8px 0;
        border: 1px solid #e5e5e5;
        border-radius: 10px;
        color: #333;
        background: #f5f5f5;
      }
      .keywords > .item.active {
        color: #fff;
        background: #f3c258;
      }
    </style>
  </head>
  <body>
    <div class="section">
      <ul class="subnav_type">
        <li class="item"><a href="#" class="active">精品栏目</a></li>
        <li class="line"></li>
        <li class="item"><a href="#">赛事精品</a></li>
        <li class="line"></li>
        <li class="item"><a href="#">英雄攻略</a></li>
      </ul>
      <div class="keywords">
        <div class="item">最新</div>
        <div class="item active">马菠萝奇闻录</div>
        <div class="item">王者克制论</div>
        <div class="item">王者视角</div>
        <div class="item">策见打</div>
        <div class="item">峡谷460</div>
        <div class="item">百星王者带你飞</div>
      </div>
    </div>
    <script>
      // 1.获取 ul,.keywords元素
      var ulEl = document.querySelector(".subnav_type");
      var keywordsEl = document.querySelector(".keywords");
      // 变量记录
      var activeEl = ulEl.querySelector(".active");
      var activeKey = keywordsEl.querySelector(".active");
      // 事件委托
      ulEl.onclick = function (event) {
        console.log(event.target);
        if (activeEl && event.target.tagName === "A") {
          activeEl.classList.remove("active");
        }
        if (event.target.tagName === "A") {
          event.target.classList.add("active");
          activeEl = event.target;
        }
      };
      keywordsEl.onclick = function (event) {
        if (activeKey && event.target !== keywordsEl) {
          activeKey.classList.remove("active");
        }
        if (event.target !== keywordsEl) {
          event.target.classList.add("active");
          activeKey = event.target;
        }
      };
    </script>
  </body>
</html>

```

## 八.轮播图切换



```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <link rel="stylesheet" href="./css/reset.css" />
    <style>
      /* banner */
      .banner {
        position: relative;
        width: 604px;
        height: 342px;
        background-color: #000;
        margin: 200px auto;
        overflow: hidden;
      }
      .banner .banner-list {
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        width: 500%;
        height: 298px;
      }
      .banner-list > li {
        /* align-items 拉伸 */
        flex-shrink: 0;
        width: 20%;
      }
      .banner-list .item {
        display: block;
      }
      .banner-list .item > img {
        width: 100%;
        height: 100%;
      }
      .banner .banner-btns {
        position: absolute;
        bottom: 0;
        left: 0;
        display: flex;
        width: 100%;
        height: 44px;
        line-height: 44px;
        z-index: 99;
      }
      .banner .banner-btns .btns-item {
        flex: 1;
        text-align: center;
        color: #b1b2be;

        font-size: 14px;
      }
      .banner .banner-btns > a:hover,
      .banner .banner-btns .btns-item.active {
        background: rgba(255, 255, 255, 0.15);
        color: #f3c258;
      }
    </style>
    <script src="./js/animate.js"></script>
  </head>
  <body>
    <div class="banner">
      <ul class="banner-list">
        <li>
          <a href="#" class="item">
            <img src="./img/banner_01.jpeg" alt="" />
          </a>
        </li>
        <li>
          <a href="#" class="item">
            <img src="./img/banner_02.jpeg" alt="" />
          </a>
        </li>
        <li>
          <a href="#" class="item">
            <img src="./img/banner_03.jpeg" alt="" />
          </a>
        </li>
        <li>
          <a href="#" class="item">
            <img src="./img/banner_04.jpeg" alt="" />
          </a>
        </li>
        <li>
          <a href="#" class="item">
            <img src="./img/banner_05.jpeg" alt="" />
          </a>
        </li>
      </ul>
      <div class="banner-btns">
        <a href="javascript:;" class="btns-item active">桑启的旅途故事</a>
        <a href="javascript:;" class="btns-item">启示之音抢先听</a>
        <a href="javascript:;" class="btns-item">谁成为版本之子</a>
        <a href="javascript:;" class="btns-item">荣耀大话王</a>
        <a href="javascript:;" class="btns-item">王者炸麦了</a>
      </div>
    </div>
    <script>
      // 1.获取元素
      var bannerBtnsEl = document.querySelector(".banner-btns");
      var bannerListEl = document.querySelector(".banner-list");
      var liWidth = bannerListEl.children[0].offsetWidth;
      // 声明计数器，记录左侧移动了几块儿内容
      var count = 0;
      var activeBtn = bannerBtnsEl.querySelector(".active");
      // 2.监听banner-btns 元素点击,事件委托
      for (var i = 0; i < bannerBtnsEl.children.length; i++) {
        bannerBtnsEl.children[i].setAttribute("data-index", i);
      }
      bannerBtnsEl.addEventListener("click", function (event) {
        if (activeBtn && event.target !== bannerBtnsEl) {
          // 存在就移除active类名
          activeBtn.classList.remove("active");
        }
        if (event.target !== bannerBtnsEl) {
          // 添加类名
          event.target.classList.add("active");
          activeBtn = event.target;
          // 获取自定义属性值
          var index = event.target.dataset.index;
          console.log(index);
          count = index;
          slow_move(bannerListEl, -count * liWidth);
        }
      });
    </script>
  </body>
</html>

```



















