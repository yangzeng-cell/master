在所有的RuntimeException异常中，Java程序员最熟悉的恐怕就是NullPointerException了。

NullPointerException即空指针异常，俗称NPE。如果一个对象为null，调用其方法或访问其字段就会产生NullPointerException，这个异常通常是由JVM抛出的，例如：

// NullPointerException
public class Main {
    public static void main(String[] args) {
        String s = null;
        System.out.println(s.toLowerCase());
    }
}

指针这个概念实际上源自C语言，Java语言中并无指针。我们定义的变量实际上是引用，Null Pointer更确切地说是Null Reference，不过两者区别不大。

处理NullPointerException
如果遇到NullPointerException，我们应该如何处理？首先，必须明确，NullPointerException是一种代码逻辑错误，遇到NullPointerException，遵循原则是早暴露，早修复，严禁使用catch来隐藏这种编码错误：

// 错误示例: 捕获NullPointerException
try {
    transferMoney(from, to, amount);
} catch (NullPointerException e) {
}
好的编码习惯可以极大地降低NullPointerException的产生，例如：

成员变量在定义时初始化：

public class Person {
    private String name = "";
}
使用空字符串""而不是默认的null可避免很多NullPointerException，编写业务逻辑时，用空字符串""表示未填写比null安全得多。

返回空字符串""、空数组而不是null：

public String[] readLinesFromFile(String file) {
    if (getFileSize(file) == 0) {
        // 返回空数组而不是null:
        return new String[0];
    }
    ...
    }
这样可以使得调用方无需检查结果是否为null。

如果调用方一定要根据null判断，比如返回null表示文件不存在，那么考虑返回Optional<T>：

public Optional<String> readFromFile(String file) {
    if (!fileExist(file)) {
        return Optional.empty();
    }
    ...
}
这样调用方必须通过Optional.isPresent()判断是否有结果。

定位NullPointerException
如果产生了NullPointerException，例如，调用a.b.c.x()时产生了NullPointerException，原因可能是：

a是null；
a.b是null；
a.b.c是null；
确定到底是哪个对象是null以前只能打印这样的日志：

System.out.println(a);
System.out.println(a.b);
System.out.println(a.b.c);
从Java 14开始，如果产生了NullPointerException，JVM可以给出详细的信息告诉我们null对象到底是谁。我们来看例子：


public class Main {
    public static void main(String[] args) {
        Person p = new Person();
        System.out.println(p.address.city.toLowerCase());
    }
}

class Person {
    String[] name = new String[2];
    Address address = new Address();
}

class Address {
    String city;
    String street;
    String zipcode;
}

 可以在NullPointerException的详细信息中看到类似... because "<local1>.address.city" is null，意思是city字段为null，这样我们就能快速定位问题所在。

这种增强的NullPointerException详细信息是Java 14新增的功能，但默认是关闭的，我们可以给JVM添加一个-XX:+ShowCodeDetailsInExceptionMessages参数启用它：

java -XX:+ShowCodeDetailsInExceptionMessages Main.java

Idea,Run->EditConfigurations-> VM options