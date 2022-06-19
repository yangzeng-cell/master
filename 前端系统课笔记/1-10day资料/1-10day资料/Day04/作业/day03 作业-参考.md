# day03 作业布置

## 一. 说说你对元素语义化的理解

元素语义化就是用正确的元素做正确的事情。虽然在理论上，所以的html元素都可以通过css样式实现相同的事情，但是这么做会使事情复杂化，所以我们需要元素语义化来降低复杂度。

元素语义化在我们实际的开发中有很多好处，比如：

* 提高代码的阅读性和可维护性;
* 减少coder之间的沟通成本;
* 能让语音合成工具正确识别网页元素的用途，以便做出正确的反应
* 有利于SEO(Search Engine Optimization)



## 二. 说说你对SEO的理解

SEO就是搜索引擎优化(Search Engine Optimization)，SEO通过了解搜索引擎的运行规则来调整网站，以提高网站的曝光度,以及网站的排名。



Google 搜索引擎的工作流程主要分为三个阶段：

**抓取**：Google 会使用名为“抓取工具”的自动程序搜索网络，以查找新网页或更新后的网页。Google 会将这些网页的地址（即网址）存储在一个大型列表中，以便日后查看。我们会通过许多不同的方法查找网页，但主要方法是跟踪我们已知的网页中的链接。

**编入索引**：Google 会访问它通过抓取得知的网页，并会尝试分析每个网页的主题。Google 会分析网页中的内容、图片和视频文件，尝试了解网页的主题。这些信息存储在 Google 索引中，而 Google 索引是一个存储在海量计算机中的巨大数据库。

**呈现搜索结果**：当用户在 Google 上进行搜索时，Google 会尝试确定最优质的搜索结果。“最佳”结果取决于许多因素，包括用户的位置、语言、设备（桌面设备或手机）以及先前用过的搜索查询。例如，在用户搜索“自行车维修店”后，Google 向巴黎用户显示的答案与向香港用户显示的答案有所不同。支付费用不能提高网页在 Google 搜索结果中的排名，网页排名是完全依靠算法完成的。



## 三. 什么是字符编码？

计算机只认识0和1，但我们各个国家的人都需要在计算机上使用各自的文字，为了在计算机上也能表示、存储和处理像文字、符号等等之类的字符，就必须将这些字符转换成二进制。

于是就出现了字符编码，字符编码将我们的自然语言编码成二进制给计算机看，然后再把这些二进制解码为自然语言给我们看。



## 四. CSS编写样式的方式以及应用场景

css有三种常用的编写方式，分别是内联样式、内部样式表和外部样式表

* 内联样式的应用场景：在Vue的template中某些动态的样式会使用内联样式
* 内部样式表的应用场景：Vue开发中，每个组件都有一个style元素，使用的是内部样式表的方式，不过原理并不相同
* 外部样式表的应用场景：外部样式表是开发中最常用的方式，将所有css文件放在一个独立的文件夹中，然后通过link元素引入到需要的文件中.

* 也可以在index.css文件中通过 @import url(路径) 引入其他css样式



## 五. 最常见的CSS样式以及作用

最常见的css样式有：

* font-size：设置文字大小
* color：设置前景色(颜色)
* background-color：设置背景色
* width：设置宽度
* height：设置高度



## 六. 自行查找2个案例练习

根据之前学习的HTML元素和CSS样式找2个案例练习

* 案例一：登录案例

  * ```html
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
      <style>
        * {
          margin: 0;
          padding: 0;
        }
    
        .content {
          background-color: lightblue;
          position: absolute;
          top: 50%;
          /* left: 0; */
          width: 100%;
          height: 400px;
          margin-top: -200px;
          /* overflow: hidden; */
        }
    
        .main {
          text-align: center;
          max-width: 600px;
          height: 400px;
          padding: 100px 0;
          margin: 0 auto;
        }
    
        .main h1 {
          font-size: 80px;
          font-weight: 2px;
        }
    
        form {
          padding: 20px 0;
        }
    
        form input {
          border: 1px solid white;
          display: block;
          margin: 0px auto 10px auto;
          padding: 10px;
          width: 220px;
          border-radius: 30px;
          font-size: 20px;
          font-weight: 300;
          text-align: center;
        }
    
        form input:hover {
          background-color: lightcyan;
        }
    
        form button {
          background-color: lightgreen;
          border-radius: 10px;
          border: 0;
          width: 100px;
          height: 50px;
          padding: 5px 10px
        }
    
        form button:hover {
          background-color: lightcoral;
        }
      </style>
    </head>
    
    <body>
      <div class="content">
        <div class="main">
          <h1>Welcome</h1>
          <form>
            <input type="text" name="" id="" placeholder="请输入账号">
            <input type="password" name="" id="" placeholder="请输入密码">
            <button type="submit">登&nbsp;&nbsp;录</button>
          </form>
        </div>
      </div>
    </body>
    
    </html>
    ```

* 案例二：网页布局案例

  * ```html
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
      <style>
        * {
          margin: 0;
          padding: 0;
        }
    
        .header {
          width: 100%;
          height: 100px;
          text-align: center;
          background-color: lightblue;
        }
    
        .main {
          width: 100%;
          height: 600px;
          text-align: center;
          background-color: lightgreen;
        }
    
        .footer {
          width: 100%;
          height: 100px;
          background-color: lightcoral;
        }
      </style>
    </head>
    
    <body>
      <div class="header">
        网页头部信息
      </div>
      <div class="main">
        网页内容信息
      </div>
      <div class="footer">
        网页底部信息
      </div>
    </body>
    
    </html>
    ```



## 七.颜色的表示方式

**1.颜色关键字:**,  例如,  red, yellow 等



**2.RGB有三种表示方式：**

所有颜色都是由三原色R(red)G(green)B(blue)组成，也就是通过调整这三个颜色不同的比例组合成其他的颜色，RGB各个原色的取值是0~255。

- RGB颜色可以通过以#为前缀的十六进制字符和函数（rgb()、rgba()）标记表示。

- **方式一：十六进制符号：**#RRGGBB[AA]

- - R（红）、G（绿）、B （蓝）和A （alpha）是十六进制字符（0–9、A–F）；A是可选的。

  - - 比如，#ff0000等价于#ff0000ff；

- **方式二：十六进制符号：**#RGB[A]

- - R（红）、G（绿）、B （蓝）和A （alpha）是十六进制字符（0–9、A–F）；

  - 三位数符号（#RGB）是六位数形式（#RRGGBB）的减缩版。

  - - 比如，#f09和#ff0099表示同一颜色。

  - 四位数符号（#RGBA）是八位数形式（#RRGGBBAA）的减缩版。

  - - 比如，#0f38和#00ff3388表示相同颜色。

- **方式三：函数符：** rgb[a](R, G, B[, A])

- - R（红）、G（绿）、B （蓝）可以是<number>（数字），或者<percentage>（百分比），255相当于100%。
  - A（alpha）可以是0到1之间的数字，或者百分比，数字1相当于100%（完全不透明）。

