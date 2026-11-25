import type { Lesson } from "./types";

const M = `public class Main {
    public static void main(String[] args) {

    }
}`;

export const extraUnit5: Lesson[] = [
  {
    slug: "factorial",
    title: "المضروب (Factorial) بحلقة",
    description: "حساب 5! = 5×4×3×2×1 باستخدام for.",
    explanation: ["المضروب لعدد n هو حاصل ضرب كل الأعداد من 1 إلى n. نبدأ بنتيجة 1 (وليس 0 لأن الضرب في الصفر يصفّر كل شيء) ثم نضرب في كل عدد داخل الحلقة."],
    goals: ["تجميع نتيجة ضرب داخل حلقة", "اختيار قيمة البداية الصحيحة"],
    code: `public class Main {
    public static void main(String[] args) {
        int n = 5;
        long result = 1;
        for (int i = 1; i <= n; i++) {
            result *= i;
        }
        System.out.println(n + "! = " + result);
    }
}`,
    lineByLine: [
      { line: "long result = 1;", explain: "نبدأ بـ 1 لأنه العنصر المحايد للضرب. استخدمنا long لأن النتيجة قد تكبر." },
      { line: "for (int i = 1; i <= n; i++) {", explain: "نمر على الأعداد من 1 إلى 5." },
      { line: "result *= i;", explain: "نضرب النتيجة في العدد الحالي." },
      { line: 'System.out.println(n + "! = " + result);', explain: "يطبع 5! = 120." },
    ],
    output: "5! = 120",
    mistakes: ["البدء بـ 0 فتصبح النتيجة صفرًا دائمًا.", "استخدام int لأعداد كبيرة فتحدث قيمة خاطئة (overflow).", "الحلقة من 0 بدل 1."],
    exercise: {
      prompt: "احسب مجموع الأعداد من 1 إلى 10 واطبعه.",
      starter: M,
      hint: "ابدأ sum بصفر وأضف i.",
      solution: `public class Main {
    public static void main(String[] args) {
        int sum = 0;
        for (int i = 1; i <= 10; i++) {
            sum += i;
        }
        System.out.println(sum);
    }
}`,
    },
    quiz: { q: "بأي قيمة نبدأ متغير المضروب؟", options: ["0", "1", "-1", "n"], answer: 1, why: "1 هو العنصر المحايد للضرب." },
  },
  {
    slug: "star-pattern",
    title: "رسم أشكال بالنجوم",
    description: "مثلث من النجوم باستخدام حلقتين متداخلتين.",
    explanation: ["الحلقة الخارجية تمثل الصفوف، والداخلية تمثل عدد النجوم في كل صف. نستخدم print لطباعة النجمة بدون سطر جديد، ثم println() فارغة بعد كل صف."],
    goals: ["استخدام حلقتين متداخلتين لرسم شكل", "التفرقة بين print وprintln"],
    code: `public class Main {
    public static void main(String[] args) {
        for (int row = 1; row <= 4; row++) {
            for (int star = 1; star <= row; star++) {
                System.out.print("*");
            }
            System.out.println();
        }
    }
}`,
    lineByLine: [
      { line: "for (int row = 1; row <= 4; row++) {", explain: "أربعة صفوف." },
      { line: "for (int star = 1; star <= row; star++) {", explain: "عدد النجوم يساوي رقم الصف." },
      { line: 'System.out.print("*");', explain: "نجمة بدون سطر جديد." },
      { line: "System.out.println();", explain: "ننزل لسطر جديد بعد انتهاء الصف." },
    ],
    output: `*
**
***
****`,
    mistakes: ["استخدام println داخل الحلقة الداخلية فتصبح كل نجمة في سطر.", "نسيان println() بعد الصف.", "استخدام <= row بدل < row فيتغير الشكل."],
    exercise: {
      prompt: "اطبع 3 صفوف، كل صف فيه 3 نجوم (مربع).",
      starter: M,
      hint: "اجعل الحلقة الداخلية <= 3 ثابتة.",
      solution: `public class Main {
    public static void main(String[] args) {
        for (int r = 1; r <= 3; r++) {
            for (int c = 1; c <= 3; c++) {
                System.out.print("*");
            }
            System.out.println();
        }
    }
}`,
    },
    quiz: { q: "أي دالة تطبع بدون سطر جديد؟", options: ["println", "print", "printf فقط", "write"], answer: 1, why: "print تبقي المؤشر في نفس السطر." },
  },
  {
    slug: "digits-sum",
    title: "جمع أرقام عدد بحلقة while",
    description: "استخدام % و/ لاستخراج الأرقام.",
    explanation: ["العدد % 10 يعطي آخر رقم، والعدد / 10 (قسمة صحيحة) يحذف آخر رقم. نكرر حتى يصبح العدد صفرًا."],
    goals: ["استخدام % 10 و/ 10", "كتابة while بشرط مناسب"],
    code: `public class Main {
    public static void main(String[] args) {
        int n = 1234;
        int sum = 0;
        while (n > 0) {
            sum += n % 10;
            n /= 10;
        }
        System.out.println(sum);
    }
}`,
    lineByLine: [
      { line: "int n = 1234;", explain: "العدد." },
      { line: "while (n > 0) {", explain: "نكرر ما دام هناك أرقام." },
      { line: "sum += n % 10;", explain: "نأخذ آخر رقم ونضيفه: 4 ثم 3 ثم 2 ثم 1." },
      { line: "n /= 10;", explain: "نحذف آخر رقم: 1234 ← 123 ← 12 ← 1 ← 0." },
      { line: "System.out.println(sum);", explain: "المجموع 10." },
    ],
    output: "10",
    mistakes: ["نسيان n /= 10 فتصبح حلقة لا نهائية.", "استخدام / بدل % لأخذ الرقم.", "تغيير n الأصلي وفقدانه إذا احتجته لاحقًا."],
    exercise: {
      prompt: "اطبع عدد أرقام العدد 98765 باستخدام while.",
      starter: M,
      hint: "كرر n /= 10 وزد عدادًا.",
      solution: `public class Main {
    public static void main(String[] args) {
        int n = 98765;
        int count = 0;
        while (n > 0) {
            count++;
            n /= 10;
        }
        System.out.println(count);
    }
}`,
    },
    quiz: { q: "ماذا يعطي 1234 % 10؟", options: ["123", "4", "1", "10"], answer: 1, why: "الباقي عند القسمة على 10 هو آخر رقم." },
  },
];

