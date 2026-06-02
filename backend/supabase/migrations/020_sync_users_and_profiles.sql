-- Migration: Sync between auth.users, public.users, and public.profiles

-- 1. Sync auth.users updates to public.users
create or replace function public.handle_auth_user_update()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.users
  set
    email = new.email,
    role = coalesce(new.raw_user_meta_data->>'role', public.users.role),
    full_name = coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', public.users.full_name),
    avatar_url = coalesce(new.raw_user_meta_data->>'avatar_url', public.users.avatar_url),
    phone = coalesce(new.raw_user_meta_data->>'phone', public.users.phone),
    location = coalesce(new.raw_user_meta_data->>'location', public.users.location),
    raw_user_meta = coalesce(new.raw_user_meta_data, public.users.raw_user_meta),
    app_metadata = coalesce(new.raw_app_meta_data, public.users.app_metadata),
    user_metadata = coalesce(new.raw_user_meta_data, public.users.user_metadata),
    last_sign_in_at = new.last_sign_in_at,
    updated_at = now()
  where id = new.id;
  return new;
end;
$$;

drop trigger if exists on_auth_user_updated on auth.users;
create trigger on_auth_user_updated
after update on auth.users
for each row
execute function public.handle_auth_user_update();

-- 2. Sync public.users to public.profiles
create or replace function public.sync_user_to_profile()
returns trigger
language plpgsql
security definer
as $$
begin
  -- Prevent infinite recursion
  if pg_trigger_depth() > 1 then
    return new;
  end if;

  update public.profiles
  set
    full_name = new.full_name,
    email = new.email,
    phone = new.phone,
    location = new.location,
    avatar_url = new.avatar_url,
    updated_at = now()
  where user_id = new.id;

  return new;
end;
$$;

drop trigger if exists on_user_updated_sync_profile on public.users;
create trigger on_user_updated_sync_profile
after update of full_name, email, phone, location, avatar_url on public.users
for each row
when (old.full_name is distinct from new.full_name or
      old.email is distinct from new.email or
      old.phone is distinct from new.phone or
      old.location is distinct from new.location or
      old.avatar_url is distinct from new.avatar_url)
execute function public.sync_user_to_profile();

-- 3. Sync public.profiles to public.users
create or replace function public.sync_profile_to_user()
returns trigger
language plpgsql
security definer
as $$
begin
  -- Prevent infinite recursion
  if pg_trigger_depth() > 1 then
    return new;
  end if;

  update public.users
  set
    full_name = new.full_name,
    email = new.email,
    phone = new.phone,
    location = new.location,
    avatar_url = new.avatar_url,
    updated_at = now()
  where id = new.user_id;

  return new;
end;
$$;

drop trigger if exists on_profile_updated_sync_user on public.profiles;
create trigger on_profile_updated_sync_user
after update of full_name, email, phone, location, avatar_url on public.profiles
for each row
when (old.full_name is distinct from new.full_name or
      old.email is distinct from new.email or
      old.phone is distinct from new.phone or
      old.location is distinct from new.location or
      old.avatar_url is distinct from new.avatar_url)
execute function public.sync_profile_to_user();
