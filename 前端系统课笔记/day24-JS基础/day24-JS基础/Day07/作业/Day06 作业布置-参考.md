# Day06 作业布置

## 一. 完成课堂所有的代码

01-创建对象的方式一

```js
<script>
      // 方式一.用对象字面量或者new Object
      // 缺点:存在大量重复代码

      var obj1 = {
        age: 19,
        address: "北京",
        eat: function () {
          console.log(this.age + "太年轻");
        },
      };
      var obj2 = {
        age: 10,
        address: "上海",
        eat: function () {
          console.log(this.age + "太年轻");
        },
      };
      var obj3 = {
        age: 89,
        address: "青岛",
        eat: function () {
          console.log(this.age + "太年轻");
        },
      };
</script>
```

02-创建对象的方式二-工厂函数

```js
<script>
      // 用工厂函数创建生产对象---是一种设计模式
      // 缺点:获取不到对象最真实的类型
      function createPerson(name, address, age) {
        var obj = {};
        obj.name = name;
        obj.address = "北京";
        obj.age = 90;
        obj.sing = function () {
          console.log(obj.name + "在唱歌");
        };
        return obj;
      }
      var p1 = createPerson("张三", "北京", 90);
      var p2 = createPerson("李四", "上海", 20);
      console.log(p1);
      // object
      console.log(typeof p1);
      console.log(typeof p2);
</script>
```

03-创建对象的方式二-构造函数

```js
<script>
      // 构造函数(构造器,类)
      // new 所做的操作
      // 1.在内存中创建一个新对象 ,var moni ={}
      // 2.让moni.__proto__ = Person.prototype
      // 3.this=moni
      // 4.执行函数体
      // 5.自动return moni
      function Person(name, age, height) {
        this.name = name;
        this.age = age;
        this.height = height;
      }
      Person.prototype.sing = function () {
        console.log(this.name + "在唱歌");
      };
      var p1 = new Person("李四", 90, 188);
      var p2 = new Person("刘德华", 39, 178);
      console.log(p1, p2);
      // 获取到了对象的真实类型,比如Person,Student
      console.log(typeof p1);
      console.log(p1.__proto__ === Person.prototype);
      // 缺点: 需要给每个对象的方法开辟一块新的空间,浪费空间
      p1.sing();
</script>
```

04-构造函数的补充

```js
<script>
      // 构造函数用大驼峰,普通函数用小驼峰
      function Student(sno, sex) {
        this.sno = sno;
        this.sex = sex;
      }
      var stu1 = new Student("17179819", "男");
      // 构造函数是通过new 调用
      // 普通函数用函数名调用
</script>
```

05-全局对象

```js
<script>
      // 浏览器中存在一个全局对象GO--window
      // 作用一:查找变量时,最终会找到window
      // 作用二"  将一些浏览器提供给我们的变量/函数/对象,放在window对象上面
      // 比如:console,alert.Object,document
      // var num = 1;
      console.log(window);
      // window.alert("hhhh");

      window.num = 9;
      var num = 10;
      // 作用三: 使用var 定义的变量会默认添加到window
      var address = "哈尔滨";
      function getNum() {
        // var num = 2;
        function bar() {
          console.log(num);
          console.log(address);
        }
        bar();
      }
      getNum();
      // 变量查找顺序: 先从自己的作用域---上层作用域(函数作用域)---全局作用域---window--还找不到就报错
</script>
```

06-函数也是对象

```js
<script>
      var fun = function () {
        console.log("函数表达式");
      };
      var obj = {};
      console.log(typeof fun); //function
      console.log(typeof obj);
      function bar() {
        console.log("999");
      }
      // 因为函数也是一个对象,所以在函数上也可以添加属性
      bar.age = 90;
      function Person() {}
      // 在构造函数上添加的方法叫做类方法
      // 类方法,需要用类名调用
      Person.sing = function () {
        console.log("唱歌");
      };
      Person.sing();
</script>
```

06-原始类型调用方法

