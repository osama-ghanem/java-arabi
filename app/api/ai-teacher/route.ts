import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { question } = await req.json();
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: `انت معلم لغة عربية شاطر، بتشرح بالعربي الفصحى البسيطة وبطريقة سهلة وممتعة. السؤال: ${question}` }] }],
      }),
    }
  );
  const data = await res.json();
  const answer = data.candidates?.[0]?.content?.parts?.[0]?.text || "ما قدرت أجاوب، جرب تاني";
  return NextResponse.json({ answer });
}
