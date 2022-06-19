# Day06 作业布置

## 一. 完成课堂所有的代码

盒子模型

* 08-盒子模型-margin

  ```html
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>
      <style>
        /* 外边距margin:上右下左,一般用于兄弟元素之间的距离 */
        /* padding一般用于父子元素之间的间距 */
        /* 用inline-block会出现中间一条线(因为换行符),还会出现上下不齐 */
        body {
          /* 解决inline-block问题 */
          font-size: 0;
        }
        .one {
          display: inline-block;
          width: 300px;
          height: 300px;
          background-color: pink;
          /* 一个值:上下左右 */
          /* margin: 30px; */
          /* 两个值:上下 左右 */
          /* margin: 10px 30px; */
          /* 三个值  上   左右  下 */
          margin: 10px 20px 30px;
        }
        .two {
          display: inline-block;
          width: 200px;
          height: 200px;
          background-color: #f00;
        }
      </style>
    </head>
    <body>
      <div class="one">我是第一个</div>
      <div class="two">我是第二个</div>
    </body>
  </html>
  
  ```

  

* 09-盒子模型-padding和margin对比

  ```html
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>
      <style>
        /* 需求:子元素距离父元素左侧/上侧有一定的距离 */
        /* 父子之间的距离用padding,兄弟之间的间距用margin */
        .box {
          width: 500px;
          height: 500px;
          background-color: pink;
          /* 方式一:给父加padding,但是盒子会撑大,通过box-sizing */
          /* padding: 20px 0 0 30px;
          box-sizing: border-box; */
          /* 解决传递问题 */
          overflow: auto;
        }
        .son {
          width: 200px;
          height: 200px;
          color: #fff;
          background-color: red;
          /* 方式二,给子元素加margin */
          margin-left: 20px;
          /* 造成margin-top的传递 */
          margin-top: 20px;
        }
      </style>
    </head>
    <body>
      <div class="box">
        <div class="son">我是子元素</div>
      </div>
    </body>
  </html>
  
  ```

  

* 10-盒子模型-margin的传递

  ```html
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>
      <style>
        /* 上下margin的传递 */
        .father {
          width: 400px;
          height: 400px;
          background-color: red;
          /* 解决方式一 */
          /* border: 1px solid rgba(0, 0, 0, 0); */
          /* 方法二 */
          /* overflow: auto; */
          /* 方法三 加padding */
          padding: 20px 0 0 0;
        }
        .son {
          width: 200px;
          height: 200px;
          background-color: pink;
          /* 当子元素(块)的顶线和父元素的顶部线重叠了,那子元素的margin-top传递给父元素 */
          margin-top: 30px;
          /* 左右不会传递 */
          margin-left: 10px;
        }
      </style>
    </head>
    <body>
      <div class="father">
        <div class="son">我是子元素</div>
      </div>
    </body>
  </html>
  
  ```

* 11-盒子模型-margin-bottom的传递 

  ```html
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>
      <style>
        .father {
          width: 400px;
          height: auto;
          background-color: red;
          overflow: auto;
        }
        .son {
          width: 200px;
          height: 200px;
          background-color: pink;
          /* 当父元素的底线和子元素(块)的底线重叠时,并且父的height:auto,
          那就会造成margin-bottom传递 */
          margin-bottom: 20px;
        }
      </style>
    </head>
    <body>
      <div class="father">
        <div class="son">我是子元素</div>
      </div>
      <div>今天愚人节</div>
    </body>
  </html>
  
  ```

  

* 12-盒子模型-margin的折叠

  ```html
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>
      <style>
        .one {
          width: 400px;
          height: 400px;
          background-color: red;
          /* 上下兄弟的折叠 ,取较大值*/
          /* 折叠就是垂直方向的兄弟元素,一个设置margin-bottom,一个设置margin-top,最后合并一个margin */
          margin-bottom: 30px;
        }
        .two {
          width: 200px;
          height: 200px;
          background-color: pink;
          margin-top: 50px;
          /* 水平margin不折叠 */
        }
      </style>
    </head>
    <body>
      <div class="one">大哥</div>
      <div class="two">二弟</div>
    </body>
  </html>
  
  ```

  

