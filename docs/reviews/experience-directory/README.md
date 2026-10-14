# Experience directory review

The draft directory now uses the project's existing Work cover artwork, a three-column desktop grid and a one-column phone layout. Each full-card link has a project-specific action, a format label, an explanation and its source/simulation limitation. This keeps the page related to Work while distinguishing things to try from case studies to read.

The directory includes format filters with counts, search, a recoverable empty state and a failed-image fallback that retains the clickable project action. It continues to expose only the existing eighteen draft routes; approval status and public redirects are unchanged. The stale reference to sixteen stage casters was removed in favor of the documented caster rings.

Validation: production build and TypeScript; all eighteen cover images and unique route destinations; Chromium desktop, Chromium touch and WebKit mobile in both themes; filter counts, search, clearing empty results, Enter-to-open navigation, no horizontal overflow, and missing-image recovery. Run `node scripts/experience-directory-qa.mjs` against port 5211 or set QA_BASE_URL.

No project experience, Work page, homepage, or deployment settings were changed.

## Browsing follow-up

Filter/search state now lives in the collection URL. Draft links carry that context through previous/next navigation and every All drafts link. URLs are reconstructed only from the collection's kind/q parameters; no arbitrary return destination is accepted. Unknown filters fall back to the full collection.

Every card has a separate original case-study link, avoiding nested interactive elements. Jugalbandi and Revolving Stage also link directly to their preview-gated scroll explanations. The collection keeps an explicit Clear filters action.

The production build, six existing directory profiles, and an additional Chromium/WebKit return-path suite passed. The latter covers reloads, filtered returns, next-draft context, clearing, case-study links, mechanism deep links and invalid filters. Run `scripts/experience-directory-return-qa.mjs` for these checks.
