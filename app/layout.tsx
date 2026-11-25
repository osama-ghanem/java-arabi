import type { Metadata, Viewport } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth";
import { ProgressProvider } from "@/lib/progress";

const cairo = Cairo({ subsets: ["arabic", "latin"], variable: "--font-cairo", display: "swap" });

export const metadata: Metadata = {
  title: "Java بالعربي — تعلّم Java من الصفر حتى الاحتراف",
  description: "منصة عربية تفاعلية لتعلّم Java: 10 وحدات و60 درسًا، معلم ذكي، نقاط ونجوم وشهادات.",
  manifest: "/manifest.webmanifest",
  appleWebApp: { capable: true, title: "Java بالعربي", statusBarStyle: "black-translucent" },
};

export const viewport: Viewport = {
  themeColor: "#050805",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={cairo.variable}>
      <body className="font-sans">
        <AuthProvider>
          <ProgressProvider>{children}</ProgressProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