```js
<script>
      var num = 90.8999999;
      var str = "hhhhhh";
      console.log(str.length);
      num = num.toFixed(3);
      console.log(num);
      // num,str都是原始类型,但是为什么可以调用方法,因为
      // 当我们调用一个 原始类型的属性或者方法,JS引擎会根据原始值创建对应的包装类型对象
      // var str = "hhhhhh";  ---->var str = new String(str)
      // 调用对应的方法或者属性,返回新值
      // 创建的包装类型对象被销毁,str销毁
      // 类似于
      function String(str) {
        this.length = 15;
      }
      var str1 = new String(str);
      console.log(str1.length);
      // 手动创建一个包装类对象
      var num1 = new Number(111);
      var num2 = 111;
      console.log(num1 === num2);
      console.log(typeof num1); //object
      console.log(typeof num2); //number
</script>
```

07-Number

```js
<script>
      // /number---Number 数字包装类
      // window.Number
      // Number 构造函数--Number包装类对象
      // Number 类属性
      console.log(Number.MAX_VALUE);
      console.log(Number.MIN_VALUE);
      // 最大安全整数和最小安全整数
      console.log(Number.MAX_SAFE_INTEGER);
      console.log(Number.MIN_SAFE_INTEGER);
      // 实例方法
      var num = new Number(1000);
      console.log(num.toString(), num);
      console.log((123).toString());
      var num1 = 90;
      // 八进制
      console.log(num1.toString(8));
      console.log(num1.toString(16));
      // 保留几位小数,会四舍五入,返回的是字符串
      var num3 = 1.24902;
      console.log(num3.toFixed(2)); //1.25
      console.log(typeof num3.toFixed(2));
      // 类方法 ,字符串--数字
      var str = "178.2991";
      console.log(Number.parseInt(str));
      console.log(Number.parseFloat(str));
      // window.parseInt===Number.parseInt,所以可以省略Number
      console.log(window.parseInt === Number.parseInt); //true
      console.log(parseInt(str));
</script>
```

08-Math

```js
<script>
      // object,是对象,不是构造函数
      console.log(typeof Math);
      // 属性
      console.log(Math.PI);
      // 方法
      var num = 12.5082;
      console.log(Math.floor(num)); //12
      console.log(Math.ceil(num)); //13
      console.log(Math.round(num)); //13
      console.log(Math.pow(2, 3)); //2的3次方=8

      // 随机数,[0,1]
      // 需求: [15~50)的随机数

      for (var i = 0; i < 100; i++) {
        let random = Math.floor(Math.random() * 35) + 15;
        console.log(random);
      }
      // 需求: [15~50]的随机数
      for (var i = 0; i < 100; i++) {
        // [0,35]---[15,50]
        let random = Math.floor(Math.random() * 36) + 15;
        console.log(random);
      }
</script>
```

09-String

```js
<script>
      var str = "hello world";
      var str1 = new String("hello beijing");
      console.log(str1);
      // 属性--length
      console.log(str.length);
      // 操作-访问字符串的字符
      console.log(str[0]);
      console.log(str.charAt(0));
      // 找不到,
      console.log(str[27]); //undefined
      console.log(str.charAt(27)); //空字符串
      // 字符串的遍历
      for (var i = 0; i < str.length; i++) {
        console.log(str[i]);
      }
      // for..of遍历, 针对于数组,String支持
      for (var char of str) {
        console.log("字符", char);
      }
</script>
```

10-不可变性

```js
<script>
      var message = "hello world";
      message = "hhhh";
      console.log(message);
      // 字符串在定义后是不可变的,修改字符串--之前的字符串内部修改掉
      message[2] = "i";
      console.log(message); //没有变
      var str = "niHHaoaaa";
      // 转大写
      console.log(str.toUpperCase());
      // 转小写
      console.log(str.toLowerCase());
</script>
```

11-查找字符串

