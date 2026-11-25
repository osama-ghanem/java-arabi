import type { Unit } from "./types";

export const unit3: Unit = {
  id: 3,
  title: "العمليات",
  description: "العمليات الحسابية والمقارنة والمنطقية وأولوية التنفيذ.",
  lessons: [
    {
      slug: "arithmetic",
      title: "العمليات الحسابية",
      description: "الجمع والطرح والضرب والقسمة والباقي.",
      explanation: [
        "العمليات: + جمع، - طرح، * ضرب، / قسمة، % باقي القسمة.",
        "انتبه: قسمة عددين صحيحين تعطي عددًا صحيحًا (يُحذف الكسر): 7 / 2 تساوي 3. وللحصول على 3.5 اجعل أحد العددين double: 7 / 2.0.",
      ],
      goals: ["استخدام العمليات الحسابية الخمس", "فهم قسمة الأعداد الصحيحة", "استخدام % لمعرفة الباقي"],
      code: `public class Main {
    public static void main(String[] args) {
        int a = 7;
        int b = 2;
        System.out.println(a + b);
        System.out.println(a - b);
        System.out.println(a * b);
        System.out.println(a / b);
        System.out.println(a % b);
        System.out.println(a / 2.0);
    }
}`,
      lineByLine: [
        { line: "int a = 7;", explain: "الرقم الأول." },
        { line: "int b = 2;", explain: "الرقم الثاني." },
        { line: "System.out.println(a + b);", explain: "الجمع = 9." },
        { line: "System.out.println(a - b);", explain: "الطرح = 5." },
        { line: "System.out.println(a * b);", explain: "الضرب = 14." },
        { line: "System.out.println(a / b);", explain: "قسمة صحيحة = 3 (الكسر محذوف)." },
        { line: "System.out.println(a % b);", explain: "الباقي = 1." },
        { line: "System.out.println(a / 2.0);", explain: "لأن 2.0 عشري، النتيجة 3.5." },
      ],
      output: `9
5
14
3
1
3.5`,
      mistakes: [
        "توقع أن 7 / 2 يعطي 3.5 عند استخدام int.",
        "القسمة على صفر في الأعداد الصحيحة تسبب ArithmeticException.",
        "نسيان أن % يعطي الباقي وليس النسبة المئوية.",
      ],
      exercise: {
        prompt: "احسب باقي قسمة 17 على 5 واطبعه.",
        starter: `public class Main {
    public static void main(String[] args) {

    }
}`,
        hint: "System.out.println(17 % 5);",
        solution: `public class Main {
    public static void main(String[] args) {
        System.out.println(17 % 5);
    }
}`,
      },
      quiz: {
        q: "ما ناتج 10 / 4 عندما يكون الرقمان int؟",
        options: ["2.5", "2", "3", "2.0"],
        answer: 1,
        why: "قسمة الأعداد الصحيحة تحذف الجزء الكسري فتكون النتيجة 2.",
      },
    },
    {
      slug: "compare-logic",
      title: "عمليات المقارنة والعمليات المنطقية",
      description: "مقارنة القيم وربط الشروط بـ && و|| و!.",
      explanation: [
        "المقارنة: == يساوي، != لا يساوي، > أكبر، < أصغر، >= أكبر أو يساوي، <= أصغر أو يساوي. نتيجتها دائمًا boolean.",
        "المنطقية: && (و) تتحقق إذا تحقق الشرطان، || (أو) تتحقق إذا تحقق أحدهما، ! (النفي) تعكس القيمة.",
      ],
      goals: ["استخدام عمليات المقارنة", "ربط الشروط بـ && و||", "استخدام النفي !"],
      code: `public class Main {
    public static void main(String[] args) {
        int age = 20;
        System.out.println(age >= 18);
        System.out.println(age == 30);
        boolean hasId = true;
        System.out.println(age >= 18 && hasId);
        System.out.println(age < 10 || hasId);
        System.out.println(!hasId);
    }
}`,
      lineByLine: [
        { line: "int age = 20;", explain: "عمر الشخص." },
        { line: "System.out.println(age >= 18);", explain: "20 أكبر من أو يساوي 18 فالنتيجة true." },
        { line: "System.out.println(age == 30);", explain: "20 لا تساوي 30 فالنتيجة false." },
        { line: "boolean hasId = true;", explain: "هل يملك هوية؟" },
        { line: "System.out.println(age >= 18 && hasId);", explain: "الشرطان صحيحان فالنتيجة true." },
        { line: "System.out.println(age < 10 || hasId);", explain: "الأول خطأ والثاني صحيح، و|| تكفيها قيمة صحيحة فالنتيجة true." },
        { line: "System.out.println(!hasId);", explain: "عكس true هو false." },
      ],
      output: `true
false
true
true
false`,
      mistakes: [
        "استخدام = بدل == في المقارنة.",
        "كتابة 10 < x < 20 (غير مسموح في Java)؛ الصحيح x > 10 && x < 20.",
        "الخلط بين && و& أو || و|.",
      ],
      exercise: {
        prompt: "اطبع نتيجة: هل العدد 15 أكبر من 10 وأصغر من 20؟",
        starter: `public class Main {
    public static void main(String[] args) {
        int x = 15;

    }
}`,
        hint: "x > 10 && x < 20",
        solution: `public class Main {
    public static void main(String[] args) {
        int x = 15;
        System.out.println(x > 10 && x < 20);
    }
}`,
      },
      quiz: {
        q: "ما ناتج true && false؟",
        options: ["true", "false", "خطأ ترجمة", "null"],
        answer: 1,
        why: "&& تحتاج الشرطين صحيحين معًا، وهنا الثاني خطأ.",
      },
    },
    {
      slug: "incdec-precedence",
      title: "الزيادة والنقصان وأولوية العمليات",
      description: "++ و-- وكيف يرتب Java تنفيذ العمليات.",
      explanation: [
        "i++ تزيد القيمة بمقدار 1، و i-- تنقصها بمقدار 1. توجد أيضًا += و-= و*= لاختصار الكتابة (x += 5 تعني x = x + 5).",
        "الأولوية: الأقواس أولًا، ثم * و/ و%، ثم + و-. عند التساوي يُنفَّذ من اليسار إلى اليمين. استخدم الأقواس دائمًا لتوضيح قصدك.",
      ],
      goals: ["استخدام ++ و-- و+=", "معرفة أولوية العمليات", "استخدام الأقواس لتغيير الترتيب"],
      code: `public class Main {
    public static void main(String[] args) {
        int x = 5;
        x++;
        System.out.println(x);
        x += 10;
        System.out.println(x);
        System.out.println(2 + 3 * 4);
        System.out.println((2 + 3) * 4);
    }
}`,
      lineByLine: [
        { line: "int x = 5;", explain: "نبدأ بالقيمة 5." },
        { line: "x++;", explain: "تزيد x بمقدار 1 فتصبح 6." },
        { line: "System.out.println(x);", explain: "يطبع 6." },
        { line: "x += 10;", explain: "تعني x = x + 10 فتصبح 16." },
        { line: "System.out.println(x);", explain: "يطبع 16." },
        { line: "System.out.println(2 + 3 * 4);", explain: "الضرب قبل الجمع: 2 + 12 = 14." },
        { line: "System.out.println((2 + 3) * 4);", explain: "الأقواس أولًا: 5 * 4 = 20." },
      ],
      output: `6
16
14
20`,
      mistakes: [
        "الخلط بين x++ و++x عند استخدامها داخل تعبير أكبر.",
        "نسيان الأقواس فتتغير النتيجة.",
        "استخدام =+ بدل += (تعني إسنادًا لقيمة موجبة).",
      ],
      exercise: {
        prompt: "عرّف int n = 10، ثم أنقصه بمقدار 1 باستخدام --، ثم اطبعه.",
        starter: `public class Main {
    public static void main(String[] args) {
        int n = 10;

    }
}`,
        hint: "n--; ثم println(n);",
        solution: `public class Main {
    public static void main(String[] args) {
        int n = 10;
        n--;
        System.out.println(n);
    }
}`,
      },
      quiz: {
        q: "ما ناتج 10 - 2 * 3؟",
        options: ["24", "4", "16", "-2"],
        answer: 1,
        why: "الضرب أولًا: 2 * 3 = 6 ثم 10 - 6 = 4.",
      },
    },
  ],
};
