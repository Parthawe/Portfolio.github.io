# Changelog — Portfolio Redesign

Complete record of every change made to [parthpawar.github.io](https://parthpawar.github.io) across 12 commits from March 10–17, 2026. This document covers the full evolution from initial overhaul to the current minimal editorial design, including four rounds of site-wide auditing and cleanup.

---

## March 17, 2026

### Commit — Round 4 Audit: Art Page Meta Tags, Next-Project Images, JS Performance

Fourth comprehensive audit pass. Found and fixed issues specific to the 6 art project pages created in Round 1, plus a JS performance improvement.

**Missing `og:image` Meta Tags (6 pages):**
All 6 art project pages were missing the `og:image` Open Graph meta tag, meaning social media shares (LinkedIn, Twitter/X, Slack) would show no preview image.

| File | Added `og:image` |
|------|-----------------|
| `shuffle.html` | `Assets/images/shuffle.png` |
| `enigma.html` | `Assets/images/enigma.png` |
| `making-of-time.html` | `Assets/images/making-of-time.png` |
| `the-omakase.html` | `Assets/images/the-omakase.png` |
| `moniac-machine.html` | `Assets/images/moniac-machine.png` |
| `drowning.html` | `Assets/images/drowning.png` |

**Missing Next-Project Thumbnail Images (6 pages):**
All 6 art project pages had next-project links without the `<div class="next-project-img"><img>` block. Every other project page in the portfolio shows a thumbnail preview of the next project on hover — these 6 showed only the project title with no image.

| File | Next-Project Image Added |
|------|------------------------|
| `shuffle.html` | `enigma.png` |
| `enigma.html` | `making-of-time.png` |
| `making-of-time.html` | `uv-light.png` |
| `the-omakase.html` | `moniac-machine.png` |
| `moniac-machine.html` | `drowning.png` |
| `drowning.html` | `tedx.png` |

**JavaScript Fixes (js/main.js):**
- **Dead selector removed** — Line 387: `document.querySelector('.project-header, .proj-hero')` → `document.querySelector('.project-header')`. The `.proj-hero` class doesn't exist in any HTML file — this was a leftover from an earlier design iteration. The reading time calculator now queries only the class that actually exists.
- **Passive event listener** — Line 91: Global `document.addEventListener('mousemove', ...)` was missing `{ passive: true }`. This listener fires hundreds of times per second; marking it passive tells the browser it won't call `preventDefault()`, allowing smoother scrolling and compositing.
- **Passive event listener** — Line 156: `heroEl.addEventListener('mousemove', ...)` for the hero glow cursor effect also marked `{ passive: true }` for the same reason.

**Full Audit Results (verified clean):**
- Navigation chain: 28 pages, complete loop, all target files exist ✓
- Image paths: All using `Assets/images/` (uppercase A) ✓
- Skip-links: Present on all 28 project pages + index + about + ux ✓
- `defer` attributes: Present on all `theme.js` and `main.js` script tags ✓
- External links: All `target="_blank"` links have `rel="noopener"` ✓
- CSS variables: No undefined `var()` references ✓
- No unused JS variables or uncalled functions ✓

---

## March 16, 2026

### Commit `217fd5b` — Round 3 Audit Fixes
**32 files changed, 221 insertions, 64 deletions**

Performance and security sweep across all 31 standard HTML pages.

**Performance:**
- Added `defer` attribute to `<script src="js/theme.js">` in the `<head>` of all 31 pages — previously render-blocking since it loaded synchronously before any DOM content
- Added `defer` attribute to `<script src="js/main.js">` at the end of `<body>` across all 31 pages — explicit defer improves browser scheduling even for bottom-of-body scripts

**Security:**
- Fixed `about.html` line 58 — resume PDF link (`freight.cargo.site`) had `target="_blank"` without `rel="noopener"`, which allows the opened page to access `window.opener`. Added `rel="noopener"` to match all other external links on the site

**Content:**
- Fixed `Typeface.html` line 6 — `<title>` used HTML entities (`&rsquo;` and `&middot;`) instead of Unicode characters. Changed to `Butler's Slice · Parth Pawar` for consistent encoding with all other page titles

**Documentation:**
- Created `CHANGELOG.md` (this file) documenting the full redesign history

---

### Commit `c1c5cbb` — Round 2 Audit: Orphan Pages, CSS/JS Cleanup, Nav Chain
**9 files changed, 65 insertions, 43 deletions**

Discovered and resolved orphaned project pages, undefined CSS variables, and JavaScript memory leaks.

**Orphan Page Discovery:**
Four project pages existed as files but were not listed anywhere on `ux.html` (the Work page), making them invisible to visitors browsing the portfolio:
- `CueTV.html` (UX, Brand, Product) — added to **UX Design** section
- `org-dashboard.html` (SaaS, AI, Product Design, B2B) — added to **UX Design** section
- `ballah-code.html` (Dev Tools, AI) — was linked from `index.html` homepage hero cards and project rows, but not on the Work page. Added to **AI & Wearables** section, replacing an empty placeholder `<div class="pcard pcard--empty">`
- `ATPS.html` (ArtTown Podcast Series — Podcast, Content, Art & Design) — added to **Brand & Visual** section, replacing an empty placeholder

**Navigation Chain Expansion (24 → 28 pages):**
Updated next-project links on 6 files to weave the 4 orphan pages into the chain:
- `transfi-project.html`: next changed from `raahi-project.html` → `CueTV.html`
- `CueTV.html`: next changed from `mentra.html` → `org-dashboard.html`
- `org-dashboard.html`: next changed from `mentra.html` → `raahi-project.html`
- `ai-voice.html`: next changed from `keyboard-project.html` → `ballah-code.html`
- `ballah-code.html`: next changed from `mentra.html` → `keyboard-project.html`
- `Typeface.html`: next changed from `mentra.html` → `ATPS.html`
- `ATPS.html` already pointed to `mentra.html` (closes the loop)

**CSS Fixes (css/main.css):**
- **Undefined variable** — Lines 2591-2592 used `var(--ink-30)` for scrollbar styling, but `--ink-30` was never defined in `:root`. Scrollbar thumb was invisible. Replaced with `var(--gray-mid)` which is defined as `#ababab`
- **Unused variables removed** — `--gray-light: #d9d9d9` (defined line 31, used nowhere in CSS or HTML) and `--gap: clamp(1.25rem, 2.5vw, 2rem)` (defined line 48, used nowhere)
- **Duplicate rule removed** — `.hero-v2.hero-v2--split { display: none !important; }` on line 2539 was redundant because `.hero-v2` was already in the `display: none !important` block on lines 2525-2532
- **Focus accessibility improved** — `:focus-visible` outline opacity increased from `0.4` to `0.65` in both light mode (line 212, `rgba(26,26,26,0.65)`) and dark mode (line 108, `rgba(237,237,236,0.65)`) for better visibility per WCAG guidelines

**JavaScript Fixes (js/main.js):**
- **Memory leak fixed** — Hero label cycling `setInterval` (line 70) was never cleared. Stored the interval ID in `labelInterval` and added `window.addEventListener('beforeunload', function () { clearInterval(labelInterval); });`
- **Dead code removed** — `mousePageX` and `mousePageY` variables (line 90) were assigned on mousemove but never read anywhere. Removed both variables and the assignment lines

**HTML Consistency:**
- `ux.html` nav structure — Was using plain `<a>Work</a>` links while all other pages used `<a><span class="nav-link-default">Work</span><span class="nav-link-hover">Work</span></a>` wrappers for hover animation. Updated to match
- `ux.html` body divs — Had leftover `<div class="cursor-dot">`, `<div class="page-loader">`, `<div class="scroll-progress">` from a previous design iteration (all hidden by CSS `display: none !important`). Replaced with standard `<div class="grain">` and `<div class="dot-grid">` that all other pages use
- `transfi-project.html` line 49 — Back link used a literal Unicode arrow `←` while all other 27 pages used the HTML entity `&larr;`. Changed to entity for consistency

---

### Commit `89098c8` — Round 1 Audit: Full Site Fixes + 6 New Art Project Pages
**32 files changed, 1519 insertions, 599 deletions**

The largest commit — created 6 new project pages, reorganized the Work page into 6 categories, fixed image paths across the entire site, added accessibility features, unified the navigation chain, and cleaned dead CSS/JS.

**6 New Project Pages Created:**
All pages sourced from the [Portfolio-replicate](https://github.com/Parthawe/Portfolio-replicate) repo (the user's Cargo site at designwhich.works). Each page follows the standard template: skip-link → grain → dot-grid → nav → mobile-overlay → main → project-header → cs-toc → sections → next-project → footer → scripts.

| File | Project | Vimeo ID | Project Color | Category |
|------|---------|----------|---------------|----------|
| `shuffle.html` | Shuffle — Interactive strategy simulation | 897796834 | `#4A6FA5` | Creative Technology |
| `enigma.html` | Enigma — Light sculpture with neural network | 895893649 | `#6B4C9A` | Creative Technology |
| `making-of-time.html` | Making of Time — Physical computing time piece | 1010457989 | `#8B6914` | Creative Technology |
| `the-omakase.html` | The Omakase — 2-player arcade game | 996020990 | `#C94C4C` | Installations |
| `moniac-machine.html` | Moniac Machine — Economic strategy game | 996025152 | `#2E7D32` | Installations |
| `drowning.html` | Drowning — Theatrical scenic/stage design | 1026164956 | `#5D7B6F` | Installations |

Each page includes:
- Responsive 16:9 Vimeo `<iframe>` embed with `allow="autoplay; fullscreen; picture-in-picture"`
- Image galleries sourced from `freight.cargo.site` CDN (the user's Cargo hosting)
- TOC sidebar with scroll spy for section navigation
- `the-omakase.html` also links to playable version on `vill4n3lle.itch.io`

**Work Page Reorganization (ux.html):**
Restructured from 4 loosely-grouped categories into 6 clearly-labeled sections. The user's directive: *"as my primary role is product design, I want to tie that in too — like it's visible that I am a product designer (UI/UX) first."*

| # | Category | Projects | Rationale |
|---|----------|----------|-----------|
| 1 | **UX Design** | Mentra, ExecutiveLens, ZentiPay, TransFi | Leads the page — establishes product design identity |
| 2 | **Design for Good** | Raahi, The Point CDC, Office of Diversity | Social impact and community work |
| 3 | **AI & Wearables** | Clawed, OnCall Lens, AI Voice | AI-native products and smart glasses |
| 4 | **Creative Technology** | BreakGen, Jugalbandi, VJ Software, Shuffle, Enigma, Making of Time | ITP thesis and creative coding |
| 5 | **Installations** | UV Light, Revolving Stage, The Omakase, Moniac Machine, Drowning | Physical installations and games |
| 6 | **Brand & Visual** | TEDx VIT Pune, Code for Build, Butler's Slice | Branding, event design, typography |

**Image Path Fix (84 occurrences across 26 files):**
All HTML files referenced images as `assets/images/filename.png` (lowercase `a`) but the actual directory on disk is `Assets/images/` (uppercase `A`). macOS is case-insensitive so this worked locally, but GitHub Pages runs on Linux which is case-sensitive — every image was broken on the live site. Changed all 84 `src` attributes from `assets/` to `Assets/`.

Files affected: ATPS.html, CueTV.html, Typeface.html, ai-voice.html, ballah-code.html, clawed-chat.html, code-for-build.html, executivelens.html, index.html, jugalbandi.html, keyboard-project.html, mentra.html, office-of-diversity.html, oncall-lens.html, org-dashboard.html, raahi-project.html, revolving-stage.html, tedx.html, the-point-cdc.html, transfi-project.html, uv-light.html, ux.html, vj-software.html, zentipay.html

**Accessibility — Skip Links (22 pages):**
Added `<a href="#main-content" class="skip-link">Skip to content</a>` and `id="main-content"` to `<main>` on all project pages that were missing them. Round 1 added to 4 pages, round 2 added to the remaining 18. All 28 project pages + index + about + ux now have skip-to-content links.

**Navigation Chain (24-page loop):**
Created a single continuous next-project chain following the ux.html category order. Previously, many pages pointed to `mentra.html` as a dead-end. Now every project links to the next one in sequence, looping back to the start. Fixed 13 next-project links across: mentra, executivelens, zentipay, transfi-project, raahi-project, the-point-cdc, office-of-diversity, clawed-chat, oncall-lens, jugalbandi, vj-software, code-for-build, Typeface.

**Dead CSS Removed (~157 lines from css/main.css):**
- Lightbox styles (`.lightbox`, `.lightbox-overlay`, `.lightbox-close`, `.lightbox-img`) — ~45 lines. JS lightbox code was already removed; CSS was orphaned
- Gallery grid (`.gallery-grid`, `.gallery-item`) — ~20 lines. No HTML uses these classes
- Compare slider (`.compare-slider`, `.compare-handle`) — ~25 lines. JS compare code was removed
- `.footer-v2` — ~30 lines. All pages now use `.footer`
- Other orphaned selectors: `.hero-v2-metric`, `.archive-hover-preview`, `.work-list-year`

**Dead JS Removed (~126 lines from js/main.js):**
- Lightbox code (lines 376-460) — ~84 lines. Created lightbox elements, handled open/close/keyboard/swipe. No HTML triggers it
- Compare slider code (lines 311-332) — ~22 lines. Drag-to-compare before/after images. No HTML uses `.compare-slider`
- Archive hover preview (lines 500-520) — ~20 lines. Showed floating image on `.archive-link` hover. Class doesn't exist in HTML

**New CSS Enhancements (css/main.css):**
Inspired by the [portfolio-example-wildyriftian](https://github.com/Parthawe/portfolio-example-wildyriftian) reference portfolio.

```css
/* Sibling fade — hovering one card dims all others in the row */
.pcard-row:has(.pcard:hover) .pcard:not(:hover):not(.pcard--empty) { opacity: 0.3; }
.pcard { transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1), transform 0.4s ...; }

/* Custom thin scrollbar */
::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: var(--bg); }
::-webkit-scrollbar-thumb { background: var(--gray-mid); border-radius: 2px; }
* { scrollbar-width: thin; scrollbar-color: var(--gray-mid) var(--bg); }

/* Text selection highlight */
::selection { background: var(--accent, #ffe430); color: var(--ink); }

/* Vimeo video embed container */
.cs-media { position: relative; border-radius: 6px; overflow: hidden; margin: 2rem 0; }
.cs-media iframe { border: 0; border-radius: 6px; }
```

**Other Fixes:**
- `.cta-v2` display conflict — Was set to `display: none !important` in the hidden-elements block, then immediately overridden to `display: block !important`. Removed from hidden block so the active rule works without `!important`
- `.cursor-dot` falsely hidden — Was in the `display: none !important` block but is actively used as a custom cursor element on ux.html. Removed from hidden list
- JS selector fix — `.cta-email, .footer-cta-email` changed to just `.footer-cta-email` (`.cta-email` class doesn't exist in HTML)
- Grammar fixes on `raahi-project.html` (subtitle to sentence case, "we" → "I") and `vj-software.html` ("My Challenge was" → "My challenge was", `&amp;` → "and")
- Footer class standardized to `.footer` across all pages (some had `.footer-v2`)

---

## March 15, 2026

### Commit `5109ae3` — Wildyriftian-Inspired Redesign
**26 files changed, 3,168 insertions, 3,557 deletions**

Major aesthetic overhaul applying design patterns from the [portfolio-example-wildyriftian](https://github.com/Parthawe/portfolio-example-wildyriftian) reference. Introduced editorial typography, dark footer, and an interaction craft layer.

**Typography:**
- Added Cormorant (serif) as `--serif` font family for editorial headings and display text
- Satoshi remains primary sans-serif (`--sans`, `--display`, `--body`)
- JetBrains Mono for monospace elements (labels, tags, code)
- Type scale: `--text-hero: clamp(3.5rem, 8vw, 6rem)` down through `--text-xs: 0.72rem`

**Dark Footer:**
- Footer redesigned with dark background (`--footer-dark: rgb(32, 32, 32)`)
- `PARTHPAWARWORKS` watermark text in footer
- Footer social links (LinkedIn, Instagram) in all pages
- Footer "reveal" effect — content scrolls away to reveal the dark footer underneath, created via JS DOM manipulation wrapping the footer in `.footer-reveal` container

**Interaction Craft Layer (js/main.js):**
- **Magnetic CTA button** — Email link in footer subtly follows mouse cursor (`translate` by 15% x, 20% y of mouse offset from center)
- **Card 3D tilt** — `.pcard .pcard-img` elements rotate on mousemove (`rotateY` and `rotateX` by ±6deg based on cursor position)
- **Cursor glow on hero** — Creates `.hero-glow-cursor` div that follows mouse position within the hero section
- **Footer reveal** — JS wraps footer in `.footer-reveal` container, sets `--footer-h` CSS variable, body gets `has-footer-reveal` class for sticky-footer-under-content effect
- **View transitions API** — Intercepts internal link clicks, wraps navigation in `document.startViewTransition()` for smooth page-to-page transitions (with feature detection fallback)
- **Next-project hover preview** — Scales image to 1.05x with -1deg rotation on hover

**Accessibility:**
- Skip-to-content links on all pages
- Focus trap on mobile overlay menu (Tab cycles through focusable elements, Escape closes)
- `prefers-reduced-motion` check disables all animations and parallax effects
- Dark mode respects OS preference via `prefers-color-scheme` media query with localStorage override
- ARIA labels on all interactive buttons (hamburger menu, theme toggle, back-to-top)

### Commit `34ea9b7` — Complete Portfolio Redesign: Interaction Polish
**28 files changed, 3,752 insertions, 4,024 deletions**

Added the remaining interaction systems and polished the full site.

**New Interactions (js/main.js):**
- **Reading progress bar** — Thin bar at top of case study pages showing scroll percentage (`window.scrollY / scrollHeight * 100`)
- **Back-to-top button** — Floating button appears after scrolling past 50% of viewport height. Smooth-scrolls to top on click
- **Smooth TOC scroll** — Clicking a TOC link smoothly scrolls to the target section with nav-height offset (`--nav-h` or 56px + 24px padding)
- **Counter animation** — `.cs-stat-value[data-count]` elements animate from 0 to target number using `requestAnimationFrame` with ease-out cubic (`1 - Math.pow(1 - progress, 3)`). Triggers via IntersectionObserver at 30% threshold
- **Reading time** — Calculates word count of `<main>` text content, divides by 200 WPM, injects `<span class="proj-read-time">X min read</span>` after the project subtitle
- **About link hover** — Links lift 2px on hover with spring easing
- **Mobile overlay stagger** — When mobile menu opens, each nav link fades in sequentially (80ms + 60ms per item) with 12px upward translate

---

## March 14, 2026

### Commit `32e9092` — Work Page Redesign: Categorized Sections
**8 files changed, 1,107 insertions, 893 deletions**

Restructured `ux.html` from a flat project grid into grouped sections with visible category labels.

**Structure:**
- Added `.work-group` sections with `.work-group-label` spans
- Projects displayed in `.pcard-row` (2 cards per row) within each group
- Each `.pcard` contains: `.pcard-img` (thumbnail), `.pcard-body` (name, result line, role/year)
- Empty placeholders (`.pcard--empty`) used for odd-count rows to maintain grid alignment
- Text cards for current roles at top of certain sections

### Commit `b89236a` — Work Page Redesign: Flat Project Grid
**8 files changed, 784 insertions, 1,190 deletions**

Initial restructuring of the Work page away from the previous archive-list layout.

- Replaced text-only archive rows with image-based project cards
- Added project thumbnails to all cards
- Removed category group labels (added back in next commit)
- Hover previews on project cards with CSS transitions

---

## March 13, 2026

### Commit `51e063c` — Professional Case Studies: TOC, Structure, Editorial Design
**25 files changed, 8,213 insertions, 3,401 deletions**

The foundational commit that established the case study template used by all 28+ project pages.

**Case Study Template:**
Every project page now follows this structure:
```
<a class="skip-link">              Skip to content
<div class="grain">                Film grain texture overlay
<div class="dot-grid">             Subtle dot pattern background
<nav class="nav" id="nav">         Fixed top navigation
<div class="mobile-overlay">       Full-screen mobile menu
<main id="main-content">
  <div class="project-header">     Hero with title, subtitle, tags, metadata
  <nav class="cs-toc" id="cs-toc"> Floating sidebar table of contents
  <div class="color-chapter">      Colored background sections
    <section class="cs-section">   Individual content sections
  </div>
</main>
<a class="next-project">           Link to next case study
<footer class="footer">            Dark footer with watermark + social links
<script src="js/main.js" defer>    Interactions
```

**Table of Contents (TOC):**
- Fixed sidebar (`position: sticky`) that lists all case study sections
- Active state tracked via `IntersectionObserver` with `rootMargin: '-20% 0px -60% 0px'` — highlights the section currently in the viewport's upper-middle portion
- Smooth scroll on click with nav-height offset compensation
- Collapses to hidden on mobile (< 768px)

**Color Chapters:**
- Each project defines `--project-color` in its `<body>` inline style
- `.color-chapter` sections use this color for backgrounds, section headers, and accent elements
- Variant classes: `.cs-section--blue`, `.cs-section--dark` for full-bleed colored sections
- Stats, quotes, feature cards, and detail grids styled within the color system

**Per-Project Colors:**
| Project | Color | Hex |
|---------|-------|-----|
| Mentra | Blue | `#1B4D8F` |
| ExecutiveLens | Green | `#0A6847` |
| ZentiPay | Green | `#1E6B45` |
| TransFi | Blue | `#2563EB` |
| Clawed Chat | Brown | `#8B5E34` |
| OnCall Lens | Indigo | `#4338CA` |
| Raahi | Teal | `#0D9488` |
| The Point CDC | Red | `#B91C1C` |
| TEDx | Red | `#E62B1E` |
| Ballah Code | Red | `#E04832` |

**Reading Progress:**
- `<div class="reading-progress">` — thin bar at top of page
- Width controlled by JS: `(scrollY / scrollableHeight) * 100 + '%'`

---

## March 11, 2026

### Commit `671ace5` — Minimal White Redesign
**4 files changed, 191 insertions, 359 deletions**

Design direction pivot from dark/colorful to restrained minimalism. Inspired by diabrowser.com and sarvam.ai.

**Visual Changes:**
- Background changed to off-white `#FAFAF8` (was darker)
- Removed grain overlay and dot grid from prominent display
- Color used only as rare accent — removed aggressive pink palette
- Nav contact button switched from colored to neutral
- Scroll progress bar thinned to 1px
- Footer kept dark (`rgb(32, 32, 32)`) as the one high-contrast element

**CSS Variables (current state):**
```css
:root {
  --bg:       #FAFAF8;     /* Off-white */
  --bg-alt:   #F2F1EE;     /* Slightly warm gray */
  --surface:  #FFFFFF;     /* Pure white cards */
  --ink:      #1A1A1A;     /* Near-black text */
  --accent:   #f5f5f5;     /* Neutral — intentionally desaturated */
}
```

### Commit `00194f2` — Dark Hero with Morphing Gradient Orb
**4 files changed, 318 insertions, 328 deletions**

Replaced the geometric 3D shapes with a single atmospheric sphere.

- Custom GLSL shaders: simplex noise displacement, fresnel rim lighting, pink-blue-purple gradient
- Dark hero section with centered typography
- Orb serves as atmospheric backdrop rather than interactive focal point
- Nav toggles between light (hero) and dark (scrolled) states

---

## March 10, 2026

### Commit `339dd13` — Three.js 3D Glassmorphism Scene
**5 files changed, 335 insertions, 285 deletions**

Replaced the flat image card stack with 3D geometric objects.

- Created `js/hero-3d.js` (305 lines) with Three.js scene
- Objects: torus knot, icosahedron, dodecahedron, sphere, octahedron, torus
- Glass and metallic materials with environmental lighting
- Floating animations with sine/cosine oscillation
- Mouse parallax rotation of entire scene
- Staggered intro animation with reduced-motion support

### Commit `19c0fe9` — Premium Portfolio Overhaul (Initial Commit)
**28 files changed, 15,234 insertions, 2,177 deletions**

The starting point of the redesign. Massive foundational commit establishing the new design system.

**Pages Created:**
- `mentra.html` — Full case study for Mentra (AI smart glasses)
- `awards.html`, `proof.html`, `writing.html`, `talks.html` — Supporting pages

**Hero Section:**
- 3D card stack with 7 project cards fanned in a radial pattern
- Each card has CSS custom properties: `--rz` (rotation), `--tz` (z-translate), `--card-i` (index)
- Mouse parallax tracking via `requestAnimationFrame` with lerp smoothing (0.06 factor)
- Cards fade out on scroll (opacity reduces from 1 → 0.4 as user scrolls through hero)
- `IntersectionObserver` stops RAF animation when hero is off-screen (performance optimization)

**Cycling Hero Label:**
- Rotates through 4 labels every 3 seconds with fade transition:
  1. "Product Designer, New York"
  2. "Head of UI/UX, Mentra"
  3. "Creative Technologist, NYU ITP"
  4. "Building AI-Native Tools"

**CSS Foundation (~2750 lines in css/main.css):**
- Complete design token system with CSS custom properties
- Light and dark theme with `[data-theme]` attribute switching
- OS preference detection via `prefers-color-scheme` media query
- Responsive breakpoints: 1200px, 768px, 600px, 480px, 360px
- Scroll reveal animations (`.reveal` → `.visible` with staggered delays)
- Project card grid with hover states and transitions
- Case study components: stat cards, quote cards, feature cards, detail grids, color sections
- Navigation: fixed top bar, hamburger toggle, mobile overlay
- Footer: dark background, watermark, social links

**JavaScript Foundation (~550 lines in js/main.js):**
- Theme toggle (creates button, injects into nav, syncs with localStorage)
- Nav scroll state (`.scrolled` class after 20px scroll)
- Mobile menu with focus trap and Escape key handler
- Scroll reveal with `IntersectionObserver` and staggered sibling delays
- Counter animation for stat values
- Reading progress bar
- Case study TOC with scroll spy
- Project image parallax on mousemove
- Card 3D tilt effect
- Reading time calculator
- Back-to-top button
- Footer reveal effect
- View transitions API
- Magnetic CTA button
- Smooth TOC scroll
- Mobile overlay link stagger animation
- About link hover effect
- Next-project hover preview

**Theme System (js/theme.js — 6 lines):**
```javascript
(function () {
  var stored = localStorage.getItem('theme');
  var theme = stored || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', theme);
})();
```
Runs before DOM render (in `<head>`) to prevent flash of wrong theme.

---

## Architecture

### Tech Stack
- **Static HTML/CSS/JS** — no build tools, no bundlers, no frameworks
- **Hosted on GitHub Pages** — deploys from `main` branch
- **Fonts**: Satoshi (sans-serif), Cormorant (serif), JetBrains Mono (monospace) via Google Fonts with `display=swap`
- **No dependencies** — pure vanilla JS, no jQuery, no libraries (Three.js was explored then removed)

### Design System

**Theming:**
- CSS custom properties defined in `:root` (light) and `[data-theme="dark"]` (dark)
- Theme persisted in `localStorage`, falls back to OS `prefers-color-scheme`
- `js/theme.js` applies theme before render (FOUC prevention)
- Toggle button injected via JS into both desktop nav and mobile nav

**Color Tokens:**
| Token | Light | Dark |
|-------|-------|------|
| `--bg` | `#FAFAF8` | `#111110` |
| `--bg-alt` | `#F2F1EE` | `#1A1918` |
| `--surface` | `#FFFFFF` | `#222220` |
| `--ink` | `#1A1A1A` | `#EDEDEC` |
| `--accent` | `#f5f5f5` | `#f5f5f5` |
| `--footer-dark` | `rgb(32,32,32)` | `rgb(32,32,32)` |

**Typography Scale:**
| Token | Value |
|-------|-------|
| `--text-hero` | `clamp(3.5rem, 8vw, 6rem)` |
| `--text-3xl` | `3rem` |
| `--text-2xl` | `2rem` |
| `--text-xl` | `1.5rem` |
| `--text-lg` | `1.125rem` |
| `--text-base` | `1rem` |
| `--text-sm` | `0.85rem` |
| `--text-xs` | `0.72rem` |

**Spacing & Layout:**
| Token | Value |
|-------|-------|
| `--nav-h` | `56px` |
| `--w` | `1120px` (max content width) |
| `--narrow` | `720px` (narrow content width) |
| `--pad` | `clamp(1.25rem, 4vw, 3rem)` |
| `--radius` | `8px` |

**Easing:**
| Token | Value |
|-------|-------|
| `--ease-out` | `cubic-bezier(0, 0, 0.3, 1)` |
| `--ease-spring` | `cubic-bezier(0.16, 1, 0.3, 1)` |

### File Structure
```
/
├── index.html              Homepage — hero card stack + selected work rows
├── ux.html                 Work page — 28 projects in 6 categories
├── about.html              About page — bio, experience, education, skills
├── PDF.html                Resume flipbook (standalone, non-standard template)
├── CHANGELOG.md            This file
│
├── css/
│   └── main.css            Single stylesheet (~2,740 lines)
│
├── js/
│   ├── theme.js            Theme init IIFE (6 lines, runs in <head>)
│   └── main.js             All interactions (~550 lines, deferred)
│
├── Assets/
│   └── images/             Project thumbnails and photos (23 PNGs + 1 JPG)
│       ├── mentra.png
│       ├── executivelens.png
│       ├── zentipay.png
│       ├── transfi.png
│       ├── cuetv.png
│       ├── org-dashboard.png
│       ├── raahi.png
│       ├── the-point-cdc.png
│       ├── office-of-diversity.png
│       ├── clawed.png
│       ├── oncall-lens.png
│       ├── ai-voice.png
│       ├── ballah-code.png
│       ├── keyboard.png
│       ├── jugalbandi.png
│       ├── vj.png
│       ├── uv-light.png
│       ├── revolving-stage.png
│       ├── tedx.png
│       ├── code-for-build.png
│       ├── typeface.png
│       ├── atps.png
│       └── parth.jpg
│
└── 28 project pages:
    ├── mentra.html
    ├── executivelens.html
    ├── zentipay.html
    ├── transfi-project.html
    ├── CueTV.html
    ├── org-dashboard.html
    ├── raahi-project.html
    ├── the-point-cdc.html
    ├── office-of-diversity.html
    ├── clawed-chat.html
    ├── oncall-lens.html
    ├── ai-voice.html
    ├── ballah-code.html
    ├── keyboard-project.html
    ├── jugalbandi.html
    ├── vj-software.html
    ├── shuffle.html
    ├── enigma.html
    ├── making-of-time.html
    ├── uv-light.html
    ├── revolving-stage.html
    ├── the-omakase.html
    ├── moniac-machine.html
    ├── drowning.html
    ├── tedx.html
    ├── code-for-build.html
    ├── Typeface.html
    └── ATPS.html
```

### Page Template (standard for all 31 pages)
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>[Page] · Parth Pawar</title>
  <meta name="description" content="..."/>
  <meta property="og:title/description/image/type"/>
  <meta name="twitter:card" content="summary_large_image"/>
  <link rel="icon" href="https://freight.cargo.site/.../Facicon.ico"/>
  <link rel="stylesheet" href="css/main.css"/>
  <script src="js/theme.js" defer></script>
</head>
<body>
  <div class="grain"></div>
  <div class="dot-grid"></div>
  <a href="#main-content" class="skip-link">Skip to content</a>

  <nav class="nav" id="nav">...</nav>
  <div class="mobile-overlay">...</div>

  <main id="main-content">
    <!-- Page content -->
  </main>

  <!-- Project pages only: -->
  <a class="next-project" href="[next].html">...</a>

  <footer class="footer">
    <div class="footer-watermark">PARTHPAWARWORKS</div>
    <div class="wrap footer-inner">
      <!-- CTA, social links, copyright -->
    </div>
  </footer>

  <script src="js/main.js" defer></script>
</body>
</html>
```

### Navigation Chain (28 pages)
The next-project links form a single continuous loop following the ux.html category order:

```
UX Design:           mentra → executivelens → zentipay → transfi → CueTV → org-dashboard
Design for Good:     → raahi → the-point-cdc → office-of-diversity
AI & Wearables:      → clawed-chat → oncall-lens → ai-voice → ballah-code
Creative Technology: → keyboard → jugalbandi → vj-software → shuffle → enigma → making-of-time
Installations:       → uv-light → revolving-stage → the-omakase → moniac-machine → drowning
Brand & Visual:      → tedx → code-for-build → Typeface → ATPS → mentra (loop)
```

---

## Next Steps

### P0 — Blocking (broken on live site)

- [ ] **6 missing thumbnail images** — These are referenced in ux.html, next-project links, and og:image meta tags but don't exist as files. The project cards show broken images on the Work page, and social media shares show no preview.
  - `Assets/images/shuffle.png`
  - `Assets/images/enigma.png`
  - `Assets/images/making-of-time.png`
  - `Assets/images/the-omakase.png`
  - `Assets/images/moniac-machine.png`
  - `Assets/images/drowning.png`
  - **Action**: Export/screenshot thumbnails from Vimeo videos or project content. Target size: ~800x600px, optimized PNG or WebP. Each image is referenced in 3 places: ux.html card, next-project link from the previous page, and the page's own og:image tag.

### P1 — High Priority (quality / completeness)

- [ ] **PDF.html doesn't follow standard template** — Missing nav, footer, skip-link, mobile-overlay, grain, dot-grid, favicon, theme.js, main.js. Uses external CDN (Tailwind, jQuery, dflip flipbook library) without `defer`. Script tags also lack `defer` attribute. Either rebuild to match the portfolio template or remove from the site.
- [ ] **Cross-verify with designwhich.works** — The live Cargo site may have additional projects, updated descriptions, or newer images not yet pulled into this repo. Compare project list and content 1:1.
- [ ] **Additional projects from Portfolio-replicate not yet added** — healthapp, ibm (Cancer Prognosis), sculpture, vishwaconclave were identified in the source repo but not created as pages. Decide which to include and create pages following the standard template.
- [ ] **Placeholder images across project pages** — mentra, zentipay, clawed-chat, keyboard-project, ballah-code, executivelens, org-dashboard may still reference placeholder screenshots rather than final polished assets. Review and replace with production-quality images.
- [ ] **revolving-stage.html missing proj-subtitle** — Only project page without the standard `<p class="proj-subtitle">` element beneath the title. All other 27 pages have it.
- [ ] **Open Graph images — existing pages** — Many of the original 22 project pages share `mentra.png` as og:image rather than referencing their own thumbnail. Each project page should use its own image for accurate social sharing previews. (The 6 new art pages were fixed in Round 4 to use their own images.)

### P2 — SEO & Performance

- [ ] **Add canonical URLs** — Every page needs `<link rel="canonical" href="https://parthpawar.github.io/[page].html"/>` to prevent duplicate content issues in search indexing.
- [ ] **Add JSON-LD structured data** — `Person` schema on index.html, `CreativeWork` schema on each project page. Enables rich snippets in Google search results (portfolio cards, project info).
- [ ] **Image optimization** — Current thumbnails are unoptimized PNGs. Convert to WebP with `<picture>` fallback for older browsers. Add `srcset` for responsive sizes (400w, 800w). Already using `loading="lazy"` on below-fold images.
- [ ] **Preconnect to font CDN** — Add `<link rel="preconnect" href="https://fonts.googleapis.com">` and `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>` to all pages to reduce font load latency.
- [ ] **Sitemap.xml** — Generate a sitemap listing all 31+ pages for better search engine crawling.
- [ ] **robots.txt** — Add a robots.txt pointing to the sitemap.
- [ ] **Preload critical assets** — Add `<link rel="preload">` for Satoshi font files and main.css to reduce initial render time.

### P3 — Code Quality & Maintainability

- [ ] **Reduce CSS `!important` usage** — 61 instances, mostly in `.cs-section--blue` and `.cs-section--dark` overrides (lines 1418–2452 of main.css) and `.nav-contact` resets (lines 372–380). Restructure specificity so these rules win naturally without `!important`.
- [ ] **Merge duplicate CSS selectors** — `.pcard` is defined in 3 separate locations (lines 998, 2306, 2584), `.hero-label` in 2 places (lines 462, 669), `.theme-toggle svg` in 2 places (lines 149, 157). Consolidate into single definitions to avoid cascade confusion.
- [ ] **JS observer cleanup** — `tocObserver` (line 336) and `overlayMo` MutationObserver (line 498) are created but never disconnected. Add cleanup on `beforeunload` to prevent memory accumulation during long browsing sessions.
- [ ] **JS event listener cleanup** — 18+ event listeners (scroll, mousemove, resize, click, keydown) are attached globally but never removed. Consider using an AbortController signal for grouped cleanup, or accept the tradeoff since this is a static portfolio (no SPA routing).
- [ ] **`:has()` CSS browser support** — The sibling fade effect (`.pcard-row:has(.pcard:hover)`) doesn't work in Firefox versions before 121 (Dec 2023). Current behavior degrades gracefully (hover effect just doesn't dim siblings). Could add a JS fallback if broader support is needed.
- [ ] **CSS orphaned hidden selectors** — `.hero-v2--split` and `.footer-v2` are still in the `display: none !important` block (line 2527-2528). These classes don't exist in any HTML file. Safe to remove entirely.

### P4 — Nice to Have

- [ ] **404.html** — Custom 404 page matching the portfolio design. GitHub Pages automatically serves `404.html` from the repo root.
- [ ] **Print stylesheet** — `@media print` styles for case studies: hide nav, footer, next-project, back-to-top; optimize typography and images for paper.
- [ ] **Service worker / offline** — Cache static assets (CSS, JS, fonts, thumbnails) for offline portfolio viewing at conferences and interviews where wifi may be unreliable.
- [ ] **Favicon as local file** — Currently all pages reference favicon from `freight.cargo.site` CDN. Download and serve locally from `Assets/` to avoid external dependency and improve load time.
- [ ] **CSS custom property for project colors** — Standardize all 28 project pages to set `--project-color` via inline style on `<body>`, then reference it consistently in `.color-chapter`, `.project-header`, and `.cs-section` backgrounds. Some pages may still use hardcoded hex values.
