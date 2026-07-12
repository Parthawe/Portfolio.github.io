-- Run this after the initial portfolio_comments table migration.
-- Anonymous visitors can submit a note, but only approved notes appear publicly.

alter table public.portfolio_comments
  drop constraint if exists portfolio_comments_status_check;

alter table public.portfolio_comments
  add constraint portfolio_comments_status_check
  check (status in ('open', 'pending', 'hidden'));

alter table public.portfolio_comments
  alter column status set default 'pending';

drop policy if exists "Create portfolio comments" on public.portfolio_comments;
create policy "Create portfolio comments"
  on public.portfolio_comments
  for insert
  with check (status = 'pending');

-- Approve a comment from the Supabase SQL editor:
-- update public.portfolio_comments set status = 'open' where id = '<id>';
-- Hide a comment:
-- update public.portfolio_comments set status = 'hidden' where id = '<id>';
