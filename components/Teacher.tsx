"use client";

import { useEffect, useRef, useState } from "react";
import { Bot, Loader2, Send, User } from "lucide-react";
import RichText from "./RichText";
import { useAuth } from "@/lib/auth";

type Msg = { role: "user" | "assistant"; content: string };

const defaultSuggestions = ["اشرح لي الكود سطرًا بسطر", "ليش طلع عندي خطأ؟", "اعطني مثالًا ثانيًا", "ما الأخطاء الشائعة هنا؟"];

export default function Teacher({
  lessonSlug,
  getCode,
  suggestions = defaultSuggestions,
  className = "",
}: {
  lessonSlug?: string;
  getCode?: () => string;
  suggestions?: string[];
  className?: string;
}) {
  const { session } = useAuth();
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, busy]);

  async function send(text: string) {
    const q = text.trim();
    if (!q || busy) return;
    const next: Msg[] = [...messages, { role: "user", content: q }];
    setMessages(next);
    setInput("");
    setBusy(true);
    try {
      const res = await fetch("/api/teacher", {
        method: "POST",
        headers: { "content-type": "application/json", authorization: `Bearer ${session?.access_token ?? ""}` },
        body: JSON.stringify({ messages: next, lessonSlug, code: getCode?.() ?? "" }),
      });
      const data = (await res.json()) as { answer?: string; error?: string };
      setMessages([...next, { role: "assistant", content: data.answer ?? data.error ?? "صار خطأ، جرّب مرة ثانية." }]);
    } catch {
      setMessages([...next, { role: "assistant", content: "تعذّر الاتصال، تأكد من الإنترنت وجرّب مجددًا." }]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className={`flex min-h-0 flex-col gap-3 ${className}`}>
      <div className="min-h-0 flex-1 space-y-3 overflow-y-auto">
        <div className="flex gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-500 text-black"><Bot className="h-5 w-5" /></span>
          <div className="min-w-0 flex-1 rounded-2xl bg-brand-100 p-3 text-sm leading-7 text-ink-800">
            أهلًا يا بطل! أنا معلمك الذكي ومتواجد 24 ساعة. اسألني بالعربي، أو اطلب مني أشرح الكود سطرًا بسطر أو أصلّح خطأك.
          </div>
        </div>
        {messages.map((m, i) => (
          <div key={i} className="flex gap-3">
            <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${m.role === "user" ? "bg-ink-300 text-ink-900" : "bg-brand-500 text-black"}`}>
              {m.role === "user" ? <User className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
            </span>
            <div className={`min-w-0 flex-1 rounded-2xl p-3 ${m.role === "user" ? "bg-ink-100" : "bg-brand-100"}`}>
              {m.role === "assistant" ? <RichText text={m.content} /> : <p className="whitespace-pre-wrap text-sm leading-7">{m.content}</p>}
            </div>
          </div>
        ))}
        {busy && <div className="flex items-center gap-2 text-sm text-ink-500"><Loader2 className="h-4 w-4 animate-spin" />المعلم يكتب...</div>}
        <div ref={endRef} />
      </div>

      {messages.length === 0 && (
        <div className="flex flex-wrap gap-2">
          {suggestions.map((s) => (
            <button key={s} onClick={() => send(s)} className="rounded-full border border-ink-300 bg-ink-100 px-3 py-2 text-xs font-semibold text-ink-700 active:scale-95">{s}</button>
          ))}
        </div>
      )}

      <form onSubmit={(e) => { e.preventDefault(); void send(input); }} className="flex gap-2">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); void send(input); } }}
          rows={2}
          placeholder="اكتب سؤالك بالعربي..."
          className="input resize-none"
        />
        <button type="submit" disabled={busy || !input.trim()} className="btn-primary self-end" aria-label="إرسال"><Send className="h-4 w-4 -scale-x-100" /></button>
      </form>
    </div>
  );
}
