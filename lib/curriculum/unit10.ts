import type { Unit } from "./types";

export const unit10: Unit = {
  id: 10,
  title: "مشاريع تطبيقية",
  description: "اجمع كل ما تعلمته في مشاريع صغيرة حقيقية.",
  lessons: [
    {
      slug: "project-calculator",
      title: "مشروع: آلة حاسبة",
      description: "آلة حاسبة بدوال وswitch ومعالجة القسمة على صفر.",
      explanation: [
        "سنبني آلة حاسبة تستقبل رقمين وعملية (+ - * /) وتعيد النتيجة. نستخدم دالة calculate وswitch على العملية، ونعالج القسمة على صفر.",
        "الفكرة تجمع: الدوال، switch، الشروط، ومعالجة الأخطاء. في النسخة الكاملة يمكنك إضافة Scanner لقراءة الأرقام من المستخدم.",
      ],
      goals: ["دمج الدوال وswitch والشروط", "معالجة حالة القسمة على صفر"],
      code: `public class Main {
    static String calculate(double a, double b, char op) {
        switch (op) {
            case '+': return String.valueOf(a + b);
            case '-': return String.valueOf(a - b);
            case '*': return String.valueOf(a * b);
            case '/':
                if (b == 0) return "لا يمكن القسمة على صفر";
                return String.valueOf(a / b);
            default: return "عملية غير معروفة";
        }
    }

    public static void main(String[] args) {
        System.out.println(calculate(8, 2, '+'));
        System.out.println(calculate(8, 2, '/'));
        System.out.println(calculate(8, 0, '/'));
        System.out.println(calculate(8, 2, '%'));
    }
}`,
      lineByLine: [
        { line: "static String calculate(double a, double b, char op) {", explain: "دالة ترجع نصًا وتستقبل رقمين والعملية كحرف." },
        { line: "switch (op) {", explain: "نختار الحالة بحسب الحرف." },
        { line: "case '+': return String.valueOf(a + b);", explain: "نجمع ونحوّل الناتج لنص؛ return تنهي الدالة فلا نحتاج break." },
        { line: "if (b == 0) return \"لا يمكن القسمة على صفر\";", explain: "نحمي البرنامج من القسمة على صفر." },
        { line: 'default: return "عملية غير معروفة";', explain: "أي عملية أخرى." },
        { line: "System.out.println(calculate(8, 2, '+'));", explain: "نجرب العمليات." },
      ],
      output: `10.0
4.0
لا يمكن القسمة على صفر
عملية غير معروفة`,
      mistakes: [
        "نسيان default.",
        "استخدام \"+\" نصًا بدل '+' حرفًا مع switch على char.",
        "نسيان فحص القسمة على صفر.",
      ],
      exercise: {
        prompt: "أضف عملية '%' التي ترجع باقي القسمة إلى الآلة الحاسبة.",
        starter: `public class Main {
    static String calculate(double a, double b, char op) {
        switch (op) {
            case '+': return String.valueOf(a + b);
            default: return "عملية غير معروفة";
        }
    }

    public static void main(String[] args) {
        System.out.println(calculate(9, 4, '%'));
    }
}`,
        hint: "case '%': return String.valueOf(a % b);",
        solution: `public class Main {
    static String calculate(double a, double b, char op) {
        switch (op) {
            case '+': return String.valueOf(a + b);
            case '%': return String.valueOf(a % b);
            default: return "عملية غير معروفة";
        }
    }

    public static void main(String[] args) {
        System.out.println(calculate(9, 4, '%'));
    }
}`,
      },
      quiz: {
        q: "لماذا فحصنا b == 0 قبل القسمة؟",
        options: ["لتسريع البرنامج", "لتجنب القسمة على صفر ورسالة خطأ واضحة", "لأن switch تطلب ذلك", "لا سبب"],
        answer: 1,
        why: "الفحص المسبق يمنع الخطأ ويعطي المستخدم رسالة مفهومة.",
      },
    },
    {
      slug: "project-age",
      title: "مشروع: برنامج حساب العمر",
      description: "حساب العمر من سنة الميلاد مع تحقق من المدخلات.",
      explanation: [
        "نحسب العمر بطرح سنة الميلاد من السنة الحالية، ونتحقق أن السنة منطقية (ليست في المستقبل وليست قديمة جدًا). ثم نصنّف الشخص (طفل / شاب / بالغ).",
      ],
      goals: ["استخدام الشروط والدوال معًا", "التحقق من صحة المدخلات"],
      code: `public class Main {
    static void showAge(int birthYear, int currentYear) {
        if (birthYear > currentYear || birthYear < 1900) {
            System.out.println("سنة ميلاد غير صالحة");
            return;
        }
        int age = currentYear - birthYear;
        String group;
        if (age < 13) {
            group = "طفل";
        } else if (age < 18) {
            group = "مراهق";
        } else {
            group = "بالغ";
        }
        System.out.println("العمر: " + age + " (" + group + ")");
    }

    public static void main(String[] args) {
        showAge(2000, 2026);
        showAge(2018, 2026);
        showAge(2030, 2026);
    }
}`,
      lineByLine: [
        { line: "static void showAge(int birthYear, int currentYear) {", explain: "دالة تستقبل سنتين." },
        { line: "if (birthYear > currentYear || birthYear < 1900) {", explain: "تحقق: سنة الميلاد لا تكون مستقبلية ولا قبل 1900." },
        { line: "return;", explain: "في دالة void نستخدم return لإنهاء الدالة مبكرًا." },
        { line: "int age = currentYear - birthYear;", explain: "نحسب العمر." },
        { line: "String group;", explain: "نعلن متغيرًا نصيًا ونعطيه قيمة في الفروع." },
        { line: 'System.out.println("العمر: " + age + " (" + group + ")");', explain: "نطبع العمر مع التصنيف." },
      ],
      output: `العمر: 26 (بالغ)
العمر: 8 (طفل)
سنة ميلاد غير صالحة`,
      mistakes: [
        "نسيان التحقق من المدخلات.",
        "استخدام group قبل إعطائه قيمة في كل الفروع.",
        "الخلط في ترتيب شروط العمر.",
      ],
      exercise: {
        prompt: "عدّل البرنامج ليطبع «كبير سن» إذا كان العمر 60 أو أكثر.",
        starter: `public class Main {
    public static void main(String[] args) {
        int age = 65;

    }
}`,
        hint: "else if (age >= 60)",
        solution: `public class Main {
    public static void main(String[] args) {
        int age = 65;
        if (age >= 60) {
            System.out.println("كبير سن");
        } else {
            System.out.println("أقل من 60");
        }
    }
}`,
      },
      quiz: {
        q: "ماذا تفعل return; داخل دالة void؟",
        options: ["ترجع رقمًا", "تنهي الدالة مبكرًا", "تكرر الدالة", "تطبع نصًا"],
        answer: 1,
        why: "return بدون قيمة تنهي الدالة فورًا.",
      },
    },
    {
      slug: "project-students",
      title: "مشروع: نظام إدارة الطلاب",
      description: "كلاس Student وقائمة طلاب مع طباعة ومتوسط الدرجات.",
      explanation: [
        "نمثل الطالب بكلاس فيه الاسم والدرجة، ونخزن عدة طلاب في مصفوفة، ثم نمر عليهم لنطبع بياناتهم ونحسب المتوسط وأفضل طالب.",
      ],
      goals: ["دمج OOP مع المصفوفات والحلقات", "حساب المتوسط وأعلى قيمة"],
      code: `class Student {
    private String name;
    private int grade;

    Student(String name, int grade) {
        this.name = name;
        this.grade = grade;
    }

    String getName() { return name; }
    int getGrade() { return grade; }
}

public class Main {
    public static void main(String[] args) {
        Student[] students = {
            new Student("Ali", 80),
            new Student("Sara", 95),
            new Student("Omar", 70)
        };
        int total = 0;
        Student best = students[0];
        for (Student s : students) {
            System.out.println(s.getName() + ": " + s.getGrade());
            total += s.getGrade();
            if (s.getGrade() > best.getGrade()) {
                best = s;
            }
        }
        System.out.println("المتوسط: " + (total / students.length));
        System.out.println("الأفضل: " + best.getName());
    }
}`,
      lineByLine: [
        { line: "class Student {", explain: "قالب الطالب بخصائص خاصة (private)." },
        { line: "String getName() { return name; }", explain: "getter لقراءة الاسم." },
        { line: "Student[] students = {", explain: "مصفوفة كائنات من نوع Student." },
        { line: "for (Student s : students) {", explain: "نمر على كل طالب." },
        { line: "total += s.getGrade();", explain: "نجمع الدرجات." },
        { line: "if (s.getGrade() > best.getGrade()) {", explain: "نبحث عن أعلى درجة." },
        { line: 'System.out.println("المتوسط: " + (total / students.length));', explain: "المتوسط = المجموع ÷ العدد (قسمة صحيحة هنا)." },
      ],
      output: `Ali: 80
Sara: 95
Omar: 70
المتوسط: 81
الأفضل: Sara`,
      mistakes: [
        "نسيان new لكل عنصر في مصفوفة الكائنات (تبقى null).",
        "قسمة int على int وفقدان الكسور.",
        "الوصول لخاصية private مباشرة.",
      ],
      exercise: {
        prompt: "أضف طالبًا رابعًا اسمه Huda درجته 88 وشاهد كيف يتغير المتوسط.",
        starter: `class Student {
    String name;
    int grade;
    Student(String name, int grade) {
        this.name = name;
        this.grade = grade;
    }
}

public class Main {
    public static void main(String[] args) {
        Student[] students = {
            new Student("Ali", 80),
            new Student("Sara", 95)
        };
        int total = 0;
        for (Student s : students) {
            total += s.grade;
        }
        System.out.println(total / students.length);
    }
}`,
        hint: "أضف عنصرًا جديدًا إلى المصفوفة.",
        solution: `class Student {
    String name;
    int grade;
    Student(String name, int grade) {
        this.name = name;
        this.grade = grade;
    }
}

public class Main {
    public static void main(String[] args) {
        Student[] students = {
            new Student("Ali", 80),
            new Student("Sara", 95),
            new Student("Huda", 88)
        };
        int total = 0;
        for (Student s : students) {
            total += s.grade;
        }
        System.out.println(total / students.length);
    }
}`,
      },
      quiz: {
        q: "ما نوع المصفوفة التي تخزن كائنات Student؟",
        options: ["int[]", "String[]", "Student[]", "Object only"],
        answer: 2,
        why: "نوع المصفوفة يطابق نوع عناصرها: Student[].",
      },
    },
    {
      slug: "project-todo",
      title: "مشروع: برنامج قائمة مهام",
      description: "إضافة مهام وإنهاؤها وعرض القائمة باستخدام ArrayList.",
      explanation: [
        "ArrayList قائمة مرنة الحجم (على عكس المصفوفة). نستخدم add للإضافة وget للقراءة وsize للعدد. سنبني كلاس Task فيه العنوان وحالة الإنجاز.",
        "يحتاج استيراد المكتبة بالسطر: import java.util.ArrayList;",
      ],
      goals: ["استخدام ArrayList", "تمثيل المهمة ككلاس", "عرض القائمة بحالتها"],
      code: `import java.util.ArrayList;

class Task {
    String title;
    boolean done = false;
    Task(String title) { this.title = title; }
}

public class Main {
    public static void main(String[] args) {
        ArrayList<Task> tasks = new ArrayList<>();
        tasks.add(new Task("مذاكرة Java"));
        tasks.add(new Task("حل التمارين"));
        tasks.add(new Task("مراجعة الدرس"));
        tasks.get(0).done = true;

        for (int i = 0; i < tasks.size(); i++) {
            Task t = tasks.get(i);
            String mark = t.done ? "[x]" : "[ ]";
            System.out.println((i + 1) + ". " + mark + " " + t.title);
        }
    }
}`,
      lineByLine: [
        { line: "import java.util.ArrayList;", explain: "نستورد الكلاس من مكتبة Java." },
        { line: "boolean done = false;", explain: "قيمة افتراضية: المهمة غير منجزة." },
        { line: "ArrayList<Task> tasks = new ArrayList<>();", explain: "قائمة تحتوي كائنات Task." },
        { line: 'tasks.add(new Task("مذاكرة Java"));', explain: "نضيف مهمة جديدة للقائمة." },
        { line: "tasks.get(0).done = true;", explain: "نجلب أول مهمة ونعلّمها منجزة." },
        { line: 'String mark = t.done ? "[x]" : "[ ]";', explain: "المعامل الثلاثي: إذا كانت done صحيحة نأخذ [x] وإلا [ ]." },
      ],
      output: `1. [x] مذاكرة Java
2. [ ] حل التمارين
3. [ ] مراجعة الدرس`,
      mistakes: [
        "نسيان import فيظهر خطأ cannot find symbol.",
        "استخدام length بدل size() مع ArrayList.",
        "استخدام [] بدل get(i).",
      ],
      exercise: {
        prompt: "أضف مهمة رابعة وعلّم الثانية منجزة.",
        starter: `import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        ArrayList<String> items = new ArrayList<>();
        items.add("A");
        items.add("B");
        System.out.println(items.size());
    }
}`,
        hint: 'items.add("C"); ثم اطبع الحجم.',
        solution: `import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        ArrayList<String> items = new ArrayList<>();
        items.add("A");
        items.add("B");
        items.add("C");
        System.out.println(items.size());
    }
}`,
      },
      quiz: {
        q: "كيف نعرف عدد عناصر ArrayList؟",
        options: ["list.length", "list.length()", "list.size()", "list.count"],
        answer: 2,
        why: "الطريقة الصحيحة هي size().",
      },
    },
    {
      slug: "project-shop",
      title: "مشروع: برنامج متجر بسيط",
      description: "منتجات وسلة مشتريات وحساب الإجمالي مع الخصم.",
      explanation: [
        "نبني كلاس Product فيه الاسم والسعر والكمية، ونحسب الإجمالي، ثم نطبق خصمًا إذا تجاوز الإجمالي مبلغًا معينًا.",
      ],
      goals: ["دمج الكلاسات والحلقات والشروط", "حساب إجمالي وخصم"],
      code: `class Product {
    String name;
    double price;
    int qty;

    Product(String name, double price, int qty) {
        this.name = name;
        this.price = price;
        this.qty = qty;
    }

    double total() {
        return price * qty;
    }
}

public class Main {
    public static void main(String[] args) {
        Product[] cart = {
            new Product("قلم", 2.5, 4),
            new Product("دفتر", 10, 3),
            new Product("حقيبة", 65, 1)
        };
        double sum = 0;
        for (Product p : cart) {
            System.out.println(p.name + " × " + p.qty + " = " + p.total());
            sum += p.total();
        }
        if (sum > 100) {
            sum = sum * 0.9;
            System.out.println("تم تطبيق خصم 10%");
        }
        System.out.println("الإجمالي: " + sum);
    }
}`,
      lineByLine: [
        { line: "double total() {", explain: "دالة داخل Product تحسب السعر × الكمية." },
        { line: "Product[] cart = {", explain: "السلة مصفوفة منتجات." },
        { line: 'System.out.println(p.name + " × " + p.qty + " = " + p.total());', explain: "نطبع سطر الفاتورة لكل منتج." },
        { line: "sum += p.total();", explain: "نجمع الإجمالي." },
        { line: "if (sum > 100) {", explain: "إذا كان الإجمالي أكبر من 100 نطبق خصمًا." },
        { line: "sum = sum * 0.9;", explain: "ضرب في 0.9 يعني خصم 10%." },
      ],
      output: `قلم × 4 = 10.0
دفتر × 3 = 30.0
حقيبة × 1 = 65.0
تم تطبيق خصم 10%
الإجمالي: 94.5`,
      mistakes: [
        "خطأ في نسبة الخصم (0.1 بدل 0.9).",
        "استخدام int للأسعار العشرية.",
        "نسيان تصفير المجموع قبل الحلقة.",
      ],
      exercise: {
        prompt: "غيّر شرط الخصم ليصبح عندما يتجاوز الإجمالي 50 بدل 100.",
        starter: `public class Main {
    public static void main(String[] args) {
        double sum = 90;
        if (sum > 100) {
            sum = sum * 0.9;
        }
        System.out.println(sum);
    }
}`,
        hint: "غيّر الرقم في الشرط.",
        solution: `public class Main {
    public static void main(String[] args) {
        double sum = 90;
        if (sum > 50) {
            sum = sum * 0.9;
        }
        System.out.println(sum);
    }
}`,
      },
      quiz: {
        q: "كيف نخصم 20% من مبلغ sum؟",
        options: ["sum * 0.2", "sum * 0.8", "sum - 0.8", "sum / 20"],
        answer: 1,
        why: "الخصم 20% يعني دفع 80% من المبلغ، فنضرب في 0.8.",
      },
    },
    {
      slug: "project-registration",
      title: "مشروع: نظام تسجيل الطلاب في المواد",
      description: "ربط الطلاب بالمواد، منع التكرار، وحدّ أقصى للمواد.",
      explanation: [
        "نبني كلاس Student يحتفظ بقائمة موادّه، مع دالة enroll تتحقق من عدم التكرار ومن الحد الأقصى (3 مواد). هذا المشروع يجمع OOP وArrayList والشروط.",
      ],
      goals: ["إدارة علاقة طالب ↔ مواد", "تطبيق قواعد (حد أقصى، منع تكرار)"],
      code: `import java.util.ArrayList;

class Student {
    String name;
    ArrayList<String> courses = new ArrayList<>();

    Student(String name) { this.name = name; }

    void enroll(String course) {
        if (courses.contains(course)) {
            System.out.println("مسجّل مسبقًا في " + course);
        } else if (courses.size() >= 3) {
            System.out.println("وصلت للحد الأقصى (3 مواد)");
        } else {
            courses.add(course);
            System.out.println("تم تسجيل " + name + " في " + course);
        }
    }
}

public class Main {
    public static void main(String[] args) {
        Student s = new Student("Lina");
        s.enroll("Java");
        s.enroll("Java");
        s.enroll("Math");
        s.enroll("Physics");
        s.enroll("Art");
        System.out.println(s.courses);
    }
}`,
      lineByLine: [
        { line: "ArrayList<String> courses = new ArrayList<>();", explain: "قائمة نصوص لمواد الطالب." },
        { line: "if (courses.contains(course)) {", explain: "contains تفحص هل المادة موجودة." },
        { line: "} else if (courses.size() >= 3) {", explain: "نفحص الحد الأقصى." },
        { line: "courses.add(course);", explain: "نضيف المادة." },
        { line: 's.enroll("Java");', explain: "أول تسجيل ينجح." },
        { line: 's.enroll("Java");', explain: "تسجيل مكرر يُرفض." },
        { line: "System.out.println(s.courses);", explain: "طباعة القائمة مباشرة تعطي شكل [A, B, C]." },
      ],
      output: `تم تسجيل Lina في Java
مسجّل مسبقًا في Java
تم تسجيل Lina في Math
تم تسجيل Lina في Physics
وصلت للحد الأقصى (3 مواد)
[Java, Math, Physics]`,
      mistakes: [
        "نسيان فحص التكرار.",
        "استخدام == لمقارنة نصوص بدل contains/equals.",
        "نسيان تهيئة القائمة بـ new ArrayList<>() فتحدث NullPointerException.",
      ],
      exercise: {
        prompt: "اجعل الحد الأقصى 2 مواد بدل 3 وشاهد النتيجة.",
        starter: `import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        ArrayList<String> c = new ArrayList<>();
        c.add("Java");
        c.add("Math");
        if (c.size() >= 3) {
            System.out.println("ممتلئ");
        } else {
            System.out.println("متاح");
        }
    }
}`,
        hint: "غيّر 3 إلى 2.",
        solution: `import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        ArrayList<String> c = new ArrayList<>();
        c.add("Java");
        c.add("Math");
        if (c.size() >= 2) {
            System.out.println("ممتلئ");
        } else {
            System.out.println("متاح");
        }
    }
}`,
      },
      quiz: {
        q: "أي دالة تفحص وجود عنصر داخل ArrayList؟",
        options: ["has()", "contains()", "find()", "exists()"],
        answer: 1,
        why: "contains ترجع true إذا كان العنصر موجودًا.",
      },
    },
  ],
};
