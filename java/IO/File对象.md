构造File对象时，既可以传入绝对路径，也可以传入相对路径。绝对路径是以根目录开头的完整路径，例如：

File f = new File("C:\\Windows\\notepad.exe");
注意Windows平台使用\作为路径分隔符，在Java字符串中需要用\\表示一个\。Linux平台使用/作为路径分隔符：

File f = new File("/usr/bin/javac");
传入相对路径时，相对路径前面加上当前目录就是绝对路径：
File对象既可以表示文件，也可以表示目录。特别要注意的是，构造一个File对象，即使传入的文件或目录不存在，代码也不会出错，因为构造一个File对象，并不会导致任何磁盘操作。只有当我们调用File对象的某些方法的时候，才真正进行磁盘操作。
f.isFile()//来判断文件是否存在
f.isDirectory()//判断目录是否·存在

用File对象获取到一个文件时，还可以进一步判断文件的权限和大小：
boolean canRead()：是否可读；
boolean canWrite()：是否可写；
boolean canExecute()：是否可执行；
long length()：文件字节大小。

// 假设当前目录是C:\Docs
File f1 = new File("sub\\javac"); // 绝对路径是C:\Docs\sub\javac
File f3 = new File(".\\sub\\javac"); // 绝对路径是C:\Docs\sub\javac
File f3 = new File("..\\sub\\javac"); // 绝对路径是C:\sub\javac
可以用.表示当前目录，..表示上级目录。
getPath()返回构造方法传入的路径
getAbsolutePath()返回绝对路径//C:\Users\v_yzeyang\IdeaProjects\test01\..
getCanonicalPath()它和绝对路径类似，但是返回的是规范路径。//C:\Users\v_yzeyang\IdeaProjects
System.out.println(File.separator); // 根据当前平台打印"\"或"/"

创建和删除文件
当File对象表示一个文件时，可以通过createNewFile()创建一个新文件，用delete()删除该文件：

File file = new File("/path/to/file");
if (file.createNewFile()) {
    // 文件创建成功:
    // TODO:
    if (file.delete()) {
        // 删除文件成功:
    }
}
有些时候，程序需要读写一些临时文件，File对象提供了createTempFile()来创建一个临时文件，以及deleteOnExit()在JVM退出时自动删除该文件。
import java.io.*;
public class Main {
    public static void main(String[] args) throws IOException {
        File f = File.createTempFile("tmp-", ".txt"); // 提供临时文件的前缀和后缀
        f.deleteOnExit(); // JVM退出时自动删除
        System.out.println(f.isFile());
        System.out.println(f.getAbsolutePath());
    }
}
遍历文件和目录
当File对象表示一个目录时，可以使用list()和listFiles()列出目录下的文件和子目录名。listFiles()提供了一系列重载方法，可以过滤不想要的文件和目录：
和文件操作类似，File对象如果表示一个目录，可以通过以下方法创建和删除目录：

boolean mkdir()：创建当前File对象表示的目录；
boolean mkdirs()：创建当前File对象表示的目录，并在必要时将不存在的父目录也创建出来；
boolean delete()：删除当前File对象表示的目录，当前目录必须为空才能删除成功。

Path
Java标准库还提供了一个Path对象，它位于java.nio.file包。Path对象和File对象类似，但操作更加简单：

import java.io.*;
import java.nio.file.*;
public class Main {
    public static void main(String[] args) throws IOException {
        Path p1 = Paths.get(".", "project", "study"); // 构造一个Path对象
        System.out.println(p1);
        Path p2 = p1.toAbsolutePath(); // 转换为绝对路径
        System.out.println(p2);
        Path p3 = p2.normalize(); // 转换为规范路径
        System.out.println(p3);
        File f = p3.toFile(); // 转换为File对象
        System.out.println(f);
        for (Path p : Paths.get("..").toAbsolutePath()) { // 可以直接遍历Path
            System.out.println("  " + p);
        }
    }
}
Java标准库的java.io.File对象表示一个文件或者目录：

创建File对象本身不涉及IO操作；
可以获取路径／绝对路径／规范路径：getPath()/getAbsolutePath()/getCanonicalPath()；
可以获取目录的文件和子目录：list()/listFiles()；
可以创建或删除文件和目录。
