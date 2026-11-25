"use client";

import Link from "next/link";
import { ArrowLeft, Bot, CheckCircle2, Flame, PlayCircle, Sparkles, Star, TerminalSquare, Trophy } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { useProgress } from "@/lib/progress";
import { allLessons, getLesson, totalLessons, units } from "@/lib/curriculum";
import ProgressBar from "@/components/ProgressBar";
import ModuleList from "@/components/ModuleList";

export default function DashboardPage() {
  const { user } = useAuth();
  const { progress, ready, stats, level, streak } = useProgress();

  if (!ready) return <div className="text-ink-500">جارٍ تحميل تقدمك...</div>;

  const percent = (stats.completedCount / totalLessons) * 100;
  const started = stats.completedCount > 0 || Boolean(progress.last);
  const lastInfo = progress.last ? getLesson(progress.last) : null;
  const nextLesson = allLessons.find((l) => !progress.completed.includes(l.slug)) ?? allLessons[allLessons.length - 1];
  const continueSlug = lastInfo && !progress.completed.includes(lastInfo.lesson.slug) ? lastInfo.lesson.slug : nextLesson.slug;
  const firstName = (user?.name ?? "").split(" ")[0];

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-extrabold text-ink-900 sm:text-3xl">مرحبًا {firstName} 👋</h1>
        <p className="mt-1 text-ink-500">
          {streak > 1 ? `سلسلتك ${streak} أيام متتالية 🔥 لا تكسرها اليوم!` : started ? "كمّل من وين وقفت." : "جاهز تبدأ رحلتك مع Java؟"}
        </p>
      </header>

      {!started ? (
        <section className="card flex flex-col items-center gap-4 py-10 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-100 text-brand-400"><Sparkles className="h-7 w-7" /></div>
          <h2 className="text-xl font-extrabold">لم تبدأ التعلّم بعد</h2>
          <p className="max-w-md text-sm text-ink-500">{units.length} وحدات و{totalLessons} درسًا. كل درس يعطيك نقاطًا ونجومًا، وكل وحدة تنتهي بشهادة باسمك.</p>
          <Link href={`/dashboard/lessons/${allLessons[0].slug}`} className="btn-primary w-full sm:w-auto"><PlayCircle className="h-5 w-5" />ابدأ الدرس الأول</Link>
        </section>
      ) : (
        <>
          <section className="grid grid-cols-3 gap-3">
            <div className="card text-center"><Trophy className="mx-auto h-6 w-6 text-brand-400" /><div className="mt-1 text-2xl font-extrabold">{stats.points}</div><div className="text-xs text-ink-500">نقطة</div></div>
            <div className="card text-center"><Star className="mx-auto h-6 w-6 fill-gold-400 text-gold-400" /><div className="mt-1 text-2xl font-extrabold">{stats.stars}</div><div className="text-xs text-ink-500">نجمة</div></div>
            <div className="card text-center"><Flame className="mx-auto h-6 w-6 text-orange-400" /><div className="mt-1 text-2xl font-extrabold">{streak}</div><div className="text-xs text-ink-500">يوم متتالي</div></div>
          </section>

          <section className="card space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-extrabold text-ink-900">تقدمك في دورة Java</h2>
              <span className="text-2xl font-extrabold text-brand-400">{Math.round(percent)}%</span>
            </div>
            <ProgressBar value={percent} />
            <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-ink-500">
              <span className="inline-flex items-center gap-1"><CheckCircle2 className="h-4 w-4 text-green-400" />{stats.completedCount} / {totalLessons} درس · {stats.quizSolved} اختبار</span>
              <span>المستوى {level.number}: <b className="text-ink-800">{level.name}</b></span>
            </div>
            {level.nextName && <ProgressBar value={level.percent} label={`${level.toNext} نقطة للوصول إلى «${level.nextName}»`} />}
          </section>

          <section className="card">
            <div className="text-xs font-bold text-ink-400">آخر درس وصلت إليه</div>
            <div className="mt-1 font-bold text-ink-800">{lastInfo ? lastInfo.lesson.title : nextLesson.title}</div>
            <Link href={`/dashboard/lessons/${continueSlug}`} className="btn-primary mt-3 w-full">متابعة التعلم<ArrowLeft className="h-5 w-5" /></Link>
          </section>
        </>
      )}

      <section className="grid gap-3 sm:grid-cols-2">
        <Link href="/dashboard/editor" className="card flex items-center gap-4 transition hover:border-brand-500/50">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-code text-brand-400"><TerminalSquare className="h-6 w-6" /></span>
          <div><h3 className="font-extrabold text-ink-900">صحح كودك</h3><p className="text-sm text-ink-500">اعرف أخطاءك وكيف تصلحها.</p></div>
        </Link>
        <Link href="/dashboard/assistant" className="card flex items-center gap-4 transition hover:border-brand-500/50">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500 text-black"><Bot className="h-6 w-6" /></span>
          <div><h3 className="font-extrabold text-ink-900">اسأل المعلم AI</h3><p className="text-sm text-ink-500">متواجد 24 ساعة بالعربي.</p></div>
        </Link>
      </section>

      <section>
        <h2 className="mb-3 text-xl font-extrabold text-ink-900">الوحدات والدروس</h2>
        <ModuleList progress={progress} />
      </section>
    </div>
  );
}
