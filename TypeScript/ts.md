1.在定义一个变量时，基本数据类型可以用类型推断，不用定义类型

```
let msg = "hello there!";
```

2.ts的常用的数据类型

```
string,number,boolean,arrays,any,function,object,union type,Type Aliases,Interfaces，Type Assertions，bigint，symbol,Type Assertions,.Literal Types,Enums ,null,undefined,any,unknown,void,never ,Tuple
```

3.interface和type aliases的区别

```
实现继承的方式不同
interface Animal {
  name: string
}

interface Bear extends Animal {
  honey: boolean
}
type Animal = {
  name: string
}

type Bear = Animal & { 
  honey: boolean 
}

添加新的字段
interface Window {
  title: string
}

interface Window {
  ts: TypeScriptAPI
}
类型别名不能够修改已经创建的字段
type Window = {
  title: string
}

type Window = {
  ts: TypeScriptAPI
}

 // Error: Duplicate identifier 'Window'.
const src = 'const a = "Hello World"';
window.ts.transpileModule(src, {});
接口只能声明对象，不能够重命名原语
类型别名不能够声明合并，但是接口可以

如果是定义非对象类型，通常推荐使用type
如果是定义对象类型，那么他们是有区别的：
interface 可以重复的对某个接口来定义属性和方法；
而type定义的是别名，别名是不能重复的
```

4.Type Assertions类型断言

```
TypeScript 只允许类型断言转换为更具体或更不具体的类型版本，而不可以转成没有关系的类型

const a = (expr as any) as T;  可以将两种不相关的类型进行转换时，要进行两次断言，先断雁城any或者unknown
```

5.Literal Types 文本类型

```
const constantString = "Hello World";//使用const定义的常量类型

function printText(s: string, alignment: "left" | "right" | "center") {
  // ...
}

您可以使用 as const 将整个对象转换为类型文字：
const req = { url: "https://example.com", method: "GET" } as const;
handleRequest(req.url, req.method);
```

.Enums 枚举

7.ts的运行环境

```
方式一：tsc math.ts   node math.js  这种方式会比较麻烦
方式二：webpack中配置本地的运行环境  使用ts-loader
方式三：使用ts-node
npm install ts-node -g
npm install tslib @types/node -g
ts-node math.ts
```

8.unkonwn类型和any类型的区别

任何类型都可以是any类型,ts不会对any类型的变量进行类型检测，任何类型也是可以赋值给unknown,但是使用这个变量必须进行类型检查，否则就会报错

![](C:\Users\10152\Desktop\study\memo\TypeScript\img\QQ截图20220715095600.png)

9.Tuple类型(元组)

元组类型就是不同类型的数组的集合

![](C:\Users\10152\Desktop\study\memo\TypeScript\img\QQ截图20220715101013.png)

10.Never类型

##### Never类型指永不存在的类型。 例如，never 类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型

11.函数参数

![](C:\Users\10152\Desktop\study\memo\TypeScript\img\QQ截图20220715111132.png)

12. 匿名函数的参数类型

    ![](C:\Users\10152\Desktop\study\memo\TypeScript\img\QQ截图20220715111344.png)

13.函数参数的对象类型

![](C:\Users\10152\Desktop\study\memo\TypeScript\img\QQ截图20220715112229.png)

14.函数参数对象可选参数

![](C:\Users\10152\Desktop\study\memo\TypeScript\img\QQ截图20220715112745.png)

15.联合类型

![](C:\Users\10152\Desktop\study\memo\TypeScript\img\QQ截图20220715114922.png)

16.一个参数一个可选类型的时候, 它其实类似于是这个参数是 类型|undefined 的联合类型

17.非空类型断言!

![](C:\Users\10152\Desktop\study\memo\TypeScript\img\QQ截图20220715142334.png)

18.可选链操作

![](C:\Users\10152\Desktop\study\memo\TypeScript\img\QQ截图20220715151237.png)

19.!!运算符

可以将其他数据类型转换成boolean

20.??操作符  空值合并操作符

```
const messgae1 = "1111";
const content = messgae1 ?? "你好";
如果message1是null或者undefined,content就会使用后面的值，message是空字符串不生效
```

21.类型缩小  Type Narrowing

类型缩小就是将例如联合类型进行精确到具体的类型

常见的类型保护有

typeof

===，！==

instanceof

in

.....

![](C:\Users\10152\Desktop\study\memo\TypeScript\img\QQ截图20220716003305.png)

![QQ截图20220716003335](C:\Users\10152\Desktop\study\memo\TypeScript\img\QQ截图20220716003335.png)

![QQ截图20220716003417](C:\Users\10152\Desktop\study\memo\TypeScript\img\QQ截图20220716003417.png)

![QQ截图20220716003433](C:\Users\10152\Desktop\study\memo\TypeScript\img\QQ截图20220716003433.png)

![QQ截图20220716003446](C:\Users\10152\Desktop\study\memo\TypeScript\img\QQ截图20220716003446.png)

22.函数类型定义

![](C:\Users\10152\Desktop\study\memo\TypeScript\img\QQ截图20220716005723.png)

23.参数的可选类型

![](C:\Users\10152\Desktop\study\memo\TypeScript\img\QQ截图20220716010100.png)

24.参数的默认值

![](C:\Users\10152\Desktop\study\memo\TypeScript\img\QQ截图20220716010410.png)

25.剩余参数

![](C:\Users\10152\Desktop\study\memo\TypeScript\img\QQ截图20220716010712.png)

26.指定this的绑定

![](C:\Users\10152\Desktop\study\memo\TypeScript\img\QQ截图20220716013413.png)

27.函数的重载

通过联合类型的有两个缺点：

​	1.需要进行很多类型逻辑判断

​	2.返回值类型不能判定

