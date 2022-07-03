1. vue2的源码使用Flow进行类型检测的，vue3使用Typescript进行重构，比vue2更好的对typescript进行支持。
2. vue3中使用Proxy来实现对数据劫持，vue2中使用Object.defineProperty来劫持数据的getter和setter方法的，这这种方式存在缺点就是在给对象添加和删除属性的时候，是无法劫持和监听的。所以必须使用$set和$delete方法。
3. vue3删除了$set和$off,$once.移除了filter,内敛模板等特性
4. 在编译方面做了优化：生成Block tree,Slot编译优化，diff算法优
5. vue3中已经去掉了事件总线，可以使用mitt
6. vue3中增加了componsition API 
7. vue3中移除了$children