* 13-盒子模型-margin的折叠 父子之间

  ```html
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>
      <style>
        .one {
          width: 400px;
          height: 400px;
          background-color: red;
          /* 父子块的折叠 ,取较大值*/
          /* overflow: auto; */
          margin-top: 30px;
        }
        .two {
          width: 200px;
          height: 200px;
          background-color: pink;
          margin-top: 50px;
          /* 水平margin不折叠 */
        }
      </style>
    </head>
    <body>
      <div>红红火火恍恍惚惚或或或或或或或或或</div>
      <div class="one">
        <div class="two">二弟</div>
      </div>
    </body>
  </html>
  
  ```

  

* 14-块级水平居中问题

  ```html
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>
      <style>
        .one {
          width: 800px;
          height: 300px;
          background-color: red;
          text-align: center;
        }
        .two {
          width: 200px;
          height: 200px;
          background-color: pink;
          /* 水平居中方式一 */
          /* margin: 0 auto; */
          /* 方式二 */
          display: inline-block;
        }
      </style>
    </head>
    <body>
      <div class="one">
        <div class="two">二弟</div>
      </div>
    </body>
  </html>
  
  ```

  

* 15-外轮廓

  ```html
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>
      <style>
        .box {
          width: 300px;
          height: 300px;
          background-color: pink;
          /* 外轮廓不占位置,和border设置一样 */
          outline: 20px solid rgba(111, 59, 59, 0.8);
        }
        /* 给a设置样式,相当于给a的所有动态伪类都设置了 */
        a,
        input {
          /* 通常给a和input去掉外轮廓 */
          outline: none;
        }
      </style>
    </head>
    <body>
      <div class="box">外轮廓</div>
      <div>我是块</div>
      <span>hhhhhhhh</span>
      <a href="#">百度一下</a>
      <input type="text" />
    </body>
  </html>
  
  ```

  

* 16-盒子阴影

  ```html
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>
      <style>
        .box {
          width: 300px;
          height: 300px;
          background-color: pink;
          margin: 50px auto;
          /* box-shadow:offset-x offset-y  blue-radius   spread-radius  color inset; */
          box-shadow: 20px 30px 5px 4px red inset, 100px 50px 4px 3px green;
        }
      </style>
    </head>
    <body>
      <div class="box">外轮廓</div>
    </body>
  </html>
  
  ```

  

* 17-文字阴影

  ```html
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>
      <style>
        span {
          /* 文字阴影和盒子阴影差不多,少了向外延伸半径 和 inset */
          text-shadow: 20px 30px 4px blue;
        }
      </style>
    </head>
    <body>
      <span>文字阴影</span>
    </body>
  </html>
  
  ```

  

* 18-行内非替换元素的特殊性

  ```html
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>
      <style>
        .box {
          width: 200px;
          height: 200px;
          background-color: pink;
        }
        span {
          margin-top: 20px;
          margin-bottom: 30px;
          padding: 30px 50px;
          border: 20px solid #666;
          /* 行内非替换元素对width,height,margin上下无效  ,但是对border上下,padding上下有特殊,会撑开盒子,但是不占空间 */
        }
      </style>
    </head>
    <body>
      <div class="box">11</div>
      <a href="#">百度一下</a>
      <span>
        width、height、margin-top、margin-bottom对行内级非替换元素不起作用</span
      >
      <a href="#">谷歌</a>
      <div class="box">hhhhh</div>
    </body>
  </html>
  
  ```

  

