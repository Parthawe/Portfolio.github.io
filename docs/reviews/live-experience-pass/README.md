# Live experience review, October 15, 2026

This pass starts from deployed commit `3c77dc2`. Changes are local on `fix/live-experience-review`; no deployment or approval promotion is included. Shuffle's code, assets and simulation remain unchanged.

The live collection contains Shuffle and 19 drafts. The drafts were visited individually at 1440px/dark and 390px/light, then compared with the available original project photographs, drawings, recordings, interface captures and source metadata. Captured recording frames cover Jugalbandi at approximately 1:17, 2:35 and 3:52; Enigma at 0:24, 0:47 and 1:11; MONIAC at 0:16, 0:33 and 0:49. This is a source-informed review, not a claim that every original mechanism, firmware or production interface has been recovered.

## Project-by-project findings

| Experience | Comparison and finding | Action in this pass |
| --- | --- | --- |
| Butler's Slice | Actual supplied font outlines and three weights remain the right experience. No evidence supports a room or a false original-font comparison. | Retain the working canvas and point inspector; shared sequence controls only. |
| ArtTown | Existing series art and RSS episode metadata support listening and discovery. The native recording player, search and seeking are meaningful. | Retain the archive; check playback, seeking, search and episode switching. Standardize focused-page navigation. |
| Enigma | Original sculpture and recording show a frontal progression from tablet/input grid through mixed layers to alphabet output. The overview had too much framing space; a close tablet hid the resulting lights. | Fit the sculpture/tabletop more tightly with a straighter overview. Show the actual sampled 8 × 8 light input beside drawing mode. Keep mouse/touch UV drawing and explicit chosen labels; correct the fixed-tablet-view hint. |
| Jugalbandi | Original controller, harp, flute and eight rainsticks were present but too small to inspect. Playing regions and original performance evidence were hard to find from the duet. | Fit each drawing to its static bounds, enlarge panels, show play-region cues, add paired original photos and the original film beside the duet. Preserve all three responses, synthesized-sound disclosure, timing, and independent/ensemble views. Pause the film when hidden, unmounted or returning to play. |
| MONIAC | The original screen has a blue upper return chamber and six white wheel valves. The chamber was missing and the selected wheel was not marked persistently. | Restore the blue chamber; mark the selected wheel and connect it visibly to the inspector. Preserve the browser economic rules and the warning that cabinet wiring is not recovered. |
| Omakase | Original cabinet and hosted Unity game support an arcade presentation. The existing keyboard guide matches the original two-player controls. | Retain the original playable game; verify loading lifecycle, controls, stop/reload and directory return. Shared header/sequence controls only. |
| Revolving Stage | Original assembly drawings support eight chapters with deck, casters, bearing and base. Existing inspection is more useful than an invented room. | Retain the eight-chapter anatomy and source comparisons; shared focused-page navigation only. |
| Why the Sea is Salt | Original mill, black plinth and deposited salt support direct rotation and accumulated story progress. Olive control chrome was inconsistent with the other focused experiences. | Neutralize control chrome; preserve original object materials and the hand-operated mill/story. |
| Black Hole | Time Trap reference has two clocks around a central sphere. Proximity-based rates now move and remain explicitly illustrative. A mirror finish is not fully reconstructed. | Retain clock motion, reduced-motion stepping, original study separation and controls. Shared navigation only; no extra reflection-rendering pass. |
| Mentra | Original onboarding recording/prototype and actual product site are available. The empty initial prototype panel lacked a design preview. | Add the existing original onboarding poster; enlarge useful preview content and put the launch action first on phones. Remove the inert single-flow selector and duplicate footer navigation. |
| MiniApps | Four original Figma flows are connected. Small Mira/Streamer previews were difficult to inspect; multi-flow selection remains useful. | Enlarge useful previews, retain all four flow tabs, put launch before the preview on phones, and remove duplicate footer navigation. |
| Clawed | Original product-site capture and original hosted demo are available. The wrapper was mostly generic text. | Show the supplied product capture and retain the actual hosted demo link. No invented agent/backend behavior. |
| Executive Lens | Existing product URL is unverified; original site workflow capture exists. It cannot currently be presented as a verified live app. | Show the existing source capture while retaining the explicit unverified status and the labelled local study. A working product URL is still needed. |
| OrgDashboard | User confirmed this is not active. No complete original runnable app is available. | Retain the clearly labelled reconstructed task draft; improve preview sizing and launch placement, and remove redundant navigation/one-option tabs. |
| Health App | Original screen set supports the purple routine theme. The comparison incorrectly foregrounded a planning board. The reconstructed draft remains a limited task subset. | Compare against the actual screen set; crop excess preview whitespace, launch first on phones, and remove duplicate navigation/one-option tabs. |
| Vijay Parivar | Original parking interface supports the parking-selection task and orange palette. Occupancy is prepared sample data, not live availability. | Improve the preview and mobile launch placement; keep the reconstructed/sample-data labels and task behavior. |
| Code for Build | Original output/code evidence includes visual programming and 3D output. The draft is a smaller illustrative block/code task, not the full original app. | Improve preview and launch placement and retain the original output/code comparison. Do not imply the complete original runtime is reconstructed. |
| Ballah Code | Original IDE capture supports the code-review task and purple/dark editor. The task draft uses prepared code. | Improve preview and launch placement, retain the source IDE comparison and explicit draft labels, and remove duplicate navigation. |
| Raahi | Original route-list screens are more relevant to the journey task than a service blueprint. No live vehicle, ticketing or transit feed is connected. | Compare with the original route-list interface, improve preview/launch placement, and retain sample-data/no-live-transit wording. |

