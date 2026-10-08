# Physical project rooms

The room viewer extends the existing portfolio with photo-informed spatial interpretations. `/physical-worlds` lists the rooms; all 49 public project routes have an entry. Each project header links to `/<slug>/world`, and Work links to the room index. Hidden registry entries are excluded. Shuffle retains its detailed controller at `/shuffle/simulation`, with a Room camera preset.

`src/components/physical-worlds/catalog.ts` owns labels, initial controls and interpretation notes. `RoomScene.tsx` constructs the objects and room, maps controls to visible changes, and supports direct pointer interaction. `PhysicalWorld.tsx` provides accessible controls, camera presets, reset and optional synthesized Jugalbandi sound. The catalog builds the remaining public rooms from the project registry. Software work uses studio displays; visual work uses exhibition walls. Only approved public previews are used for restricted projects. The Omakase, Making of Time, Drowning, and The Dumb Waiter have additional spatial object studies. Images retain their source aspect ratio.

The original Enigma and Moniac browser experiments mount when their disclosure is opened.

These models are interpretations from project documentation, not measured scans or replicas of trained models and original firmware. Sculpture uses original photographic studies rather than claiming a reconstructed figure. UV uses documented photographs and never opens a camera.

Scenes use `createSceneActivity` to pause while idle, offscreen or in a hidden tab. Reduced motion disables ongoing object motion. Cleanup disposes geometry, materials, textures, observers, controls and audio. WebGL failure leaves the controls and project links available.

Run `QA_BASE_URL=http://127.0.0.1:5199 npm run qa:physical-worlds` against a production preview (`npm run preview -- --host 127.0.0.1 --port 5199`) to check every room and case-study entry on desktop and mobile, including keyboard controls, reset, camera controls, navigation links, and overflow. Reports and representative screenshots are written to `/tmp/portfolio-physical-worlds-qa`. Existing project behavior is checked separately by `npm run qa:project-pages`.

## Object feedback pass

Enigma, Jugalbandi, Sea of Salt, Moniac and Black Hole use open floors. Enigma has labeled output neurons, a pickable alphabet in front of the tablet, text input and the existing template-based handwriting pad. Reset also clears the pad. Jugalbandi includes the yellow Hexa-18, an oval harp soundboard within its rectangular frame, servo rails, the automated flute and rainsticks. Moniac follows the tilted portrait tablet and clear valve deck; its on-screen policy flow updates when a valve changes. Sea of Salt supports circular dragging on the lid or handle, with the slider retained for keyboard input. Black Hole keeps the clocks symmetric and the fabric/mass clear of the pedestal throughout its range.

Run `npm run qa:project-objects` against the production preview to check these five scenes in desktop light and mobile dark modes. The check draws a Z with mouse/touch input, types and selects letters, turns the mill and a valve directly, resets the input and records every Black Hole study at maximum separation. Screenshots go to `/tmp/portfolio-project-objects-qa`.


Digital project experiences

UI/UX projects now open prototypes instead of 3D screen exhibits. `/project-experiences` lists digital and physical work; `/physical-worlds` remains a compatible index. Former digital `/world` URLs redirect to the appropriate prototype, public access gate, or documented case study. The physical catalog excludes these projects.

Mentra links its original onboarding Figma prototype and includes the existing walkthrough recording. ExecutiveLens reuses its source-linked meeting replay. MiniApps, Clawed, OrgDashboard, Health App, Ballah Code, VJ Software, Code for Build, and Raahi offer explicitly labeled browser adaptations of documented workflows with session-local sample data. They do not call live agents, send messages, book spaces, or provide transport or health recommendations. Original public design screens accompany MiniApps and VJ. Restricted work retains existing access controls; research-only work links to its documentation.

Run `npm run qa:project-prototypes` to check complete flows, disabled states, reset, themes, mobile overflow, and legacy redirects. Figma content remains subject to the original file’s access settings; the external link and walkthrough provide a fallback.

The prototype verification also checks actual generated-page iframe content and updates. The local security policy permits same-origin previews and the Figma embed origins. Figma frame rendering uses a deterministic response in QA to verify the host policy; live file access is not verified by that fixture.

## Enigma handwriting repair