export const extraUnit6: Lesson[] = [
  {
    slug: "arrays-utils",
    title: "أدوات Arrays: الترتيب والطباعة",
    description: "Arrays.toString وArrays.sort.",
    explanation: ["طباعة مصفوفة مباشرة تعطي عنوانًا غريبًا في الذاكرة. استخدم Arrays.toString(arr) لتحصل على نص مقروء، وArrays.sort(arr) لترتيبها تصاعديًا. تحتاج السطر import java.util.Arrays;"],
    goals: ["طباعة مصفوفة بشكل صحيح", "ترتيب مصفوفة"],
    code: `import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        int[] nums = {5, 2, 9, 1};
        System.out.println(Arrays.toString(nums));
        Arrays.sort(nums);
        System.out.println(Arrays.toString(nums));
    }
}`,
    lineByLine: [
      { line: "import java.util.Arrays;", explain: "نستورد الكلاس من مكتبة Java." },
      { line: "int[] nums = {5, 2, 9, 1};", explain: "مصفوفة غير مرتبة." },
      { line: "System.out.println(Arrays.toString(nums));", explain: "تحوّلها إلى نص [5, 2, 9, 1]." },
      { line: "Arrays.sort(nums);", explain: "ترتب المصفوفة نفسها تصاعديًا." },
    ],
    output: `[5, 2, 9, 1]
[1, 2, 5, 9]`,
    mistakes: ["طباعة المصفوفة مباشرة (تظهر [I@... غريبة).", "نسيان import.", "توقع أن sort ترجع مصفوفة جديدة (بل تعدّل الأصلية)."],
    exercise: {
      prompt: "رتّب {30, 10, 20} واطبعها.",
      starter: M,
      hint: "import java.util.Arrays; ثم sort وtoString.",
      solution: `import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        int[] a = {30, 10, 20};
        Arrays.sort(a);
        System.out.println(Arrays.toString(a));
    }
}`,
    },
    quiz: { q: "أي دالة تحوّل المصفوفة إلى نص مقروء؟", options: ["Arrays.print", "Arrays.toString", "Arrays.text", "array.toText"], answer: 1, why: "Arrays.toString هي الدالة المخصصة لذلك." },
  },
  {
    slug: "array-average-min",
    title: "المتوسط وأصغر قيمة في مصفوفة",
    description: "تمرير على المصفوفة لحساب إحصائيات.",
    explanation: ["لحساب المتوسط نجمع كل العناصر ثم نقسم على الطول، ويجب تحويل أحد الطرفين إلى double حتى لا تُحذف الكسور. وللبحث عن الأصغر نبدأ بأول عنصر ونقارن."],
    goals: ["حساب المتوسط بدقة", "إيجاد أصغر قيمة"],
    code: `public class Main {
    public static void main(String[] args) {
        int[] marks = {70, 85, 90, 65};
        int sum = 0;
        int min = marks[0];
        for (int m : marks) {
            sum += m;
            if (m < min) {
                min = m;
            }
        }
        double avg = (double) sum / marks.length;
        System.out.println("المتوسط: " + avg);
        System.out.println("الأقل: " + min);
    }
}`,
    lineByLine: [
      { line: "int min = marks[0];", explain: "نبدأ بأول عنصر كأصغر قيمة مؤقتة." },
      { line: "for (int m : marks) {", explain: "نمر على كل درجة." },
      { line: "sum += m;", explain: "نجمع." },
      { line: "if (m < min) {", explain: "إذا وجدنا أصغر نحدّث min." },
      { line: "double avg = (double) sum / marks.length;", explain: "نحوّل المجموع إلى double ثم نقسم: 310 ÷ 4 = 77.5." },
    ],
    output: `المتوسط: 77.5
الأقل: 65`,
    mistakes: ["البدء بـ min = 0 فلا تجد أصغر منه.", "القسمة الصحيحة تحذف الكسر.", "تعريف min خارج النطاق."],
    exercise: {
      prompt: "اطبع أكبر قيمة في {4, 17, 9}.",
      starter: M,
      hint: "ابدأ بـ max = arr[0].",
      solution: `public class Main {
    public static void main(String[] args) {
        int[] a = {4, 17, 9};
        int max = a[0];
        for (int x : a) {
            if (x > max) max = x;
        }
        System.out.println(max);
    }
}`,
    },
    quiz: { q: "لماذا حوّلنا sum إلى double؟", options: ["لتسريع البرنامج", "لنحصل على كسر عشري", "لأنه إلزامي", "لتقليل الذاكرة"], answer: 1, why: "حتى لا تحذف القسمة الصحيحة الجزء العشري." },
  },
  {
    slug: "arraylist-intro",
    title: "القائمة ArrayList",
    description: "قائمة يتغير حجمها: add وget وremove وsize.",
    explanation: ["المصفوفة حجمها ثابت، أما ArrayList فتكبر وتصغر. نحدد نوع العناصر بين < >: ArrayList<String>. أهم الدوال: add للإضافة، get(i) للقراءة، remove(i) للحذف، size() للعدد، contains للبحث."],
    goals: ["إنشاء ArrayList", "الإضافة والحذف والقراءة"],
    code: `import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        ArrayList<String> names = new ArrayList<>();
        names.add("Ali");
        names.add("Sara");
        names.add("Omar");
        names.remove(1);
        System.out.println(names.size());
        System.out.println(names.get(1));
        System.out.println(names);
    }
}`,
    lineByLine: [
      { line: "ArrayList<String> names = new ArrayList<>();", explain: "قائمة نصوص فارغة." },
      { line: 'names.add("Ali");', explain: "نضيف عنصرًا في النهاية." },
      { line: "names.remove(1);", explain: "نحذف العنصر ذا الفهرس 1 وهو Sara." },
      { line: "System.out.println(names.size());", explain: "بقي عنصران." },
      { line: "System.out.println(names.get(1));", explain: "العنصر الثاني الآن Omar." },
    ],
    output: `2
Omar
[Ali, Omar]`,
    mistakes: ["استخدام length بدل size().", "استخدام [ ] بدل get().", "نسيان import java.util.ArrayList."],
    exercise: {
      prompt: "أنشئ قائمة أعداد Integer، أضف 1 و2 و3 واطبع حجمها.",
      starter: M,
      hint: "ArrayList<Integer> وليس int.",
      solution: `import java.util.ArrayList;

public class Main {
    public static void main(String[] args) {
        ArrayList<Integer> list = new ArrayList<>();
        list.add(1);
        list.add(2);
        list.add(3);
        System.out.println(list.size());
    }
}`,
    },
    quiz: { q: "كيف نعرف عدد عناصر ArrayList؟", options: ["length", "length()", "size()", "count()"], answer: 2, why: "الدالة الصحيحة size()." },
  },
];

