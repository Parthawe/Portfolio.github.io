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

## Notes page

`/notes` replaces the footer pin canvas with a readable visitor wall. The footer links to it; `/guestbook` redirects to it. Notes still use the `/guestbook` database route and `footer-guestbook` selector, preserving existing entries without migration. Page-specific Figma feedback stays on its own route.

The form collects an optional display name and a note of up to 240 characters, with no email. Database submissions remain pending until reviewed. The submitting visitor sees their new pending note for the current page session, labeled as visible only to them. A reload reads approved notes only. Without Supabase configuration, notes are stored only in that browser; the page labels this preview mode.

Local previews without Supabase show eight fictional sample notes by default. Each is labeled Sample and can be hidden. They are rendered from `src/data/sampleNotes.ts`, never saved in the comment store, never submitted to Supabase, and never shown on a public hostname or a configured database preview.
