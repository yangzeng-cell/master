# SessionStorage

```javascript
sessionStorage和localStorage都有的属性和方法是:
clear()
getItem(name)
key(index)
removeItem(name)
setItem(name,value)
还可以使用length属性来判断有多少个值存放在Storage对象中



sessionStorage会存储数值直到浏览器关闭，存储在sessionStorage中的数据可以跨越页面刷新而存在，同时也支持在浏览器崩溃之后重启仍然存在
sessionStorage可以使用setItem()来存储数据，
也可以使用属性来存储数据，sessionStorage.book="-----"


sessionStorage如果有数据的话，可以使用getItem()或者通过直接访问属性名来获取数据。
var name=sessionStorage.getItem("name")
var book=sessionStorage.book

还可以通过结合length属性和key()方法来迭代sessionStorage中的值
for(var i=0,len=sessionStorage.length;i<len;i++){
    var key=sessionStorage(i)
    var value=sessionStorage.getItem(key)
    console.log(value)
}


也可以通过forin来遍历sessionStorage的值
for(var key in sessionStorage){
    var value=sessionStorage.getItem(key)
    console.log(value)
}


```

