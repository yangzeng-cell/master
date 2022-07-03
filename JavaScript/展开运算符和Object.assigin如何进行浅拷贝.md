# 展开运算符和Object.assigin如何进行浅拷贝

```
Object.assign(traget,...source)
Object.assign只会拷贝源对象本身并且可枚举的对象，该方法会调用源对象的[[get]]和目标对象的[[set]]方法。为了将属性定义(包括可枚举属性)复制到原型，他会使用Object.getOwnPropertyDescriptor()和Object.defineProperty()
String类型和Symbol类型的属性都会被拷贝

展开运算符是将已有对象的所有可枚举属性拷贝到新构造的对象中
Object.assign() 函数会触发 setters，而展开语法则不会
```

