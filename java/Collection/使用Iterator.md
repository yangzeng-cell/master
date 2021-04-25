Java的集合类都可以使用for each循环，List、Set和Queue会迭代每个元素，Map会迭代每个key。以List为例：

List<String> list = List.of("Apple", "Orange", "Pear");
for (String s : list) {
    System.out.println(s);
}
实际上，Java编译器并不知道如何遍历List。上述代码能够编译通过，只是因为编译器把for each循环通过Iterator改写为了普通的for循环：

for (Iterator<String> it = list.iterator(); it.hasNext(); ) {
     String s = it.next();
     System.out.println(s);
}
我们把这种通过Iterator对象遍历集合的模式称为迭代器。

使用迭代器的好处在于，调用方总是以统一的方式遍历各种集合类型，而不必关系它们内部的存储结构。

例如，我们虽然知道ArrayList在内部是以数组形式存储元素，并且，它还提供了get(int)方法。虽然我们可以用for循环遍历：

for (int i=0; i<list.size(); i++) {
    Object value = list.get(i);
}
但是这样一来，调用方就必须知道集合的内部存储结构。并且，如果把ArrayList换成LinkedList，get(int)方法耗时会随着index的增加而增加。如果把ArrayList换成Set，上述代码就无法编译，因为Set内部没有索引。

用Iterator遍历就没有上述问题，因为Iterator对象是集合对象自己在内部创建的，它自己知道如何高效遍历内部的数据集合，调用方则获得了统一的代码，编译器才能把标准的for each循环自动转换为Iterator遍历。

如果我们自己编写了一个集合类，想要使用for each循环，只需满足以下条件：

集合类实现Iterable接口，该接口要求返回一个Iterator对象；
用Iterator对象迭代集合内部数据。
这里的关键在于，集合类通过调用iterator()方法，返回一个Iterator对象，这个对象必须自己知道如何遍历该集合。

一个简单的Iterator示例如下，它总是以倒序遍历集合：

// Iterator
import java.util.*;

public class Main {
    public static void main(String[] args) {
        ReverseList<String> rlist = new ReverseList<>();
        rlist.add("Apple");
        rlist.add("Orange");
        rlist.add("Pear");
        for (String s : rlist) {
            System.out.println(s);
        }
    }
}

class ReverseList<T> implements Iterable<T> {

    private List<T> list = new ArrayList<>();

    public void add(T t) {
        list.add(t);
    }

    @Override
    public Iterator<T> iterator() {
        return new ReverseIterator(list.size());
    }

    class ReverseIterator implements Iterator<T> {
        int index;

        ReverseIterator(int index) {
            this.index = index;
        }

        @Override
        public boolean hasNext() {
            return index > 0;
        }

        @Override
        public T next() {
            index--;
            return ReverseList.this.list.get(index);
        }
    }
}

 Run
虽然ReverseList和ReverseIterator的实现类稍微比较复杂，但是，注意到这是底层集合库，只需编写一次。而调用方则完全按for each循环编写代码，根本不需要知道集合内部的存储逻辑和遍历逻辑。

在编写Iterator的时候，我们通常可以用一个内部类来实现Iterator接口，这个内部类可以直接访问对应的外部类的所有字段和方法。例如，上述代码中，内部类ReverseIterator可以用ReverseList.this获得当前外部类的this引用，然后，通过这个this引用就可以访问ReverseList的所有字段和方法。

小结
Iterator是一种抽象的数据访问模型。使用Iterator模式进行迭代的好处有：

对任何集合都采用同一种访问模型；
调用者对集合内部结构一无所知；
集合类返回的Iterator对象知道如何迭代。
Java提供了标准的迭代器模型，即集合类实现java.util.Iterable接口，返回java.util.Iterator实例。