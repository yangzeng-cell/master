# Day07 作业布置

## 一. 完成课堂所有的代码

已完成

## 二. 自己查一个列表并且完成

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      table {
        text-align: center;
        border-collapse: collapse;
      }

      table tr:first-child {
        font-weight: 700;
        font-size: 24px;
      }
      table tr:first-child td {
        padding: 20px 0;
      }

      td {
        width: 140px;
        height: 30px;
      }
      table tr:nth-child(n + 3) {
        background-color: rgb(222, 225, 226);
      }
      table tr:nth-child(2n) {
        background-color: rgb(141, 155, 165);
      }

      table tr:nth-child(2) {
        color: #fff;
        background-color: rgb(38, 145, 221);
      }
    </style>
  </head>
  <body>
    <table>
      <tr>
        <td colspan="6">场内股票ETF涨幅榜</td>
      </tr>
      <tr>
        <td>序</td>
        <td>代码</td>
        <td>基金场内简称</td>
        <td>涨跌幅(%)</td>
        <td>场内申赎份额</td>
        <td>成交额(万元)</td>
      </tr>
      <tr>
        <td>1</td>
        <td>517960.SH</td>
        <td>AHETF</td>
        <td>5.81</td>
        <td>0</td>
        <td>680</td>
      </tr>

      <tr>
        <td>2</td>
        <td>517960.SH</td>
        <td>AHETF</td>
        <td>5.81</td>
        <td>0</td>
        <td>680</td>
      </tr>
      <tr>
        <td>3</td>
        <td>517960.SH</td>
        <td>AHETF</td>
        <td>5.81</td>
        <td>0</td>
        <td>680</td>
      </tr>
      <tr>
        <td>4</td>
        <td>517960.SH</td>
        <td>AHETF</td>
        <td>5.81</td>
        <td>0</td>
        <td>680</td>
      </tr>
      <tr>
        <td>5</td>
        <td>517960.SH</td>
        <td>AHETF</td>
        <td>5.81</td>
        <td>0</td>
        <td>680</td>
      </tr>
    </table>
  </body>
</html>

```



## 三. 完成table的作业内容

![作业](https://tva1.sinaimg.cn/large/e6c9d24egy1h0vps9hqn6j21cb0j0di4.jpg)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      p {
        margin: 0;
        padding: 0;
      }
      table {
        text-align: center;
        border-collapse: collapse;
      }

      table tr:nth-child(1) td {
        padding: 10px 0;
        font-size: 24px;
        font-weight: 700;
      }

      table tr:nth-of-type(2n + 2) {
        background-color: rgb(239, 219, 223);
      }

      table tr:nth-of-type(2n + 3) {
        background-color: rgb(235, 183, 193);
      }

      table tr:nth-child(2) {
        font-weight: 700;
      }

      table tr:nth-child(n + 3) td:nth-of-type(4) {
        color: red;
      }

      table td > input {
        padding: 10px;
        font-size: 14px;
        color: #fff;
        background-color: rgb(240, 72, 72);
        border-radius: 13px;
        border: 0;
      }
      td {
        width: 140px;
        height: 60px;
      }
    </style>
  </head>
  <body>
    <table>
      <tr>
        <td colspan="5">影院电影放映列表</td>
      </tr>
      <tr>
        <td>放映时间</td>
        <td>语言版本</td>
        <td>放映厅</td>
        <td>售价(元)</td>
        <td>选座购票</td>
      </tr>
      <tr>
        <td>
          <p>13:15</p>
          <p>15:00散场</p>
        </td>
        <td>国语三D</td>
        <td>2号厅</td>
        <td class="price">￥48.5</td>
        <td>
          <input type="button" value="选座购票" />
        </td>
      </tr>
      <tr>
        <td>
          <p>13:15</p>
          <p>15:00散场</p>
        </td>
        <td>国语三D</td>
        <td>2号厅</td>
        <td>￥48.5</td>
        <td>
          <input type="button" value="选座购票" />
        </td>
      </tr>
      <tr>
        <td>
          <p>13:15</p>
          <p>15:00散场</p>
        </td>
        <td>国语三D</td>
        <td>2号厅</td>
        <td>￥48.5</td>
        <td>
          <input type="button" value="选座购票" />
        </td>
      </tr>
      <tr>
        <td>
          <p>13:15</p>
          <p>15:00散场</p>
        </td>
        <td>国语三D</td>
        <td>2号厅</td>
        <td>￥48.5</td>
        <td>
          <input type="button" value="选座购票" />
        </td>
      </tr>
      <tr>
        <td>
          <p>13:15</p>
          <p>15:00散场</p>
        </td>
        <td>国语三D</td>
        <td>2号厅</td>
        <td>￥48.5</td>
        <td>
          <input type="button" value="选座购票" />
        </td>
      </tr>
    </table>
  </body>
</html>

```



## 四. 说出表单元素什么情况下使用name和value？

- name元素的作用是后台接收数据时使用的键值对中的键(key) 随着表单的提交而一起提交 表单中不可或缺的元素 一个form表单中该元素的名称对应不同类型的input是不同的
- value是 后台接收数据时使用的键值对中的值(value) value可以有默认值



## 五. 说出form提交时的属性作用

* action
  * 处理表单提交的URL 一般项目中填写的是用于表单提交时对应的文件路径名 
* method
  * 用于提交方法是get(默认方法)还是post或是其他方法
* target
  * 在当前页面跳转 还是新开页面进行跳转链接有四个值
    * _blank 新开页面
    * _self 当前页面跳转
    * _parent 当前父级页面跳转
    * _top 当前顶层页面跳转







