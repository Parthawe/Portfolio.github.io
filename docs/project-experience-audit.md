# Project experience audit

Reviewed October 13, 2026 against main 15c346a. Shuffle is the only user-approved standalone experience. Existing case-study demonstrations and access gates remain available. Status is implementation state, not a quality score.

| Project | Format | Status | Visitor task | Evidence / limitation |
|---|---|---|---|---|
| mentra | prototype | draft | Complete glasses onboarding | Original Figma onboarding and recording; browser embedding requires usability review |
| mentra-miniapps | prototype | draft | Create and select Notes for glasses; inspect other app designs | Documented discovery and permissions; only Notes implements a local task |
| transfi-project | case-study | reference | Read public preview and request access | NDA preview and existing access gate; no private workflow in a standalone prototype |
| zentipay | case-study | reference | Read public preview and request access | NDA preview and reviewer gate; protected transfer screens remain behind access |
| clawed-chat | prototype | draft | Approve an assistant action and inspect its receipt | Documented action safety and receipts; existing prototype uses sample data |
| executivelens | prototype | draft | Inspect a meeting summary citation | Existing MeetingTimeline and prepared transcript; preserve embedded demonstration |
| org-dashboard | prototype | draft | Review organizational context and approve an action | Case-study context and knowledge workflow; existing adaptation requires task review |
| cuetv | case-study | reference | Read the safe discovery and playback story | NDA public preview; retain existing access gate |
| healthapp | prototype | draft | Rebalance tasks around daily capacity | Documented sleep, food and planning concept; sample-data adaptation requires review |
| medimorpho | case-study | reference | Read the public healthcare research | Protected research story and 20-interview context; no invented patient simulation |
| ibm | case-study | reference | Read the encrypted-computation research | Research glimpse; no released runnable encryption implementation |
| ballah-code | prototype | draft | Review a proposed component change | Documented IDE workflow; existing prototype is a browser adaptation |
| ai-voice | case-study | reference | Read the public voice-selection story | NDA preview and existing access gate; no synthetic substitute for protected voice samples |
| raahi-project | prototype | draft | Plan a journey across transit touchpoints | Research and mobile/kiosk/in-vehicle evidence; current journey uses sample data |
| the-point-cdc | case-study | reference | Explore the documented community website | Original website link and case study; no standalone room needed |
| office-of-diversity | case-study | reference | Read the report design story | Public report evidence; no room or invented report content |
| jugalbandi | physical | draft | Operate instruments and observe acoustic mechanisms | Installation photographs and film; current synthetic sound and model need fidelity review |
| vj-software | prototype | draft | Select a parking space and review a booking | Parking research and UI evidence; existing prototype uses sample data |
| enigma | physical | draft | Type a letter and inspect the light network | 200-neuron sculpture photographs, film and original EnigmaInteractive; handwritten matcher is unapproved |
| shuffle | physical | approved | Rebalance student-life priorities | User-approved motorized-fader reconstruction and existing ShuffleInteractive |
| making-of-time | experiment | reference | Compare shadow, mechanism and software time | Original film and embedded ClockTrio; preserve the experiment rather than a photograph on a bench |
| sea-of-salt | physical | draft | Turn the mill to advance the salt story | Original mill photographs, story and embedded SaltSimulation; direct rotation requires review |
| flow-fields | experiment | reference | Tune the original generative flow field | Existing GenerativeCanvas with Perlin-noise particle behavior; retain embedded experiment |
| embodied-web | case-study | reference | Read body-input experiment evidence | StudyExplorer and related project evidence; no released standalone pose-controlled experience verified |
| feeling-patterns | case-study | reference | Read tactile-interface research | Textile study and related evidence; no verified haptic hardware simulation |
| performance-by-design | case-study | reference | Read live-performance design studies | StudyExplorer and related evidence; avoid invented cue or audience behavior |
| on-becoming | case-study | reference | Read the practice essay | Reflective writing and related work; no standalone simulation warranted |
| storytelling | case-study | reference | Read narrative structure studies | StudyExplorer and related evidence; no separate runnable narrative verified |
| dna-speculative | case-study | reference | Examine the speculative artifact | Public speculative-design glimpse; no unsupported biology model |
| comp-media | experiment | reference | Paint with camera pixels | Existing PixelPainting restoration and original p5.js source; retain embedded experiment |
| hypercinema | case-study | reference | Read immersive media studies | StudyExplorer and related evidence; no verified navigable 360 asset in the standalone room |
| applications | case-study | reference | Read application development studies | StudyExplorer evidence; no project-specific standalone implementation verified |
| messy-humans | case-study | reference | Read inclusive design research | Research and StudyExplorer; no invented personas or task outcomes |
| production-studio | case-study | reference | Read collaborative installation production | Production evidence and StudyExplorer; generic room does not demonstrate production work |
| arcade-lab | case-study | reference | Read controller and party-game studies | Related evidence and Omakase project; no separate arcade-lab game verified |
| black-hole | physical | draft | Operate each documented physical study | Exhibit photographs and mechanisms; alignment and separate study behavior require review |
| uv-light | case-study | reference | Reveal documented blacklight marks | Original installation photographs; retain the case study without a photographic room |
| the-omakase | experiment | reference | Play the original two-player sushi game | Original itch.io playable and cabinet film; keep embedded game and document controller differences |
| revolving-stage | physical | draft | Rotate scenes and inspect the supporting mechanism | Stage drawings, photographs and embedded StageRotation; geometry requires fidelity review |
| moniac-machine | experiment | draft | Operate the original economic strategy experiment | Original MoniacSimulator rules and cabinet film; deterministic exploration added, unsupported valve mappings removed |
| dumb-waiter-set-design | case-study | reference | Examine the original scenic model | Scenic-model photographs; no measured interactive reconstruction verified |
| drowning | experiment | reference | Explore lighting on the documented scenic design | Original film and embedded LightingSlider; preserve original demonstration |
| sculpture | case-study | reference | Study original figurative sculpture photographs | Photographic evidence only; no scan or faithful reconstructed geometry |
| mentra-brand | case-study | reference | Examine identity, packaging and campaign work | Brand assets and renders; no documented editable identity rules verified |
| tedx | case-study | reference | Examine the fabricated parallax stage | Original stage design and build evidence; defer 3D until dimensions and interaction are supported |
| code-for-build | prototype | draft | Arrange blocks and inspect corresponding code | Documented educational concept; existing browser adaptation needs learning-task review |
| typeface | tool | draft | Type, inspect, reshape and export real glyphs | Supplied OTF/WOFF2 files and Glyphs sources; new SVG workshop awaiting user review |
| atps | media | draft | Find and listen to verified conversations | Apple Podcasts show 1524982835 and Anchor RSS located; 45 audio enclosures verified; native browser playback and seeking tested |
| vishwaconclave | case-study | reference | Explore event identity across editions | Flattened campaign boards and motion-2021 films; editable identity components and rules not recovered |
| glassly | case-study | reference | Explore the wearable platform website and original miniapp demo | Original website source, six-scene phone/glasses demonstration and September 2026 brand guidelines; added October 14, 2026 as the 50th catalog project |