![](C:\Users\10152\Desktop\study\memo\TypeScript\img\QQ截图20220716114358.png)

![](C:\Users\10152\Desktop\study\memo\TypeScript\img\QQ截图20220716122340.png)

27.类的定义

![](C:\Users\10152\Desktop\study\memo\TypeScript\img\QQ截图20220716131419.png)

28.类的继承

![](C:\Users\10152\Desktop\study\memo\TypeScript\img\QQ截图20220716133015.png)

29.类的多态

![](C:\Users\10152\Desktop\study\memo\TypeScript\img\QQ截图20220716133632.png)

30.类的成员修饰符

private 修饰的属性和方法只能在该类内部使用

protected修饰的属性和方法只能在类本身及其子类内部使用

public是默认的成员修饰符，可以在外部，类，子类使用

![](C:\Users\10152\Desktop\study\memo\TypeScript\img\QQ截图20220716141707.png)

31.readonly修饰符

![](C:\Users\10152\Desktop\study\memo\TypeScript\img\QQ截图20220716150521.png)

32.访问器setter/getter

![](C:\Users\10152\Desktop\study\memo\TypeScript\img\QQ截图20220716151033.png)

33.类的静态成员

![](C:\Users\10152\Desktop\study\memo\TypeScript\img\QQ截图20220716151413.png)

34.抽象类abstract

什么是 抽象方法? 在TypeScript中没有具体实现的方法(没有方法体)，就是抽象方法

抽象方法，必须存在于抽象类中

抽象类是使用abstract声明的类

![](C:\Users\10152\Desktop\study\memo\TypeScript\img\QQ截图20220716155444.png)

35.类本身也可以作为另外一变量的类型

36.接口的声明

​	![](C:\Users\10152\Desktop\study\memo\TypeScript\img\QQ截图20220716162900.png)

37.接口的索引类型

![](C:\Users\10152\Desktop\study\memo\TypeScript\img\QQ截图20220716162953.png)

38.函数类型

interface也可以定义函数，建议使用类型别名列定义函数

![](C:\Users\10152\Desktop\study\memo\TypeScript\img\QQ截图20220716163304.png)

39.接口的继承

![](C:\Users\10152\Desktop\study\memo\TypeScript\img\QQ截图20220716163652.png)

![](C:\Users\10152\Desktop\study\memo\TypeScript\img\QQ截图20220716164637.png)

40.交叉类型

![](C:\Users\10152\Desktop\study\memo\TypeScript\img\QQ截图20220716165724.png)

41.字面量赋值

![](C:\Users\10152\Desktop\study\memo\TypeScript\img\QQ截图20220716171024.png)

![QQ截图20220716171033](C:\Users\10152\Desktop\study\memo\TypeScript\img\QQ截图20220716171033.png)

42.枚举类型

枚举其实就是将一组可能出现的值，一个个列举出来，定义在一个类型中，这个类型就是枚举类型； p枚举允许开发者定义一组命名常量，常量可以是数字、字符串类型

![](C:\Users\10152\Desktop\study\memo\TypeScript\img\QQ截图20220716172406.png)

![QQ截图20220716172417](C:\Users\10152\Desktop\study\memo\TypeScript\img\QQ截图20220716172417.png)

43.泛型

![](C:\Users\10152\Desktop\study\memo\TypeScript\img\QQ截图20220717020140.png)

![](C:\Users\10152\Desktop\study\memo\TypeScript\img\QQ截图20220717020346.png)

44.泛型接口的定义

![](C:\Users\10152\Desktop\study\memo\TypeScript\img\QQ截图20220717020609.png)

45.泛型作为类

![](C:\Users\10152\Desktop\study\memo\TypeScript\img\QQ截图20220717092242.png)

46.泛型约束

![](C:\Users\10152\Desktop\study\memo\TypeScript\img\QQ截图20220717092443.png)

47.namespace

namespace会形成独立的空间，里面的内容需要使用export，外部才可以使用，否则外部无法访问

![](C:\Users\10152\Desktop\study\memo\TypeScript\img\QQ截图20220717174941.png)

![QQ截图20220717175005](C:\Users\10152\Desktop\study\memo\TypeScript\img\QQ截图20220717175005.png)

48.命名空间的拆分

可以将命名空间的内容拆分到多个文件中

49..d.ts文件  类型声明文件

它仅仅用来做类型检测，告知typescript我们有哪 些类型

那么typescript会在哪里查找我们的类型声明呢？

内置类型声明； 

外部定义类型声明； 

自己定义类型声明；

类型声明文件主要适用于外部类库，例如引入的npm包没有做类型声明，则需要自己写类型声明文件

50.内置类型声明

内置类型声明是typescript自带的、帮助我们内置了JavaScript运行时的一些标准化API的声明文件。包括比如Math、Date等内置类型，也包括DOM API，比如Window、Document等； 内置类型声明通常在我们安装typescript的环境中会带有的；

51.外部定义类型声明和自定义声明

外部类型声明通常是我们使用一些库（比如第三方库）时，需要的一些类型声明

这些库通常有两种类型声明方式： 

 方式一：在自己库中进行类型声明（编写.d.ts文件），比如axios 

方式二：通过社区的一个公有库DefinitelyTyped存放类型声明文件 

该库的GitHub地址：https://github.com/DefinitelyTyped/DefinitelyTyped/ 

该库查找声明安装方式的地址：https://www.typescriptlang.org/dt/search?search= 

比如我们安装react的类型声明： npm i @types/react --save-dev 

 什么情况下需要自己来定义声明文件呢？ 

情况一：我们使用的第三方库是一个纯的JavaScript库，没有对应的声明文件；比如lodash 

情况二：我们给自己的代码中声明一些类型，方便在其他地方直接进行使用；

52.tsconfig.js文件
