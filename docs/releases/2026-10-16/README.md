# Release candidate · October 16, 2026

Prepared from production commit `39d242de54d52f76007bd637f50fdd3c8b439da7` on `release/case-study-quality`. This is a pre-deployment package. No merge, workflow dispatch or deployment is authorized by this preparation.

## Included

- Original-screen and decision-led case studies for Mentra, MiniApps, TransFi, ExecutiveLens, Raahi, ZentiPay, Office of Diversity, Jugalbandi, Enigma, Moniac, VJ Parivar, Glassly, Clawed, OrgDashboard and Health App.
- Evidence corrections and concise practice entries where original material is thin.
- Shared source viewers, report/slide controls, reading-mode behavior, retry focus, lazy image loading and access-form clearance.
- Previously pending stable navigation, About recognition, book reader, Notes presentation, Ask Parth panel and Easter AI entry.
- Source provenance, screenshots, interaction recordings and targeted quality checks.

## Release boundaries

The unfinished footer remains in the local preview only. Production `Footer.tsx`, `FooterContent.tsx` and `footer.css` are unchanged. Experimental crowd code, styles and artwork are excluded, and a build guard checks that they do not reappear in bundles.

Shuffle source, rendering code and registry entry are unchanged. All 50 experience approval states are preserved. No backend, production-secret or dependency-lock changes are included. Private research and unavailable reviewer material remain excluded from the built site.

The source preview at port 5222 is preserved. Port 5230 serves this isolated built candidate, including the production footer. The local candidate uses the existing CI-only reviewer-code hash to exercise form behavior; it contains no production reviewer code. Deployment builds read production configuration from the existing GitHub environment.

## Verification

The candidate installed successfully using the frozen lockfile. Production compilation generated 208 static route entrypoints. Approval, source, protected-asset, exact-footer, analytics, cursor voice, network-policy and hero-lighting/preload checks passed during preparation. Broader production-mode checks and hosted CI results are recorded in `verification.json` when complete.

The new PR reading job checks the approved source and footer boundaries against the pull request's base SHA, rather than comparing a candidate to itself. Existing PR verification and experience jobs remain enabled. The production deployment workflow is unchanged and runs on `main` pushes or an explicit dispatch; this branch and a draft PR do not deploy it.

## Known non-blocking limits

Mobile Arc period navigation is still top-heavy. Original health and organizational product implementation evidence remains unavailable where documented. Browser checks use emulation rather than physical iPhones. This release does not certify live hardware, inference accuracy, external product availability or user-study outcomes.

## Merge and deployment gate

Before merging: require all PR checks to pass, inspect the final diff against the captured base, reconfirm the footer and Shuffle guards, and obtain the user's instruction to proceed. Do not merge or deploy as part of this preflight.

After an authorized merge: wait for GitHub Pages deployment and production verification, then inspect Home, Work, the changed case studies, access boundaries, chat entry, the production footer and Shuffle on the live domain.

## Rollback reference

The currently successful production workflow is run `38856538072`, for `39d242de54d52f76007bd637f50fdd3c8b439da7`. If an eventual deployment fails, revert this PR through the normal review workflow to restore that code and let the standard Pages workflow redeploy it. Do not rotate or overwrite environment configuration as part of a code rollback.

## Preflight fixes and review evidence

Mobile Safari exposed a chapter-dock overlap while submitting the reviewer form. The dock now stays hidden for the visible access section, including after input blur. Invalid-code feedback and the request-access disclosure passed in all six product-review profiles. The legacy Jugalbandi harp link again contains its lazy study; all 12 stage/harp scroll-story profiles passed.

The broader tests were updated to follow the current Mentra decision chapters and the concise practice-entry structure. Their focus, old-link, access-boundary and media-recovery assertions remain in place. Software WebGL compilation blocked a layout-test browser for around 20 seconds. Logo/card CSS checks now explicitly use the WebGL-unavailable path; dedicated hero checks retain actual rendering, startup, fallback, idle and offscreen assertions. Product rendering, visuals and timeouts are unchanged.

