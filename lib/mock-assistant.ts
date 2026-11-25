type Entry = { keys: string[]; answer: string };

const KB: Entry[] = [
  {
    keys: ["main", "الدالة الرئيسية"],
    answer: `الدالة **main** هي نقطة بداية أي برنامج Java؛ عندما تشغّل البرنامج يبحث Java عنها وينفذ ما بداخلها.

\`\`\`java
public static void main(String[] args) {
    System.out.println("أنا أبدأ من هنا");
}
\`\`\`

- public: يمكن لـ Java الوصول إليها من الخارج.
- static: تعمل بدون إنشاء كائن من الكلاس.
- void: لا ترجع قيمة.
- String[] args: مصفوفة نصوص تستقبل أي معلومات تُمرَّر عند التشغيل.`,
  },
  {
    keys: ["class", "كلاس", "صنف"],
    answer: `الـ **class** هو القالب الذي يحتوي كود Java. في أول برنامج يكون اسم الكلاس مطابقًا لاسم الملف.

\`\`\`java
public class Main {
    // الكود هنا
}
\`\`\`

قاعدة: اسم الكلاس يبدأ بحرف كبير (Main, Student).`,
  },
  {
    keys: ["int", "double", "متغير", "نوع", "أنواع البيانات", "variable"],
    answer: `المتغير صندوق له اسم ونوع يخزّن قيمة:

\`\`\`java
int age = 20;          // عدد صحيح
double price = 9.99;   // عدد عشري
String name = "Sara";  // نص
char grade = 'A';      // حرف واحد
boolean ok = true;     // true أو false
\`\`\`

اختر النوع حسب القيمة، واكتب الاسم بحروف صغيرة في البداية (camelCase).`,
  },
  {
    keys: ["if", "else", "شرط", "الشرطية"],
    answer: `الجملة الشرطية تنفّذ كودًا فقط عندما يتحقق الشرط:

\`\`\`java
int score = 75;
if (score >= 90) {
    System.out.println("ممتاز");
} else if (score >= 60) {
    System.out.println("ناجح");
} else {
    System.out.println("راسب");
}
\`\`\`

انتبه: المقارنة بـ == وليست =.`,
  },
  {
    keys: ["for", "while", "حلقة", "حلقات", "تكرار", "loop"],
    answer: `الحلقات تكرر الكود:

\`\`\`java
for (int i = 1; i <= 5; i++) {
    System.out.println(i);
}
\`\`\`

for: عندما تعرف عدد التكرارات. while: عندما تكرر حتى يتغير شرط. احذر من حلقة لا تنتهي (نسيان i++).`,
  },
  {
    keys: ["array", "مصفوفة", "مصفوفات"],
    answer: `المصفوفة تخزن عدة قيم من نفس النوع:

\`\`\`java
int[] nums = {10, 20, 30};
System.out.println(nums[0]);      // 10
System.out.println(nums.length);  // 3
\`\`\`

الفهرس يبدأ من 0، وآخر فهرس هو length - 1. تجاوزه يسبب ArrayIndexOutOfBoundsException.`,
  },
  {
    keys: ["method", "دالة", "دوال", "return", "void"],
    answer: `الدالة (Method) كود له اسم يمكن استدعاؤه مرارًا:

\`\`\`java
static int add(int a, int b) {
    return a + b;
}
// الاستدعاء:
int sum = add(3, 4); // 7
\`\`\`

void تعني أن الدالة لا ترجع قيمة، أما int مثلًا فتعني أنها ترجع عددًا صحيحًا عبر return.`,
  },
  {
    keys: ["oop", "كائني", "object", "constructor", "كائن"],
    answer: `في البرمجة الكائنية نمثل الأشياء بـ class، ونصنع منها كائنات:

\`\`\`java
class Student {
    String name;
    Student(String name) { this.name = name; }   // constructor
    void hello() { System.out.println("أنا " + name); }
}
// الاستخدام:
Student s = new Student("Omar");
s.hello();
\`\`\`

الـ class هو التصميم، والـ object هو النسخة الحقيقية منه.`,
  },
  {
    keys: ["inheritance", "وراثة", "extends", "polymorphism", "تعدد الأشكال"],
    answer: `الوراثة تجعل class يأخذ خصائص class آخر بكلمة extends:

\`\`\`java
class Animal { void sound() { System.out.println("..."); } }
class Cat extends Animal {
    @Override void sound() { System.out.println("مواء"); }
}
Animal a = new Cat();
a.sound(); // مواء  ← هذا هو Polymorphism
\`\`\``,
  },
  {
    keys: ["try", "catch", "exception", "استثناء", "أخطاء", "خطأ"],
    answer: `try/catch يمنع انهيار البرنامج عند حدوث خطأ وقت التشغيل:

\`\`\`java
try {
    int x = 10 / 0;
} catch (ArithmeticException e) {
    System.out.println("لا يمكن القسمة على صفر");
} finally {
    System.out.println("يُنفَّذ دائمًا");
}
\`\`\``,
  },
  {
    keys: ["ثابت", "final", "constant"],
    answer: `الثابت قيمة لا تتغير بعد تعريفها، نستخدم final:

\`\`\`java
final double PI = 3.14159;
// PI = 3; // خطأ: لا يمكن تغيير قيمة ثابت
\`\`\`

العرف: أسماء الثوابت بحروف كبيرة.`,
  },
  {
    keys: ["string", "نص", "نصوص", "equals"],
    answer: `لمقارنة النصوص استخدم equals وليس ==:

\`\`\`java
String a = "Java";
if (a.equals("Java")) {
    System.out.println("متطابقان");
}
\`\`\`

دوال مفيدة: length() و toUpperCase() و substring().`,
  },
  {
    keys: ["تثبيت", "install", "jdk", "intellij"],
    answer: `للبدء: ثبّت JDK (مثل Temurin أو Oracle JDK)، ثم تحقق من الطرفية بـ \`java -version\`. بعدها ثبّت IntelliJ IDEA Community وأنشئ مشروع Java جديدًا وملف Main. كل الخطوات مشروحة في الوحدة الأولى.`,
  },
];

export function mockAnswer(question: string): string {
  const q = question.toLowerCase();
  const hit = KB.find((e) => e.keys.some((k) => q.includes(k.toLowerCase())));
  if (hit) return hit.answer + "\n\n_(رد تجريبي: أضف ANTHROPIC_API_KEY في .env.local لتفعيل المساعد الذكي الكامل.)_";
  return `سؤال جميل! في الوضع التجريبي أعرف الإجابة عن مواضيع مثل: main، class، المتغيرات، if، الحلقات، المصفوفات، الدوال، OOP، الوراثة، try/catch.

جرّب أن تسأل مثلًا: "ما الفرق بين int و double؟" أو "كيف أكتب حلقة for؟"

_(لتفعيل مساعد ذكي يجيب عن أي سؤال، أضف ANTHROPIC_API_KEY في .env.local.)_`;
}
