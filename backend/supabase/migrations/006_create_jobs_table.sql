create table if not exists public.jobs (
  id uuid primary key default gen_random_uuid(),
  source text,
  external_id text,
  title text not null,
  company_name text,
  company_url text,
  location text,
  remote_type text,
  employment_type text,
  experience_level text,
  salary_min numeric(14,2),
  salary_max numeric(14,2),
  salary_currency text not null default 'IDR',
  description text,
  requirements text,
  responsibilities text,
  tags text[] not null default '{}'::text[],
  url text,
  posted_at timestamptz,
  expires_at timestamptz,
  is_active boolean not null default true,
  job_data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists jobs_title_idx on public.jobs (title);
create index if not exists jobs_company_name_idx on public.jobs (company_name);
create index if not exists jobs_location_idx on public.jobs (location);
create index if not exists jobs_is_active_idx on public.jobs (is_active);
create unique index if not exists jobs_source_external_id_uq
  on public.jobs (source, external_id)
  where source is not null and external_id is not null;

drop trigger if exists jobs_set_updated_at on public.jobs;
create trigger jobs_set_updated_at
before update on public.jobs
for each row
execute function public.set_updated_at();