## Asset and tool findings

- Butler’s Slice includes three OTF fonts, WOFF2 fonts and Glyphs source files. The workshop uses the actual OTF outlines, not generated typography. SVG export embeds vector paths and edited outlines without external font dependencies.
- ArtTown’s original show was located at https://podcasts.apple.com/in/podcast/arttown-podcast-series/id1524982835 . Apple’s lookup endpoint resolves the original feed to https://anchor.fm/s/2d9269f4/podcast/rss . The RSS contains 45 episodes. All 45 audio enclosures returned HTTP 206 audio responses in this audit; see the native listening archive verification report for browser playback/seek results.
- VishwaConclave has flattened boards and archived motion under `public/Assets/Projects/VishwaConclave/motion-2021`. Files marked reference-2022/reference-2023 must not be attributed to the 2019–2021 project. No editable identity system or documented layout rule set was found; keep the case study.
- Meshy workspace opens signed out, with Log In and Sign Up Free. No account was created, no files uploaded, and no generation claimed. Free-plan generation/export testing is blocked by account access; use code geometry until access exists. Meshy free outputs require attribution under CC BY 4.0: https://www.meshy.ai/terms-of-use .
- Blender is not installed at `/Applications/Blender.app` and no `blender` executable was found. The first replacement is SVG-native and does not require Blender. Install the official free application only when an approved physical rebuild needs it.
- No paid tools, runtime generation services or deployments were used.

