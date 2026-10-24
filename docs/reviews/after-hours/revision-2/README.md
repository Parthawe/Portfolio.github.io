# Revision 2: stronger scenes and visible activity

Status: tested local revision on codex/after-hours-art-pass. Not a new deployment. The preceding main deployment published e3827cc, but its later rendered-production verification failed. That failure remains unexplained because direct production/API requests return proxy 403 and the public workflow page does not expose the failed-route report. The saved network changes or the production-verification artifact are still needed to diagnose that release. No assumptions about unrelated failures are made here.

## Response to visual feedback

The first world had too many identical beige rooms, small figures and low-amplitude mechanism loops. This revision changes the sets and actions rather than adding decorative effects:

- Eight distinct interiors: greenhouse slates and pots, print-shop posters and ink, music rug/speakers, robotic safety markings, observatory star map, watchmaker bench, tea table/kettle/cat and suspended kinetic objects.
- Characters now walk, operate equipment, wave, drum and dance. The gardener traverses the room and pours water; the press stamps and feeds printed sheets; the robot moves a gripped parcel; steam rises and a cat crosses the tea room. These are fictional coded illustrations, not reconstructions of client work.
- A curated eight-colour lattice prevents identical neighbouring sets, including diagonal neighbours. Accessories and phase vary, but the world still has eight recurring authored motifs; it is not a limitless collection of individually drawn scenes.
- The initial view is closer: 180% desktop, 160% mobile. A smaller masthead gives the world more of the first viewport. Existing zoom, drag, keyboard and directory navigation remain.
- Negative-coordinate animation phases are normalized so modulo-based movement follows its intended path in all directions.

All artwork remains an original coded 2D illustration. No image-generation service, downloaded art, Floor796 characters or reference source code was added. Floor796 itself remains inaccessible to direct inspection here. Whether the visual style meets Parth's taste remains a visual judgment; passing raster tests does not establish that.

## Motion-control correction

Previously, reduced motion disabled Play entirely. Reduced motion still defaults to a static scene, but Play is now an explicit opt-in; Pause works normally afterward. A new preference change clears the override. A visible note explains the default. This preserves the preference while giving the visitor a choice to start the animation.

## Validation

TypeScript, production build, blocking design audit, existing guarded-build QA, ten original film hashes and fourteen protected source hashes passed. All ten analytics tests passed. The model suite passed 44 coordinate/culling cases plus 1,156 neighbouring-set checks. The browser suite passed all 13 cases with no page errors, including the 320/390/768/1440 light/dark matrix, pause, reduced-motion opt-in, preference changes, touch pinch/pointer movement, keyboard navigation, offscreen/hidden-document simulation and Canvas failure recovery. Existing rendered-route QA passed desktop and mobile with zero failures or warnings.

The new motion suite compares actual raster pixels, not just frame counters. Live playback changed 92,353 pixels between samples; Pause changed zero. Explicit playback under reduced motion changed 91,516 pixels. A matching 1000x650 view at timestamps 1000ms/1800ms changed 55,324 pixels (8.51%) versus 19,437 (2.99%) in the preserved previous version. Re-rendering the same timestamp produced zero unstable bytes. These observations establish visible deterministic motion and working pause; they are not an artistic-quality score or FPS benchmark.

Twenty local desktop draw samples ranged from 1.7 to 4.0ms. This measures the drawing function only and is not a physical-phone, total-frame, battery or field benchmark. The new route module is 18,328 bytes (7,864 gzip), CSS 4,466 bytes (1,371 gzip); no extra artwork requests or dependencies. Static sets stay cached; rendering remains culled and capped at 30fps with a 1.5 DPR limit. Offscreen and hidden animation still stops.

## Review evidence

Cloud artifacts: /workspace/portfolio-handoff/review/after-hours-v2. before-desktop.png and before-world.ts preserve the current input. world-{width}-{theme}.png covers the final matrix. playing-desktop.png shows the revised page while running. Representative screencast frames 0000, 0045 and 0097 were inspected to check the activity and composition.

realtime-animation.webm is a nine-second Chrome screencast, not a sped-up screenshot sequence: 99 captured frames, approximately 8.914 seconds between first and last capture, encoded with the recorded frame durations. It includes the walking/watering cycle, machines, drummer, cat, pendulums and a closer zoom. Raw frames/timestamps are retained. Direct physical-device, Safari and Firefox testing remain unrun.

Reproduce the interaction suite with QA_BASE_URL pointing to the preview and QA_OUTPUT_DIR set to a review folder. Run scripts/after-hours-motion-qa.mjs against the Vite development server for the engine comparison and timestamped recording. Rebuild normally for static hosting. The new scripts retain all assertions; a temporary syntax error was corrected before the successful build. Pixel comparisons run inside the browser to avoid transferring full RGBA arrays across the test connection.

No footer, Game Boy, Shuffle, other draft, original source snapshot or production-service control was changed. Deployment is held while the earlier production-verification failure remains unresolved; no new production success is claimed.
