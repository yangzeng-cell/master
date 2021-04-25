队列（Queue）是一种经常使用的集合。Queue实际上是实现了一个先进先出（FIFO：First In First Out）的有序表。它和List的区别在于，List可以在任意位置添加和删除元素，而Queue只有两个操作：

把元素添加到队列末尾；
从队列头部取出元素。

在Java的标准库中，队列接口Queue定义了以下几个方法：

int size()：获取队列长度；
boolean add(E)/boolean offer(E)：添加元素到队尾；
E remove()/E poll()：获取队首元素并从队列中删除；
E element()/E peek()：获取队首元素但并不从队列中删除。

于具体的实现类，有的Queue有最大队列长度限制，有的Queue没有。注意到添加、删除和获取队列元素总是有两个方法，这是因为在添加或获取元素失败时，这两个方法的行为是不同的。我们用一个表格总结如下：

throw Exception	返回false或null
添加元素到队尾	add(E e)	boolean offer(E e)
取队首元素并删除	E remove()	E poll()
取队首元素但不删除	E element()	E peek()
注意：不要把null添加到队列中，否则poll()方法返回null时，很难确定是取到了null元素还是队列为空。
接下来我们以poll()和peek()为例来说说“获取并删除”与“获取但不删除”的区别。对于Queue来说，每次调用poll()，都会获取队首元素，并且获取到的元素已经从队列中被删除了：

import java.util.LinkedList;
import java.util.Queue;
public class Main {
    public static void main(String[] args) {
        Queue<String> q = new LinkedList<>();
        // 添加3个元素到队列:
        q.offer("apple");
        q.offer("pear");
        q.offer("banana");
        // 从队列取出元素:
        System.out.println(q.poll()); // apple
        System.out.println(q.poll()); // pear
        System.out.println(q.poll()); // banana
        System.out.println(q.poll()); // null,因为队列是空的
    }
}

如果用peek()，因为获取队首元素时，并不会从队列中删除这个元素，所以可以反复获取：

import java.util.LinkedList;
import java.util.Queue;
public class Main {
    public static void main(String[] args) {
        Queue<String> q = new LinkedList<>();
        // 添加3个元素到队列:
        q.offer("apple");
        q.offer("pear");
        q.offer("banana");
        // 队首永远都是apple，因为peek()不会删除它:
        System.out.println(q.peek()); // apple
        System.out.println(q.peek()); // apple
        System.out.println(q.peek()); // apple
    }
}

 从上面的代码中，我们还可以发现，LinkedList即实现了List接口，又实现了Queue接口，但是，在使用的时候，如果我们把它当作List，就获取List的引用，如果我们把它当作Queue，就获取Queue的引用：

// 这是一个List:
List<String> list = new LinkedList<>();
// 这是一个Queue:
Queue<String> queue = new LinkedList<>();
始终按照面向抽象编程的原则编写代码，可以大大提高代码的质量。

小结
队列Queue实现了一个先进先出（FIFO）的数据结构：

通过add()/offer()方法将元素添加到队尾；
通过remove()/poll()从队首获取元素并删除；
通过element()/peek()从队首获取元素但不删除。
要避免把null添加到队列。

PriorityQueue和Queue的区别在于，它的出队顺序与元素的优先级有关，对PriorityQueue调用remove()或poll()方法，返回的总是优先级最高的元素。

要使用PriorityQueue，我们就必须给每个元素定义“优先级”。我们以实际代码为例，先看看PriorityQueue的行为：

import java.util.PriorityQueue;
import java.util.Queue;
public class Main {
    public static void main(String[] args) {
        Queue<String> q = new PriorityQueue<>();
        // 添加3个元素到队列:
        q.offer("apple");
        q.offer("pear");
        q.offer("banana");
        System.out.println(q.poll()); // apple
        System.out.println(q.poll()); // banana
        System.out.println(q.poll()); // pear
        System.out.println(q.poll()); // null,因为队列为空
    }
}

 PriorityQueue允许我们提供一个Comparator对象来判断两个元素的顺序。我们以银行排队业务为例，实现一个PriorityQueue：

import java.util.Comparator;
import java.util.PriorityQueue;
import java.util.Queue;
public class Main {
    public static void main(String[] args) {
        Queue<User> q = new PriorityQueue<>(new UserComparator());
        // 添加3个元素到队列:
        q.offer(new User("Bob", "A1"));
        q.offer(new User("Alice", "A2"));
        q.offer(new User("Boss", "V1"));
        System.out.println(q.poll()); // Boss/V1
        System.out.println(q.poll()); // Bob/A1
        System.out.println(q.poll()); // Alice/A2
        System.out.println(q.poll()); // null,因为队列为空
    }
}

class UserComparator implements Comparator<User> {
    public int compare(User u1, User u2) {
        if (u1.number.charAt(0) == u2.number.charAt(0)) {
            // 如果两人的号都是A开头或者都是V开头,比较号的大小:
            return u1.number.compareTo(u2.number);
        }
        if (u1.number.charAt(0) == 'V') {
            // u1的号码是V开头,优先级高:
            return -1;
        } else {
            return 1;
        }
    }
}

class User {
    public final String name;
    public final String number;

    public User(String name, String number) {
        this.name = name;
        this.number = number;
    }

    public String toString() {
        return name + "/" + number;
    }
}

 Run
实现PriorityQueue的关键在于提供的UserComparator对象，它负责比较两个元素的大小（较小的在前）。UserComparator总是把V开头的号码优先返回，只有在开头相同的时候，才比较号码大小。

上面的UserComparator的比较逻辑其实还是有问题的，它会把A10排在A2的前面，请尝试修复该错误。

小结
PriorityQueue实现了一个优先队列：从队首获取元素时，总是获取优先级最高的元素。

PriorityQueue默认按元素比较的顺序排序（必须实现Comparable接口），也可以通过Comparator自定义排序算法（元素就不必实现Comparable接口）。
