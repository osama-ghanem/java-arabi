export default function ProgressBar({ value, label }: { value: number; label?: string }) {
  const v = Math.max(0, Math.min(100, Math.round(value)));
  return (
    <div>
      {label && (
        <div className="mb-1.5 flex items-center justify-between text-xs font-semibold text-ink-600">
          <span>{label}</span>
          <span>{v}%</span>
        </div>
      )}
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-ink-200" role="progressbar" aria-valuenow={v} aria-valuemin={0} aria-valuemax={100}>
        <div className="h-full rounded-full bg-brand-500 transition-all" style={{ width: `${v}%` }} />
      </div>
    </div>
  );
}
