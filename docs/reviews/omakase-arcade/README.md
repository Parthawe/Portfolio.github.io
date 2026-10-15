# The Omakase arcade review

Draft only. No deployment or approval promotion.

## Source

- [Authors’ released game and controls](https://vill4n3lle.itch.io/the-omakase), checked 2026-10-15.
- The official itch.io embed wrapper `/embed-upload/11124779` runs the authors’ current upload, replacing the portfolio’s stale `5754166` URL.
- Original cabinet photos under `public/Assets/Projects/the-omakase/photos/`.
- Original Vimeo film and case study preserved.

## Implementation

The directory now includes this draft under Games and Tools & games. Search accepts “Omakasi” as well as the original project title. Game classification lives in the experience registry. Shuffle remains the only approved standalone experience.

The cabinet uses a flat screen to keep the actual game legible and interactive, a plywood-colored enclosure, and two eight-key legends. The keys are instructions, not fake playable controls. The actual cross-origin Unity build owns gameplay, audio and input. No original game assets or code have been copied into the portfolio.

Start mounts the hosted build. Stop removes the iframe, ending the session. Reload starts a fresh instance. Fullscreen and direct-host links provide alternate views. Unity’s own progress bar reports game loading; an iframe load event is described only as a page load, not a completed Unity boot. The site CSP permits this specific itch.io embed path in frame-src. Direct CDN embeds redirect to an anti-hotlink page, so the official wrapper is required.

Published controls replace the previous invented ingredient/sequence guide. The project’s team and role summary also now reflect the published collaborator credits.

## Verification

`node scripts/omakase-arcade-qa.mjs` checks Chromium and WebKit at desktop and mobile sizes, both themes, reduced motion, Games filtering, search, return context, all 16 keys, no horizontal overflow, zero game requests before Start, and stop/reload under simulated network failure. Screenshots, recordings and report.json accompany this review.

`npm run qa:experience-curation` checked all 50 project redirects, rejected-world handling, approved Shuffle navigation, the preview directory and noindex. Production build and TypeScript checks pass.

Mobile checks are browser emulation. The hosted game documents keyboard input and two players; no touch-only gameplay is claimed. The portfolio cannot forward synthetic controls into this cross-origin game or read its gameplay state without a supported interface from the game authors.

The real hosted build was also tested through the official itch.io wrapper in Chromium. The HTML, loader, data, framework and WASM returned HTTP 200. Unity initialized in about 5.4 seconds in one local run, with no console errors or failed requests. This is a startup observation, not a performance benchmark or a promise for other devices/networks. `npm run qa:omakase-hosted` repeats the live check; `npm run qa:omakase` runs the controlled layout/lifecycle checks.

Keyboard verification reaches the original chef/instruction screen after clicking the game canvas and pressing the published P1 key. `hosted-game-keyboard.png` records the game’s own control diagram, which matches the cabinet legend. The expanded case-study version was also checked at 1440px and 390px with all 16 keys and no horizontal overflow.

The final live run entered a match, exercised both players’ drop keys and the two belt-reversal keys, and recorded the running conveyor. See `hosted-game-playing.png` and `hosted-video/original-game.webm`. This verifies the embedded game can be operated; it is not a complete game-balance or audio audit.