## Local replacements

The development-only index is `/experience-preview`. None of these drafts is publicly approved. Public promotion requires the user’s review; internal development continues without publishing.

- Butler’s Slice: original font vectors, text/weight changes, anchor/control-handle edits with corrected screen-to-SVG mapping, keyboard/coordinate edits, reset, and portable SVG export including the edited character. Font-load failure and retry are supported.
- Enigma: input corrected to an 8×8 panel, with sampled typed-letter intensities and spatial signal mixing instead of arbitrary random activation. Alphabet output is selected explicitly, not claimed as a learned prediction. Four ascending frames retain a proportional 200-node reconstruction; intermediate layer counts and wiring are not independently verified. Drawing is withheld. Camera fitting accounts for the full object.
- Jugalbandi: the harp now matches the photographed solid oval soundboard and circular sound hole, removing the incorrect upper aperture. Strings, servo arms, flute fingers and rainstick tilt retain corresponding movement. Direct control manipulation now produces a decaying string approximation, flute tone or grain-noise sound when sound is enabled. These are synthesized, not original recordings.
- Moniac: the local draft uses the existing documented economic browser adaptation, not the unverified cabinet-valve mapping. Pause, resume and restart are available, with hidden/offscreen activity suspended and event timers cleaned up.
- Revolving Stage: retain the drawing-based 15×8 deck, 8×8 base and 16 casters; direct deck drag follows angular motion around the center and wraps through a full revolution. Scene presets and the mechanism cutaway remain available. Scenic geometry is proportional, not a load simulation.
- Sea of Salt: retain angular mill manipulation and accumulated salt; add the photographed shell seam/shaft and visible story milestones. Reverse progress revisits the story but does not remove previously deposited salt; reset clears the model.
- Black Hole: replace the generic pedestal/grid treatment with the photographed drum/slatted time platform, circular cloth on three legs, and three labeled binary-study trays. Clock support positions align with the platform; one clock stays at reference distance while the other moves. The cloth uses a smooth radial mesh and updates normals only when deformation changes. These remain qualitative models.
- ArtTown: all 45 RSS audio enclosures returned HTTP 206 audio responses. The local archive searches original episode titles/guests/topics, selects real recordings and uses native playback/seeking. Audio is not preloaded; changing selection or hiding the tab stops playback. Only the original Anchor and CloudFront media origins were added to media-src.
- Ten existing UI/UX workflow adaptations are retained for local review at `/experience-preview/:slug`. They remain unapproved and explicitly use sample data; the Mentra Figma embed test mocks the frame response, so it does not establish live Figma availability.
- VishwaConclave remains a case study because editable identity components and documented layout rules were not recovered. No generated identity workbench is substituted.

## Verification commands

`npm run qa:physical-worlds` now verifies curated public redirects and approved experiences instead of requiring a room for every project. Run `QA_BASE_URL=http://127.0.0.1:5202 QA_DEV_URL=http://127.0.0.1:5201 npm run qa:experience-curation` to include the local workshop in Chromium desktop/mobile and mobile WebKit. Development preview code must not appear in the production bundle. Historical per-model scripts target withdrawn versions and are not acceptance tests for their future replacements.

## Verification results

