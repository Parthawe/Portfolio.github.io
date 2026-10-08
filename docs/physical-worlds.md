# Physical project rooms

The room viewer extends the existing portfolio with photo-informed spatial interpretations. `/physical-worlds` lists the rooms; all 49 public project routes have an entry. Each project header links to `/<slug>/world`, and Work links to the room index. Hidden registry entries are excluded. Shuffle retains its detailed controller at `/shuffle/simulation`, with a Room camera preset.

`src/components/physical-worlds/catalog.ts` owns labels, initial controls and interpretation notes. `RoomScene.tsx` constructs the objects and room, maps controls to visible changes, and supports direct pointer interaction. `PhysicalWorld.tsx` provides accessible controls, camera presets, reset and optional synthesized Jugalbandi sound. The catalog builds the remaining public rooms from the project registry. Software work uses studio displays; visual work uses exhibition walls. Only approved public previews are used for restricted projects. The Omakase, Making of Time, Drowning, and The Dumb Waiter have additional spatial object studies. Images retain their source aspect ratio.

The original Enigma and Moniac browser experiments mount when their disclosure is opened.

These models are interpretations from project documentation, not measured scans or replicas of trained models and original firmware. Sculpture uses original photographic studies rather than claiming a reconstructed figure. UV uses documented photographs and never opens a camera.

Scenes use `createSceneActivity` to pause while idle, offscreen or in a hidden tab. Reduced motion disables ongoing object motion. Cleanup disposes geometry, materials, textures, observers, controls and audio. WebGL failure leaves the controls and project links available.

Run `QA_BASE_URL=http://127.0.0.1:5199 npm run qa:physical-worlds` against a production preview (`npm run preview -- --host 127.0.0.1 --port 5199`) to check every room and case-study entry on desktop and mobile, including keyboard controls, reset, camera controls, navigation links, and overflow. Reports and representative screenshots are written to `/tmp/portfolio-physical-worlds-qa`. Existing project behavior is checked separately by `npm run qa:project-pages`.