* 19-前景色和背景设置的哪些

  ```html
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>
      <style>
        .box {
          width: 200px;
          height: 200px;
          background-color: green;
          border: 10px solid;
          /* 如果没有设置border颜色,那就用color前景色代替 */
          color: pink;
        }
      </style>
    </head>
    <body>
      <div class="box">111</div>
    </body>
  </html>
  
  ```

  

* 20-box-sizing

  ```html
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>
      <style>
        .box,
        .one {
          /* content-box:width指的是内容的宽度,盒子实际占据的宽度=width+padding+border padding、border都布置在width、height外边 */
          /* border-box:width指的是盒子实际占据的宽度  padding、border都布置在width、height里边,*/
          width: 200px;
          height: 200px;
          background-color: green;
          border: 10px solid pink;
          padding: 20px;
        }
        .one {
          box-sizing: border-box;
        }
      </style>
    </head>
    <body>
      <div class="box">111</div>
      <div class="one">111</div>
    </body>
  </html>
  
  ```

  

* 21-案例新人福利

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
        .item {
          display: inline-block;
          width: 70px;
          height: 25px;
          text-align: center;
          line-height: 25px;
  
          border-radius: 13px;
        }
        .new {
          color: #fff;
          background-color: #e1251b;
        }
        .vip {
          color: #e5d790;
          background-color: #363634;
        }
        a:hover {
          background-color: #c81623;
          color: #fff;
        }
      </style>
    </head>
    <body>
      <a
        href="https://xinren.jd.com/?channel=99#/home"
        class="item new"
        target="_blank"
        >新人福利</a
      >
      <a
        href="https://passport.jd.com/new/login.aspx"
        class="item vip"
        target="_blank"
        >PLUS会员</a
      >
    </body>
  </html>
  
  ```

  

* 22-模仿小米案例

  ```html
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="stylesheet" href="css/reset.css" />
      <link rel="stylesheet" href="css/xiaomi.css" />
      <title>Document</title>
    </head>
    <body>
      <a href="https://www.mi.com/xiaomipad5pro" class="item">
        <img src="../image/xiaomi01.webp" class="alblm" />
        <h3 class="title">小米平板5 Pro</h3>
        <p class="desc">
          全新12代英特尔处理器，CNC一体精雕工艺，2.5K
          120Hz高清屏，可选MX550独立显卡
        </p>
        <div class="price">
          <span class="old-price">2399元起</span>
          <span class="new-price">2499元</span>
        </div>
      </a>
    </body>
  </html>
  
  ```

  

* 23-B站案例

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
        a {
          display: block;
        }
        .item {
          width: 300px;
          margin: 100px auto;
        }
        .item .album img {
          width: 100%;
          border-radius: 5px;
        }
        .item .info h3 {
          font-size: 15px;
          margin-top: 8px;
          /* 单行显示省略号 */
          /* white-space: nowrap; */
  
          /* 多行显示省略号 */
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .item .anchor {
          font-size: 13px;
          color: #888;
          margin-top: 5px;
        }
        .item .nickname::before {
          content: url(../image/widget-up.svg);
          display: inline-block;
          width: 16px;
          height: 16px;
          position: relative;
          top: 1px;
          margin-right: 8px;
        }
      </style>
    </head>
    <body>
      <div class="item">
        <div class="album">
          <a href="#"
            ><img
              src="https://i0.hdslb.com/bfs/archive/9c763bf06b7765462eac62cc0a9a34b260d3f9c8.jpg@672w_378h_1c.webp"
              referrerpolicy="no-referrer"
          /></a>
        </div>
        <div class="info">
          <a href="#">
            <h3>
              萌化了！谁会不喜欢毛茸茸的小懒懒呢？萌化了！谁会不喜欢毛茸茸的小懒懒呢？萌化了！谁会不喜欢毛茸茸的小懒懒呢？萌化了！谁会不喜欢毛茸茸的小懒懒呢？
            </h3>
          </a>
          <a href="" class="anchor">
            <span class="nickname">Muxi慕喜咩</span>
            <span class="time">3-20</span>
          </a>
        </div>
      </div>
    </body>
  </html>
  
  ```

  二.CSS-背景

  * 01-背景图片

    ```html
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
        <style>
          .box {
            width: 1000px;
            height: 500px;
            background-color: pink;
            background-image: url(../image/diqiu.jpg), url(../image/lyf.png);
            background-repeat: no-repeat;
          }
        </style>
      </head>
      <body>
        <div class="box">哈哈哈</div>
      </body>
    </html>
    
    ```

  * 02-背景平铺

    ```html
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
        <style>
          .box {
            width: 1000px;
            height: 800px;
            background-color: pink;
            background-image: url(../image/diqiu.jpg);
            /* 背景平铺,默认repeat */
            background-repeat: no-repeat;
            background-repeat: repeat-x;
            background-repeat: repeat-y;
          }
        </style>
      </head>
      <body>
        <div class="box">哈哈哈</div>
      </body>
    </html>
    
    ```

    

  * 03-背景平铺练习

    ```html
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
        <style>
          .box {
            width: 300px;
            height: 300px;
            /* 默认平铺 */
            background-image: url(../image/wall.png);
          }
        </style>
      </head>
      <body>
        <div class="box"></div>
      </body>
    </html>
    
    ```

    

  * 04-背景位置

    ```html
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
        <style>
          .box {
            width: 1000px;
            height: 500px;
            background-color: pink;
            background-image: url(../image/diqiu.jpg);
            background-repeat: no-repeat;
            background-position: 20px 60px;
            /* 水平方向还可以设值：left、center、right */
            /* 垂直方向还可以设值：top、center、bottom */
            background-position: left bottom;
            /*只设置了1个方向，另一个方向默认是cente*/
            background-position: right;
          }
        </style>
      </head>
      <body>
        <div class="box">哈哈哈</div>
      </body>
    </html>
    
    ```

    

  * 05-背景尺寸

    ```html
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
        <style>
          .box {
            width: 1000px;
            height: 500px;
            background-color: pink;
            background-image: url(../image/diqiu.jpg);
            background-repeat: no-repeat;
            /* 默认 */
            background-size: auto;
            /* contain:一边铺满,但是图片保持宽高比 */
            background-size: contain;
            /* cover 完全覆盖元素,可能背景图片部分看不见 */
            background-size: cover;
            /* 百分比，相对于背景区 */
            background-size: 50% 40%;
    
            background-size: 100px 200px;
          }
        </style>
      </head>
      <body>
        <div class="box">哈哈哈</div>
      </body>
    </html>
    
    ```

    

  * 05-背景位置练习

    ```html
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
        <style>
          body {
            padding: 0;
            margin: 0;
          }
          .box {
            width: 300px;
            height: 200px;
            background-image: url(../image/mhxy.jpg);
            background-repeat: no-repeat;
            background-position: center;
          }
        </style>
      </head>
      <body>
        <div class="box"></div>
      </body>
    </html>
    
    ```

    

  * 06-背景附加

    ```html
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
        <style>
          body {
            padding: 0;
            margin: 0;
          }
          .box {
            width: 300px;
            height: 200px;
            background-image: url(../image/mhxy.jpg);
            background-repeat: no-repeat;
            /*scroll背景不随内容滚动 */
            background-attachment: scroll;
            /* 背景随内容滚动 */
            background-attachment: local;
            background-attachment: fixed;
            overflow: scroll;
            /* 缩写 */
            /* background: url(../image/mhxy.jpg) no-repeat center/cover scroll; */
          }
        </style>
      </head>
      <body>
        <div class="box">
          习近平指出，8年前，我提出中国愿同欧洲一道打造中欧和平、增长、改革、文明四大伙伴关系，中方的这一愿景至今未改变，当前形势下更有现实意义。中欧有着广泛共同利益和深厚合作基础，中方对欧政策保持稳定连贯，希望欧方形成自主的对华认知，奉行自主的对华政策，同中方一道，推动中欧关系行稳致远，为动荡的世界局势提供一些稳定因素。
        </div>
        <br /><br /><br /><br /><br />
        <br /><br /><br /><br /><br />
        <br /><br /><br /><br /><br />
        <br /><br /><br /><br /><br />
        <br /><br /><br /><br /><br />
        <br /><br /><br /><br /><br />
        <br /><br /><br /><br /><br />
        <br /><br /><br /><br /><br />
        <br /><br /><br /><br /><br />
        <br /><br /><br /><br /><br />
      </body>
    </html>
    
    ```

    

