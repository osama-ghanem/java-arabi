import { NextResponse } from "next/server";
import { checkJava, summarize } from "@/lib/java-checker";

// فحص محلي بالقواعد فقط (بدون ذكاء اصطناعي) حتى لا يستغله أحد لاستنزاف الرصيد.
// الشرح الذكي للأخطاء يتم عبر زر "اسأل المعلم AI" الذي يتطلب تسجيل دخول.
export async function POST(req: Request) {
  let body: { code?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "طلب غير صالح." }, { status: 400 });
  }
  const issues = checkJava((body.code ?? "").slice(0, 20000));
  return NextResponse.json({ issues, summary: summarize(issues), aiExplanation: null, source: "mock" });
}
