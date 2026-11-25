import type { Unit } from "./types";

export const unit9: Unit = {
  id: 9,
  title: "معالجة الأخطاء",
  description: "اجعل برنامجك يتعامل مع الأخطاء بدل أن ينهار.",
  lessons: [
    {
      slug: "try-catch-finally",
      title: "try وcatch وfinally وأنواع الأخطاء",
      description: "الإمساك بالاستثناءات والتعامل معها.",
      explanation: [
        "أخطاء الترجمة (Compile-time) يكتشفها المترجم قبل التشغيل مثل نسيان ;. أخطاء وقت التشغيل (Runtime / Exceptions) تحدث أثناء التشغيل مثل القسمة على صفر. وهناك أخطاء منطقية: البرنامج يعمل لكن بنتيجة خاطئة.",
        "نضع الكود المحتمل أن يفشل داخل try، وإذا حدث استثناء نمسكه في catch. وfinally تُنفَّذ دائمًا سواء حدث خطأ أم لا (مثل إغلاق الموارد).",
      ],
      goals: ["استخدام try/catch/finally", "التفرقة بين أنواع الأخطاء"],
      code: `public class Main {
    public static void main(String[] args) {
        try {
            int x = 10 / 0;
            System.out.println(x);
        } catch (ArithmeticException e) {
            System.out.println("لا يمكن القسمة على صفر");
        } finally {
            System.out.println("انتهى الفحص");
        }
    }
}`,
      lineByLine: [
        { line: "try {", explain: "نبدأ الكتلة التي قد يحدث فيها خطأ." },
        { line: "int x = 10 / 0;", explain: "القسمة على صفر ترمي ArithmeticException." },
        { line: "System.out.println(x);", explain: "لا تُنفَّذ لأن الاستثناء حدث قبلها." },
        { line: "} catch (ArithmeticException e) {", explain: "نمسك هذا النوع من الأخطاء. e يحمل تفاصيله." },
        { line: 'System.out.println("لا يمكن القسمة على صفر");', explain: "رسالة ودية للمستخدم." },
        { line: "} finally {", explain: "تُنفَّذ في كل الأحوال." },
      ],
      output: `لا يمكن القسمة على صفر
انتهى الفحص`,
      mistakes: [
        "كتابة catch بدون try.",
        "التقاط Exception عامًا دائمًا فيخفي أخطاء مهمة.",
        "ترك catch فارغة فلا تعرف سبب المشكلة.",
      ],
      exercise: {
        prompt: "ضع طباعة nums[5] لمصفوفة طولها 3 داخل try، وامسك ArrayIndexOutOfBoundsException واطبع «فهرس خاطئ».",
        starter: `public class Main {
    public static void main(String[] args) {
        int[] nums = {1, 2, 3};

    }
}`,
        hint: "catch (ArrayIndexOutOfBoundsException e)",
        solution: `public class Main {
    public static void main(String[] args) {
        int[] nums = {1, 2, 3};
        try {
            System.out.println(nums[5]);
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("فهرس خاطئ");
        }
    }
}`,
      },
      quiz: {
        q: "متى تُنفَّذ كتلة finally؟",
        options: ["فقط عند حدوث خطأ", "فقط عند عدم حدوث خطأ", "في كل الأحوال", "أبدًا"],
        answer: 2,
        why: "finally تُنفَّذ سواء حدث استثناء أم لا.",
      },
    },
    {
      slug: "throw-throws",
      title: "throw وthrows",
      description: "رمي الاستثناءات بأنفسنا وتفويضها.",
      explanation: [
        "throw تُستخدم لرمي استثناء بشكل يدوي عند اكتشاف حالة خاطئة: throw new IllegalArgumentException(\"رسالة\"); أما throws فتُكتب في تعريف الدالة لتعلن أنها قد ترمي استثناءً من نوع معين، ويتولى من يستدعيها معالجته.",
      ],
      goals: ["رمي استثناء بـ throw", "إعلان throws في الدالة"],
      code: `public class Main {
    static void setAge(int age) throws Exception {
        if (age < 0) {
            throw new Exception("العمر لا يمكن أن يكون سالبًا");
        }
        System.out.println("العمر = " + age);
    }

    public static void main(String[] args) {
        try {
            setAge(20);
            setAge(-5);
        } catch (Exception e) {
            System.out.println("خطأ: " + e.getMessage());
        }
    }
}`,
      lineByLine: [
        { line: "static void setAge(int age) throws Exception {", explain: "throws تعلن أن الدالة قد ترمي Exception." },
        { line: "if (age < 0) {", explain: "نفحص الحالة الخاطئة." },
        { line: 'throw new Exception("العمر لا يمكن أن يكون سالبًا");', explain: "نرمي استثناء جديدًا برسالة." },
        { line: "setAge(20);", explain: "ينجح ويطبع العمر." },
        { line: "setAge(-5);", explain: "يرمي استثناء فينتقل التنفيذ إلى catch." },
        { line: 'System.out.println("خطأ: " + e.getMessage());', explain: "getMessage تعطي نص الرسالة." },
      ],
      output: `العمر = 20
خطأ: العمر لا يمكن أن يكون سالبًا`,
      mistakes: [
        "الخلط بين throw (رمي فعلي) وthrows (إعلان).",
        "نسيان معالجة استثناء checked أو إعلانه بـ throws فيرفض المترجم.",
      ],
      exercise: {
        prompt: "اكتب دالة divide(a, b) ترمي Exception برسالة «القسمة على صفر» إذا كان b يساوي 0، واستدعها داخل try/catch.",
        starter: `public class Main {
    public static void main(String[] args) {

    }
}`,
        hint: "static int divide(int a, int b) throws Exception",
        solution: `public class Main {
    static int divide(int a, int b) throws Exception {
        if (b == 0) {
            throw new Exception("القسمة على صفر");
        }
        return a / b;
    }

    public static void main(String[] args) {
        try {
            System.out.println(divide(10, 0));
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }
}`,
      },
      quiz: {
        q: "أي كلمة تُكتب في تعريف الدالة للإعلان عن استثناء محتمل؟",
        options: ["throw", "throws", "catch", "finally"],
        answer: 1,
        why: "throws تُكتب بعد قائمة المعطيات للإعلان عن الاستثناءات.",
      },
    },
    {
      slug: "user-errors",
      title: "التعامل مع أخطاء المستخدم",
      description: "التحقق من المدخلات ورسائل واضحة.",
      explanation: [
        "المستخدم قد يدخل نصًا بدل رقم. عند تحويل نص إلى رقم بـ Integer.parseInt قد يحدث NumberFormatException. الحل: التقاطه وإظهار رسالة مفهومة بدل انهيار البرنامج.",
        "قاعدة جيدة: تحقق من المدخل قبل استخدامه، واكتب رسالة تخبر المستخدم ماذا يفعل.",
      ],
      goals: ["تحويل نص إلى رقم بأمان", "التقاط NumberFormatException"],
      code: `public class Main {
    static void parse(String text) {
        try {
            int n = Integer.parseInt(text);
            System.out.println("الرقم: " + n);
        } catch (NumberFormatException e) {
            System.out.println("\\"" + text + "\\" ليس رقمًا صحيحًا");
        }
    }

    public static void main(String[] args) {
        parse("42");
        parse("abc");
    }
}`,
      lineByLine: [
        { line: "int n = Integer.parseInt(text);", explain: "تحاول تحويل النص إلى int وترمي استثناء إن فشلت." },
        { line: "} catch (NumberFormatException e) {", explain: "نمسك خطأ الصيغة تحديدًا." },
        { line: 'System.out.println("\\"" + text + "\\" ليس رقمًا صحيحًا");', explain: "الرمز \\\" يطبع علامة اقتباس داخل النص." },
        { line: 'parse("42");', explain: "ناجح." },
        { line: 'parse("abc");', explain: "يفشل التحويل فتظهر الرسالة." },
      ],
      output: `الرقم: 42
"abc" ليس رقمًا صحيحًا`,
      mistakes: [
        "استخدام parseInt مباشرة على مدخل المستخدم بدون try/catch.",
        "رسائل خطأ غامضة مثل «خطأ» بدون توضيح.",
      ],
      exercise: {
        prompt: "اكتب كودًا يحاول تحويل «12x» إلى رقم ويطبع «مدخل غير صالح» عند الفشل.",
        starter: `public class Main {
    public static void main(String[] args) {

    }
}`,
        hint: "Integer.parseInt داخل try.",
        solution: `public class Main {
    public static void main(String[] args) {
        try {
            int n = Integer.parseInt("12x");
            System.out.println(n);
        } catch (NumberFormatException e) {
            System.out.println("مدخل غير صالح");
        }
    }
}`,
      },
      quiz: {
        q: "أي استثناء يظهر عند Integer.parseInt(\"abc\")؟",
        options: ["ArithmeticException", "NumberFormatException", "NullPointerException", "IOException"],
        answer: 1,
        why: "النص لا يطابق صيغة عدد صحيح فيرمي NumberFormatException.",
      },
    },
  ],
};
