# 前端数字格式化指南

数字格式化操作在前端领域是十分常见的需求。但是浏览器和原生JS并没有提供太多可用的API来让我们进行操作。

因此，我们大多数时候都诉诸于自己造轮子。

下面介绍在平常工作中，针对数字进行格式化的几个方法：

# **正则表达式 （古早的做法）**

```javascript
const number = 1234567;
number.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
// 结果为：1,234,567
复制代码
```

# **Date API**

```javascript
const number = 123456.789;
number.toLocaleString();// 结果为：123,456.789

复制代码
```

# **Intl.NumberFormat (推荐使用）**

好在现在JS提供了一个更加可用和规范化的API——Intl.NumberFormat。对于常用的货币格式化都有良好的支持。

```javascript
new Intl.NumberFormat().format(123456.789);
// 显示结果为：123,456.789
复制代码
```

另外，也可以指定不同国家的货币单位：

```javascript
new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(12345.678);
// 结果显示为："￥12,346"
复制代码
```

而且该API现在的兼容性也十分良好：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bb317b121d254c86a09b9c29e53f6ff4~tplv-k3u1fbpfcp-zoom-1.image)

基本上主流的浏览器现在都已经开始支持。

现在如果你的项目有需要用到数据格式化操作的地方，就不用手动去实现该功能了。尝试让浏览器帮你去实现。

具体API的细节，可以参考：[developer.mozilla.org/en-US/docs/…](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString)