通过继承,子类只需要编写额外的功能，不再需要重复代码
 注意：子类自动获得了父类的所有字段，严禁定义与父类重名的字段！

 Java只允许一个class继承自一个类，因此，一个类有且仅有一个父类。只有Object特殊，它没有父类。


 protected
继承有个特点，就是子类无法访问父类的private字段或者private方法。例如，Student类就无法访问Person类的name和age字段：

class Person {
    private String name;
    private int age;
}

class Student extends Person {
    public String hello() {
        return "Hello, " + name; // 编译错误：无法访问name字段
    }
}
这使得继承的作用被削弱了。为了让子类可以访问父类的字段，我们需要把private改为protected。用protected修饰的字段可以被子类访问：

class Person {
    protected String name;
    protected int age;
}

class Student extends Person {
    public String hello() {
        return "Hello, " + name; // OK!
    }
}
因此，protected关键字可以把字段和方法的访问权限控制在继承树内部，一个protected字段和方法可以被其子类，以及子类的子类所访问


在Java中，任何class的构造方法，第一行语句必须是调用父类的构造方法。如果没有明确地调用父类的构造方法，编译器会帮我们自动加一句super();

因此我们得出结论：如果父类没有默认的构造方法，子类就必须显式调用super()并给出参数以便让编译器定位到父类的一个合适的构造方法。

这里还顺带引出了另一个问题：即子类不会继承任何父类的构造方法。子类默认的构造方法是编译器自动生成的，不是继承的。

阻止继承
正常情况下，只要某个class没有final修饰符，那么任何类都可以从该class继承。

从Java 15开始，允许使用sealed修饰class，并通过permits明确写出能够从该class继承的子类名称。

向上转型
如果一个引用变量的类型是Student，那么它可以指向一个Student类型的实例：

Student s = new Student();
如果一个引用类型的变量是Person，那么它可以指向一个Person类型的实例：

Person p = new Person();
现在问题来了：如果Student是从Person继承下来的，那么，一个引用类型为Person的变量，能否指向Student类型的实例？

Person p = new Student(); // ???
测试一下就可以发现，这种指向是允许的！

这是因为Student继承自Person，因此，它拥有Person的全部功能。Person类型的变量，如果指向Student类型的实例，对它进行操作，是没有问题的！

这种把一个子类类型安全地变为父类类型的赋值，被称为向上转型（upcasting）。

向上转型实际上是把一个子类型安全地变为更加抽象的父类型：

Student s = new Student();
Person p = s; // upcasting, ok
Object o1 = p; // upcasting, ok
Object o2 = s; // upcasting, ok
注意到继承树是Student > Person > Object，所以，可以把Student类型转型为Person，或者更高层次的Object。


向下转型
和向上转型相反，如果把一个父类类型强制转型为子类类型，就是向下转型（downcasting）。例如：

Person p1 = new Student(); // upcasting, ok
Person p2 = new Person();
Student s1 = (Student) p1; // ok
Student s2 = (Student) p2; // runtime error! ClassCastException!
如果测试上面的代码，可以发现：

Person类型p1实际指向Student实例，Person类型变量p2实际指向Person实例。在向下转型的时候，把p1转型为Student会成功，因为p1确实指向Student实例，把p2转型为Student会失败，因为p2的实际类型是Person，不能把父类变为子类，因为子类功能比父类多，多的功能无法凭空变出来。

因此，向下转型很可能会失败。失败的时候，Java虚拟机会报ClassCastException。

为了避免向下转型出错，Java提供了instanceof操作符，可以先判断一个实例究竟是不是某种类型：

Person p = new Person();
System.out.println(p instanceof Person); // true
System.out.println(p instanceof Student); // false

Student s = new Student();
System.out.println(s instanceof Person); // true
System.out.println(s instanceof Student); // true

Student n = null;
System.out.println(n instanceof Student); // false
instanceof实际上判断一个变量所指向的实例是否是指定类型，或者这个类型的子类。如果一个引用变量为null，那么对任何instanceof的判断都为false。

利用instanceof，在向下转型前可以先判断：

Person p = new Student();
if (p instanceof Student) {
    // 只有判断成功才会向下转型:
    Student s = (Student) p; // 一定会成功
}
从Java 14开始，判断instanceof后，可以直接转型为指定变量，避免再次强制转型。例如，对于以下代码：

Object obj = "hello";
if (obj instanceof String) {
    String s = (String) obj;
    System.out.println(s.toUpperCase());
}
可以改写如下：

// instanceof variable:
public class Main {
    public static void main(String[] args) {
        Object obj = "hello";
        if (obj instanceof String s) {
            // 可以直接使用变量s:
            System.out.println(s.toUpperCase());
        }
    }
}

区分继承和组合
在使用继承时，我们要注意逻辑一致性。

考察下面的Book类：

class Book {
    protected String name;
    public String getName() {...}
    public void setName(String name) {...}
}
这个Book类也有name字段，那么，我们能不能让Student继承自Book呢？

class Student extends Book {
    protected int score;
}
显然，从逻辑上讲，这是不合理的，Student不应该从Book继承，而应该从Person继承。

究其原因，是因为Student是Person的一种，它们是is关系，而Student并不是Book。实际上Student和Book的关系是has关系。

具有has关系不应该使用继承，而是使用组合，即Student可以持有一个Book实例：

class Student extends Person {
    protected Book book;
    protected int score;
}
因此，继承是is关系，组合是has关系。









小结
继承是面向对象编程的一种强大的代码复用方式；

Java只允许单继承，所有类最终的根类是Object；

protected允许子类访问父类的字段和方法；

子类的构造方法可以通过super()调用父类的构造方法；

可以安全地向上转型为更抽象的类型；

可以强制向下转型，最好借助instanceof判断；

子类和父类的关系是is，has关系不能用继承。