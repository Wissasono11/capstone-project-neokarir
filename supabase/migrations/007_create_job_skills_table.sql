create table if not exists public.job_skills (
  job_id uuid not null references public.jobs (id) on delete cascade,
  skill_id uuid not null references public.skills (id) on delete cascade,
  importance smallint not null default 1 check (importance between 1 and 5),
  is_required boolean not null default true,
  notes text,
  created_at timestamptz not null default now(),
  primary key (job_id, skill_id)
);

create index if not exists job_skills_skill_id_idx on public.job_skills (skill_id);
