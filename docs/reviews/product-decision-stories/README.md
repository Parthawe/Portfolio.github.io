# Product case-study decisions review

Local review, 16 October 2026. No deployment, route changes, approval changes, backend changes, or Shuffle edits.

## Case studies

- Mentra: four decision chapters with ten original slides. The complete 44-slide source remains in an optional reader. First-use and runtime results stay separate; missing study methods are identified. Old chapter links still open the source reader.
- MiniApps: original Store screens explain discovery, configuration, and Get/Stop/Uninstall states. Notes screens explain session identity, speaker attribution and note provenance. Repeated phone/glasses prose is removed; developer and permission proposals are grouped and labelled as proposals.
- TransFi: three public boards explain checkout continuity, itemized pricing and wallet reuse. The source comparison does not prove improved address validation. Protected content and access contracts remain unchanged.
- ExecutiveLens: two original website captures explain capture-to-action flow and permission boundaries. Repeated feature prose is removed. The prepared citation example remains operable and is identified as a sample, not a live AI demonstration.

## Sources

Images and transcripts are the existing repository originals. Mentra slide IDs and annotations are mapped in src/data/productDecisionStories.ts; public TransFi IDs in src/data/transfiPublicDecisions.ts. MiniApps and ExecutiveLens retain their existing image paths and source links in their page components. No generated interfaces or new outcome measurements were added.

## Verification

- product-decisions-qa.mjs: 24 route/profile checks, zero failures. Chromium at 1440 light/dark, 768 dark, 390 light, 320 dark; WebKit at 390 dark. Screen selection, source zoom/focus return, old anchors, citation seeking/reset, public access boundaries, request disclosure, duplicate IDs, overflow and browser errors checked.
- case-study-slides-qa.mjs, public-only mode: all 44 Mentra source slides and three public TransFi slides decoded. Eight responsive/theme cases, keyboard lightbox, transcripts, lazy loading, old anchors, image failure/retry passed.
- Production build passed: 208 static routes, 50 project routes, one approved experience. Guarded-build check confirmed protected research, detailed CueTV screens, reports and source imports remain excluded.
- Evidence guard passed: 50 evidence records and approval states preserved; Shuffle source, scene and metadata identical to HEAD. TypeScript and diff checks passed. Design audit had no blocking findings; pre-existing CSS warnings remain.

Screenshots show the final selected decision states. mobile-interactions.webm records the phone interaction run. Reports contain the executed profiles. No matched pre-change screenshots or repeated startup measurements were collected for this content pass, so no performance improvement is claimed.

## Review limits

No successful private reviewer unlock was tested in this public-only build; no access-request email was sent. Current external product availability and live AI behavior were not tested. ExecutiveLens evidence is a website presentation and prepared transcript. Public source material does not include Mentra cohort sizes/methods or MiniApps adoption measurements. Touch/browser emulation does not replace testing physical iOS devices.
