"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useProgress } from "@/lib/progress";

export default function RewardToast() {
  const { reward, clearReward } = useProgress();
  useEffect(() => {
    if (!reward) return;
    const t = setTimeout(clearReward, reward.unitId ? 7000 : 3200);
    return () => clearTimeout(t);
  }, [reward, clearReward]);
  if (!reward) return null;
  return (
    <div className="no-print fixed inset-x-0 bottom-24 z-50 flex justify-center px-4 lg:bottom-8">
      <div className="w-full max-w-sm rounded-2xl border border-brand-500/50 bg-ink-100 p-4 text-center shadow-glow">
        <div className="text-lg font-extrabold text-ink-900">{reward.text}</div>
        {reward.points > 0 && <div className="mt-1 text-sm font-bold text-brand-400">+{reward.points} نقطة ⭐</div>}
        {reward.unitId && (
          <Link href={`/dashboard/certificates?unit=${reward.unitId}`} onClick={clearReward} className="btn-primary mt-3 w-full">
            اعرض شهادتي 🎓
          </Link>
        )}
      </div>
    </div>
  );
}
