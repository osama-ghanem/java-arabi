"use client";

import { useProgress } from "@/lib/progress";
import ModuleList from "@/components/ModuleList";

export default function LessonsPage() {
  const { progress, ready } = useProgress();
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-extrabold text-ink-900">كل الدروس</h1>
        <p className="text-ink-500">من الأساسيات إلى المشاريع التطبيقية، بالترتيب.</p>
      </header>
      {ready ? <ModuleList progress={progress} /> : <div className="text-ink-500">جارٍ التحميل...</div>}
    </div>
  );
}
