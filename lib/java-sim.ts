/**
 * محاكي بسيط جدًا لتجربة الكود داخل المتصفح.
 * يدعم: تعريف متغيرات (int/double/float/long/String/char/boolean) بقيم مباشرة،
 * و System.out.println / print مع دمج النصوص والمتغيرات بـ +.
 * أي شيء أعقد (حلقات، دوال، كائنات) يحتاج تشغيلًا حقيقيًا في IntelliJ.
 */

export type SimResult = { output: string; supported: boolean; note?: string };

function evalExpr(expr: string, vars: Record<string, string>): string | null {
  // قسّم على + خارج النصوص
  const parts: string[] = [];
  let cur = "";
  let inStr = false;
  for (let i = 0; i < expr.length; i++) {
    const c = expr[i];
    if (c === '"' && expr[i - 1] !== "\\") inStr = !inStr;
    if (c === "+" && !inStr) {
      parts.push(cur.trim());
      cur = "";
    } else cur += c;
  }
  parts.push(cur.trim());

  const values: { v: string; isNum: boolean }[] = [];
  for (const p of parts) {
    if (/^".*"$/.test(p)) values.push({ v: p.slice(1, -1).replace(/\\"/g, '"'), isNum: false });
    else if (/^'.'$/.test(p)) values.push({ v: p.slice(1, -1), isNum: false });
    else if (/^-?\d+(\.\d+)?[fFLd]?$/.test(p)) values.push({ v: p.replace(/[fFLd]$/, ""), isNum: true });
    else if (/^(true|false)$/.test(p)) values.push({ v: p, isNum: false });
    else if (p in vars) values.push({ v: vars[p], isNum: /^-?\d+(\.\d+)?$/.test(vars[p]) });
    else return null;
  }

  // أرقام فقط: اجمعها. غير ذلك: دمج نصي.
  if (values.every((x) => x.isNum)) {
    const sum = values.reduce((a, x) => a + parseFloat(x.v), 0);
    return Number.isInteger(sum) && !values.some((x) => x.v.includes(".")) ? String(sum) : String(sum);
  }
  return values.map((x) => x.v).join("");
}

export function simulateJava(code: string): SimResult {
  const noComments = code.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "");
  const vars: Record<string, string> = {};
  let out = "";
  let supported = true;

  const statements = noComments
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  for (const s of statements) {
    const decl = s.match(/^(?:final\s+)?(int|double|float|long|short|byte|String|char|boolean)\s+(\w+)\s*=\s*(.+);$/);
    if (decl) {
      const val = evalExpr(decl[3], vars);
      if (val === null) supported = false;
      else vars[decl[2]] = val;
      continue;
    }
    const assign = s.match(/^(\w+)\s*=\s*(.+);$/);
    if (assign && assign[1] in vars) {
      const val = evalExpr(assign[2], vars);
      if (val === null) supported = false;
      else vars[assign[1]] = val;
      continue;
    }
    const print = s.match(/^System\.out\.(println|print)\((.*)\);$/);
    if (print) {
      const arg = print[2].trim();
      const val = arg === "" ? "" : evalExpr(arg, vars);
      if (val === null) supported = false;
      else out += val + (print[1] === "println" ? "\n" : "");
      continue;
    }
    if (/^(for|while|do|if|switch|try)\b|\bnew\b|\w+\s*\(.*\)\s*\{?$/.test(s) && !/main\s*\(/.test(s) && !/^(public|private|protected)?\s*(static\s+)?class\b/.test(s)) {
      if (!/^(public|private|protected)\b/.test(s)) supported = false;
    }
  }

  if (!supported) {
    return {
      output: out.trimEnd(),
      supported: false,
      note: "هذا الكود يحتوي على أجزاء متقدمة (حلقات، شروط، دوال أو كائنات) لا يستطيع المحاكي المبسّط تنفيذها. انسخه وجرّبه في IntelliJ للحصول على الناتج الحقيقي.",
    };
  }
  return { output: out.trimEnd(), supported: true };
}
