# Day08 作业布置

## 一. 完成课堂所有的代码

已完成



## 二. 说出结构伪类的nth-child和nth-of-type的区别，并且写出案例练习

:nth-child  只计算父元素的第几个子元素 ,不管是否是同种类型,也不会排除干扰项.

:nth-of-type  计数时只计算同种类型的元素,会排除所有的干扰项

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      /* 获取box 的第3个div元素 */
      .box div:nth-child(3) {
        color: red;
      }
      /* 父元素下的3个孩子 */
      .box :nth-child(3) {
        color: pink;
      }
      /* 需求: 选择box中的第三个div元素(排除所有的干扰项) */
      .box div:nth-of-type(3) {
        font-weight: 700;
        color: green;
      }
      .box div:nth-of-type(2n) {
        background-color: pink;
      }
      .box div:nth-of-type(2n + 1) {
        background-color: blue;
      }
      /* 前几个 */
      .box div:nth-of-type(-n + 4) {
        color: purple;
        font-weight: 700;
      }
      /* 会找ul下的子元素同类型的第几个 */
      ul :nth-of-type(3) {
        color: pink;
      }
    </style>
  </head>
  <body>
    <div class="box">
      <div>第1个元素</div>
      <span>干扰项1</span>
      <span>干扰项2</span>
      <span>干扰项3</span>
      <span>干扰项4</span>
      <span>干扰项5</span>
      <div>第2个元素</div>
      <div>第3个元素</div>
      <div>第4个元素</div>
      <div>第5个元素</div>
      <div>第6个元素</div>
      <div>第7个元素</div>
      <div>第8个元素</div>
      <p>干扰项6</p>
      <div>第9个元素</div>
      <div>第10个元素</div>
    </div>
    <ul>
      <li>第1个li元素</li>
      <li>第2个li元素</li>
      <span>干扰项3</span>
      <span>干扰项4</span>
      <span>干扰项5</span>
      <li>第3个li元素</li>
      <li>第4个li元素</li>
      <li>第5个li元素</li>
      <li>第6个li元素</li>
      <li>第7个li元素</li>
      <li>第8个li元素</li>
      <li>第9个li元素</li>
      <li>第10个li元素</li>
    </ul>
  </body>
</html>

```



## 三. 自己练习使用字体图标

* 从iconfont中下载图标练习

   

* 方式一   通过对应字体图标的Unicode来显示代码;

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      /* 1.引入字体文件 */
      @font-face {
        font-family: "iconfont";
        src: url(./fonts03/iconfont.ttf);
      }
      /* 抽取公共类 */
      .iconfont {
        font-family: "iconfont";
        font-style: normal;
      }
      .person {
        display: inline-block;
        width: 100px;
        height: 100px;
        background-color: pink;
        font-size: 80px;
      }
      .gonchang::before {
        content: "\e98e";
        display: inline-block;
        width: 300px;
        height: 300px;
        font-size: 80px;
        background-color: pink;
      }
    </style>
  </head>
  <body>
    <i class="iconfont">&#x100ad;</i>
    <i class="iconfont person">&#xe654;</i>
    <i class="iconfont">&#xe655;</i>
    <i class="iconfont gonchang"></i>
  </body>
</html>

```

* 方式二  利用已经编写好的class, 直接使用即可;

* ```html
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>
      <link rel="stylesheet" href="./fonts03/iconfont.css" />
      <style>
        .icon-hetong {
          display: inline-block;
          width: 40px;
          height: 40px;
          font-size: 30px;
          background-color: pink;
        }
      </style>
    </head>
    <body>
      <i class="iconfont icon-hetong"></i>
    </body>
  </html>
  
  ```

  