- Production build, TypeScript, 49-entry route/experience consistency and blocking design audit passed. The remote main still matches the inspected base `15c346a`.
- 98 world/prototype URL checks passed; only Shuffle appears in the public experience index. All rejected embedded rooms were removed, while original demonstrations remain. Development review code is excluded from the production build.
- Type workshop: Chromium desktop/mobile and mobile WebKit in both themes; real weight changes, keyboard/coordinate/pointer editing, reset, escaped SVG export, empty input, failed-font retry and 320px fit passed. Recorded development readiness ranged from 0.506–1.059 seconds in that local run; these are unthrottled development observations, not production percentiles or a speedup claim. No WebGL canvas is used.
- Physical drafts: 24 desktop/mobile/theme checks passed. Jugalbandi model tests confirmed finite bounds, floor contact and retained pick targets, with 505 constructed meshes batched to 146 retained meshes. Revolving Stage tests confirmed drawing proportions, 16 stationary-base casters, finite cutaway/rotation states and deck picking. Mouse and native Chromium touch turning changed stage rotation from 0 to 82 degrees and salt story progress from 0 to 2 in the tested gestures.
- Ten UI/UX prototype task flows passed in desktop light and mobile dark, including restart, theme switching and legacy route withdrawal. This retains their sample-data status and does not establish real external actions or live Figma uptime.
- ArtTown: all 45 enclosure range requests passed. Native Chromium playback, seeking, selection stopping prior audio, search and empty-search recovery passed in light desktop and dark mobile. Original recordings are streamed, not downloaded into the repository.
- Twelve affected production routes passed 24 rendered checks. Six existing warnings concern editorial review of automatic film captions on Enigma, Jugalbandi and Moniac; they are not new playback failures.
- Homepage regression passed static light/dark desktop/mobile, deferred images, desktop 3D startup, one lighting request, expansion/Escape, idle/offscreen pause, unavailable-WebGL and low-power fallback. Shuffle’s interactive component, geometry and controls were not edited; only its next link to rejected Enigma was removed.
- Screenshots, recordings and JSON reports are under `/tmp/portfolio-experience-review-final`, `/tmp/portfolio-physical-draft-review`, `/tmp/portfolio-arttown-review` and `/tmp/portfolio-prototypes-qa`. No deployment or push was performed.

The final local GPU check recorded first draw calls between 0.615 and 0.848 seconds across the five 3D drafts, with zero draw calls during the sampled idle windows. This was an unthrottled local development run with warm shared dependencies, not a controlled baseline comparison. Global startup-monitor callbacks were measured separately from renderer draw calls.

The remaining six former queue entries are retained in their case studies rather than duplicated as standalone experiences: Making of Time, Flow Fields, Computational Media, The Omakase and Drowning preserve their original working demonstrations; UV Light preserves its installation photographs and documented story. Final classification: 1 approved standalone, 18 local drafts, 30 case-study/original-demonstration references.


## Audit fixes implemented locally

The October 13 critique is implemented across the 18 local drafts. The catalog remains 49 entries: Shuffle approved, 18 drafts, 30 case-study/original-demonstration references. No approval, commit, push or deployment was performed.

