"use client";

import Teacher from "@/components/Teacher";

export default function AssistantPage() {
  return (
    <div className="flex h-[calc(100dvh-10.5rem)] min-h-[420px] flex-col gap-3 lg:h-[calc(100dvh-7rem)]">
      <header>
        <h1 className="text-2xl font-extrabold text-ink-900">المعلم AI</h1>
        <p className="text-sm text-ink-500">اسأل أي سؤال في Java. يجاوبك بالعربي ويصلّح أخطاءك.</p>
      </header>
      <Teacher className="flex-1" suggestions={["ما الفرق بين int و double؟", "اشرح لي الدالة main", "كيف أكتب حلقة for؟", "ما معنى static؟"]} />
    </div>
  );
}
