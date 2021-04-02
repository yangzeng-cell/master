Stack只有入栈和出栈的操作：

把元素压栈：push(E)；
把栈顶的元素“弹出”：pop(E)；
取栈顶元素但不弹出：peek(E)。
在Java中，我们用Deque可以实现Stack的功能：

把元素压栈：push(E)/addFirst(E)；
把栈顶的元素“弹出”：pop(E)/removeFirst()；
取栈顶元素但不弹出：peek(E)/peekFirst()。

为什么Java的集合类没有单独的Stack接口呢？因为有个遗留类名字就叫Stack，出于兼容性考虑，所以没办法创建Stack接口，只能用Deque接口来“模拟”一个Stack了。

当我们把Deque作为Stack使用时，注意只调用push()/pop()/peek()方法，不要调用addFirst()/removeFirst()/peekFirst()方法，这样代码更加清晰。

栈（Stack）是一种后进先出（LIFO）的数据结构，操作栈的元素的方法有：

把元素压栈：push(E)；
把栈顶的元素“弹出”：pop(E)；
取栈顶元素但不弹出：peek(E)。
在Java中，我们用Deque可以实现Stack的功能，注意只调用push()/pop()/peek()方法，避免调用Deque的其他方法。

最后，不要使用遗留类Stack。