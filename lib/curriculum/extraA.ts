import type { Lesson } from "./types";

const M = `public class Main {
    public static void main(String[] args) {

    }
}`;

export const extraUnit1: Lesson[] = [
  {
    slug: "comments",
    title: "التعليقات في Java",
    description: "كيف تكتب ملاحظات داخل الكود لا ينفذها Java.",
    explanation: [
      "التعليق نص يكتبه المبرمج لنفسه أو لغيره ليشرح الكود، ويتجاهله Java تمامًا. هناك نوعان: تعليق سطر واحد يبدأ بـ // وتعليق متعدد الأسطر بين /* و */.",
      "استخدم التعليقات لشرح «لماذا» كتبت الكود بهذه الطريقة، ولا تكتب تعليقًا على كل سطر واضح. ويمكنك أيضًا تعطيل سطر مؤقتًا بوضع // أمامه.",
    ],
    goals: ["كتابة تعليق سطر واحد ومتعدد", "تعطيل سطر كود مؤقتًا"],
    code: `public class Main {
    public static void main(String[] args) {
        // هذا تعليق سطر واحد
        System.out.println("قبل");
        /* هذا تعليق
           على عدة أسطر */
        // System.out.println("هذا السطر معطّل");
        System.out.println("بعد");
    }
}`,
    lineByLine: [
      { line: "// هذا تعليق سطر واحد", explain: "يتجاهله Java بالكامل." },
      { line: 'System.out.println("قبل");', explain: "سطر عادي يُنفَّذ ويطبع قبل." },
      { line: "/* هذا تعليق\n على عدة أسطر */", explain: "كل ما بين /* و */ يُتجاهل حتى لو امتد لعدة أسطر." },
      { line: '// System.out.println("هذا السطر معطّل");', explain: "وضعنا // فتعطّل السطر ولن يُطبع." },
      { line: 'System.out.println("بعد");', explain: "يطبع بعد." },
    ],
    output: `قبل
بعد`,
    mistakes: ["نسيان */ لإغلاق التعليق المتعدد فيُعتبر باقي الملف تعليقًا.", "كتابة تعليق على كل سطر بدون فائدة.", "استخدام # أو -- للتعليق (هذه ليست Java)."],
    exercise: {
      prompt: "ضع تعليقًا فوق سطر الطباعة، ثم عطّل سطرًا ثانيًا بالتعليق.",
      starter: `public class Main {
    public static void main(String[] args) {
        System.out.println("ظاهر");
        System.out.println("اخفِني");
    }
}`,
      hint: "ضع // أمام السطر المراد تعطيله.",
      solution: `public class Main {
    public static void main(String[] args) {
        // نطبع كلمة ظاهر
        System.out.println("ظاهر");
        // System.out.println("اخفِني");
    }
}`,
    },
    quiz: { q: "أي رمز يبدأ تعليقًا من سطر واحد؟", options: ["#", "//", "--", "<!--"], answer: 1, why: "// يبدأ تعليق سطر واحد في Java." },
  },
  {
    slug: "escape-chars",
    title: "الأحرف الخاصة في النصوص",
    description: "السطر الجديد \\n والمسافة \\t وعلامة الاقتباس داخل النص.",
    explanation: [
      "بعض الرموز لا نستطيع كتابتها مباشرة داخل النص، فنستخدم الشرطة المائلة \\ قبلها: \\n سطر جديد، \\t مسافة جدولة (Tab)، \\\" علامة اقتباس داخل النص، \\\\ شرطة مائلة واحدة.",
    ],
    goals: ["استخدام \\n و\\t", "كتابة علامة اقتباس داخل نص"],
    code: `public class Main {
    public static void main(String[] args) {
        System.out.println("السطر الأول\\nالسطر الثاني");
        System.out.println("الاسم:\\tAli");
        System.out.println("قال: \\"مرحبا\\"");
    }
}`,
    lineByLine: [
      { line: 'System.out.println("السطر الأول\\nالسطر الثاني");', explain: "\\n تنقل الطباعة لسطر جديد وسط النص." },
      { line: 'System.out.println("الاسم:\\tAli");', explain: "\\t تضيف مسافة كبيرة (Tab)." },
      { line: 'System.out.println("قال: \\"مرحبا\\"");', explain: "\\\" تطبع علامة اقتباس دون إنهاء النص." },
    ],
    output: `السطر الأول
السطر الثاني
الاسم:	Ali
قال: "مرحبا"`,
    mistakes: ["كتابة / بدل \\ (الشرطة العكسية).", "وضع علامة اقتباس داخل النص بدون \\ فينتهي النص مبكرًا.", "نسيان أن \\n تُكتب داخل علامتي الاقتباس."],
    exercise: {
      prompt: "اطبع كلمتين في سطرين مختلفين باستخدام println واحدة و\\n.",
      starter: M,
      hint: 'System.out.println("A\\nB");',
      solution: `public class Main {
    public static void main(String[] args) {
        System.out.println("Java\\nرائعة");
    }
}`,
    },
    quiz: { q: "ماذا يطبع \\n داخل نص؟", options: ["مسافة", "سطرًا جديدًا", "علامة اقتباس", "شرطة"], answer: 1, why: "\\n ترمز لسطر جديد (new line)." },
  },
];

