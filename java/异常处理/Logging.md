那什么是日志？日志就是Logging，它的目的是为了取代System.out.println()。

输出日志，而不是用System.out.println()，有以下几个好处：

可以设置输出样式，避免自己每次都写"ERROR: " + var；
可以设置输出级别，禁止某些级别输出。例如，只输出错误日志；
可以被重定向到文件，这样可以在程序运行结束后查看日志；
可以按包名控制日志级别，只输出某些包打的日志；
可以……
总之就是好处很多啦。

那如何使用日志？

因为Java标准库内置了日志包java.util.logging，我们可以直接用

// logging
import java.util.logging.Level;
import java.util.logging.Logger;
public class Hello {
    public static void main(String[] args) {
        Logger logger = Logger.getGlobal();
        logger.info("start process...");
        logger.warning("memory is running out...");
        logger.fine("ignored.");
        logger.severe("process will be terminated...");
    }
}

 对比可见，使用日志最大的好处是，它自动打印了时间、调用类、调用方法等很多有用的信息。

再仔细观察发现，4条日志，只打印了3条，logger.fine()没有打印。这是因为，日志的输出可以设定级别。JDK的Logging定义了7个日志级别，从严重到普通：

SEVERE
WARNING
INFO
CONFIG
FINE
FINER
FINEST
因为默认级别是INFO，因此，INFO级别以下的日志，不会被打印出来。使用日志级别的好处在于，调整级别，就可以屏蔽掉很多调试相关的日志输出。

使用Java标准库内置的Logging有以下局限：

Logging系统在JVM启动时读取配置文件并完成初始化，一旦开始运行main()方法，就无法修改配置；

配置不太方便，需要在JVM启动时传递参数-Djava.util.logging.config.file=<config-file-name>。

因此，Java标准库内置的Logging使用并不是非常广泛。更方便的日志系统我们稍后介绍。

小结
日志是为了替代System.out.println()，可以定义格式，重定向到文件等；

日志可以存档，便于追踪问题；

日志记录可以按级别分类，便于打开或关闭某些级别；

可以根据配置文件调整日志，无需修改代码；

Java标准库提供了java.util.logging来实现日志功能。



