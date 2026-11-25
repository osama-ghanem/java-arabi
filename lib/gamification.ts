// منطق النقاط والنجوم والسلسلة: دوال نقية بدون React حتى يسهل اختبارها.

export type Progress = {
  completed: string[]; // slugs للدروس المكتملة
  quizzes: Record<string, boolean>; // slug -> أجاب صح؟
  practiced: string[]; // دروس فحص الطالب كودًا فيها
  last?: string; // آخر درس زاره
  streak: { count: number; last: string }; // last بصيغة YYYY-MM-DD
};

export const emptyProgress: Progress = {
  completed: [],
  quizzes: {},
  practiced: [],
  streak: { count: 0, last: "" },
};

export const POINTS = { lesson: 10, quiz: 5, practice: 3, unit: 25 } as const;

type UnitLike = { id: number; lessons: { slug: string }[] };

/** صيغة مقاومة للمنطقة الزمنية: تاريخ اليوم بتوقيت جهاز الطالب. */
export function dayKey(d: Date = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function daysBetween(a: string, b: string): number {
  const [ay, am, ad] = a.split("-").map(Number);
  const [by, bm, bd] = b.split("-").map(Number);
  return Math.round((Date.UTC(by, bm - 1, bd) - Date.UTC(ay, am - 1, ad)) / 86_400_000);
}

/** يحدّث سلسلة الأيام عند أي نشاط. */
export function touchStreak(streak: Progress["streak"], now: Date = new Date()): Progress["streak"] {
  const today = dayKey(now);
  if (streak.last === today) return streak;
  if (streak.last && daysBetween(streak.last, today) === 1) return { count: streak.count + 1, last: today };
  return { count: 1, last: today };
}

/** السلسلة المعروضة: إن فات أكثر من يوم فهي منقطعة (صفر) حتى يعود الطالب. */
export function activeStreak(streak: Progress["streak"], now: Date = new Date()): number {
  if (!streak.last) return 0;
  return daysBetween(streak.last, dayKey(now)) <= 1 ? streak.count : 0;
}

export function lessonStars(p: Progress, slug: string): number {
  if (!p.completed.includes(slug)) return 0;
  return 1 + (p.quizzes[slug] === true ? 1 : 0) + (p.practiced.includes(slug) ? 1 : 0);
}

export function unitDone(p: Progress, u: UnitLike): boolean {
  return u.lessons.every((l) => p.completed.includes(l.slug));
}

export function computeStats(p: Progress, units: UnitLike[]) {
  const done = new Set(p.completed);
  const lessonSlugs = new Set(units.flatMap((u) => u.lessons.map((l) => l.slug)));
  const completed = p.completed.filter((s) => lessonSlugs.has(s));
  const quizCorrect = Object.entries(p.quizzes).filter(([s, ok]) => ok && lessonSlugs.has(s)).length;
  const practiced = p.practiced.filter((s) => lessonSlugs.has(s) && done.has(s)).length;
  const unitsDone = units.filter((u) => unitDone(p, u)).map((u) => u.id);
  const points =
    completed.length * POINTS.lesson +
    quizCorrect * POINTS.quiz +
    practiced * POINTS.practice +
    unitsDone.length * POINTS.unit;
  const stars = completed.reduce((n, s) => n + lessonStars(p, s), 0);
  return { points, stars, unitsDone, completedCount: completed.length, quizSolved: Object.keys(p.quizzes).filter((s) => lessonSlugs.has(s)).length };
}

const LEVELS = [
  { min: 0, name: "مبتدئ" },
  { min: 100, name: "متعلّم" },
  { min: 300, name: "مبرمج" },
  { min: 600, name: "محترف" },
  { min: 1000, name: "خبير Java" },
];

export function levelOf(points: number) {
  let idx = 0;
  LEVELS.forEach((l, i) => {
    if (points >= l.min) idx = i;
  });
  const cur = LEVELS[idx];
  const nxt = LEVELS[idx + 1];
  return {
    number: idx + 1,
    name: cur.name,
    nextName: nxt?.name ?? null,
    toNext: nxt ? nxt.min - points : 0,
    percent: nxt ? ((points - cur.min) / (nxt.min - cur.min)) * 100 : 100,
  };
}

/** يدمج تقدمًا محليًا وبعيدًا بدون فقدان أي شيء (اتحاد). */
export function mergeProgress(a: Progress, b: Progress): Progress {
  const lastStreak = a.streak.last >= b.streak.last ? a.streak : b.streak;
  return {
    completed: Array.from(new Set([...a.completed, ...b.completed])),
    quizzes: { ...b.quizzes, ...a.quizzes },
    practiced: Array.from(new Set([...a.practiced, ...b.practiced])),
    last: a.last ?? b.last,
    streak: lastStreak,
  };
}
