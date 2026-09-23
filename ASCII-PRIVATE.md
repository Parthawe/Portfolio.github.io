# ASCII study — private, awaiting approval

Do not push this branch, publish these files, merge this experiment, or deploy it without explicit user approval.

Only the UX Design hero illustration is in scope. Other page objects must remain unchanged.

Local preview: http://127.0.0.1:4174/ux-design/

Uses the installed Three.js AsciiEffect addon from the official animated ASCII example: https://threejs.org/examples/webgl_effects_ascii.html

The selected illustration is texture-mapped onto a gently deforming plane. Animated luminance changes the glyphs continuously, and the pointer influences rotation and light. Rendering pauses off-screen or in a hidden tab. Reduced motion holds the form and characters still.

References consulted (implementation is original):
- https://blog.julianlimburg.zip/Rendering-ASCII.html
- https://threejs.org/docs/pages/AsciiEffect.html
- https://github.com/emilwidlund/ASCII

The earlier ASCII change was reverted from the active project-fixes PR. Its historical commit remains public; these new variations have not been pushed.
