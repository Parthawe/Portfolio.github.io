# Cold Experiment Optimization Report

Date: 2026-06-25
Branch: `codex/cold-experiement`

## Loader, Responsiveness, and Edge AI Pass

`npm run build` and `git diff --check` pass after this pass.

| Metric | Previous measured build | Current build | Change |
| --- | ---: | ---: | ---: |
| Main CSS | 332.74 kB / 56.70 kB gzip | 337.52 kB / 57.81 kB gzip | +4.78 kB raw, +1.11 kB gzip |
| Main app JS | 121.36 kB / 37.98 kB gzip | 121.88 kB / 38.09 kB gzip | +0.52 kB raw, +0.11 kB gzip |
| Home page chunk | 16.37 kB / 5.19 kB gzip | 16.37 kB / 5.19 kB gzip | no change |
| Agent chat chunk | not previously isolated in report | 26.53 kB / 9.17 kB gzip | deferred agent UI |
| Agent knowledge chunk | not previously isolated in report | 74.77 kB / 26.61 kB gzip | deferred until agent opens |

### What Changed In This Pass

- Replaced the centered loader box with a full-screen calibration reveal: edge rulers, scan line, corner brackets, pixel sparks, and a compact `PP` mark.
- Shortened loader release again: standard motion now releases after two rendered frames plus a short font race, minimum `260ms`, cap `560ms`, removal delay `240ms`.
- Kept reduced-motion users on the shortest path: no scan/pixel animation, short fade only.
- Added a safe optional edge-AI client adapter.
  - The static site does not ship a Gemini key.
  - The frontend calls `VITE_EDGE_AI_ENDPOINT` only when configured.
  - The payload contains only public project/category context and the local fallback answer.
  - Request-access project answers stay limited to public glimpses.
- Added `docs/GEMINI_EDGE_AI.md` with the endpoint contract for `gemini-3.5-flash`.
- Added small-screen guardrails:
  - Agent panel now has viewport-height caps.
  - 320px case-study pages get tighter horizontal padding.
  - Project/category tags wrap instead of forcing overflow.

### Current Read

The new loader costs about `+1.11 kB gzip` in CSS but removes the previous heavy-feeling centered card and exits faster. Home route JavaScript did not grow. The Gemini integration is dormant unless an edge endpoint is configured, so it does not slow the live static site.

### Needs User Help

- Pick the edge host for Gemini: Vercel, Netlify, Cloudflare Workers, or another server. GitHub Pages alone cannot keep a Gemini API key private.
- Provide the Gemini API key only to that edge host, never as a `VITE_` variable.
- Confirm whether voice/TTS should also move server-side. The current ElevenLabs `VITE_` key pattern would expose a real key if enabled in production.
- Do one real-device pass on iPhone/Android and tablet. Emulation is useful, but the final job-facing polish needs actual touch scrolling and Safari/Chrome behavior.
- Confirm any project facts that are still placeholder or AI-generated before they become recruiter-facing proof.

## Latest Runtime Pass

`npm run build` passes after the loading/runtime optimization pass.

| Metric | Before this pass | After this pass | Change |
| --- | ---: | ---: | ---: |
| Main CSS | 332.01 kB / 56.57 kB gzip | 332.01 kB / 56.57 kB gzip | no change |
| Main app JS | 120.38 kB / 37.67 kB gzip | 121.60 kB / 38.02 kB gzip | +1.22 kB raw, +0.35 kB gzip |
| Home page chunk | 16.04 kB / 5.00 kB gzip | 16.16 kB / 5.07 kB gzip | +0.12 kB raw, +0.07 kB gzip |
| Footer/nav-related chunk | 19.32 kB / 6.32 kB gzip | 8.55 kB / 2.87 kB gzip | -10.77 kB raw, -3.45 kB gzip |
| Ambient audio | bundled into nav path | 11.48 kB / 4.07 kB gzip deferred chunk | moved off first interaction path |

The small main bundle increase is intentional: it adds shared media-query/runtime scheduling logic. The user-facing win is that noncritical work no longer competes with first paint and first touch.

### Runtime Changes

