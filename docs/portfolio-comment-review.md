# Portfolio Comment Review

Visitors can pin feedback anywhere on a page from the Figma panel. Every public submission is stored as `pending`, so it is not visible to anyone else until it is approved.

## Review in Supabase

1. Open **Supabase -> Table Editor -> portfolio_comments**.
2. Filter the `status` column to `pending`.
3. Read the route, author, email, and note.
4. Change `status` to `open` to publish it, or `hidden` to reject it.

The page only reads rows where `status = 'open'`. Pending and hidden notes are never returned to visitors.

## SQL alternative

```sql
-- Review newest unapproved notes.
select id, route, author_name, author_email, body, created_at
from public.portfolio_comments
where status = 'pending'
order by created_at desc;

-- Publish a reviewed note.
update public.portfolio_comments
set status = 'open'
where id = '<comment-id>';

-- Reject a note without deleting the review record.
update public.portfolio_comments
set status = 'hidden'
where id = '<comment-id>';
```
