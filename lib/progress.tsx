"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { useAuth } from "./auth";
import { supabase } from "./supabase";
import { units } from "./curriculum";
import {
  POINTS,
  computeStats,
  emptyProgress,
  levelOf,
  mergeProgress,
  touchStreak,
  activeStreak,
  type Progress,
} from "./gamification";

export type { Progress } from "./gamification";

export type Reward = { id: number; text: string; points: number; unitId?: number };

type Ctx = {
  progress: Progress;
  ready: boolean;
  stats: ReturnType<typeof computeStats>;
  level: ReturnType<typeof levelOf>;
  streak: number;
  reward: Reward | null;
  clearReward: () => void;
  toggleComplete: (slug: string) => void;
  setLast: (slug: string) => void;
  recordQuiz: (slug: string, correct: boolean) => void;
  recordPractice: (slug: string) => void;
};

const ProgressContext = createContext<Ctx | null>(null);
const cacheKey = (id: string) => `jba_progress_v2_${id}`;

function readCache(id: string): Progress {
  try {
    const raw = localStorage.getItem(cacheKey(id));
    return raw ? { ...emptyProgress, ...(JSON.parse(raw) as Progress) } : emptyProgress;
  } catch {
    return emptyProgress;
  }
}

export function ProgressProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [progress, setProgress] = useState<Progress>(emptyProgress);
  const [ready, setReady] = useState(false);
  const [reward, setReward] = useState<Reward | null>(null);
  const progressRef = useRef(progress);
  progressRef.current = progress;
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const userId = user?.id;

  // تحميل التقدم من Supabase (المصدر الحقيقي) مع كاش محلي للسرعة وللعمل مع ضعف الشبكة.
  useEffect(() => {
    if (!userId) {
      setProgress(emptyProgress);
      setReady(false);
      return;
    }
    let cancelled = false;
    const local = readCache(userId);
    setProgress(local);
    (async () => {
      if (supabase) {
        const { data } = await supabase.from("progress").select("data").eq("user_id", userId).maybeSingle();
        if (cancelled) return;
        if (data?.data) {
          const merged = mergeProgress(local, { ...emptyProgress, ...(data.data as Progress) });
          setProgress(merged);
          localStorage.setItem(cacheKey(userId), JSON.stringify(merged));
        }
      }
      if (!cancelled) setReady(true);
    })();
    return () => {
      cancelled = true;
    };
  }, [userId]);

  const persist = useCallback(
    (next: Progress) => {
      if (!userId) return;
      setProgress(next);
      progressRef.current = next;
      try {
        localStorage.setItem(cacheKey(userId), JSON.stringify(next));
      } catch {
        /* تجاهل */
      }
      if (!supabase) return;
      if (saveTimer.current) clearTimeout(saveTimer.current);
      saveTimer.current = setTimeout(() => {
        const s = computeStats(progressRef.current, units);
        void supabase!
          .from("progress")
          .upsert({
            user_id: userId,
            data: progressRef.current,
            points: s.points,
            stars: s.stars,
            updated_at: new Date().toISOString(),
          })
          .then(() => undefined);
      }, 600);
    },
    [userId],
  );

  const showReward = useCallback((text: string, points: number, unitId?: number) => {
    setReward({ id: Date.now(), text, points, unitId });
  }, []);

  const toggleComplete = useCallback(
    (slug: string) => {
      const p = progressRef.current;
      const had = p.completed.includes(slug);
      const completed = had ? p.completed.filter((s) => s !== slug) : [...p.completed, slug];
      const next: Progress = { ...p, completed, last: slug, streak: had ? p.streak : touchStreak(p.streak) };
      persist(next);
      if (!had) {
        const before = computeStats(p, units);
        const after = computeStats(next, units);
        const finished = after.unitsDone.find((id) => !before.unitsDone.includes(id));
        showReward(
          finished ? `أنهيت الوحدة ${finished}! شهادتك جاهزة 🎓` : "أحسنت! أكملت الدرس 🎉",
          after.points - before.points,
          finished,
        );
      }
    },
    [persist, showReward],
  );

  const setLast = useCallback(
    (slug: string) => {
      const p = progressRef.current;
      if (p.last !== slug) persist({ ...p, last: slug });
    },
    [persist],
  );

  const recordQuiz = useCallback(
    (slug: string, correct: boolean) => {
      const p = progressRef.current;
      if (slug in p.quizzes) return; // المحاولة الأولى فقط تُحتسب
      persist({ ...p, quizzes: { ...p.quizzes, [slug]: correct }, streak: touchStreak(p.streak) });
      if (correct) showReward("إجابة صحيحة ⭐", POINTS.quiz);
    },
    [persist, showReward],
  );

  const recordPractice = useCallback(
    (slug: string) => {
      const p = progressRef.current;
      if (p.practiced.includes(slug)) return;
      persist({ ...p, practiced: [...p.practiced, slug], streak: touchStreak(p.streak) });
    },
    [persist],
  );

  const stats = useMemo(() => computeStats(progress, units), [progress]);
  const level = useMemo(() => levelOf(stats.points), [stats.points]);
  const streak = useMemo(() => activeStreak(progress.streak), [progress.streak]);

  const value: Ctx = {
    progress,
    ready,
    stats,
    level,
    streak,
    reward,
    clearReward: () => setReward(null),
    toggleComplete,
    setLast,
    recordQuiz,
    recordPractice,
  };

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress يجب أن يُستخدم داخل ProgressProvider");
  return ctx;
}
