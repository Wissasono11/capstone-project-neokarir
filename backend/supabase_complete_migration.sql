-- ==========================================================
-- NEOKARIR COMPLETE SUPABASE MIGRATION SCRIPT
-- Generated on 2026-05-27T14:37:24.017Z
-- ==========================================================

-- ----------------------------------------------------------
-- MIGRATION: 001_enable_extensions.sql
-- ----------------------------------------------------------
create extension if not exists pgcrypto;
create extension if not exists citext;
create extension if not exists vector;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;


-- ----------------------------------------------------------
-- MIGRATION: 002_create_users_table.sql
-- ----------------------------------------------------------
create table if not exists public.users (
  id uuid primary key references auth.users (id) on delete cascade,
  email citext not null unique,
  role text not null default 'user' check (role in ('user', 'admin', 'mentor')),
  full_name text,
  avatar_url text,
  phone text,
  location text,
  raw_user_meta jsonb not null default '{}'::jsonb,
  app_metadata jsonb not null default '{}'::jsonb,
  user_metadata jsonb not null default '{}'::jsonb,
  last_sign_in_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists users_role_idx on public.users (role);
create index if not exists users_email_idx on public.users (email);

drop trigger if exists users_set_updated_at on public.users;
create trigger users_set_updated_at
before update on public.users
for each row
execute function public.set_updated_at();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.users (
    id,
    email,
    role,
    full_name,
    avatar_url,
    phone,
    location,
    raw_user_meta,
    app_metadata,
    user_metadata,
    last_sign_in_at
  )
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'role', 'user'),
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name'),
    new.raw_user_meta_data->>'avatar_url',
    new.raw_user_meta_data->>'phone',
    new.raw_user_meta_data->>'location',
    coalesce(new.raw_user_meta_data, '{}'::jsonb),
    coalesce(new.raw_app_meta_data, '{}'::jsonb),
    coalesce(new.raw_user_meta_data, '{}'::jsonb),
    new.last_sign_in_at
  )
  on conflict (id) do update set
    email = excluded.email,
    role = excluded.role,
    full_name = excluded.full_name,
    avatar_url = excluded.avatar_url,
    phone = excluded.phone,
    location = excluded.location,
    raw_user_meta = excluded.raw_user_meta,
    app_metadata = excluded.app_metadata,
    user_metadata = excluded.user_metadata,
    last_sign_in_at = excluded.last_sign_in_at,
    updated_at = now();

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row
execute function public.handle_new_user();


-- ----------------------------------------------------------
-- MIGRATION: 003_create_profiles_table.sql
-- ----------------------------------------------------------
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


-- ----------------------------------------------------------
-- MIGRATION: 004_create_skills_table.sql
-- ----------------------------------------------------------
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


-- ----------------------------------------------------------
-- MIGRATION: 005_create_user_skills_table.sql
-- ----------------------------------------------------------
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


-- ----------------------------------------------------------
-- MIGRATION: 006_create_jobs_table.sql
-- ----------------------------------------------------------
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


-- ----------------------------------------------------------
-- MIGRATION: 007_create_job_skills_table.sql
-- ----------------------------------------------------------
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


-- ----------------------------------------------------------
-- MIGRATION: 008_create_recommendations_table.sql
-- ----------------------------------------------------------
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


-- ----------------------------------------------------------
-- MIGRATION: 009_create_skill_gap_table.sql
-- ----------------------------------------------------------
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


