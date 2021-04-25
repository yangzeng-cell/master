配置文件的特点是，它的Key-Value一般都是String-String类型的，因此我们完全可以用Map<String, String>来表示它。


因为配置文件非常常用，所以Java集合库提供了一个Properties来表示一组“配置”。由于历史遗留原因，Properties内部本质上是一个Hashtable，但我们只需要用到Properties自身关于读写配置的接口。
读取配置文件
用Properties读取配置文件非常简单。Java默认配置文件以.properties为扩展名，每行以key=value表示，以#课开头的是注释。以下是一个典型的配置文件：

# setting.properties

last_open_file=/data/hello.txt
auto_save_interval=60
可以从文件系统读取这个.properties文件：

String f = "setting.properties";
Properties props = new Properties();
props.load(new java.io.FileInputStream(f));

String filepath = props.getProperty("last_open_file");
String interval = props.getProperty("auto_save_interval", "120");
可见，用Properties读取配置文件，一共有三步：

创建Properties实例；
调用load()读取文件；
调用getProperty()获取配置。
调用getProperty()获取配置时，如果key不存在，将返回null。我们还可以提供一个默认值，这样，当key不存在的时候，就返回默认值。

也可以从classpath读取.properties文件，因为load(InputStream)方法接收一个InputStream实例，表示一个字节流，它不一定是文件流，也可以是从jar包中读取的资源流：

Properties props = new Properties();
props.load(getClass().getResourceAsStream("/common/setting.properties"));
试试从内存读取一个字节流：

// properties
import java.io.*;
import java.util.Properties;

public class Main {
    public static void main(String[] args) throws IOException {
        String settings = "# test" + "\n" + "course=Java" + "\n" + "last_open_date=2019-08-07T12:35:01";
        ByteArrayInputStream input = new ByteArrayInputStream(settings.getBytes("UTF-8"));
        Properties props = new Properties();
        props.load(input);

        System.out.println("course: " + props.getProperty("course"));
        System.out.println("last_open_date: " + props.getProperty("last_open_date"));
        System.out.println("last_open_file: " + props.getProperty("last_open_file"));
        System.out.println("auto_save: " + props.getProperty("auto_save", "60"));
    }
}

 Run
如果有多个.properties文件，可以反复调用load()读取，后读取的key-value会覆盖已读取的key-value：

Properties props = new Properties();
props.load(getClass().getResourceAsStream("/common/setting.properties"));
props.load(new FileInputStream("C:\\conf\\setting.properties"));
上面的代码演示了Properties的一个常用用法：可以把默认配置文件放到classpath中，然后，根据机器的环境编写另一个配置文件，覆盖某些默认的配置。

Properties设计的目的是存储String类型的key－value，但Properties实际上是从Hashtable派生的，它的设计实际上是有问题的，但是为了保持兼容性，现在已经没法修改了。除了getProperty()和setProperty()方法外，还有从Hashtable继承下来的get()和put()方法，这些方法的参数签名是Object，我们在使用Properties的时候，不要去调用这些从Hashtable继承下来的方法。

写入配置文件
如果通过setProperty()修改了Properties实例，可以把配置写入文件，以便下次启动时获得最新配置。写入配置文件使用store()方法：

Properties props = new Properties();
props.setProperty("url", "http://www.liaoxuefeng.com");
props.setProperty("language", "Java");
props.store(new FileOutputStream("C:\\conf\\setting.properties"), "这是写入的properties注释");
编码
早期版本的Java规定.properties文件编码是ASCII编码（ISO8859-1），如果涉及到中文就必须用name=\u4e2d\u6587来表示，非常别扭。从JDK9开始，Java的.properties文件可以使用UTF-8编码了。

不过，需要注意的是，由于load(InputStream)默认总是以ASCII编码读取字节流，所以会导致读到乱码。我们需要用另一个重载方法load(Reader)读取：

Properties props = new Properties();
props.load(new FileReader("settings.properties", StandardCharsets.UTF_8));
就可以正常读取中文。InputStream和Reader的区别是一个是字节流，一个是字符流。字符流在内存中已经以char类型表示了，不涉及编码问题。

小结
Java集合库提供的Properties用于读写配置文件.properties。.properties文件可以使用UTF-8编码。

可以从文件系统、classpath或其他任何地方读取.properties文件。

读写Properties时，注意仅使用getProperty()和setProperty()方法，不要调用继承而来的get()和put()等方法。

