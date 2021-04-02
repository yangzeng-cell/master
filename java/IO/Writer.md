Writer
阅读: 380083
Reader是带编码转换器的InputStream，它把byte转换为char，而Writer就是带编码转换器的OutputStream，它把char转换为byte并输出。

Writer和OutputStream的区别如下：

OutputStream	Writer
字节流，以byte为单位	字符流，以char为单位
写入字节（0~255）：void write(int b)	写入字符（0~65535）：void write(int c)
写入字节数组：void write(byte[] b)	写入字符数组：void write(char[] c)
无对应方法	写入String：void write(String s)
Writer是所有字符输出流的超类，它提供的方法主要有：

写入一个字符（0~65535）：void write(int c)；
写入字符数组的所有字符：void write(char[] c)；
写入String表示的所有字符：void write(String s)。
FileWriter
FileWriter就是向文件中写入字符流的Writer。它的使用方法和FileReader类似：

try (Writer writer = new FileWriter("readme.txt", StandardCharsets.UTF_8)) {
    writer.write('H'); // 写入单个字符
    writer.write("Hello".toCharArray()); // 写入char[]
    writer.write("Hello"); // 写入String
}
CharArrayWriter
CharArrayWriter可以在内存中创建一个Writer，它的作用实际上是构造一个缓冲区，可以写入char，最后得到写入的char[]数组，这和ByteArrayOutputStream非常类似：

try (CharArrayWriter writer = new CharArrayWriter()) {
    writer.write(65);
    writer.write(66);
    writer.write(67);
    char[] data = writer.toCharArray(); // { 'A', 'B', 'C' }
}
StringWriter
StringWriter也是一个基于内存的Writer，它和CharArrayWriter类似。实际上，StringWriter在内部维护了一个StringBuffer，并对外提供了Writer接口。

OutputStreamWriter
除了CharArrayWriter和StringWriter外，普通的Writer实际上是基于OutputStream构造的，它接收char，然后在内部自动转换成一个或多个byte，并写入OutputStream。因此，OutputStreamWriter就是一个将任意的OutputStream转换为Writer的转换器：

try (Writer writer = new OutputStreamWriter(new FileOutputStream("readme.txt"), "UTF-8")) {
    // TODO:
}
上述代码实际上就是FileWriter的一种实现方式。这和上一节的InputStreamReader是一样的。

小结
Writer定义了所有字符输出流的超类：

FileWriter实现了文件字符流输出；

CharArrayWriter和StringWriter在内存中模拟一个字符流输出。

使用try (resource)保证Writer正确关闭。

Writer是基于OutputStream构造的，可以通过OutputStreamWriter将OutputStream转换为Writer，转换时需要指定编码。