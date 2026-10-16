# Live AI chat verification

The local website at http://127.0.0.1:5211/ now uses the same public edge endpoint already configured on the production portfolio. No backend service, credentials, deployment or experience approvals were changed. Public endpoint settings are in the ignored .env.local; no Gemini API key was added to browser code.

## Real inference

Four actual browser requests returned HTTP 200, accepted the local origin through CORS, and identified Gemini models. The tests reject the server's portfolio-knowledge fallback as evidence of live generation. Follow-up requests included the preceding conversation. Desktop tested Mentra/TransFi comparison and ownership; mobile tested Jugalbandi construction and the tabla-to-rainsticks mapping.

| Browser / width | Reported model | HTTP | Send to response | Earlier turns |
| --- | --- | --- | --- | --- |
| chromium 1440 | gemini-3.1-flash-lite | 200 | 2193 ms | 0 |
| chromium 1440 | gemini-3.1-flash-lite | 200 | 1391 ms | 1 |
| webkit 390 | gemini-2.5-flash | 200 | 2998 ms | 0 |
| webkit 390 | gemini-2.5-flash | 200 | 7660 ms | 1 |

These are four observed timings, not a benchmark or availability guarantee. Model fallback and network conditions affect response time.

## Changes

- Enabled the existing endpoint locally rather than relying on portfolio notes.
- Matched the composer to the existing 800-character server limit. Panel requests have a bounded 26-second window for the server fallback sequence; the cursor retains its 6.5-second budget.
- Empty, malformed, unavailable, rate-limited and server-knowledge responses retain accurate fallback labeling.
- Added Try live AI again. It replaces the answer, preserves the question and unsent draft, and does not duplicate the user message.
- Retry after navigation retains the original project route, omits the other page's DOM, and clears a later project's local focus.
- Failed chat-file downloads have a bounded refresh/reload path that also works with WebKit's failed-module cache. The saved question can then be retried. Retry text changes are included in live-region announcements.
- AI emphasis and inline code render safely as React text elements; assistant HTML is not interpreted.
- Replaced incorrect Jugalbandi notes with the documented human/MIDI/robotic duet. Added explicit public mechanism evidence so the tabla mapping survives follow-up questions.
- Clarified the original Enigma installation versus its browser adaptation, unavailable original weights and unavailable accuracy/latency measurements.

## Checks

- Production build and TypeScript passed: 208 route entries; catalog and footer registry checks preserved Shuffle as the sole approved experience.
- Four genuine model exchanges passed. See live-results.json.
- 25 mocked recovery/boundary checks passed in desktop Chromium and mobile WebKit. They cover HTTP failures, rate limits, malformed/empty/null responses, timeout, network abort, fallback provenance, retry, input limits, pending New chat, protected DOM exclusion, original-route recovery, Markdown and failed-module download/reload.
- 6 UI profiles passed across desktop/mobile, Chromium/WebKit, light/dark and motion settings. They cover mouse/touch entry, native viewers, Escape, focus return, drafts, navigation and overflow.
- Existing portfolio-chat, compact-chat and chat-guide suites passed, including copy, links, reload, New chat, image overlays, guided scrolling and original Figma tools.
- Guarded public-build and git diff --check passed.

## Evidence

- Desktop: chromium-1440-light.png and chromium-1440-light.webm.
- Mobile: webkit-390-dark.png and webkit-390-dark.webm.
- Actual requests and timings: live-results.json.
- Mocked failures: recovery-results.json.
- Six browser profiles and recordings: ui/.
- Test inventory and resolved findings: QA-PLAN.md.

Mobile verification used WebKit touch emulation, not a physical iPhone. The existing hosted service remains subject to its own quota and availability; the fallback path was tested without sending private fixture text to the real service. No deployment was performed.