export const extraUnit7: Lesson[] = [
  {
    slug: "recursion",
    title: "الاستدعاء الذاتي (Recursion)",
    description: "دالة تستدعي نفسها بشرط توقف.",
    explanation: ["الدالة الذاتية تحل مسألة كبيرة بتحويلها لمسألة أصغر من نفس النوع. يجب أن يكون لها حالة توقف (base case) وإلا لن تنتهي وسيحدث StackOverflowError."],
    goals: ["كتابة دالة ذاتية", "تحديد حالة التوقف"],
    code: `public class Main {
    static int factorial(int n) {
        if (n <= 1) {
            return 1;
        }
        return n * factorial(n - 1);
    }

    public static void main(String[] args) {
        System.out.println(factorial(5));
    }
}`,
    lineByLine: [
      { line: "static int factorial(int n) {", explain: "دالة تحسب المضروب." },
      { line: "if (n <= 1) {", explain: "حالة التوقف: مضروب 1 هو 1." },
      { line: "return n * factorial(n - 1);", explain: "n × مضروب (n-1): الدالة تستدعي نفسها بعدد أصغر." },
      { line: "System.out.println(factorial(5));", explain: "5×4×3×2×1 = 120." },
    ],
    output: "120",
    mistakes: ["نسيان حالة التوقف.", "عدم تصغير المعطى في كل استدعاء.", "استخدامها حيث تكفي حلقة بسيطة."],
    exercise: {
      prompt: "اكتب دالة ذاتية sum(n) ترجع مجموع الأعداد من 1 إلى n، واطبع sum(4).",
      starter: M,
      hint: "sum(n) = n + sum(n-1) وsum(0)=0",
      solution: `public class Main {
    static int sum(int n) {
        if (n == 0) return 0;
        return n + sum(n - 1);
    }

    public static void main(String[] args) {
        System.out.println(sum(4));
    }
}`,
    },
    quiz: { q: "ماذا يحدث بدون حالة توقف؟", options: ["تعمل عادي", "StackOverflowError", "تتوقف بصمت", "تعطي 0"], answer: 1, why: "تستمر الاستدعاءات حتى تمتلئ الذاكرة المخصصة فيحدث StackOverflowError." },
  },
  {
    slug: "variable-scope",
    title: "نطاق المتغير (Scope)",
    description: "أين يعيش المتغير وأين يموت؟",
    explanation: ["المتغير المعرّف داخل كتلة { } لا يُرى خارجها. متغيرات الدالة محلية لها ولا تراها دالة أخرى. ويمكن تعريف متغير داخل الكلاس خارج الدوال ليراه الجميع (سنراه في OOP)."],
    goals: ["فهم المتغير المحلي", "تجنب خطأ cannot find symbol"],
    code: `public class Main {
    static void show() {
        int local = 5;
        System.out.println(local);
    }

    public static void main(String[] args) {
        int x = 10;
        if (x > 5) {
            int inside = 1;
            System.out.println(inside + x);
        }
        show();
    }
}`,
    lineByLine: [
      { line: "int local = 5;", explain: "متغير يعيش داخل show فقط." },
      { line: "int x = 10;", explain: "متغير يعيش داخل main." },
      { line: "int inside = 1;", explain: "متغير يعيش داخل كتلة if فقط." },
      { line: "System.out.println(inside + x);", explain: "داخل الكتلة نرى المتغيرين: 11." },
      { line: "show();", explain: "تنفذ الدالة وتطبع 5." },
    ],
    output: `11
5`,
    mistakes: ["استخدام inside بعد انتهاء if.", "توقع أن show ترى المتغير x.", "إعادة تعريف متغير بنفس الاسم في نفس النطاق."],
    exercise: {
      prompt: "عرّف متغيرًا داخل for واطبعه داخلها فقط.",
      starter: M,
      hint: "المتغير i نفسه مثال على نطاق الحلقة.",
      solution: `public class Main {
    public static void main(String[] args) {
        for (int i = 0; i < 2; i++) {
            int sq = i * i;
            System.out.println(sq);
        }
    }
}`,
    },
    quiz: { q: "أين يُرى المتغير المعرّف داخل if؟", options: ["في كل البرنامج", "داخل كتلة if فقط", "في الكلاس", "في الدوال الأخرى"], answer: 1, why: "نطاقه الكتلة التي عُرِّف فيها." },
  },
  {
    slug: "pass-by-value",
    title: "تمرير القيمة للدالة",
    description: "لماذا لا تتغير متغيراتنا الأساسية داخل الدالة؟",
    explanation: ["عند تمرير int أو double لدالة تُنسخ القيمة، فتغييرها داخل الدالة لا يؤثر على الأصل. أما المصفوفات والكائنات فيُمرَّر مرجع لها، لذلك تعديل عناصرها داخل الدالة يظهر خارجها."],
    goals: ["الفرق بين تمرير القيمة والمرجع", "تعديل مصفوفة داخل دالة"],
    code: `public class Main {
    static void changeNumber(int n) {
        n = 100;
    }

    static void changeArray(int[] arr) {
        arr[0] = 100;
    }

    public static void main(String[] args) {
        int x = 5;
        changeNumber(x);
        System.out.println(x);
        int[] a = {5, 6};
        changeArray(a);
        System.out.println(a[0]);
    }
}`,
    lineByLine: [
      { line: "static void changeNumber(int n) {", explain: "n نسخة من القيمة." },
      { line: "n = 100;", explain: "نغيّر النسخة فقط." },
      { line: "System.out.println(x);", explain: "x ما زالت 5." },
      { line: "arr[0] = 100;", explain: "arr يشير إلى نفس المصفوفة الأصلية." },
      { line: "System.out.println(a[0]);", explain: "تغيّرت إلى 100." },
    ],
    output: `5
100`,
    mistakes: ["توقع تغيّر int بعد تمريره.", "عدم الانتباه لأن تعديل المصفوفة يؤثر على الأصل.", "الخلط مع return."],
    exercise: {
      prompt: "اكتب دالة تضاعف العنصر الأول في مصفوفة، واطبع النتيجة.",
      starter: M,
      hint: "arr[0] *= 2;",
      solution: `public class Main {
    static void doubleFirst(int[] arr) {
        arr[0] *= 2;
    }

    public static void main(String[] args) {
        int[] a = {4, 1};
        doubleFirst(a);
        System.out.println(a[0]);
    }
}`,
    },
    quiz: { q: "هل يتغير int الأصلي بعد تمريره لدالة تعدّله؟", options: ["نعم", "لا", "أحيانًا", "فقط إن كان static"], answer: 1, why: "تُمرَّر نسخة من القيمة." },
  },
];

