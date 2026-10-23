# After Hours

## Requested direction and placement

An original explorable animated world inspired by the user's Floor796 reference. Dedicated /after-hours page, linked from the existing Studio menu. Eight authored workshop scenes recur in deterministic, coordinate-based arrangements. The world is effectively unbounded within a numerical safety limit, not an infinite collection of unique hand-drawn characters.

Plan stated before coding: establish reference behavior; build original scenes; implement pan/zoom/keyboard/pause/inspection; bound rendering cost; validate and deploy only this feature. No unrelated footer, Taste Index or protected project changes.

## Research limits

2026-10-23: requests to https://floor796.com/ and /about were rejected by the environment egress proxy with HTTP tunnel 403. No direct source inspection or licensing verification was possible. A supported configuration draft adds only floor796.com to the existing custom allowlist; applying/publishing the environment is a user-facing platform step and has not been confirmed. This is separate from website deployment.

The renderer, room geometry and animation here are original. No Floor796 assets, characters or code were imported. The description below records this implementation; it makes no claim to document Floor796's actual internals.

## Architecture

One Canvas 2D surface, one shared visibleAnimation scheduler. Static floor and wall plates are cached for eight room types in both themes. Dynamic people and mechanisms are drawn over those plates. The camera projects an isometric coordinate lattice. Inverse projection supports room selection and viewport culling; only intersecting cells are drawn. Seeded room assignment avoids a growing world-object store.

Artwork themes: greenhouse, print shop, listening room, robot repair, observatory, watchmaker, tea break and kinetic sculpture. Each has a distinct original activity. These are fictional illustrations, not replicas of portfolio client work or claims of original project evidence.

Animation is capped at 30fps; pixel ratio is capped at 1.5. Scheduling stops offscreen/in hidden documents and for reduced motion or global pause. Theme/resize/input can wake a static redraw. No artwork downloads, autoplay video, external APIs, extra packages or WebGL contexts. Scenes do not depend on the draft-experience approval registry.

## Interaction and accessibility

Pointer drag, two-pointer pinch, explicit zoom buttons, Ctrl/Cmd-wheel zoom (ordinary wheel remains native page scroll), keyboard arrows/+/−/Home/Enter, room inspection and a textual workshop directory. Accessible directory remains usable when Canvas 2D is unavailable. Touch panning is confined to the illustration; surrounding page scrolling remains native. Reduced motion starts as a static world.

## Deployment scope

The user explicitly requested deployment for this page. That authorization supersedes the earlier no-deploy rule for this feature only. The approved footer, Game Boy, Shuffle, service controls, private material, original snapshots and unrelated drafts remain outside the change. Git read access was verified. GitHub CLI reported invalid API authentication, which does not establish native Git write access. Verify the exact push operation after checks and report a confirmed blocker without extracting credentials or requesting tokens in chat.
