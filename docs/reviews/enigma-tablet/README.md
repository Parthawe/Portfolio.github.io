# Enigma tablet review

The existing sculpture keeps its 200-light arrangement, supports, wires and open floor. The tablet's display now accepts strokes on its actual 3D surface. Enigma's controls, lighting and materials use neutral greys, black and white. Shuffle has no source changes.

Mouse, touch and pen use pointer events. Raycasting maps each event to the tablet's UV coordinates at the current camera angle. Ink remains a canvas texture on the tablet; there is no separate drawing-pad overlay. “Draw on tablet” provides a close view, and Overview restores camera navigation.

Each input light measures ink coverage in its corresponding cell of the 8 × 8 grid. Coverage receives a fixed contrast gain for visibility. The two intermediate layers retain explanatory spatial mixing. Drawing does not claim letter recognition: the rear alphabet lights a label chosen by the visitor. Editing clears that label. Typed A–Z input remains available, including after a scene failure.

Clear removes every stroke and input signal. Reset restores typed A and the overview. Interrupted strokes restore the preceding ink. Leaving the tablet breaks the segment, preventing a line across the surface on re-entry. A second pointer cannot join an active stroke. The camera stays fixed while drawing.

Verification against the local production preview:

- Chromium and WebKit at 1440 × 1000 and 390 × 844; desktop dark and mobile light; reduced motion. Mouse drawing, multiple strokes, clear, reset, typed input, labelling and angled-tablet mapping pass.
- Chromium mobile uses native CDP touch events. WebKit mobile checks touch pointer handling with synthetic pointer events; this is not a physical iPhone test.
- Normal-motion Chromium checks cancellation, secondary pointers, window blur, surface re-entry, live input before pointer release, keyboard labelling, camera recovery, forced WebGL context loss and reset recovery. No uncaught page errors.
- An idle one-second observation records zero WebGL draw calls after the scene settles. Scene rendering also stops after navigation. The startup and stroke-gesture timings in the report are local headless observations, not a device benchmark or input-latency measurement.
- All 24 existing physical-draft checks pass across desktop/mobile and light/dark. Catalog checks pass for 50 projects, including legacy redirects, the experience directory and Shuffle's approved simulation.
- TypeScript and the preview-enabled production build pass.

Run `QA_DEV_URL=http://127.0.0.1:5211 npm run qa:enigma-tablet` against a preview-enabled build. Evidence includes four browser screenshots, the overview with drawn input, a mobile interaction recording and JSON reports. This remains an unapproved draft. No deployment or public promotion is included.
