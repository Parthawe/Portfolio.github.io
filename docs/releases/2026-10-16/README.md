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
