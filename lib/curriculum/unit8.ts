import type { Unit } from "./types";

export const unit8: Unit = {
  id: 8,
  title: "البرمجة الكائنية OOP",
  description: "ابنِ برامج منظمة باستخدام الكلاسات والكائنات.",
  lessons: [
    {
      slug: "class-object",
      title: "Class وObject وConstructor",
      description: "التصميم والنسخة، والـ Attributes والـ Methods.",
      explanation: [
        "الـ Class قالب (تصميم) يحدد الخصائص (Attributes) والسلوك (Methods). والـ Object نسخة حقيقية من القالب نصنعها بكلمة new.",
        "الـ Constructor دالة خاصة بنفس اسم الكلاس، تُنفَّذ تلقائيًا عند إنشاء الكائن، وتُستخدم لإعطاء القيم الابتدائية. وكلمة this تشير إلى الكائن الحالي.",
      ],
      goals: ["تعريف class بخصائص ودوال", "إنشاء كائنات", "كتابة constructor"],
      code: `class Student {
    String name;
    int age;

    Student(String name, int age) {
        this.name = name;
        this.age = age;
    }

    void introduce() {
        System.out.println("أنا " + name + " وعمري " + age);
    }
}

public class Main {
    public static void main(String[] args) {
        Student s1 = new Student("Omar", 20);
        Student s2 = new Student("Lina", 22);
        s1.introduce();
        s2.introduce();
    }
}`,
      lineByLine: [
        { line: "class Student {", explain: "نعرّف قالب الطالب." },
        { line: "String name;", explain: "خاصية (Attribute): اسم الطالب." },
        { line: "int age;", explain: "خاصية: عمره." },
        { line: "Student(String name, int age) {", explain: "Constructor: بدون نوع إرجاع وباسم الكلاس." },
        { line: "this.name = name;", explain: "this.name هي خاصية الكائن، وname هي المعطى. نخزّن القيمة داخل الكائن." },
        { line: "void introduce() {", explain: "دالة داخل الكلاس (سلوك الكائن)." },
        { line: 'Student s1 = new Student("Omar", 20);', explain: "ننشئ كائنًا بـ new ونخزنه في s1." },
        { line: "s1.introduce();", explain: "نستدعي دالة الكائن بالنقطة." },
      ],
      output: `أنا Omar وعمري 20
أنا Lina وعمري 22`,
      mistakes: [
        "نسيان new عند إنشاء الكائن.",
        "كتابة نوع إرجاع للـ constructor (يصبح دالة عادية).",
        "نسيان this فتُسند القيمة إلى نفسها.",
      ],
      exercise: {
        prompt: "أنشئ class اسمه Car فيه خاصية brand، وconstructor، ودالة show تطبع الماركة. أنشئ كائنًا واستدعِ show.",
        starter: `public class Main {
    public static void main(String[] args) {

    }
}`,
        hint: "اكتب class Car خارج Main قبله أو بعده.",
        solution: `class Car {
    String brand;

    Car(String brand) {
        this.brand = brand;
    }

    void show() {
        System.out.println(brand);
    }
}

public class Main {
    public static void main(String[] args) {
        Car c = new Car("Toyota");
        c.show();
    }
}`,
      },
      quiz: {
        q: "ما وظيفة الـ constructor؟",
        options: ["حذف الكائن", "إعطاء القيم الابتدائية عند إنشاء الكائن", "طباعة النتائج", "تكرار الدالة"],
        answer: 1,
        why: "يُنفَّذ تلقائيًا مع new لتجهيز الكائن بقيمه الأولى.",
      },
    },
    {
      slug: "encapsulation",
      title: "Encapsulation وGetters وSetters",
      description: "إخفاء البيانات وحمايتها.",
      explanation: [
        "التغليف (Encapsulation) يعني جعل الخصائص private حتى لا يغيّرها أحد من الخارج بشكل عشوائي، ونتيح الوصول لها عبر دوال: Getter لقراءة القيمة وSetter لتعديلها مع إمكانية التحقق من صحتها.",
      ],
      goals: ["استخدام private", "كتابة getter وsetter", "التحقق من القيم داخل setter"],
      code: `class Account {
    private double balance;

    public double getBalance() {
        return balance;
    }

    public void setBalance(double balance) {
        if (balance >= 0) {
            this.balance = balance;
        } else {
            System.out.println("رصيد غير صالح");
        }
    }
}

public class Main {
    public static void main(String[] args) {
        Account acc = new Account();
        acc.setBalance(500);
        acc.setBalance(-10);
        System.out.println(acc.getBalance());
    }
}`,
      lineByLine: [
        { line: "private double balance;", explain: "private: لا يمكن الوصول للخاصية من خارج الكلاس." },
        { line: "public double getBalance() {", explain: "Getter: يسمح بقراءة الرصيد." },
        { line: "public void setBalance(double balance) {", explain: "Setter: يسمح بالتعديل." },
        { line: "if (balance >= 0) {", explain: "نتحقق أن القيمة غير سالبة قبل القبول." },
        { line: "acc.setBalance(500);", explain: "قيمة صحيحة فتُحفظ." },
        { line: "acc.setBalance(-10);", explain: "قيمة مرفوضة فتُطبع رسالة الخطأ." },
      ],
      output: `رصيد غير صالح
500.0`,
      mistakes: [
        "جعل كل شيء public وفقدان الحماية.",
        "محاولة الوصول لخاصية private مباشرة من Main (خطأ ترجمة).",
        "كتابة getter بنوع إرجاع void.",
      ],
      exercise: {
        prompt: "أنشئ class Person فيه name خاصة، مع getName وsetName، ثم جرّبه.",
        starter: `public class Main {
    public static void main(String[] args) {

    }
}`,
        hint: "private String name; ثم دالتان عامتان.",
        solution: `class Person {
    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}

public class Main {
    public static void main(String[] args) {
        Person p = new Person();
        p.setName("Huda");
        System.out.println(p.getName());
    }
}`,
      },
      quiz: {
        q: "ما فائدة جعل الخاصية private؟",
        options: ["تسريع البرنامج", "حمايتها من التعديل المباشر من خارج الكلاس", "تحويلها لنص", "حذفها"],
        answer: 1,
        why: "تمنع الوصول المباشر وتجبر الجميع على استخدام getter/setter.",
      },
    },
    {
      slug: "inheritance-polymorphism",
      title: "Inheritance وPolymorphism",
      description: "الوراثة وتعدد الأشكال.",
      explanation: [
        "الوراثة (Inheritance): كلاس ابن يأخذ خصائص ودوال الكلاس الأب بكلمة extends، ونتجنب تكرار الكود. super تستدعي الأب.",
        "تعدد الأشكال (Polymorphism): نتعامل مع الكائنات الابنة كأنها من نوع الأب، وتُنفَّذ نسخة الابن المعدّلة (Override) تلقائيًا.",
      ],
      goals: ["استخدام extends", "تعديل دالة بـ @Override", "فهم Polymorphism"],
      code: `class Animal {
    void sound() {
        System.out.println("صوت حيوان");
    }
}

class Cat extends Animal {
    @Override
    void sound() {
        System.out.println("مواء");
    }
}

class Dog extends Animal {
    @Override
    void sound() {
        System.out.println("نباح");
    }
}

public class Main {
    public static void main(String[] args) {
        Animal a1 = new Cat();
        Animal a2 = new Dog();
        a1.sound();
        a2.sound();
    }
}`,
      lineByLine: [
        { line: "class Cat extends Animal {", explain: "Cat ترث كل شيء من Animal." },
        { line: "@Override", explain: "نخبر Java أننا نعدّل دالة موجودة في الأب." },
        { line: 'System.out.println("مواء");', explain: "السلوك الخاص بالقطة." },
        { line: "Animal a1 = new Cat();", explain: "متغير من نوع الأب يحمل كائنًا ابنًا." },
        { line: "a1.sound();", explain: "تُنفَّذ نسخة Cat وليس Animal: هذا هو Polymorphism." },
      ],
      output: `مواء
نباح`,
      mistakes: [
        "نسيان extends.",
        "محاولة وراثة أكثر من كلاس واحد (Java لا تسمح).",
        "كتابة دالة بنفس الاسم لكن بمعطيات مختلفة وتوقعها Override (هذا Overload).",
      ],
      exercise: {
        prompt: "أنشئ class Shape فيه دالة draw تطبع «شكل»، وclass Circle يرثه ويعدل draw لتطبع «دائرة».",
        starter: `public class Main {
    public static void main(String[] args) {

    }
}`,
        hint: "Circle extends Shape مع @Override.",
        solution: `class Shape {
    void draw() {
        System.out.println("شكل");
    }
}

class Circle extends Shape {
    @Override
    void draw() {
        System.out.println("دائرة");
    }
}

public class Main {
    public static void main(String[] args) {
        Shape s = new Circle();
        s.draw();
    }
}`,
      },
      quiz: {
        q: "أي كلمة تُستخدم للوراثة؟",
        options: ["implements", "extends", "inherits", "super class"],
        answer: 1,
        why: "extends تجعل الكلاس الابن يرث من الأب. أما implements فللواجهات.",
      },
    },
    {
      slug: "abstraction-interfaces",
      title: "Abstraction وInterfaces",
      description: "التجريد والواجهات.",
      explanation: [
        "الكلاس المجرّد (abstract class) لا يمكن إنشاء كائن منه، ويحتوي دوال بدون جسم يجب على الأبناء تنفيذها.",
        "الواجهة (interface) عقد يحدد الدوال المطلوبة فقط. الكلاس ينفذها بكلمة implements ويمكنه تنفيذ أكثر من واجهة.",
      ],
      goals: ["كتابة abstract class", "كتابة interface وتنفيذها", "فهم الفرق بينهما"],
      code: `abstract class Shape {
    abstract double area();
}

class Rectangle extends Shape {
    double w = 4, h = 5;
    double area() {
        return w * h;
    }
}

interface Printable {
    void print();
}

class Report implements Printable {
    public void print() {
        System.out.println("طباعة التقرير");
    }
}

public class Main {
    public static void main(String[] args) {
        Shape s = new Rectangle();
        System.out.println(s.area());
        Printable p = new Report();
        p.print();
    }
}`,
      lineByLine: [
        { line: "abstract class Shape {", explain: "كلاس مجرّد: لا نستطيع عمل new Shape()." },
        { line: "abstract double area();", explain: "دالة بدون جسم يجب أن يكتبها الابن." },
        { line: "class Rectangle extends Shape {", explain: "ابن ينفذ الدالة المجردة." },
        { line: "interface Printable {", explain: "واجهة: تعلن عن دالة print فقط." },
        { line: "class Report implements Printable {", explain: "الكلاس يلتزم بتنفيذ دوال الواجهة." },
        { line: "public void print() {", explain: "دوال الواجهة public دائمًا عند التنفيذ." },
      ],
      output: `20.0
طباعة التقرير`,
      mistakes: [
        "محاولة إنشاء كائن من abstract class أو interface.",
        "نسيان تنفيذ دالة مجردة في الابن.",
        "نسيان كلمة public عند تنفيذ دالة الواجهة.",
      ],
      exercise: {
        prompt: "أنشئ interface اسمه Greeter فيه دالة greet، وكلاس EnglishGreeter ينفذه ويطبع Hello.",
        starter: `public class Main {
    public static void main(String[] args) {

    }
}`,
        hint: "class EnglishGreeter implements Greeter",
        solution: `interface Greeter {
    void greet();
}

class EnglishGreeter implements Greeter {
    public void greet() {
        System.out.println("Hello");
    }
}

public class Main {
    public static void main(String[] args) {
        Greeter g = new EnglishGreeter();
        g.greet();
    }
}`,
      },
      quiz: {
        q: "هل يمكن إنشاء كائن من interface مباشرة؟",
        options: ["نعم دائمًا", "لا، نحتاج كلاسًا ينفذها", "فقط داخل main", "فقط إن كانت public"],
        answer: 1,
        why: "الواجهة تصف السلوك فقط، ولا بد من كلاس ينفذه لإنشاء كائن.",
      },
    },
  ],
};
