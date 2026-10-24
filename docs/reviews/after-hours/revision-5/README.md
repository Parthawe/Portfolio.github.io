# After Hours: contact, cadence and a reusable skill

Input: preview commit `2c9c5c2`. Parth asked to refine both the animation skill and the illustration. This pass keeps the existing art direction and concentrates on the relationships that make an action read: feet against the floor, hands against props, water against a plant, and sticks against a visible drum.

## Animation changes

- Human and cat steps follow distance travelled. The supporting foot cancels root travel during full-stride stance, the returning foot lifts, and gait strength eases into and out of rests. Feet and shadows stay in floor coordinates while the torso moves above them. Settling blends deliberately allow the stance to change near a rest; this is stylised animation, not a complete locomotion simulation.
- The rounded watering can attaches to the gardener's actual hand, including body movement, facing and the lifting/tilting pose. Fingers draw over its handle. The drawing function returns transformed hand and spout anchors in room coordinates, so attached actions do not approximate a separate pose.
- Water ramps in after the pour begins and stops before the can fully returns. The stream starts at that spout and reaches a receiving pot within the room floor. A dedicated garden route and footprint/reach checks keep the new target on the floor. Water draws visibly over the leaves.
- Both drumsticks start at the returned wrist anchors. The drummer and drum move away from the foreground wall, which previously hid the action. This was checked in light/dark close-ups.
- Root travel, foliage, fans, presses and clocks use continuous scene time. Character poses sample at 12Hz; attached sticks use those returned poses, preserving contact. The display render cap stays 30fps, with the existing 10fps shared far-view composites. Nominal pose sampling is not a promise of physical display frame rate.

## Project skill

Added [illustrated-animation](../../../../.agents/skills/illustrated-animation/SKILL.md) and linked it from AGENTS.md. It covers inspection of the actual input, staged action, contact anchors, floor stance, deliberate cadence, composition, bounded caches, accessible exploration, fallbacks and honest performance/source reporting. Four local reference links, frontmatter and repository routing were checked. The sealed portable skill files remain untouched.

The skill requires specific visual findings and preserves the distinction between tests and artistic judgment. It does not add an approval gate, external service or artist-replica claim. Future narrative Canvas work in this repository can reuse it. The new `scripts/after-hours-contact-review.mjs` captures deterministic walking/watering/turning/drumming frames in both themes for human inspection; it does not assign an art score.

## Validation and artifacts

Cloud review directory: `/workspace/portfolio-handoff/review/after-hours-v5/`.

- `before-desktop.png`, `before-world.ts`, `before-motion.ts`: preserved input.
- `contact-{walking,watering,turning,drumming}-{light,dark}.png`: eight engine close-ups with timestamps in `contact-review.json`. Walking, watering and drumming frames were inspected. Receiving-pot placement, visible water, finger overlap and the drum's visibility were checked after the edits.
- `playing-desktop.png`, `world-{320,390,768,1440}-{light,dark}.png`, `desktop-dark.png`, `all-workshops.png`, close-up, wide-view and reflow images retain the established review coverage.
- `realtime-animation.webm`: real-time Chrome screencast with timestamped frames, opening view followed by closer detail. Raw frames and `frames.concat` remain alongside it. Representative wide and close frames were inspected.
- `qa.json`, `craft-qa.json`, `motion-qa.json`, `contact-review.json`, `model-qa.log`, `rendered-route.md`, `bundle-cost.json` and build/design logs contain exact evidence. Production interaction checks use the built preview; engine/atlas diagnostics use Vite development imports.

All 13 production browser cases and five craft cases pass with no page errors. Coverage includes both themes at 320/390/768/1440px, keyboard focus/pan/reset/zoom, pause, reduced-motion static default and explicit opt-in, preference changes, real dispatched touch scrolling/exploration, pinch, offscreen suspension, simulated hidden-document suspension and Canvas failure with usable directory destinations. The craft suite also checks anchored zoom, 360% close view, 200% CSS reflow emulation and bounded caches. Native browser zoom and physical touch hardware are not established by these emulations.

Model checks pass: 47 coordinate/culling cases; all eight motifs; 1,156 adjacent-set assertions; 6,003 patrol samples; 2,001 arm-position samples; 1,681 address variations; 4,002 gait samples and 4,002 planted-foot checks; 2,401 watering/cadence samples; gait/rest boundaries; and 1,201 garden route positions plus pot footprint/pour reach.

TypeScript, Vite build, 189 static entrypoints, blocking design audit, guarded-build and existing rendered-route checks (desktop/mobile, zero failures/warnings) pass. Ten original films and fourteen protected files retain their hashes. Caption/source uncertainty and human-review warnings remain unchanged. No extra runtime dependency, art download, cache, display canvas or animation loop was added. Raw RGBA cache area remains about 9.63 MiB, excluding browser/driver overhead. Existing bundle-size warnings remain.

Safari, Firefox, physical-device, native zoom and field/battery tests remain unrun. Raster differences establish visible deterministic motion and pause, not subjective quality. Performance observations are local drawing diagnostics; synchronous-batch outliers are retained in the exact results below and must not be presented as a smoothness or device benchmark.

## Preservation and deployment

The branch remains `codex/after-hours-art-pass`. Cloud is the sole portfolio writer; local implementation remains frozen. The sealed import, all original snapshots, separate footer and Taste Index drafts, Game Boy, Shuffle and other pages are preserved. No main update, merge, deployment, approval promotion or production-control change occurred. The earlier public production verification failure remains unresolved; this review verifies the local candidate.

## Exact local observations

Raster sampling changed 60,226 pixels during playback, zero while paused, and 62,331 after reduced-motion opt-in. The fixed-timestamp comparison changed 47,236 pixels; repeating that timestamp produced 0 unstable bytes.

The recording contains 199 captured frames spanning 18.025 seconds, encoded as an 18.12-second WebM with recorded timing. The normal-view drawing samples span 3.4–9.8ms. A running 55% overview drew 50 frames in 2337.1ms; its drawing samples span 0.7–8.5ms. The separate twelve-draw synchronous batch retains a 114.8ms outlier. Its cause was not isolated; these results do not establish field FPS or per-device performance.
