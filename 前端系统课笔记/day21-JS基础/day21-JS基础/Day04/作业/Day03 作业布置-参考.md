# Day03 作业布置

## 一. 完成课堂所有的代码

已完成



## 二. 逻辑与&&和逻辑或||的本质(了解)

逻辑与:也叫作短路与

* 从左往右,依次计算
* 当计算第一个运算元,先隐式转换为Boolean值进行比较
  * true ,继续下一个比较
  * false ,直接返回该运算元的初始值
* 如果找到最后也没有找到,就返回最后一个运算元

逻辑或:也叫做短路或

* 从左往右,依次计算
* 当计算第一个运算元,先隐式转换为Boolean值进行比较
  * true ,直接返回该运算元的初始值
  * false ,继续下一个比较
* 如果找到最后也没有找到,就返回最后一个运算元



## 三. 举两个if..else if..else的案例

案例一:  大家都知道，男大婚，女大当嫁。那么女方家长要嫁女儿，当然要提出一定的条件:高:180cm以上;富:1000万以上;帅:500以上;
       如果这三个条件同时满足,则:“我一定要嫁给他”，如果三个条件有为真的情况，则:‘嫁吧,比上不足,比下有余，如果三个条件都不满足,则:“不嫁!‘

```js
<script>
      var height = Number(prompt("你的身高有多少cm"));
      var money = Number(prompt("你的存款有多少万"));
      var faceScore = Number(prompt("你认为你的颜值多少分"));
      if (height > 180 && money > 1000 && faceScore > 500) {
        alert("我一定要嫁给他");
      } else if (height > 180 || money > 1000 || faceScore > 500) {
        alert("嫁吧,比上不足,比下有余");
      } else {
        alert("不嫁");
      }
 </script>
```

案例二: *某公司根据工作年限发放年终奖，工龄2年以内 ，年终奖为1个月工资工龄3年-5年以内，年终奖为1.5倍工资;工龄5年以上，年终奖为2.5倍工资*

```js
 <script>
      // 5.某公司根据工作年限发放年终奖，工龄2年以内 ，年终奖为1个月工资工龄3年-5年以内，年终奖为1.5倍工资;工龄5年以上，年终奖为2.5倍工资
      var year = Number(prompt("请输入你的工龄"));
      var salary = 3000;
      var yearBonus = 0;
      if (year > 5) {
        yearBonus = 2.5 * salary;
      } else if (year >= 3) {
        yearBonus = 1.5 * salary;
      } else {
        yearBonus = salary;
      }
      alert("年终奖:" + yearBonus);
    </script>
```



## 四. 举一个switch使用场景的案例

*使用JS完成一个简单的计算器功能。实现2个输入框中输入整数后，点击第三个输入框能给出2个整数的加减乘除。*

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .secLable {
        margin: 0 20px;
      }
      .secLable select {
        padding: 0 10px;
      }
      .btn {
        padding: 0 10px;
        margin: 0 10px;
      }
    </style>
  </head>
  <body>
    <label for="num1">
      第一个计算数
      <input type="text" id="num1" />
    </label>
    <label for="oper" class="secLable">
      运算符
      <select name="oper" id="oper">
        <option value="add" selected>+</option>
        <option value="subtract">-</option>
        <option value="mult">*</option>
        <option value="divide">/</option>
      </select>
    </label>
    <label for="num2">
      第二个计算数
      <input type="text" id="num2" />
    </label>
    <button class="btn">=</button>
    <input type="text" placeholder="计算结果" class="result" />
    <script>
      // 使用JS完成一个简单的计算器功能。实现2个输入框中输入整数后，点击第三个输入框能给出2个整数的加减乘除。
      var btn = document.querySelector("button");
      var num1Ele = document.querySelector("#num1");
      var num2Ele = document.querySelector("#num2");
      var operEle = document.querySelector("#oper");
      var result = document.querySelector(".result");
      btn.addEventListener("click", function () {
        var num1 = Number(num1Ele.value);
        var num2 = Number(num2Ele.value);
        var oper = operEle.value;
        var totalResult = 0;
        console.log(num1, num2, oper);
        switch (oper) {
          case "add":
            totalResult = num1 + num2;
            break;
          case "subtract":
            totalResult = num1 - num2;
            break;
          case "mult":
            totalResult = num1 * num2;
            break;
          case "divide":
            totalResult = num2 ? num1 / num2 : "除数不能为0";
            break;
        }
        result.value = totalResult;
      });
    </script>
  </body>
</html>

```



## 五. 思考for循环平时的应用场景

比如:腾讯课堂 这列表中的每一个li.item 可以用for循环

比如这个每一个训练营,也可以用for循环





