# Loading performance, October 7, 2026

This pass is local and unpublished. It preserves the existing hero geometry, materials, lighting, camera, pixel ratio, colors, typography, layout, and interaction controls.

The homepage previously waited for its deferred mount before requesting the hero module. The module then requested its reflection map, while eager/high-priority project images and native lazy loading fetched material well below the first viewport. The hero reported readiness when its renderer was created, before it drew the scene. The runtime performance monitor could also mistake first-load shader work for sustained runtime pressure.

## Implemented

- Begin the hero module and reflection-map requests together once capability checks permit the scene. Renderer creation keeps its existing deferred mount. No 3D warmup runs for reduced-motion, low-power, emergency, or unavailable-WebGL paths.
- Share the reflection-map URL between preload and renderer. Browser QA confirms one request, not duplicate downloads.
- Report readiness after the first scene advance returns. Allow up to 15 seconds for a healthy slow load; failed module imports select the existing fallback immediately.
- Exclude bounded scene startup and the existing 2.2-second warmup from sustained runtime-pressure assessment. The startup deadline remains capped at 15 seconds. Runtime, device, and emergency fallback thresholds remain intact. Buffered startup tasks do not count against later runtime windows.
- Give homepage project cards a 600px near-viewport loading margin. Their layout, images, hover media, loading treatment, links, and brightness handling are unchanged. Once loaded, media stays loaded when scrolling away. Other project-card callers retain their existing behavior.
- Compress the existing Nikolas font to WOFF2 and preload it. Keep the original OTF fallback. Size: 122,316 → 29,880 bytes. Glyph order, CFF outlines, metrics, kerning, names, and metadata tables are identical; only the container checksum and WOFF2 flag differ. Generated with FontTools and Brotli 1.2.0.
- Use lossless WebP copies for the six existing client logos. Total source bytes: 237,835 → 164,448. Dimensions, alpha, and all visible RGB pixels match their PNG originals. Original files remain available. Generated with Sharp 0.35.4, lossless encoding at effort 6.
- Release the temporary WebGL capability-test context before creating the real renderer.

## Local measurements

Chromium, fresh contexts and disabled cache, 5 Mbps download, 80ms network latency, 4× CPU throttling. Desktop: 1440×1000. Mobile: 390×844 with touch enabled. Samples cover 12 seconds after navigation. Resource totals are encoded subresource bytes; they do not include the HTML navigation response. These are local diagnostic samples, not production percentiles or a battery benchmark.

| Measure | Before | After |
| --- | ---: | ---: |
| Desktop first hero WebGL draw starts | 6.44s | 5.22s |
| Desktop downloaded subresources | 2,648,565 bytes | 2,234,654 bytes |
| Mobile downloaded subresources | 989,059 bytes | 503,704 bytes |
| Desktop first contentful paint | 1.01s | 1.06s |
| Mobile first contentful paint | 0.84s | 0.86s |

The measured gains are earlier hero work and smaller transfer size. Initial text paint remains around one second. Mobile retains the existing text-only low-power hero, with no hero 3D download. Actual results depend on hardware, network, cache, and browser scheduling.

## Verification

Production build and blocking design audit passed. `npm run qa:home-loading` checks bounded startup monitoring, late task delivery, real runtime pressure, timeout expiry, desktop/mobile light/dark screenshots, deferred images becoming usable on scroll, first-frame readiness, one reflection-map request, idle/offscreen pause, web expansion, Escape, unavailable-WebGL loading, and low-power hardware fallback. The four static hero before/after screenshot pairs are pixel-identical. Font-table and lossless-logo comparisons verify that compression preserves the existing visual assets. No JavaScript page errors were observed in the browser QA. The isolated PR build also passed 197 room, case-study, and renderer-recovery checks and 160 rendered checks across 80 routes. Existing caption-review warnings and the explicit About-page heading exception remain.

Repeat the throttled measurement with `node scripts/home-loading-measure.mjs /tmp/home-loading-sample`, optionally setting `QA_BASE_URL`. Browser QA accepts `QA_BASE_URL` and `QA_BASELINE_URL`; the baseline must serve the version before these loading changes.

## Remaining constraints

The reflection map still transfers about 1.16 MB encoded, and the hero still needs the existing Three.js bundles and GPU shader setup. Smaller reflections, lower geometry detail, lower pixel ratio, or different materials could change the appearance and were not used. The application remains client-rendered, so the first HTML response cannot show the full homepage before JavaScript starts. A separate rendering and chunking pass could improve that path, but it would need route, chrome, and interaction parity checks. Production caching and real-device GPU behavior require separate verification. A rapid scroll on a slow connection may briefly show the existing card loading treatment while its near-viewport image arrives.

## Follow-up: on-demand code and resource-cost reporting

This follow-up remains local. It does not deploy the site or update PR #11.

