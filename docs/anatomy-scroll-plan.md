# Selective Anatomy scroll plan

Reviewed the 50 routable projects against their current case-study source and explicit evidence registry. This is a catalog/content audit, not a new frame-by-frame review of every film or private asset. No deployment or approval promotion is included.

## Implemented in this pass

Two preview-gated additions to expanded case studies: Revolving Stage and Jugalbandi. The original photographs, films, interactive demos and access gates remain in place. The drawings lazy-load only when the reader approaches them. Scroll changes the mechanical pose without hijacking page scrolling or playing sound. Native step buttons pause scrolling control; reduced motion uses these buttons by default. No idle render loop runs.

Revolving Stage: fixed base → caster support → central axle → assembled deck. Geometry and footage provenance stay with the existing draft. Jugalbandi: sequence → string loading → release → rest. Travel and timing remain explicitly illustrative.

## Catalog decisions

| Project | Decision | Reason and useful next direction | Source file |
| --- | --- | --- | --- |
| mentra | Keep task prototype | Complete glasses onboarding. Use real interface states and documented transitions; an isometric assembly is unnecessary. | MentraPage.tsx |
| mentra-miniapps | Keep task prototype | Discover and launch a glasses app. Use real interface states and documented transitions; an isometric assembly is unnecessary. | MentraMiniAppsPage.tsx |
| transfi-project | Keep protected case study | Preserve original screens and reviewer access. No public mechanical reconstruction of protected flows. | TransfiPage.tsx |
| zentipay | Keep protected case study | Preserve original screens and reviewer access. No public mechanical reconstruction of protected flows. | ZentipayPage.tsx |
| clawed-chat | Keep task prototype | Approve an assistant action and inspect its receipt. Use real interface states and documented transitions; an isometric assembly is unnecessary. | ClawedChatPage.tsx |
| executivelens | Keep task prototype | Inspect a meeting summary citation. Use real interface states and documented transitions; an isometric assembly is unnecessary. | ExecutiveLensPage.tsx |
| org-dashboard | Keep task prototype | Review organizational context and approve an action. Use real interface states and documented transitions; an isometric assembly is unnecessary. | OrgDashboardPage.tsx |
| cuetv | Keep protected case study | Preserve original screens and reviewer access. No public mechanical reconstruction of protected flows. | CueTvPage.tsx |
| healthapp | Keep task prototype | Rebalance tasks around daily capacity. Use real interface states and documented transitions; an isometric assembly is unnecessary. | HealthAppPage.tsx |
| medimorpho | Keep research journey | Preserve interview evidence and access controls; do not turn a healthcare workflow into a decorative machine. | MediMorphoPage.tsx |
| ibm | Keep research diagrams | Encrypted computation is documented by diagrams and plots; a physical analogy must not imply a released or clinically validated implementation. | IbmPage.tsx |
| ballah-code | Keep task prototype | Review a proposed component change. Use real interface states and documented transitions; an isometric assembly is unnecessary. | BallahCodePage.tsx |
| ai-voice | Keep protected case study | Preserve original screens and reviewer access. No public mechanical reconstruction of protected flows. | AiVoicePage.tsx |
| raahi-project | Keep task prototype | Plan a journey across transit touchpoints. Use real interface states and documented transitions; an isometric assembly is unnecessary. | RaahiPage.tsx |
| the-point-cdc | Keep source-led case study | Original website link and case study; no standalone room needed. No source-supported mechanical scroll sequence identified in this audit. | ThePointCdcPage.tsx |
| office-of-diversity | Keep source-led case study | Public report evidence; no room or invented report content. No source-supported mechanical scroll sequence identified in this audit. | OfficeOfDiversityPage.tsx |
| jugalbandi | Implement | Scroll through a single servo pluck: sequence, string loading, release, rest. Reuse the photo-based harp drawing; no scroll audio or claimed model inference. | JugalbandiPage.tsx |
| vj-software | Keep task prototype | Select a parking space and review a booking. Use real interface states and documented transitions; an isometric assembly is unnecessary. | VjSoftwarePage.tsx |
| enigma | Leave untouched | The user prefers the existing light-network experience. Keep typed-letter interaction. | EnigmaPage.tsx |
| shuffle | Leave untouched | Approved reference; no new illustration or scroll behavior. | ShufflePage.tsx |
| making-of-time | Keep the clocks | The existing shadow/mechanical/digital comparison is the relevant interaction. Recovered escapement drawings would be needed for an accurate cutaway. | MakingOfTimePage.tsx |
| sea-of-salt | Keep direct interaction | The crank and story slider already convey consequence. An internal cutaway needs verified internals and movement evidence first. | SeaOfSaltPage.tsx |
| flow-fields | Keep original experiment | Explain particle direction and accumulation through the working field, not an invented machine. | FlowFieldsPage.tsx |
| embodied-web | Keep source-led case study | StudyExplorer and related project evidence; no released standalone pose-controlled experience verified. No source-supported mechanical scroll sequence identified in this audit. | EmbodiedWebPage.tsx |
| feeling-patterns | Keep source-led case study | Textile study and related evidence; no verified haptic hardware simulation. No source-supported mechanical scroll sequence identified in this audit. | FeelingPatternsPage.tsx |
| performance-by-design | Keep source-led case study | StudyExplorer and related evidence; avoid invented cue or audience behavior. No source-supported mechanical scroll sequence identified in this audit. | PerformanceByDesignPage.tsx |
| on-becoming | Keep essay | The work is a reflection, not an assembly. | OnBecomingPage.tsx |
| storytelling | Keep source-led case study | StudyExplorer and related evidence; no separate runnable narrative verified. No source-supported mechanical scroll sequence identified in this audit. | StorytellingPage.tsx |
| dna-speculative | Keep speculative artifact | No verified biological mechanism supports an explanatory machine. | DnaPage.tsx |
| comp-media | Keep original experiment | Camera sampling and particle marks are best explained inside the actual restored sketch. | IntroCompMediaPage.tsx |
| hypercinema | Keep source-led case study | StudyExplorer and related evidence; no verified navigable 360 asset in the standalone room. No source-supported mechanical scroll sequence identified in this audit. | HypercinemaPage.tsx |
| applications | Keep source-led case study | StudyExplorer evidence; no project-specific standalone implementation verified. No source-supported mechanical scroll sequence identified in this audit. | ApplicationsPage.tsx |
| messy-humans | Keep source-led case study | Research and StudyExplorer; no invented personas or task outcomes. No source-supported mechanical scroll sequence identified in this audit. | MessyHumansPage.tsx |
| production-studio | Keep source-led case study | Production evidence and StudyExplorer; generic room does not demonstrate production work. No source-supported mechanical scroll sequence identified in this audit. | ProductionStudioPage.tsx |
| arcade-lab | Keep source-led case study | Related evidence and Omakase project; no separate arcade-lab game verified. No source-supported mechanical scroll sequence identified in this audit. | ArcadeLabPage.tsx |
| black-hole | Keep separate studies | Preserve the distinct demonstrations; a new assembly could incorrectly imply a mechanical model of the physics. | BlackHolePage.tsx |
| uv-light | Keep original evidence | The reveal depends on photographed UV marks; no speculative room or reconstruction. | UvLightPage.tsx |
| the-omakase | Keep playable game | Buttons, ingredient mapping and the cabinet film already explain the interaction. Do not replace a playable task with a cabinet assembly. | TheOmakasePage.tsx |
| revolving-stage | Implement | Build the load-support story from fixed base through caster rings and central axle to deck. Reuse the audited assembly; preserve the rotation demo. | RevolvingStagePage.tsx |
| moniac-machine | Defer Anatomy | Keep the economic game. Explain its simplified equations if needed; six cabinet valves have no verified policy assignments. | MoniacMachinePage.tsx |
| dumb-waiter-set-design | Keep scenic evidence | The spatial concept matters; no measured model is recovered for an accurate assembly. | DumbWaiterPage.tsx |
| drowning | Keep lighting study | Light changes explain this set. Preserve the film and existing lighting slider. | DrowningPage.tsx |
| sculpture | Keep process photographs | Armature-to-surface sequence could use original photos. An invented digital anatomy would misrepresent the sculpture. | SculpturePage.tsx |
| mentra-brand | Keep brand assets | Packaging and identity evidence take priority; no verified dielines or editable assembly rules. | MentraBrandPage.tsx |
| tedx | Defer geometry | Parallax cityscape is a promising layered-view study, but exact layer spacing and cue sequence are not verified. Preserve build photos. | TedxPage.tsx |
| code-for-build | Keep task prototype | Arrange blocks and inspect corresponding code. Use real interface states and documented transitions; an isometric assembly is unnecessary. | CodeForBuildPage.tsx |
| typeface | Leave untouched | Real font manipulation already explains the work. A mechanical illustration would add no useful action. | TypefacePage.tsx |
| atps | Keep listening archive | Guest discovery and real recordings are the project experience. | AtpsPage.tsx |
| vishwaconclave | Keep campaign editions | Use real campaign/motion assets; flattened boards do not support an editable mechanical workbench. | VishwaConclavePage.tsx |
| glassly | Keep original demo | The synchronized phone/glasses demo explains the product better than invented glasses internals. | GlasslyPage.tsx |

