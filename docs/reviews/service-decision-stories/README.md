# Raahi, ZentiPay and Office of Diversity review

Local changes, 16 October 2026. No deployment or approval changes. Existing pending work is preserved. Shuffle source, scene, metadata and approval remain unchanged.

## Changes and source comparisons

### Raahi

The main story now follows destination choice, route comparison, leg-by-leg guidance and the ticket. Original homepage.png, route list.png, route details.png and bus in transit.png drive the screen selector. Phone originals use a consistent 300px maximum source width, a bounded scrollable viewer for tall screens, keyboard scrolling and full-size enlargement. Switching screens resets the scroll position. The complete kiosk board and vehicle display explain continuity across surfaces.

Research maps, architecture and identity originals remain inspectable in source strips and optional disclosures. The brand personality Spectrum.png is correctly identified as brand exploration, not a rider spectrum. Missing sampling records and concept-only timing, emissions and reward content are identified. The low-resolution kiosk architecture is retained with its source limitation; it is not artificially sharpened. Old section IDs remain available, and the primary reading link now opens the mobile decisions.

### ZentiPay

Five unique public originals now appear once, in two task-based strips: prepare/send and completed invoice; dashboard, history and profile. Each substantive annotation points to visible source details. Removed repeated dashboard imagery and the unsupported before/after claim about when users learned cost/status/risk. The source invoice has amount/formatting inconsistencies; its original is preserved and the limitation is identified rather than silently corrected.

The reviewer gallery, validation and request contract are unchanged. Existing public previews landing-page.webp and dashboard-1.webp remain permitted. Other reviewer images stay unmounted in the locked state. No payment operation is implemented or performed.

### Office of Diversity

The original responsive phone/desktop composition remains contained. Repeated feature/impact prose is replaced by one structural decision and an evidence-boundary section. Four original overlapping report excerpts remain in the reader, ordered and labelled for their actual content: priorities/community feedback, program overview/learning, learning/restorative practice, feedback/year ahead. The complete original capture remains linked for the opening and background timeline.

The scope board is labelled as intent, not proof of tool implementation or WCAG compliance. The archived sticky-note photograph contains finance/risk language; its report attribution is unverified, so it is no longer presented as research proof. Community photographs remain optional context, not usability evidence. Fullscreen close/Escape explicitly restores keyboard focus to its trigger in WebKit.

## Verification

- scripts/service-decisions-qa.mjs: 18 route/profile passes, no failures. Chromium: 1440 light/dark, 768 dark, 390 light, 320 dark. WebKit: 390 dark. Touch taps on screen selectors; keyboard selection and image enlargement/focus return; strips next/previous; report chapter selection, zoom/reset, fullscreen/Escape/focus return; source-image failure/retry; duplicate anchors, page overflow and browser errors.
- The checks caught and fixed a tablet intrinsic-grid overflow when opening the source archive and WebKit fullscreen focus restoration.
- Additional keyboard-scroll/reset checks passed at Chromium 1440/768 and WebKit 390 for the tall Raahi source viewer.
- Production build passed: 208 static routes. Guarded-build check passed. Evidence guard passed: all 50 project approval states preserved and Shuffle byte-identical to HEAD. TypeScript and diff checks passed. Design audit passed blocking checks; existing CSS warnings remain.
- Final screenshots for every route/profile and a phone interaction recording are included. Images are original repository assets, not reconstructed interfaces. No new image or animation library was added.

## Limits

No physical-device test, formal accessibility conformance audit, live transit integration, live payment operation, successful private reviewer unlock or access-request email was performed. No startup-performance improvement is claimed for this content pass. Original files are retained; the report excerpts overlap and do not replace the full original capture. Missing research methods and source attribution are stated in the page rather than filled with invented evidence.
