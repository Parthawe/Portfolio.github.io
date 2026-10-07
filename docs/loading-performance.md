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
