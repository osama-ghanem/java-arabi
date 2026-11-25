"use client";
import { useState } from "react";

export default function AiTeacher() {
  const [q, setQ] = useState("");
  const [a, setA] = useState("");
  const [loading, setLoading] = useState(false);

  async function ask() {
    if (!q) return;
    setLoading(true);
    setA("");
    try {
      const res = await fetch("/api/ai-teacher", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: q }),
      });
      const data = await res.json();
      setA(data.answer || "ما وصل جواب، جرب تاني");
    } catch {
      setA("صار خطأ، جرب تاني");
    }
    setLoading(false);
  }

  return (
    <div style={{ maxWidth: 700, margin: "40px auto", padding: 20, direction: "rtl" }}>
      <h1>المعلم الذكي - اسألني بالعربي</h1>
      <p>اكتب سؤالك بالعربي، وأنا بشرحلك</p>
      <textarea
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="مثلا: اشرحلي الفعل الماضي..."
        style={{ width: "100%", height: 100, padding: 12, fontSize: 16, borderRadius: 10 }}
      />
      <button
        onClick={ask}
        style={{ marginTop: 10, padding: "12px 25px", fontSize: 18, background: "#16a34a", color: "white", border: "none", borderRadius: 10 }}
      >
        {loading ? "بفكر..." : "اسأل المعلم"}
      </button>
      {a && (
        <div style={{ marginTop: 20, background: "#f0fdf4", padding: 15, borderRadius: 10, whiteSpace: "pre-wrap" }}>
          {a}
        </div>
      )}
    </div>
  );
}
