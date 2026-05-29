-- Add password_hash column to users table
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS password_hash VARCHAR(255);

-- Update the handle_new_user trigger function to include password_hash
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.users (
    id,
    email,
    role,
    full_name,
    avatar_url,
    phone,
    location,
    password_hash,
    raw_user_meta,
    app_metadata,
    user_metadata,
    last_sign_in_at
  )
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'role', 'user'),
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name'),
    NEW.raw_user_meta_data->>'avatar_url',
    NEW.raw_user_meta_data->>'phone',
    NEW.raw_user_meta_data->>'location',
    NEW.raw_user_meta_data->>'password_hash',
    COALESCE(NEW.raw_user_meta_data, '{}'::jsonb),
    COALESCE(NEW.raw_app_meta_data, '{}'::jsonb),
    COALESCE(NEW.raw_user_meta_data, '{}'::jsonb),
    NEW.last_sign_in_at
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    role = EXCLUDED.role,
    full_name = EXCLUDED.full_name,
    avatar_url = EXCLUDED.avatar_url,
    phone = EXCLUDED.phone,
    location = EXCLUDED.location,
    password_hash = COALESCE(EXCLUDED.password_hash, public.users.password_hash),
    raw_user_meta = EXCLUDED.raw_user_meta,
    app_metadata = EXCLUDED.app_metadata,
    user_metadata = EXCLUDED.user_metadata,
    last_sign_in_at = EXCLUDED.last_sign_in_at,
    updated_at = now();

  RETURN NEW;
END;
$$;
