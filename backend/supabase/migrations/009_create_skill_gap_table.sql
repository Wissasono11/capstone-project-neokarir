create table if not exists public.skill_gap (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users (id) on delete cascade,
  job_id uuid references public.jobs (id) on delete set null,
  target_role text,
  gap_score numeric(5,2) not null default 0,
  matched_skills text[] not null default '{}'::text[],
  missing_skills text[] not null default '{}'::text[],
  recommended_skills text[] not null default '{}'::text[],
  analysis jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, job_id)
);

create index if not exists skill_gap_user_id_idx on public.skill_gap (user_id);

drop trigger if exists skill_gap_set_updated_at on public.skill_gap;
create trigger skill_gap_set_updated_at
before update on public.skill_gap
for each row
execute function public.set_updated_at();
