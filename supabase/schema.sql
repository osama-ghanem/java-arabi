-- =====================================================================
-- Java بالعربي — شغّل هذا الملف كاملًا مرة واحدة:
-- Supabase → SQL Editor → New query → الصق → Run
-- (آمن لإعادة التشغيل أكثر من مرة)
-- =====================================================================

-- 1) تقدم الطالب ونقاطه ونجومه
create table if not exists public.progress (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  data       jsonb       not null default '{}'::jsonb,
  points     integer     not null default 0,
  stars      integer     not null default 0,
  updated_at timestamptz not null default now()
);

alter table public.progress enable row level security;

drop policy if exists "progress_select_own" on public.progress;
drop policy if exists "progress_insert_own" on public.progress;
drop policy if exists "progress_update_own" on public.progress;

create policy "progress_select_own" on public.progress
  for select using (auth.uid() = user_id);
create policy "progress_insert_own" on public.progress
  for insert with check (auth.uid() = user_id);
create policy "progress_update_own" on public.progress
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- 2) عدّاد أسئلة "المعلم AI" اليومي (لحماية رصيد الذكاء الاصطناعي)
create table if not exists public.ai_usage (
  user_id uuid not null references auth.users (id) on delete cascade,
  day     date not null default current_date,
  count   integer not null default 0,
  primary key (user_id, day)
);

alter table public.ai_usage enable row level security;

drop policy if exists "ai_usage_select_own" on public.ai_usage;
drop policy if exists "ai_usage_insert_own" on public.ai_usage;
drop policy if exists "ai_usage_update_own" on public.ai_usage;

create policy "ai_usage_select_own" on public.ai_usage
  for select using (auth.uid() = user_id);
create policy "ai_usage_insert_own" on public.ai_usage
  for insert with check (auth.uid() = user_id);
create policy "ai_usage_update_own" on public.ai_usage
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
