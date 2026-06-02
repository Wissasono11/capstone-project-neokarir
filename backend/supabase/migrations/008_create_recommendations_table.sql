create table if not exists public.recommendations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users (id) on delete cascade,
  job_id uuid references public.jobs (id) on delete set null,
  recommendation_type text not null default 'job',
  title text not null,
  description text,
  reason text,
  score numeric(5,2) not null default 0,
  matched_skills text[] not null default '{}'::text[],
  missing_skills text[] not null default '{}'::text[],
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists recommendations_user_id_created_at_idx
  on public.recommendations (user_id, created_at desc);

drop trigger if exists recommendations_set_updated_at on public.recommendations;
create trigger recommendations_set_updated_at
before update on public.recommendations
for each row
execute function public.set_updated_at();
