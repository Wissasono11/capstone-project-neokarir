create table if not exists public.skills (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug citext unique,
  category text,
  description text,
  source text,
  is_active boolean not null default true,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists skills_category_idx on public.skills (category);

drop trigger if exists skills_set_updated_at on public.skills;
create trigger skills_set_updated_at
before update on public.skills
for each row
execute function public.set_updated_at();
