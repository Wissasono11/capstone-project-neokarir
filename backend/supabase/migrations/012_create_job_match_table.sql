create table if not exists public.job_match (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users (id) on delete cascade,
  job_id uuid references public.jobs (id) on delete set null,
  match_score numeric(5,2) not null default 0,
  matched_skills text[] not null default '{}'::text[],
  missing_skills text[] not null default '{}'::text[],
  explanation text,
  analysis jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists job_match_user_id_idx on public.job_match (user_id);

drop trigger if exists job_match_set_updated_at on public.job_match;
create trigger job_match_set_updated_at
before update on public.job_match
for each row
execute function public.set_updated_at();