Review captures: [Safari access form](evidence/access-form-webkit.png), [Mentra decisions](evidence/mentra-desktop.png), [Jugalbandi harp](evidence/jugalbandi-harp-webkit.png). Existing project review folders retain source comparisons and interaction recordings. Hosted CI uploads its own build and browser diagnostics. Follow [PR #19 checks](https://github.com/Parthawe/Portfolio.github.io/pull/19/checks) for the latest commit; do not infer a passing result from this report alone.

## Content questions retained for review

A separate inventory used an older checkout. Reconciliation against this candidate found the following unresolved source questions. No dates, authorship, quotes or measurements were invented to close them:

- The creator confirmed The Point CDC as 2024. The registry year and summary timeline now match About and the case-study header.
- Mentra's source-led chapters distinguish first-use and runtime figures and state that cohort details and dates are unavailable publicly. The creator will provide the beta-tester quotation record. The quotation is withheld from public Home and Mentra views until its attribution and publication context are reviewed; Home also reuses registry figures without the full source context. Review these existing claims before publishing new application material.
- The creator's direct explanation establishes the Hexa-18 flute → robotic flute, tanpura → harp and tabla → rainsticks mapping. The exact original sensor split, wiring and collaborator/performer credits remain unverified. Browser behavior is identified as an adaptation.
- Enigma now explicitly withholds recognition accuracy, latency and audience-learning claims. Its exact contribution and image-credit wording still needs confirmation from the original build/documentation record. A photography credit is not evidence of co-authorship.

These are content limitations, not automated-test failures. Keep them visible during release review; passing CI cannot establish the missing facts.

The in-app browser also reproduced an existing hero recovery defect: runtime degradation while the web was expanded left its overlay active after the renderer unmounted. The fallback now clears the expanded state, restoring the still, title and interactions. The home-loading regression exercises this transition explicitly. macOS headless attempts with the default backend and a Metal override exceeded the existing 20-second startup assertion; neither is counted as a pass. The backend override was removed. An earlier Linux CI run passed the dedicated first-frame, idle, offscreen and fallback checks; the new expanded-fallback assertion is part of the final CI run.

[Normal hero after expansion and Escape in the in-app browser](evidence/hero-in-app-after.png). This capture verifies normal recovery; the forced performance-fallback regression is verified separately by CI.

## Final CI corrections

Run `38971826645` passed the complete experience job, the forced hero fallback regression, and the reading/recovery suites through the last navigation assertion. Linux exposed a real 2px Work/About navigation-width change (224.5625 to 222.5625). Labels now reserve their semibold width while retaining the existing inactive weight; three local layout/recovery profiles passed after the fix.

The broad 164-profile scan found only 18 presentation-contract failures: the nine concise practice entries, each checked on desktop and mobile, were still required to have full case-study heroes. Their explicit alternative contract now requires a title, exploration, source boundaries, concise text, no substituted media and documented onward links. Those 18 checks passed locally. Normal case studies retain their original presentation requirements. The complete suite must still pass on the final PR commit.

[Forced expanded-hero fallback after the fix](evidence/expanded-fallback-after.png) and [stable Work navigation](evidence/stable-nav-work.png). The earlier Work-page Lighthouse sample scored 47, 75 and 75 for performance (median 75); accessibility, best practices and SEO were 100 in all three runs. It passes the repository's current median budget of 70, but the first-run score remains a concern. This is not a before/after performance claim. Raw scores and timestamp are in `preflight-performance-sample.json`.

Run `38973837351` passed reading, experiences and all 164 rendered-route profiles. The general job stopped because the hero fault test attempted to open an already-degraded scene a second time. Fault recovery now uses a fresh document and records that the expanded class was actually reached before asserting fallback. The original renderer, idle, Escape and offscreen checks remain unchanged; no product guard or startup assertion was relaxed.

## Deployment preparation

The complete CI run [38975515476](https://github.com/Parthawe/Portfolio.github.io/actions/runs/38975515476) passed on `881225ce9cbdbb6f6d243adabbbbd17a3df092ed`: general verification, curated experiences and reading/recovery. It includes 164 rendered profiles across 82 routes, real-renderer hero fallback, desktop/mobile mechanisms, Safari access handling and mocked chat recovery. The follow-up quotation removal must pass CI again before the PR is ready for review.

The final Work-page Lighthouse sample was 45, 73 and 74 (median 73, current budget 70); accessibility, best practices and SEO were 100 throughout. The first run measured LCP at 17.2s and blocking time at 1.55s; subsequent runs measured LCP near 6.54s and blocking time at 165ms / 94ms. The cold run transferred 4.48 MiB, compared with roughly 1.10 MiB on the third run. These are runner-specific diagnostic results, not field measurements or a verified before/after regression. The raw reports identify the Mentra Work cover as the LCP element, rather than the homepage WebGL scene. Further optimization needs a controlled baseline comparison before altering release rendering or image scheduling.

Before an authorized deployment, verify the exact reviewed PR head is green, confirm the target remains main, preserve the footer/Shuffle/access guards, and use the existing deployment workflow. After deployment, wait for its production verification job, then inspect Home, Work, Mentra, the changed mechanism experiences, access rejection, the retained Game Boy and footer on the live domain. Confirm the deployed commit matches the merge result and capture the live verification URL. Keep the rollback commit above available; do not change production configuration to roll back a code release.

This preparation does not authorize merging or publishing. The isolated candidate remains available at port 5230, and the unfinished-footer preview remains at port 5222.
