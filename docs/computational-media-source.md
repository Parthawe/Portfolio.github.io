# Computational Media source

The original files were found in `/Users/parth/Documents/NYU ITP/ICM` on 2026-09-23. Byte-for-byte text copies of `paintingpixels.js`, `particle.js`, and `index.html` are included under `public/Assets/Projects/comp-media/source`.

The archived code creates a 640×480 canvas, samples a 40×30 camera image, initializes 200 particles, changes their positions by up to ten pixels on each axis, and draws 25×24 ellipses with slider-controlled opacity.

The archive is incomplete as a runnable page: its HTML loads only the particle class; particle construction incorrectly calls `new particles`; and the fill call is written as `FileList`. The portfolio restoration implements the same sampling and particle behavior using the browser Canvas API and fixes these execution errors. It adds a sample portrait, explicit camera permission, pause/reset controls, and stream cleanup. It is labelled a restoration rather than an original submission recording.

The earlier list of seven experiments was removed because this source archive did not substantiate those examples. The preserved project date, course, and role come from the existing registry.