## 四. 自己找精灵图进行练习

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
      .service {
        background: #eaeaea;
        border-bottom: 1px solid #666;
        margin-top: 200px;
      }
      .w {
        width: 1200px;
        margin: 0 auto;
      }
      .slogen {
        display: flex;
        align-items: center;
        height: 42px;
        padding: 30px 0 30px 55px;
      }
      .slogen .item {
        display: flex;
        flex: 1;
        align-items: center;
        height: 42px;
        line-height: 42px;
        font-size: 18px;
        font-weight: 700;
        color: #444;
        text-indent: 8px;
      }
      .slogen .icon {
        display: inline-block;
        width: 36px;
        height: 42px;
        background: url(../image/jd_sprite.png) no-repeat;
      }
      .slogen .more {
        background-position: 0 -192px;
      }
      .slogen .fast {
        background-position: -41px -192px;
      }
      .slogen .good {
        background-position: -82px -192px;
      }
      .slogen .cheap {
        background-position: -123px -192px;
      }
    </style>
  </head>
  <body>
    <div class="service">
      <div class="w">
        <ul class="slogen">
          <li class="item">
            <i class="icon more"></i>
            品类齐全，轻松购物
          </li>
          <li class="item">
            <i class="icon fast"></i>
            多仓直发，极速配送
          </li>
          <li class="item">
            <i class="icon good"></i>
            正品行货，精致服务
          </li>
          <li class="item">
            <i class="icon cheap"></i>
            天天低价，畅选无忧
          </li>
        </ul>
      </div>
    </div>
  </body>
</html>

```



## 五. 结合CSS元素定位，并且找出对应的练习案例（2个）

第一个模仿京东我的购物车

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="./fonts/iconfont.css" />
    <title>Document</title>
    <style>
      body {
        padding: 0;
        margin: 0;
      }
      a {
        text-decoration: none;
        font-size: 14px;
      }
      .shopping-cart {
        position: relative;
        width: 130px;
        height: 34px;
        line-height: 34px;
        text-align: center;
        border: 1px solid #eee;
        margin: 100px auto;
      }
      .shopping-cart .icon-gouwuche {
        color: #e1251b;
        font-size: 18px;
        font-weight: 700;
        margin-right: 10px;
      }
      .shopping-cart .my-cart {
        color: #e1251b;
        font-size: 14px;
        font-weight: 700;
      }
      .shopping-cart .num {
        position: absolute;
        left: 27px;
        top: 2px;
        display: inline-block;
        width: 12px;
        text-align: center;
        line-height: 12px;
        padding: 1px 3px;
        font-size: 12px;
        border-radius: 7px;
        color: #fff;
        background-color: #e1251b;
        font-style: normal;
      }
    </style>
  </head>
  <body>
    <div class="shopping-cart">
      <i class="icon-gouwuche iconfont"></i>
      <a href="#" class="my-cart">我的购物车</a>
      <i class="num">0</i>
    </div>
  </body>
</html>

```

第二个模仿B站头部服务列表

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <link rel="stylesheet" href="./css/reset.css" />
    <link rel="stylesheet" href="./fonts02/iconfont.css" />
    <style>
      .list {
        width: 300px;
        height: 50px;
        color: #fff;
        background-color: #ccc;
        margin: 30px auto;
      }
      .list .item {
        float: left;
        width: 50px;
      }
      .list .item .outside {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 50px;
        height: 50px;
        font-size: 10px;
        color: #fff;
      }
      .list .item .outside .icon {
        display: inline-block;
        width: 22px;
        height: 23px;
        font-size: 20px;
      }
      .list .item .outside .message {
        position: absolute;
        top: -1px;
        right: 5px;
        width: 15px;
        height: 15px;
        line-height: 15px;
        text-align: center;
        font-size: 12px;
        color: #fff;
        border-radius: 7px;
        background-color: #fa5a57;
      }
    </style>
  </head>
  <body>
    <ul class="list">
      <li class="item">
        <a href="#" class="outside">
          <i class="iconfont icon-wodedahuiyuan icon"></i>
          <span class="text">大会员</span>
        </a>
      </li>
      <li class="item">
        <a href="#" class="outside">
          <i class="iconfont icon-xiaoxi icon"></i>
          <div class="message">2</div>
          <span class="text">消息</span>
        </a>
      </li>
      <li class="item">
        <a href="#" class="outside">
          <i class="iconfont icon-fengche icon"></i>
          <div class="message">3</div>
          <span class="text">动态</span>
        </a>
      </li>
      <li class="item">
        <a href="#" class="outside">
          <i class="iconfont icon-shoucang icon"></i>
          <span class="text">收藏</span>
        </a>
      </li>
      <li class="item">
        <a href="#" class="outside">
          <i class="iconfont icon-lishi icon"></i>
          <span class="text">历史</span>
        </a>
      </li>
      <li class="item">
        <a href="#" class="outside">
          <i class="iconfont icon-dengpao icon"></i>
          <span class="text">创作中心</span>
        </a>
      </li>
    </ul>
  </body>
</html>
```



