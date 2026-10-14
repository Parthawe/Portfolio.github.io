# Further WebGL hero optimization

The 180 collapsed connecting strands now share one ShaderMaterial on WebGL. Each retains its original geometry, object identity, transform, transparent depth ordering, speed, and phase. Immediately before each draw, its glow center and fade are assigned and `uniformsNeedUpdate` requests the upload. This reduces repeated material construction and renderer state bookkeeping without merging transparent geometry or changing any shader equations.

Appearance updates and disposal visit each distinct material once. The PR also includes the preceding local WebGL pass: removal of unused thread attributes, geometry reuse on theme switches, static thread matrices, zero-fade draw omission, and resource cleanup. See [the preceding measurements](hero-webgl-performance.md).

This branch excludes the local WebGPU experiment and unrelated case-study work. WebGL remains the production renderer. Nothing has been merged or deployed.

## Additional measurements

Four alternating trials per build, headed Chromium 151.0.7922.34, 1440×1000, fresh contexts and disabled HTTP cache, no network or CPU throttle. The baseline already includes the preceding WebGL pass. No build or asset processing ran during this final measurement set.

| Metric | Previous WebGL pass | Shared thread material |
| --- | ---: | ---: |
| Median hero ready | 1,519.4 ms | 1,413.8 ms |
| Readiness range | 1,370.0–2,009.9 ms | 1,376.1–1,672.7 ms |
| Median main-thread task time during 3-second pointer stimulus | 1,129.1 ms | 995.9 ms |
| Startup GPU buffer creations | 948 | 948 |
| New buffers on dark-to-light switch | 0 | 0 |

The sample medians improved by approximately 7% for readiness and 12% for interaction task time. Individual trials varied substantially; this is not evidence of a fixed cross-device gain. CDP TaskDuration includes the page's main-thread work, not just hero code. The synthetic pointer stimulus is not a user-input latency or field INP benchmark. Draw totals vary with scheduling; GPU execution time and power were not measured. Driver shader caches can persist across browser contexts. Do not add these percentages to the preceding pass's timings: they are separate comparisons.

Raw results: [hero-webgl-round2-results.json](hero-webgl-round2-results.json). Reproduce with `QA_BASELINE_URL=... QA_BASE_URL=... QA_OUTPUT_FILE=... node scripts/hero-webgl-comparison.mjs` against optimized builds, with other builds and benchmarks stopped.

## Visual and functional verification

First-frame PNGs match byte for byte in light and dark themes. Additional frozen snapshots at elapsed-time inputs 0.75 and 2.5 seconds also match in both themes, checking different per-strand glow values with the shared material. The fixture replaces clock reads only in intercepted test responses; shipped code is unchanged. These are sampled visual comparisons, not an assertion about every frame on every device.

The phase fixture is reproducible with `QA_HERO_TIME=0.75 QA_REQUIRE_IDENTICAL=1 QA_BASELINE_URL=... QA_BASE_URL=... node scripts/hero-instancing-visual-qa.mjs`; repeat at 2.5. The ordinary frozen first-frame fixture omits `QA_HERO_TIME`.

Example verified captures: [dark](performance/hero-webgl/dark.png), [light](performance/hero-webgl/light.png).

The isolated PR build passes TypeScript, the complete production build, blocking design audit, hero efficiency/shader-recovery checks, and homepage loading/interaction/fallback QA. The existing design audit's nonblocking refactor warnings remain. Performance runs recorded no page errors. Mobile/reduced-motion policies, idle/offscreen pause, geometry, camera, lighting, pixel ratio, and original asset downloads remain unchanged.

## Rejected asset experiment

Alternative lossless row predictors compressed the existing lighting map from 965,763 to 961,687 bytes at best, a 0.42% saving. That did not justify a new format and decoder path. The original file and decoder remain unchanged. No lower-resolution reflections or lossy encoding were substituted.
