# Day09 作业布置

## 一. 完成课堂所有的代码





## 二. 总结绝对定位的相对元素以及常见的解决方案

* 子绝父相
  * 子元素绝对定位、
  * 父元素相对定位

* 子绝父绝

  * 子元素绝对定位

  * 父元素绝对定位

* 子绝父固
  * 子元素绝对定位
  * 父元素固定定位





## 三. 总结浮动常见的规则内容

- 元素一旦浮动后, 脱离标准流
  - 朝着向左或向右方向移动，直到自己的边界紧贴着包含块（一般是父元素）或者其他浮动元素的边界为止
  - 定位元素会层叠在浮动元素上面

- 如果元素是向左（右）浮动，浮动元素的左（右）边界不能超出包含块的左（右）边界
- 浮动元素之间不能层叠
  - 如果一个元素浮动，另一个浮动元素已经在那个位置了，后浮动的元素将紧贴着前一个浮动元素（左浮找左浮，右浮找右浮）
  - 如果水平方向剩余的空间不够显示浮动元素，浮动元素将向下移动，直到有充足的空间为止

- 浮动元素不能与行内级内容层叠，行内级内容将会被浮动元素推出
  - 比如行内级元素、inline-block元素、块级元素的文字内容
  -  行内级元素、inline-block元素浮动后，其顶部将与所在行的顶部对齐



## 四. 通过浮动练习页面布局方案