The root layout now loads the desktop collaborator cursor as a separate chunk, within its existing pointer, viewport, and motion guards. Touch/mobile and reduced-motion visitors do not request that component. The cursor keeps its existing welcome, tour, and conversation interface; it imports the chat service when a question is submitted. A route change during that import invalidates the pending answer. Hand controls keep their existing delayed mount, while the MediaPipe JavaScript library now loads when tracking is enabled, alongside its existing on-demand initialization.

Use the production preview to assess visitor performance. Port 5197 serves Vite development modules. In the initial follow-up diagnostic, its desktop text paint took 6.81 seconds and downloaded 7.83 MB of encoded subresources; the production preview on port 5199 painted text in 0.90 seconds and downloaded 2.23 MB under the same throttling. These are individual diagnostic samples, taken before this follow-up's on-demand changes. Development-mode module sizes and request overhead do not describe the deployed bundle.

`npm run perf:cost -- /tmp/portfolio-cost-report` generates `report.html` and per-run `report.json`. Defaults are three fresh desktop samples and three fresh touch/mobile samples, with cache disabled, 5 Mbps throughput, 80 ms latency, and 4× CPU throttling. Set `QA_BASE_URL` to a local production preview; set `PERF_COMPARE_REPORT` to an earlier report JSON to display both tables. `PERF_RUNS` accepts one through five runs per profile.

The report records text paint, LCP, first hero WebGL work, scene readiness, layout shift, encoded/decoded resource bytes, main-thread task time, JS heap, sampled theme-toggle interaction latency, renderer identity, and idle/interaction/offscreen hero draw calls. First GL work can include reflection preparation and is not the visible-scene timestamp. The load snapshot is taken 12 seconds after DOMContentLoaded; unfinished requests are counted separately. Transfer totals exclude HTML, whose size is recorded separately in JSON. Lab interaction latency is not field INP. Main-thread task time is not physical CPU utilization; heap excludes texture/driver memory; draw-call counts are not GPU milliseconds or watts.

The bandwidth calculator uses user-entered cold visits and rate per decimal GB. It excludes cache reuse, subsequent navigation, video playback, HTML, and unfinished requests. It is a transfer scenario, not a hosting invoice. Actual financial cost requires provider rates and visitor traffic; actual energy use requires device power measurements.

The automated Chromium renderer is SwiftShader software graphics. The in-app browser exposed Apple M2 Pro / ANGLE Metal graphics and parallel shader support. Its scene reached readiness during inspection, but it subsequently selected the runtime-pressure fallback while broader browser QA was running. That inspection is not a real-device speed benchmark. A parallel shader-preparation experiment was removed because the automated comparison could not validate a benefit. The hero's geometry, materials, lighting, and rendering scheduler retain the first pass's behavior.

`npm run qa:on-demand` checks mobile/reduced-motion exclusions, desktop conversation loading and replies, navigation during a delayed chat-module fetch, and hand-control initialization with permission-error recovery. Permission recovery uses a vision-module fixture and denied-camera mock; it does not validate real-camera landmark accuracy. The production build, blocking design audit, cursor voice contract, homepage loading/runtime checks, navigation/motion/touch tests, and 160 rendered viewport checks across 80 routes passed. Four static hero screenshot pairs remain pixel-identical. Impeccable's mechanical detector found no issues in the three edited UI components. Existing caption-review warnings remain.

### Matched follow-up comparison

The control is the isolated PR #11 build on port 5202; the candidate is the local build on port 5199. Both use measurement version 2, with the same protocol and three samples per profile. Homepage, hero, card, logo, and runtime-monitor source files match between these builds apart from this follow-up's root/cursor/hand-loading changes. The rest of the candidate's unrelated project work remains outside the performance comparison's homepage scope.

| Median measure | Control | Candidate |
| --- | ---: | ---: |
| App-entry JavaScript, encoded | 94,779 bytes | 50,922 bytes |
| Desktop subresources | 2,235,631 bytes | 2,237,975 bytes |
| Mobile subresources | 503,467 bytes | 468,471 bytes |
| Desktop text paint | 0.928s | 0.824s |
| Mobile text paint | 0.868s | 0.800s |
| Desktop main-thread task time | 15.805s | 11.365s |
| Mobile main-thread task time | 2.924s | 3.396s |
| Desktop first hero GL work | 5.239s | 5.254s |
| Desktop scene-ready class | 6.769s | 6.446s |

The app entry is 46.3% smaller; mobile subresources are 7.0% smaller. Desktop totals remain effectively unchanged: its cursor still loads for desktop visitors, and splitting modules adds a small request/payload overhead. The desktop reflection map alone remains about 1.16 MB encoded. Timing samples vary; mobile task time increased in this run, and earlier runs showed different task-time trends. Do not treat these samples as proof of a general CPU, energy, or battery gain. Hero draw calls are zero in every idle and offscreen sample, for both builds. No page errors were captured. The report's desktop/mobile layout, calculator arithmetic, and empty-input behavior also passed browser checks.

