在网上下载了一个版本号为apache-tomcat-8.5.38的Tomcat，因为这个Tomcat一直没有用过，所以今天启动时出现了如下乱码：

![img](D:\memo\idea使用技巧\reset\20190309144155896.png)

解决方案：

找到Tomcat目录下conf文件夹中的logging.properties文件，

![img](D:\memo\idea使用技巧\reset\20190309143252372.png)

打开logging.properties文件，找到文件中的java.util.logging.ConsoleHandler.encoding = UTF-8，

![img](D:\memo\idea使用技巧\reset\20190309143620805.png)

将其中的UTF-8改为GBK，保存后重启Tomcat服务，启动后就会看到刚才的乱码已经转换过来了。

![img](D:\memo\idea使用技巧\reset\2019030914424191.png)

补充：如果是Tomcat的标题出现了乱码怎么办呢？

我常用的Tomcat标题的命名有下面两种：

首先找到Tomcat目录下bin目录下的catalina.bat文件，用记事本打开：

![img](D:\memo\idea使用技巧\reset\20190415205942781.png)

第一种：在这个地方写这么一句：

set TITLE=Tomcat 8.5.38 这里是标题乱码测试

![img](D:\memo\idea使用技巧\reset\watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0IyMzQ1MDEy,size_16,color_FFFFFF,t_70)


第二种：在Tomcat原来标题的位置写标题：

![img](D:\memo\idea使用技巧\reset\watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0IyMzQ1MDEy,size_16,color_FFFFFF,t_702)

说明：不管是使用哪一种方式，其效果都是一样的，但是，如果同时使用两种方式，在启动的时候会闪退！

来看看正常启动后的效果：

![img](D:\memo\idea使用技巧\reset\20190415211902927.png)

标题位置出现了乱码，这个时候可以用Notepad++来调整文件的编码：

![img](D:\memo\idea使用技巧\reset\watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0IyMzQ1MDEy,size_16,color_FFFFFF,t_703)

我们可以看到现在文件使用的是UTF-8编码，我们可以点击下面的 转为ANSI编码 来调整文件的编码，点完了不要忘了保存哦~重启Tomcat来看看效果:

![img](D:\memo\idea使用技巧\reset\20190415210808820.png)

