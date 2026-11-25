/**
 * فاحص أكواد Java مبسّط (Static heuristics).
 * لا يستبدل مترجم javac، لكنه يلتقط الأخطاء الشائعة عند المبتدئين ويشرحها بالعربية.
 */

export type Issue = {
  severity: "error" | "warning";
  line?: number;
  message: string; // ما المشكلة
  fix: string; // كيف نصلحها
};

/** يستبدل محتوى النصوص والتعليقات بمسافات مع الحفاظ على أرقام الأسطر. */
function stripStringsAndComments(code: string): string {
  let out = "";
  let i = 0;
  while (i < code.length) {
    const c = code[i];
    const n = code[i + 1];
    if (c === "/" && n === "/") {
      while (i < code.length && code[i] !== "\n") {
        out += " ";
        i++;
      }
    } else if (c === "/" && n === "*") {
      out += "  ";
      i += 2;
      while (i < code.length && !(code[i] === "*" && code[i + 1] === "/")) {
        out += code[i] === "\n" ? "\n" : " ";
        i++;
      }
      out += "  ";
      i += 2;
    } else if (c === '"' || c === "'") {
      const q = c;
      out += q;
      i++;
      while (i < code.length && code[i] !== q && code[i] !== "\n") {
        if (code[i] === "\\") {
          out += "  ";
          i += 2;
          continue;
        }
        out += " ";
        i++;
      }
      if (code[i] === q) {
        out += q;
        i++;
      }
    } else {
      out += c;
      i++;
    }
  }
  return out;
}

const CONTROL = /^(if|else|for|while|do|switch|try|catch|finally|case|default|class|interface|enum|public|private|protected|static|abstract|final|void|@)\b/;