- Loader now releases after two rendered frames and a short font race instead of feeling like a full-page wait.
  - Standard motion: minimum `680ms -> 320ms`, cap `1150ms -> 720ms`, font wait `520ms -> 260ms`, removal delay `560ms -> 320ms`.
  - Reduced motion: minimum `80ms -> 40ms`, cap `180ms -> 120ms`.
- Hand tracking is now a late desktop-only enhancement.
  - Before: eligible after `600ms`, cap `2400ms`.
  - After: fine-pointer only, no reduced-motion, no coarse pointer, eligible after `5200ms`, cap `9000ms`.
- Portfolio agent is delayed until the page has settled.
  - Before: `1200ms` delay, `3200ms` cap.
  - After: `3600ms` delay, `7000ms` cap.
- Figma chrome/grid no longer load on coarse pointer devices and wait longer on desktop.
  - Before: `120ms` delay, `1200ms` cap.
  - After: `900ms` delay, `2600ms` cap.
- Hero 3D no longer starts immediately against the hero copy.
  - Before: `250ms` delay.
  - After: `700ms` on desktop, `1800ms` on touch/reduced-motion contexts.
- Lenis is now treated as a desktop enhancement.
  - It no longer loads on touch or reduced-motion devices.
  - It waits for idle/timeout instead of starting right after the first frame.
- Ambient audio is lazy/deferred behind a stable nav placeholder.
  - The visual spacing stays stable, but synthesis code no longer ships as part of the first nav path.
- The copy normalizer now runs during idle and scans `#main-content` first, instead of walking the entire body immediately on route change.

### Latest Verification

- Build: `npm run build`.
- Diff hygiene: `git diff --check`.
- Local server: port `5175` is occupied by the existing Node/Vite listener; fallback `5176` was stopped so only the requested `5175` listener remains.

## Home-Path Follow-Up Pass

`npm run build` passes after the second pass.

| Metric | After previous pass | After this pass | Change |
| --- | ---: | ---: | ---: |
| Main CSS | 332.01 kB / 56.57 kB gzip | 332.74 kB / 56.70 kB gzip | +0.73 kB raw, +0.13 kB gzip |
| Main app JS | 121.60 kB / 38.02 kB gzip | 121.36 kB / 37.98 kB gzip | -0.24 kB raw, -0.04 kB gzip |
| Home page chunk | 16.16 kB / 5.07 kB gzip | 16.37 kB / 5.19 kB gzip | +0.21 kB raw, +0.12 kB gzip |
| Preload helper | bundled into Three vendor chunk | 1.16 kB / 0.68 kB gzip | isolates Vite preload code |
| `vendor-three-react` | 333.67 kB / 114.38 kB gzip | 332.51 kB / 113.84 kB gzip | -1.16 kB raw, -0.54 kB gzip |

### What Changed In The Second Pass

- Removed Framer Motion from the home route.
  - Home hero scroll behavior now uses CSS variables updated by one passive `scroll` listener with `requestAnimationFrame`.
  - Identity, featured cards, discipline cards, archive cards, and text highlights now use CSS/IntersectionObserver instead of Framer wrappers.
- Fixed Vite chunk placement so the preload helper is a tiny standalone chunk instead of living inside `vendor-three-react`.
- Verified the emitted `HomePage` chunk no longer statically imports `vendor-motion`, `vendor-three-react`, or `vendor-three-core`.
- Added `content-visibility: auto` to below-fold home sections so the browser can skip offscreen layout/paint work.

### Practical Impact

The important improvement is not visible in raw chunk totals alone. Before this pass, the home route could pull the motion vendor and the Three vendor stack into the first route path. After this pass, the home path stays focused on app shell, home copy/cards, and small helpers. Three still loads when the deferred hero/category objects mount, but it no longer competes with the first readable screen.

## Build Result

`npm run build` passes.

| Metric | Earlier branch build | Current build | Change |
| --- | ---: | ---: | ---: |
| Main CSS | 327.52 kB / 55.83 kB gzip | 332.01 kB / 56.57 kB gzip | +4.49 kB raw, +0.74 kB gzip |
| Main JS | 125.55 kB / 39.71 kB gzip | 117.77 kB / 37.01 kB gzip | -7.78 kB raw, -2.70 kB gzip |
| Build time | not recorded | 4.33s | OK |

