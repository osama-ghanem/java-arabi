"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export default function CodeBlock({ code, label = "Java" }: { code: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="overflow-hidden rounded-xl bg-code text-ink-800">
      <div className="flex items-center justify-between border-b border-ink-700 px-4 py-2 text-xs text-ink-400">
        <span dir="ltr">{label}</span>
        <button
          type="button"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(code);
              setCopied(true);
              setTimeout(() => setCopied(false), 1500);
            } catch {
              /* تجاهل */
            }
          }}
          className="inline-flex items-center gap-1 hover:text-white"
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? "تم النسخ" : "نسخ"}
        </button>
      </div>
      <pre className="code overflow-x-auto p-4 text-sm leading-7">
        <code>{code}</code>
      </pre>
    </div>
  );
}
