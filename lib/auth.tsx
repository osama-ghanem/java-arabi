"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Session } from "@supabase/supabase-js";
import { facebookEnabled, hasSupabase, supabase } from "./supabase";

export type User = { id: string; email: string; name: string };

type Result = { ok: true } | { ok: false; error: string };

type AuthContextValue = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  configured: boolean;
  facebookEnabled: boolean;
  signInWithEmail: (email: string) => Promise<Result>;
  signInWithFacebook: () => Promise<Result>;
  setName: (name: string) => Promise<Result>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function arabicError(message: string): string {
  const m = message.toLowerCase();
  if (m.includes("rate limit") || m.includes("too many") || m.includes("seconds"))
    return "أرسلنا عددًا كبيرًا من الروابط. انتظر دقيقة ثم حاول مجددًا.";
  if (m.includes("invalid") && m.includes("email")) return "صيغة البريد الإلكتروني غير صحيحة.";
  if (m.includes("signups not allowed")) return "التسجيل متوقف حاليًا.";
  if (m.includes("provider") && m.includes("not enabled")) return "الدخول بهذه الطريقة غير مفعّل بعد.";
  if (m.includes("network") || m.includes("fetch")) return "تعذّر الاتصال بالخادم، تحقق من الإنترنت.";
  return "حدث خطأ غير متوقع، حاول مرة أخرى.";
}

function toUser(s: Session | null): User | null {
  const u = s?.user;
  if (!u) return null;
  const meta = (u.user_metadata ?? {}) as Record<string, unknown>;
  const name = String(meta.full_name ?? meta.name ?? "").trim();
  return { id: u.id, email: u.email ?? "", name };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }
    // getSession يقرأ الجلسة المحفوظة ويجددها عند الحاجة، فيدخل الطالب تلقائيًا بعد أيام.
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
      setLoading(false);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const signInWithEmail = useCallback(async (email: string): Promise<Result> => {
    if (!supabase) return { ok: false, error: "المنصة غير مربوطة بقاعدة البيانات بعد." };
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/dashboard`, shouldCreateUser: true },
    });
    return error ? { ok: false, error: arabicError(error.message) } : { ok: true };
  }, []);

  const signInWithFacebook = useCallback(async (): Promise<Result> => {
    if (!supabase) return { ok: false, error: "المنصة غير مربوطة بقاعدة البيانات بعد." };
    if (!facebookEnabled) return { ok: false, error: "الدخول بالفيسبوك قريبًا." };
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "facebook",
      options: { redirectTo: `${window.location.origin}/dashboard` },
    });
    return error ? { ok: false, error: arabicError(error.message) } : { ok: true };
  }, []);

  const setName = useCallback(async (name: string): Promise<Result> => {
    if (!supabase) return { ok: false, error: "المنصة غير مربوطة بقاعدة البيانات بعد." };
    const { data, error } = await supabase.auth.updateUser({ data: { full_name: name } });
    if (error) return { ok: false, error: arabicError(error.message) };
    const refreshed = await supabase.auth.getSession();
    setSession(refreshed.data.session ?? (data.user ? ({ ...session, user: data.user } as Session) : session));
    return { ok: true };
  }, [session]);

  const signOut = useCallback(async () => {
    if (supabase) await supabase.auth.signOut();
    setSession(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user: toUser(session),
      session,
      loading,
      configured: hasSupabase,
      facebookEnabled,
      signInWithEmail,
      signInWithFacebook,
      setName,
      signOut,
    }),
    [session, loading, signInWithEmail, signInWithFacebook, setName, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth يجب أن يُستخدم داخل AuthProvider");
  return ctx;
}
