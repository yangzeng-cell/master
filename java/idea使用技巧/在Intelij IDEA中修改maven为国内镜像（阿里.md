国内镜像：阿里

打开IntelliJ IDEA->Settings ->Build, Execution, Deployment -> Build Tools > Maven

或者直接搜索maven

具体如下图所示：

![这里写图片描述](D:\memo\idea使用技巧\reset\format,png)

而一般情况下在c:\Users\xx.m2\这个目录下面没有settings.xml文件，我们可以新建一个，settings.xml文件下的内容是：直接粘贴复制保存在上图所示的目录下面就可以了. 需要注意的是，需要点击上图所示右下角的override。
<settings xmlns="http://maven.apache.org/SETTINGS/1.0.0"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0
                          https://maven.apache.org/xsd/settings-1.0.0.xsd">
      

      <mirrors>
    	<mirror>  
      		<id>alimaven</id>  
      		<name>aliyun maven</name>  
      		<url>http://maven.aliyun.com/nexus/content/groups/public/</url>  
      		<mirrorOf>central</mirrorOf>          
    	</mirror>  
      </mirrors>
</settings>
————————————————
如果是linux系统，操作过程基本相同，只是settings.xml文件的存放路径不一样，不过都可以通过上面截图所示的页面中查到。

————————————————