- Butler’s Slice uses the selected canvas-first layout, compact desktop inspector and mobile bottom sheet. A live glyph preview stays visible within the sheet. Edits and bounded undo/redo histories persist separately for each character and weight; specimen export includes all retained edits in the selected weight. Keyboard point selection replaces the long point tab sequence. Screen-space picking offers a larger area around the nearest point. Fonts are cached within the tool and pending fetches are aborted. Review-index navigation is present.
- Health App separates proposed and applied capacity, shows illustrative times/durations, retains task checks and offers undo. Clawed preserves focus and announces a receipt containing the exact approved text, destination, source and approval time; local approval can be withdrawn. OrgDashboard shows the actual before/after checklist and commits it to the local knowledge record, with source context and undo.
- Ballah uses a constrained explicit-button-type proposal, actual before/after source and a native form preview demonstrating the consequence. Unmatched or ambiguous source is not patched. Editing invalidates the proposal and its obsolete undo snapshot without stealing textarea focus. Apply/dismiss preserve a useful focus destination. No arbitrary JSX is executed.
- VJ Parivar separates the two sample wings, floors and vehicle compatibility, preserves selection through review and supports local cancellation. No price or real availability is fabricated. Raahi carries a destination-specific prepared route through app, stop, vehicle, transfer and arrival, with local ticket gating and backward navigation. Original app/kiosk/touchpoint references accompany the scenario.
- MiniApps distinguishes a working Notes task from the other original interface archives; it no longer calls static views running apps. Code for Build has a named native padding range, reversible block ordering, an empty state and a bounded block count; output remains visible above the mobile controls. ExecutiveLens shows the selected source excerpt near the summary on mobile. Redundant outer prototype restart controls were removed. Mentra retains the original recording/Figma access rather than an invented flow.
- ArtTown retains real recordings/native seeking, adds title-derived keyword filtering and pagination, preserves complete RSS metadata in a disclosure, offers retry, and provides reachable mobile playback controls. No inferred guest metadata or audio is invented.
- Enigma has one primary typed-letter path and a text explanation of the input/mixed/selected-output model; drawing remains withheld. Jugalbandi offers instrument selection, named mechanism actions and explicit synthesized-sound state; direct presses operate its mechanism. Stage has assembled/cutaway states and an explanatory base/caster readout. Salt distinguishes current story turns from irreversible accumulation. Black Hole presents each study and each binary phase separately, with specific controls, visible qualitative merger/settling response and opt-in play/pause. Camera fitting enlarges Salt/Black Hole; mobile stages and controls are more compact. Reset confirmation does not hide the explanation, and later instrument/camera changes invalidate reset undo.
- Scene-module failure offers honest Reload/original evidence rather than a retry that reuses a rejected promise. Compact sheets preserve focus through rerenders, include selects/textareas/summaries in their trap, and exclude descendants of collapsed details. Historical Moniac cabinet-policy rendering and unused gallery entries were removed. Moniac’s documented browser game exposes one policy explanation at a time, supports both themes, uses transform-based level transitions and disables motion under reduced motion.
- The Typeface workshop public route is implemented but remains approval-gated. Public redirect handlers cannot navigate to themselves. Build checks reject approving an experience without an implemented public renderer. All 30 references and existing access restrictions remain in their case studies; no extra rooms were added.

### Confirmation results

Production build/TypeScript, registry coverage, 183 static entrypoints and whitespace checks passed. Blocking design audit passed with existing repository refactor warnings. All 98 legacy world/prototype redirects passed, as did the unapproved workshop redirect, curated Shuffle-only index and production preview exclusion. Homepage static themes/viewports, desktop 3D first frame, single lighting request, idle/offscreen pause, expansion/Escape, unavailable-WebGL and low-power recovery passed. Shuffle interaction/geometry and hero source were unchanged in this pass.

20 digital task flows and 24 physical/game theme/viewport checks passed. Eight workshop checks cover Chromium desktop/mobile, mobile WebKit in both themes, actual pointer/keyboard edits, retained edits, undo/redo, real weights, portable SVG export, font failure recovery and 320px fit. ArtTown playback, seeking, selection pausing and search passed in two profiles. Targeted regression checks cover the original plan/patch/focus/label/retry defects and the reviewers’ newly found undo/focus-trap issues. Another 36 rendered captures cover all 18 drafts in desktop dark/mobile light, complementing the task captures. Native Chromium touch gestures changed stage rotation 0 → 83 degrees and mill progress 0 → 1. The final live mobile-inspector check confirmed coordinate edits update the visible preview and Escape restores focus.

Final unthrottled local development GPU samples recorded first draws at 512.5–600.5ms across five scenes, with zero draw calls in every sampled idle window. This is not a controlled speedup or field percentile. Earlier measurements interrupted by development-server reloads were discarded; the final samples were taken with source/public files frozen.

Evidence is under `/tmp/portfolio-improvements`: `workshop`, `prototypes`, `physical`, `arttown`, `edges`, `curation`, and `performance`. `edges/interaction-recording.webm`, workshop/physical/ArtTown recordings, screenshots and JSON reports accompany the changes. Live Figma availability, physical iPhone hardware, VoiceOver/NVDA speech, original instrument timbre, trained Enigma weights and numerical physical/economic accuracy remain outside these checks. Drafts require the user’s visual review before public promotion.


