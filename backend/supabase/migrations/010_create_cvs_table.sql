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