~~~html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <link rel="stylesheet" href="./reset.css">
  <style>
    .content {
      width: 1211px;
      margin: 0 auto;
      /* background-color: #f00; */
      height: 1000px;
    }

    .wrapper {
      margin-right: -10px;
    }

    .item {
      float: left;
      width: 234px;
      margin-bottom: 10px;
      margin-right: 10px;
    }

    .item.left {
      height: 614px;
      background-image: url(../images/小米01.webp);
    }

    .item.right {
      height: 302px;
    }

    /*  */
    .items {
      background-color: #fff;
      display: block;
      width: 234px;
      height: 302px;
      /* margin: 0 10px; */
      text-align: center;
      box-sizing: border-box;
    }

    .items:hover {
      box-shadow: 0 2px 20px 5px rgba(0, 0, 0, .1)
    }

    .items img {
      width: 160px;
      height: 160px;
    }

    .items .title {
      margin-top: 14px;
      color: #333;
    }

    .items .desc {
      color: rgb(105, 97, 97);
      margin-top: 8px;

      /* 单行显示省略号 */
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .items .price {
      margin-top: 14px;
      font-size: 14px;
    }

    .items .new-price {
      color: #ff6700;
    }

    .items .old-price {
      color: #999;
      text-decoration: line-through;
      margin-left: 5px;
    }
  </style>
</head>

<body>

  <div class="content">
    <div class="wrapper">
      <div class="item left"></div>
      <div class="item right">
        <a class="items" href="https://www.mi.com/xiaomipad5pro" target="_blank">
          <img src="../images/xiaomi01.webp" alt="">
          <h3 class="title">小米平板5 Pro</h3>
          <p class="desc">
            全新12代英特尔处理器，CNC一体精雕工艺，2.5K 120Hz高清屏，可选MX550独立显卡
          </p>
          <div class="price">
            <span class="new-price">2399元起</span>
            <span class="old-price">2499元</span>
          </div>
        </a>
      </div>
      <div class="item right">
        <a class="items" href="https://www.mi.com/xiaomipad5pro" target="_blank">
          <img src="../images/xiaomi01.webp" alt="">
          <h3 class="title">小米平板5 Pro</h3>
          <p class="desc">
            全新12代英特尔处理器，CNC一体精雕工艺，2.5K 120Hz高清屏，可选MX550独立显卡
          </p>
          <div class="price">
            <span class="new-price">2399元起</span>
            <span class="old-price">2499元</span>
          </div>
        </a>
      </div>
      <div class="item right">
        <a class="items" href="https://www.mi.com/xiaomipad5pro" target="_blank">
          <img src="../images/xiaomi01.webp" alt="">
          <h3 class="title">小米平板5 Pro</h3>
          <p class="desc">
            全新12代英特尔处理器，CNC一体精雕工艺，2.5K 120Hz高清屏，可选MX550独立显卡
          </p>
          <div class="price">
            <span class="new-price">2399元起</span>
            <span class="old-price">2499元</span>
          </div>
        </a>
      </div>
      <div class="item right">
        <a class="items" href="https://www.mi.com/xiaomipad5pro" target="_blank">
          <img src="../images/xiaomi01.webp" alt="">
          <h3 class="title">小米平板5 Pro</h3>
          <p class="desc">
            全新12代英特尔处理器，CNC一体精雕工艺，2.5K 120Hz高清屏，可选MX550独立显卡
          </p>
          <div class="price">
            <span class="new-price">2399元起</span>
            <span class="old-price">2499元</span>
          </div>
        </a>
      </div>
      <div class="item right">
        <a class="items" href="https://www.mi.com/xiaomipad5pro" target="_blank">
          <img src="../images/xiaomi01.webp" alt="">
          <h3 class="title">小米平板5 Pro</h3>
          <p class="desc">
            全新12代英特尔处理器，CNC一体精雕工艺，2.5K 120Hz高清屏，可选MX550独立显卡
          </p>
          <div class="price">
            <span class="new-price">2399元起</span>
            <span class="old-price">2499元</span>
          </div>
        </a>
      </div>
      <div class="item right">
        <a class="items" href="https://www.mi.com/xiaomipad5pro" target="_blank">
          <img src="../images/xiaomi01.webp" alt="">
          <h3 class="title">小米平板5 Pro</h3>
          <p class="desc">
            全新12代英特尔处理器，CNC一体精雕工艺，2.5K 120Hz高清屏，可选MX550独立显卡
          </p>
          <div class="price">
            <span class="new-price">2399元起</span>
            <span class="old-price">2499元</span>
          </div>
        </a>
      </div>
      <div class="item right">
        <a class="items" href="https://www.mi.com/xiaomipad5pro" target="_blank">
          <img src="../images/xiaomi01.webp" alt="">
          <h3 class="title">小米平板5 Pro</h3>
          <p class="desc">
            全新12代英特尔处理器，CNC一体精雕工艺，2.5K 120Hz高清屏，可选MX550独立显卡
          </p>
          <div class="price">
            <span class="new-price">2399元起</span>
            <span class="old-price">2499元</span>
          </div>
        </a>
      </div>
      <div class="item right">
        <a class="items" href="https://www.mi.com/xiaomipad5pro" target="_blank">
          <img src="../images/xiaomi01.webp" alt="">
          <h3 class="title">小米平板5 Pro</h3>
          <p class="desc">
            全新12代英特尔处理器，CNC一体精雕工艺，2.5K 120Hz高清屏，可选MX550独立显卡
          </p>
          <div class="price">
            <span class="new-price">2399元起</span>
            <span class="old-price">2499元</span>
          </div>
        </a>
      </div>


    </div>
  </div>

</body>

</html>
~~~





## 五. 完成下面的案例练习

![image-20220406230906517](https://tva1.sinaimg.cn/large/e6c9d24egy1h10ekm9jenj207h06hq33.jpg)



~~~html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <link rel="icon " href="../icon/iconfont.ttf">
  <link rel="stylesheet" href="../icon/iconfont.css">
  <style>
    /* 重置样式 */
    a,
    i {
      text-decoration: none;
      color: #333;
    }

    .content {
      width: 275px;
      margin: 0 auto;
    }

    .content .item {
      display: block;
      position: relative;
      border-radius: 6px;
      overflow: hidden;
    }

    .content .item img {
      width: 275px;
      height: 154px;
      vertical-align: top;
    }

    .item .bottom {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: 27px;
      line-height: 27px;
      font-size: 12px;
      color: #fff;
    }

    .bottom .icons {
      position: relative;
      top: 1px;
      padding-left: 8px;
      color: #fff;
    }

    .bottom .icon_middle {
      padding-left: 10px;
      color: #fff;
    }

    .bottom .icon_right {
      position: absolute;
      right: 10px;
    }

    .text_bottom {
      display: block;
      margin: 8px 0;
      font-weight: 700;

    }

    .up {
      color: rgb(172, 163, 163);

    }

    .icon_up {
      position: relative;
      top: 1px;
      font-size: 16px;
      color: rgb(172, 163, 163);
    }

    .up>span {
      font-size: 14px;
    }
  </style>
</head>

<body>
  <div class="content">
    <a class="item" href="">
      <img src="../images/bilibili.webp" alt="">
      <div class="bottom">
        <i class="iconfont icons">&#xe671;
        </i>
        <span class="icon_left">33.6万</span>
        <i class="iconfont icon_middle">&#xf01b8;</i>
        <span class="icon_midle">3.4万</span>
        <span class="icon_right">01:50:38</span>
      </div>
    </a>
    <span class="text_bottom">三个视频看懂汉武帝的一生：汉匈决战来临</span>
    <div class="up">
      <i class="iconfont icon_up">&#xe665;</i>
      <span>唠点历史</span>
      <span>3-30</span>
    </div>
  </div>
</body>

</html>
~~~















