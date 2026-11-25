import CodeBlock from "./CodeBlock";

/** عرض بسيط لرد المساعد: كتل ```java و **غامق** و `كود` و _مائل_. */
export default function RichText({ text }: { text: string }) {
  const parts = text.split(/```(?:java)?\n?([\s\S]*?)```/g);
  return (
    <div className="space-y-3 text-sm leading-7">
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <CodeBlock key={i} code={part.trimEnd()} />
        ) : (
          <div key={i} className="space-y-2 whitespace-pre-wrap">
            {renderInline(part)}
          </div>
        ),
      )}
    </div>
  );
}

function renderInline(s: string) {
  const tokens = s.split(/(\*\*[^*]+\*\*|`[^`]+`|_\([^)]*\)_|_[^_]+_)/g);
  return tokens.map((t, i) => {
    if (t.startsWith("**") && t.endsWith("**")) return <strong key={i}>{t.slice(2, -2)}</strong>;
    if (t.startsWith("`") && t.endsWith("`"))
      return (
        <code key={i} dir="ltr" className="code rounded bg-ink-100 px-1.5 py-0.5 text-[0.85em] text-brand-700">
          {t.slice(1, -1)}
        </code>
      );
    if (t.startsWith("_") && t.endsWith("_") && t.length > 2)
      return (
        <em key={i} className="text-ink-500">
          {t.slice(1, -1)}
        </em>
      );
    return <span key={i}>{t}</span>;
  });
}