## Verification

- Before and after visual sweeps: 38 profiles each; no horizontal overflow or unhandled page errors.
- Production build and design-system audit.
- Focused Chromium desktop, Chromium mobile and WebKit mobile checks: fitted drawing bounds, play-region response, tablet sampling and clear, original-video failure recovery, persistent valve selection, interface previews and a single footer return control.
- Existing Enigma mouse/touch, multi-stroke, oblique coordinates, typed fallback, reset and idle checks.
- Existing Jugalbandi gesture/ensemble, audio, permission recovery, score and lifecycle checks. No extra GPU contexts, zero idle DOM mutations, and no offscreen/hidden audio starts in the activity sample.
- Existing MONIAC valve dragging, keyboard bounds, linked water, pause/resume, deterministic experiment and reset checks.
- All 20 retained interface task flows, controlled iframe lifecycle checks, and filtered-directory return checks.
- Curation: 58 checks, including 50 legacy project redirects, font workshop recovery and the approved Shuffle route.
- ArtTown recording playback, seeking, search and switching; Omakase lazy loading, stop/reload, keyboard guide and directory return.
- Homepage loading regression: static fallbacks, deferred images, one HDR request, desktop first frame, idle/offscreen pause and low-power/WebGL-unavailable fallback.

A fresh anonymous Chromium visit to the live Health App Figma embed loaded the prototype application without a login prompt. That is an access/load observation, not proof of completing every Figma task or a guarantee of future sharing settings. Controlled iframe tests are labelled separately.

The interaction recording includes deliberate source-video error injection to verify the Vimeo recovery link. That error is part of the test, not an observed broken recording.

## Evidence and remaining limits

`report.json` records compact before/after results and sampled runtime checks. Source-image and recording contact sheets, priority screenshots and an interaction recording accompany it. Full original captures remain under `/tmp/live-experience-review`; the final local sweep is under `/tmp/local-experience-review`.

Only Shuffle remains approved. The six reconstructed Figma task subsets have not become original files, and no inaccessible product has been replaced by an invented backend. Executive Lens still needs a valid product URL. Original firmware/model weights, exact Hexa-18 sensor wiring and original cabinet wiring remain unavailable; the UI keeps those limits explicit.
