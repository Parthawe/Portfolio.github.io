# Jugalbandi mechanism study

Local draft on origin/main at 8049ed1. Shuffle and the public case study remain unchanged.

Three Anatomy Figures: a framed servo harp, a pump-fed flute, and four pivoted rainsticks. Each action moves its actuator and drives a corresponding illustrative sound. No model inference, exact original tuning, or calibrated physical simulation is claimed.

## Evidence

- `Jugalbandi/Photos/756.png`: lyre-shaped harp in rectangular wooden/black frame; diagonal and horizontal servo rails; controller on left. Six upper and five lower servo positions are visible. String-to-servo wiring and tuning cannot be recovered reliably from this image.
- `538A4005_nsquare_57.webp`: rear construction/wiring reference.
- `757.png`: horizontal flute, six alternating servo fingers on Lego supports, pump and tubing on left, Arduino on right.
- `758.png`: four taped cylindrical rainsticks on corner servo mounts, timber frame, electronics on lower rail.
- `755.png`: Hexa-18 is a separate yellow instrument. Do not combine it with these mechanisms or pretend its sensors drive verified firmware here.
- `/Assets/films/jugalbandi.mp4`: original performance film, retained with its supplied automatic captions. The performance mixes acoustic mechanisms and digital instruments; do not extract mixed audio and call it an isolated instrument sample.

Geometry preserves the photographed arrangement; dimensions, demo pitches, servo travel and timing are illustrative. A selected demo actuator demonstrates pluck/release rather than claiming a recovered channel map. Real film playback is independent of synthesized feedback.

## Parts before geometry

Harp: four outer wooden rails, four inner black rails, diagonal and horizontal servo rails, harp body/rim/soundhole/bridge, tuning and anchor pins, strings, 11 servo cases/flanges/spindles/horns, controller board/headers/chips/connectors, rail screws.
Flute: support plate, bamboo body/end bands, six holes, six Lego supports/studs, six servo cases/flanges/horns/finger pads, pump board/two pump bodies/caps, air line/connectors, controller board/headers/chips.
Rainsticks: two uprights, top/middle/base rails, four servo housings/brackets/spindles, four tubes with two end caps and center bands, mount screws, controller/headers. Internal bead construction is not documented and is not drawn.

## Implementation and verification

Anatomy kit (MIT) supplies isometric projection and solid shading, vendored for reproducibility. Browser receives prebuilt SVG. Only active parts animate; no WebGL, ambient loop, or autoplay audio. Keyboard buttons mirror direct figure controls. Motion stops offscreen, on tab hide, reset and unmount; reduced motion keeps explicit states.

The flute demo uses the first open hole to choose an illustrative pitch: closing holes nearest the inlet lowers it. This is a qualitative relationship, not recovered original tuning.

## Review status

Still a draft. No public approval, deployment, original firmware, learned model, isolated instrument recordings or measured acoustic tuning is implied. Hexa-18 remains in the original case study and film; this workshop focuses on the three photographed actuator mechanisms. The flute bench layout is distinguished from its upright mounting in the performance.

This is an SVG mechanism study, not a CAD reconstruction. Verification covers projected hinge mathematics, constrained pin placement, finite paths, visual comparison, line attachments and browser behavior. A full volumetric clearance/support audit of every 3D part has not been completed.

## Checks (October 14, 2026)

- Production build, TypeScript and blocking design-system audit pass. Existing site-wide design refactor warnings remain.
- Three instruments checked in Chromium desktop, Chromium with touch, and mobile WebKit, each in light/dark mode. Actual SVG taps, keyboard activation, reset, reduced motion, offscreen cancellation, source-film playback/seeking and closing the film were exercised. Zero page exceptions.
- Audio start instrumentation verifies one sound per harp release, no sound from finger changes alone, and an air pulse triggering flute sound. Synthesized timbre is not asserted to match the source recording.
- Anatomy line-end checker: zero floating ends for harp, flute and rainsticks, in both themes. Whole-view and close-up screenshots inspected.
- Blocked local video produces the original Vimeo fallback.
- Homepage loading/fallback/idle checks pass. The 50-project registry and old-route redirects pass, including Shuffle. Physical draft regression suite passes 24 checks.
- No changes to Shuffle source, its assets, the homepage hero, project approval states or access restrictions.
- Performance samples are in `jugalbandi-anatomy-performance.json`. Fresh local browser contexts, no CPU/network throttle; these are development measurements, not field percentiles. The module includes all three prebuilt SVG drawings. No Three.js/HDR/movie request occurs when opening the workshop; no scene DOM mutations were observed during 1.2 seconds at rest after a pluck.

## Review material

- Preview: `http://127.0.0.1:5211/experience-preview/jugalbandi`
- `reviews/jugalbandi-anatomy/harp-light.png`
- `reviews/jugalbandi-anatomy/harp-dark.png`
- `reviews/jugalbandi-anatomy/flute-mobile.png`
- `reviews/jugalbandi-anatomy/interaction.webm`
- `reviews/jugalbandi-anatomy/browser-results.json`

Run `npm run qa:jugalbandi-anatomy` with `QA_BASE_URL` set to the preview. Rebuild geometry with `node scripts/build-jugalbandi-anatomy.mjs`. Vendored Anatomy modules are build-time only and retain their MIT license.
