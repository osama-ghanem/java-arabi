import type { Unit } from "./types";

export const unit1: Unit = {
  id: 1,
  title: "أساسيات Java",
  description: "تعرّف على Java، ثبّت أدواتك، واكتب وشغّل أول برنامج لك.",
  lessons: [
    {
      slug: "what-is-java",
      title: "ما هي لغة Java ومميزاتها؟",
      description: "نظرة سريعة على Java ولماذا هي من أكثر لغات البرمجة استخدامًا في العالم.",
      explanation: [
        "Java لغة برمجة قوية وعامة الاستخدام، ظهرت عام 1995، وتُستخدم في تطبيقات أندرويد، والأنظمة البنكية، وتطبيقات الويب الكبيرة، والألعاب، وغيرها.",
        "شعارها الشهير: «اكتبه مرة واحدة وشغّله في أي مكان». السبب أن كود Java يُترجم إلى صيغة وسيطة تسمى Bytecode، وتشغّلها آلة افتراضية تسمى JVM موجودة لكل نظام (ويندوز، ماك، لينكس).",
        "من مميزاتها: سهلة القراءة نسبيًا، صارمة في الأنواع (تساعدك على اكتشاف الأخطاء مبكرًا)، تدعم البرمجة الكائنية، مجتمعها ضخم، ومكتباتها كثيرة، وفرص العمل بها واسعة.",
      ],
      goals: ["فهم ما هي Java واستخداماتها", "معرفة معنى JDK وJVM وBytecode", "كتابة أول سطر طباعة"],
      code: `public class Main {
    public static void main(String[] args) {
        System.out.println("مرحبًا من Java!");
    }
}`,
      lineByLine: [
        { line: "public class Main {", explain: "نعرّف كلاس اسمه Main. كل كود Java يعيش داخل class. القوس { يفتح جسم الكلاس." },
        { line: "public static void main(String[] args) {", explain: "الدالة main: نقطة بداية البرنامج. من هنا يبدأ Java التنفيذ." },
        { line: 'System.out.println("مرحبًا من Java!");', explain: "تطبع النص بين علامتي الاقتباس على الشاشة ثم تنتقل لسطر جديد. تنتهي بفاصلة منقوطة ;" },
        { line: "}", explain: "يغلق الدالة main." },
        { line: "}", explain: "يغلق الكلاس Main." },
      ],
      output: "مرحبًا من Java!",
      mistakes: [
        "كتابة system بحرف صغير بدل System.",
        "نسيان الفاصلة المنقوطة ; في نهاية سطر الطباعة.",
        "نسيان إغلاق أحد الأقواس { }.",
      ],
      exercise: {
        prompt: "عدّل الكود ليطبع: أنا أتعلم Java",
        starter: `public class Main {
    public static void main(String[] args) {
        System.out.println("اكتب هنا");
    }
}`,
        hint: "غيّر النص الموجود بين علامتي الاقتباس فقط.",
        solution: `public class Main {
    public static void main(String[] args) {
        System.out.println("أنا أتعلم Java");
    }
}`,
      },
      quiz: {
        q: "ما وظيفة الـ JVM؟",
        options: ["كتابة الكود نيابة عنك", "تشغيل Bytecode على أي نظام تشغيل", "تصميم واجهات المستخدم", "تخزين البيانات"],
        answer: 1,
        why: "الـ JVM هي الآلة الافتراضية التي تشغّل Bytecode، ولهذا يعمل نفس البرنامج على أنظمة مختلفة.",
      },
    },
    {
      slug: "install-java",
      title: "تثبيت Java وIntelliJ IDEA",
      description: "جهّز جهازك: ثبّت JDK وبيئة التطوير IntelliJ IDEA وأنشئ أول مشروع.",
      explanation: [
        "تحتاج شيئين: الأول JDK (Java Development Kit) وهو الذي يحتوي المترجم javac والآلة JVM. الثاني بيئة تطوير (IDE) مثل IntelliJ IDEA Community وهي مجانية وممتازة للمبتدئين، ويمكن استخدام VS Code أو Eclipse أيضًا.",
        "الخطوات: (1) نزّل JDK من موقع Oracle أو Adoptium (Temurin) واختر إصدار LTS حديثًا مثل 21. (2) ثبّته واتبع المعالج. (3) افتح الطرفية (Terminal / CMD) واكتب: java -version للتأكد. (4) نزّل IntelliJ IDEA Community من موقع JetBrains وثبّته. (5) اختر New Project ثم Java، واختر الـ JDK، وأنشئ ملف Main.java.",
        "إذا ظهر أن الأمر java غير معروف، فغالبًا لم تتم إضافة مسار JDK إلى متغير PATH، وأغلب المثبّتات تفعل ذلك تلقائيًا؛ جرّب إعادة تشغيل الطرفية أو الجهاز.",
      ],
      goals: ["تثبيت JDK", "تثبيت IntelliJ IDEA", "إنشاء أول مشروع والتأكد من نسخة Java"],
      code: `public class Main {
    public static void main(String[] args) {
        System.out.println(System.getProperty("java.version"));
    }
}`,
      lineByLine: [
        { line: "public class Main {", explain: "كلاس البرنامج." },
        { line: "public static void main(String[] args) {", explain: "نقطة البداية." },
        { line: 'System.out.println(System.getProperty("java.version"));', explain: "نسأل Java عن رقم نسختها ونطبعه. getProperty تجلب معلومة من النظام." },
        { line: "}", explain: "نهاية main." },
        { line: "}", explain: "نهاية الكلاس." },
      ],
      output: "21.0.2   (الرقم يختلف حسب النسخة المثبتة عندك)",
      mistakes: [
        "تحميل JRE فقط بدل JDK (لن تتمكن من الترجمة).",
        "اختيار JDK غير مضبوط داخل إعدادات المشروع في IntelliJ.",
        "تسمية الملف بغير اسم الكلاس العام (Main.java للكلاس Main).",
      ],
      exercise: {
        prompt: "اكتب برنامجًا يطبع: تم تثبيت Java بنجاح",
        starter: `public class Main {
    public static void main(String[] args) {

    }
}`,
        hint: "استخدم System.out.println داخل main.",
        solution: `public class Main {
    public static void main(String[] args) {
        System.out.println("تم تثبيت Java بنجاح");
    }
}`,
      },
      quiz: {
        q: "أي أمر في الطرفية يتحقق من نسخة Java المثبتة؟",
        options: ["java -version", "javac install", "run java", "jdk --check"],
        answer: 0,
        why: "الأمر java -version يعرض رقم النسخة إن كانت Java مثبتة ومضافة إلى PATH.",
      },
    },
    {
      slug: "first-program",
      title: "أول برنامج Java: class وmain وكل رمز فيه",
      description: "نفهم كل كلمة ورمز في أول برنامج: public, static, void, String[] args، والأقواس.",
      explanation: [
        "هدف هذا البرنامج: تعريف متغير يحمل عمرًا ثم طباعته. نبدأ دائمًا بتعريف الكلاس، ثم نضع بداخله الدالة main، ثم نكتب الأوامر داخل main.",
        "اسم الكلاس: نختاره بحرف كبير في البداية (Main). وإذا كان public فيجب أن يطابق اسم الملف Main.java.",
        "الدالة main: بدونها لا يعرف Java من أين يبدأ. وكل كلمة في سطرها لها معنى: public (متاحة من الخارج)، static (تعمل بدون إنشاء كائن)، void (لا ترجع قيمة)، String[] args (مصفوفة نصوص تستقبل معطيات التشغيل).",
        "الأقواس: () للمعطيات، { } لتحديد بداية الكتلة ونهايتها، [] للمصفوفات. الفاصلة المنقوطة ; تنهي الجملة. علامات الاقتباس \" \" تحيط بالنص، والمتغير يخزّن قيمة باسم تختاره.",
      ],
      goals: ["كتابة class وmain من الذاكرة", "فهم معنى public وstatic وvoid وString[] args", "فهم دور { } و; و\" \""],
      code: `public class Main {
    public static void main(String[] args) {
        int age = 20;
        System.out.println(age);
    }
}`,
      lineByLine: [
        { line: "public class Main {", explain: "public: متاح للجميع. class: نعرّف كلاس. Main: اسمه (يطابق اسم الملف). { تفتح جسمه." },
        { line: "public static void main(String[] args) {", explain: "public: يراها JVM. static: تُشغَّل بدون كائن. void: لا ترجع شيئًا. main: الاسم المحجوز لنقطة البداية. String[] args: مصفوفة نصوص للمعطيات." },
        { line: "int age = 20;", explain: "نعرّف متغيرًا نوعه int (عدد صحيح) اسمه age وقيمته 20. الفاصلة المنقوطة تنهي الجملة." },
        { line: "System.out.println(age);", explain: "نطبع قيمة المتغير age. لاحظ أنه لا توجد علامات اقتباس لأننا نطبع متغيرًا لا نصًا." },
        { line: "}", explain: "يغلق main." },
        { line: "}", explain: "يغلق الكلاس." },
      ],
      output: "20",
      mistakes: [
        "كتابة Main بحرف صغير في الملف واسم الكلاس مختلفًا عنه.",
        "كتابة String[] args بشكل خاطئ مثل string[] args.",
        'وضع age بين علامات اقتباس "age" فيطبع الكلمة age بدل القيمة.',
        "نسيان الفاصلة المنقوطة بعد int age = 20",
      ],
      exercise: {
        prompt: "عرّف متغير int اسمه year قيمته 2026 ثم اطبعه.",
        starter: `public class Main {
    public static void main(String[] args) {
        // اكتب هنا
    }
}`,
        hint: "int year = 2026; ثم System.out.println(year);",
        solution: `public class Main {
    public static void main(String[] args) {
        int year = 2026;
        System.out.println(year);
    }
}`,
      },
      quiz: {
        q: "ماذا تعني كلمة void في main؟",
        options: ["الدالة ترجع رقمًا", "الدالة لا ترجع أي قيمة", "الدالة خاصة", "الدالة ثابتة"],
        answer: 1,
        why: "void تعني أن الدالة تنفّذ عملًا لكنها لا تُرجع قيمة.",
      },
    },
    {
      slug: "run-program",
      title: "كتابة الكود وتشغيل البرنامج",
      description: "كيف تترجم الكود وتشغّله من الطرفية أو من IntelliJ، وكيف تقرأ رسائل الخطأ.",
      explanation: [
        "في IntelliJ: اضغط على السهم الأخضر بجانب main واختر Run. ستظهر النتيجة في نافذة Run بالأسفل.",
        "من الطرفية: احفظ الملف باسم Main.java ثم نفّذ javac Main.java لترجمته (ينتج Main.class)، ثم java Main لتشغيله. لاحظ أنك تكتب الاسم بدون امتداد في أمر java.",
        "إذا كان في الكود خطأ ستظهر رسالة من المترجم تحتوي اسم الملف ورقم السطر ونوع الخطأ. اقرأها من الأعلى، فالخطأ الأول غالبًا هو السبب الحقيقي.",
      ],
      goals: ["تشغيل برنامج من IntelliJ", "ترجمة وتشغيل برنامج من الطرفية", "قراءة رسالة خطأ بسيطة"],
      code: `public class Main {
    public static void main(String[] args) {
        System.out.println("السطر الأول");
        System.out.println("السطر الثاني");
        System.out.print("بدون ");
        System.out.print("سطر جديد");
    }
}`,
      lineByLine: [
        { line: 'System.out.println("السطر الأول");', explain: "تطبع وتنزل لسطر جديد." },
        { line: 'System.out.println("السطر الثاني");', explain: "تطبع في السطر التالي." },
        { line: 'System.out.print("بدون ");', explain: "print تطبع بدون الانتقال لسطر جديد." },
        { line: 'System.out.print("سطر جديد");', explain: "تكمل الطباعة في نفس السطر." },
      ],
      output: `السطر الأول
السطر الثاني
بدون سطر جديد`,
      mistakes: [
        "تشغيل java Main.java بدل java Main بعد الترجمة (في الإصدارات الحديثة يعمل لكنه يترجم ويشغّل مباشرة).",
        "الخلط بين print وprintln.",
        "حفظ الملف بامتداد .txt بدل .java.",
      ],
      exercise: {
        prompt: "اطبع اسمك في سطر، وفي السطر التالي اطبع: أتعلم Java",
        starter: `public class Main {
    public static void main(String[] args) {

    }
}`,
        hint: "استخدم println مرتين.",
        solution: `public class Main {
    public static void main(String[] args) {
        System.out.println("أحمد");
        System.out.println("أتعلم Java");
    }
}`,
      },
      quiz: {
        q: "ما الفرق بين print وprintln؟",
        options: ["لا فرق", "println تنتقل لسطر جديد بعد الطباعة", "print تطبع بخط أكبر", "println للأرقام فقط"],
        answer: 1,
        why: "println تضيف سطرًا جديدًا بعد النص، أما print فتبقى في نفس السطر.",
      },
    },
  ],
};
