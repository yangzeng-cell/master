对比extends和super通配符
我们再回顾一下extends通配符。作为方法参数，<? extends T>类型和<? super T>类型的区别在于：

<? extends T>允许调用读方法T get()获取T的引用，但不允许调用写方法set(T)传入T的引用（传入null除外）；

<? super T>允许调用写方法set(T)传入T的引用，但不允许调用读方法T get()获取T的引用（获取Object除外）。

一个是允许读不允许写，另一个是允许写不允许读。

先记住上面的结论，我们来看Java标准库的Collections类定义的copy()方法：

public class Collections {
    // 把src的每个元素复制到dest中:
    public static <T> void copy(List<? super T> dest, List<? extends T> src) {
        for (int i=0; i<src.size(); i++) {
            T t = src.get(i);
            dest.add(t);
        }
    }
}
它的作用是把一个List的每个元素依次添加到另一个List中。它的第一个参数是List<? super T>，表示目标List，第二个参数List<? extends T>，表示要复制的List。我们可以简单地用for循环实现复制。在for循环中，我们可以看到，对于类型<? extends T>的变量src，我们可以安全地获取类型T的引用，而对于类型<? super T>的变量dest，我们可以安全地传入T的引用。

这个copy()方法的定义就完美地展示了extends和super的意图：

copy()方法内部不会读取dest，因为不能调用dest.get()来获取T的引用；

copy()方法内部也不会修改src，因为不能调用src.add(T)。

这是由编译器检查来实现的。如果在方法代码中意外修改了src，或者意外读取了dest，就会导致一个编译错误：

public class Collections {
    // 把src的每个元素复制到dest中:
    public static <T> void copy(List<? super T> dest, List<? extends T> src) {
        ...
        T t = dest.get(0); // compile error!
        src.add(t); // compile error!
    }
}
这个copy()方法的另一个好处是可以安全地把一个List<Integer>添加到List<Number>，但是无法反过来添加：

// copy List<Integer> to List<Number> ok:
List<Number> numList = ...;
List<Integer> intList = ...;
Collections.copy(numList, intList);

// ERROR: cannot copy List<Number> to List<Integer>:
Collections.copy(intList, numList);
而这些都是通过super和extends通配符，并由编译器强制检查来实现的。

PECS原则
何时使用extends，何时使用super？为了便于记忆，我们可以用PECS原则：Producer Extends Consumer Super。

即：如果需要返回T，它是生产者（Producer），要使用extends通配符；如果需要写入T，它是消费者（Consumer），要使用super通配符。

还是以Collections的copy()方法为例：

public class Collections {
    public static <T> void copy(List<? super T> dest, List<? extends T> src) {
        for (int i=0; i<src.size(); i++) {
            T t = src.get(i); // src是producer
            dest.add(t); // dest是consumer
        }
    }
}
需要返回T的src是生产者，因此声明为List<? extends T>，需要写入T的dest是消费者，因此声明为List<? super T>。

无限定通配符
我们已经讨论了<? extends T>和<? super T>作为方法参数的作用。实际上，Java的泛型还允许使用无限定通配符（Unbounded Wildcard Type），即只定义一个?：

void sample(Pair<?> p) {
}
因为<?>通配符既没有extends，也没有super，因此：

不允许调用set(T)方法并传入引用（null除外）；
不允许调用T get()方法并获取T引用（只能获取Object引用）。
换句话说，既不能读，也不能写，那只能做一些null判断：

static boolean isNull(Pair<?> p) {
    return p.getFirst() == null || p.getLast() == null;
}
大多数情况下，可以引入泛型参数<T>消除<?>通配符：

static <T> boolean isNull(Pair<T> p) {
    return p.getFirst() == null || p.getLast() == null;
}
<?>通配符有一个独特的特点，就是：Pair<?>是所有Pair<T>的超类：

public class Main {
    public static void main(String[] args) {
        Pair<Integer> p = new Pair<>(123, 456);
        Pair<?> p2 = p; // 安全地向上转型
        System.out.println(p2.getFirst() + ", " + p2.getLast());
    }

}

class Pair<T> {
    private T first;
    private T last;

    public Pair(T first, T last) {
        this.first = first;
        this.last = last;
    }

    public T getFirst() {
        return first;
    }
    public T getLast() {
        return last;
    }
    public void setFirst(T first) {
        this.first = first;
    }
    public void setLast(T last) {
        this.last = last;
    }
}      述代码是可以正常编译运行的，因为Pair<Integer>是Pair<?>的子类，可以安全地向上转型。

小结
使用类似<? super Integer>通配符作为方法参数时表示：

方法内部可以调用传入Integer引用的方法，例如：obj.setFirst(Integer n);；

方法内部无法调用获取Integer引用的方法（Object除外），例如：Integer n = obj.getFirst();。

即使用super通配符表示只能写不能读。

使用extends和super通配符要遵循PECS原则。

无限定通配符<?>很少使用，可以用<T>替换，同时它是所有<T>类型的超类