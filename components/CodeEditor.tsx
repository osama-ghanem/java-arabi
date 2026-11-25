"use client";

import dynamic from "next/dynamic";

function Fallback({ value, onChange, height }: { value: string; onChange: (v: string) => void; height: number }) {
  return (
    <textarea
      dir="ltr"
      spellCheck={false}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{ height }}
      className="code w-full resize-none rounded-xl bg-code p-4 font-mono text-sm text-ink-800 outline-none"
    />
  );
}

const Monaco = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => (
    <div className="flex h-64 items-center justify-center rounded-xl bg-code text-sm text-ink-300">
      جارٍ تحميل المحرر...
    </div>
  ),
});

export default function CodeEditor({
  value,
  onChange,
  height = 320,
}: {
  value: string;
  onChange: (v: string) => void;
  height?: number;
}) {
  return (
    <div dir="ltr" className="overflow-hidden rounded-xl border border-ink-700">
      <Monaco
        height={height}
        language="java"
        theme="vs-dark"
        value={value}
        onChange={(v) => onChange(v ?? "")}
        loading={<Fallback value={value} onChange={onChange} height={height} />}
        options={{
          fontSize: 14,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 4,
          padding: { top: 12 },
          wordWrap: "on",
        }}
      />
    </div>
  );
}
