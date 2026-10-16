# Work and project experiences navigation

The Work page’s “Explore project experiences” link now opens `/experience-preview`. `/project-experiences` and `/physical-worlds` redirect to that collection when previews are enabled, preserving filters. Preview-disabled builds retain the approved-only directory and exclude preview routes.

The collection is titled “Project experiences” and uses the existing Nav, Footer and RootLayout. The main navbar stays unchanged; Work remains its active section. A Work / Experiences switch provides the return route. The shared footer now includes Experiences. Individual experiments retain their existing focused layouts, with collection return links labelled “All experiences.” Prototype footer returns now retain the active filter/search.

Shuffle links directly to its approved simulation. The other 19 entries remain marked as previews awaiting review. No registry approval statuses, Shuffle behavior, restricted content, homepage hero code or deployment settings changed. The collection retains noindex.

Verification:

- Production build and TypeScript checks.
- `scripts/experience-navigation-qa.mjs`: Chromium/WebKit desktop/mobile emulation, light/dark screenshots, shared navbar/footer, mobile menu, Work round trips, 20 links and old collection redirects.
- `scripts/experience-directory-qa.mjs`: six browser/viewport/theme combinations, all card images, categories, search, empty state, keyboard activation, back navigation and image failure recovery.
- `scripts/experience-directory-return-qa.mjs`: Chromium/WebKit filter/search persistence, reload, next-project navigation, prototype footer return, original evidence links and invalid filters.
- `scripts/experience-curation-qa.mjs`: 50 project redirect checks, access-preserving case-study destinations, preview directory and approved Shuffle simulation.

Screenshots and navigation report accompany this review. Mobile results are browser emulation. Nothing deployed.
