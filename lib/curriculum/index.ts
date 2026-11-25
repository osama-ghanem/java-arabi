import type { Lesson, Unit } from "./types";
import { unit1 } from "./unit1";
import { unit2 } from "./unit2";
import { unit3 } from "./unit3";
import { unit4 } from "./unit4";
import { unit5 } from "./unit5";
import { unit6 } from "./unit6";
import { unit7 } from "./unit7";
import { unit8 } from "./unit8";
import { unit9 } from "./unit9";
import { unit10 } from "./unit10";
import { extraUnit1, extraUnit2, extraUnit3, extraUnit4 } from "./extraA";
import { extraUnit5, extraUnit6, extraUnit7, extraUnit8, extraUnit9 } from "./extraB";

export type { Lesson, Unit, Quiz } from "./types";

const extras: Record<number, Lesson[]> = {
  1: extraUnit1, 2: extraUnit2, 3: extraUnit3, 4: extraUnit4, 5: extraUnit5,
  6: extraUnit6, 7: extraUnit7, 8: extraUnit8, 9: extraUnit9,
};

const base: Unit[] = [unit1, unit2, unit3, unit4, unit5, unit6, unit7, unit8, unit9, unit10];

export const units: Unit[] = base.map((u) => ({ ...u, lessons: [...u.lessons, ...(extras[u.id] ?? [])] }));

export const allLessons: (Lesson & { unitId: number; unitTitle: string })[] = units.flatMap((u) =>
  u.lessons.map((l) => ({ ...l, unitId: u.id, unitTitle: u.title })),
);

export const totalLessons = allLessons.length;

export function getLesson(slug: string) {
  const index = allLessons.findIndex((l) => l.slug === slug);
  if (index === -1) return null;
  return {
    lesson: allLessons[index],
    index,
    prev: index > 0 ? allLessons[index - 1] : null,
    next: index < allLessons.length - 1 ? allLessons[index + 1] : null,
  };
}