-- ----------------------------------------------------------
-- MIGRATION: 010_create_cvs_table.sql
-- ----------------------------------------------------------
create table if not exists public.cvs (
  user_id uuid primary key references public.users (id) on delete cascade,
  file_name text,
  file_path text,
  mime_type text,
  size bigint,
  storage_bucket text,
  storage_object_path text,
  file_url text,
  parsed_text text,
  summary text,
  cv_data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists cvs_set_updated_at on public.cvs;
create trigger cvs_set_updated_at
before update on public.cvs
for each row
execute function public.set_updated_at();


-- ----------------------------------------------------------
-- MIGRATION: 011_create_cv_analysis_table.sql
-- ----------------------------------------------------------
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


-- ----------------------------------------------------------
-- MIGRATION: 012_create_job_match_table.sql
-- ----------------------------------------------------------
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


-- ----------------------------------------------------------
-- MIGRATION: 013_create_chat_history_table.sql
-- ----------------------------------------------------------
create table if not exists public.chats (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users (id) on delete cascade,
  title text not null default 'New Chat',
  summary text,
  messages jsonb not null default '[]'::jsonb,
  chat_data jsonb not null default '{}'::jsonb,
  last_message_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists chats_user_id_updated_at_idx
  on public.chats (user_id, updated_at desc);

drop trigger if exists chats_set_updated_at on public.chats;
create trigger chats_set_updated_at
before update on public.chats
for each row
execute function public.set_updated_at();

create or replace view public.chat_history as
select * from public.chats;


-- ----------------------------------------------------------
-- MIGRATION: 014_create_learning_roadmaps.sql
-- ----------------------------------------------------------
create table if not exists public.learning_roadmaps (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users (id) on delete cascade,
  title text not null,
  target_role text,
  current_level text,
  status text not null default 'draft' check (status in ('draft', 'active', 'completed', 'archived')),
  roadmap jsonb not null default '[]'::jsonb,
  roadmap_data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists learning_roadmaps_user_id_idx on public.learning_roadmaps (user_id);

drop trigger if exists learning_roadmaps_set_updated_at on public.learning_roadmaps;
create trigger learning_roadmaps_set_updated_at
before update on public.learning_roadmaps
for each row
execute function public.set_updated_at();


-- ----------------------------------------------------------
-- MIGRATION: 015_create_job_market_trends.sql
-- ----------------------------------------------------------
create table if not exists public.market (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  company_name text,
  company_url text,
  location text,
  category text,
  trend_date date not null default current_date,
  job_count integer not null default 0,
  growth_rate numeric(6,2),
  avg_salary numeric(14,2),
  salary_currency text not null default 'IDR',
  description text,
  market_data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists market_trend_date_idx on public.market (trend_date);
create index if not exists market_category_idx on public.market (category);

drop trigger if exists market_set_updated_at on public.market;
create trigger market_set_updated_at
before update on public.market
for each row
execute function public.set_updated_at();

create or replace view public.job_market_trends as
select * from public.market;


-- ----------------------------------------------------------
-- MIGRATION: 016_create_embeddings_table.sql
-- ----------------------------------------------------------
create table if not exists public.embeddings (
  id uuid primary key default gen_random_uuid(),
  entity_type text not null,
  entity_id uuid not null,
  content text not null,
  content_hash text,
  model text,
  chunk_index integer not null default 0,
  embedding vector(1536) not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  unique (entity_type, entity_id, chunk_index)
);

create index if not exists embeddings_entity_idx on public.embeddings (entity_type, entity_id);
create index if not exists embeddings_content_hash_idx on public.embeddings (content_hash);
create index if not exists embeddings_vector_idx
  on public.embeddings using ivfflat (embedding vector_cosine_ops)
  with (lists = 100);


-- ----------------------------------------------------------
-- MIGRATION: 017_create_rls_policies.sql
-- ----------------------------------------------------------
alter table public.users enable row level security;
alter table public.profiles enable row level security;
alter table public.skills enable row level security;
alter table public.user_skills enable row level security;
alter table public.jobs enable row level security;
alter table public.job_skills enable row level security;
alter table public.recommendations enable row level security;
alter table public.skill_gap enable row level security;
alter table public.cvs enable row level security;
alter table public.cv_analysis enable row level security;
alter table public.job_match enable row level security;
alter table public.chats enable row level security;
alter table public.learning_roadmaps enable row level security;
alter table public.market enable row level security;
alter table public.embeddings enable row level security;

drop policy if exists users_select_own on public.users;
create policy users_select_own
on public.users
for select
to authenticated
using (auth.uid() = id);

drop policy if exists users_update_own on public.users;
create policy users_update_own
on public.users
for update
to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);

drop policy if exists profiles_select_own on public.profiles;
create policy profiles_select_own
on public.profiles
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists profiles_insert_own on public.profiles;
create policy profiles_insert_own
on public.profiles
for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists profiles_update_own on public.profiles;
create policy profiles_update_own
on public.profiles
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists profiles_delete_own on public.profiles;
create policy profiles_delete_own
on public.profiles
for delete
to authenticated
using (auth.uid() = user_id);

drop policy if exists skills_select_public on public.skills;
create policy skills_select_public
on public.skills
for select
to anon, authenticated
using (true);

drop policy if exists user_skills_select_own on public.user_skills;
create policy user_skills_select_own
on public.user_skills
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists user_skills_write_own on public.user_skills;
create policy user_skills_write_own
on public.user_skills
for all
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists jobs_select_public on public.jobs;
create policy jobs_select_public
on public.jobs
for select
to anon, authenticated
using (true);

drop policy if exists job_skills_select_public on public.job_skills;
create policy job_skills_select_public
on public.job_skills
for select
to anon, authenticated
using (true);

drop policy if exists recommendations_select_own on public.recommendations;
create policy recommendations_select_own
on public.recommendations
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists recommendations_write_own on public.recommendations;
create policy recommendations_write_own
on public.recommendations
for all
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists skill_gap_select_own on public.skill_gap;
create policy skill_gap_select_own
on public.skill_gap
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists skill_gap_write_own on public.skill_gap;
create policy skill_gap_write_own
on public.skill_gap
for all
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists cvs_select_own on public.cvs;
create policy cvs_select_own
on public.cvs
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists cvs_write_own on public.cvs;
create policy cvs_write_own
on public.cvs
for all
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists cv_analysis_select_own on public.cv_analysis;
create policy cv_analysis_select_own
on public.cv_analysis
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists cv_analysis_write_own on public.cv_analysis;
create policy cv_analysis_write_own
on public.cv_analysis
for all
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists job_match_select_own on public.job_match;
create policy job_match_select_own
on public.job_match
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists job_match_write_own on public.job_match;
create policy job_match_write_own
on public.job_match
for all
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists chats_select_own on public.chats;
create policy chats_select_own
on public.chats
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists chats_write_own on public.chats;
create policy chats_write_own
on public.chats
for all
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists learning_roadmaps_select_own on public.learning_roadmaps;
create policy learning_roadmaps_select_own
on public.learning_roadmaps
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists learning_roadmaps_write_own on public.learning_roadmaps;
create policy learning_roadmaps_write_own
on public.learning_roadmaps
for all
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists market_select_public on public.market;
create policy market_select_public
on public.market
for select
to anon, authenticated
using (true);


-- ----------------------------------------------------------
-- MIGRATION: 018_create_storage_bucket.sql
-- ----------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('cv-files', 'cv-files', false)
on conflict (id) do update set
  name = excluded.name,
  public = excluded.public;

drop policy if exists cv_files_select_own on storage.objects;
create policy cv_files_select_own
on storage.objects
for select
to authenticated
using (bucket_id = 'cv-files' and name like auth.uid()::text || '/%');

drop policy if exists cv_files_insert_own on storage.objects;
create policy cv_files_insert_own
on storage.objects
for insert
to authenticated
with check (bucket_id = 'cv-files' and name like auth.uid()::text || '/%');

drop policy if exists cv_files_update_own on storage.objects;
create policy cv_files_update_own
on storage.objects
for update
to authenticated
using (bucket_id = 'cv-files' and name like auth.uid()::text || '/%')
with check (bucket_id = 'cv-files' and name like auth.uid()::text || '/%');

drop policy if exists cv_files_delete_own on storage.objects;
create policy cv_files_delete_own
on storage.objects
for delete
to authenticated
using (bucket_id = 'cv-files' and name like auth.uid()::text || '/%');


