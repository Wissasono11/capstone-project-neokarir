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
