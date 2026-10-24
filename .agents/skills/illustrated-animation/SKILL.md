---
name: illustrated-animation
description: Refine this portfolio's illustrated Canvas scenes, character acting, prop contact, visual composition and motion efficiency. Use for After Hours or another explicitly requested narrative illustration; preserve the portfolio design system and existing media evidence.
---

# Illustrated animation

Treat animation quality as an art and interaction review. Passing tests establishes specific behaviour, not taste or a perfect resemblance to an artist. Work on the existing preview branch; preserve sealed source snapshots and unrelated portfolio surfaces.

## Read the actual input

Read [the portfolio design system](../../../docs/portfolio-design-system.md), [motion/reference constraints](../../../docs/references/threeui.md), the current scene source and its latest review. Review the current real-time recording, or timestamped frames when playback is unavailable, and inspect desktop/mobile images in both themes before proposing a change. Use the bundled anti-vibecoded and no-ai-slop rules when available. Do not rewrite those preserved source files.

Name concrete defects: a floating prop, sliding foot, abrupt loop boundary, unclear silhouette, repeated set, hidden focus, trapped page scroll or expensive wide view. Choose the smallest coherent art pass that addresses them. Avoid adding unrelated effects, more particles, gratuitous lights or another renderer to make a scene appear busier.

An uncertain artist name remains an assumption. Describe observable visual traits and preserve original authorship. Do not claim a perfect replica, invented source research, licensed artwork or hand painting for procedural geometry. Respect the session's asset, network and paid-service restrictions. Do not repeat searches already recorded as exhausted.

## Stage one readable action

1. Give the actor an intention, preparation, contact/action, release and recovery. Check how the last frame joins the first.
2. Derive root travel from explicit scene time and foot placement from distance travelled. Hold planted feet in floor coordinates; lift the returning foot. Ease the gait into rests instead of snapping every limb to idle.
3. Attach a prop to its hand or tool anchor. Return the transformed anchor from the drawing function when another effect needs it. Water starts at the spout and reaches a pot; sticks start at wrists and reach the drum. Do not run a second, slightly different clock for the attached object.
4. Separate cadence deliberately. A character pose may hold at 12fps while travel, foliage and machinery follow continuous scene time. If a hand is stepped, its attached stick must use that same pose sample. Express every time in seconds inside the scene, with the renderer accepting milliseconds at its boundary.
5. Keep anticipation, pauses, asymmetry and secondary motion small enough to read at the opening zoom. Inspect a close view for anatomy/contact and the opening view for composition. Check negative world addresses and mirrored variants.

Current examples: [motion model](../../../src/components/after-hours/motion.ts) and [scene renderer](../../../src/components/after-hours/world.ts). Reuse their timing helpers and source of truth rather than copying approximately equivalent formulas into independent animations.

## Compose and budget the scene

Choose a restricted material palette and coloured linework. Keep distinct workshop silhouettes and useful details. Place shadows under objects, light beneath physical lamps and foliage where it explains the setting. Stable pigment marks belong in cached surfaces; never resample random texture every frame.

Cache static furniture separately from moving actors. Cull by viewport, cap display DPR and frame rate, and use the existing visibleActivity lifecycle. Preserve pause, reduced-motion static default with explicit opt-in, offscreen/tab-hidden suspension, input wake and cleanup. Any new cache must have a finite address space and a disposal path.

A lighter far view may share a small animated composite by motif. Document changes in phase/detail at the threshold and verify it still moves, changes theme and remains bounded. Measure actual running frames as well as draw-call duration. Report outliers and distinguish raw RGBA calculations, real browser memory, device battery measurements and field performance. Do not turn a headless sample into an FPS or battery promise.

## Preserve use and recovery

Keep mouse, keyboard, touch, visible focus and the plain directory available. Zoom around the pointer/finger anchor. A large touch canvas must allow ordinary page scrolling by default; make captured exploration explicit and reversible. Account for hybrid mouse/touch hardware rather than relying only on the primary pointer type. A failed Canvas must disable unavailable controls and retain useful text/navigation.

## Verify, inspect, save

Keep the input commit, before screenshot and any prior passed checks. Run new tests only where the change or an uncovered edge justifies them; do not weaken a source guard to make a preview pass.

- Model checks: finite and bounded positions, deterministic negative-time/address behaviour, continuous travel through loops, foot contact during stance, attachment transforms and eased settlement into rest.
- Pixel checks: real changed pixels during playback; identical pixels while paused and for repeated timestamps. These are motion checks, never an artistic-quality score.
- Browser checks: 320/390px, tablet and desktop in light/dark, keyboard focus/navigation, 200% reflow emulation (label it), real dispatched touch scrolling and exploration, reduced-motion changes, Canvas failure and inactive/offscreen pause. Use physical devices/browser engines when available and name what remains untested.
- Build/design checks: TypeScript, Vite/static route generation, blocking design audit, guarded build and caption/source preservation. Check the changed route with existing rendered-route QA. Preserve the original films, Game Boy, Shuffle and supplied evidence/uncertainties.

Use the existing after-hours-model-qa.ts, after-hours-qa.mjs, after-hours-motion-qa.mjs, after-hours-craft-qa.mjs and after-hours-contact-review.mjs scripts where applicable. Point QA_BASE_URL at an existing local preview and QA_OUTPUT_DIR at a new review directory outside the checkout. Engine-import checks require Vite development mode; production interaction and route checks use a built preview. Keep those results distinct.

Inspect final screenshots and representative recording frames yourself. Record at real elapsed time with frame timestamps; do not accelerate a screenshot sequence and label it playback. Keep a compact report with changes, source hashes, exact checks, costs, limitations, before/after artifacts and deployment state. Save a reviewable commit and patch. Development does not authorize deployment, merging, approval promotion or production-control changes; follow the user's actual session authorization.
