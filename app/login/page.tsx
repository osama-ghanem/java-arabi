"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Facebook, Loader2, MailCheck } from "lucide-react";
import AuthShell from "@/components/AuthShell";
import { useAuth } from "@/lib/auth";

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginPage() {
  const { user, loading, configured, facebookEnabled, signInWithEmail, signInWithFacebook } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (!loading && user) router.replace("/dashboard");
  }, [loading, user, router]);

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  async function send(e?: React.FormEvent) {
    e?.preventDefault();
    setError("");
    const v = email.trim();
    if (!emailRe.test(v)) return setError("اكتب بريدًا إلكترونيًا صحيحًا.");
    setBusy(true);
    const res = await signInWithEmail(v);
    setBusy(false);
    if (!res.ok) return setError(res.error);
    setSent(true);
    setCooldown(60);
  }

  async function facebook() {
    setError("");
    setBusy(true);
    const res = await signInWithFacebook();
    setBusy(false);
    if (!res.ok) setError(res.error);
  }

  if (!configured) {
    return (
      <AuthShell title="المنصة غير مربوطة بعد" subtitle="لم تُضبط مفاتيح Supabase.">
        <p className="text-sm leading-7 text-ink-600">
          أضف <code dir="ltr">NEXT_PUBLIC_SUPABASE_URL</code> و <code dir="ltr">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> في إعدادات Vercel ثم أعد النشر.
        </p>
      </AuthShell>
    );
  }

  if (sent) {
    return (
      <AuthShell title="تفقّد بريدك" subtitle="أرسلنا لك رابط الدخول.">
        <div className="space-y-4 text-center">
          <MailCheck className="mx-auto h-14 w-14 text-brand-500" />
          <p className="leading-7 text-ink-700">
            افتح الرسالة المرسلة إلى <b dir="ltr">{email}</b> واضغط على الرابط، وستدخل مباشرة. لا تنسَ مجلد الرسائل غير المرغوبة (Spam).
          </p>
          <button className="btn-secondary w-full" disabled={cooldown > 0 || busy} onClick={() => send()}>
            {cooldown > 0 ? `إعادة الإرسال بعد ${cooldown} ثانية` : "إعادة إرسال الرابط"}
          </button>
          <button className="text-sm font-semibold text-ink-500 hover:text-ink-800" onClick={() => setSent(false)}>
            تغيير البريد
          </button>
          {error && <p className="text-sm font-semibold text-red-400">{error}</p>}
        </div>
      </AuthShell>
    );
  }

  return (
    <AuthShell title="ادخل وابدأ" subtitle="مرة وحدة بس، وبعدها حسابك يضل مفتوح.">
      <form onSubmit={send} className="space-y-4" noValidate>
        {error && (
          <div role="alert" className="rounded-xl bg-red-500/10 p-3 text-sm font-semibold text-red-400">
            {error}
          </div>
        )}
        <div>
          <label htmlFor="email" className="label">بريدك الإلكتروني</label>
          <input id="email" type="email" inputMode="email" dir="ltr" autoComplete="email" className="input text-left" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <button type="submit" disabled={busy} className="btn-primary w-full">
          {busy && <Loader2 className="h-4 w-4 animate-spin" />}
          أرسل لي رابط الدخول
        </button>

        <div className="flex items-center gap-3 text-xs text-ink-400">
          <span className="h-px flex-1 bg-ink-200" /> أو <span className="h-px flex-1 bg-ink-200" />
        </div>

        <button type="button" onClick={facebook} disabled={busy || !facebookEnabled} className="btn w-full bg-[#1877F2] text-white hover:bg-[#1668d8]">
          <Facebook className="h-5 w-5" />
          الدخول بالفيسبوك
          {!facebookEnabled && <span className="rounded-full bg-black/30 px-2 py-0.5 text-[10px]">قريبًا</span>}
        </button>
        <p className="text-center text-xs text-ink-400">بدون كلمة سر. الدخول بالإيميل ينشئ حسابك تلقائيًا أول مرة.</p>
      </form>
    </AuthShell>
  );
}
