# Private 3D ASCII category heroes — awaiting approval

Do not push this branch, publish these files, merge the experiment, or deploy it without explicit user approval.

Only category landing-page hero objects are replaced. Home, Work, About, project cards, and case studies keep their existing visuals.

## Local previews

| Category | Object | Preview |
| --- | --- | --- |
| AI | Orbital sphere | http://127.0.0.1:4174/ai/ |
| AI wearables | Glasses | http://127.0.0.1:4174/ai-wearables/ |
| UX design | Torus knot | http://127.0.0.1:4174/ux-design/ |
| UX research | Magnifying lens | http://127.0.0.1:4174/ux-research/ |
| Design engineering | Engineering frame | http://127.0.0.1:4174/design-engineer/ |
| Crypto | Coin | http://127.0.0.1:4174/crypto/ |
| Fintech | Coin stack | http://127.0.0.1:4174/fintech/ |
| Brand & visual | Interlocking rings | http://127.0.0.1:4174/visual-brand/ |
| Installations | Sculptural arch | http://127.0.0.1:4174/installations/ |
| Healthcare | Medical cross | http://127.0.0.1:4174/healthcare/ |
| Design for good | Utah teapot | http://127.0.0.1:4174/design-for-good/ |
| Motion | Film reel | http://127.0.0.1:4174/motion/ |

Existing aliases share the same treatment, including /ux, /ui, /creative-tech, /design-engineering, /brand, and /brand-visual. The new /visual-brand alias redirects to /brand-visual.

Three.js AsciiEffect and OrbitControls render actual geometry. Drag to rotate, use arrow keys, or allow one automatic turn in approximately two minutes. Pause stops automatic rotation. Reduced-motion preferences disable automatic rotation. The Motion page also respects its existing motion preference. Rendering stops outside the viewport and in hidden tabs.

## Sources

- Official ASCII example: https://threejs.org/examples/webgl_effects_ascii.html
- Torus knot geometry: https://threejs.org/docs/pages/TorusKnotGeometry.html
- Teapot example: https://threejs.org/examples/webgl_geometry_teapot.html
- Three.js MIT license: https://threejs.org/license/

The code assembles installed Three.js primitives and imports its addons; no external artwork or unlicensed source was copied. The old ASCII change was reverted from the active project-fixes PR. Its historical commit remains public; these new studies have not been pushed.
