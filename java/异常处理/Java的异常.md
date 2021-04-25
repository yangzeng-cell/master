因为Java的异常是class，它的继承关系如下：

                     ┌───────────┐
                     │  Object   │
                     └───────────┘
                           ▲
                           │
                     ┌───────────┐
                     │ Throwable │
                     └───────────┘
                           ▲
                 ┌─────────┴─────────┐
                 │                   │
           ┌───────────┐       ┌───────────┐
           │   Error   │       │ Exception │
           └───────────┘       └───────────┘
                 ▲                   ▲
         ┌───────┘              ┌────┴──────────┐
         │                      │               │
┌─────────────────┐    ┌─────────────────┐┌───────────┐
│OutOfMemoryError │... │RuntimeException ││IOException│...
└─────────────────┘    └─────────────────┘└───────────┘
                                ▲
                    ┌───────────┴─────────────┐
                    │                         │
         ┌─────────────────────┐ ┌─────────────────────────┐
         │NullPointerException │ │IllegalArgumentException │...
         └─────────────────────┘ └─────────────────────────┘

         从继承关系可知：Throwable是异常体系的根，它继承自Object。Throwable有两个体系：Error和Exception，Error表示严重的错误，程序对此一般无能为力，例如：

OutOfMemoryError：内存耗尽
NoClassDefFoundError：无法加载某个Class
StackOverflowError：栈溢出
而Exception则是运行时的错误，它可以被捕获并处理。

某些异常是应用程序逻辑处理的一部分，应该捕获并处理。例如：

NumberFormatException：数值类型的格式错误
FileNotFoundException：未找到文件
SocketException：读取网络失败
还有一些异常是程序逻辑编写不对造成的，应该修复程序本身。例如：

NullPointerException：对某个null的对象调用方法或字段
IndexOutOfBoundsException：数组索引越界
Exception又分为两大类：

RuntimeException以及它的子类；
非RuntimeException（包括IOException、ReflectiveOperationException等等）
Java规定：

必须捕获的异常，包括Exception及其子类，但不包括RuntimeException及其子类，这种类型的异常称为Checked Exception。

不需要捕获的异常，包括Error及其子类，RuntimeException及其子类。

 注意：编译器对RuntimeException及其子类不做强制捕获要求，不是指应用程序本身不应该捕获并处理RuntimeException。是否需要捕获，具体问题具体分析。


 static byte[] toGBK(String s) {
    try {
        return s.getBytes("GBK");
    } catch (UnsupportedEncodingException e) {
        // 先记下来再说:
        e.printStackTrace();
    }
    return null;
所有异常都可以调用printStackTrace()方法打印异常栈，这是一个简单有用的快速打印异常的方法。

public class Main {
    public static void main(String[] args) {
        try {
            byte[] bs = toGBK("中文");
            System.out.println(Arrays.toString(bs));
        } catch (UnsupportedEncodingException e) {
            System.out.println(e);
        }
    }

    static byte[] toGBK(String s) throws UnsupportedEncodingException {
        // 用指定编码转换String为byte[]:
        return s.getBytes("GBK");
    }
}

小结
Java使用异常来表示错误，并通过try ... catch捕获异常；

Java的异常是class，并且从Throwable继承；

Error是无需捕获的严重错误，Exception是应该捕获的可处理的错误；

RuntimeException无需强制捕获，非RuntimeException（Checked Exception）需强制捕获，或者用throws声明；

不推荐捕获了异常但不进行任何处理。