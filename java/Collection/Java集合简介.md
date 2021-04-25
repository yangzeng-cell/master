Collection
Java标准库自带的java.util包提供了集合类：Collection，它是除Map外所有其他集合类的根接口。Java的java.util包主要提供了以下三种类型的集合：

List：一种有序列表的集合，例如，按索引排列的Student的List；
Set：一种保证没有重复元素的集合，例如，所有无重复名称的Student的Set；
Map：一种通过键值（key-value）查找的映射表集合，例如，根据Student的name查找对应Student的Map。
Java集合的设计有几个特点：一是实现了接口和实现类相分离，例如，有序表的接口是List，具体的实现类有ArrayList，LinkedList等，二是支持泛型，我们可以限制在一个集合中只能放入同一种数据类型的元素，例如：

List<String> list = new ArrayList<>(); // 只能放入String类型
最后，Java访问集合总是通过统一的方式——迭代器（Iterator）来实现，它最明显的好处在于无需知道集合内部元素是按什么方式存储的。

由于Java的集合设计非常久远，中间经历过大规模改进，我们要注意到有一小部分集合类是遗留类，不应该继续使用：

Hashtable：一种线程安全的Map实现；
Vector：一种线程安全的List实现；
Stack：基于Vector实现的LIFO的栈。
还有一小部分接口是遗留接口，也不应该继续使用：

Enumeration<E>：已被Iterator<E>取代。
小结
Java的集合类定义在java.util包中，支持泛型，主要提供了3种集合类，包括List，Set和Map。Java集合使用统一的Iterator遍历，尽量不要使用遗留接口。