export const extraUnit2: Lesson[] = [
  {
    slug: "type-casting",
    title: "التحويل بين الأنواع (Casting)",
    description: "تحويل int إلى double والعكس، وماذا نخسر.",
    explanation: [
      "التحويل من نوع صغير إلى كبير (int إلى double) يتم تلقائيًا بدون خسارة. أما من كبير إلى صغير (double إلى int) فيجب أن نطلبه بأنفسنا بكتابة (int) قبل القيمة، وسيحذف Java الجزء العشري ولا يقرّبه.",
    ],
    goals: ["التحويل التلقائي والصريح", "فهم حذف الكسور عند التحويل"],
    code: `public class Main {
    public static void main(String[] args) {
        int a = 7;
        double b = a;
        double price = 9.99;
        int whole = (int) price;
        System.out.println(b);
        System.out.println(whole);
        System.out.println((double) 7 / 2);
    }
}`,
    lineByLine: [
      { line: "double b = a;", explain: "تحويل تلقائي: 7 تصبح 7.0." },
      { line: "int whole = (int) price;", explain: "تحويل صريح: يحذف الكسر فتصبح 9 (بدون تقريب)." },
      { line: "System.out.println(b);", explain: "يطبع 7.0." },
      { line: "System.out.println(whole);", explain: "يطبع 9." },
      { line: "System.out.println((double) 7 / 2);", explain: "نحوّل 7 إلى 7.0 أولًا فتصبح القسمة عشرية = 3.5." },
    ],
    output: `7.0
9
3.5`,
    mistakes: ["int x = 9.99; بدون casting.", "توقع أن (int) 9.99 تعطي 10 (بل 9).", "كتابة (double) 7 / 2 والمقصود تحويل النتيجة (التحويل يسبق القسمة)."],
    exercise: {
      prompt: "حوّل 8.9 إلى int واطبعه.",
      starter: M,
      hint: "int x = (int) 8.9;",
      solution: `public class Main {
    public static void main(String[] args) {
        int x = (int) 8.9;
        System.out.println(x);
    }
}`,
    },
    quiz: { q: "ما ناتج (int) 5.99؟", options: ["6", "5", "5.9", "خطأ"], answer: 1, why: "التحويل إلى int يحذف الكسر ولا يقرّب." },
  },
  {
    slug: "string-methods",
    title: "دوال النصوص String",
    description: "length وtoUpperCase وcharAt وsubstring وcontains.",
    explanation: [
      "String في Java كائن يملك دوالًا مفيدة. length() تعطي عدد الأحرف، toUpperCase() وtoLowerCase() تغيران حالة الأحرف، charAt(i) تعطي الحرف في الموضع i (يبدأ من 0)، substring(a, b) تقص جزءًا، contains(x) تفحص وجود نص داخل نص.",
      "النصوص في Java ثابتة (immutable): الدوال تُرجع نصًا جديدًا ولا تغيّر الأصلي.",
    ],
    goals: ["استخدام أهم دوال String", "فهم أن الفهرس يبدأ من 0"],
    code: `public class Main {
    public static void main(String[] args) {
        String s = "Hello Java";
        System.out.println(s.length());
        System.out.println(s.toUpperCase());
        System.out.println(s.charAt(0));
        System.out.println(s.substring(6));
        System.out.println(s.substring(0, 5));
        System.out.println(s.contains("Java"));
    }
}`,
    lineByLine: [
      { line: 'String s = "Hello Java";', explain: "النص (10 أحرف مع المسافة)." },
      { line: "System.out.println(s.length());", explain: "عدد الأحرف = 10." },
      { line: "System.out.println(s.toUpperCase());", explain: "HELLO JAVA." },
      { line: "System.out.println(s.charAt(0));", explain: "أول حرف H." },
      { line: "System.out.println(s.substring(6));", explain: "من الموضع 6 حتى النهاية: Java." },
      { line: "System.out.println(s.substring(0, 5));", explain: "من 0 إلى قبل 5: Hello." },
      { line: 'System.out.println(s.contains("Java"));', explain: "true." },
    ],
    output: `10
HELLO JAVA
H
Java
Hello
true`,
    mistakes: ["كتابة s.length بدون أقواس (للنصوص تحتاج أقواس).", "استخدام charAt(10) لنص طوله 10 (آخر فهرس 9).", "توقع أن toUpperCase تغيّر المتغير الأصلي."],
    exercise: {
      prompt: "اطبع أول حرف وطول النص \"Gaza\".",
      starter: M,
      hint: 'String s = "Gaza"; ثم charAt(0) و length().',
      solution: `public class Main {
    public static void main(String[] args) {
        String s = "Gaza";
        System.out.println(s.charAt(0));
        System.out.println(s.length());
    }
}`,
    },
    quiz: { q: "ما ناتج \"Java\".charAt(1)؟", options: ["J", "a", "v", "خطأ"], answer: 1, why: "الفهرس 0 هو J والفهرس 1 هو a." },
  },
];

