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
