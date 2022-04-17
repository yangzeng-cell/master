# [使用IntelliJ IDEA配置Tomcat（入门）](https://www.cnblogs.com/Knowledge-has-no-limit/p/7240585.html)

一、下载Tomcat

1、进入官网http://tomcat.apache.org/，选择download，下载所需Tomcat版本。

![img](D:\memo\idea使用技巧\reset\1196371-20170727091807234-871610725.png)

此处我们选择下载最新版本Tomcat 9。

注意有zip和exe两种格式的，zip（64-bit Windows zip(pgp,md5,sha1)）是免安装版的，exe（32-bit/64-bit Windows Service installer(pgp,md5,sha1)）是安装版。同时观察自己的电脑是64位系统还是32位系统。

此处选择下载zip版；

![img](D:\memo\idea使用技巧\reset\1196371-20170727094951140-1550709803.png)

下载后直接解压缩，

2、找到目录bin下的startup.bat，点击启动Tomcat；shutdown.bat：关闭Tomcat。

![img](D:\memo\idea使用技巧\reset\1196371-20170727095119437-101728306.png)

3、启动Tomcat后，打开浏览器，键入 [http://localhost:8080](http://localhost:8080/) 进入如下页面则表示安装成功：

![img](D:\memo\idea使用技巧\reset\1196371-20170727095350578-1634412474.png)

 

二、Tomcat环境变量配置

 

1、安装完成后，右击"我的电脑"，点击"属性"，选择"高级系统设置"；

![img](D:\memo\idea使用技巧\reset\1196371-20170725151349912-1301723620.png)

2、选择"高级"选项卡，点击"环境变量"；

![img](D:\memo\idea使用技巧\reset\1196371-20170725151451115-2107020942.png)

然后就会出现如下图所示的画面：

![img](D:\memo\idea使用技巧\reset\1196371-20170725151536130-543198323.png)

3、在”系统变量“中添加系统变量CATALINA_BASE，CATALINA_HOME；

**变量名：CATALINA_BASE**

**变量值：D:\tools\apache-tomcat-8.5.4    //Tomcat安装目录**

![img](D:\memo\idea使用技巧\reset\1196371-20170727095934828-524000720.png)

**变量名：CATALINA_HOME**

**变量值：D:\tools\apache-tomcat-8.5.4**

**![img](D:\memo\idea使用技巧\reset\1196371-20170727100035140-1066971781.png)**

点击确定。

4、此处还需修改ClassPath和Path的变量值。

### 在ClassPath的变量值中加入：%CATALINA_HOME%\lib\servlet-api.jar;（注意加的时候在原变量值后加英文状态下的“;”）

![img](D:\memo\idea使用技巧\reset\1196371-20170727101143546-1091662453.png)

 

### 在Path的变量值中加入：%CATALINA_HOME%\bin;%CATALINA_HOME%\lib（注意加的时候在原变量值后加英文状态下的“;”）

 ![img](D:\memo\idea使用技巧\reset\1196371-20170727101106484-932658129.png)

点击确定，Tomcat环境变量就配置好了。

5、此处需要验证一下。

点击"开始"->"运行"，键入"cmd"（或快捷键win+R）；键入命令: startup，出现以下信息，说明环境变量配置成功；

![img](D:\memo\idea使用技巧\reset\1196371-20170727102216062-650290703.png)

 

 三、在IntelliJ IDEA配置Tomcat

1、点击Run-Edit Configurations...

![img](D:\memo\idea使用技巧\reset\1196371-20170726154514500-1639196721.png)

2、点击左侧“+”，选择Tomcat Server--Local，

![img](D:\memo\idea使用技巧\reset\1196371-20170726154610734-2086163676.png)

3、在Tomcat Server -> Unnamed -> Server -> Application server项目下，点击 Configuration ，找到本地 Tomcat 服务器，再点击 OK按钮。

![img](D:\memo\idea使用技巧\reset\1196371-20170726154733687-1299224203.png)

 ![img](D:\memo\idea使用技巧\reset\1196371-20170727103054843-126972990.png)

至此，IntelliJ IDEA配置Tomcat完成。

四、在本地进行编译打包部署（需创建好一个maven的webAPP项目，参见另一篇文章）

1、直接在idea左下的Terminal终端输入mvn install，编译打包成功，显示BUILD SUCCESS字样。重新查看项目的目录，我们发现项目根目录下面多了target目录，该目录下也打出了war包。

![img](D:\memo\idea使用技巧\reset\1196371-20170727112226109-515877990.png)

![img](D:\memo\idea使用技巧\reset\1196371-20170727112242562-1343709015.png)

![img](D:\memo\idea使用技巧\reset\1196371-20170727112310875-1706908062.png)

![img](D:\memo\idea使用技巧\reset\1196371-20170727112346890-979718044.png)

 

2、再次进入部署界面

![img](D:\memo\idea使用技巧\reset\1196371-20170727104341234-2015881079.png)

3、在 Deployment 中 点击 + ，选择要部署的工程。

![img](D:\memo\idea使用技巧\reset\1196371-20170727104428125-1343285743.png)

此处选择TestDemo.war作为部署包。

4、 填写访问路径（一般为项目名，输入后会同步到server标签页的localhost处），点击 OK

 ![img](D:\memo\idea使用技巧\reset\1196371-20170727111624171-1997912970.png)

5、 在主界面中 Application Servers 中就可以看到部署的工程，点击左侧绿色三角形就可以运行 Tomcat 服务器

![img](D:\memo\idea使用技巧\reset\1196371-20170727111428562-1131648430.png)

 点击后显示如下：

![img](D:\memo\idea使用技巧\reset\1196371-20170727111742421-1304383722.png)

 