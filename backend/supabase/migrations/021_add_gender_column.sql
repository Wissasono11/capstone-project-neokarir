-- Add gender column to public.users and public.profiles
alter table public.users add column if not exists gender text;
alter table public.profiles add column if not exists gender text;

-- 1. Sync public.users to public.profiles (updated with gender)
create or replace function public.sync_user_to_profile()
returns trigger
language plpgsql
security definer
as $$
begin
  if pg_trigger_depth() > 1 then return new; end if;

  update public.profiles
  set
    full_name = new.full_name, 
    email = new.email, 
    phone = new.phone,
    location = new.location, 
    avatar_url = new.avatar_url, 
    gender = new.gender,
    updated_at = now()
  where user_id = new.id;
  
  return new;
end;
$$;

drop trigger if exists on_user_updated_sync_profile on public.users;
create trigger on_user_updated_sync_profile
after update of full_name, email, phone, location, avatar_url, gender on public.users
for each row
when (old.full_name is distinct from new.full_name or 
      old.email is distinct from new.email or 
      old.phone is distinct from new.phone or 
      old.location is distinct from new.location or 
      old.avatar_url is distinct from new.avatar_url or
      old.gender is distinct from new.gender)
execute function public.sync_user_to_profile();

-- 2. Sync public.profiles to public.users (updated with gender)
create or replace function public.sync_profile_to_user()
returns trigger
language plpgsql
security definer
as $$
begin
  if pg_trigger_depth() > 1 then return new; end if;

  update public.users
  set
    full_name = new.full_name, 
    email = new.email, 
    phone = new.phone,
    location = new.location, 
    avatar_url = new.avatar_url, 
    gender = new.gender,
    updated_at = now()
  where id = new.user_id;
  
  return new;
end;
$$;

drop trigger if exists on_profile_updated_sync_user on public.profiles;
create trigger on_profile_updated_sync_user
after update of full_name, email, phone, location, avatar_url, gender on public.profiles
for each row
when (old.full_name is distinct from new.full_name or 
      old.email is distinct from new.email or 
      old.phone is distinct from new.phone or 
      old.location is distinct from new.location or 
      old.avatar_url is distinct from new.avatar_url or
      old.gender is distinct from new.gender)
execute function public.sync_profile_to_user();
