import type { Unit } from "./types";

export const unit5: Unit = {
  id: 5,
  title: "الحلقات التكرارية",
  description: "كرّر الأوامر بدون أن تكتبها مرات عديدة.",
  lessons: [
    {
      slug: "for-loop",
      title: "حلقة for",
      description: "التكرار عندما نعرف عدد المرات مسبقًا.",
      explanation: [
        "حلقة for لها ثلاثة أجزاء داخل الأقواس مفصولة بـ ;: البداية (int i = 1)، الشرط (i <= 5)، والتحديث (i++). تستمر الحلقة ما دام الشرط صحيحًا.",
        "ترتيب التنفيذ: تنفيذ البداية مرة واحدة، فحص الشرط، تنفيذ الجسم، تنفيذ التحديث، ثم نعود لفحص الشرط.",
      ],
      goals: ["كتابة حلقة for", "فهم أجزائها الثلاثة", "حساب مجموع بسيط بحلقة"],
      code: `public class Main {
    public static void main(String[] args) {
        int sum = 0;
        for (int i = 1; i <= 5; i++) {
            System.out.println(i);
            sum += i;
        }
        System.out.println("المجموع = " + sum);
    }
}`,
      lineByLine: [
        { line: "int sum = 0;", explain: "متغير لتجميع الأعداد، نبدأه بصفر." },
        { line: "for (int i = 1; i <= 5; i++) {", explain: "نبدأ i من 1، ونكرر ما دام i أقل من أو يساوي 5، ونزيد i بعد كل دورة." },
        { line: "System.out.println(i);", explain: "نطبع قيمة العداد." },
        { line: "sum += i;", explain: "نضيف قيمة i إلى المجموع." },
        { line: 'System.out.println("المجموع = " + sum);', explain: "بعد انتهاء الحلقة نطبع المجموع 15." },
      ],
      output: `1
2
3
4
5
المجموع = 15`,
      mistakes: [
        "استخدام فاصلة بدل ; بين أجزاء for.",
        "كتابة i < 5 والمقصود 5 مرات شاملة العدد 5.",
        "نسيان i++ فتصبح الحلقة لا نهائية.",
      ],
      exercise: {
        prompt: "اطبع الأعداد الزوجية من 2 إلى 10 باستخدام for.",
        starter: `public class Main {
    public static void main(String[] args) {

    }
}`,
        hint: "ابدأ من 2 وزد العداد 2 في كل دورة: i += 2",
        solution: `public class Main {
    public static void main(String[] args) {
        for (int i = 2; i <= 10; i += 2) {
            System.out.println(i);
        }
    }
}`,
      },
      quiz: {
        q: "كم مرة تتكرر for (int i = 0; i < 3; i++)؟",
        options: ["2", "3", "4", "لا نهائي"],
        answer: 1,
        why: "قيم i هي 0 و1 و2، أي ثلاث مرات.",
      },
    },
    {
      slug: "while-dowhile",
      title: "حلقتا while وdo while",
      description: "التكرار حتى يتغير شرط معين.",
      explanation: [
        "while تفحص الشرط أولًا، فإن كان خطأ من البداية لا تُنفَّذ أبدًا. do while تنفّذ الجسم مرة واحدة على الأقل ثم تفحص الشرط في النهاية.",
        "في الحالتين يجب أن يتغير شيء داخل الحلقة يقود الشرط إلى false في النهاية، وإلا ستدور للأبد.",
      ],
      goals: ["كتابة while", "كتابة do while", "معرفة الفرق بينهما"],
      code: `public class Main {
    public static void main(String[] args) {
        int n = 3;
        while (n > 0) {
            System.out.println("n = " + n);
            n--;
        }
        int k = 10;
        do {
            System.out.println("k = " + k);
            k++;
        } while (k < 5);
    }
}`,
      lineByLine: [
        { line: "int n = 3;", explain: "قيمة البداية." },
        { line: "while (n > 0) {", explain: "تفحص الشرط أولًا: هل n أكبر من صفر؟" },
        { line: 'System.out.println("n = " + n);', explain: "تطبع القيمة الحالية." },
        { line: "n--;", explain: "تنقص n كي ينتهي التكرار في النهاية." },
        { line: "do {", explain: "تبدأ حلقة do while: ستنفّذ الجسم مرة أولًا بدون فحص." },
        { line: "} while (k < 5);", explain: "بعد أول تنفيذ تفحص الشرط: k صارت 11 فالشرط خطأ وتتوقف. لاحظ الفاصلة المنقوطة في النهاية." },
      ],
      output: `n = 3
n = 2
n = 1
k = 10`,
      mistakes: [
        "نسيان n-- فتصبح حلقة لا نهائية.",
        "نسيان ; بعد while في do while.",
        "توقع أن do while لا تنفَّذ إذا كان الشرط خطأ من البداية (بل تنفَّذ مرة واحدة).",
      ],
      exercise: {
        prompt: "اطبع العد التنازلي من 5 إلى 1 باستخدام while.",
        starter: `public class Main {
    public static void main(String[] args) {
        int i = 5;

    }
}`,
        hint: "while (i >= 1) ثم i--;",
        solution: `public class Main {
    public static void main(String[] args) {
        int i = 5;
        while (i >= 1) {
            System.out.println(i);
            i--;
        }
    }
}`,
      },
      quiz: {
        q: "أي حلقة تُنفَّذ مرة واحدة على الأقل دائمًا؟",
        options: ["for", "while", "do while", "لا توجد"],
        answer: 2,
        why: "do while تنفّذ الجسم أولًا ثم تفحص الشرط.",
      },
    },
    {
      slug: "break-continue-nested",
      title: "break وcontinue والحلقات المتداخلة والأخطاء الشائعة",
      description: "التحكم بمسار الحلقة، وحلقة داخل حلقة.",
      explanation: [
        "break تُنهي الحلقة فورًا. continue تتخطى بقية الدورة الحالية وتنتقل للدورة التالية.",
        "الحلقة المتداخلة: حلقة داخل حلقة. الحلقة الداخلية تُكمل دورتها بالكامل في كل دورة من الخارجية. مفيدة في الجداول والأنماط.",
        "أخطاء شائعة: حلقة لا نهائية، خطأ بمقدار واحد (off-by-one)، تعديل العداد داخل الجسم بشكل غير مقصود، ووضع ; بعد for.",
      ],
      goals: ["استخدام break وcontinue", "كتابة حلقة متداخلة", "تجنّب الأخطاء الشائعة"],
      code: `public class Main {
    public static void main(String[] args) {
        for (int i = 1; i <= 5; i++) {
            if (i == 2) continue;
            if (i == 4) break;
            System.out.println("i = " + i);
        }
        for (int a = 1; a <= 2; a++) {
            for (int b = 1; b <= 3; b++) {
                System.out.println(a + " x " + b + " = " + (a * b));
            }
        }
    }
}`,
      lineByLine: [
        { line: "for (int i = 1; i <= 5; i++) {", explain: "حلقة من 1 إلى 5." },
        { line: "if (i == 2) continue;", explain: "عند i = 2 نتخطى الطباعة وننتقل للدورة التالية." },
        { line: "if (i == 4) break;", explain: "عند i = 4 نخرج من الحلقة نهائيًا." },
        { line: 'System.out.println("i = " + i);', explain: "تُطبع للقيم 1 و3 فقط." },
        { line: "for (int a = 1; a <= 2; a++) {", explain: "الحلقة الخارجية." },
        { line: "for (int b = 1; b <= 3; b++) {", explain: "الحلقة الداخلية: تدور 3 مرات لكل قيمة من a." },
        { line: 'System.out.println(a + " x " + b + " = " + (a * b));', explain: "نطبع حاصل الضرب؛ الأقواس تجعل الضرب قبل الدمج." },
      ],
      output: `i = 1
i = 3
1 x 1 = 1
1 x 2 = 2
1 x 3 = 3
2 x 1 = 2
2 x 2 = 4
2 x 3 = 6`,
      mistakes: [
        "نسيان الأقواس في (a * b) فيدمج النصوص بشكل غير مقصود.",
        "وضع ; بعد for: for (...); فتُنفَّذ الحلقة بجسم فارغ.",
        "استخدام break خارج حلقة أو switch.",
      ],
      exercise: {
        prompt: "اطبع الأعداد من 1 إلى 10 بدون الرقم 5 باستخدام continue.",
        starter: `public class Main {
    public static void main(String[] args) {

    }
}`,
        hint: "داخل الحلقة: if (i == 5) continue;",
        solution: `public class Main {
    public static void main(String[] args) {
        for (int i = 1; i <= 10; i++) {
            if (i == 5) continue;
            System.out.println(i);
        }
    }
}`,
      },
      quiz: {
        q: "ماذا تفعل continue؟",
        options: ["تنهي البرنامج", "تنهي الحلقة", "تتخطى بقية الدورة الحالية", "تعيد البرنامج من البداية"],
        answer: 2,
        why: "continue تنتقل مباشرة إلى الدورة التالية بدون تنفيذ بقية الجسم.",
      },
    },
  ],
};
