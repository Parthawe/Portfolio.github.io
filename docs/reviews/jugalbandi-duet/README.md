# Jugalbandi: playable call and response

## Project evidence and intent

The creator explained that Hexa-18 is the human-played MIDI instrument. Its top flute section calls the robotic flute, its side tanpura section calls the mechanized harp, and its inner tabla section calls the rainsticks. The existing photo-informed Anatomy drawings remain the geometry reference. No original photographs, recordings, or Shuffle assets were changed.

The default preview now shows Hexa-18 beside its matching robotic partner. Manual notes use mouse, native touch buttons, Enter/Space or the labelled A–; shortcuts. Each input queues a robotic reply. Rapid manual input preserves earlier replies, bounded to 32 pending replies. The note bank is a browser playing surface, not a recovered physical sensor map.

Autoplay accepts a demo note study or 1–32 custom notes (C3–C6, including sharps/flats and MIDI numbers 48–84). Visitors choose a complete phrase followed by its reply, or alternating single notes. Tempo, velocity, pause/resume, stop and reset work for the score. The harp’s synthesized sound starts at the animated pick-release point. The rainsticks answer the rhythm rather than claiming a pitched note.

The browser echoes the supplied score. It does not run the installation’s trained model. Sound synthesis, tuning, finger patterns, MIDI assignments and response timings remain illustrative. No original instrument samples were available or invented. Audio stays off until enabled. The original performances remain in the individual-instrument inspection view.

## Rendering and lifecycle

Static SVG geometry is memoized; moving mechanism groups update through refs. Only note/phase changes update React state. The inspection workshop mounts when opened; opening it disposes the duet and its two audio controllers. Returning starts a fresh silent duet. Mobile keeps the two figures together in a compact sticky view above the playing controls. Reduced motion preserves note/response timing and sound while leaving the mechanical transforms still.

One animation loop runs only during a manual exchange or score. Pause, reset, stop, offscreen observation, hidden-document handling and unmount cancel scheduled callbacks and stop voices. Audio nodes disconnect when ended; contexts close on unmount. No canvas or new GPU context is created. The existing lazy Jugalbandi chunk grew from 147.39 kB to approximately 151.02 kB gzipped; homepage renderer files and Shuffle remain unchanged.

## Verification

- Production build, TypeScript and 207 static route entrypoints passed.
- Pure model checks cover creator-confirmed pairings, note parsing/range/length failures, phrase ordering and note-turn ordering.
- Six browser profiles passed: Chromium and WebKit, desktop dark, mobile light and mobile dark with reduced motion. Checks cover all three callers and responders, actual oscillator/buffer starts, flute pitch equality, native touch button taps, keyboard playing, mechanical transforms, reduced motion, custom-note errors, both score styles, pause/resume, stop/reset, inspection round trips and viewport fit. No page errors.
- Three rapid manual calls produced three robotic replies. After settling, the duet produced zero DOM mutations during a 900 ms idle sample and created zero GPU contexts. Offscreen observation prevented subsequent audio starts; a simulated hidden-document state also paused scheduled audio. Visibility state was injected for that latter check, not measured on a physical device.
- All 24 desktop/mobile and light/dark physical-draft regression checks passed. The six existing individual-mechanism profiles also passed. Physical iPhone hardware and perceptual fidelity to recorded instruments were not tested.
- Desktop/mobile screenshots, a response frame, a browser interaction recording and JSON reports accompany this local change.

Run `npm run qa:jugalbandi-duet` against the preview. No deployment, public promotion or approval is included.
