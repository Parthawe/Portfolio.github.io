# Ask Parth and website scrolling review

Local preview: http://127.0.0.1:5211/ . Nothing deployed; no experience approval changes.

## Implemented

- Raised the AI & Wearables hover label and lowered the hero action to give them separate space. Hero objects, materials and connections are unchanged.
- Added left/right docking, a draggable floating panel, pointer and keyboard resizing, and adjustable reading size. Desktop layout and text preferences survive reload. Mobile has a resizable bottom sheet; its height resets on reload.
- Fixed the welcome and reply reading position. Long answers open at their beginning rather than their action buttons. Copy and retry share a compact row.
- Replaced canned scope refusals for ordinary portfolio questions with public project evidence. Pronouns such as “he” and “your” resolve to Parth in this portfolio context. This is a portfolio assistant; it does not claim external knowledge or private project details.
- Added a rendered-section picker and local commands for up/down, top, middle, footer, previous/next section and named sections. These work without model requests. Explicit project-opening commands navigate to the actual route.
- Made chat available in standalone draft viewers and the type workshop. Canonical project context and restricted-content exclusions work on those routes too. Approved Shuffle simulation remains outside this wrapper.
- Added a visually hidden About page heading, found during the route audit.

## Live AI findings and limits

The existing public Supabase endpoint sometimes returned HTTP 200 with a reply cut off mid-sentence. Two successive attempts at “What makes him different as a designer?” ended in fragments. The browser now withholds incomplete replies, makes at most one completion retry within the existing 26-second total deadline, then shows clearly labeled portfolio notes with manual retry. It does not retry rate limits or server errors automatically.

The subsequent desktop/mobile run returned four complete generated answers, using `gemini-3.1-flash-lite`, in **1.50–3.06 seconds**. See [all four responses and timings](live-results.json). That successful sample does not erase the earlier failures; the [failed run](live-failure-chromium.json) is retained.

Local edge-handler and Vite-adapter fixes now disable Flash 2.5 thinking for these short grounded replies, allow 1,024 output tokens, reject non-STOP or incomplete panel results, and exclude thought parts. The old 520-token fallback without a thinking budget is consistent with the observed truncation. Google's [thinking documentation](https://ai.google.dev/gemini-api/docs/generate-content/thinking) explains that reasoning and visible output share the budget.

**The server fixes are not active on the deployed Supabase endpoint.** They were tested locally with mocked Google transport. No Gemini key was added to the client, and no backend was deployed. The local frontend still uses the existing public endpoint; its completion safeguard is active in this preview.

## Verification

| Check | Result |
|---|---|
| Desktop Chromium 1440 light / 1024 dark; mobile WebKit 390 light/dark; Chromium 320 light | Five layout, input, navigation and fallback profiles passed |
| Pointer drag, keyboard movement/resize, docking, text sizing, persistence and reset | Passed |
| Mobile bottom-sheet resize and 430px short viewport | Passed in browser emulation |
| Scroll walk through 74 public routes on desktop and mobile | 148 page/profile checks; no horizontal overflow, incomplete scroll traversal or uncaught browser errors |
| Chat entry, section collection and Back to top on eligible routes | Passed during the route walk |
| Approved standalone Shuffle | Chat absent; simulation implementation untouched |
| Complete-retry / persistent-fragment recovery | Passed in Chromium and WebKit with mocked endpoint replies |
| Existing failure/retry/draft/private-context/cold-module suite | 25 checks passed with mocked endpoint replies |
| Existing page guide and compact chat suites | Passed |
| Edge handler and local Vite adapter | Budget, provider finish reason, thought filtering, fragment rejection and bounded fallback passed with mocked Google transport |
| Production build | Passed; 208 static route entries generated |
| Protected build | Private research, detailed CueTV screens, reports and source imports excluded |

The route walk used reduced motion. Actual WebGL readiness and hover spacing were checked separately at 1440×1000, 1440×768 and 1049×962. Conservative projected label-to-action gaps after the fix were **62px, 32px and 136px**, respectively. These are calculated conservative bounds, not pixel segmentation measurements. See [bounds and before/after values](hero-spacing.json).

The mobile checks use WebKit touch emulation, not a physical iPhone. The full-route pass checks scroll/layout/runtime behavior; it is not a new content audit against every project's original photographs. Forms were not submitted to external recipients. No paid service was introduced.

## Review evidence

- [Desktop floating panel](chromium-1440-light-floating.png)
- [Mobile answer position](chromium-320-light-answer.png)
- [Dark mobile expanded panel](webkit-390-dark-expanded.png)
- [Hero before at 1440×768](hero-1440-768-before.png) / [after](hero-1440-768-after.png)
- [Desktop interaction recording](chromium-1440-light.webm)
- [Mobile interaction recording](webkit-390-dark.webm)
- [Full route results](site/results.json) / [summary](site/summary.json)
- [Controls](controls-results.json) / [completion recovery](completion-recovery.json)

Source checks: `chat-panel-quality-qa.ts`, `chat-edge-completion-qa.ts`, `chat-local-edge-completion-qa.ts`. Browser checks: `chat-usability-qa.mjs`, `chat-completion-recovery-qa.mjs`, `chat-live-usability-qa.mjs`, `chat-site-scroll-audit.mjs`, `hero-label-spacing-qa.mjs`, `chat-guide-qa.mjs`, `chat-compact-qa.mjs`, `live-ai-chat-recovery-qa.mjs`, `guarded-build-qa.mjs`.
