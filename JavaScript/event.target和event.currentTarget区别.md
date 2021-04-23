```
 1 <!DOCTYPE html>
 2 <html>
 3 <head>
 4     <title>Example</title>
 5 </head>
 6 <body>
 7     <div id="A">
 8         <div id="B">
 9         </div>
10     </div>
11 </body>
12 </html>复制代码
var a = document.getElementById('A'),
      b = document.getElementById('B');    
function handler (e) {
    console.log(e.target);
    console.log(e.currentTarget);
}
a.addEventListener('click', handler, false);复制代码
```

当点击A时：输出：

```
1 <div id="A">...<div>
2 <div id="A">...<div>复制代码
```

当点击B时：输出：

```
1 <div id="B"></div>
2 <div id="A">...</div>复制代码
```

也就是说，**currentTarget始终是监听事件者，而target是事件的真正发出者**。