```js
<script>
      // 查找字符串位置indexOf
      var str = "huahuazainali";
      console.log(str.indexOf("i")); //8
      // 从索引10,包括10后找
      console.log(str.indexOf("i", 12));
      var name = "1zai";
      // 找不到返回-1
      console.log(str.indexOf(name));
      if (str.indexOf(name) !== -1) {
        // 找到了
        console.log("找到了");
      } else {
        console.log("没找到");
      }
      // 2.是否包含字符串,includes
      var message = "coderwhy 在广州";
      var info = "在广州";
      console.log(message.includes(info));
      // 从后往前找
      console.log(message.lastIndexOf(info)); //true
</script>
```

12-开头和结尾

```js
<script>
      //判断 以..开头,startsWith
      var str = "hello world";
      // 从索引2开始,是否以..开头
      console.log(str.startsWith("he", 2));
      // 是否以...结尾,在length以内
      console.log(str.endsWith("ld", 20));
      //替换字符串
      console.log(str.replace("world", "hhh"));
      console.log(str);
      // 也可以用函数
      var str1 = str.replace("world", function () {
        var message = "wusuowei";
        return message.toUpperCase();
      });
      console.log(str1);
 </script>
```

13-获取子字符串

```js
<script>
      var str = "hello world";
      // slice(start,end) 字符串截取,允许负值
      console.log(str.slice(1, 3));
      console.log(str.slice(5, -1));
      // 不写end,默认到最后
      console.log(str.slice(2));
      //substring(start,end) ,不支持负值
      console.log(str.substring(1, 3));
      //substr(start,length),长度
      console.log(str.substr(2, 6));
      console.log(str.substr(-3, 2)); //rl
</script>
```

14-字符串拼接

```js
<script>
      // 字符串拼接
      var str = "hello world";
      var message = "你好";
      console.log(str + message);
      // concat拼接字符串,可以链式调用
      var str1 = str.concat(message, "abc", "eee").concat("ddd");
      console.log(str1);
      // trim() 删除首尾空格
      console.log("   123abc  ".trim());
      // split(分隔符,limit)  字符串--数组
      var str2 = "你好-李焕英-贾玲-ABC-ooo";
      console.log(str2.split("-", 2)); //['你好', '李焕英']
      var arr = str2.split("-");
      console.log(arr);
      // 数组--字符串
      var info = arr.join("%");
      console.log(info);
</script>
```

15-创建数组的方式

```js
<script>
      // 1.数组字面量
      var arr = [1, 2, 3, 4, 5];
      // 2.new Array
      var arr1 = new Array("abc", 2, 3, 4);
      console.log(arr, arr1);
      // 传入一个参数,表述数组长度
      var arr2 = new Array(5);
      console.log(arr2);
      console.log(arr2[3]);
      console.log(arr[0]);
      // 数组最后一个元素
      console.log(arr[arr.length - 1]);
</script>
```

16-数组的基本操作

```js
<script>
      // 访问
      var arr = [1, 2, 3, 4, 5];
      console.log(arr[2]);
      console.log(arr.at(2));
      // 从尾部向前数
      console.log(arr.at(-2)); //4
      // 修改
      arr[2] = "nihao";
      //添加 ,不建议
      arr[5] = "hello";
      //删除,不建议
      delete arr[0];
      console.log(arr);
 </script>
```

17-数组的添加删除方法

```js
<script>
      var arr = [1, 2, 3, 4, 5];
      // 从尾部添加删除元素,pop,push
      arr.push("abc", "ddd", "eee");
      console.log(arr);
      // pop尾部删除一个,返回被删除的元素
      var val = arr.pop();
      console.log(val);
      // 从首部添加删除元素,unshift --首端添加, shift--尾部删除
      var arr1 = [1, 2, 3, 4, 5];
      arr1.unshift("张三", "李四");
      console.log(arr1);
      var str = arr1.shift();
      console.log(str);
</script>
```

18-splice方法