## 二. 写出盒子模型包含的内容以及如何设置

盒子模型里包含

* 内容
  * 通过宽度和高度设置
* 内边距
  * 通过padding设置
  * padding: padding-top    padding-right   padding-bottom    padding-left;
* 边框
  * 通过border设置
  * border: border-width   border-style   border-color
* 外边距
  * 通过margin设置
  * margin:   margin-top   margin-right   margin-bottom    margin-left



## 三. 说说你对margin的传递和折叠的理解

margin的传递一般是父子块元素之间,有margin-top传递,margin-bottom传递.

* margin-top传递: 当块级元素的顶部线和父元素的顶部线重叠，那么这个块级元素的margin-top值会传递给父元素
* margin-bottom传递:当块级元素的底部线和父元素的底部线重叠，那么这个块级元素的margin-bottom值会传递给父元素

折叠:   指的是 垂直方向上相邻的2个margin（margin-top、margin-bottom）有可能会合并为1个margin.

它有两个兄弟块级元素之间的上下margin的折叠,也有父子块元素之间的margin折叠

## 四. 行内非替换元素在设置padding/border的上下时，有什么特殊的地方？

上下会被撑起来,但是不占空间



## 五. 整理box-sizing的作用，以及content-box和border-box的区别

box-sizing用来设置盒子模型中宽高的行为

