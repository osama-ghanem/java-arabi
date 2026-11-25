"use client";

import Link from "next/link";
import { CheckCircle2, Circle } from "lucide-react";
import { units } from "@/lib/curriculum";
import type { Progress } from "@/lib/progress";
import ProgressBar from "./ProgressBar";

export default function ModuleList({ progress }: { progress: Progress }) {
  const done = new Set(progress.completed);
  return (
    <div className="space-y-4">
      {units.map((u) => {
        const count = u.lessons.filter((l) => done.has(l.slug)).length;
        const pct = (count / u.lessons.length) * 100;
        return (
          <section key={u.id} className="card">
            <div className="mb-3 flex items-start justify-between gap-4">
              <div>
                <div className="text-xs font-bold text-brand-600">الوحدة {u.id}</div>
                <h3 className="text-lg font-extrabold text-ink-900">{u.title}</h3>
                <p className="text-sm text-ink-500">{u.description}</p>
              </div>
              <div className="w-28 shrink-0 pt-1 sm:w-40">
                <ProgressBar value={pct} />
                <div className="mt-1 text-end text-xs text-ink-500">
                  {count} / {u.lessons.length}
                </div>
              </div>
            </div>
            <ul className="divide-y divide-ink-100">
              {u.lessons.map((l) => (
                <li key={l.slug}>
                  <Link
                    href={`/dashboard/lessons/${l.slug}`}
                    className="flex items-center gap-3 rounded-lg px-2 py-2.5 text-sm hover:bg-ink-50"
                  >
                    {done.has(l.slug) ? (
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-green-400" />
                    ) : (
                      <Circle className="h-5 w-5 shrink-0 text-ink-300" />
                    )}
                    <span className={done.has(l.slug) ? "text-ink-500" : "font-semibold text-ink-800"}>{l.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
