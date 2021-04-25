还有一种Map，它在内部会对Key进行排序，这种Map就是SortedMap。注意到SortedMap是接口，它的实现类是TreeMap。

       ┌───┐
       │Map│
       └───┘
         ▲
    ┌────┴─────┐
    │          │
┌───────┐ ┌─────────┐
│HashMap│ │SortedMap│
└───────┘ └─────────┘
               ▲
               │
          ┌─────────┐
          │ TreeMap │
          └─────────┘
SortedMap保证遍历时以Key的顺序来进行排序。例如，放入的Key是"apple"、"pear"、"orange"，遍历的顺序一定是"apple"、"orange"、"pear"，因为String默认按字母排序

使用TreeMap时，放入的Key必须实现Comparable接口。String、Integer这些类已经实现了Comparable接口，因此可以直接作为Key使用。作为Value的对象则没有任何要求。

如果作为Key的class没有实现Comparable接口，那么，必须在创建TreeMap时同时指定一个自定义排序算法：

import java.util.*;
public class Main {
    public static void main(String[] args) {
        Map<Person, Integer> map = new TreeMap<>(new Comparator<Person>() {
            public int compare(Person p1, Person p2) {
                return p1.name.compareTo(p2.name);
            }
        });
        map.put(new Person("Tom"), 1);
        map.put(new Person("Bob"), 2);
        map.put(new Person("Lily"), 3);
        for (Person key : map.keySet()) {
            System.out.println(key);
        }
        // {Person: Bob}, {Person: Lily}, {Person: Tom}
        System.out.println(map.get(new Person("Bob"))); // 2
    }
}

class Person {
    public String name;
    Person(String name) {
        this.name = name;
    }
    public String toString() {
        return "{Person: " + name + "}";
    }
}

 Run
注意到Comparator接口要求实现一个比较方法，它负责比较传入的两个元素a和b，如果a<b，则返回负数，通常是-1，如果a==b，则返回0，如果a>b，则返回正数，通常是1。TreeMap内部根据比较结果对Key进行排序。

从上述代码执行结果可知，打印的Key确实是按照Comparator定义的顺序排序的。如果要根据Key查找Value，我们可以传入一个new Person("Bob")作为Key，它会返回对应的Integer值2。

另外，注意到Person类并未覆写equals()和hashCode()，因为TreeMap不使用equals()和hashCode()。

我们来看一个稍微复杂的例子：这次我们定义了Student类，并用分数score进行排序，高分在前：

import java.util.*;
public class Main {
    public static void main(String[] args) {
        Map<Student, Integer> map = new TreeMap<>(new Comparator<Student>() {
            public int compare(Student p1, Student p2) {
                return p1.score > p2.score ? -1 : 1;
            }
        });
        map.put(new Student("Tom", 77), 1);
        map.put(new Student("Bob", 66), 2);
        map.put(new Student("Lily", 99), 3);
        for (Student key : map.keySet()) {
            System.out.println(key);
        }
        System.out.println(map.get(new Student("Bob", 66))); // null?
    }
}

class Student {
    public String name;
    public int score;
    Student(String name, int score) {
        this.name = name;
        this.score = score;
    }
    public String toString() {
        return String.format("{%s: score=%d}", name, score);
    }
}

 Run
在for循环中，我们确实得到了正确的顺序。但是，且慢！根据相同的Key：new Student("Bob", 66)进行查找时，结果为null！

这是怎么肥四？难道TreeMap有问题？遇到TreeMap工作不正常时，我们首先回顾Java编程基本规则：出现问题，不要怀疑Java标准库，要从自身代码找原因。

在这个例子中，TreeMap出现问题，原因其实出在这个Comparator上：

public int compare(Student p1, Student p2) {
    return p1.score > p2.score ? -1 : 1;
}
在p1.score和p2.score不相等的时候，它的返回值是正确的，但是，在p1.score和p2.score相等的时候，它并没有返回0！这就是为什么TreeMap工作不正常的原因：TreeMap在比较两个Key是否相等时，依赖Key的compareTo()方法或者Comparator.compare()方法。在两个Key相等时，必须返回0。因此，修改代码如下：

public int compare(Student p1, Student p2) {
    if (p1.score == p2.score) {
        return 0;
    }
    return p1.score > p2.score ? -1 : 1;
}
或者直接借助Integer.compare(int, int)也可以返回正确的比较结果。

小结
SortedMap在遍历时严格按照Key的顺序遍历，最常用的实现类是TreeMap；

作为SortedMap的Key必须实现Comparable接口，或者传入Comparator；

要严格按照compare()规范实现比较逻辑，否则，TreeMap将不能正常工作。