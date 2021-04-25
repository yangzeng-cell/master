Reader是Java的IO库提供的另一个输入流接口。和InputStream的区别是，InputStream是一个字节流，即以byte为单位读取，而Reader是一个字符流，即以char为单位读取：
InputStream	Reader
字节流，以byte为单位	字符流，以char为单位
读取字节（-1，0~255）：int read()	读取字符（-1，0~65535）：int read()
读到字节数组：int read(byte[] b)	读到字符数组：int read(char[] c)
java.io.Reader是所有字符输入流的超类，它最主要的方法是：

public int read() throws IOException;
这个方法读取字符流的下一个字符，并返回字符表示的int，范围是0~65535。如果已读到末尾，返回-1。

FileReader
FileReader是Reader的一个子类，它可以打开文件并获取Reader。下面的代码演示了如何完整地读取一个FileReader的所有字符：

public void readFile() throws IOException {
    // 创建一个FileReader对象:
    Reader reader = new FileReader("src/readme.txt"); // 字符编码是???
    for (;;) {
        int n = reader.read(); // 反复调用read()方法，直到返回-1
        if (n == -1) {
            break;
        }
        System.out.println((char)n); // 打印char
    }
    reader.close(); // 关闭流
}
如果我们读取一个纯ASCII编码的文本文件，上述代码工作是没有问题的。但如果文件中包含中文，就会出现乱码，因为FileReader默认的编码与系统相关，例如，Windows系统的默认编码可能是GBK，打开一个UTF-8编码的文本文件就会出现乱码。

要避免乱码问题，我们需要在创建FileReader时指定编码：

Reader reader = new FileReader("src/readme.txt", StandardCharsets.UTF_8);
和InputStream类似，Reader也是一种资源，需要保证出错的时候也能正确关闭，所以我们需要用try (resource)来保证Reader在无论有没有IO错误的时候都能够正确地关闭：

try (Reader reader = new FileReader("src/readme.txt", StandardCharsets.UTF_8) {
    // TODO
}
Reader还提供了一次性读取若干字符并填充到char[]数组的方法：

public int read(char[] c) throws IOException
它返回实际读入的字符个数，最大不超过char[]数组的长度。返回-1表示流结束。

利用这个方法，我们可以先设置一个缓冲区，然后，每次尽可能地填充缓冲区：

public void readFile() throws IOException {
    try (Reader reader = new FileReader("src/readme.txt", StandardCharsets.UTF_8)) {
        char[] buffer = new char[1000];
        int n;
        while ((n = reader.read(buffer)) != -1) {
            System.out.println("read " + n + " chars.");
        }
    }
}

CharArrayReader
CharArrayReader可以在内存中模拟一个Reader，它的作用实际上是把一个char[]数组变成一个Reader，这和ByteArrayInputStream非常类似：

try (Reader reader = new CharArrayReader("Hello".toCharArray())) {
}
StringReader
StringReader可以直接把String作为数据源，它和CharArrayReader几乎一样：

try (Reader reader = new StringReader("Hello")) {
}

InputStreamReader
Reader和InputStream有什么关系？

除了特殊的CharArrayReader和StringReader，普通的Reader实际上是基于InputStream构造的，因为Reader需要从InputStream中读入字节流（byte），然后，根据编码设置，再转换为char就可以实现字符流。如果我们查看FileReader的源码，它在内部实际上持有一个FileInputStream。

既然Reader本质上是一个基于InputStream的byte到char的转换器，那么，如果我们已经有一个InputStream，想把它转换为Reader，是完全可行的。InputStreamReader就是这样一个转换器，它可以把任何InputStream转换为Reader。示例代码如下：

// 持有InputStream:
InputStream input = new FileInputStream("src/readme.txt");
// 变换为Reader:
Reader reader = new InputStreamReader(input, "UTF-8");
构造InputStreamReader时，我们需要传入InputStream，还需要指定编码，就可以得到一个Reader对象。上述代码可以通过try (resource)更简洁地改写如下：

try (Reader reader = new InputStreamReader(new FileInputStream("src/readme.txt"), "UTF-8")) {
    // TODO:
}
上述代码实际上就是FileReader的一种实现方式。

使用try (resource)结构时，当我们关闭Reader时，它会在内部自动调用InputStream的close()方法，所以，只需要关闭最外层的Reader对象即可。

 使用InputStreamReader，可以把一个InputStream转换成一个Reader。
小结
Reader定义了所有字符输入流的超类：

FileReader实现了文件字符流输入，使用时需要指定编码；
CharArrayReader和StringReader可以在内存中模拟一个字符流输入。
Reader是基于InputStream构造的：可以通过InputStreamReader在指定编码的同时将任何InputStream转换为Reader。

总是使用try (resource)保证Reader正确关闭。
