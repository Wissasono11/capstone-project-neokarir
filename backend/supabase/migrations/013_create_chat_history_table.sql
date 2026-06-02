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
