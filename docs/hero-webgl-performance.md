# WebGL hero efficiency pass

WebGL remains the default. This pass changes rendering work and resource reuse, preserving the scene's geometry, camera, resolution, lighting, shaders, glow timing, controls, and activity policy. Nothing was deployed.

## Changes retained

- Remove unused normal and UV attributes from the collapsed and expanded thread geometry. The custom shaders consume only position and curve progress. Three uploads geometry attributes even when the shader does not consume them; these uploads allocated unnecessary GPU buffers.
- Reuse thread geometry and materials across theme changes. Update the same six appearance uniforms before drawing, including the existing color object. Previously a theme switch rebuilt every thread and allocated 900 GPU buffers in the collapsed scene.
- Stop recomposing identity local matrices on static thread meshes. Their parent transforms still update normally.
- Skip the grid when its fade is exactly zero. Its original shader discarded every fragment in that state, but still ran over a full-screen plane. Expanded threads with exactly zero fade also skip their draw. Fade thresholds and nonzero rendering remain unchanged.
- Dispose thread geometries and materials when their owning collection is replaced or unmounted.

No new assets, libraries, worker, reduced resolution, simplified geometry, or altered material parameters are required.

## Measurements

Matched optimized builds on localhost, headed Chromium 151.0.7922.34, 1440×1000, dark initial theme, fresh contexts, HTTP cache disabled, no CPU/network throttling. Four trials per build with alternating order. The baseline is the complete workspace build saved before this pass, including earlier pending changes. Build processes were not running during the measurements.

| Measure | Before | After |
| --- | ---: | ---: |
| Median hero readiness | 1,721.55 ms | 1,594.95 ms |
| Readiness range | 1,427.20–2,072.60 ms | 1,556.40–1,704.00 ms |
| Startup GPU buffer creations | 1,312 | 948 |
| New GPU buffers on dark-to-light switch | 900 | 0 |
| First-frame draw calls in frozen visual fixture | 352 | 351 |

The repeatable work reduction is 364 fewer startup buffers (27.7%) and 900 fewer new buffers per tested theme switch. The median readiness improvement was about 127 ms (7.4%), but two of the four paired runs were slower after the change. Treat that timing as a small local sample, not an established cross-device speedup. Driver shader caches may survive fresh contexts. No battery, GPU-duration, physical mobile, or production field measurement was made.

The buffer counts include the whole hero. Removing unused attributes accounts for the thread savings; skipping the zero-fade grid also avoids its first-frame buffer upload. Fewer buffer objects do not mean an equivalent percentage reduction in total GPU memory or total page load time. Downloaded visual assets are unchanged.

Raw samples: [hero-webgl-performance-results.json](hero-webgl-performance-results.json). Reproduce with `node scripts/hero-webgl-comparison.mjs`, setting `QA_BASELINE_URL`, `QA_BASE_URL`, and optionally `QA_OUTPUT_FILE`. Run builds separately from benchmarks.

## Verification

Both light and dark first-frame canvas PNGs are byte-identical between the saved baseline and final build. The fixture fixes randomness and freezes GPU writes after the first completed frame while keeping UI scheduling intact. It establishes first-frame equality under that browser; it is not proof of every animated frame on every GPU.

- Dark before/after PNG SHA-1: `b8261e13e7c5fe5e2f5567937de79bf39f4a50eb`.
- Light before/after PNG SHA-1: `4b927735056f7c2108023663c8f0d6fbd2019381`.
- Captures: `/tmp/hero-webgl-visual-20261014/`.
- Production home-loading QA passed desktop/mobile and both themes, reduced-motion behavior, deferred images, first-frame readiness, a single lighting-map request, idle/offscreen pause, expansion/Escape, unavailable-WebGL recovery, low-power fallback, and overflow checks.
- Existing hero efficiency checks passed: 14,680 transform/glow comparisons, interaction batching/cleanup, and asynchronous shader preparation including cancellation, context loss, deadline, and failure recovery.
- TypeScript and optimized Vite build passed. No errors appeared in the eight timing trials or four first-frame capture trials.
- Headed development checks passed WebGL in both themes: keyboard expansion, drag rendering, Escape, theme switching, idle/offscreen pause, and overflow. One light-theme attempt lost its frame counters during a page remount; an isolated repeat with no concurrent workspace writes passed. That failed attempt is retained at `/tmp/hero-webgl-interactions-20261014/results.json`; the successful repeat is at `/tmp/hero-webgl-interactions-recheck/results.json`. The remount's cause was not established, and its partial timings are not used in the comparison.

## Experiments discarded and remaining constraints

Batching transparent threads into one mesh would change their independent depth sorting; it was not retained. Inspection also confirmed that these ShaderMaterials already use a single pass, so a proposed double-sided pass optimization was discarded before final verification.

The initial CPU profile showed time inside shader initialization. Disabling production shader diagnostic log reads removed those calls but did not demonstrate a startup improvement; diagnostics remain enabled. Those reads can expose a wait for driver work, so deleting the read is not evidence that the work disappeared.

The remaining startup cost includes Three.js loading, procedural geometry creation, reflection preparation, and driver shader compilation. A larger gain requires profiling those costs on representative devices and testing a further change against the same visual baseline. The retained changes reduce known redundant work without claiming to solve every startup constraint.
