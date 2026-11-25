"use client";

import { useState } from "react";
import { Bot, X } from "lucide-react";
import Teacher from "./Teacher";

export default function TeacherDrawer({ lessonSlug, getCode }: { lessonSlug: string; getCode: () => string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="no-print btn-primary fixed bottom-24 start-4 z-40 !rounded-full !px-5 shadow-glow lg:bottom-8"
      >
        <Bot className="h-5 w-5" />
        اسأل المعلم AI
      </button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
          <div className="absolute inset-0 bg-black/70" onClick={() => setOpen(false)} />
          <div className="relative flex h-[85vh] w-full max-w-xl flex-col rounded-t-3xl border border-ink-200 bg-ink-50 p-4 sm:h-[80vh] sm:rounded-3xl safe-bottom">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-lg font-extrabold text-ink-900"><Bot className="h-5 w-5 text-brand-500" />المعلم AI</h2>
              <button onClick={() => setOpen(false)} aria-label="إغلاق" className="rounded-lg p-2 hover:bg-ink-100"><X className="h-5 w-5" /></button>
            </div>
            <Teacher lessonSlug={lessonSlug} getCode={getCode} className="flex-1" />
          </div>
        </div>
      )}
    </>
  );
}