The drawing pad now uses the same crop, centering and normalization for reference letters and handwritten input, with narrow stems preserved and ordinary letters allowed to vary in width and height. Matching combines ink overlap with symmetric ink distance. The previous weighted B/W shape bonuses and last-stroke V/W override are removed. Reference variants include common handwritten J, O and S forms. This remains local reference matching, not a trained handwriting model or a calibrated probability estimate.

Pointer capture retains multi-stroke input and continues strokes outside the canvas. Coordinates account for CSS resizing. Recognition runs after a one-second pause or through the Recognize button; ambiguous matches require confirmation. Three alternative matches let visitors correct the result. Clear and Reset cancel pending recognition, and cancelled pointers cannot produce a delayed result. Both the world viewer and the case-study experiment use the repaired pad; the case-study pad now keeps a usable 180px size and wraps on narrow screens.

`npm run qa:enigma-handwriting` tests 26 independently authored letter paths in three position/proportion/stroke-width variants, blank input, mouse/touch multi-stroke drawing, automatic recognition, alternative selection, CSS resizing, pending-clear cancellation, pointer cancellation and reset. All 78 recognition variants produce the correct first match; this fixture result does not establish general handwriting accuracy. The earlier matcher missed 12 of the first 26 fixtures and assigned each incorrect guess full confidence. Browser screenshots are written to `/tmp/portfolio-enigma-handwriting-qa`.

## Jugalbandi reconstruction

`JugalbandiModel.ts` builds the four documented instruments from the project's existing annotated photographs (`755.png`–`758.png`) and the harp/Hexa-18 detail photographs. Hexa-18 has four sloped, thick panels, two photographed sensor faces with recessed metal grilles, eight bamboo pipes and an open tapered base. The harp has an open oval body, sound hole, strings, rectangular outer frame, flat diagonal and lower servo rails, blue motors and exposed wiring. The flute includes its white mounting board, six alternating Lego/servo fingers, two pumps, tubing and controller. Four rainsticks pivot on a shared tall wooden rack. Dimensions remain proportional studies, not measured fabrication plans.

Instrument buttons switch between the ensemble and individual close views. Camera framing fits the projected bounds to the viewport; the flute detail view looks down onto its mechanisms. Room and Reset restore the ensemble. Hidden instruments cannot intercept pointer input. The harp's string bank has a larger invisible pointer target for touch, without casting shadows or changing the rendered appearance. Moving fingers, plucking arms and tilting sticks retain their own transforms; stationary hardware is batched by material. The builder constructs 505 mesh parts and retains 146 after batching, with moving/pickable parts preserved. This count is an assembly check, not a measured GPU or energy saving.

`npm run qa:jugalbandi` checks four assemblies, mounted rainstick count, finite bounds and floor contact across control extremes, solid Hexa-18 panel caps, preserved pick targets, all five inspection views, sliders, direct mouse/touch harp dragging, reset, responsive overflow, console errors and idle pause. Desktop light and mobile dark screenshots go to `/tmp/portfolio-jugalbandi-qa`. The production build, blocking design audit, Jugalbandi case-study rendered checks and the five physical-object regression checks in both profiles passed. Existing automatic-caption review warnings remain. No new textures, external model assets, dependencies, or animation loops were added.

### Revolving Stage reconstruction

The stage follows the project’s `isometric-stage.png`, `stage-vs-render.png`, `axle-assembled.png`, `caster-engineering.webp` and `Mobile/3.jpg` references. The rotating deck now has the documented 15 × 8 ft proportions over an 8 × 8 ft square base. Two rings of eight caster assemblies remain fixed beneath it. The storefront has four upstairs windows, three shop bays, a corrugated shutter, an orange vendor counter and a red/white umbrella. Its reverse uses the project’s garden artwork with a separate bench. Scenic details are proportional interpretations, not surveyed fabrication geometry.

Building, Corner and Garden controls expose the different sides. Dragging the deck changes its rotation; the mechanism slider hides the scenery and lifts the deck for inspection. This exploded view explains the bearing and casters without claiming to model structural loads or bearing behavior. Static hardware is batched by material; rendering still sleeps when idle. Run `npm run qa:revolving-stage` for drawing-proportion, geometry, desktop/mobile interaction, theme, reset, overflow and idle checks.
