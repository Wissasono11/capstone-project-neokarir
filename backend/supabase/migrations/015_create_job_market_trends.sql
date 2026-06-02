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
