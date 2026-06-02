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
