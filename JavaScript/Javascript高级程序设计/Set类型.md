```
使用 new 关键字和 Set 构造函数可以创建一个空集合：
const m = new Set(); 
如果想在创建的同时初始化实例，则可以给 Set 构造函数传入一个可迭代对象，其中需要包含插入
到新集合实例中的元素：
// 使用数组初始化集合 
const s1 = new Set(["val1", "val2", "val3"]); 
alert(s1.size); // 3 
// 使用自定义迭代器初始化集合
const s2=new Set({
	*[symbol.iterator](){
		yield "value1";
		yield "value2";
		yield "value3";
	}
})
alert(s2.size); // 3 


const s = new Set(["val1", "val2", "val3"]); 
alert(s.values === s[Symbol.iterator]); // true
```