## Review links

- Stage case study: `/revolving-stage#cs-stage-story`
- Harp case study: `/jugalbandi#cs-harp-story`

These sections mount only in builds with the existing experience-preview flag. Their drafts remain unapproved. Butler’s Slice, Enigma and Shuffle have no source changes in this pass.

## Verification and limits

The shared scroll controller schedules one requestAnimationFrame after a scroll or resize event, only while the story intersects the viewport and the tab is visible. It cancels pending work on unmount, pause and hidden-tab transitions. There is no continuous render loop. SVG transforms and paths update through refs; chapter state changes update the readout. Step selection pauses scroll control.

The stage retains the previously audited 91-solid geometry. The harp reuses the existing source-based reconstruction and pluck model. Its full volumetric clearance audit remains outstanding from the original draft; these new scroll checks do not establish original controller fidelity. Camera framing and contrast are explanatory choices. No original timings, channel mapping or acoustic recordings are synthesized as evidence.

Automated QA lives in `scripts/anatomy-scroll-qa.mjs`: both stories across desktop Chromium, touch Chromium and mobile WebKit, each in light/dark themes. It verifies lazy loading before expansion, deep-link expansion, manual and keyboard steps, reverse scrolling, no drawing mutations at idle, reduced motion, no horizontal overflow and no canvas/audio/video in the story. Screenshots and a recording are retained with the review evidence. Real-device field performance is not measured.

Final build sizes: the harp story, including its harp-only geometry, is 48.09 KB gzip. The earlier shared three-instrument asset was 96.90 KB gzip; the case study no longer needs that asset. The stage uses the shared 23.17 KB gzip assembly asset plus a 1.28 KB story module. The shared scroll controller is 1.38 KB gzip, with 1.12 KB CSS. These are generated bundle sizes, not measured site-wide speed gains.

Build and TypeScript passed. The homepage loading suite passed, including first frame, idle/offscreen stopping and WebGL fallback. All 50 registry/redirect checks passed. The blocked-chunk test preserved the surrounding case study and recovered through the reload control. The harp line-end audit reported zero floating ends in its loaded pose; this does not replace the outstanding volumetric audit.
