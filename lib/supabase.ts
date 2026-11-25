import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/** true عندما تتوفر مفاتيح Supabase. بدونها تعرض المنصة شاشة "المنصة غير مربوطة بعد". */
export const hasSupabase = Boolean(url && anon);

/**
 * إعدادات الجلسة الدائمة:
 * - persistSession: تُحفظ الجلسة في localStorage فتبقى بعد إغلاق المتصفح.
 * - autoRefreshToken: يجدد التوكن تلقائيًا فيبقى الحساب مفتوحًا لأيام.
 * - flowType "implicit": رابط الإيميل يعمل حتى لو فُتح من متصفح مختلف عن الذي طُلب منه
 *   (مهم على الجوال حين يفتح تطبيق Gmail الرابط داخل متصفحه الداخلي).
 */
export const supabase: SupabaseClient | null = hasSupabase
  ? createClient(url as string, anon as string, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
        flowType: "implicit",
        storageKey: "java-arabi-auth",
      },
    })
  : null;

/** زر الفيسبوك جاهز لكنه يُفعَّل بمتغير بيئة بعد إعداد تطبيق فيسبوك. */
export const facebookEnabled = process.env.NEXT_PUBLIC_ENABLE_FACEBOOK === "true";
