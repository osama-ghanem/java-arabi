"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Eye,
  Lightbulb,
  Play,
  Target,
  Terminal,
} from "lucide-react";
import { useProgress } from "@/lib/progress";
import { getLesson, totalLessons, units } from "@/lib/curriculum";
import { simulateJava } from "@/lib/java-sim";
import CodeBlock from "@/components/CodeBlock";
import CodeLab from "@/components/CodeLab";
import ProgressBar from "@/components/ProgressBar";
import TeacherDrawer from "@/components/TeacherDrawer";

export default function LessonPage() {
  const params = useParams<{ slug: string }>();
  const found = getLesson(params.slug);
  const { progress, ready, toggleComplete, setLast, recordQuiz, recordPractice } = useProgress();

  const [tryOut, setTryOut] = useState<string | null>(null);
  const [code, setCode] = useState(found?.lesson.exercise.starter ?? "");
  const [hint, setHint] = useState(false);
  const [solution, setSolution] = useState(false);
  const [picked, setPicked] = useState<number | null>(null);

  const slug = found?.lesson.slug;
  useEffect(() => {
    if (!found) return;
    setCode(found.lesson.exercise.starter);
    setTryOut(null);
    setHint(false);
    setSolution(false);
    setPicked(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  useEffect(() => {
    if (ready && slug) setLast(slug);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, slug]);

  if (!found) {
    return (
      <div className="card text-center">
        <p className="mb-4 font-bold">هذا الدرس غير موجود.</p>
        <Link href="/dashboard/lessons" className="btn-primary">
          العودة للدروس
        </Link>
      </div>
    );
  }

  const { lesson, index, prev, next } = found;
  const unit = units.find((u) => u.id === lesson.unitId)!;
  const isDone = progress.completed.includes(lesson.slug);
  const overall = (progress.completed.length / totalLessons) * 100;

  return (
    <article className="space-y-6">
      <div className="space-y-3">
        <div className="text-sm font-bold text-brand-600">
          الوحدة {unit.id}: {unit.title} · الدرس {index + 1} من {totalLessons}
        </div>
        <h1 className="text-2xl font-extrabold text-ink-900 sm:text-3xl">{lesson.title}</h1>
        <p className="text-ink-600">{lesson.description}</p>
        <ProgressBar value={overall} label="تقدمك في الدورة" />
      </div>

      <section className="card space-y-3">
        <h2 className="text-lg font-extrabold">الشرح</h2>
        {lesson.explanation.map((p, i) => (
          <p key={i} className="leading-8 text-ink-700">
            {p}
          </p>
        ))}
      </section>

      <section className="card">
        <h2 className="mb-3 flex items-center gap-2 text-lg font-extrabold">
          <Target className="h-5 w-5 text-brand-500" />
          أهداف الدرس
        </h2>
        <ul className="list-inside list-disc space-y-1.5 text-ink-700">
          {lesson.goals.map((g) => (
            <li key={g}>{g}</li>
          ))}
        </ul>
      </section>

      <section className="card space-y-4">
        <h2 className="text-lg font-extrabold">مثال Java</h2>
        <CodeBlock code={lesson.code} />
        <button type="button" className="btn-primary" onClick={() => setTryOut(simulateJava(lesson.code).supported ? simulateJava(lesson.code).output : lesson.output)}>
          <Play className="h-4 w-4" />
          تجربة الكود
        </button>
        {tryOut !== null && (
          <div className="rounded-xl border border-ink-200 bg-ink-50">
            <div className="border-b border-ink-200 px-4 py-2 text-xs font-bold text-ink-500">الناتج</div>
            <pre className="code whitespace-pre-wrap p-4 text-sm">{tryOut}</pre>
          </div>
        )}
      </section>

      <section className="card space-y-3">
        <h2 className="text-lg font-extrabold">شرح الكود سطرًا بسطر</h2>
        <ol className="space-y-2">
          {lesson.lineByLine.map((row, i) => (
            <li key={i} className="grid gap-2 rounded-xl border border-ink-100 bg-ink-50 p-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
              <code dir="ltr" className="code break-words rounded-lg bg-code px-3 py-2 text-xs leading-6 text-brand-200 sm:text-sm">
                {row.line}
              </code>
              <p className="text-sm leading-7 text-ink-700">
                <span className="me-1 font-bold text-brand-600">{i + 1}.</span>
                {row.explain}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section className="card space-y-2">
        <h2 className="flex items-center gap-2 text-lg font-extrabold">
          <Terminal className="h-5 w-5 text-brand-500" />
          الناتج المتوقع
        </h2>
        <pre className="code whitespace-pre-wrap rounded-xl bg-code p-4 text-sm text-green-300">{lesson.output}</pre>
      </section>

      <section className="card">
        <h2 className="mb-3 flex items-center gap-2 text-lg font-extrabold">
          <AlertTriangle className="h-5 w-5 text-brand-500" />
          الأخطاء الشائعة
        </h2>
        <ul className="list-inside list-disc space-y-2 text-ink-700">
          {lesson.mistakes.map((m) => (
            <li key={m} className="leading-7">
              {m}
            </li>
          ))}
        </ul>
      </section>

      <section className="card space-y-4">
        <h2 className="text-lg font-extrabold">تمرين قصير</h2>
        <p className="rounded-xl bg-brand-50 p-3 text-sm font-semibold text-brand-700">{lesson.exercise.prompt}</p>
        <CodeLab value={code} onChange={setCode} onChecked={() => recordPractice(lesson.slug)} />
        <div className="flex flex-wrap gap-2">
          <button type="button" className="btn-secondary" onClick={() => setHint((v) => !v)}>
            <Lightbulb className="h-4 w-4" />
            تلميح
          </button>
          <button type="button" className="btn-secondary" onClick={() => setSolution((v) => !v)}>
            <Eye className="h-4 w-4" />
            {solution ? "إخفاء الحل" : "عرض الحل"}
          </button>
        </div>
        {hint && <p className="rounded-xl bg-ink-100 p-3 text-sm text-ink-700">💡 {lesson.exercise.hint}</p>}
        {solution && <CodeBlock code={lesson.exercise.solution} label="الحل" />}
      </section>

      <section className="card space-y-3">
        <h2 className="text-lg font-extrabold">اختبار سريع (اختياري)</h2>
        <p className="font-semibold text-ink-800">{lesson.quiz.q}</p>
        <div className="grid gap-2">
          {lesson.quiz.options.map((o, i) => {
            const answered = picked !== null;
            const correct = i === lesson.quiz.answer;
            const style = !answered
              ? "border-ink-200 hover:border-brand-400 hover:bg-brand-50"
              : correct
                ? "border-green-500 bg-green-500/10 text-green-400"
                : i === picked
                  ? "border-red-400 bg-red-500/10 text-red-400"
                  : "border-ink-200 opacity-60";
            return (
              <button
                key={i}
                type="button"
                disabled={answered}
                onClick={() => {
                  setPicked(i);
                  recordQuiz(lesson.slug, i === lesson.quiz.answer);
                }}
                className={`rounded-xl border px-4 py-3 text-start text-sm transition ${style}`}
              >
                {o}
              </button>
            );
          })}
        </div>
        {picked !== null && (
          <p className="rounded-xl bg-ink-100 p-3 text-sm text-ink-700">
            {picked === lesson.quiz.answer ? "✅ إجابة صحيحة! " : "❌ ليست الإجابة الصحيحة. "}
            {lesson.quiz.why}
          </p>
        )}
      </section>

      <div className="card flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button type="button" onClick={() => toggleComplete(lesson.slug)} className={isDone ? "btn-secondary" : "btn-primary"}>
          <CheckCircle2 className="h-5 w-5" />
          {isDone ? "الدرس مكتمل ✓ (اضغط للإلغاء)" : "تحديد الدرس كمكتمل"}
        </button>
        <div className="flex gap-2">
          {prev ? (
            <Link href={`/dashboard/lessons/${prev.slug}`} className="btn-secondary flex-1 sm:flex-none">
              <ArrowRight className="h-4 w-4" />
              الدرس السابق
            </Link>
          ) : (
            <span className="btn-secondary flex-1 cursor-not-allowed opacity-50 sm:flex-none">
              <ArrowRight className="h-4 w-4" />
              الدرس السابق
            </span>
          )}
          {next ? (
            <Link href={`/dashboard/lessons/${next.slug}`} className="btn-dark flex-1 sm:flex-none">
              الدرس التالي
              <ArrowLeft className="h-4 w-4" />
            </Link>
          ) : (
            <span className="btn-dark flex-1 cursor-not-allowed opacity-50 sm:flex-none">
              الدرس التالي
              <ArrowLeft className="h-4 w-4" />
            </span>
          )}
        </div>
      </div>
      <TeacherDrawer lessonSlug={lesson.slug} getCode={() => code} />
    </article>
  );
}
