create table if not exists public.portfolio_comments (
  id uuid primary key default gen_random_uuid(),
  route text not null,
  x_percent double precision not null check (x_percent >= 0 and x_percent <= 100),
  y_percent double precision not null check (y_percent >= 0 and y_percent <= 100),
  selector text,
  author_name text not null,
  author_email text,
  body text not null check (char_length(body) <= 2000),
  status text not null default 'pending' check (status in ('open', 'pending', 'hidden')),
  created_at timestamptz not null default now()
);

create index if not exists portfolio_comments_route_created_at_idx
  on public.portfolio_comments (route, created_at);

alter table public.portfolio_comments enable row level security;

create policy "Read visible portfolio comments"
  on public.portfolio_comments
  for select
  using (status = 'open');

create policy "Create portfolio comments"
  on public.portfolio_comments
  for insert
  with check (status = 'pending');

-- Approve from the dashboard SQL editor:
-- update public.portfolio_comments set status = 'open' where id = '<id>';
