"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Award, Lock, Printer } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { useProgress } from "@/lib/progress";
import { units } from "@/lib/curriculum";
import { unitDone } from "@/lib/gamification";
import Logo from "@/components/Logo";

function Certificates() {
  const { user } = useAuth();
  const { progress, stats } = useProgress();
  const params = useSearchParams();
  const wanted = Number(params.get("unit"));
  const [selected, setSelected] = useState<number | null>(wanted && stats.unitsDone.includes(wanted) ? wanted : null);
  const unit = units.find((u) => u.id === selected);

  return (
    <div className="space-y-6">
      <header className="no-print">
        <h1 className="text-2xl font-extrabold text-ink-900">شهاداتي</h1>
        <p className="text-ink-500">أنهِ كل دروس وحدة لتحصل على شهادة باسمك. {stats.unitsDone.length} من {units.length} وحدات.</p>
      </header>

      <div className="no-print grid gap-3 sm:grid-cols-2">
        {units.map((u) => {
          const done = unitDone(progress, u);
          const count = u.lessons.filter((l) => progress.completed.includes(l.slug)).length;
          return (
            <button key={u.id} disabled={!done} onClick={() => setSelected(u.id)} className={`card flex items-center gap-3 text-start transition ${done ? "hover:border-brand-500/60" : "opacity-60"} ${selected === u.id ? "border-brand-500" : ""}`}>
              {done ? <Award className="h-8 w-8 shrink-0 text-gold-400" /> : <Lock className="h-8 w-8 shrink-0 text-ink-400" />}
              <div className="min-w-0">
                <div className="text-xs font-bold text-brand-400">الوحدة {u.id}</div>
                <div className="truncate font-bold text-ink-900">{u.title}</div>
                <div className="text-xs text-ink-500">{done ? "اضغط لعرض الشهادة" : `${count} / ${u.lessons.length} دروس`}</div>
              </div>
            </button>
          );
        })}
      </div>

      {unit && user && (
        <div className="space-y-3">
          <div className="print-area rounded-3xl border-4 border-double border-brand-500 bg-ink-50 p-6 text-center shadow-glow sm:p-10">
            <div className="flex justify-center"><Logo href="#" /></div>
            <div className="mt-4 text-sm font-bold tracking-widest text-gold-400">شهادة إتمام</div>
            <p className="mt-6 text-ink-600">تشهد منصة «Java بالعربي» بأن</p>
            <h2 className="my-3 text-3xl font-extrabold text-brand-400 sm:text-4xl">{user.name}</h2>
            <p className="text-ink-600">قد أتمّ بنجاح جميع دروس</p>
            <h3 className="my-2 text-2xl font-extrabold text-ink-900">الوحدة {unit.id}: {unit.title}</h3>
            <p className="text-ink-600">ضمن دورة تعلّم Java من الصفر</p>
            <div className="mt-6 text-sm text-ink-500">{new Date().toLocaleDateString("ar", { year: "numeric", month: "long", day: "numeric" })}</div>
          </div>
          <button onClick={() => window.print()} className="no-print btn-primary w-full sm:w-auto"><Printer className="h-5 w-5" />طباعة / حفظ كـ PDF</button>
        </div>
      )}
    </div>
  );
}

export default function CertificatesPage() {
  return (
    <Suspense fallback={<div className="text-ink-500">جارٍ التحميل...</div>}>
      <Certificates />
    </Suspense>
  );
}
