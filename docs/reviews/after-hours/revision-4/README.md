# After Hours: motion, detail and exploration

This pass develops the original coded illustration in response to Parth's request to make the preview as good as possible. The eight fictional workshop motifs remain; address-based orientation, accessories and timing make repeated sets less uniform. No external artwork, new dependency, paid service, generative image service or imported studio character was used. This remains a stylised procedural illustration, not a hand-painted film background or a perfect replica of an artist's work.

## What changed

- The gardener walks, pauses, waters and returns while carrying a can. The cat and inspection robot pause and reverse instead of teleporting across the room. The repair arm lowers, grips, lifts, carries and releases its parcel. Explicit, deterministic scene time controls every action.
- People have different clothing, ears, profiles, blinking and glasses. Clocks have twelve marks; the press has rollers and a moving flywheel; the music room has black keys and records; the repair bench has tools; the watchmaker has small parts; the tea table has cups and a curved kettle with a handle and spout. Furniture is cached separately from moving subjects.
- Dark mode uses cooler room light and physical desk lamps with warm pools beneath them. The selected-room marker remains visible. The paper/wood/plaster palette and editorial page chrome are retained.
- Zoom reaches 360%. Modified wheel zoom stays anchored at the cursor; pinch zoom also follows the fingers' midpoint. Mouse, keyboard, reset, and the directory remain available.
- Touch-capable devices get an explicit Explore by touch / Finish exploring control. Normal swipes across the canvas scroll the page; opting in enables floor pan/pinch, and finishing restores page scrolling. Detection uses touch capability so a primary mouse does not hide this option on hybrid devices. Animation and camera controls are disabled when Canvas fails, with the directory still available.

## Rendering cost and tradeoffs

The eight 544x464 static sets are shared across themes rather than duplicated. Below 85% zoom, eight additional 272x232 composite images update at 10fps and are reused across distant rooms. The normal view retains individual timing and accessories at the existing 30fps render cap. The far view deliberately shares timing and small props by motif; it is not a collection of individually authored unique rooms. Detail and phase can change when crossing this rendering threshold.

The maximum allocated RGBA area of these caches is 10,096,640 bytes (about 9.63 MiB), excluding browser, display-canvas, compositor and driver overhead. This is a buffer calculation, not a measured browser-memory claim. Both caches are cleared on disposal. No additional artwork fetch, video dependency, homepage 3D scene or independent animation loop is introduced. Offscreen/hidden pause and reduced-motion default/explicit opt-in remain.

In a local running 55% view, 58 canvas draws occurred over 2,606.5ms. Forty sampled drawing-function times ranged from 0.6 to 8.6ms. A separate artificial batch of twelve synchronous offscreen draws contained a 194.4ms outlier (other samples 4.7–11.3ms). The batch cannot establish smooth real-world pacing, and the cause of that outlier was not isolated. These observations are local diagnostics, not a device, battery, field or guaranteed frame-rate benchmark. Bundle bytes are recorded in bundle-cost.json; existing build chunk-size warnings remain.

## Verification

- Production-build interaction suite: 13 cases, including 320/390/768/1440 light/dark, no horizontal page overflow, focus, keyboard pan/home/zoom, pause/redraw, reduced-motion opt-in and preference change, touch pinch/drag, simulated hidden-document pause, actual offscreen pause, and Canvas failure with all eight directory destinations. Final assertions also require visible touch controls after mouse/keyboard use and disabled animation controls in the fallback.
- Five additional craft checks: cursor-anchored zoom, 360% close view, 200% CSS zoom/reflow in both themes, a running wide view, bounded shared static/overview caches, moving overview pixels, and real touch scrolling before/after explicit exploration. CSS zoom is reflow emulation, not native browser zoom. Touch gestures use Chromium CDP, not physical-device testing.
- Raster checks: 58,580 changed pixels during playback; zero while paused; 62,279 after reduced-motion opt-in. Fixed-time comparison changed 46,395 pixels; repeating the same timestamp produced zero unstable bytes. These prove deterministic visible motion, not artistic quality.
- Model checks: 47 coordinate/culling cases, all eight reachable motifs, 1,156 adjacent-set assertions, 6,003 continuous patrol samples, 2,001 continuous arm-position samples and 1,681 deterministic address variations.
- TypeScript, Vite build, 189 static route entrypoints, blocking design audit, guarded-build, 10 original film hashes and 14 protected source hashes pass. Caption/source uncertainties and human-review warnings are retained. Existing rendered-route QA passes desktop/mobile on the local production build with zero failures or warnings.

The interaction matrix uses the production build. Engine/atlas diagnostics import TypeScript through Vite development mode; they are labelled separately in the raw reports. Safari, Firefox, physical touch hardware and field performance remain untested. Touch controls are capability based; a real hybrid-device check remains useful.

## Review artifacts and ownership

Cloud artifacts: `/workspace/portfolio-handoff/review/after-hours-v4/`.

- `before-desktop.png` and `before-world.ts`: preserved revision 3 input.
- `playing-desktop.png`: final running light view; `desktop-dark.png`: dark view; `closeup-light.png`: 360% detail.
- `world-{320,390,768,1440}-{light,dark}.png`: production responsive/theme matrix. These screenshots retain keyboard focus from the interaction check.
- `all-workshops.png`: sixteen day/night scene views; `wide-overview-dark.png`: distant scene; `reflow-200-{light,dark}.png`: reflow checks.
- `realtime-animation.webm`: 18.24-second recording, encoded from 201 Chrome screencast frames spanning 18.163 seconds with recorded timing; wide view followed by 311% detail. Raw frames/timestamps remain in `realtime-frames/`. Representative wide and detail frames were visually inspected.
- `qa.json`, `craft-qa.json`, `motion-qa.json`, `rendered-route.md`, build/audit logs and bundle bytes provide the exact results.

Cloud remains the sole portfolio writer; local implementation stays frozen. The sealed handoff, original snapshots, separate footer/Taste Index drafts and protected portfolio features are preserved. No main push, merge, deployment, production-control change or approval promotion occurred in this pass. The earlier public production-verification failure remains unresolved; these are local preview results.
