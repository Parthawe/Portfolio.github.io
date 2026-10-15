# Black Hole: moving Time Trap clocks

The source photograph (`public/Assets/Projects/black-hole-assets/time-trap.jpg`) shows the central sphere and two physical clocks. The case study describes moving a clock closer to the black hole and watching its second hand slow down.

The preview now starts both clocks on entry. The left clock remains the reference. Drag the right clock toward or away from the sphere, or use the Clock distance slider. Hand angles accumulate independently, so changing distance preserves their positions. A shorter minute hand helps distinguish the moving second hand. Reset restarts the demonstration. Rates remain illustrative and accelerated, with that explanation visible below the model.

Direct dragging uses a ray-plane intersection in model space and captures the pointer. The reference clock no longer changes the adjustable clock when dragged. Reduced-motion mode starts still and offers a one-step control that advances the two clocks by their respective rates.

## Verification

- Production build and all 207 static route entrypoints passed.
- Six browser profiles passed: Chromium and WebKit, desktop dark, mobile light, and mobile dark with reduced motion.
- Checked autoplay, measured near/far angular speeds, continuous positions when distance changes, direct dragging, keyboard distance adjustment, pause, reset and viewport fit. Chromium mobile dragging used native CDP touch input; WebKit direct dragging used mouse automation. No physical iPhone test was performed.
- Measured the nearest clock at 0.15 times the reference angular speed and the farthest at 1.0 times, within a 0.01 tolerance.
- Activity check measured 1.0003 reference radians per wall second, zero offscreen or simulated-hidden-document advancement, and zero render-state mutations during an 800 ms paused sample after settling. The hidden-document check injects the document visibility state; offscreen observation uses the actual IntersectionObserver.
- All 24 physical-draft regression checks passed across desktop/mobile and light/dark themes. No browser page errors were recorded. Shuffle source and the homepage were unchanged.

Run `npm run qa:black-hole-time-trap` against the production preview; `QA_DEV_URL` and `QA_OUTPUT_DIR` can override the defaults. The screenshots, interaction recording and JSON reports here capture this local build. No deployment or public approval was performed.
