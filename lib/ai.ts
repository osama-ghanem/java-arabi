// خادم فقط: لا تستورد هذا الملف داخل مكوّنات "use client".

export const SYSTEM_PROMPT = `أنت "مساعد Java بالعربي"، مدرّس صبور متخصص في لغة Java فقط.
- أجب دائمًا بالعربية البسيطة المناسبة للمبتدئين، واترك مصطلحات Java بالإنجليزية (class, int, void...).
- اشرح الفكرة خطوة بخطوة ثم أعطِ مثال كود قصيرًا داخل \`\`\`java.
- عند تصحيح كود: حدّد الخطأ ورقم السطر، اشرح السبب، ثم اعرض الكود المصحّح.
- إن كان السؤال خارج Java أو البرمجة، اعتذر بلطف ووجّه الطالب لسؤال عن Java.
- لا تطل: فقرات قصيرة وأمثلة صغيرة.`;

export type ChatMessage = { role: "user" | "assistant"; content: string };

/** يعيد null إذا لم يتوفر مفتاح، أو إذا فشل الطلب (فنرجع للردود التجريبية). */
export async function askAI(messages: ChatMessage[], extraSystem = ""): Promise<string | null> {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return null;
  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": key,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: process.env.ANTHROPIC_MODEL || "claude-sonnet-5-5",
        max_tokens: 1200,
        system: extraSystem ? `${SYSTEM_PROMPT}\n\n${extraSystem}` : SYSTEM_PROMPT,
        messages,
      }),
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { content?: { type: string; text?: string }[] };
    const text = data.content?.filter((b) => b.type === "text").map((b) => b.text).join("\n");
    return text || null;
  } catch {
    return null;
  }
}