```js
<script>
      // arr.splice(start,deletecout,[...item]) ,添加删除替换元素
      var arr = [0, 1, 2, 3, 4, 5];
      //start:从什么索引开始
      // deletecount:删除个数
      // 1.删除元素
      // 返回被删除元素的数组
      console.log(arr.splice(1, 2));
      console.log(arr);
      //2.增加元素,deletecount为0
      var arr1 = [0, 1, 2, 3, 4, 5];
      console.log(arr1.splice(1, 0, "张三", "李四"));
      console.log(arr1);
      //3.替换
      var arr2 = [0, 1, 2, 3, 4, 5];
      console.log(arr2.splice(1, 2, "张三", "李四")); //[1, 2]
      console.log(arr2); //[0, '张三', '李四', 3, 4, 5]
</script>
```



## 二. 整理new操作背后的原理

1) new 操作的原理

* 在内存中创建一个空对象  ----比如var moni={}
* 将构造函数的显示原型赋值给这个对象的隐式原型   ----moni.__proto__=Person.prototype
* this指向创建出来的新对象  ---this=moni
* 执行函数体代码
* 如果构造函数没有返回非空对象,那自动返回创建出来的新对象    ---return moni

2) 全局对象的作用  

* 查找变量时,最终会找到window
* 将浏览器全局提供给我们的变量/函数/对象 ,放在window对象上面  ,比如alert,console等
* 使用var 定义的变量会添加到window上

3) 函数也是对象



## 三. 整理Number、Math的常见操作

Number类的操作

* 类属性
  * Number.MAX_SAFE_INTEGER      最大安全整数
  * Number.MIN_SAFE_INTEGER       最小安全整数
* 实例方法
  * toString(base)，将数字转成字符串，并且按照base进制进行转化
  * toFixed(digits)，格式化一个数字，保留digits位的小数,会四舍五入
* 类方法
  * Number.parseInt(string[, radix])，将字符串解析成整数，也有对应的全局方法parseInt；
  * Number. parseFloat(string)，将字符串解析成浮点数，也有对应的全局方法parseFloat；

Math的常见操作

* 属性
  * Math.PI：圆周率

* 常见的方法
  *  Math.floor：向下舍入取整
  *  Math.ceil：向上舍入取整
  * Math.round：四舍五入取整
  * Math.random：生成0~1的随机数（包含0，不包含1）
  * Math.pow(x, y)：返回x的y次幂
* 公式: [a,b)的随机数
  * y=a,x=b-a, Math.floor(Math.random() * x) + y

## 四. 整理String的常见操作

* 创建方式 new String()
* 属性   
  * length  ---获取字符串的长度
* 访问其中元素
  * [0]
  * charAt(0)
* 遍历
  * 普通的for循环
  * for..of方式
    * 可迭代对象
    * 字符串/数组
* 字符串不可变性
* 实例方法:
  * toUpperCase()    将所有的字符转成大写；
  * toLowerCase()    将所有的字符转成小写；
  * indexOf         查找字符串位置
  * includes     是否包含字符串
  * startsWith      判断是否以xxx开头
  * endsWith     判断是否以xxx结尾
  * repace    替换字符串
  * slice/substring/substr     获取子字符串
  * concat    字符串拼接
  * trim   去除首尾空格
  * split         字符串分割,字符串--->数组
    * join    数组-->字符串



## 五. 整理Array的常见操作

* 创建数组
  * []       数组字面量
  * new Array()
    * 传1个数组,表示数组的长度
* 数组基本操作
  * 获取元素
    * [0]
    * at(0)
  * 修改元素
    * `arr[1] = "fff"`
  * 新增
    * `arr[5]="123"`
  * 删除
    * `delete arr[0]`

* 在数组的尾部:
  * push   尾部添加
  * pop    删除尾部的最后一个元素,返回被删除的元素
* 在数组首部
  * unshift   首部添加
  * shift   删除首部的第一个元素,返回被删除的元素
* 利器
  * splice   在任何位置添加/删除/替换元素
    * start     从什么位置开始操作元素
    * deleteCount     删除元素的个数
      * 2     删除2个
      * 0    添加元素
    * item1/item2   添加或者替换的元素



























