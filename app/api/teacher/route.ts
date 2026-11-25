import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { askAI, type ChatMessage } from "@/lib/ai";
import { mockAnswer } from "@/lib/mock-assistant";
import { getLesson } from "@/lib/curriculum";

const DAILY_LIMIT = 40;

export async function POST(req: Request) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  let body: { messages?: ChatMessage[]; lessonSlug?: string; code?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "طلب غير صالح." }, { status: 400 });
  }

  // 1) تحقق من المستخدم (لا نخدم الذكاء الاصطناعي لمن لم يسجل دخوله)
  let db: ReturnType<typeof createClient> | null = null;
  let userId: string | null = null;
  if (url && anon) {
    const token = (req.headers.get("authorization") ?? "").replace(/^Bearer\s+/i, "");
    if (!token) return NextResponse.json({ error: "سجّل دخولك أولًا." }, { status: 401 });
    db = createClient(url, anon, { global: { headers: { Authorization: `Bearer ${token}` } }, auth: { persistSession: false } });
    const { data, error } = await db.auth.getUser(token);
    if (error || !data.user) return NextResponse.json({ error: "انتهت الجلسة، سجّل دخولك مجددًا." }, { status: 401 });
    userId = data.user.id;

    // 2) حد يومي لحماية الرصيد
    const today = new Date().toISOString().slice(0, 10);
    const { data: row } = await db.from("ai_usage").select("count").eq("user_id", userId).eq("day", today).maybeSingle();
    const used = (row as { count?: number } | null)?.count ?? 0;
    if (used >= DAILY_LIMIT) {
      return NextResponse.json({ error: `وصلت للحد اليومي (${DAILY_LIMIT} سؤالًا). ارجع غدًا وكمّل 💪` }, { status: 429 });
    }
         await db.from("ai_usage").upsert({ user_id: userId, day: today, count: used + 1 } as any);
  }

  const messages = (body.messages ?? [])
    .filter((m) => (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
    .slice(-10)
    .map((m) => ({ role: m.role, content: m.content.slice(0, 4000) }));
  const last = messages[messages.length - 1];
  if (!last || last.role !== "user") return NextResponse.json({ error: "اكتب سؤالك أولًا." }, { status: 400 });

  // 3) سياق الدرس يُؤخذ من الخادم وليس من العميل
  const found = body.lessonSlug ? getLesson(body.lessonSlug) : null;
  const code = (body.code ?? "").slice(0, 6000);
  const context = found
    ? `الطالب الآن في درس: «${found.lesson.title}».\nمثال الدرس:\n\`\`\`java\n${found.lesson.code}\n\`\`\`\n${
        code ? `الكود الذي يكتبه الطالب الآن:\n\`\`\`java\n${code}\n\`\`\`\n` : ""
      }عند شرح كود اشرحه سطرًا بسطر، وعند وجود خطأ حدّد السطر واشرح السبب واعرض الكود المصحّح.`
    : "";

  const ai = await askAI(messages, context);
  if (ai) return NextResponse.json({ answer: ai, source: "ai" });
  return NextResponse.json({ answer: mockAnswer(last.content), source: "mock" });
}
