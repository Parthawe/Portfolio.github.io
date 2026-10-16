# MONIAC game-screen reconstruction

The flat seven-gauge bank is replaced by an interactive isometric screen following the supplied game screenshot and the original `Moniac/photos/screen-closeup.png` and `gameplay-wide.png` assets.

The screen restores the tall central glass column, two pale floats, blue return loop with a raised rear corner, separate grey pump, full income reservoir, left tax reservoir, right consumption/import reservoirs, six white valve wheels, angled labels, dark floor grid and large countdown. Percentage readouts follow the browser state; the photographed moment's values are not frozen into the interface.

Parts include the column, two floats, four reservoirs with glass faces and liquid surfaces, six branch pipes, six valve bodies, six stems, six rims with hubs and spokes, the return circuit and pump. Transparent surfaces and blue water follow the user's explicit reference. This is a projected SVG reconstruction, not a CAD model or a physical fluid calculation.

The existing economic equations, shocks, round length, grades and experiment mode are preserved. Six visible wheels correspond to the policies named on the reference screen. The browser model's additional interest setting remains in the inspector. The physical cabinet's electrical wiring and firmware assignments are not reconstructed. The income reservoir stays full as in the reference; the browser GDP index drives the two illustrative floats and remains in the health meters.

Each wheel supports mouse/touch dragging and keyboard arrows, Page Up/Down, Home and End. The inspector provides a native range control. Wheels can be inspected when paused, but values change only during a round or experiment mode. Mobile touch targets are enlarged without changing the pictured wheel size. The phone layout places the inspector below the drawing.

Verification:

- Chromium desktop and touch-capable mobile; WebKit mobile-size viewport; both themes; reduced motion. All six wheels, keyboard limits, linked tax-water readout, pause/resume, restart, interest setting and deterministic one-step mode pass with no page exceptions. Chromium mobile uses native touch events; WebKit's drag check uses mouse events in a mobile viewport.
- All 24 physical-draft regression checks pass. Shuffle, Enigma and Jugalbandi source are unchanged by this correction.
- TypeScript, production build and static-route generation pass. The same component is used inside the case study's existing experiment disclosure; its mobile layout is checked separately.
- Runtime sampling checks idle DOM mutations and absence of GPU canvases. Readiness timings are local headless observations, not field performance claims.

The screenshot guides appearance. The browser economics remain an adaptation, so this does not claim recovered original game firmware or pixel-identical rendering across devices. This change remains local and has not been deployed.
