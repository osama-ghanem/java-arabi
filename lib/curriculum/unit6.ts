import type { Unit } from "./types";

export const unit6: Unit = {
  id: 6,
  title: "المصفوفات",
  description: "تخزين مجموعة قيم من نفس النوع في متغير واحد.",
  lessons: [
    {
      slug: "array-basics",
      title: "إنشاء المصفوفة وقراءة وتعديل العناصر",
      description: "الفهرس، length، وتعديل القيم.",
      explanation: [
        "المصفوفة (Array) تخزن عدة قيم من نفس النوع. نعرّفها هكذا: int[] nums = {10, 20, 30}; أو int[] nums = new int[3]; (3 خانات قيمتها الأولية صفر).",
        "الوصول لعنصر يكون بالفهرس بين [ ]. الفهرس يبدأ من 0. وطول المصفوفة نعرفه بـ nums.length (بدون أقواس). حجم المصفوفة ثابت بعد إنشائها.",
      ],
      goals: ["إنشاء مصفوفة", "قراءة وتعديل العناصر بالفهرس", "استخدام length"],
      code: `public class Main {
    public static void main(String[] args) {
        int[] nums = {10, 20, 30};
        System.out.println(nums[0]);
        nums[1] = 99;
        System.out.println(nums[1]);
        System.out.println(nums.length);
    }
}`,
      lineByLine: [
        { line: "int[] nums = {10, 20, 30};", explain: "مصفوفة أعداد صحيحة فيها 3 عناصر." },
        { line: "System.out.println(nums[0]);", explain: "العنصر الأول فهرسه 0 فيطبع 10." },
        { line: "nums[1] = 99;", explain: "نغيّر العنصر الثاني (فهرس 1) إلى 99." },
        { line: "System.out.println(nums[1]);", explain: "يطبع 99." },
        { line: "System.out.println(nums.length);", explain: "طول المصفوفة 3. لاحظ أنه بدون أقواس." },
      ],
      output: `10
99
3`,
      mistakes: [
        "البدء بالفهرس 1 بدل 0.",
        "كتابة nums.length() بأقواس (هذا للنصوص String).",
        "محاولة تغيير حجم المصفوفة بعد إنشائها.",
      ],
      exercise: {
        prompt: "أنشئ مصفوفة String فيها ثلاثة أسماء، ثم اطبع الاسم الثاني.",
        starter: `public class Main {
    public static void main(String[] args) {

    }
}`,
        hint: 'String[] names = {"Ali", "Sara", "Omar"}; الاسم الثاني فهرسه 1.',
        solution: `public class Main {
    public static void main(String[] args) {
        String[] names = {"Ali", "Sara", "Omar"};
        System.out.println(names[1]);
    }
}`,
      },
      quiz: {
        q: "ما فهرس أول عنصر في المصفوفة؟",
        options: ["1", "0", "-1", "length"],
        answer: 1,
        why: "الفهرس في Java يبدأ من الصفر.",
      },
    },
    {
      slug: "array-loop",
      title: "التكرار داخل المصفوفة",
      description: "المرور على كل العناصر بـ for وfor-each.",
      explanation: [
        "نستخدم for مع الفهرس عندما نحتاج رقم الموضع، ونستخدم for-each (for (int x : nums)) عندما نريد القيم فقط بشكل أبسط.",
        "الشرط الصحيح للحلقة العادية: i < nums.length (وليس <=).",
      ],
      goals: ["المرور على المصفوفة بـ for", "استخدام for-each", "حساب مجموع عناصرها"],
      code: `public class Main {
    public static void main(String[] args) {
        int[] nums = {4, 8, 15};
        int sum = 0;
        for (int i = 0; i < nums.length; i++) {
            System.out.println("العنصر " + i + " = " + nums[i]);
            sum += nums[i];
        }
        System.out.println("المجموع = " + sum);
        for (int x : nums) {
            System.out.println(x * 2);
        }
    }
}`,
      lineByLine: [
        { line: "int[] nums = {4, 8, 15};", explain: "المصفوفة." },
        { line: "for (int i = 0; i < nums.length; i++) {", explain: "الفهرس من 0 حتى آخر عنصر (length - 1)." },
        { line: 'System.out.println("العنصر " + i + " = " + nums[i]);', explain: "نطبع الفهرس والقيمة." },
        { line: "sum += nums[i];", explain: "نجمع القيمة." },
        { line: "for (int x : nums) {", explain: "for-each: x يأخذ كل قيمة بالترتيب." },
        { line: "System.out.println(x * 2);", explain: "نطبع ضعف كل قيمة." },
      ],
      output: `العنصر 0 = 4
العنصر 1 = 8
العنصر 2 = 15
المجموع = 27
8
16
30`,
      mistakes: [
        "i <= nums.length يسبب ArrayIndexOutOfBoundsException.",
        "تعديل عناصر المصفوفة عبر for-each لا يغير المصفوفة الأصلية للأنواع الأساسية.",
        "نسيان تصفير المجموع قبل الحلقة.",
      ],
      exercise: {
        prompt: "اطبع أكبر عدد في المصفوفة {3, 9, 2, 7}.",
        starter: `public class Main {
    public static void main(String[] args) {
        int[] nums = {3, 9, 2, 7};

    }
}`,
        hint: "ابدأ max بأول عنصر ثم قارن مع الباقي.",
        solution: `public class Main {
    public static void main(String[] args) {
        int[] nums = {3, 9, 2, 7};
        int max = nums[0];
        for (int i = 1; i < nums.length; i++) {
            if (nums[i] > max) {
                max = nums[i];
            }
        }
        System.out.println(max);
    }
}`,
      },
      quiz: {
        q: "ما شرط الحلقة الصحيح للمرور على كل عناصر nums؟",
        options: ["i <= nums.length", "i < nums.length", "i < nums.length + 1", "i != 0"],
        answer: 1,
        why: "آخر فهرس هو length - 1 لذلك نستخدم i < nums.length.",
      },
    },
    {
      slug: "array-2d-errors",
      title: "المصفوفات ثنائية الأبعاد وأخطاء الفهرس",
      description: "جداول من الصفوف والأعمدة، وكيف نتجنب ArrayIndexOutOfBounds.",
      explanation: [
        "المصفوفة الثنائية هي مصفوفة من مصفوفات، تشبه الجدول: int[][] m = {{1,2,3},{4,5,6}}; والوصول يكون m[صف][عمود].",
        "الخطأ ArrayIndexOutOfBoundsException يحدث عند استخدام فهرس خارج النطاق (مثل nums[3] لمصفوفة طولها 3). تجنبه بالتحقق من length دائمًا.",
      ],
      goals: ["إنشاء مصفوفة ثنائية", "المرور عليها بحلقتين", "فهم خطأ تجاوز الفهرس"],
      code: `public class Main {
    public static void main(String[] args) {
        int[][] m = {{1, 2, 3}, {4, 5, 6}};
        System.out.println(m[1][2]);
        for (int r = 0; r < m.length; r++) {
            for (int c = 0; c < m[r].length; c++) {
                System.out.print(m[r][c] + " ");
            }
            System.out.println();
        }
    }
}`,
      lineByLine: [
        { line: "int[][] m = {{1, 2, 3}, {4, 5, 6}};", explain: "جدول من صفين وثلاثة أعمدة." },
        { line: "System.out.println(m[1][2]);", explain: "الصف الثاني (فهرس 1) والعمود الثالث (فهرس 2) فيطبع 6." },
        { line: "for (int r = 0; r < m.length; r++) {", explain: "m.length هو عدد الصفوف." },
        { line: "for (int c = 0; c < m[r].length; c++) {", explain: "m[r].length هو عدد أعمدة الصف الحالي." },
        { line: 'System.out.print(m[r][c] + " ");', explain: "نطبع العنصر ومسافة بدون سطر جديد." },
        { line: "System.out.println();", explain: "ننتقل لسطر جديد بعد كل صف." },
      ],
      output: `6
1 2 3
4 5 6 `,
      mistakes: [
        "عكس ترتيب [صف][عمود].",
        "استخدام m.length للأعمدة بدل m[0].length.",
        "طلب m[2][0] لمصفوفة صفوفها 2 فقط → ArrayIndexOutOfBoundsException.",
      ],
      exercise: {
        prompt: "اطبع العنصر الأول في الصف الأول من المصفوفة {{7, 8}, {9, 10}}.",
        starter: `public class Main {
    public static void main(String[] args) {
        int[][] m = {{7, 8}, {9, 10}};

    }
}`,
        hint: "m[0][0]",
        solution: `public class Main {
    public static void main(String[] args) {
        int[][] m = {{7, 8}, {9, 10}};
        System.out.println(m[0][0]);
    }
}`,
      },
      quiz: {
        q: "ما الخطأ الذي يظهر عند طلب nums[5] لمصفوفة طولها 3؟",
        options: ["NullPointerException", "ArrayIndexOutOfBoundsException", "ArithmeticException", "لا يوجد خطأ"],
        answer: 1,
        why: "الفهرس 5 خارج النطاق 0..2 فيرمي Java هذا الاستثناء.",
      },
    },
  ],
};
