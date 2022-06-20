var a = { n: 1 };
var b = a;
a.x = a = { n: 2 };
console.log(a);
console.log(b);
/**
 *
 * b,a都指向同一块地址空间，在第三行赋值过程中并不是按从右往左的方向进行赋值的，.语法的优先级会比=高，所以会先赋值，再赋值给a,所以a刚开始也是没有改变指向，a.x={n:2},所以实际上是b.x={n:2},之后a,b指向不同的对象
 */
