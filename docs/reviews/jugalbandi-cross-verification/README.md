# Jugalbandi desktop/mobile cross-verification

## Defects corrected

- Pause now suspends the shared audio clock and freezes the mechanical pose. Resume continues the existing audio sources and score; it does not discard or restart the current sounds. A deliberate manual note after pausing resumes the audio context and replaces the paused phrase.
- Tanpura movement keeps its rate limit but delivers the final pending note. Rapid drags no longer leave the played note behind the position readout. Pending gesture callbacks are cancelled on stop, reset, pause, blur, visibility change and unmount.
- Top flute and bottom tabla inputs trigger on pointer-down, including secondary touch pointers. Keyboard and assistive click activation remain available without firing an extra note for the same pointer press. Three-finger input can drive all parts together.
- Each part keeps its own active-note feedback. A flute reply can no longer mark a tabla or tanpura input as active.
- Input strength is captured in each score event, and the robotic reply uses that same strength. Moving the strength slider before a queued reply no longer changes the existing note’s response strength.

No drawing geometry, original recording, Shuffle or homepage source was changed. No deployment.

## Browser and audio evidence

Six detailed profiles passed: Chromium and WebKit, desktop at 1440 × 1000 in dark mode, mobile at 390 × 1000 in light mode, and mobile at 390 × 844 in dark/reduced-motion mode. Checks cover the actual mixed audio graph, all six caller/responder sound starts, one shared AudioContext, three robotic responses, freeze/resume of current audio and motion, stop silence, rapid-swipe endpoints, independent feedback, manual override after pause, viewport fit and reduced motion.

The audio test routes the actual instrument filters through an AnalyserNode into the normal destination. Measured mixed peaks in these snapshots ranged from 0.0684 to 0.0797, below clipping. Audio currentTime advanced by exactly zero during the paused sample in every profile; resume reused existing source nodes. These are signal/behavior checks, not a listening assessment of instrument realism.

Native Chromium touch injection also checked a finger on the tanpura area while two other fingers pressed flute and tabla: all three caller notes and all three replies occurred. Continuous native touch was tested in Chromium. WebKit mobile uses native button taps plus pointer/mouse movement. No physical iPhone or Android hardware was tested.

Both Chromium and WebKit recovered from a deliberately rejected initial AudioContext.resume call. The visual duet continued silently, the retry restored audio, and no page errors occurred. A separate gain check used strength 32, then changed the slider to 120 before the answer: both caller and robotic reply retained the original 0.030236 gain target.

## Regression and lifecycle

The existing six-profile score suite passed: note input, custom-note validation, phrase replies, alternating notes, tempo, pause/resume, stop/reset and individual-view round trips. All 24 desktop/mobile and light/dark physical-draft regression checks passed. The native gesture cancellation/re-entry test passed, with zero pixels of mobile input-target shift. The lifecycle test produced three replies to three rapid calls, zero idle DOM mutations over 900 ms, no GPU canvas, and no subsequent source starts offscreen or under an injected hidden-document state.

TypeScript, the production build and all 207 static route entrypoints passed. The lazy Jugalbandi chunk is 153.40 kB gzipped (previously 152.92 kB). Screenshots, the interaction recording and detailed JSON results accompany this report.

Run `npm run qa:jugalbandi-verify`, `npm run qa:jugalbandi-duet`, and `npm run qa:jugalbandi-ensemble` against the production preview. `QA_BASE_URL` and `QA_OUTPUT_DIR` can override defaults.
