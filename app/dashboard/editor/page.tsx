"use client";

import { useState } from "react";
import CodeLab from "@/components/CodeLab";

const sample = `public class Main {
    public static void main(String[] args) {
        int age = 20
        string name = "Sara";
        System.out.println("مرحبا " + name)
    }
}`;

export default function EditorPage() {
  const [code, setCode] = useState(sample);
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-extrabold text-ink-900">صحح كودك</h1>
        <p className="text-ink-500">
          اكتب أو الصق كود Java، ثم اضغط «فحص وتصحيح الكود» ليخبرك بالأخطاء وسببها وطريقة إصلاحها. (الكود التجريبي بالأسفل فيه أخطاء متعمدة 😉)
        </p>
      </header>
      <CodeLab value={code} onChange={setCode} height={420} runLabel="تجربة الكود" />
    </div>
  );
}
