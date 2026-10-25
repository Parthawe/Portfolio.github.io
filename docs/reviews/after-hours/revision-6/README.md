# After Hours: illustrated candidate

Input preserved at `b205007`; the prior recording and screenshots remain in `/workspace/portfolio-handoff/review/after-hours-v5/`. Parth rejected the flat, repetitive appearance. The earlier contact checks were not evidence that the art direction met the request.

## Concrete change

The candidate replaces the repeated geometric backplates with eight detailed illustrated workshop environments and matching character/prop parts. Rooms have more space, and desktop opens at 220% around the greenhouse. Adult proportions, shaded trousers/shoes and visible forearms replace the small flat figures. The gardener carries a registered can, raises/tilts it, waters a plant on the floor, pauses and returns. The can's grip and spout are measured from the artwork, so the stream follows the prop. Forearms draw over the painted sleeve ends to avoid floating hands. Tall room walls now participate in pointer/keyboard picking.

The greenhouse is the reviewed focal interaction. Other rooms retain representative loops, with themes/notes adjusted to their illustrated contents. This is a candidate visual direction, not approval of every room's acting or a replica of a named painter.

The imagery is **AI-assisted**, generated with the built-in image-generation tool for this experiment. Runtime animation, rigging, registration, layout and controls are implemented here. Original PNGs remain outside the checkout in `/workspace/generated_images/`; WebP encoding preserves dimensions and changes pixel values through compression. The page credits the artwork. [Asset provenance](../../../../public/Assets/AfterHours/PROVENANCE.md) records dimensions, bytes and hashes. No film frames, Floor796 assets, personal photographs or handoff research imagery were imported. Direct Floor796 source inspection remained unavailable; no new claim about its actual renderer is made.

## Runtime repair and checks

Validation exposed an intermittent resume failure after the full reflow/wide-view sequence: zero additional frames over about 2.19 seconds despite an on-screen canvas, visible document and active Play control. The exact browser trigger was not isolated. After Hours now owns one scoped RAF driver that rechecks actual bounds on wake, recovers a stranded pending frame on a real event and suspends offscreen/hidden work. The shared utility and other pages stay unchanged; no second loop or polling interval was introduced.

Eight controlled activity checks cover a static frame, resume, stranded frame recovery, stale observer recovery, offscreen suspension, return without a fresh observer signal, pause and disposal. The original wide-view assertion was retained. It passed three complete sequences after the repair (53, 54 and 50 advancing frames). Initial failure and diagnostic records are retained outside the checkout; this is a tested recovery for the observed condition, not proof of the underlying browser cause.

Final validation includes TypeScript, Vite build, 189 static route entrypoints, blocking design audit, guarded build, 10 original films and 14 protected file hashes. Caption/source uncertainties remain. Browser coverage: 13 production interaction/layout cases, three artwork loading/failure/retry cases and five craft cases. These cover 320/390/768/1440 light/dark, keyboard, touch scroll/explore/pinch, focus, reduced-motion changes, Canvas failure, offscreen/hidden pause, 360% zoom, anchored wheel zoom, 200% CSS reflow emulation, shared caches and actual overview motion. Asset recovery returns keyboard focus to the canvas. Existing desktop/mobile rendered-route verification is recorded separately. Model checks retain the prior motion/coordinate suites and add 12 tall-wall/floor hit targets.

Artwork now requires two same-origin WebP files, totaling **1,164,468 bytes**. They load only on this route, in parallel, with status, timeout, fallback and retry. Eight static and eight distant-view caches are bounded. Approximate RGBA area is 12,584,264 bytes for the two source atlases plus 12,185,600 bytes for these caches, excluding browser/driver/display overhead. This is a calculation, not a browser-memory or battery measurement. Local timing samples and outliers are preserved in the raw reports; they are not field FPS claims. Existing build chunk-size warnings remain.

## Viewable review

All paths below are under `/workspace/portfolio-handoff/review/after-hours-v6/`:

- `final-animation.webm`: final-code normal-time recording. The preserved before recording is `../after-hours-v5/realtime-animation.webm`.
- `final-normal-playback-{03,06,09,12,15}.png`: side-by-side captures from both recordings played continuously at **1×**, compared with elapsed wall time, without seeking. `final-normal-playback-review.json` contains timing and playback state. This is tool-based sequential playback review, not a claim of a full human frame-by-frame animation assessment.
- `contact-{walking,watering,turning,drumming}-{light,dark}.png`: eight deterministic close-ups. Walking, watering, drum contact, sleeve/hand connection and the target pot were inspected.
- `playing-desktop.png`, `world-{320,390,768,1440}-{light,dark}.png`, `all-workshops.png`, close-up, dark overview and reflow images: the responsive/theme evidence. Narrow light and desktop dark views were inspected.
- Exact QA, activity, artwork, motion, model, playback and route results, build/audit logs, source/asset hashes and the patch are alongside these files.

The original artwork and characters have materially changed, but limitations remain: the character rigs are cutouts with simplified limb acting, turns can feel rigid, the world repeats eight sets, most scenery is static and dark mode uses a tint rather than separately painted nighttime environments. The seven secondary rooms have not received the same acting review as the greenhouse. Safari, Firefox, physical-device, native zoom and field/battery tests are unrun. These limits matter more than a count of changed pixels when judging the result.

## Ownership and delivery

Cloud remains the sole portfolio writer; local implementation stays frozen. The sealed handoff, all 22 source snapshots, other drafts, approved Game Boy, Shuffle and unrelated pages are preserved. Work stays on `codex/after-hours-art-pass`. No main push, merge, website deployment, approval promotion or production-control change occurred. The earlier public production-verification failure remains separate and unresolved.

Workspace recordings and images are verified locally. This task exposes no Library/file-upload capability, so no cross-chat Library attachment reference has been verified. Open the workspace links in the original task; do not present them as a new public website deployment.
