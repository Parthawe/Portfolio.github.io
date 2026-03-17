# Changelog — Portfolio Redesign

Full record of changes made to [parthpawar.github.io](https://parthpawar.github.io) from March 10–16, 2026.

---

## March 16, 2026

### Round 3 Audit Fixes
- Added `defer` attribute to `theme.js` and `main.js` across all 31 pages for faster rendering
- Fixed missing `rel="noopener"` on resume link in about.html (security)
- Fixed Typeface.html title encoding (HTML entities to Unicode)

### Round 2 Audit — Orphan Pages, CSS/JS Cleanup
- **4 orphan project pages** (CueTV, OrgDashboard, Ballah Code, ATPS) discovered and added to ux.html
- Ballah Code was featured on the homepage but invisible on the Work page — now listed under AI & Wearables
- **Next-project chain** expanded from 24 to 28 pages, all in a single navigation loop
- Fixed undefined CSS variable `--ink-30` (scrollbar was invisible) — replaced with `--gray-mid`
- Removed unused CSS variables (`--gray-light`, `--gap`) and duplicate `.hero-v2.hero-v2--split` rule
- Improved focus-visible outline contrast from 40% to 65% opacity (accessibility)
- Fixed JS memory leak: `setInterval` for hero label cycling now clears on `beforeunload`
- Removed unused `mousePageX`/`mousePageY` JS variables
- Standardized ux.html nav structure (added span wrappers to match all other pages)
- Replaced ux.html's leftover `cursor-dot`/`page-loader`/`scroll-progress` divs with standard `grain`/`dot-grid`
- Fixed transfi-project.html back arrow to use `&larr;` entity (consistency)

### Round 1 Audit — Full Site Fixes + 6 New Art Pages
- **6 new project pages** created with Vimeo video embeds:
  - `shuffle.html` — Interactive strategy simulation installation
  - `enigma.html` — Light sculpture with deep learning neural network
  - `making-of-time.html` — Time exploration through physical computing
  - `the-omakase.html` — 2-player party arcade game (with itch.io link)
  - `moniac-machine.html` — Economic strategy game
  - `drowning.html` — Theatrical scenic design
- **ux.html reorganized** from 4 categories to 6:
  1. UX Design (6 projects) — leads the page, reinforcing product design identity
  2. Design for Good (3 projects)
  3. AI & Wearables (4 projects)
  4. Creative Technology (6 projects)
  5. Installations (5 projects)
  6. Brand & Visual (4 projects)
- **Image paths fixed** — 84 occurrences of `assets/images/` changed to `Assets/images/` across all files (case-sensitive for GitHub Pages on Linux)
- **Skip-links added** to all 28 project pages with `id="main-content"` on `<main>`
- **Next-project navigation chain** unified into a 24-page loop (later expanded to 28)
- **Dead CSS removed** — ~157 lines (lightbox, gallery, compare slider, footer-v2, orphaned selectors)
- **Dead JS removed** — ~126 lines (lightbox, compare slider, archive hover preview)
- **New CSS enhancements**:
  - Sibling fade effect on card hover (`.pcard-row:has(.pcard:hover)`)
  - Custom scrollbar styling (4px thin)
  - Selection highlight using `--accent` color
  - Vimeo video embed responsive styles
- Fixed `.cta-v2` display:none/block `!important` conflict
- Fixed `.cursor-dot` being falsely hidden by CSS
- Fixed JS selector `.cta-email` to `.footer-cta-email`
- Grammar fixes: sentence case, "we" to "I", ampersand standardization
- Footer standardized to `.footer` class across all pages

---

## March 15, 2026

### Wildyriftian-Inspired Redesign
- Applied aesthetic patterns from [portfolio-example-wildyriftian](https://github.com/Parthawe/portfolio-example-wildyriftian) reference
- Serif typography layer (Cormorant) for editorial feel
- Dark footer treatment with `PARTHPAWARWORKS` watermark
- Interaction craft layer: magnetic CTA, card 3D tilt, cursor glow, footer reveal
- View transitions API support (with JS fallback)

### Complete Portfolio Redesign
- Interaction polish: reading progress bar, back-to-top button, smooth TOC scroll
- Mobile focus trap on overlay menu
- Counter animation for stat cards
- About link hover effects
- Next-project hover preview with scale + rotate

---

## March 14, 2026

### Work Page Redesign
- Restructured from flat grid to categorized sections with group labels
- Text cards for current roles
- Hover previews on project cards
- 3D card tilt effect on project thumbnails

---

## March 13, 2026

### Professional Case Studies
- TOC (Table of Contents) sidebar navigation with scroll spy
- Consistent case study structure: project-header, color chapters, sections
- Dark editorial redesign with CSS custom properties per project (`--project-color`)
- Reading time calculation injected dynamically

---

## March 11, 2026

### Design Direction Exploration
- Minimal white redesign with restrained color and generous whitespace
- Dark hero with morphing gradient orb

---

## March 10, 2026

### Initial Overhaul
- 3D hero card stack with parallax mouse tracking
- Three.js glassmorphism scene (later simplified)
- TOC scroll spy system
- Micro-interactions and scroll reveal with stagger
- RAF-optimized hero animation (stops when off-screen)

---

## Architecture

### Tech Stack
- Static HTML/CSS/JS — no build tools, no frameworks
- Hosted on GitHub Pages
- Fonts: Satoshi (sans), Cormorant (serif), JetBrains Mono (mono) via Google Fonts

### Design System
- CSS custom properties for theming (`--ink`, `--bg`, `--accent`, `--project-color`)
- Light/dark mode via `data-theme` attribute with localStorage persistence
- Breakpoints: 360px, 480px, 600px, 768px, 1200px
- Page template: skip-link, grain, dot-grid, nav, mobile-overlay, main, footer, scripts

### File Structure
```
index.html          — Homepage with hero + selected work
ux.html             — Work page (28 projects in 6 categories)
about.html          — About page
[project].html      — 28 individual case study pages
css/main.css        — Single stylesheet (~2750 lines)
js/theme.js         — Theme initialization (IIFE)
js/main.js          — All interactions (~550 lines)
Assets/images/      — Project thumbnails and photos
```

### Navigation Chain (28 pages)
```
mentra → executivelens → zentipay → transfi → CueTV → org-dashboard →
raahi → the-point-cdc → office-of-diversity → clawed-chat → oncall-lens →
ai-voice → ballah-code → keyboard → jugalbandi → vj-software → shuffle →
enigma → making-of-time → uv-light → revolving-stage → the-omakase →
moniac-machine → drowning → tedx → code-for-build → Typeface → ATPS → mentra
```

---

## Known Issues / Remaining Work
- **6 missing thumbnail images**: shuffle.png, enigma.png, making-of-time.png, the-omakase.png, moniac-machine.png, drowning.png need to be created/exported for Assets/images/
- **PDF.html** does not follow the standard page template (no nav, footer, skip-link)
- No canonical URLs or JSON-LD structured data (SEO enhancement)
- `:has()` CSS selector not supported in older Firefox (graceful degradation — sibling fade just won't trigger)