content-box:   padding、border都布置在width、height外边

border-box:  padding、border都布置在width、height里边



## 六. 说出元素水平居中的方案以及对应的场景

* 行内块元素(包括inline-block元素)

  * 水平居中：在父元素中设置text-align: center

* 块级元素 

  * 水平居中:margin:0 auto;

  

  



## 七. 练习background-position和background-size（为精灵图做准备）

* background-position

   ```
   <!DOCTYPE html>
   <html lang="en">
     <head>
       <meta charset="UTF-8" />
       <meta http-equiv="X-UA-Compatible" content="IE=edge" />
       <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       <title>Document</title>
       <style>
         .box {
           width: 1000px;
           height: 500px;
           background-color: pink;
           background-image: url(../image/diqiu.jpg);
           background-repeat: no-repeat;
           background-position: 20px 60px;
           /* 水平方向还可以设值：left、center、right */
           /* 垂直方向还可以设值：top、center、bottom */
           background-position: left bottom;
           /*只设置了1个方向，另一个方向默认是cente*/
           background-position: right;
         }
       </style>
     </head>
     <body>
       <div class="box">哈哈哈</div>
     </body>
   </html>
   ```
* background-size

  ```HTML
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>
      <style>
        .box {
          width: 1000px;
          height: 500px;
          background-color: pink;
          background-image: url(../image/diqiu.jpg);
          background-repeat: no-repeat;
          /* 默认 */
          background-size: auto;
          /* contain:一边铺满,但是图片保持宽高比 */
          background-size: contain;
          /* cover 完全覆盖元素,可能背景图片部分看不见 */
          background-size: cover;
          /* 百分比，相对于背景区 */
          background-size: 50% 40%;
          background-size: 100px 200px;
        }
      </style>
    </head>
    <body>
      <div class="box">哈哈哈</div>
    </body>
  </html>
  
  ```

  

## 八. 找出三个盒子模型的综合案例进行练习