export const extraUnit3: Lesson[] = [
  {
    slug: "ternary",
    title: "المعامل الثلاثي ? :",
    description: "اختصار if/else في سطر واحد.",
    explanation: ["الصيغة: الشرط ? قيمة_إذا_صح : قيمة_إذا_خطأ. مناسب للقرارات البسيطة التي تعطي قيمة."],
    goals: ["كتابة المعامل الثلاثي", "معرفة متى نستخدمه"],
    code: `public class Main {
    public static void main(String[] args) {
        int age = 17;
        String status = age >= 18 ? "بالغ" : "قاصر";
        System.out.println(status);
        int a = 5, b = 9;
        int max = a > b ? a : b;
        System.out.println(max);
    }
}`,
    lineByLine: [
      { line: 'String status = age >= 18 ? "بالغ" : "قاصر";', explain: "إذا كان العمر 18 أو أكثر نأخذ «بالغ» وإلا «قاصر»." },
      { line: "int a = 5, b = 9;", explain: "تعريف متغيرين في سطر واحد." },
      { line: "int max = a > b ? a : b;", explain: "نأخذ الأكبر منهما: 9." },
    ],
    output: `قاصر
9`,
    mistakes: ["نسيان النقطتين : .", "كتابة معامل ثلاثي طويل ومتداخل يصعب قراءته.", "اختلاف نوع القيمتين."],
    exercise: {
      prompt: "اطبع «زوجي» أو «فردي» للعدد 7 باستخدام المعامل الثلاثي.",
      starter: M,
      hint: 'n % 2 == 0 ? "زوجي" : "فردي"',
      solution: `public class Main {
    public static void main(String[] args) {
        int n = 7;
        System.out.println(n % 2 == 0 ? "زوجي" : "فردي");
    }
}`,
    },
    quiz: { q: "ما ناتج 3 > 5 ? 1 : 2؟", options: ["1", "2", "true", "false"], answer: 1, why: "الشرط خطأ فنأخذ القيمة بعد النقطتين: 2." },
  },
  {
    slug: "math-class",
    title: "الكلاس Math",
    description: "max وmin وpow وsqrt وround وabs.",
    explanation: ["الكلاس Math جاهز في Java ولا يحتاج import. دوالنا الأساسية: Math.max وMath.min وMath.abs (القيمة المطلقة) وMath.pow (الأس) وMath.sqrt (الجذر التربيعي) وMath.round (تقريب لأقرب عدد صحيح)."],
    goals: ["استخدام دوال Math", "تقريب الأعداد"],
    code: `public class Main {
    public static void main(String[] args) {
        System.out.println(Math.max(4, 9));
        System.out.println(Math.min(4, 9));
        System.out.println(Math.abs(-5));
        System.out.println(Math.pow(2, 3));
        System.out.println(Math.sqrt(16));
        System.out.println(Math.round(4.6));
    }
}`,
    lineByLine: [
      { line: "Math.max(4, 9)", explain: "الأكبر: 9." },
      { line: "Math.min(4, 9)", explain: "الأصغر: 4." },
      { line: "Math.abs(-5)", explain: "القيمة المطلقة: 5." },
      { line: "Math.pow(2, 3)", explain: "2 أس 3 = 8.0 (ترجع double)." },
      { line: "Math.sqrt(16)", explain: "الجذر التربيعي: 4.0." },
      { line: "Math.round(4.6)", explain: "التقريب: 5." },
    ],
    output: `9
4
5
8.0
4.0
5`,
    mistakes: ["كتابة math بحرف صغير.", "توقع أن pow ترجع int (ترجع double).", "الجذر لعدد سالب يعطي NaN."],
    exercise: {
      prompt: "اطبع الجذر التربيعي للعدد 81.",
      starter: M,
      hint: "Math.sqrt(81)",
      solution: `public class Main {
    public static void main(String[] args) {
        System.out.println(Math.sqrt(81));
    }
}`,
    },
    quiz: { q: "ما ناتج Math.pow(3, 2)؟", options: ["6", "9.0", "9", "5"], answer: 1, why: "3 أس 2 = 9 وتُرجع الدالة double فتُطبع 9.0." },
  },
  {
    slug: "string-concat",
    title: "دمج النصوص والأرقام",
    description: "متى تعمل + جمعًا ومتى تعمل دمجًا.",
    explanation: [
      "عند استخدام + مع نص يصبح دمجًا. لكن الترتيب مهم: Java تنفذ من اليسار إلى اليمين. 1 + 2 + \"س\" تعطي \"3س\" لأن الجمع يتم أولًا، أما \"س\" + 1 + 2 فتعطي \"س12\" لأن كل شيء بعد النص يُدمج.",
    ],
    goals: ["فهم ترتيب الدمج والجمع", "استخدام الأقواس لضبط النتيجة"],
    code: `public class Main {
    public static void main(String[] args) {
        System.out.println(1 + 2 + "س");
        System.out.println("س" + 1 + 2);
        System.out.println("س" + (1 + 2));
    }
}`,
    lineByLine: [
      { line: 'System.out.println(1 + 2 + "س");', explain: "1 + 2 = 3 أولًا ثم ندمجها مع النص: 3س." },
      { line: 'System.out.println("س" + 1 + 2);', explain: "ندمج س مع 1 ثم مع 2: س12." },
      { line: 'System.out.println("س" + (1 + 2));', explain: "الأقواس تجمع أولًا: س3." },
    ],
    output: `3س
س12
س3`,
    mistakes: ["نسيان الأقواس فتظهر أرقام ملصوقة بدل مجموعها.", "ظن أن + تجمع دائمًا.", "نسيان مسافة بين النص والمتغير."],
    exercise: {
      prompt: "اطبع «المجموع = 7» حيث 7 ناتج جمع 3 و4 داخل الطباعة.",
      starter: M,
      hint: 'استخدم الأقواس: "المجموع = " + (3 + 4)',
      solution: `public class Main {
    public static void main(String[] args) {
        System.out.println("المجموع = " + (3 + 4));
    }
}`,
    },
    quiz: { q: 'ما ناتج "A" + 1 + 1؟', options: ["A2", "A11", "2A", "خطأ"], answer: 1, why: "بعد النص يُدمج كل شيء: A ثم 1 ثم 1." },
  },
];

