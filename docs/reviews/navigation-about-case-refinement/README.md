# Navigation, About, case-study and Notes refinement

Local preview: http://127.0.0.1:5222/ . No deployment, PR, public push, access-policy change or experience promotion.

## Changes

- Work: right-align the experience link and role summary on desktop; retain left alignment on mobile. Editorial / Index / Arc now live under the Work title at every size.
- Navigation: remove deep-scroll scaling and the Work-only extra controls from the main pill. Its size and left edge stay stable through scroll and route changes.
- About: replace decorative award cards with the original seven recognition records; combine Code with Design and agent practice; retain the dated usage snapshot in a disclosure. Add a link from Experience to the original 2022 portfolio.
- Book: remove blocking whole-page loading; preserve the flipbook on desktop; provide a full-width single-page phone reader, page selector, scoped keyboard controls, retry, and original PDF link. Start after four pages, retain progressive loading. The source PDF remains unchanged (about 17 MB); not all 62 pages were manually reviewed.
- Mentra: add nine source-grounded chapter introductions. Shared presentation reader now uses scroll snap with next/previous and arrow-key controls, readable source text and original-size links. All source slides remain. TransFi reuses the reader; access contracts and protected data imports are unchanged.
- Notes: display six examples only in an unconfigured local preview, with one explanatory notice. Remove repeated per-card Sample badges. Examples remain explicitly distinct from real visitor notes and never enter the comment store.
- Motion: bounded 620ms proof-unfolding sequence for selected evidence and records. Default content remains visible, reduced-motion skips animation, hidden tabs cancel it, route cleanup disposes observers. Shuffle routes are excluded. No new animation framework or WebGL context.

## Verification

TypeScript and full production build passed; 208 route entrypoints, 50 catalog projects, still one approved experience. Browser QA passed at 1440 light, 768 dark and 390 light: stable nav geometry, correct Work alignment, seven recognition records, combined Code section, six local examples, no horizontal overflow, Mentra slide controls/source text, book failure/retry, reduced motion.

Normal-motion check passed: actual proof animations invoked, local note survives reload, original PDF first pages rendered, next/page-select/scoped keyboard navigation worked. Phone reader changes pages at full width. Desktop and mobile screenshots inspected. interaction-check.webm records the original-PDF and interaction checks; emulation does not replace physical-device testing.

Design scan found legacy style warnings. Removed the obsolete award shelf styles. Existing unrelated About styles were not redesigned.

## Scope limits

This batch improves shared presentation and Mentra’s narrative; it is not a claim that all 50 case-study narratives have been rewritten or individually re-audited. No new interviews, metrics, awards, product interfaces or visitor quotes were invented. Existing hardware experiences and approved Shuffle source were not edited. No full startup/frame-time benchmark was run for this finite-motion pass.
