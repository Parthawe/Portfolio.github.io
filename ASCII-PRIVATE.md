# Private 3D ASCII study — awaiting approval

Do not push this branch, publish these files, merge the experiment, or deploy it without explicit user approval.

Only the selected UX Design hero object is changed. The image is no longer the source of the ASCII representation: existing Three.js geometry supplies a real 3D surface.

## Local previews

- Torus knot: http://127.0.0.1:4174/ux-design/?model=knot
- Utah teapot: http://127.0.0.1:4174/ux-design/?model=teapot

Both use Three.js AsciiEffect and OrbitControls. Drag to rotate, use arrow keys, or allow one automatic turn in approximately two minutes. Pause stops automatic rotation. Reduced-motion preferences disable automatic rotation. Rendering stops outside the viewport and in hidden tabs.

## Sources

- Official ASCII example: https://threejs.org/examples/webgl_effects_ascii.html
- Torus knot geometry: https://threejs.org/docs/pages/TorusKnotGeometry.html
- Teapot example: https://threejs.org/examples/webgl_geometry_teapot.html
- Three.js MIT license: https://threejs.org/license/

The code imports installed Three.js addons and geometry; no external artwork or unlicensed source was copied. The old ASCII change was reverted from the active project-fixes PR. Its historical commit remains public; these new studies have not been pushed.
