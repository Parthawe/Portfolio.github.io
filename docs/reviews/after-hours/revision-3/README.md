# After Hours: softer illustration pass

Parth asked to replace the angular visual direction with inspiration from a Studio Ghibli painter, named in the request as “heroshima nasaki”. Hayao Miyazaki is a provisional interpretation, not a confirmed identity. The work uses general qualities of painted animation backgrounds: warm earth pigments, coloured linework, curved plants and people, timber, plaster and small domestic details. It is an original procedural illustration, not a replica, licensed studio artwork or a claim of equivalent artistic quality. No external artwork, image-generation service or paid service was used.

## Changes

- Replaced square heads, bodies and hands with curved silhouettes, aprons, straw hats, varied hair and smaller facial details. Walking has a slower articulated stride and breathing movement.
- Replaced heavy black furniture sides and tile outlines with coloured shadows, warm edges and gently irregular room boundaries. Arched windows, greenhouse panes, book shelves, a tea-room awning and observatory star panels vary the backdrops.
- Added curved leaves, shrubs, vines and ochre flowers. Seeded floor and plaster brush marks are deterministic and baked into cached backplates. They do not shimmer across frames.
- Steam follows curved strokes. Sprite movement uses 65ms steps rather than 90ms; existing staged workshop actions remain visible. Canvas smoothing replaces forced pixelation.
- Kept the editorial page chrome, eight workshop motifs, camera/navigation, directory fallback, motion safeguards and all unrelated portfolio source intact.

## Review and verification

Artifacts are in `/workspace/portfolio-handoff/review/after-hours-v3/`. `before-desktop.png` preserves revision 2. `playing-desktop.png` shows the new running view; `world-{320,390,768,1440}-{light,dark}.png` contains the final responsive/theme matrix. Desktop and narrow dark-mode screenshots were inspected. `realtime-animation.webm` retains timing from a 101-frame Chrome screencast spanning 9.125 seconds. Raw frames and timestamps remain in `realtime-frames/`.

All 13 browser cases passed with no page errors: eight layout/theme cases, playback/pause, keyboard camera/reset/zoom/focus, reduced-motion default and explicit opt-in, pointer drag, touch pinch, simulated document visibility, actual offscreen pause and Canvas failure with all eight directory destinations. The raster suite observed 79,310 changed pixels during playback, zero while paused and 74,665 after explicit reduced-motion playback. Its fixed-time comparison changed 50,172 pixels; repeating the same timestamp produced zero unstable bytes. These measure motion/control behaviour, not subjective quality.

TypeScript, Vite production build (189 route entrypoints), blocking design-system audit and guarded-build checks passed. Caption/source preservation passed for 10 original films and 14 protected files, with human-review warnings retained. The unchanged world model passed 44 coordinate/culling cases and its neighbour checks. Twenty local drawing samples ranged from 3.1 to 6.7ms; these are drawing-function samples, not whole-frame timing, device performance, battery tests or a field benchmark. Cached plates are 544x464 pixels each; both theme keys can retain up to sixteen plates (approximately 16 MiB of raw RGBA storage). No additional dependency or network request was introduced. Existing build bundle-size warnings remain.

This revision is saved on `codex/after-hours-art-pass`. No deployment, merge, production configuration change, approval promotion or snapshot rewrite occurred. The previous production route verification failure remains unresolved. Physical-device, Safari and Firefox testing were not performed.
