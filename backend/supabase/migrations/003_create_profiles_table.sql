create table if not exists public.profiles (
  user_id uuid primary key references public.users (id) on delete cascade,
  full_name text,
  headline text,
  bio text,
  summary text,
  "current_role" text,
  target_role text,
  years_experience numeric(4,1),
  location text,
  phone text,
  email text,
  website_url text,
  linkedin_url text,
  github_url text,
  portfolio_url text,
  avatar_url text,
  education_level text,
  employment_status text,
  work_mode text,
  availability text,
  resume_url text,
  skills_summary text,
  profile_data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists profiles_current_role_idx on public.profiles ("current_role");

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
before update on public.profiles
for each row
execute function public.set_updated_at();
