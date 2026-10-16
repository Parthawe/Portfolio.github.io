# Local chat integration

The user asked to bring over the left-side chat changes. Fetching origin found the compact chat in origin/main at 6271c74, introduced by d4cda6c. The relevant frontend files were copied into the existing dirty worktree; the branch was not merged wholesale. Existing footer, case-study, privacy, and experience-approval work remains local.

## Included

- Compact PortfolioChat panel, stylesheet, public page context, local answer formatting, conversation history, and the upstream panel timeout.
- RootLayout mounts the panel on existing eligible portfolio routes.
- The existing bottom-left cursor opens the panel. Coarse-pointer and reduced-motion users have a native button entry.
- Imported upstream chat QA scripts, with the compact test accepting QA_BASE_URL.

## Integration fixes

- Opening chat stops the old cursor tour and clears pending welcome/start timers, avoiding background tour scrolling.
- Navigation and suggested questions preserve an unsent composer draft. Sending from the composer clears it.
- Native dialog viewers suspend chat alongside existing overlays. Closing a native dialog restores it even when no CSS class changes.
- Closing returns focus to the entry button when touch/Safari did not focus the tapped button, or the previous element belonged to the hidden panel.

No backend source, AI credentials, renderer mode, footer design, or approval statuses were changed. No deployment was performed. At the initial integration, AI was disabled and browser answers exercised the portfolio-note fallback. The subsequent live endpoint verification and fixes are recorded in ../live-ai-chat/README.md. Browser emulation does not replace physical iPhone testing.

## Review evidence

The chat-local-integration-qa script writes six theme/device/browser screenshots, interaction recordings and checks.json here. The compact and existing chat scripts cover opening, page access, sizing, guided scrolling, drafts, copying, route links, reload, New chat, existing Figma panels and image overlays.

## Verification results

- Production build and TypeScript passed.
- Final chat integration: six Chromium/WebKit desktop/mobile, light/dark and motion profiles passed. Screenshots and named WebM recordings accompany checks.json.
- Existing portfolio-chat QA and four-width compact QA passed on the final build.
- Footer regression: all 36 profiles passed; evidence is in /tmp/chat-footer-final.
- Collection-return/navigation checks passed in Chromium and WebKit.
- All 50 existing experience URL redirects passed with QA_EXPERIENCE_PREVIEWS_ENABLED=1, matching the local build configuration; evidence is in /tmp/chat-curation.
- Guarded public-build check passed on the final build.
- git diff --check passed.

Local preview: http://127.0.0.1:5211/ . Open the bottom-left Parth cursor.
