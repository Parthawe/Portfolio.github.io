# Hexa-18 touch surface and ensemble

The creator described the top as touch inputs for flute, the middle as hand movement for tanpura, and the bottom as tabla interaction. The browser surface follows those roles: six top note buttons, a middle horizontal movement zone, and two bottom strike pads. These are online controls; their number and MIDI notes do not claim the original 18-sensor wiring. The photo-informed Hexa-18 SVG itself also accepts top taps, middle pointer movement or touch dragging, and bottom taps. The accessible controls below it provide larger targets and keyboard alternatives.

All instruments is now the default view: Hexa-18, robotic flute, mechanized harp and rainsticks. One pairing retains the focused view, and the existing individual-instrument inspection views remain available. Autoplay can use the selected pairing or all three parts together. Simultaneous parts retain independent note queues, sound channels and moving mechanism groups. Six sound channels share one AudioContext rather than creating six contexts.

The tanpura zone quantizes horizontal position to the existing 18-note demo range, suppresses repeated stationary input, captures touch dragging and releases cancelled pointers. Arrow keys, Home/End and Enter/Space provide equivalent playing. Reset restores the hand-position readout. Playing strength remains visible without opening the alternate note keyboard.

Mobile status and caption space is reserved, and the live duet is excluded from browser scroll anchoring. This prevents playback controls and status changes from moving the hand-input target underneath the finger. The final touch cancellation check measured zero pixels of target movement after playing began.

## Verification

- Production TypeScript/Vite build and 207 route entrypoints passed. No deploy.
- Six ensemble profiles passed: Chromium and WebKit, desktop dark, mobile light and mobile dark with reduced motion. Checked flute touch, tanpura movement, native Chromium touch dragging, keyboard position, both tabla strikes, direct SVG input, four/two-figure modes, simultaneous six-voice playback, three responding mechanisms, stop/reset and viewport fit. WebKit uses native button taps and mouse movement; continuous native touch dragging was tested in Chromium.
- The existing six-profile duet suite passed again, covering manual notes, custom scores, both response styles, pause/resume, stop, reset and individual-workshop round trips.
- Final native Chromium checks passed touch cancellation/re-entry using the same viewport coordinates, zero target layout shift, keyboard limits, reset position, visible strength control, focused mode, four individual tabs and return to ensemble.
- Lifecycle check: three rapid manual inputs produced three replies, zero idle DOM mutations over 900 ms, zero extra GPU contexts, and zero subsequent audio starts offscreen or under an injected hidden-document state. Sounds and response algorithms remain illustrative browser synthesis, not the installation’s trained model or recorded instruments.
- Screenshots, a simultaneous-response frame, an interaction recording and JSON reports are attached. Individual source geometry, Shuffle and homepage files remain unchanged.

Run `npm run qa:jugalbandi-ensemble` and `npm run qa:jugalbandi-duet` with the production preview at port 5211, or set `QA_BASE_URL`.
