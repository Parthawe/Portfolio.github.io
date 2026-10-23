# After Hours: original animated world

Requested as a Floor796-inspired explorable animation floor. Plan and research limits are in PLAN.md. Route: /after-hours, linked from the Studio menu. This page is independent of the homepage and of all previously unapproved footer/Taste Index drafts.

## Result

Eight original fictional workshop scenes: greenhouse, print shop, listening room, robot repairs, observatory, watchmaker, tea break and kinetic gallery. They recur in deterministic spatial arrangements; this is not an infinite library of unique characters. There is no borrowed Floor796 artwork or source. Direct reference inspection was blocked by proxy HTTP 403, so no statement about Floor796's actual renderer is verified.

Single Canvas 2D renderer, cached static room plates, viewport culling, a 30fps cap and capped DPR. No artwork downloads, extra dependency, video loops or WebGL context. Route code is lazy-loaded. The new bundled module is 14,436 bytes (6,110 gzip); CSS 3,865 bytes (1,229 gzip). These are build measurements, not the entire application's network transfer.

Pointer and touch drag, two-finger pinch, Ctrl/Cmd-wheel zoom, zoom buttons, arrows, Home, Enter inspection, reset and pause. Ordinary wheel remains native page scrolling. Directory exposes all eight scenes and remains usable if Canvas 2D fails. Reduced motion starts static; changes in preferences update without reload. Animation pauses offscreen and on document visibility changes. Runtime input, theme and resize wake static redraws.

## Validation

- TypeScript, production Vite build, static route metadata/entrypoint, blocking design audit and whitespace check passed. The existing rendered-site QA also passed the new route at both 1207px and 390px, with zero warnings; the standalone page explicitly supplies index/follow metadata.
- 44 model cases passed: coordinate inversion at near/far/negative locations, deterministic bounded scene types, reachable eight-scene directory, sorted viewport culling and bounded far-camera work. An initial test assumed almost identical counts at different lattice phases; that assumption was corrected to test bounded work rather than equal edge intersections.
- 13 browser cases passed with no page errors. Eight matrix cases: 320/390/768/1440px, light/dark; visible animation/frame cap, pause, keyboard panning/reset, zoom, input redraw while paused, focus and no horizontal overflow. Additional cases: reduced-motion resize/preference changes; pointer drag and touch pinch; simulated hidden-document and actual offscreen pause; forced Canvas 2D failure with all eight directory selections; rendering cost/resource sample.
- Built-page smoke checks passed: /after-hours/ direct load, pointer room picking, Ctrl-wheel zoom, normal page scrolling, single-touch panning and Studio discovery link.
- All ten analytics tests passed when run directly. The node --test wrapper reported one file; the direct invocation confirmed all ten named tests executed. Caption-source QA passed ten original films and fourteen protected sources, with all editorial uncertainties preserved. Guarded-build QA confirmed protected research/detail assets remain excluded and public cover material remains present.
- Sampled local desktop drawing cost was 1.2–2.8ms per frame across twenty samples. This excludes browser compositing and other main-thread work; it is not a physical-phone, field, memory or battery benchmark.

Desktop light and mobile dark screenshots were visually inspected. The initial artwork pass obscured objects with overly tall walls and back-facing furniture faces; final geometry fixes those issues and starts closer to the rooms. Initial keyboard focus QA used programmatic focus after pointer input; it was corrected to test actual Tab navigation. No source assertion was disabled to pass.

Browser QA blocked external requests. Screenshots, first-pass comparison, production interaction recording and full logs are retained under /workspace/portfolio-handoff/review/after-hours. interaction.webm is a condensed browser screenshot sequence at 8fps, not a runtime FPS measurement. No physical-device, Safari or Firefox certification is claimed. Hidden-document checks simulate the visibility event; offscreen checks use actual scrolling.

## Repeat

Use Bun 1.3.10. `bun scripts/after-hours-model-qa.ts`; `node scripts/analytics.test.mjs`; `node scripts/caption-source-qa.mjs`; `node_modules/.bin/tsc -b`; `node_modules/.bin/vite build`; `node scripts/create-route-entrypoints.mjs`; `node scripts/audit-design-system.mjs`; `node scripts/guarded-build-qa.mjs`. The normal repository build also stamps sitemap dates; that was not needed for this local validation.

Start Vite on loopback port 5230, then `node scripts/after-hours-qa.mjs`. QA_BASE_URL, QA_OUTPUT_DIR and QA_CHROMIUM_PATH override local defaults. The current cloud machine uses /usr/bin/chromium. The static build was additionally served on port 4230 for smoke checks.

## Publication boundary

Deployment is explicitly authorized for this feature by the current user request. No previously unapproved preview, secret, source correction, client work, experience approval or production service configuration is included. All application source changes are confined to the new route/renderer/styles, Studio menu discovery link, static route generation and sitemap. Source evidence remains unchanged.

The environment draft adds floor796.com, api.github.com and designwhich.works while preserving the package-manager preset. Draft persistence is confirmed; runtime application/publication is not. This environment change is separate from website deployment. Git read and dry-run push succeeded using existing platform authentication. GitHub's normal workflow webpage is readable; its API and direct production site were denied by the proxy. Deployment status must be reported from actual workflow evidence, with direct-live-check limitations retained.
