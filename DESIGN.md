# Cold Experiment Design Notes

## Direction
Editorial technical portfolio with measured spacing, quiet proof, and precise interaction chrome. The system should feel like a portfolio that has been designed by someone who also understands implementation constraints.

## Layout
- Mobile-first, then scale up to tablet and desktop.
- Use stable grids and aspect ratios for project cards. Home archive cards should align at the top and use consistent gutters.
- Keep body text under 75 characters per line.
- Floating controls must respect safe areas and leave enough bottom padding on content they overlap.

## Interaction
- Loader: short pixel/ruler reveal, content released quickly, reduced-motion path skips motion.
- Cards: no text overflow, no unreadable titles over busy images, no layout shift on image load.
- Request-access projects: show public preview and safe summary first, then inline request form.
- Chrome: nav, agent, hand tracker, Figma grid, work bottom nav, and case-study bottom nav must have predictable z-index and responsive visibility.

## Performance
- Keep heavy interactive features lazy.
- Avoid waiting for `window.load` to show content.
- Compress only visible high-impact assets first.
- Prefer CSS containment and stable dimensions for long lists.
