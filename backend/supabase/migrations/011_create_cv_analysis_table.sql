create table if not exists public.cv_analysis (
  id uuid primary key default gen_random_uuid(),
  cv_id uuid not null references public.cvs (user_id) on delete cascade,
  user_id uuid not null references public.users (id) on delete cascade,
  score numeric(5,2) not null default 0,
  strengths text[] not null default '{}'::text[],
  weaknesses text[] not null default '{}'::text[],
  suggestions text[] not null default '{}'::text[],
  analysis jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists cv_analysis_user_id_idx on public.cv_analysis (user_id);
create index if not exists cv_analysis_cv_id_idx on public.cv_analysis (cv_id);
