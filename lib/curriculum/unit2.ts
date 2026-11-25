import type { Unit } from "./types";

export const unit2: Unit = {
  id: 2,
  title: "المتغيرات وأنواع البيانات",
  description: "كيف يخزّن البرنامج الأرقام والنصوص والقيم المنطقية.",
  lessons: [
    {
      slug: "numbers-types",
      title: "الأعداد: int وdouble وfloat",
      description: "نتعرف على الأنواع العددية ومتى نستخدم كل نوع.",
      explanation: [
        "int يخزن أعدادًا صحيحة بدون كسور مثل 5 و-20. double يخزن أعدادًا عشرية بدقة عالية مثل 3.14. float يشبه double لكنه أقل دقة ويحتاج حرف f بعد الرقم.",
        "قاعدة المبتدئين: استخدم int للأعداد الصحيحة وdouble للأعداد العشرية، ولا تحتاج float إلا في حالات خاصة.",
      ],
      goals: ["التمييز بين int وdouble وfloat", "كتابة قيم عشرية صحيحة", "طباعة المتغيرات"],
      code: `public class Main {
    public static void main(String[] args) {
        int students = 30;
        double price = 19.99;
        float temp = 36.6f;
        System.out.println(students);
        System.out.println(price);
        System.out.println(temp);
    }
}`,
      lineByLine: [
        { line: "int students = 30;", explain: "عدد صحيح يمثل عدد الطلاب." },
        { line: "double price = 19.99;", explain: "عدد عشري يمثل السعر." },
        { line: "float temp = 36.6f;", explain: "float: لاحظ حرف f بعد الرقم، فبدونه يعتبره Java من نوع double ويعطي خطأ." },
        { line: "System.out.println(students);", explain: "يطبع 30." },
        { line: "System.out.println(price);", explain: "يطبع 19.99." },
        { line: "System.out.println(temp);", explain: "يطبع 36.6." },
      ],
      output: `30
19.99
36.6`,
      mistakes: [
        "int x = 3.5; — خطأ، الرقم العشري لا يدخل في int.",
        "float f = 2.5; بدون f — خطأ.",
        "استخدام فاصلة عربية أو أوروبية في الرقم 3,5 بدل النقطة 3.5.",
      ],
      exercise: {
        prompt: "عرّف int باسم age قيمته 25، وdouble باسم height قيمته 1.75، ثم اطبعهما.",
        starter: `public class Main {
    public static void main(String[] args) {

    }
}`,
        hint: "int age = 25; double height = 1.75;",
        solution: `public class Main {
    public static void main(String[] args) {
        int age = 25;
        double height = 1.75;
        System.out.println(age);
        System.out.println(height);
    }
}`,
      },
      quiz: {
        q: "أي سطر صحيح؟",
        options: ["int a = 4.5;", "double a = 4.5;", "float a = 4.5;", "int a = 4,5;"],
        answer: 1,
        why: "الأعداد العشرية تُخزَّن في double. أما float فتحتاج 4.5f.",
      },
    },
    {
      slug: "text-types",
      title: "النصوص والحروف والقيم المنطقية: String وchar وboolean",
      description: "كيف نخزن اسمًا أو حرفًا أو قيمة صح/خطأ.",
      explanation: [
        "String نص كامل يُكتب بين علامتي اقتباس مزدوجتين \"Ahmed\". char حرف واحد فقط ويُكتب بين علامتي اقتباس مفردتين 'A'. boolean يحمل إحدى قيمتين فقط: true أو false.",
        "لاحظ أن String يبدأ بحرف كبير لأنه Class، أما بقية الأنواع الأساسية فتُكتب بحروف صغيرة.",
      ],
      goals: ["تعريف String وchar وboolean", "التفرقة بين علامتي الاقتباس المفردة والمزدوجة", "دمج النص مع المتغيرات"],
      code: `public class Main {
    public static void main(String[] args) {
        String name = "Sara";
        char grade = 'A';
        boolean passed = true;
        System.out.println("الاسم: " + name);
        System.out.println("التقدير: " + grade);
        System.out.println("ناجح؟ " + passed);
    }
}`,
      lineByLine: [
        { line: 'String name = "Sara";', explain: "متغير نصي، لاحظ الاقتباس المزدوج." },
        { line: "char grade = 'A';", explain: "حرف واحد بين اقتباس مفرد." },
        { line: "boolean passed = true;", explain: "قيمة منطقية: true بحروف صغيرة." },
        { line: 'System.out.println("الاسم: " + name);', explain: "علامة + تدمج النص مع قيمة المتغير." },
        { line: 'System.out.println("التقدير: " + grade);', explain: "نفس الفكرة مع الحرف." },
        { line: 'System.out.println("ناجح؟ " + passed);', explain: "تطبع true." },
      ],
      output: `الاسم: Sara
التقدير: A
ناجح؟ true`,
      mistakes: [
        'char c = "A"; — خطأ، الحرف يحتاج اقتباسًا مفردًا.',
        "string name — خطأ، النوع هو String بحرف S كبير.",
        "boolean b = True; — خطأ، الصحيح true.",
      ],
      exercise: {
        prompt: "عرّف String باسم city قيمته Gaza، وboolean باسم isStudent قيمته true، ثم اطبعهما.",
        starter: `public class Main {
    public static void main(String[] args) {

    }
}`,
        hint: 'String city = "Gaza"; boolean isStudent = true;',
        solution: `public class Main {
    public static void main(String[] args) {
        String city = "Gaza";
        boolean isStudent = true;
        System.out.println(city);
        System.out.println(isStudent);
    }
}`,
      },
      quiz: {
        q: "كيف نعرّف حرفًا واحدًا بشكل صحيح؟",
        options: ['char c = "x";', "char c = 'x';", "String c = 'x';", "char c = xx;"],
        answer: 1,
        why: "قيمة char بين علامتي اقتباس مفردتين وتحتوي حرفًا واحدًا فقط.",
      },
    },
    {
      slug: "variables-naming",
      title: "تعريف المتغيرات وتغيير قيمتها وقواعد التسمية",
      description: "كيف ننشئ المتغير، نغيّر قيمته، ونسميه بشكل صحيح.",
      explanation: [
        "صيغة التعريف: النوع ثم الاسم ثم = ثم القيمة ثم ;. يمكن تعريف المتغير بدون قيمة ثم إعطاؤه قيمة لاحقًا، لكن لا يمكن استخدامه قبل إعطائه قيمة.",
        "لتغيير القيمة نكتب اسم المتغير فقط ثم = ثم القيمة الجديدة (بدون كتابة النوع مرة أخرى).",
        "قواعد التسمية: يبدأ بحرف أو _ أو $ (وليس برقم)، لا مسافات، لا كلمات محجوزة مثل class وint، ويفرّق بين الحروف الكبيرة والصغيرة. والعرف: camelCase مثل studentAge.",
      ],
      goals: ["تعريف متغير وتغيير قيمته", "معرفة قواعد التسمية", "تجنّب أخطاء إعادة التعريف"],
      code: `public class Main {
    public static void main(String[] args) {
        int score = 10;
        System.out.println(score);
        score = 15;
        System.out.println(score);
        String studentName = "Omar";
        System.out.println(studentName);
    }
}`,
      lineByLine: [
        { line: "int score = 10;", explain: "تعريف المتغير مع قيمة أولية." },
        { line: "System.out.println(score);", explain: "يطبع 10." },
        { line: "score = 15;", explain: "تغيير القيمة: لم نكتب int لأن المتغير موجود مسبقًا." },
        { line: "System.out.println(score);", explain: "يطبع 15 الآن." },
        { line: 'String studentName = "Omar";', explain: "اسم بنمط camelCase." },
        { line: "System.out.println(studentName);", explain: "يطبع Omar." },
      ],
      output: `10
15
Omar`,
      mistakes: [
        "int score = 10; ثم int score = 15; — خطأ: تعريف المتغير مرتين.",
        "int 2score = 5; — الاسم لا يبدأ برقم.",
        "int my score = 5; — لا مسافات في الأسماء.",
        "استخدام متغير لم تُعطَ له قيمة.",
      ],
      exercise: {
        prompt: "عرّف int باسم level قيمته 1، اطبعه، ثم غيّر قيمته إلى 2 واطبعه مجددًا.",
        starter: `public class Main {
    public static void main(String[] args) {

    }
}`,
        hint: "لا تكتب int عند تغيير القيمة.",
        solution: `public class Main {
    public static void main(String[] args) {
        int level = 1;
        System.out.println(level);
        level = 2;
        System.out.println(level);
    }
}`,
      },
      quiz: {
        q: "أي اسم متغير مقبول في Java؟",
        options: ["2name", "my name", "studentAge", "class"],
        answer: 2,
        why: "studentAge يبدأ بحرف ولا يحتوي مسافات ولا يخالف كلمة محجوزة.",
      },
    },
    {
      slug: "constants",
      title: "الثوابت مع final",
      description: "قيم لا تتغير أبدًا بعد تعريفها.",
      explanation: [
        "عندما تكون لديك قيمة يجب ألا تتغير (مثل قيمة π أو نسبة الضريبة) استخدم كلمة final قبل النوع. أي محاولة لتغيير قيمتها تعطي خطأ وقت الترجمة.",
        "العرف أن تُكتب أسماء الثوابت بحروف كبيرة وبينها _ مثل MAX_SCORE.",
      ],
      goals: ["تعريف ثابت باستخدام final", "فهم لماذا تحمينا الثوابت من الأخطاء"],
      code: `public class Main {
    public static void main(String[] args) {
        final double PI = 3.14159;
        double radius = 5;
        double area = PI * radius * radius;
        System.out.println(area);
    }
}`,
      lineByLine: [
        { line: "final double PI = 3.14159;", explain: "ثابت لا يتغير. final تمنع إعادة الإسناد." },
        { line: "double radius = 5;", explain: "نصف القطر متغير عادي." },
        { line: "double area = PI * radius * radius;", explain: "مساحة الدائرة = π × r × r." },
        { line: "System.out.println(area);", explain: "يطبع المساحة." },
      ],
      output: "78.53975",
      mistakes: [
        "PI = 3; بعد تعريفه final — خطأ ترجمة.",
        "كتابة final بعد النوع بدل قبله (final double وليس double final في العرف).",
      ],
      exercise: {
        prompt: "عرّف ثابت final int DAYS_IN_WEEK = 7 ثم اطبعه.",
        starter: `public class Main {
    public static void main(String[] args) {

    }
}`,
        hint: "final int DAYS_IN_WEEK = 7;",
        solution: `public class Main {
    public static void main(String[] args) {
        final int DAYS_IN_WEEK = 7;
        System.out.println(DAYS_IN_WEEK);
    }
}`,
      },
      quiz: {
        q: "ماذا يحدث عند تغيير قيمة متغير معرّف بـ final؟",
        options: ["يتغير عادي", "خطأ في الترجمة", "يتجاهل Java التغيير", "يتحول إلى نص"],
        answer: 1,
        why: "الثابت لا يقبل إعادة الإسناد، ويرفض المترجم الكود.",
      },
    },
  ],
};