export function checkJava(code: string): Issue[] {
  const issues: Issue[] = [];
  if (!code.trim()) {
    return [{ severity: "error", message: "المحرر فارغ.", fix: "اكتب كود Java أولًا ثم اضغط فحص." }];
  }

  const rawLines = code.split("\n");
  const clean = stripStringsAndComments(code);
  const lines = clean.split("\n");

  /* 1) توازن الأقواس */
  const stack: { ch: string; line: number }[] = [];
  const pairs: Record<string, string> = { ")": "(", "]": "[", "}": "{" };
  const names: Record<string, string> = { "(": "قوس دائري (", "[": "قوس مربع [", "{": "قوس مجموعة {" };
  lines.forEach((ln, idx) => {
    for (const ch of ln) {
      if ("([{".includes(ch)) stack.push({ ch, line: idx + 1 });
      else if (")]}".includes(ch)) {
        const top = stack.pop();
        if (!top) {
          issues.push({
            severity: "error",
            line: idx + 1,
            message: `الرمز ${ch} لا يوجد له قوس افتتاح مطابق.`,
            fix: "احذف هذا القوس الزائد، أو أضف قوس الافتتاح الناقص قبله.",
          });
        } else if (top.ch !== pairs[ch]) {
          issues.push({
            severity: "error",
            line: top.line,
            message: `${names[top.ch]} المفتوح في السطر ${top.line} لم يُغلق بشكل صحيح (وجدنا ${ch} بدل إغلاقه).`,
            fix: "أغلق القوس المفتوح أولًا بالرمز المناسب قبل إغلاق الأقواس الأخرى.",
          });
        }
      }
    }
  });
  stack.forEach((s) =>
    issues.push({
      severity: "error",
      line: s.line,
      message: `يوجد ${names[s.ch]} لم يتم إغلاقه.`,
      fix: "أضف قوس الإغلاق المناسب في المكان الصحيح.",
    }),
  );

  /* 2) علامات اقتباس غير مغلقة */
  rawLines.forEach((raw, idx) => {
    const noComment = raw.replace(/\/\/.*$/, "");
    const quotes = (noComment.match(/(?<!\\)"/g) || []).length;
    if (quotes % 2 !== 0) {
      issues.push({
        severity: "error",
        line: idx + 1,
        message: "علامة اقتباس مزدوجة \" مفتوحة ولم تُغلق.",
        fix: 'النص في Java يجب أن يبدأ وينتهي بعلامة " مثل: "مرحبا".',
      });
    }
  });

  /* 3) class و main */
  const hasClass = /\bclass\s+[A-Za-z_]\w*/.test(clean);
  const hasInterface = /\binterface\s+[A-Za-z_]\w*/.test(clean);
  if (!hasClass && !hasInterface) {
    issues.push({
      severity: "error",
      message: "لا يوجد class في الكود. كل كود Java يجب أن يكون داخل class.",
      fix: "ابدأ بـ: public class Main { ... }",
    });
  } else if (!/\bvoid\s+main\s*\(/.test(clean) && hasClass) {
    issues.push({
      severity: "warning",
      message: "لم أجد الدالة main، لن يعرف Java من أين يبدأ تنفيذ البرنامج.",
      fix: "أضف داخل الكلاس: public static void main(String[] args) { ... }",
    });
  }

  /* 4) فحوصات لكل سطر */
  lines.forEach((ln, idx) => {
    const t = ln.trim();
    const n = idx + 1;
    if (!t) return;

    if (/\bsystem\.out\b/.test(t)) {
      issues.push({
        severity: "error",
        line: n,
        message: "كلمة System يجب أن تبدأ بحرف كبير (S).",
        fix: "اكتبها هكذا: System.out.println(...)",
      });
    }
    const bad = t.match(/System\.out\.(printn|prinln|printLn|printl|print_ln|println\s+ln)\b/);
    if (bad) {
      issues.push({
        severity: "error",
        line: n,
        message: `الدالة System.out.${bad[1]} غير موجودة (خطأ إملائي).`,
        fix: "استخدم println لطباعة النص مع سطر جديد، أو print للطباعة بدون سطر جديد.",
      });
    }
    if (/\bstring\s+\w+/.test(t)) {
      issues.push({
        severity: "error",
        line: n,
        message: "نوع النص في Java هو String بحرف S كبير، وليس string.",
        fix: 'اكتب: String name = "Ahmed";',
      });
    }
    if (/\b(Int|Double|Boolean|Char)\s+\w+\s*(=|;)/.test(t)) {
      issues.push({
        severity: "warning",
        line: n,
        message: "الأنواع الأساسية (int, double, boolean, char) تُكتب بحروف صغيرة.",
        fix: "اكتب int وليس Int، و boolean وليس Boolean، وهكذا.",
      });
    }
    if (/=\s*(True|False)\b/.test(t)) {
      issues.push({
        severity: "error",
        line: n,
        message: "قيم boolean في Java تُكتب بحروف صغيرة: true و false.",
        fix: "استبدل True بـ true و False بـ false.",
      });
    }
    if (/\bint\s+\w+\s*=\s*-?\d+\.\d+/.test(t)) {
      issues.push({
        severity: "error",
        line: n,
        message: "لا يمكن تخزين رقم عشري داخل متغير من نوع int.",
        fix: "استخدم double للأرقام العشرية: double price = 9.5;",
      });
    }
    if (/\bfloat\s+\w+\s*=\s*-?\d+\.\d+\s*;/.test(t)) {
      issues.push({
        severity: "error",
        line: n,
        message: "الرقم العشري في Java هو double افتراضيًا، ولا يُقبل داخل float بدون حرف f.",
        fix: "أضف f بعد الرقم: float x = 3.5f;",
      });
    }
    if (/\bchar\s+\w+\s*=\s*"/.test(rawLines[idx])) {
      issues.push({
        severity: "error",
        line: n,
        message: "قيمة char تُكتب بعلامة اقتباس مفردة ' وليست مزدوجة.",
        fix: "اكتب: char grade = 'A';",
      });
    }
    if (/\bString\s+\w+\s*=\s*'/.test(rawLines[idx])) {
      issues.push({
        severity: "error",
        line: n,
        message: "النص String يُكتب بعلامات اقتباس مزدوجة \" وليست مفردة.",
        fix: 'اكتب: String name = "Sara";',
      });
    }
    if (/\bif\s*\(\s*[\w.]+\s*=\s*[^=]/.test(t) || /\bwhile\s*\(\s*[\w.]+\s*=\s*[^=]/.test(t)) {
      issues.push({
        severity: "error",
        line: n,
        message: "استخدمت = (إسناد) داخل الشرط. المقارنة تحتاج ==.",
        fix: "غيّر = إلى == داخل الأقواس.",
      });
    }
    if (/^(if|while)\s*\((?:[^()]|\([^()]*\))*\)\s*;\s*$/.test(t)) {
      issues.push({
        severity: "warning",
        line: n,
        message: "فاصلة منقوطة بعد الشرط مباشرة تجعل الشرط ينتهي ولا ينفذ الكتلة التي بعده.",
        fix: "احذف الفاصلة المنقوطة بعد القوس الذي يغلق الشرط.",
      });
    }
    if (/(==|!=)\s*"/.test(rawLines[idx]) || /"\s*(==|!=)/.test(rawLines[idx])) {
      issues.push({
        severity: "warning",
        line: n,
        message: "مقارنة النصوص بـ == تقارن العناوين في الذاكرة وليس المحتوى، وقد تعطي نتيجة غير متوقعة.",
        fix: 'استخدم equals: name.equals("Ali")',
      });
    }
    if (/<=\s*\w+\.length\b/.test(t)) {
      issues.push({
        severity: "warning",
        line: n,
        message: "استخدام <= مع length سيتجاوز آخر عنصر وسيسبب ArrayIndexOutOfBoundsException.",
        fix: "استخدم < بدل <= لأن آخر فهرس هو length - 1.",
      });
    }
    if (/\bfor\s*\([^;)]*,[^;)]*\)/.test(t) && !/;/.test(t)) {
      issues.push({
        severity: "error",
        line: n,
        message: "حلقة for تحتاج ثلاثة أجزاء مفصولة بفاصلة منقوطة ; وليس فاصلة عادية.",
        fix: "اكتب: for (int i = 0; i < 5; i++)",
      });
    }
  });

  /* 5) فاصلة منقوطة ناقصة */
  const nextNonEmpty = (from: number) => {
    for (let j = from + 1; j < lines.length; j++) if (lines[j].trim()) return lines[j].trim();
    return "";
  };
  lines.forEach((ln, idx) => {
    const t = ln.trim();
    if (!t || t.endsWith(";") || t.endsWith("{") || t.endsWith("}") || t.endsWith(",") || t.endsWith(":")) return;
    if (/[+\-*/&|=(]$/.test(t)) return; // سطر مستمر
    if (CONTROL.test(t)) return;
    if (nextNonEmpty(idx).startsWith("{") || /^[.+\-*/&|?:]/.test(nextNonEmpty(idx))) return;
    const looksLikeStatement =
      /^(System\.|return\b|break\b|continue\b|throw\b)/.test(t) ||
      /^[\w<>\[\]]+\s+\w+\s*(=.*)?$/.test(t) ||
      /^\w+(\.\w+)*\s*(\(|\+\+|--|\+=|-=|\*=|\/=|=[^=])/.test(t);
    if (looksLikeStatement) {
      issues.push({
        severity: "error",
        line: idx + 1,
        message: "يبدو أن هذا السطر ينقصه فاصلة منقوطة ; في النهاية.",
        fix: "كل جملة في Java تنتهي بـ ; مثل: int x = 5;",
      });
    }
  });

  // أزل التكرار ورتّب حسب رقم السطر
  const seen = new Set<string>();
  return issues
    .filter((i) => {
      const k = `${i.line ?? 0}|${i.message}`;
      if (seen.has(k)) return false;
      seen.add(k);
      return true;
    })
    .sort((a, b) => (a.line ?? 0) - (b.line ?? 0));
}

export function summarize(issues: Issue[]): string {
  if (issues.length === 0)
    return "لم أجد أخطاء واضحة في الكود. هذا فحص مبسّط، فجرّب تشغيل الكود في IntelliJ للتأكد النهائي.";
  const errors = issues.filter((i) => i.severity === "error").length;
  const warnings = issues.length - errors;
  return `وجدت ${errors} خطأ و${warnings} ملاحظة. ابدأ بإصلاح الأخطاء من الأعلى إلى الأسفل لأن خطأً واحدًا قد يسبب أخطاء أخرى.`;
}
