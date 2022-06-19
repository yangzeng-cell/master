## GET 和 POST 的区别



- GET在浏览器回退时是无害的，而POST会再次提交请求
- GET请求会被浏览器主动缓存，而POST不会，除非手动设置
- GET请求参数会被完整保留在浏览器的历史记录里，而POST中的参数不会被保留
- GET请求在URL中传送的参数是有长度限制的，而POST没有限制
- GET参数通过URL传递，POST放在Request body中
- GET请求只能进行 url 编码，而POST支持多种编码方式
- GET产生的URL地址可以被收藏，而POST不可以
- 对参数的数据类型，GET只接受ASCII字符，而POST没有限制
- GET比POST更不安全，因为参数直接暴露在URL上，所以不能用来传递敏感信息

**总结**

- ```
  get
  ```

  : 缓存、请求长度受限、会被历史保存记录

  - 无副作用(不修改资源)，幂等(请求次数与资源无关)的场景

- `post`: 安全、大数据、更多编码类型

![img](D:\memo\JavaScript\img\114.png)

