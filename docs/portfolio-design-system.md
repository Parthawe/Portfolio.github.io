# Portfolio Design System

This document turns the current portfolio style into a maintainable system. The goal is not to make every project identical. The goal is to make every page feel like the same designer made it: same chrome, same reading rhythm, same proof structure, same access rules, and controlled variation only where the project story needs it.

## System Position

The portfolio is an editorial technical portfolio for recruiters, founders, and creative technology peers. It should feel precise, proof-led, and built by someone who understands implementation constraints.

The visual language is:
- Light editorial canvas with optional dark mode.
- Figma/ruler chrome as subtle interface language.
- Serif display type for major project/title moments.
- Mono labels for metadata, navigation, and proof captions.
- Dense but readable product proof, not marketing filler.
- Project-specific color only as a quiet accent, never a full page reset.

## Source Of Truth

Use these files as the system spine:
- `src/styles/tokens.css`: color, typography, spacing, radius, z-index, glass, motion.
- `src/styles/base.css`: shared primitives such as `.wrap`, `.surface-glass`, `.mono-label`, `.pill-link`, focus states, reveal states.
- `src/styles/nav.css`: persistent navigation and chrome controls.
- `src/styles/work-page.css`: listing/card grammar and work mode layouts.
- `src/styles/case-study.css`: project page shell, case-study components, bottom nav, media framing, mobile consistency.
- `src/styles/nda-gate.css`: request-access pattern.
- `src/components/case-study/*`: reusable case-study blocks.
- `src/data/projects.ts`: project metadata, access model, summaries, routing, cards.

## Route Grammar

### Home

Home should answer four questions quickly:
- What does Parth do?
- What is the strongest proof?
- What range does the portfolio cover?
- How do I reach him?

Home can be more expressive than case studies, but it must still use the same tokens, card grammar, and chrome spacing.

### Work

Work is the recruiter index. It should remain fast to scan. Do not add another visual language here unless it becomes a reusable pattern across all work views.

Required:
- View switch stays compact and non-overlapping.
- Bottom filter nav never covers project content.
- Project cards use stable aspect ratios and readable overlay text.
- Request-access cards say "Quick glimpse" and never feel locked or blocked.

Work-page local tokens live in `src/styles/work-page.css` under `.page-work`.
Use these tokens before adding new view-specific values:
- `--work-card-radius`: image cards and media frames.
- `--work-panel-radius`: playlist, index, timeline, and filter panels.
- `--work-control-radius`: pills, tabs, category filters, and metadata chips.
- `--work-rule` and `--work-rule-strong`: default and hover/focus borders.
- `--work-panel-bg` and `--work-panel-bg-hover`: all Work list rows and panels.
- `--work-label` and `--work-label-active`: inactive and active control text.
- `--work-row-min`, `--work-row-gap`, and `--work-control-min`: stable scan rhythm.

Work typography:
- Serif: page title, project titles, timeline feature titles, selected card names.
- Sans: body copy, summaries, row names when they need dense scanning.
- Mono: counts, categories, years, NDA labels, view controls, and section markers.

Work interaction:
- Anything clickable must have a visible control shape before hover.
- Active controls use the same inset pill treatment across editorial, playlist, index, and arc.
- Focus states use `--work-focus` and must not be hidden behind glass or overlays.
- Card text sits on a persistent readability gradient, not hover-only contrast.

### Category Pages

Category pages are collection landing pages. They should use the registry as source of truth and show visible projects from that category. They should not hand-maintain stale project visibility.

Required:
- One hero.
- Featured project first.
- More projects from registry fallback.
- Same `ProjectCard` grammar as Work/Home.
- Same CTA pattern at the end.

### Public Case Studies

Every public case study should use this order unless the project has a strong reason to differ:
1. `Nav`
2. `ProjectHeader`
3. `ProjectQuickSummary` for flagship or selected work when enough data exists
4. Early proof media in fold two or three when the project has video, playable, or interactive work
5. Context and challenge
6. Process and decisions
7. Outcome and proof
8. Reflection
9. Credits or `CsThanks`
10. `BottomNav`
11. `NextProject`
12. `Footer`

### Request-Access Case Studies

Request-access projects should show a safe public story first, then request access.

