# Index preview loading race

Local follow-up to PR #20. Production base: `4f34b8011350210314ab1f9459074ac79308afb1`. Evidence captured locally before release. No visual redesign or experience approval changes. Local review at http://127.0.0.1:5236/work?view=library.

## Findings and fixes

1. **Hover before the optional module loads.** Hold the CoverPreview module request, open Work → Index, move the pointer onto the artwork, then release the request without moving the pointer again. Chromium and WebKit leave `data-cover-motion` unset and never start playback. This reproduces the initial production failure's missing-state signature. The player installed its listener after pointer entry and initialized its hover state to false. It now reads live hover state when binding, on hover-capable devices only. Leaving before load does not retain stale intent.
2. **Scroll updates overwrite a manual selection.** Rapidly selecting rows can queue scroll bookkeeping that chooses a different project while the pointer moves toward the preview. Both browsers reproduced a switch from Raahi to TransFi. Removed the competing shelf observer; the existing visible-row tracker now owns scroll selection and yields while a row has keyboard focus or the pointer is over a row/preview. Ordinary scrolling resumes automatic selection.
3. **Escape from the Index row does not reach the artwork.** The focused row is outside the artwork's DOM subtree. The old test could wait for the finite animation's natural end and report success. Escape now reaches only the single active player from document keyboard events, without changing focus. The new test requires disposal within 750 ms, well before natural completion.

The first deterministic reproduction establishes a real missed-event race matching the deployment failure. The original production run lacked a trace, so its exact event ordering cannot be recovered retrospectively.

## Verification inventory and results

Production build and TypeScript passed; the design audit passed its blocking checks with existing refactor warnings. All checks below ran against the final local production build.

| Check | Result | Evidence |
| --- | --- | --- |
| Cold film/screen entry, delayed visibility, leave-before-load, rapid selection, selection during scroll, immediate Escape, stale image responses, keyboard entry, mobile Index navigation, reduced motion | 44 cases passed in Chromium/WebKit, desktop/mobile, light/dark | `lifecycle-verification.json` |
| All registered covers | 14 covers × 4 browser/device/theme profiles passed; finite playback, complete screens, real fonts, offscreen/hidden disposal, replay, navigation | `cover-verification.json` |
| Policy/failure fallback | Six scenarios passed: reduced motion, data saving, low memory, emergency mode, unavailable media, unavailable chunk | `cover-verification.json` |
| Native mobile input | Chromium touch swipe scrolls and starts a visible cover; one tap opens the project. Chromium/WebKit delayed-visibility keyboard entry passed | `touch-entry-verification.json` |
| Index/Arc | Complete screen containment, full-frame films, playback and disposal passed in Chromium light and WebKit dark | `artwork-verification.json` |
| Startup | 18 Home/Work cases passed; Chromium zero CLS; WebKit stable geometry. No initial cover-media requests, both themes, delayed CSS and saved rulers | `startup-verification.json` |
| Shuffle | Six source files byte-identical to production. 3D canvas, linked slider changes, view selection and reset passed at Chromium 1440/390 and WebKit 390 | `shuffle-unchanged.json`, `shuffle-verification.json` |

`baseline-reproduction.json` records both browsers failing before the hover fix. `scroll-race-before-fix.json` records the two failures that led to the selection fix. The CI cover-verification job now includes `scripts/cover-lifecycle-qa.mjs`; remote CI and deployment results are recorded in the pull request.

## Visual review

Compared light/dark desktop Index and mobile list screenshots. Full phone screens retain their original aspect ratio; the same artwork frame, type and gutters remain. Mobile keeps the existing list with its side preview hidden. Pointer and focus priority change behavior without changing the page's styling. The media assets, font preload choices, preview duration, protected-content boundaries, footer and Shuffle registry entries are unchanged.

- `before-cold-index.png`: stationary pointer with the original still stuck before the fix.
- `desktop-light.png`, `desktop-dark.png`: working screen preview after delayed loading.
- `mobile-light.png`, `mobile-dark.png`: original mobile list and direct navigation.
- `cold-index-preview.webm`: held module, preview entry after release, leave/re-entry and finite completion.

## Cost

`bundle-cost.json` records raw/gzip sizes of the player and Work chunks against the preceding cover build. It is a local build comparison, not a field speed measurement. No dependency, media file, WebGL context, polling loop or initial media request was added. Removed one shelf IntersectionObserver; retained the existing scroll/resize frame scheduler. Startup geometry and zero initial cover-media loading passed the final regression suite.

## Repeat locally

Run the production preview, then set `QA_BASE_URL` to its address and `QA_OUTPUT_DIR` to an evidence folder:

- `node scripts/cover-lifecycle-qa.mjs`
- `node scripts/cover-motion-qa.mjs`
- `node scripts/cover-entry-qa.mjs`
- `node scripts/cover-artwork-qa.mjs`
- `node scripts/cover-startup-qa.mjs`

The lifecycle suite holds the actual lazy-module request instead of assuming a fixed delay. On failure it saves the browser error/request log, DOM geometry, screenshot and Playwright trace. Tests do not call the live AI backend or submit access requests.
