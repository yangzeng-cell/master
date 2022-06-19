# Day05作业布置

## 一. 写出案例，证明CSS属性的继承性

当给父元素div(类名为box)设置font-size,color,text-align这些属性时,由于这些属性具有继承性,所以该父元素下的所有子元素(p,span,div)都会默认继承这些属性

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
        /* 如果给某一个元素设置了某个CSS属性,而且这个属性具有继承性,那么该元素的所有子元素会默认继承属性 */
        /* 一般和文本或者字体相关的很多属性都具备继承 */
        width: 400px;
        height: 400px;
        font-size: 30px;
        color: green;
        text-align: center;
        background-color: pink;
      }
    </style>
  </head>
  <body>
    <div class="box">
      <div class="one">鹅鹅鹅<span>床前明月光</span></div>
      <p>我是p元素</p>
    </div>
  </body>
</html>
```



## 二. 写出案例，证明CSS属性的层叠性

一个CSS属性可以多次设置:

* 判断一: 权重, 优先级;

* 判断二: 先后顺序;

  ```html
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>
      <style>
        /* id选择器 100 */
        #first {
          color: green;
        }
        /* 元素选择器 :1 */
        div {
          color: red;
        }
        /* 类选择器10 */
        .one {
          color: blue;
        }
        /* 类选择器10 */
        .two {
          color: orange;
        }
      </style>
    </head>
    <body>
      <div class="one two" id="first">我是div元素</div>
    </body>
  </html>
  
  ```

  

## 三. 默写出display常见的值，并且说出对应的特性，并且写出测试案例

block：让元素显示为块级元素;可以让元素独占一行,可以设置宽度和高度,高度默认由内容决定

inline：让元素显示为行内级元素 ;可以和其他行内级元素在同一行,不可以设置宽度和高度,宽度和高度由内容决定

inline-block：让元素同时具备行内级、块级元素的特征 ;可以和其他行内级元素在同一行,可以设置宽度和高度,默认宽度和高度由内容决定

none：隐藏元素

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
        width: 300px;
        height: 300px;
        background-color: pink;
        overflow: hidden;
      }
      .one span {
        display: block;
        width: 200px;
        height: 200px;
        background-color: red;
        margin: 10px auto;
      }
      p {
        display: inline;
        font-size: 20px;
      }
      .two::after {
        /* 插入方块 */
        content: "";
        display: inline-block;
        width: 10px;
        height: 10px;
        background-color: green;
      }
      .three {
        display: none;
      }
    </style>
  </head>
  <body>
    <div class="one">
      <span>我要变成块级元素</span>
    </div>
    <p>我要变成行内级元素</p>
    <a href="#">百度一下</a>
    <div class="two">在元素前面用伪元素插入123</div>
    <div class="three">我要隐藏</div>
  </body>
</html>

```



## 四. 总结元素隐藏的方法，并且说出他们的区别

* display:none

  * 元素不显示出来, 并且也不占据位置, 不占据任何空间

* visibility:hidden

  * 会占据元素应该占据的空间

* rgba设置颜色,将a的值设置为0

  * rgba的a设置的是alpha值, 可以设置透明度, 不影响子元素

* opacity设置透明度, 设置为0

  * 设置整个元素的透明度, 会影响所有的子元素

    

## 五.京东案例



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
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 300px;
        height: 200px;
        margin: 0 auto;
      }
      .item {
        width: 120px;
        height: 50px;
        line-height: 50px;
        font-size: 20px;
        color: #fff;
        text-align: center;
        padding: 0 5px;
        border-radius: 25px;
        background: #e1251b;
      }
      .plus {
        background: #363634;
        color: #e5d790;
      }
    </style>
  </head>
  <body>
    <div class="box">
      <div class="new item">新人福利</div>
      <div class="plus item">PLUS会员</div>
    </div>
  </body>
</html>

```



## 七. 进行下面的案例练习

* 可以先不做两行显示不全的...
* 可以先不做评论的靠右内容

![image-20220330230100029](https://tva1.sinaimg.cn/large/e6c9d24egy1h0sb01sx1yj207p09ydfw.jpg)



```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .goods {
        width: 400px;
        margin: 100px auto;
        padding: 10px;
        background-color: #f6f6f6;
      }
      .goods-img {
        /* width: 400px; */
        height: 400px;
        border: 1px solid #ccc;
        overflow: hidden;
      }
      .goods-img img {
        width: 100%;
      }
      .goods-info {
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
        margin: 8px 0;
      }
      .goods-price {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 45px;
        color: #999;
      }
      .price {
        display: flex;
        align-items: flex-end;
        font-weight: 700;
      }
      .present-price {
        color: red;
      }
      .present-price span {
        font-size: 24px;
      }
      .origin-price span {
        text-decoration: line-through;
      }
    </style>
  </head>
  <body>
    <div class="goods">
      <div class="goods-img">
        <img
          src="https://img12.360buyimg.com/n1/jfs/t1/159701/38/9948/81556/6040d1d9E6b486d68/5829df13f7b07b58.jpg"
        />
      </div>
      <h2 class="goods-info">
        【轻烟蜜粉】MAKE UP FOR EVER 玫珂菲 HD清晰无痕蜜粉 饼 6.2g（控油定妆粉饼
        补妆便携 雾面哑光）
      </h2>
      <div class="goods-price">
        <div class="price">
          <div class="present-price">￥<span>275</span></div>
          <div class="origin-price">￥<span>380</span></div>
        </div>
        <div class="comment">4934人已经评价</div>
      </div>
    </div>
  </body>
</html>

```



