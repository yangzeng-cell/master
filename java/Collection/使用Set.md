Map用于存储key-value的映射，对于充当key的对象，是不能重复的，并且，不但需要正确覆写equals()方法，还要正确覆写hashCode()方法。

如果我们只需要存储不重复的key，并不需要存储映射的value，那么就可以使用Set。

Set用于存储不重复的元素集合，它主要提供以下几个方法：

将元素添加进Set<E>：boolean add(E e)
将元素从Set<E>删除：boolean remove(Object e)
判断是否包含元素：boolean contains(Object e)

Set实际上相当于只存储key、不存储value的Map。我们经常用Set用于去除重复元素。

因为放入Set的元素和Map的key类似，都要正确实现equals()和hashCode()方法，否则该元素无法正确地放入Set。

最常用的Set实现类是HashSet，实际上，HashSet仅仅是对HashMap的一个简单封装，它的核心代码如下：

public class HashSet<E> implements Set<E> {
    // 持有一个HashMap:
    private HashMap<E, Object> map = new HashMap<>();

    // 放入HashMap的value:
    private static final Object PRESENT = new Object();

    public boolean add(E e) {
        return map.put(e, PRESENT) == null;
    }

    public boolean contains(Object o) {
        return map.containsKey(o);
    }

    public boolean remove(Object o) {
        return map.remove(o) == PRESENT;
    }
}
Set接口并不保证有序，而SortedSet接口则保证元素是有序的：

HashSet是无序的，因为它实现了Set接口，并没有实现SortedSet接口；
TreeSet是有序的，因为它实现了SortedSet接口。

用一张图表示：

       ┌───┐
       │Set│
       └───┘
         ▲
    ┌────┴─────┐
    │          │
┌───────┐ ┌─────────┐
│HashSet│ │SortedSet│
└───────┘ └─────────┘
               ▲
               │
          ┌─────────┐
          │ TreeSet │
          └─────────┘


          使用TreeSet和使用TreeMap的要求一样，添加的元素必须正确实现Comparable接口，如果没有实现Comparable接口，那么创建TreeSet时必须传入一个Comparator对象。

小结
Set用于存储不重复的元素集合：

放入HashSet的元素与作为HashMap的key要求相同；
放入TreeSet的元素与作为TreeMap的Key要求相同；
利用Set可以去除重复元素；

遍历SortedSet按照元素的排序顺序遍历，也可以自定义排序算法。