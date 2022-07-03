Maven介绍
Maven的核心功能便是合理叙述项目间的依赖关系。
所有的Maven项目包含着一个名为pom.xml的文件，在文件中记录着自己的<groupId><artifactId><version>等字段，这些字段在创建Maven项目时填写，Maven会依据它们来定位到该项目。
在pom中的另一个关键标签是<dependencies>,该标签下可以包含若干个<dependency>标签，而<dependency>下则是上面介绍的<groupId><artifactId><version>等依赖字段，它们确定着一个唯一的项目版本。

maven pom.xml

Maven本地库
maven会将远程库下载下来的jar包存放在C:\Users\Tired.m2\repository文件夹下（默认）。

Maven远程库
http://mvnrepository.com/artifact/mysql/mysql-connector-java
作者：TiredHu
链接：https://www.jianshu.com/p/78c8fcfa85fa
来源：简书
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

使用Intellij IDEA创建Maven项目
1 下载Maven压缩包

下载地址：http://maven.apache.org/download.cgi
、

然后解压到对应的文件夹，自己想放那就放哪

配置环境变量
新增系统变量，变量名：MAVEN_HOME.找到maven的文件夹D:\software\maven\apache-maven-3.6.3


编辑添加
变量名：path
变量值：D:\software\maven\apache-maven-3.6.3或者%MAVEN_HOME%\bin;

启动cmd 查看是否全局安装成功  mvn -v

打开Intellij IDEA，配置maven
File | Settings | Build, Execution, Deployment | Build Tools | Maven




