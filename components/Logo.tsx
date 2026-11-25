import Link from "next/link";
import { Coffee } from "lucide-react";

export default function Logo({ href = "/", dark = false }: { href?: string; dark?: boolean }) {
  return (
    <Link href={href} className="inline-flex items-center gap-2.5">
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500 text-black shadow-sm">
        <Coffee className="h-5 w-5" />
      </span>
      <span className={`text-xl font-extrabold ${dark ? "text-ink-900" : "text-ink-900"}`}>
        Java <span className="text-brand-500">بالعربي</span>
      </span>
    </Link>
  );
}