export const extraUnit8: Lesson[] = [
  {
    slug: "static-members",
    title: "الأعضاء static في الكلاس",
    description: "خصائص ودوال مشتركة بين كل الكائنات.",
    explanation: ["العضو static يخص الكلاس نفسه وليس كل كائن. مثال: عدّاد يزيد عند إنشاء كل كائن. نصل إليه باسم الكلاس: Student.count."],
    goals: ["تعريف static", "عدّ الكائنات"],
    code: `class Student {
    static int count = 0;
    String name;

    Student(String name) {
        this.name = name;
        count++;
    }
}

public class Main {
    public static void main(String[] args) {
        new Student("Ali");
        new Student("Sara");
        System.out.println(Student.count);
    }
}`,
    lineByLine: [
      { line: "static int count = 0;", explain: "متغير واحد مشترك بين كل الطلاب." },
      { line: "count++;", explain: "عند إنشاء أي كائن يزيد العداد." },
      { line: 'new Student("Ali");', explain: "ننشئ كائنًا بدون حفظه في متغير." },
      { line: "System.out.println(Student.count);", explain: "نقرأ العدّاد عبر اسم الكلاس: 2." },
    ],
    output: "2",
    mistakes: ["استخدام static لشيء يختلف من كائن لآخر.", "محاولة استخدام عضو غير static من دالة static.", "الوصول عبر الكائن بدل الكلاس."],
    exercise: {
      prompt: "أنشئ كلاس Counter فيه static int total، وزِد القيمة في constructor، ثم أنشئ 3 كائنات.",
      starter: M,
      hint: "static int total = 0; total++;",
      solution: `class Counter {
    static int total = 0;
    Counter() {
        total++;
    }
}

public class Main {
    public static void main(String[] args) {
        new Counter();
        new Counter();
        new Counter();
        System.out.println(Counter.total);
    }
}`,
    },
    quiz: { q: "لمن يخص العضو static؟", options: ["لكل كائن نسخته", "للكلاس نفسه", "للدالة main فقط", "للملف"], answer: 1, why: "يوجد منه نسخة واحدة مشتركة." },
  },
  {
    slug: "to-string",
    title: "الدالة toString",
    description: "اجعل كائنك يُطبع بشكل مفهوم.",
    explanation: ["طباعة كائن مباشرة تعطي نصًا غريبًا مثل Student@1b6d3586. إذا كتبنا دالة toString داخل الكلاس (مع @Override) فسيستخدمها Java عند الطباعة."],
    goals: ["كتابة toString", "فهم Override"],
    code: `class Student {
    String name;
    int age;

    Student(String name, int age) {
        this.name = name;
        this.age = age;
    }

    @Override
    public String toString() {
        return name + " (" + age + ")";
    }
}

public class Main {
    public static void main(String[] args) {
        Student s = new Student("Lina", 21);
        System.out.println(s);
    }
}`,
    lineByLine: [
      { line: "@Override", explain: "نخبر Java أننا نعدّل دالة موجودة في Object." },
      { line: "public String toString() {", explain: "الدالة يجب أن تكون public وترجع String." },
      { line: 'return name + " (" + age + ")";', explain: "نبني النص الذي نريده." },
      { line: "System.out.println(s);", explain: "تستدعي println الدالة toString تلقائيًا." },
    ],
    output: "Lina (21)",
    mistakes: ["نسيان public.", "كتابة tostring بحروف صغيرة.", "إرجاع غير String."],
    exercise: {
      prompt: "أضف toString لكلاس Car فيه brand وتطبع «سيارة: Toyota».",
      starter: M,
      hint: 'return "سيارة: " + brand;',
      solution: `class Car {
    String brand;
    Car(String brand) { this.brand = brand; }

    @Override
    public String toString() {
        return "سيارة: " + brand;
    }
}

public class Main {
    public static void main(String[] args) {
        System.out.println(new Car("Toyota"));
    }
}`,
    },
    quiz: { q: "ماذا تفعل println عند طباعة كائن؟", options: ["تطبع اسم الكلاس فقط", "تستدعي toString", "تعطي خطأ", "تطبع null"], answer: 1, why: "تستدعي toString لتحويل الكائن لنص." },
  },
];

