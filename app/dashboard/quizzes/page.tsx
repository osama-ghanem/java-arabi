"use client";

import { useState } from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import { useProgress } from "@/lib/progress";
import { units } from "@/lib/curriculum";

export default function QuizzesPage() {
  const { progress, ready, recordQuiz } = useProgress();
  const [unitId, setUnitId] = useState(1);
  const [picked, setPicked] = useState<Record<string, number>>({});

  if (!ready) return <div className="text-ink-500">جارٍ التحميل...</div>;

  const unit = units.find((u) => u.id === unitId)!;
  const total = units.reduce((n, u) => n + u.lessons.length, 0);
  const solved = Object.keys(progress.quizzes).length;
  const correct = Object.values(progress.quizzes).filter(Boolean).length;

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-extrabold text-ink-900">الاختبارات</h1>
        <p className="text-ink-500">
          اختبارات اختيارية على كل وحدة. حللت {solved} من {total}، منها {correct} صحيحة.
        </p>
      </header>

      <div className="flex flex-wrap gap-2">
        {units.map((u) => (
          <button
            key={u.id}
            onClick={() => setUnitId(u.id)}
            className={`rounded-full px-4 py-1.5 text-sm font-bold transition ${
              u.id === unitId ? "bg-brand-500 text-black" : "border border-ink-200 bg-panel text-ink-700 hover:bg-ink-100"
            }`}
          >
            الوحدة {u.id}
          </button>
        ))}
      </div>

      <h2 className="text-lg font-extrabold">{unit.title}</h2>

      <div className="space-y-4">
        {unit.lessons.map((l) => {
          const p = picked[l.slug];
          const done = p !== undefined;
          const prev = progress.quizzes[l.slug];
          return (
            <section key={l.slug} className="card space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-xs font-semibold text-ink-400">{l.title}</div>
                  <p className="mt-1 font-bold text-ink-800">{l.quiz.q}</p>
                </div>
                {prev !== undefined &&
                  (prev ? (
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-green-400" aria-label="سبق حلها بشكل صحيح" />
                  ) : (
                    <XCircle className="h-5 w-5 shrink-0 text-red-400" aria-label="سبق حلها بشكل خاطئ" />
                  ))}
              </div>
              <div className="grid gap-2">
                {l.quiz.options.map((o, i) => {
                  const isCorrect = i === l.quiz.answer;
                  const style = !done
                    ? "border-ink-200 hover:border-brand-400 hover:bg-brand-50"
                    : isCorrect
                      ? "border-green-500 bg-green-500/10 text-green-400"
                      : i === p
                        ? "border-red-400 bg-red-500/10 text-red-400"
                        : "border-ink-200 opacity-60";
                  return (
                    <button
                      key={i}
                      disabled={done}
                      onClick={() => {
                        setPicked((s) => ({ ...s, [l.slug]: i }));
                        recordQuiz(l.slug, i === l.quiz.answer);
                      }}
                      className={`rounded-xl border px-4 py-2.5 text-start text-sm transition ${style}`}
                    >
                      {o}
                    </button>
                  );
                })}
              </div>
              {done && <p className="rounded-xl bg-ink-100 p-3 text-sm text-ink-700">{l.quiz.why}</p>}
            </section>
          );
        })}
      </div>
    </div>
  );
}