Required:
- `ProjectHeader` with `showHeaderSummary={false}` unless summary is fully public.
- `NdaPublicStory`.
- `NdaGate`.
- `BottomNav` with `placement="side"` on desktop, Glimpse and Access sections, and any request/live-site actions in the same vertical rail.
- `NextProject` should go to another safe page or safe preview.

Private details must not ship in the static bundle.

## Component Rules

Use shared case-study components before writing custom markup:
- `CsSection`: standard section label/title/content grid.
- `CsBody`: long-form text width and rhythm.
- `CsImage`: framed image with caption.
- `CsMediaSpotlight`: early video/interactive proof.
- `CsStatGrid`: metrics and proof.
- `CsFeatureGrid`: capability or feature cards.
- `CsSteps` and `CsProcessFlow`: process.
- `CsCallout`: one strong insight or constraint.
- `CsCredits` and `CsThanks`: closing and credits.
- `ProjectQuickSummary`: recruiter scan path.
- `BottomNav`: section navigation.
- `NextProject`: onward flow.

Do not use both a custom `.cs-thanks` section and `<CsThanks />` on the same page.

Clickable elements should read as clickable before hover:
- Inline editorial links use the `cs-text-link` treatment or the shared case-study inline-link selector.
- Case-study section navigation uses visible pill controls, not bare text labels.
- Embedded video or interactive proof uses `CsMediaSpotlight` with a short action cue.

## Token Rules

Use CSS variables from `tokens.css` before new literals.

Allowed local variation:
- `--project-color` per case study.
- Project-specific media aspect ratio.
- Project-specific immersive/interactable components.

Avoid:
- New raw hex colors in page files.
- Inline spacing styles for ordinary layout.
- New font-family declarations outside the system files.
- `!important` unless overriding third-party or browser behavior.
- New bottom bars or fixed controls without checking nav, agent, hand tracker, and safe-area spacing.

## Typography Rules

Use:
- `var(--serif)` for page titles and major editorial headings.
- `var(--sans)` for body and UI copy.
- `var(--mono)` for labels, metadata, section markers, and coordinates.

Line length:
- Body copy: 65 to 75 characters.
- Cards and proof blocks: shorter, scan-first copy.

Copy:
- Favor concrete proof over generic claims.
- Avoid empty labels and repeated headings.
- Avoid long dashes in rendered copy.

## Media Rules

All project media should have:
- Stable aspect ratio.
- Explicit alt text unless decorative.
- Lazy loading except first hero or first proof image.
- Same radius and border grammar via `case-study.css`.

Place video or interactive proof high:
- Fold two or three for projects where interaction is the point.
- Never bury the strongest proof below long process text.

## Responsive Rules

Minimum breakpoints to protect:
- 320, 360, 390, 430, 540, 640, 768, 1024, 1280, 1440, 1728.

Required behavior:
- Nav and bottom controls never cover important content.
- Project titles wrap without cropping.
- Cards keep stable dimensions.
- 3D or canvas elements reduce or hide on mobile if they dominate content.
- Touch targets remain usable.

## Current Consistency Hotspots

The system audit currently identifies these as the highest leverage cleanup areas:
- `CodeForBuildPage.tsx`: many inline styles and table/layout one-offs.
- `MentraBrandPage.tsx`: many inline styles and project-specific component styling.
- `AtpsPage.tsx`: many inline styles and bespoke content layout.
- `TheOmakasePage.tsx`: many inline styles and long custom layout sections.
- `TypefacePage.tsx`: custom typography is intentional, but layout should still use shared spacing primitives.
- `graveyard.css`, `about.css`, `homepage-wr.css`, `work-page.css`, and `case-study.css`: large style islands that need shared primitives before they are split.

## Build Plan

1. Keep `tokens.css` as the only token source.
2. Move repeated inline page styles into reusable case-study component props or classes.
3. Add missing `ProjectQuickSummary` to selected/tier-a work where registry summaries are complete.
4. Convert older long pages to `CsSection`, `CsBody`, `CsImage`, `CsStatGrid`, and `CsMediaSpotlight`.
5. Keep category and work pages fed by `src/data/projects.ts`, not duplicated project lists.
6. Run `npm run design:audit` before committing UI changes.
7. Run `npm run build` and screenshot QA after larger visual passes.
