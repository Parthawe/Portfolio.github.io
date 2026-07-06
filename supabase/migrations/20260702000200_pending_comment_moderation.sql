-- Moderation: new comments land as 'pending' and only appear publicly
-- after being approved (status set to 'open') in the Supabase dashboard.

alter table public.portfolio_comments
  drop constraint if exists portfolio_comments_status_check;

alter table public.portfolio_comments
  add constraint portfolio_comments_status_check
  check (status in ('open', 'pending', 'hidden'));

alter table public.portfolio_comments
  alter column status set default 'pending';

-- Anonymous visitors may only create pending comments; they cannot
-- self-publish. Reads stay restricted to approved rows, and with no
-- update/delete policies the anon role cannot modify or remove anything.
drop policy if exists "Create portfolio comments" on public.portfolio_comments;
create policy "Create portfolio comments"
  on public.portfolio_comments
  for insert
  with check (status = 'pending');

-- To approve from the dashboard SQL editor:
--   update public.portfolio_comments set status = 'open' where id = '<id>';
-- To reject:
--   update public.portfolio_comments set status = 'hidden' where id = '<id>';
