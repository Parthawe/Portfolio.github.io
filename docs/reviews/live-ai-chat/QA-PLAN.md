# Live AI chat verification

Keep all work local; no deployment, backend changes or experience promotions.

- Verify the existing deployed endpoint with local-origin CORS and a real non-fallback model response.
- Enable that public endpoint in ignored local configuration. Never copy API keys into client code.
- Test real desktop Chromium and mobile WebKit conversations, follow-up context, rendered responses, draft persistence, reopening, keyboard/touch, loading and viewport fit. Save network status/model/duration and recordings separately from mocked tests.
- Test HTTP failures, rate limits, malformed/empty responses, timeout, server knowledge fallback, retry without duplicate questions, preserved drafts, New chat during a pending answer, missing chat files, and protected-page payload exclusion using intercepted requests.
- Match the question-length limit to the existing 800-character server contract.
- Check the shared chat UI, scrolling, existing Figma panels, access boundaries and production build. Retain the approved Shuffle simulation.
- Record factual grounding problems found in the answer context and use the existing case-study evidence to correct them.

Desktop/mobile here means browser testing, including WebKit touch emulation, not a physical iPhone claim.

## Issues found during verification

- The existing local build had AI disabled; the deployed public endpoint returned genuine Gemini output with the local origin accepted.
- The old composer accepted 2,000 characters while the deployed server accepts 800.
- Portfolio-note fallbacks had no way to retry a live answer, and retry after navigating needed to preserve the original question's project route.
- Empty replies and server-side portfolio-knowledge replies needed accurate fallback provenance.
- A failed chat-module download stayed cached in mobile WebKit across reload. Recovery now refreshes the same-origin chat file before reloading, with a bounded failure state and saved question.
- Real generated answers included single-emphasis Markdown that the old renderer displayed literally.
- Older Jugalbandi notes described a different interaction. Even with corrected narrative notes, a repeated live follow-up omitted the tabla-to-rainsticks mapping. Explicit verified project evidence and a precise local fallback now accompany that question.
- Enigma evidence now distinguishes the original EMNIST installation from the browser adaptation and does not invent available weights or accuracy measurements.

Failure fixtures are isolated from the real-request results. Semantic assertions on the actual model replies remain in the live suite.
