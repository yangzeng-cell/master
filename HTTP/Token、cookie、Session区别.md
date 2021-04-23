### Cookie 和 session 的区别

> HTTP 是一个无状态协议，因此 Cookie 的最大的作用就是存储 sessionId 用来唯一标识用 户。

- `cookie` 数据存放在客户的浏览器上，session 数据放在服务器上
- `cookie` 不是很安全，别人可以分析存放在本地的 COOKIE 并进行 COOKIE 欺骗 考虑到安全应当使用 session
- `session` 会在一定时间内保存在服务器上。当访问增多，会比较占用你服务器的性能 考虑到减轻服务器性能方面，应当使用 `COOKIE`
- 单个 `cookie` 保存的数据不能超过 `4K`，很多浏览器都限制一个站点最多保存 20 个 `cookie`

### [#](http://interview.poetries.top/excellent-docs/14-HTTP模块.html#_8-2-cookie-和-token-都存放在-header-中-为什么不会劫持-token)8.2 cookie 和 token 都存放在 header 中，为什么不会劫持 token？

- 攻击者通过 xss 拿到用户的 cookie 然后就可以伪造 cookie 了
- 或者通过 csrf 在同个浏览器下面通过浏览器会自动带上 cookie 的特性在通过 用户网站-攻击者网站-攻击者请求用户网站的方式 浏览器会自动带上cookie
- 但是 token。不会被浏览器带上 问题 2 解决
- token 是放在 jwt 里面下发给客户端的 而且不一定存储在哪里 不能通过document.cookie 直接拿到，通过 jwt+ip 的方式 可以防止 被劫持 即使被劫持也是无效的 jwt

### [#](http://interview.poetries.top/excellent-docs/14-HTTP模块.html#_8-3-介绍下如何实现-token-加密)8.3 介绍下如何实现 token 加密

- jwt 举例：
  - 1. 需要一个 secret（随机数）
  - 1. 后端利用 secret 和加密算法(如：HMAC-SHA256)对 payload(如账号密码) 生成一个字符串(token)，返回前端
  - 1. 前端每次 request 在 header 中带上 token
  - 1. 后端用同样的算法解密