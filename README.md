# Java بالعربي

منصة عربية لتعلّم Java: 10 وحدات و60 درسًا، معلم AI، نقاط ونجوم وشهادات.
Next.js + TypeScript + Tailwind + Supabase.

## النشر من الجوال (GitHub ← Vercel)

### 1) Supabase (قاعدة البيانات والدخول)
1. ادخل supabase.com وأنشئ مشروعًا جديدًا (New project).
2. من القائمة: **SQL Editor** ← New query ← الصق محتوى ملف `supabase/schema.sql` كاملًا ← **Run**.
3. من **Project Settings ← API** انسخ: `Project URL` و `anon public key`.

### 2) رفع المشروع إلى GitHub
المشروع على حسابك في مستودع `java-arabi`. إن لم يكن موجودًا فارفع الملفات عبر GitHub (Add file ← Upload files) أو أعد إرسال الكود لي.

### 3) Vercel
1. ادخل vercel.com وسجّل بحساب GitHub.
2. **Add New ← Project** ← اختر مستودع `java-arabi` ← **Import**.
3. في **Environment Variables** أضف:
   - `NEXT_PUBLIC_SUPABASE_URL` = رابط المشروع
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = المفتاح
   - `ANTHROPIC_API_KEY` = مفتاح الذكاء الاصطناعي (للمعلم AI)
4. اضغط **Deploy** وانتظر دقيقتين، يظهر لك الرابط `https://....vercel.app`.

### 4) خطوة مهمة بعد أول نشر (لرابط الإيميل)
في Supabase: **Authentication ← URL Configuration**:
- **Site URL** = رابط موقعك على Vercel
- **Redirect URLs** أضف: `https://رابطك.vercel.app/**`

### 5) تفعيل فيسبوك لاحقًا
1. developers.facebook.com ← Create App ← أضف منتج **Facebook Login**.
2. في Supabase: **Authentication ← Providers ← Facebook** ← فعّله والصق App ID وSecret، وانسخ Callback URL وضعه في إعدادات تطبيق فيسبوك (Valid OAuth Redirect URIs).
3. في Vercel أضف `NEXT_PUBLIC_ENABLE_FACEBOOK=true` ثم أعد النشر.

## ملاحظات
- الجلسة دائمة: الطالب يدخل مرة واحدة ويبقى حسابه مفتوحًا (التوكن يتجدد تلقائيًا).
- المعلم AI يتطلب تسجيل دخول وله حد 40 سؤالًا يوميًا لكل طالب.
- "تجربة الكود" محاكي مبسّط؛ ليست تشغيل Java حقيقيًا.
- رابط الإيميل الافتراضي من Supabase محدود بعدد رسائل في الساعة؛ للإنتاج أضف SMTP خاصًا من Authentication ← SMTP.
