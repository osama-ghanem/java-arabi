import type { Unit } from "./types";

export const unit4: Unit = {
  id: 4,
  title: "الجمل الشرطية",
  description: "اجعل برنامجك يتخذ قرارات بناءً على الشروط.",
  lessons: [
    {
      slug: "if-else",
      title: "if وelse وelse if",
      description: "تنفيذ كود مختلف بحسب الشرط.",
      explanation: [
        "if تنفّذ كتلة الكود إذا كان الشرط true. else تنفّذ كتلة بديلة إذا كان الشرط false. else if تسمح بفحص شروط إضافية بالترتيب، وتتوقف عند أول شرط صحيح.",
        "الشرط يوضع بين أقواس () ويجب أن يكون boolean. وننصح دائمًا بكتابة الأقواس { } حتى لو كان هناك سطر واحد.",
      ],
      goals: ["كتابة if/else", "استخدام else if لعدة حالات", "فهم ترتيب فحص الشروط"],
      code: `public class Main {
    public static void main(String[] args) {
        int score = 75;
        if (score >= 90) {
            System.out.println("ممتاز");
        } else if (score >= 60) {
            System.out.println("ناجح");
        } else {
            System.out.println("راسب");
        }
    }
}`,
      lineByLine: [
        { line: "int score = 75;", explain: "الدرجة." },
        { line: "if (score >= 90) {", explain: "هل الدرجة 90 أو أكثر؟ لا (75)، ننتقل للشرط التالي." },
        { line: 'System.out.println("ممتاز");', explain: "لن تُنفَّذ." },
        { line: "} else if (score >= 60) {", explain: "هل 60 أو أكثر؟ نعم، فننفذ هذه الكتلة ونتجاهل الباقي." },
        { line: 'System.out.println("ناجح");', explain: "هذه هي التي ستُطبع." },
        { line: "} else {", explain: "الحالة الأخيرة إذا لم يتحقق أي شرط سابق." },
        { line: 'System.out.println("راسب");', explain: "لن تُنفَّذ." },
      ],
      output: "ناجح",
      mistakes: [
        "استخدام = بدل == داخل الشرط.",
        "وضع ; بعد if مباشرة: if (x > 5); فتصبح الكتلة التالية خارج الشرط.",
        "ترتيب الشروط بشكل خاطئ (الشرط الأوسع أولًا يبتلع الأضيق).",
      ],
      exercise: {
        prompt: "اكتب برنامجًا يطبع «موجب» إذا كان العدد num أكبر من 0، و«سالب» إذا كان أقل من 0، و«صفر» غير ذلك.",
        starter: `public class Main {
    public static void main(String[] args) {
        int num = -4;

    }
}`,
        hint: "استخدم if ثم else if ثم else.",
        solution: `public class Main {
    public static void main(String[] args) {
        int num = -4;
        if (num > 0) {
            System.out.println("موجب");
        } else if (num < 0) {
            System.out.println("سالب");
        } else {
            System.out.println("صفر");
        }
    }
}`,
      },
      quiz: {
        q: "متى تُنفَّذ كتلة else؟",
        options: ["دائمًا", "عندما يكون شرط if خاطئًا", "عندما يكون شرط if صحيحًا", "قبل if"],
        answer: 1,
        why: "else هي البديل التي تُنفَّذ إذا لم يتحقق الشرط السابق.",
      },
    },
    {
      slug: "switch-case",
      title: "جملة switch",
      description: "اختيار حالة من عدة حالات بقيمة محددة.",
      explanation: [
        "switch مناسبة عندما نقارن متغيرًا واحدًا بعدة قيم ثابتة. كل حالة تبدأ بـ case وتنتهي بـ break لمنع الانتقال للحالة التالية. وdefault تُنفَّذ إذا لم تتطابق أي حالة.",
        "نسيان break يجعل Java «تسقط» وتنفّذ الحالات التالية أيضًا (Fall-through).",
      ],
      goals: ["كتابة switch كاملة", "فهم دور break وdefault"],
      code: `public class Main {
    public static void main(String[] args) {
        int day = 3;
        switch (day) {
            case 1:
                System.out.println("السبت");
                break;
            case 2:
                System.out.println("الأحد");
                break;
            case 3:
                System.out.println("الاثنين");
                break;
            default:
                System.out.println("يوم آخر");
        }
    }
}`,
      lineByLine: [
        { line: "int day = 3;", explain: "القيمة التي سنفحصها." },
        { line: "switch (day) {", explain: "نبدأ switch على المتغير day." },
        { line: "case 1:", explain: "إذا كانت day تساوي 1." },
        { line: "break;", explain: "يخرج من switch بعد تنفيذ الحالة." },
        { line: "case 3:", explain: "تتطابق مع القيمة 3 فتُنفَّذ." },
        { line: 'System.out.println("الاثنين");', explain: "تطبع الاثنين." },
        { line: "default:", explain: "تُنفَّذ إذا لم يتطابق أي case." },
      ],
      output: "الاثنين",
      mistakes: [
        "نسيان break فتُطبع نتائج أكثر من حالة.",
        "استخدام نطاق في case (case > 5) غير مسموح.",
        "تكرار نفس قيمة case مرتين.",
      ],
      exercise: {
        prompt: "اكتب switch على المتغير level: 1 يطبع «مبتدئ»، 2 يطبع «متوسط»، وغير ذلك «متقدم».",
        starter: `public class Main {
    public static void main(String[] args) {
        int level = 2;

    }
}`,
        hint: "لا تنسَ break بعد كل case.",
        solution: `public class Main {
    public static void main(String[] args) {
        int level = 2;
        switch (level) {
            case 1:
                System.out.println("مبتدئ");
                break;
            case 2:
                System.out.println("متوسط");
                break;
            default:
                System.out.println("متقدم");
        }
    }
}`,
      },
      quiz: {
        q: "ماذا يحدث لو نسيت break في case؟",
        options: ["خطأ ترجمة", "ينفذ الحالات التي بعدها أيضًا", "يتوقف البرنامج", "لا شيء"],
        answer: 1,
        why: "يحدث Fall-through فيستمر التنفيذ في الحالة التالية حتى يجد break.",
      },
    },
    {
      slug: "compound-conditions",
      title: "الشروط المركبة والمقارنة بين النصوص",
      description: "دمج عدة شروط، ومقارنة النصوص بـ equals.",
      explanation: [
        "نربط عدة شروط داخل if واحدة بـ && و||. استخدم الأقواس لتوضيح الترتيب.",
        "لمقارنة نصين لا تستخدم ==، بل equals: name.equals(\"Ali\"). لأن == تقارن مكان التخزين في الذاكرة وليس محتوى النص. وequalsIgnoreCase تتجاهل حالة الأحرف.",
      ],
      goals: ["كتابة شرط مركب", "مقارنة النصوص بشكل صحيح"],
      code: `public class Main {
    public static void main(String[] args) {
        String user = "admin";
        String pass = "1234";
        if (user.equals("admin") && pass.equals("1234")) {
            System.out.println("تم الدخول");
        } else {
            System.out.println("بيانات خاطئة");
        }
        System.out.println(user.equalsIgnoreCase("ADMIN"));
    }
}`,
      lineByLine: [
        { line: 'String user = "admin";', explain: "اسم المستخدم." },
        { line: 'String pass = "1234";', explain: "كلمة المرور." },
        { line: 'if (user.equals("admin") && pass.equals("1234")) {', explain: "الشرطان يجب أن يتحققا معًا." },
        { line: 'System.out.println("تم الدخول");', explain: "تُطبع لأن الشرطين صحيحان." },
        { line: 'System.out.println(user.equalsIgnoreCase("ADMIN"));', explain: "مقارنة بتجاهل حالة الأحرف فالنتيجة true." },
      ],
      output: `تم الدخول
true`,
      mistakes: [
        'if (user == "admin") — قد تعطي نتيجة غير متوقعة، استخدم equals.',
        "نسيان الأقواس حول الشرط المركب.",
        "خلط && و|| دون أقواس.",
      ],
      exercise: {
        prompt: "اطبع «مسموح» إذا كان العمر age بين 18 و60 (شاملًا) وإلا اطبع «غير مسموح».",
        starter: `public class Main {
    public static void main(String[] args) {
        int age = 25;

    }
}`,
        hint: "age >= 18 && age <= 60",
        solution: `public class Main {
    public static void main(String[] args) {
        int age = 25;
        if (age >= 18 && age <= 60) {
            System.out.println("مسموح");
        } else {
            System.out.println("غير مسموح");
        }
    }
}`,
      },
      quiz: {
        q: "ما الطريقة الصحيحة لمقارنة محتوى نصين؟",
        options: ["a == b", "a = b", "a.equals(b)", "a.same(b)"],
        answer: 2,
        why: "equals تقارن محتوى النصين، أما == فتقارن المراجع في الذاكرة.",
      },
    },
  ],
};
