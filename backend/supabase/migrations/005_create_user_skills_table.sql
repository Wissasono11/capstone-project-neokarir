create table if not exists public.user_skills (
  user_id uuid not null references public.users (id) on delete cascade,
  skill_id uuid not null references public.skills (id) on delete cascade,
  proficiency_level smallint not null default 1 check (proficiency_level between 1 and 5),
  years_experience numeric(4,1),
  is_primary boolean not null default false,
  source text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (user_id, skill_id)
);

create index if not exists user_skills_skill_id_idx on public.user_skills (skill_id);

drop trigger if exists user_skills_set_updated_at on public.user_skills;
create trigger user_skills_set_updated_at
before update on public.user_skills
for each row
execute function public.set_updated_at();
