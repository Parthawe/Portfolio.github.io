# Revolving Stage: anatomy from base to performance

The preview now has eight connected chapters: base, casters, axle, platform, rotation, scenery, performance and disassembly. The same workshop is lazy-loaded in the expanded case study when experience previews are enabled. Public approval is unchanged. Shuffle and Enigma implementations are untouched.

The old split between Anatomy assembly and a separate Three.js rotation scene is removed from this preview. Rotation uses precomputed isometric poses in 5-degree increments, with a fixed camera, fixed support stack and rotating upper axle plate. Lifting the platform is explicitly an inspection view, not an operating position. No WebGL, idle animation or polling is needed.

## Evidence and limits

- full-assembly-exploded.png establishes the 15 × 8 ft platform, 8 × 8 ft base and two caster arrangements.
- axle-exploded.png names Steel Plate 1, shaft, thrust bearing, ball bearing, bearing and Steel Plate 2. The new detail separates all six. The housing and rings are split into true annular sections for correct occlusion around the shaft.
- caster-engineering.webp documents the caster and swivel-bearing detail. The interactive close-up explains the overview's mounting plate, fork, wheel and axle ends. It does not reconstruct the unspecified internal swivel race or fasteners.
- stage-rotation.png supplies the orientation comparison; Mobile/3.jpg supplies the scenic render sequence and 135-degree reveal.
- stage-vs-render.png and performance-collage.webp establish the final appearance. Hidden scenery framing, drive equipment, crew actions and load calculations are not invented.

Internal dimensions and bearing fits are illustrative. Disassembly is an explanatory reverse sequence, not a physical dismantling procedure. The scenic and performance chapters use original images alongside the mechanism rather than claiming a complete reconstructed scenic frame.

## Verification

- Production preview build passed.
- Anatomy axle audit: 101 geometric solids across six named components; zero reported clearance, support, depth-order, intermediate-position or stand-in-shape failures across 11 separation states.
- Original 91-solid overview remains unchanged.
- Browser checks: all eight chapters in Chromium desktop, Chromium touch-sized mobile and WebKit mobile, both light and dark themes; component selections, assembly/axle/rotation sliders, resets, previous/next/restart, keyboard focus, reduced motion, source image loading, no horizontal overflow and no Three.js/WebGL loads.
- 24 physical-draft regression checks passed, plus filtered directory-return checks in Chromium and WebKit.
- Anatomy line-end check passed with no added free texture lines. Close-ups inspected at 4×.

Review screenshots, recording, geometry audit and results accompany this document. Local only; no push or deployment.

Local preview ready-time observations: 372–842 ms across six profiles. These are unthrottled smoke observations, not a controlled performance comparison.
