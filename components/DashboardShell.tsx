"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Award, BookOpen, Bot, Flame, LayoutDashboard, LogOut, Star, TerminalSquare, Trophy } from "lucide-react";
import Logo from "./Logo";
import RewardToast from "./RewardToast";
import { useAuth } from "@/lib/auth";
import { useProgress } from "@/lib/progress";

const links = [
  { href: "/dashboard", label: "الرئيسية", icon: LayoutDashboard },
  { href: "/dashboard/lessons", label: "الدروس", icon: BookOpen },
  { href: "/dashboard/editor", label: "المحرر", icon: TerminalSquare },
  { href: "/dashboard/assistant", label: "المعلم", icon: Bot },
  { href: "/dashboard/certificates", label: "شهاداتي", icon: Award },
];

function NameGate() {
  const { setName } = useAuth();
  const [name, setNameValue] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <form
        className="card w-full max-w-md space-y-4"
        onSubmit={async (e) => {
          e.preventDefault();
          if (name.trim().length < 3) return setError("اكتب اسمك الكامل (3 أحرف على الأقل). سيظهر على شهادتك.");
          setBusy(true);
          const r = await setName(name.trim());
          setBusy(false);
          if (!r.ok) setError(r.error);
        }}
      >
        <h1 className="text-2xl font-extrabold text-ink-900">أهلًا يا بطل 👋</h1>
        <p className="text-sm leading-7 text-ink-500">شو اسمك؟ رح نكتبه على شهاداتك.</p>
        <input className="input" placeholder="اسمك الكامل" value={name} onChange={(e) => setNameValue(e.target.value)} autoFocus />
        {error && <p className="text-sm font-semibold text-red-400">{error}</p>}
        <button className="btn-primary w-full" disabled={busy}>ابدأ</button>
      </form>
    </div>
  );
}

export default function DashboardShell({ children }: { children: ReactNode }) {
  const { user, loading, signOut } = useAuth();
  const { stats, streak } = useProgress();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [loading, user, router]);

  if (loading || !user) return <div className="flex min-h-screen items-center justify-center text-ink-500">جارٍ التحميل...</div>;
  if (!user.name) return <NameGate />;

  const isActive = (href: string) => (href === "/dashboard" ? pathname === href : pathname.startsWith(href));

  return (
    <div className="min-h-screen lg:flex">
      {/* Sidebar للكمبيوتر */}
      <aside className="hidden w-64 shrink-0 flex-col justify-between border-l border-ink-200 bg-panel p-4 lg:sticky lg:top-0 lg:flex lg:h-screen">
        <div className="space-y-6">
          <div className="px-2 pt-2"><Logo href="/dashboard" /></div>
          <nav className="flex flex-col gap-1">
            {links.map(({ href, label, icon: Icon }) => (
              <Link key={href} href={href} className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${isActive(href) ? "bg-brand-100 text-brand-400" : "text-ink-600 hover:bg-ink-100"}`}>
                <Icon className="h-5 w-5" />{label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="space-y-3 border-t border-ink-200 pt-4">
          <div className="px-2">
            <div className="truncate text-sm font-bold text-ink-800">{user.name}</div>
            <div className="truncate text-xs text-ink-500" dir="ltr">{user.email}</div>
          </div>
          <button onClick={async () => { await signOut(); router.replace("/"); }} className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-semibold text-red-400 hover:bg-red-500/10">
            <LogOut className="h-5 w-5" />تسجيل الخروج
          </button>
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        {/* شريط علوي: النقاط والنجوم والسلسلة */}
        <div className="sticky top-0 z-30 flex items-center justify-between gap-2 border-b border-ink-200 bg-ink-50/90 px-4 py-2.5 backdrop-blur" style={{ paddingTop: "max(0.625rem, env(safe-area-inset-top))" }}>
          <div className="lg:hidden"><Logo href="/dashboard" /></div>
          <div className="hidden text-sm font-bold text-ink-700 lg:block">مرحبًا، {user.name}</div>
          <div className="flex items-center gap-2 text-sm font-extrabold">
            <span className="inline-flex items-center gap-1 rounded-full bg-brand-100 px-3 py-1 text-brand-400"><Trophy className="h-4 w-4" />{stats.points}</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-gold-500/10 px-3 py-1 text-gold-400"><Star className="h-4 w-4 fill-current" />{stats.stars}</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-orange-500/10 px-3 py-1 text-orange-400"><Flame className="h-4 w-4" />{streak}</span>
          </div>
        </div>

        <main className="p-4 pb-28 sm:p-6 lg:p-8 lg:pb-8">
          <div className="mx-auto max-w-4xl">{children}</div>
        </main>
      </div>

      {/* شريط سفلي زي التطبيقات */}
      <nav className="no-print fixed inset-x-0 bottom-0 z-40 border-t border-ink-200 bg-ink-50/95 backdrop-blur lg:hidden safe-bottom">
        <ul className="mx-auto grid max-w-lg grid-cols-5">
          {links.map(({ href, label, icon: Icon }) => (
            <li key={href}>
              <Link href={href} className={`flex min-h-[56px] flex-col items-center justify-center gap-0.5 text-[11px] font-bold transition ${isActive(href) ? "text-brand-400" : "text-ink-500"}`}>
                <Icon className="h-6 w-6" />{label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <RewardToast />
    </div>
  );
}
