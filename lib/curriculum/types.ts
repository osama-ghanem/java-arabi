export type Quiz = {
  q: string;
  options: string[];
  answer: number; // فهرس الإجابة الصحيحة
  why: string;
};

export type Lesson = {
  slug: string;
  title: string;
  description: string;
  explanation: string[]; // فقرات
  goals: string[];
  code: string; // مثال Java
  lineByLine: { line: string; explain: string }[];
  output: string;
  mistakes: string[];
  exercise: { prompt: string; starter: string; hint: string; solution: string };
  quiz: Quiz;
};

export type Unit = {
  id: number;
  title: string;
  description: string;
  lessons: Lesson[];
};