## Source comparison and second improvement pass

All 18 drafts were inspected individually against recovered project photographs, drawings, fonts, recordings or interface evidence. Two independent reviewers checked design/fidelity and defects/accessibility. Their remaining confirmed issues were corrected. Shuffle remains the sole approved experience; the draft review sequence does not promote any project.

| Draft | Evidence used | Improvement and remaining boundary |
|---|---|---|
| Butler’s Slice | Three supplied OTF weights and original glyph outlines | Attached-handle movement includes closed-contour anchor synchronization. Optional H-top/x-top/baseline guides use measured source outlines. Existing retained edits, keyboard editing and SVG export remain. These are outline measurements, not asserted font metadata. |
| ArtTown | Original RSS episode titles, dates, durations and recordings | Previous/next recording, retained playback speed and native seeking. Discovery uses documented titles; no guest biography or inferred metadata. |
| Enigma | Full sculpture photographs and documented 200-light arrangement | All 26 typed letters work; individual layer inspection fits closer camera views. Drawing remains withheld because original trained weights are unavailable. |
| Jugalbandi | Instrument photographs, annotated mechanism references and film | Harp proportions and sloped servo rail adjusted; selected string drives its visible motion and browser synthesis. Direct actuation continues into dragging without reverting to its previous value. Sound is labeled synthetic, not original tuning/timbre. |
| Moniac | Original browser economic rules and cabinet evidence | Deterministic one-step exploration displays four before/after indices. Resuming the timed game clears the exploration mode and its table. Cabinet valve assignments are not fabricated. |
| Revolving Stage | Original 15 × 8 ft deck, 8 × 8 ft base and caster drawings | Live footprint shows deck rotation against the fixed base and 16 modeled caster locations. Assembled/cutaway and scene selection remain. Modeling proportions do not constitute fabrication dimensions. |
| Sea of Salt | Mill photographs and documented folktale | Quarter-turn actions share fractional native-slider precision, direct mill turning advances four story milestones, reverse movement retains accumulated salt. Reset clears it. |
| Black Hole | Separate study photographs and original browser lensing experiment | Fabric mass supports vertical dragging; original lensing has keyboard position/Home, an accessible description and touch. Irrelevant 3D cameras are hidden; instructions match the active mode. Models remain qualitative. |
| Mentra | Original onboarding recording and Figma link | Recording replay/retry, useful focus on entering and returning from Figma, honest frame-load status. Live Figma permissions/availability remain external. |
| MiniApps | Original app screen archives and discovery/permission workflow | Notes can select which saved item appears on the glasses; removal adjusts selection. Other apps are clearly design archives. |
| Clawed | Documented review gate and action receipt concept | Read-only approval gate, immutable bounded receipt history and receipt search. Withdrawal preserves the approved text. Nothing is sent externally. |
| ExecutiveLens | Original meeting timeline and prepared transcript | Keyboard-capable meeting seek pauses playback and exposes only reached transcript material. Citation inspection remains near the selected source. |
| OrgDashboard | Original knowledge, provenance and action-review workflow | Project records are visible initially, source inspection is record-specific and proposals lead to procedure evidence. Approval/undo modifies the local checklist only. |
| Health App | Original planning board and task-capacity concept | Choose the task to defer, compare minutes, preserve breaks, apply and undo the schedule. The original reference is accurately labeled a planning board. No health assessment is inferred. |
| VJ Parivar | Original parking UI and allocation-window concept | Open/closed allocation window gates both bay selection and review. Floor, wing, compatible vehicles and prepared availability remain distinct. No real booking, price or current scarcity. |
| Code for Build | Original educational output/code pair | Editable content follows stable blocks through reordering, undo, structure view and escaped portable HTML export. The source is Flutter/Dart; this browser adaptation is explicitly HTML. |
| Ballah Code | Original product window and task/file handoff | Added a prepared signup-validation exercise with actual before/after checks and safe proposal/apply/undo. Results retain the function version they tested until rerun. No arbitrary code or live AI is executed. |
| Raahi | Pixel-inspected route, QR-ticket, next-stop, route-detail and service-blueprint assets | Correct references replace the brand-symbol sheet falsely labeled a transit interface. A missed-vehicle path keeps route and ticket context. Original case-study labels/headings were corrected too. Transit is prepared sample data. |

