在Map的内部，对key做比较是通过equals()实现的，这一点和List查找元素需要正确覆写equals()是一样的，即正确使用Map必须保证：作为key的对象必须正确覆写equals()方法。

我们经常使用String作为key，因为String已经正确覆写了equals()方法。但如果我们放入的key是一个自己写的类，就必须保证正确覆写了equals()方法。

我们再思考一下HashMap为什么能通过key直接计算出value存储的索引。相同的key对象（使用equals()判断时返回true）必须要计算出相同的索引，否则，相同的key每次取出的value就不一定对。

通过key计算索引的方式就是调用key对象的hashCode()方法，它返回一个int整数。HashMap正是通过这个方法直接定位key对应的value的索引，继而直接返回value。

因此，正确使用Map必须保证：

作为key的对象必须正确覆写equals()方法，相等的两个key实例调用equals()必须返回true；

作为key的对象还必须正确覆写hashCode()方法，且hashCode()方法要严格遵循以下规范：

如果两个对象相等，则两个对象的hashCode()必须相等；
如果两个对象不相等，则两个对象的hashCode()尽量不要相等。
即对应两个实例a和b：

如果a和b相等，那么a.equals(b)一定为true，则a.hashCode()必须等于b.hashCode()；
如果a和b不相等，那么a.equals(b)一定为false，则a.hashCode()和b.hashCode()尽量不要相等。
上述第一条规范是正确性，必须保证实现，否则HashMap不能正常工作。

而第二条如果尽量满足，则可以保证查询效率，因为不同的对象，如果返回相同的hashCode()，会造成Map内部存储冲突，使存取的效率下降。

正确编写equals()的方法我们已经在编写equals方法一节中讲过了，以Person类为例：

public class Person {
    String firstName;
    String lastName;
    int age;
}
把需要比较的字段找出来：

firstName
lastName
age
然后，引用类型使用Objects.equals()比较，基本类型使用==比较。

在正确实现equals()的基础上，我们还需要正确实现hashCode()，即上述3个字段分别相同的实例，hashCode()返回的int必须相同：

public class Person {
    String firstName;
    String lastName;
    int age;

    @Override
    int hashCode() {
        int h = 0;
        h = 31 * h + firstName.hashCode();
        h = 31 * h + lastName.hashCode();
        h = 31 * h + age;
        return h;
    }
}
注意到String类已经正确实现了hashCode()方法，我们在计算Person的hashCode()时，反复使用31*h，这样做的目的是为了尽量把不同的Person实例的hashCode()均匀分布到整个int范围。

和实现equals()方法遇到的问题类似，如果firstName或lastName为null，上述代码工作起来就会抛NullPointerException。为了解决这个问题，我们在计算hashCode()的时候，经常借助Objects.hash()来计算：

int hashCode() {
    return Objects.hash(firstName, lastName, age);
}
所以，编写equals()和hashCode()遵循的原则是：

equals()用到的用于比较的每一个字段，都必须在hashCode()中用于计算；equals()中没有使用到的字段，绝不可放在hashCode()中计算。

另外注意，对于放入HashMap的value对象，没有任何要求。

延伸阅读
既然HashMap内部使用了数组，通过计算key的hashCode()直接定位value所在的索引，那么第一个问题来了：hashCode()返回的int范围高达±21亿，先不考虑负数，HashMap内部使用的数组得有多大？

实际上HashMap初始化时默认的数组大小只有16，任何key，无论它的hashCode()有多大，都可以简单地通过：

int index = key.hashCode() & 0xf; // 0xf = 15
把索引确定在0～15，即永远不会超出数组范围，上述算法只是一种最简单的实现。

第二个问题：如果添加超过16个key-value到HashMap，数组不够用了怎么办？

添加超过一定数量的key-value时，HashMap会在内部自动扩容，每次扩容一倍，即长度为16的数组扩展为长度32，相应地，需要重新确定hashCode()计算的索引位置。例如，对长度为32的数组计算hashCode()对应的索引，计算方式要改为：

int index = key.hashCode() & 0x1f; // 0x1f = 31
由于扩容会导致重新分布已有的key-value，所以，频繁扩容对HashMap的性能影响很大。如果我们确定要使用一个容量为10000个key-value的HashMap，更好的方式是创建HashMap时就指定容量：

Map<String, Integer> map = new HashMap<>(10000);
虽然指定容量是10000，但HashMap内部的数组长度总是2n，因此，实际数组长度被初始化为比10000大的16384（214）。

最后一个问题：如果不同的两个key，例如"a"和"b"，它们的hashCode()恰好是相同的（这种情况是完全可能的，因为不相等的两个实例，只要求hashCode()尽量不相等），那么，当我们放入：

map.put("a", new Person("Xiao Ming"));
map.put("b", new Person("Xiao Hong"));
时，由于计算出的数组索引相同，后面放入的"Xiao Hong"会不会把"Xiao Ming"覆盖了？

当然不会！使用Map的时候，只要key不相同，它们映射的value就互不干扰。但是，在HashMap内部，确实可能存在不同的key，映射到相同的hashCode()，即相同的数组索引上，肿么办？

我们就假设"a"和"b"这两个key最终计算出的索引都是5，那么，在HashMap的数组中，实际存储的不是一个Person实例，而是一个List，它包含两个Entry，一个是"a"的映射，一个是"b"的映射：

  ┌───┐
0 │   │
  ├───┤
1 │   │
  ├───┤
2 │   │
  ├───┤
3 │   │
  ├───┤
4 │   │
  ├───┤
5 │ ●─┼───> List<Entry<String, Person>>
  ├───┤
6 │   │
  ├───┤
7 │   │
  └───┘
在查找的时候，例如：

Person p = map.get("a");
HashMap内部通过"a"找到的实际上是List<Entry<String, Person>>，它还需要遍历这个List，并找到一个Entry，它的key字段是"a"，才能返回对应的Person实例。

我们把不同的key具有相同的hashCode()的情况称之为哈希冲突。在冲突的时候，一种最简单的解决办法是用List存储hashCode()相同的key-value。显然，如果冲突的概率越大，这个List就越长，Map的get()方法效率就越低，这就是为什么要尽量满足条件二：

 如果两个对象不相等，则两个对象的hashCode()尽量不要相等。
hashCode()方法编写得越好，HashMap工作的效率就越高。

小结
要正确使用HashMap，作为key的类必须正确覆写equals()和hashCode()方法；

一个类如果覆写了equals()，就必须覆写hashCode()，并且覆写规则是：

如果equals()返回true，则hashCode()返回值必须相等；

如果equals()返回false，则hashCode()返回值尽量不要相等。

实现hashCode()方法可以通过Objects.hashCode()辅助方法实现。