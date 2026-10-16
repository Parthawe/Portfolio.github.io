# WebGPU animation plan

## Goal
Keep the existing appearance and interactions while reducing avoidable frame scheduling work. Use WebGPU where the scene supports it, with a working fallback. A renderer change alone is not evidence of better frame rate, memory use, or battery life.

## Implemented locally

- Shared project rooms can opt into WebGPU with `?renderer=webgpu`, for example `/enigma/world?renderer=webgpu`.
- The default remains WebGL. The WebGPU module loads only for the opt-in path on a secure context with a GPU API.
- Initialization failure or a 3.5-second timeout falls back to WebGL. Three.js can also choose its own WebGL2 fallback. The canvas `data-renderer` records the actual backend.
- Unmounted scenes dispose late initialization results. Device loss uses the existing scene fallback UI.
- Direct interaction requests an animation frame without first waiting on an ambient timer. A timestamp guard preserves the configured frame cap on high-refresh displays.
- Idle, offscreen, hidden-tab, and reduced-motion behavior remains in the shared scheduler.

## Validation

- Production build passes.
- Native in-app browser: Enigma reports `webgpu`; changing the letter updates the controls and sculpture.
- Automated Chromium: default WebGL, missing-GPU WebGL fallback, and requested WebGPU with internal WebGL2 fallback pass startup and letter-control checks without page errors.
- Default scene does not fetch the WebGPU bundle.
- Deterministic scheduler checks cover direct interaction, a 120Hz refresh interval, idle/offscreen/hidden cancellation, reduced motion, and disposal.
- Commands: `node scripts/scene-activity-scheduling-qa.mjs` and `node scripts/webgpu-project-qa.mjs` (preview defaults to port 4175). The existing `scene-activity-qa.mjs` remains available for browser lifecycle checks against a Vite development server.

## Before enabling WebGPU by default

1. Compare each shared room on both backends: lighting, shadows, transparency, camera controls, and disposal on route changes.
2. Measure frame-time distributions during the same camera movement on a phone, tablet, and desktop. Include a lower-power device and unsupported browser. Compare startup time and memory as well as frame rate.
3. Confirm no idle rendering and no offscreen work in each backend. Check device loss and retry on hardware.
4. Enable only when measurements justify the additional code and startup cost. Keep fallback and an easy rollback.

## Separate migration work

The homepage hero uses custom GLSL materials and shader modifications. These need a TSL port and visual comparison; they are not a drop-in WebGPU migration. ASCII sculptures also perform pixel-to-text work, so changing the GPU renderer alone will not remove their CPU/DOM cost. Keep their existing rendering until those bottlenecks are measured independently.

References: [Three.js migration guide](https://threejs.org/manual/pages/webgpurenderer), [WebGPU API](https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API).
