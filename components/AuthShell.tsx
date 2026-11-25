import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Logo from "./Logo";

export default function AuthShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,rgba(34,197,94,0.18),transparent_60%)] px-4 py-10">
      <div className="mb-6">
        <Logo />
      </div>
      <div className="w-full max-w-md rounded-2xl border border-ink-200 bg-panel p-6 shadow-sm sm:p-8">
        <h1 className="text-2xl font-extrabold text-ink-900">{title}</h1>
        <p className="mb-6 mt-1 text-sm text-ink-500">{subtitle}</p>
        {children}
      </div>
      <Link href="/" className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-ink-500 hover:text-ink-800">
        <ArrowRight className="h-4 w-4" />
        العودة للصفحة الرئيسية
      </Link>
    </div>
  );
}
