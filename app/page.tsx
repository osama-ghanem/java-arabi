import Link from "next/link";
import { Award, Bot, ClipboardCheck, Code2, Flame, ListChecks, Rocket, ShieldCheck, Smartphone, Star, TerminalSquare } from "lucide-react";
import Logo from "@/components/Logo";
import { totalLessons, units } from "@/lib/curriculum";

const features = [
  { icon: Bot, title: "معلم AI على مدار الساعة", text: "اسأل بالعربي في أي درس، يشرح لك الكود سطرًا بسطر ويصلّح أخطاءك." },
  { icon: ListChecks, title: "شرح سطرًا بسطر", text: "نفهم كل كلمة ورمز: public وstatic وvoid والأقواس والفاصلة المنقوطة." },
  { icon: TerminalSquare, title: "محرر وفاحص أكواد", text: "اكتب كودك واعرف أين الخطأ وسببه وحله." },
  { icon: Star, title: "نقاط ونجوم وسلسلة أيام", text: "كل درس يكسبك نقاطًا، وسلسلة يومية تحفزك ترجع كل يوم." },
  { icon: Award, title: "شهادة باسمك", text: "أنهِ أي وحدة واحصل على شهادة جاهزة للطباعة." },
  { icon: Smartphone, title: "مصمم للجوال", text: "يشتغل زي التطبيق، وحسابك يضل مفتوحًا بدون إعادة دخول." },
];

export default function HomePage() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <header className="sticky top-0 z-30 border-b border-ink-200 bg-ink-50/90 backdrop-blur" style={{ paddingTop: "env(safe-area-inset-top)" }}>
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Logo />
          <Link href="/login" className="btn-secondary !min-h-[40px] !px-4 !py-2">تسجيل الدخول</Link>
        </div>
      </header>

      <section className="relative">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(34,197,94,0.22),transparent_60%)]" />
        <div className="relative mx-auto max-w-4xl px-4 pb-14 pt-14 text-center sm:pt-24">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-500/40 bg-brand-100 px-4 py-1.5 text-xs font-bold text-brand-400">
            <Flame className="h-4 w-4" />منصة عربية مجانية لتعلّم البرمجة
          </span>
          <h1 className="glow-text mt-6 text-6xl font-extrabold leading-tight text-ink-900 sm:text-8xl">
            Java <span className="text-brand-500">بالعربي</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-ink-600 sm:text-xl">
            تعلّم Java من الصفر حتى الاحتراف، بشرح بسيط، ومعلم ذكي يجاوبك بالعربي في أي وقت.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3">
            <Link href="/login" className="btn-primary w-full max-w-xs !py-4 text-lg"><Rocket className="h-5 w-5" />ابدأ التعلم مجاناً</Link>
            <span className="text-xs text-ink-400">بإيميلك فقط، بدون كلمة سر</span>
          </div>

          <div className="mx-auto mt-12 grid max-w-xl grid-cols-3 gap-3">
            {[
              { n: units.length, t: "وحدات" },
              { n: totalLessons, t: "درس" },
              { n: 24, t: "ساعة معلم AI" },
            ].map((s) => (
              <div key={s.t} className="rounded-2xl border border-brand-500/30 bg-panel p-4 shadow-glow">
                <div className="text-4xl font-extrabold text-brand-400 sm:text-5xl">{s.n}</div>
                <div className="mt-1 text-sm font-bold text-ink-600">{s.t}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 pb-16">
        <div dir="ltr" className="overflow-hidden rounded-2xl border border-ink-200 bg-code shadow-glow">
          <div className="flex items-center gap-2 border-b border-ink-200 px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-red-400" /><span className="h-3 w-3 rounded-full bg-yellow-400" /><span className="h-3 w-3 rounded-full bg-green-400" />
            <span className="ms-3 text-xs text-ink-400">Main.java</span>
          </div>
          <pre className="code overflow-x-auto p-5 text-sm leading-7 text-brand-400">{`public class Main {
    public static void main(String[] args) {
        System.out.println("أهلاً Java!");
    }
}`}</pre>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <h2 className="mb-8 text-center text-3xl font-extrabold text-ink-900">كل اللي تحتاجه في مكان واحد</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, text }) => (
            <div key={title} className="card transition hover:border-brand-500/50">
              <span className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-100 text-brand-400"><Icon className="h-6 w-6" /></span>
              <h3 className="mb-1 text-lg font-extrabold text-ink-900">{title}</h3>
              <p className="text-sm leading-7 text-ink-600">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-ink-200 bg-panel py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="mb-8 text-center text-3xl font-extrabold text-ink-900">رحلتك من الصفر إلى الاحتراف</h2>
          <ol className="grid grid-cols-2 gap-3 lg:grid-cols-5">
            {units.map((u) => (
              <li key={u.id} className="card">
                <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-brand-500 text-sm font-extrabold text-black">{u.id}</div>
                <h3 className="text-sm font-extrabold text-ink-900 sm:text-base">{u.title}</h3>
                <p className="mt-1 text-xs text-ink-500">{u.lessons.length} دروس</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-16 lg:grid-cols-2">
        <div className="space-y-4">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-100 px-3 py-1 text-xs font-bold text-brand-400"><ShieldCheck className="h-4 w-4" />تصحيح الأكواد بالذكاء الاصطناعي</span>
          <h2 className="text-3xl font-extrabold text-ink-900">لا تخاف من الأخطاء، المعلم يشرحها لك</h2>
          <p className="leading-8 text-ink-600">الصق كودك واعرف السطر الخطأ وسببه وكيف تصلحه، بشرح يناسب المبتدئين.</p>
        </div>
        <div className="card space-y-3">
          <div className="rounded-xl bg-red-500/10 p-3 text-sm text-red-400"><b>السطر 3:</b> ينقصه فاصلة منقوطة <code dir="ltr">;</code></div>
          <div className="rounded-xl bg-red-500/10 p-3 text-sm text-red-400"><b>السطر 4:</b> النوع <code dir="ltr">String</code> بحرف S كبير.</div>
          <div className="rounded-xl bg-green-500/10 p-3 text-sm text-green-400"><b>الحل:</b> أضف <code dir="ltr">;</code> وغيّر النوع.</div>
        </div>
      </section>

      <section className="px-4 pb-20">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 rounded-3xl border border-brand-500/40 bg-brand-100 p-8 text-center shadow-glow">
          <ClipboardCheck className="h-10 w-10 text-brand-400" />
          <h2 className="text-3xl font-extrabold text-ink-900">جاهز تبدأ؟</h2>
          <p className="text-ink-600">دقيقة وحدة وتكون داخل أول درس.</p>
          <Link href="/login" className="btn-primary w-full max-w-xs !py-4 text-lg"><Code2 className="h-5 w-5" />ابدأ التعلم مجاناً</Link>
        </div>
      </section>

      <footer className="border-t border-ink-200 bg-panel py-8 text-center text-xs text-ink-400">
        <Logo dark /> <p className="mt-3">© {new Date().getFullYear()} Java بالعربي</p>
      </footer>
    </div>
  );
}