Saved comparison: `/Users/parth/Documents/Codex/2026-07-08/performance-cost-2026-10-07/report.html`. Its `control/report.json` and `report.json` contain the matched raw samples. Earlier diagnostic reports use different readiness instrumentation and should not be mixed into this comparison. Future real-device profiling should measure cold shader startup, interactions, and sustained pressure on the actual hardware before tuning the 3D scene.

## Follow-up: hero rendering and magnetic controls

This pass remains local and leaves PR #11 unchanged. The control on port 5204 is a saved copy of the production build immediately before this pass, including the previous on-demand changes. Port 5199 serves the new build.

The morphing sculpture now renders its 367 cubes with one instanced mesh and one shared geometry/material. Instance colors and a shader attribute preserve each cube's original color and emissive intensity. The position, rotation, scale, hover delay, breathing, and scatter calculations are unchanged. A conservative bounding sphere includes the full scatter paths and spun cubes. Other sculptures, lighting, reflections, camera, resolution, and activity scheduling are unchanged.

Browsers exposing `KHR_parallel_shader_compile` prepare both the final screen shaders and the linear-color reflection-pass variants before the first scene advance. Cancellable polling checks completion without querying blocking link status, with an eight-second preparation deadline. Browsers without the extension retain the previous rendering path. Preparation failure or deadline expiry resumes normal rendering; cancellation stops polling when the scene unmounts. The temporary compilation target is disposed and the previous render target restored. The `hero:shader-preparation` performance measure records the supported path.

The in-app browser exposed Apple M2 Pro / ANGLE Metal and completed preparation with the hero ready and no runtime fallback. In a warm-cache inspection, preparation took 137.9 ms and the largest buffered startup task was 74 ms. This verifies the hardware path; it is not a controlled cold-load comparison. Automated Chromium uses SwiftShader and lacks the extension, so its startup measurements do not test asynchronous preparation. Software shader-compilation stalls remain a constraint.

Magnetic controls now register added elements within the changed subtree instead of rescanning the document after every text update. Pointer handling reads all control bounds before writing transforms. Radius, strength, transitions, and touch/mobile exclusions remain unchanged.

`npm run qa:hero-efficiency` passes 14,680 comparisons against the original cube transforms/glow, physical-shader injection checks, incremental magnetic registration and read/write ordering, and shader completion, cancellation, deadline, context-loss, and failure checks. `node scripts/hero-instancing-visual-qa.mjs` compares the frozen first rendered frame against the saved build. Light and dark canvas images are pixel-identical; first-frame draw calls fall from 1,084 to 350 and 352 respectively. Four desktop/mobile static hero image pairs are also pixel-identical. These image checks cover the first frame; the numerical checks cover motion and hover states.

The production build, blocking design audit, homepage loading/runtime checks, on-demand features, navigation/motion/touch interactions, and all 160 desktop/mobile rendered checks across 80 routes passed. Existing caption-review warnings and the explicit About heading exception remain. The mechanical detector found no issues in the four changed UI/rendering files. No page or shader errors were captured by the first-frame comparison.

### Matched rendering comparison

Three fresh samples per profile, measurement version 2 and the same throttling as above. GPU work is software-rendered in both builds. Idle and offscreen hero draw calls are zero in all samples. Pointer phases render different numbers of frames as browser scheduling varies; their aggregate counts should not be interpreted as equal-duration GPU benchmarks. Each active scene frame uses 1,063 draw calls in the control and 331 in the candidate, a 68.9% reduction.

| Median measure | Control | Candidate |
| --- | ---: | ---: |
| Desktop subresources | 2,236,757 bytes | 2,237,909 bytes |
| Mobile subresources | 468,471 bytes | 468,562 bytes |
| Desktop text paint | 0.808s | 0.800s |
| Mobile text paint | 0.804s | 0.800s |
| Desktop scene-ready class | 6.018s | 6.169s |
| Desktop main-thread task time | 10.198s | 10.644s |
| Mobile main-thread task time | 2.369s | 2.852s |
| Desktop JS heap at load snapshot | 45,889,188 bytes | 31,863,344 bytes |

Desktop heap is 30.6% smaller at the sampled snapshot. Transfer size is effectively unchanged, with a small code-size increase. This comparison does not demonstrate faster cold loading, lower total CPU use, reduced energy consumption, or lower hosting bills. Main-thread task time increased in these samples, including mobile where the 3D scene is excluded. Shader startup still dominates the software-rendered desktop load. Preserve this distinction when assessing the rendering improvement.

Report and raw samples: `/Users/parth/Documents/Codex/2026-07-08/performance-cost-hero-2026-10-07/report.html`, with `control/report.json` and `report.json`. Frozen first-frame images and draw counts are saved in its `visual/` directory. Use the production preview at `http://127.0.0.1:5199/` to assess these changes; port 5197 remains the development server.