export const extraUnit4: Lesson[] = [
  {
    slug: "nested-if",
    title: "الشروط المتداخلة",
    description: "if داخل if لاتخاذ قرارات على مراحل.",
    explanation: ["يمكن وضع if داخل if. الشرط الداخلي لا يُفحص إلا إذا تحقق الشرط الخارجي. إن زاد التداخل عن مستويين فكّر في دمج الشروط بـ && لتبقى القراءة سهلة."],
    goals: ["كتابة if داخل if", "اختيار التداخل أو الدمج"],
    code: `public class Main {
    public static void main(String[] args) {
        int age = 20;
        boolean hasTicket = true;
        if (age >= 18) {
            if (hasTicket) {
                System.out.println("ادخل");
            } else {
                System.out.println("اشترِ تذكرة");
            }
        } else {
            System.out.println("ممنوع");
        }
    }
}`,
    lineByLine: [
      { line: "if (age >= 18) {", explain: "الشرط الخارجي: هل بالغ؟ نعم." },
      { line: "if (hasTicket) {", explain: "الشرط الداخلي: هل لديه تذكرة؟ نعم." },
      { line: 'System.out.println("ادخل");', explain: "هذا ما يُطبع." },
      { line: "} else {", explain: "else الداخلية تتبع if الداخلية." },
      { line: 'System.out.println("ممنوع");', explain: "else الخارجية لغير البالغين." },
    ],
    output: "ادخل",
    mistakes: ["الخلط في أي else تتبع أي if.", "نسيان الأقواس { } فيتغير الربط.", "تداخل أكثر من اللازم."],
    exercise: {
      prompt: "إذا كانت الدرجة 50 أو أكثر اطبع «ناجح»، وإذا كانت 90 أو أكثر اطبع أيضًا «تقدير ممتاز».",
      starter: `public class Main {
    public static void main(String[] args) {
        int score = 95;

    }
}`,
      hint: "if (score >= 50) { ... if (score >= 90) ... }",
      solution: `public class Main {
    public static void main(String[] args) {
        int score = 95;
        if (score >= 50) {
            System.out.println("ناجح");
            if (score >= 90) {
                System.out.println("تقدير ممتاز");
            }
        }
    }
}`,
    },
    quiz: { q: "متى يُفحص الشرط الداخلي؟", options: ["دائمًا", "فقط إذا تحقق الخارجي", "أبدًا", "قبل الخارجي"], answer: 1, why: "الشرط الداخلي داخل كتلة الخارجي فلا يُنفَّذ إلا إذا تحقق." },
  },
  {
    slug: "switch-strings",
    title: "switch على النصوص",
    description: "مقارنة نص بعدة قيم وتبسيط الحالات المتشابهة.",
    explanation: ["تعمل switch مع String أيضًا. ويمكن جمع عدة حالات تعطي نفس النتيجة بكتابتها متتابعة بدون break بينها."],
    goals: ["switch على String", "دمج حالات متشابهة"],
    code: `public class Main {
    public static void main(String[] args) {
        String day = "Friday";
        switch (day) {
            case "Saturday":
            case "Sunday":
                System.out.println("عمل");
                break;
            case "Friday":
                System.out.println("عطلة");
                break;
            default:
                System.out.println("يوم عادي");
        }
    }
}`,
    lineByLine: [
      { line: "switch (day) {", explain: "نفحص قيمة النص day." },
      { line: 'case "Saturday":', explain: "حالة بدون break تنزل إلى التالية (مقصود هنا)." },
      { line: 'case "Friday":', explain: "تتطابق مع Friday." },
      { line: 'System.out.println("عطلة");', explain: "تُطبع." },
      { line: "break;", explain: "نخرج من switch." },
    ],
    output: "عطلة",
    mistakes: ["الاختلاف في حالة الأحرف (friday ≠ Friday).", "نسيان break بين الحالات المختلفة.", "فحص نص null يسبب خطأ."],
    exercise: {
      prompt: "اكتب switch على لون: red تطبع «قف»، green تطبع «سِر»، وغير ذلك «انتبه».",
      starter: `public class Main {
    public static void main(String[] args) {
        String color = "green";

    }
}`,
      hint: 'case "red": ... break;',
      solution: `public class Main {
    public static void main(String[] args) {
        String color = "green";
        switch (color) {
            case "red":
                System.out.println("قف");
                break;
            case "green":
                System.out.println("سِر");
                break;
            default:
                System.out.println("انتبه");
        }
    }
}`,
    },
    quiz: { q: "هل تعمل switch مع String؟", options: ["لا", "نعم", "فقط مع int", "فقط مع char"], answer: 1, why: "منذ Java 7 تدعم switch النصوص." },
  },
  {
    slug: "leap-year",
    title: "تمرين: السنة الكبيسة",
    description: "تطبيق الشروط المركبة بمثال حقيقي.",
    explanation: ["السنة كبيسة إذا قبلت القسمة على 4 ولم تقبل القسمة على 100، أو قبلت القسمة على 400. هذا مثال ممتاز لدمج && و|| مع الأقواس."],
    goals: ["كتابة شرط مركب معقد", "استخدام % داخل الشرط"],
    code: `public class Main {
    static boolean isLeap(int year) {
        return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
    }

    public static void main(String[] args) {
        System.out.println(isLeap(2024));
        System.out.println(isLeap(1900));
        System.out.println(isLeap(2000));
        System.out.println(isLeap(2023));
    }
}`,
    lineByLine: [
      { line: "static boolean isLeap(int year) {", explain: "دالة ترجع true أو false." },
      { line: "return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;", explain: "الشرط كاملًا: يقبل 4 ولا يقبل 100، أو يقبل 400." },
      { line: "isLeap(2024)", explain: "2024 تقبل 4 ولا تقبل 100: true." },
      { line: "isLeap(1900)", explain: "تقبل 100 ولا تقبل 400: false." },
      { line: "isLeap(2000)", explain: "تقبل 400: true." },
    ],
    output: `true
false
true
false`,
    mistakes: ["نسيان الأقواس حول الجزء الأول.", "استخدام = بدل ==.", "الاكتفاء بشرط 4 فقط."],
    exercise: {
      prompt: "اطبع هل 2100 سنة كبيسة باستخدام نفس الشرط مباشرة في main.",
      starter: M,
      hint: "int y = 2100; ثم الشرط كاملًا.",
      solution: `public class Main {
    public static void main(String[] args) {
        int y = 2100;
        boolean leap = (y % 4 == 0 && y % 100 != 0) || y % 400 == 0;
        System.out.println(leap);
    }
}`,
    },
    quiz: { q: "هل 1900 سنة كبيسة؟", options: ["نعم", "لا", "أحيانًا", "غير معروف"], answer: 1, why: "تقبل القسمة على 100 ولا تقبل 400 فليست كبيسة." },
  },
];