### Final checks and review evidence

- Build/TypeScript, 49-entry registry checks, 183 entrypoints, whitespace and blocking design audit passed. Existing design-audit warnings remain refactor targets.
- 54 baseline browser checks passed: 20 digital task flows, 24 physical/game viewport/theme checks, eight workshop checks including mobile WebKit, and two native ArtTown playback/seek profiles. The final new-feature suite passed all 18 drafts and two additional mobile lensing profiles with zero page errors.
- All 98 old world/prototype URLs redirect correctly, the unapproved workshop stays gated, the public index advertises only Shuffle and development previews are excluded from production. Homepage startup, themes/viewports, deferred images, first 3D frame, lighting request count, idle/offscreen pause, expansion/Escape and failure/low-power fallbacks passed. Shuffle geometry/interaction and hero source were unchanged in this pass.
- Another 36 screenshots cover all 18 drafts in desktop dark/mobile light. Reviewers independently inspected all 18 in desktop/mobile light. Task captures complement these states; recordings are supplied individually for every draft.
- Native Chromium mouse/touch tests changed stage rotation 0 → 83 degrees and mill progress 0 → 1. Lensing fits 320px Chromium/light and 390px WebKit/dark, responds to touch and keyboard, pauses while idle and wakes on keyboard input. Font failure and scene-module failure recovery passed.
- Five 3D scenes recorded local first draw calls at 537.6–752.4ms and zero draw calls in every sampled idle window. An earlier run interrupted by development reloads was discarded. The final renderer sample used frozen source files. Measurements are unthrottled development observations, not production percentiles or a controlled speedup.
- Visible draft readiness ranged from 428 to 638ms in the 18-recording run. The JSON also reports local encoded resource bytes; those are development payload observations, not transfer cost, production bundle size or cross-origin audio cost. Dependencies may be warm.

Evidence root: `/tmp/portfolio-draft-level`. Each `fidelity/<slug>/` contains `interaction.png` and `interaction.webm`. `fidelity/report.json` records every task and startup observation; `fidelity/black-hole/mobile-*.png` contains mobile lensing results. `workshop`, `prototypes`, `physical`, `arttown`, `edges`, `direct`, `curation`, and `performance` hold baseline screenshots, recordings and machine-readable results. The independent reports are `/tmp/portfolio-review-B/new-edge-review.md` and `/tmp/portfolio-design-review-A/third`.

Physical iPhone hardware, screen-reader speech, live Figma uptime, original instrument timbre, trained Enigma drawing recognition and numerical physics/economic accuracy are not established by these tests. These limits remain visible in the drafts. No quality score, user approval, commit, push or deployment was inferred from automated checks.


## Latest visual refinement

A fresh source comparison prioritized Jugalbandi, Enigma and Moniac. Two independent read-only reviewers inspected the original assets and the other 15 drafts. The refinement preserves the existing tasks and approval gates.

