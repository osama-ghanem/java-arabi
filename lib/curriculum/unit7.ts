import type { Unit } from "./types";

export const unit7: Unit = {
  id: 7,
  title: "الدوال Methods",
  description: "قسّم برنامجك إلى أجزاء صغيرة قابلة لإعادة الاستخدام.",
  lessons: [
    {
      slug: "method-basics",
      title: "إنشاء الدالة واستدعاؤها",
      description: "دالة بدون معطيات وبدون قيمة مرجعة.",
      explanation: [
        "الدالة (Method) مجموعة أوامر لها اسم. نكتبها مرة ونستدعيها كلما احتجنا. صيغتها: static void اسم() { ... }. و void تعني أنها لا ترجع قيمة.",
        "الدالة لا تعمل إلا عند استدعائها بكتابة اسمها وأقواس: sayHello();",
      ],
      goals: ["تعريف دالة", "استدعاؤها من main", "فهم فائدة تكرار الاستخدام"],
      code: `public class Main {
    static void sayHello() {
        System.out.println("مرحبًا!");
    }

    public static void main(String[] args) {
        sayHello();
        sayHello();
    }
}`,
      lineByLine: [
        { line: "static void sayHello() {", explain: "نعرّف دالة اسمها sayHello. static كي نستدعيها من main مباشرة، void لا ترجع قيمة." },
        { line: 'System.out.println("مرحبًا!");', explain: "جسم الدالة." },
        { line: "}", explain: "نهاية الدالة." },
        { line: "public static void main(String[] args) {", explain: "نقطة البداية." },
        { line: "sayHello();", explain: "الاستدعاء الأول." },
        { line: "sayHello();", explain: "الاستدعاء الثاني: نفس الكود بدون إعادة كتابته." },
      ],
      output: `مرحبًا!
مرحبًا!`,
      mistakes: [
        "تعريف الدالة داخل main (غير مسموح).",
        "نسيان الأقواس عند الاستدعاء: sayHello;",
        "نسيان static عند استدعائها من main.",
      ],
      exercise: {
        prompt: "اكتب دالة printLine تطبع «----------» واستدعها مرتين.",
        starter: `public class Main {
    public static void main(String[] args) {

    }
}`,
        hint: "اكتب الدالة خارج main وداخل الكلاس.",
        solution: `public class Main {
    static void printLine() {
        System.out.println("----------");
    }

    public static void main(String[] args) {
        printLine();
        printLine();
    }
}`,
      },
      quiz: {
        q: "ماذا تعني void في تعريف دالة؟",
        options: ["ترجع نصًا", "لا ترجع قيمة", "خاصة", "ثابتة"],
        answer: 1,
        why: "void تعني أن الدالة تنفّذ عملًا ولا تُرجع نتيجة.",
      },
    },
    {
      slug: "params-return",
      title: "Parameters وReturn واستقبال أكثر من قيمة",
      description: "دوال تستقبل معطيات وتُرجع نتيجة.",
      explanation: [
        "المعطيات (Parameters) قيم نمرّرها للدالة داخل الأقواس مع تحديد نوع كل واحدة: static int add(int a, int b). والقيمة المرجعة تُرسل بـ return ويجب أن يطابق نوعها النوع المكتوب قبل اسم الدالة.",
        "الفرق: دالة void تنفذ عملًا فقط (مثل الطباعة). دالة بنوع (int, String...) تحسب وترجع نتيجة يمكن تخزينها في متغير.",
      ],
      goals: ["تمرير معطيات", "إرجاع قيمة بـ return", "الفرق بين void والدالة المرجعة"],
      code: `public class Main {
    static int add(int a, int b) {
        return a + b;
    }

    static void greet(String name) {
        System.out.println("أهلًا " + name);
    }

    public static void main(String[] args) {
        int result = add(3, 4);
        System.out.println(result);
        greet("Lina");
    }
}`,
      lineByLine: [
        { line: "static int add(int a, int b) {", explain: "دالة ترجع int وتستقبل رقمين a وb." },
        { line: "return a + b;", explain: "تُرجع مجموعهما وتنهي الدالة." },
        { line: "static void greet(String name) {", explain: "دالة void تستقبل نصًا." },
        { line: 'System.out.println("أهلًا " + name);', explain: "تطبع ولا ترجع شيئًا." },
        { line: "int result = add(3, 4);", explain: "نستدعي add ونخزن الناتج 7 في result." },
        { line: 'greet("Lina");', explain: "نمرر النص إلى greet." },
      ],
      output: `7
أهلًا Lina`,
      mistakes: [
        "عدم كتابة return في دالة نوعها غير void.",
        "تمرير عدد أو نوع معطيات مختلف عن التعريف.",
        "كتابة كود بعد return لن يُنفَّذ أبدًا.",
      ],
      exercise: {
        prompt: "اكتب دالة multiply تستقبل رقمين وترجع حاصل ضربهما، ثم اطبع multiply(6, 7).",
        starter: `public class Main {
    public static void main(String[] args) {

    }
}`,
        hint: "static int multiply(int a, int b) { return a * b; }",
        solution: `public class Main {
    static int multiply(int a, int b) {
        return a * b;
    }

    public static void main(String[] args) {
        System.out.println(multiply(6, 7));
    }
}`,
      },
      quiz: {
        q: "ماذا تفعل return؟",
        options: ["تطبع قيمة", "ترجع قيمة وتنهي الدالة", "تكرر الدالة", "تحذف المتغير"],
        answer: 1,
        why: "return ترسل النتيجة لمن استدعى الدالة وتنهي تنفيذها.",
      },
    },
    {
      slug: "overloading",
      title: "Overloading: تعدد الدوال بنفس الاسم",
      description: "دوال بنفس الاسم لكن بمعطيات مختلفة.",
      explanation: [
        "Overloading هو أن نعرّف عدة دوال بنفس الاسم بشرط اختلاف عدد المعطيات أو أنواعها. Java تختار الدالة المناسبة بحسب ما تمرره.",
        "لا يكفي اختلاف نوع القيمة المرجعة وحدها لإنشاء Overloading.",
      ],
      goals: ["فهم Overloading", "كتابة دالتين بنفس الاسم"],
      code: `public class Main {
    static int sum(int a, int b) {
        return a + b;
    }

    static int sum(int a, int b, int c) {
        return a + b + c;
    }

    static double sum(double a, double b) {
        return a + b;
    }

    public static void main(String[] args) {
        System.out.println(sum(1, 2));
        System.out.println(sum(1, 2, 3));
        System.out.println(sum(1.5, 2.5));
    }
}`,
      lineByLine: [
        { line: "static int sum(int a, int b) {", explain: "النسخة الأولى: رقمان صحيحان." },
        { line: "static int sum(int a, int b, int c) {", explain: "النسخة الثانية: ثلاثة أرقام." },
        { line: "static double sum(double a, double b) {", explain: "النسخة الثالثة: رقمان عشريان." },
        { line: "System.out.println(sum(1, 2));", explain: "تُستدعى النسخة الأولى → 3." },
        { line: "System.out.println(sum(1, 2, 3));", explain: "تُستدعى الثانية → 6." },
        { line: "System.out.println(sum(1.5, 2.5));", explain: "تُستدعى الثالثة → 4.0." },
      ],
      output: `3
6
4.0`,
      mistakes: [
        "تغيير نوع الإرجاع فقط والإبقاء على نفس المعطيات (لا يعتبر Overloading).",
        "استدعاء بمعطيات لا تطابق أي نسخة.",
      ],
      exercise: {
        prompt: "اكتب دالتين باسم show: الأولى تستقبل int والثانية String، وكل منهما تطبع القيمة. استدعهما.",
        starter: `public class Main {
    public static void main(String[] args) {

    }
}`,
        hint: "static void show(int x) و static void show(String s)",
        solution: `public class Main {
    static void show(int x) {
        System.out.println(x);
    }

    static void show(String s) {
        System.out.println(s);
    }

    public static void main(String[] args) {
        show(5);
        show("Java");
    }
}`,
      },
      quiz: {
        q: "ما الذي يجب أن يختلف في Overloading؟",
        options: ["اسم الدالة", "المعطيات (العدد أو النوع)", "اسم الكلاس", "لا شيء"],
        answer: 1,
        why: "الاسم يبقى واحدًا وتختلف قائمة المعطيات.",
      },
    },
  ],
};
