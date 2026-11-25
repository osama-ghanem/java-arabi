import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { question } = await req.json();

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "انت معلم لغة عربية شاطر، بتشرح بالعربي الفصحى البسيطة وبطريقة سهلة وممتعة للطلاب. جاوب باختصار وبأمثلة واضحة. لو السؤال مش بالعربي، جاوب بالعربي.",
        },
        { role: "user", content: question },
      ],
    }),
  });

  const data = await res.json();
  const answer = data.choices?.[0]?.message?.content || "ما قدرت أجاوب، جرب تاني";

  return NextResponse.json({ answer });
}