- **Jugalbandi:** neutralized the double-tinted timber texture, kept painted yellow panels distinct from bare wood, staggered the Hexa sensors from the photographed arrangement, and added the harp’s tuning pins/string anchor eyelets. Camera fitting uses each visible instrument’s bounds to avoid excessive empty space. Model checks retain all four instruments, mounted rainsticks and pick targets; 523 constructed meshes batch to 147 retained meshes.
- **Enigma:** the exhibition itself uses dark lighting in both page themes. Bulb emission follows the per-instance signal color; inactive bulbs remain unlit. The shader’s fragment color define was corrected after visual inspection caught uniform emission. Printed alphabet labels have transparent backgrounds, the front tablet retains its white page margin, and the extra physical keyboard was replaced by accessible on-screen A–Z controls. Typed input remains the reliable path; no trained drawing model was invented.
- **Moniac:** restored the original blue water-gauge character and made all seven existing browser policy settings visible. Each gauge label selects its rule explanation, with editable native ranges during exploration/play. The underlying game and deterministic-step formulas are unchanged. The original cabinet’s six valves still have no asserted policy assignments; no unsupported hydraulic topology or calculated water simulation was added.
- **Digital prototypes:** product headings use the existing sans family while portfolio page titles retain their display face. Ballah’s short source exercise starts with a compact resizable editor. Parking distinguishes occupied, incompatible-vehicle and closed-window states through separate labels/treatments; closed allocation no longer paints every bay as occupied. MiniApps offers full-size original screen inspection alongside its working Notes task.
- **Other physical/media drafts:** Salt opens on the actual mill/handle, with the wider installation still available through Overview. Stage footprint dimensions are labeled on the diagram. Black Hole’s dark study has stronger fill/floor separation while retaining black materials. ArtTown displays its original artwork beside the real player, with archived audience totals explicitly identified as historical.
- Open-floor scenes use a continuous floor and distance fading to avoid the previous hard backdrop/floor edge. This remains object staging, without an image-on-a-wall fallback.

### Confirmation

The single correction batch addressed the LED shader, backdrop edge and Black Hole separation found by the rendered inspection. Final evidence contains 72 profiles: all 18 at 1440px/390px in both themes, with zero page/shader errors and no document overflow. Source comparison remains a visual/proportional review, not a measured scan or quality score.

Build/TypeScript, registry coverage, 183 route entrypoints and whitespace checks passed. Twenty digital task flows, 24 physical/game profile checks and two native ArtTown playback/seek profiles passed. The final feature suite passed all 18 tasks, produced an individual recording for each draft, and passed Chromium/WebKit mobile lensing checks. All 98 legacy redirects, the Shuffle-only public index, workshop approval gate and production draft-chunk exclusion passed. Homepage loading, themes/viewports, desktop first frame, idle/offscreen behavior and WebGL/low-power recovery passed.

Direct native touch still turns the stage 0 → 83 degrees and the mill 0 → 2. The Salt test now starts on the visible handle in the new default Object view; the old Overview coordinates were replaced. The rendering sample taken separately after other browser checks recorded first draws at 591.1–837.5ms and zero idle draw calls across five 3D scenes. A concurrent-browser sample was not used as a startup comparison. Both samples are local development observations, not field percentiles or a controlled speedup.

Evidence root: `/tmp/portfolio-visual-next`. `before` and the two reviewer directories preserve the initial/source comparisons. `after` contains the final 72 screenshots and detailed priority states; `after/report.json` records fit/errors. `fidelity/<slug>/interaction.png` and `interaction.webm` cover every draft. `physical`, `prototypes`, `arttown`, `curation`, `performance-final`, `direct.log` and `home.log` record the other results.

Shuffle’s simulation and homepage hero source were not edited. No draft was approved, committed, pushed or deployed. Original recordings, access restrictions and the earlier fidelity limits remain in place; passing this round does not establish physical-device testing, live Figma uptime, original instrument timbre, trained recognition or numerical simulation accuracy.


## Draft directory cards

The local `/experience-preview` directory now shows all 18 drafts as image cards. Each includes its registry-derived experience type, project name, a specific visitor activity, a source/sample-data limitation where relevant, draft status and a link to the development preview. Images use existing project assets, reserve their dimensions, load lazily below the first row and offer a fallback without losing the explanation or link. ArtTown uses its historical series artwork rather than a screenshot of an old portfolio page.

Build/TypeScript and whitespace checks passed. All 18 images/descriptions/routes were checked at 1440px light, 820px dark, 390px dark and 320px light; there was no horizontal overflow. Opening a card reached the correct draft. Simulated image failure retained the named card/link. The final desktop/mobile confirmation checked every image against its reserved frame. No canvas mounts on the directory, and its development-only modules remain excluded from the production build. Screenshots are under `/tmp/portfolio-review-index`. Approval states and the public directory are unchanged; no deployment was performed.
