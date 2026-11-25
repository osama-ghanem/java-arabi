"use client";

import { useState } from "react";
import { AlertTriangle, CheckCircle2, Loader2, Play, ShieldCheck, XCircle } from "lucide-react";
import CodeEditor from "./CodeEditor";
import RichText from "./RichText";
import { simulateJava, type SimResult } from "@/lib/java-sim";
import type { Issue } from "@/lib/java-checker";

type CheckResponse = {
  issues: Issue[];
  summary: string;
  aiExplanation: string | null;
  source: "ai" | "mock";
};

export default function CodeLab({
  value,
  onChange,
  height = 300,
  runLabel = "تجربة الكود",
  onChecked,
}: {
  value: string;
  onChange: (v: string) => void;
  height?: number;
  runLabel?: string;
  onChecked?: () => void;
}) {
  const [sim, setSim] = useState<SimResult | null>(null);
  const [check, setCheck] = useState<CheckResponse | null>(null);
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState("");

  async function runCheck() {
    setChecking(true);
    setError("");
    try {
      const res = await fetch("/api/check-code", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ code: value }),
      });
      if (!res.ok) throw new Error();
      setCheck((await res.json()) as CheckResponse);
      onChecked?.();
    } catch {
      setError("تعذّر فحص الكود الآن، حاول مرة أخرى.");
    } finally {
      setChecking(false);
    }
  }

  return (
    <div className="space-y-3">
      <CodeEditor value={value} onChange={onChange} height={height} />

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className="btn-primary"
          onClick={() => {
            setSim(simulateJava(value));
            void runCheck();
          }}
        >
          <Play className="h-4 w-4" />
          {runLabel}
        </button>
        <button type="button" className="btn-dark" onClick={runCheck} disabled={checking}>
          {checking ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShieldCheck className="h-4 w-4" />}
          فحص وتصحيح الكود
        </button>
      </div>

      {error && <div className="rounded-xl bg-red-500/10 p-3 text-sm text-red-400">{error}</div>}

      {sim && (
        <div className="rounded-xl border border-ink-200 bg-panel">
          <div className="border-b border-ink-100 px-4 py-2 text-xs font-bold text-ink-500">الناتج</div>
          <pre className="code min-h-[3rem] whitespace-pre-wrap p-4 text-sm text-ink-800">
            {sim.output || "(لا يوجد ناتج)"}
          </pre>
          {sim.note && <div className="border-t border-ink-100 bg-brand-50 p-3 text-xs text-brand-700">{sim.note}</div>}
        </div>
      )}

      {check && (
        <div className="rounded-xl border border-ink-200 bg-panel p-4">
          <div className="mb-3 flex items-center gap-2 font-bold text-ink-800">
            {check.issues.length === 0 ? (
              <CheckCircle2 className="h-5 w-5 text-green-400" />
            ) : (
              <AlertTriangle className="h-5 w-5 text-brand-600" />
            )}
            نتيجة الفحص
          </div>
          <p className="mb-3 text-sm text-ink-600">{check.summary}</p>
          {check.issues.length > 0 && (
            <ul className="space-y-3">
              {check.issues.map((i, idx) => (
                <li key={idx} className="rounded-lg border border-ink-100 bg-ink-50 p-3 text-sm">
                  <div className="flex items-start gap-2">
                    {i.severity === "error" ? (
                      <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                    ) : (
                      <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                    )}
                    <div>
                      <div className="font-bold text-ink-800">
                        {i.line ? `السطر ${i.line}: ` : ""}
                        {i.message}
                      </div>
                      <div className="mt-1 text-ink-600">
                        <span className="font-semibold">الحل: </span>
                        {i.fix}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
          {check.aiExplanation ? (
            <div className="mt-4 border-t border-ink-100 pt-4">
              <div className="mb-2 text-xs font-bold text-brand-600">شرح المساعد الذكي</div>
              <RichText text={check.aiExplanation} />
            </div>
          ) : (
            <p className="mt-4 border-t border-ink-100 pt-3 text-xs text-ink-400">
              هذا فحص آلي مبسّط. لشرح أعمق لأخطائك اضغط «اسأل المعلم AI» داخل الدرس.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