export const extraUnit9: Lesson[] = [
  {
    slug: "multiple-catch",
    title: "أكثر من catch",
    description: "التعامل مع أنواع مختلفة من الأخطاء.",
    explanation: ["يمكن كتابة عدة كتل catch بعد try واحدة، كل واحدة لنوع خطأ. تُفحص بالترتيب، ويجب وضع النوع الأخص قبل الأعم (Exception آخرًا)."],
    goals: ["كتابة عدة catch", "ترتيب الأنواع"],
    code: `public class Main {
    public static void main(String[] args) {
        int[] nums = {1, 2, 3};
        try {
            System.out.println(nums[1]);
            System.out.println(10 / 0);
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("فهرس خاطئ");
        } catch (ArithmeticException e) {
            System.out.println("قسمة على صفر");
        } catch (Exception e) {
            System.out.println("خطأ آخر");
        }
    }
}`,
    lineByLine: [
      { line: "System.out.println(nums[1]);", explain: "ينجح ويطبع 2." },
      { line: "System.out.println(10 / 0);", explain: "يرمي ArithmeticException." },
      { line: "} catch (ArrayIndexOutOfBoundsException e) {", explain: "لا يتطابق، نتجاوزه." },
      { line: "} catch (ArithmeticException e) {", explain: "يتطابق فنطبع الرسالة." },
      { line: "} catch (Exception e) {", explain: "الأعم يوضع أخيرًا." },
    ],
    output: `2
قسمة على صفر`,
    mistakes: ["وضع Exception أولًا فيحجب الباقي (خطأ ترجمة).", "نسيان ترتيب الأنواع.", "catch فارغة."],
    exercise: {
      prompt: "امسك NumberFormatException عند تحويل \"x\" إلى رقم واطبع «ليس رقمًا».",
      starter: M,
      hint: 'Integer.parseInt("x") داخل try.',
      solution: `public class Main {
    public static void main(String[] args) {
        try {
            Integer.parseInt("x");
        } catch (NumberFormatException e) {
            System.out.println("ليس رقمًا");
        }
    }
}`,
    },
    quiz: { q: "أين نضع catch (Exception e)؟", options: ["أولًا", "أخيرًا", "لا نستخدمها", "في المنتصف"], answer: 1, why: "لأنها الأعم وتلتقط كل شيء." },
  },
  {
    slug: "custom-exception",
    title: "إنشاء استثناء خاص بك",
    description: "كلاس يرث من Exception لحالات برنامجك.",
    explanation: ["لإنشاء استثناء خاص نكتب كلاسًا يرث من Exception ونمرر الرسالة لـ super. بعدها نرميه بـ throw ونمسكه بـ catch كأي استثناء."],
    goals: ["إنشاء استثناء مخصص", "رميه وإمساكه"],
    code: `class LowBalanceException extends Exception {
    LowBalanceException(String message) {
        super(message);
    }
}

public class Main {
    static void withdraw(double balance, double amount) throws LowBalanceException {
        if (amount > balance) {
            throw new LowBalanceException("الرصيد غير كافٍ");
        }
        System.out.println("تم السحب");
    }

    public static void main(String[] args) {
        try {
            withdraw(100, 30);
            withdraw(100, 500);
        } catch (LowBalanceException e) {
            System.out.println(e.getMessage());
        }
    }
}`,
    lineByLine: [
      { line: "class LowBalanceException extends Exception {", explain: "كلاس استثناء خاص يرث من Exception." },
      { line: "super(message);", explain: "نمرر الرسالة للأب." },
      { line: "throws LowBalanceException", explain: "الدالة قد ترمي هذا الاستثناء." },
      { line: 'throw new LowBalanceException("الرصيد غير كافٍ");', explain: "نرميه عند الحالة الخاطئة." },
      { line: "System.out.println(e.getMessage());", explain: "نطبع رسالته." },
    ],
    output: `تم السحب
الرصيد غير كافٍ`,
    mistakes: ["نسيان throws.", "عدم تمرير الرسالة لـ super.", "الوراثة من كلاس خاطئ."],
    exercise: {
      prompt: "أنشئ AgeException يُرمى إذا كان العمر سالبًا، وامسكه واطبع رسالته.",
      starter: M,
      hint: "extends Exception ثم throw new AgeException(...)",
      solution: `class AgeException extends Exception {
    AgeException(String m) { super(m); }
}

public class Main {
    static void check(int age) throws AgeException {
        if (age < 0) throw new AgeException("عمر غير صالح");
    }

    public static void main(String[] args) {
        try {
            check(-1);
        } catch (AgeException e) {
            System.out.println(e.getMessage());
        }
    }
}`,
    },
    quiz: { q: "ماذا يرث الاستثناء الخاص؟", options: ["Object فقط", "Exception", "String", "Error فقط"], answer: 1, why: "نرث من Exception ليصبح استثناءً." },
  },
  {
    slug: "null-pointer",
    title: "الخطأ الشهير NullPointerException",
    description: "لماذا يظهر وكيف نتجنبه.",
    explanation: ["null تعني أن المتغير لا يشير إلى كائن. استدعاء دالة على null يرمي NullPointerException. الحل: فحص null قبل الاستخدام."],
    goals: ["فهم null", "فحصه قبل الاستخدام"],
    code: `public class Main {
    public static void main(String[] args) {
        String name = null;
        if (name != null) {
            System.out.println(name.length());
        } else {
            System.out.println("الاسم فارغ");
        }
        try {
            System.out.println(name.length());
        } catch (NullPointerException e) {
            System.out.println("تم تجنب الانهيار");
        }
    }
}`,
    lineByLine: [
      { line: "String name = null;", explain: "لا يوجد نص فعلي." },
      { line: "if (name != null) {", explain: "نفحص قبل الاستخدام." },
      { line: 'System.out.println("الاسم فارغ");', explain: "تُنفَّذ else." },
      { line: "System.out.println(name.length());", explain: "تستدعي دالة على null فيحدث الاستثناء." },
      { line: "} catch (NullPointerException e) {", explain: "نمسكه بدل انهيار البرنامج." },
    ],
    output: `الاسم فارغ
تم تجنب الانهيار`,
    mistakes: ["استدعاء دالة على متغير لم يُنشأ.", "نسيان تهيئة مصفوفة الكائنات.", "عدم فحص نتيجة دالة قد ترجع null."],
    exercise: {
      prompt: "اكتب if يطبع «موجود» إذا كان s غير null وإلا «null».",
      starter: M,
      hint: "s != null",
      solution: `public class Main {
    public static void main(String[] args) {
        String s = null;
        if (s != null) {
            System.out.println("موجود");
        } else {
            System.out.println("null");
        }
    }
}`,
    },
    quiz: { q: "ماذا يعني null؟", options: ["صفر", "نص فارغ", "لا يشير لأي كائن", "خطأ"], answer: 2, why: "المتغير لا يحمل مرجعًا لأي كائن." },
  },
];
