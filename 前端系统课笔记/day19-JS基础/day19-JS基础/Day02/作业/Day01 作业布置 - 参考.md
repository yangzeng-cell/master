# Day01 作业布置

## 一. 完成课堂所有的代码

## 二. 简单聊聊 JavaScript 的历史
1.  1994 年，网景公司发布 Navigator 浏览器 0.9 版本
    1.  发布时，Navigator 浏览器还不能有与用户的交互效果
    2.  网景公司急需希望选定一门语言作为浏览器的脚本语言
2.  同年，网景公司招聘了 Brendan Eich，希望帮助选定一门脚本语言
    1.  最开始是选定 Scheme 语言作为浏览器的脚本语言
3.  1995 年，Sun 公司将 Oak 语言改名为 Java 正式向市场推出
    1.  轰动一时
    2.  Java 的口号非常吸引人"Write once Run anywhere"
    3.  网景公司因此希望与 Sun 合作，希望将 Java 嵌入到网页中，作为浏览器的脚本语言
    4.  这时，Brendan Eich 还是坚持选择 Scheme，而公司高层则希望简化 Java 作为脚本语言
4.  Brendan Eich 用 10 天时间设计出 JavaScript，网景公司正式使用 JavaScript 作为 Navigator 的脚本语言
    1.  最初命名为 Mocha
    2.  Navigator 2.0 beta 更名为 LIveScript
    3.  Navigator 2.0 beta3 正式命名为 JavaSript（一说为蹭 Java 的热度）

## 三. 说说你对 JS 引擎的理解
- JavaSript 是一门解释型语言
- JS 引擎是 JavaScript 语言的运行解释器
    - 浏览器内核中有两种引擎，其中一种就是 JS 引擎
        - **排版引擎**
            - 负责 HTML 和 CSS 解析和排版
        - **JS 引擎**
            - 负责解析和运行 JavaScript 语句
- 常见 JS 引擎有
    - SpiderMonkey -> 第一款 JavaScript 引擎，Brendan Eich 开发
    - Chakra -> 微软开发
    - WebKit -> JavaScriptCore -> APPLE 开发
    - Chrome -> V8 -> GOOGLE 开发
    - 小程序 -> JSCore -> 腾讯开发

## 四. JavaScript 的交互方式有哪些？
1.  弹窗输出 `alert("Hello World!")`
2.  控制台输出 `console.log("Hello World!")`
3.  文档输出 `document.write("Hello World!")`
4.  弹出输入框输入 `prompt("Please write some words!")`
```js
// alert() 函数
alert("Hello World!")

// console.log() 函数
console.log("Hello World!")

// document.write() 函数
document.write("Hello World!")

// prompt() 函数
prompt()
prompt("Notification")
// 变量赋值时使用 prompt()函数
var variable = prompt("Notification")

```

## 五. 定义一些你日常生活或者在某些程序中见到的变量
```js
var rentHouseDays = 60 // 租房子的天数

var learnFrontendDays = 30 // 学习前端的日子

var fightingCapacity = 1566 // 战斗力数值

var userName = "VIVI" // 用户名
```

## 六. 说出 JavaScript 中的常见数据类型以及它们代表的含义
- Number -> 代表数据类型是数值
    - 整数
    - 浮点
    - 数组
- String -> 代表字符串类型 -> 通常是一段文本
- boolean -> 布尔类型
    - true
    - false
- NULL -> 空值
- undefined -> 变量未定义
- Object -> 对象类型
- BigInt -> 大整数类型
- Symbol -> 符号类型