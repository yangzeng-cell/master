要高效拼接字符串，应该使用StringBuilder。

很多时候，我们拼接的字符串像这样：

// Hello Bob, Alice, Grace!
public class Main {
    public static void main(String[] args) {
        String[] names = {"Bob", "Alice", "Grace"};
        var sb = new StringBuilder();
        sb.append("Hello ");
        for (String name : names) {
            sb.append(name).append(", ");
        }
        // 注意去掉最后的", ":
        sb.delete(sb.length() - 2, sb.length());
        sb.append("!");
        System.out.println(sb.toString());
    }
}

 
类似用分隔符拼接数组的需求很常见，所以Java标准库还提供了一个StringJoiner来干这个事：

import java.util.StringJoiner;
public class Main {
    public static void main(String[] args) {
        String[] names = {"Bob", "Alice", "Grace"};
        var sj = new StringJoiner(", ");
        for (String name : names) {
            sj.add(name);
        }
        System.out.println(sj.toString());
    }
}

 
慢着！用StringJoiner的结果少了前面的"Hello "和结尾的"!"！遇到这种情况，需要给StringJoiner指定“开头”和“结尾”：

import java.util.StringJoiner;
public class Main {
    public static void main(String[] args) {
        String[] names = {"Bob", "Alice", "Grace"};
        var sj = new StringJoiner(", ", "Hello ", "!");
        for (String name : names) {
            sj.add(name);
        }
        System.out.println(sj.toString());
    }
}


String.join()
String还提供了一个静态方法join()，这个方法在内部使用了StringJoiner来拼接字符串，在不需要指定“开头”和“结尾”的时候，用String.join()更方便：

String[] names = {"Bob", "Alice", "Grace"};
var s = String.join(", ", names);


小结
用指定分隔符拼接字符串数组时，使用StringJoiner或者String.join()更方便；

用StringJoiner拼接字符串时，还可以额外附加一个“开头”和“结尾”。
 