The CSS grew slightly because it now carries the access states, loader, mobile chrome fixes, and responsive guardrails. The initial JS improved because heavy layers are kept out of the first route path.

## What Is Working

- Initial route no longer waits for `window.load`. The pixel/ruler loader releases after the app shell and fonts race, then unmounts.
- `FigmaChrome`, `FigmaGrid`, agent, hand tracker, and heavier interaction layers are lazy/deferred instead of being hard requirements for first paint.
- Hidden/private projects are not routable through the public registry and their page chunks are absent from the production build.
- Request-access projects ship safe quick glimpses only. The private/full-detail material is not discoverable through cards, archives, category pages, agent knowledge, SEO, or next-project links.
- `/work` mobile no longer uses the fixed category filter over project cards. Mobile filters are inline; desktop keeps the top rail.
- Home archive and work cards now use stable top alignment, consistent gutters, aspect ratios, and text clamps to reduce collision/jump risk.
- Screenshot QA covered 54 route/viewport combinations with no document-level horizontal overflow and no visible loader after release.

## Current Largest JS Chunks

| Chunk | Size | Status |
| --- | ---: | --- |
| `vendor-three-core` | 690.87 kB / 177.59 kB gzip | Deferred; needed for 3D scenes and project/category objects. |
| `pdf.min` | 444.59 kB / 131.80 kB gzip | Deferred; only needed by the book/PDF viewer. |
| `vendor-three-react` | 333.67 kB / 114.38 kB gzip | Deferred with 3D React routes/layers. |
| `StudioPage` | 312.66 kB / 94.05 kB gzip | Route chunk; acceptable if studio remains a rich tool. |
| `TypefacePage` | 194.44 kB / 56.81 kB gzip | Route chunk; tied to type tooling. |
| `HandTracker` | 138.80 kB / 42.71 kB gzip | Deferred interaction layer. |
| `vendor-motion` | 137.01 kB / 45.27 kB gzip | Shared animation cost; still on main app path. |
| Main app JS | 117.77 kB / 37.01 kB gzip | Acceptable for the current interaction density. |

## Asset Cost

- `public/Assets`: 247 MB.
- `public/Assets/Projects`: 182 MB.
- `dist/assets`: 291 MB after static copy.
- Files over 5 MB:
  - `public/Assets/Imagepdfportfolio.pdf`: 17 MB.
  - `public/Assets/Projects/black-hole-assets/time-dilation.mp4`: 6.6 MB.

The largest shipped bytes are media, not initial JavaScript. The site is now better at not making users pay those costs on the first route, but the asset library is still large because GitHub Pages serves static files directly.

## Remaining Bottlenecks

- The PDF portfolio is the single biggest file. Replace/compress it or move it behind an explicit download if the book route becomes performance-critical.
- The Three.js stack is the biggest code cost. It is acceptable while deferred, but any 3D element placed above the fold will make that route expensive.
- `vendor-motion` is still shared. A later pass could replace low-value motion wrappers with CSS transitions and keep Framer Motion for only the parts that need it.
- Several project folders are medium-heavy even when no single file exceeds 5 MB. Future image work should target first-scroll listing images first, then deep case-study media.

## QA Evidence

- Build: `npm run build`.
- Diff hygiene: `git diff --check`.
- Hidden chunk leak check: no hidden project page chunks found in `dist/assets`.
- Loader/static-pattern check: no old `window.load` loader dependency and no negative letter spacing found in `src`.
- Screenshot sweep: `/tmp/portfolio-cold-final-qa-v3`, 54 screenshots across `/`, `/work`, `/work?view=playlist`, `/work?view=library`, `/work?view=timeline`, `/about`, `/ai`, `/mentra#cs-website`, and `/zentipay` at `320x700`, `390x844`, `768x1024`, `1024x768`, `1440x1000`, and `1728x1100`.

## Recommendation

Keep this branch focused on information architecture, access safety, responsive hardening, and loader/performance structure. The next separate optimization branch should be asset-only: compress listing thumbnails, audit the PDF path, and consider a lower-bitrate/web-optimized version of the Black Hole video.
