# Project page fixes, 2026-09-23

The mobile menu now has a contrasting surface. Seven compressed local final films provide playback without a Vimeo connection, retain separate Vimeo links, and defer film downloads until Play. External-only videos have a poster, explicit Play action, and loading/recovery states. The Omakase film and BreakGen source page use the shared player.

Computational Media now includes a working restoration of the original camera-pixel painting sketch and downloadable copies of the archived source. Automatic captions cover eleven audible films; two inspected silent clips are identified as silent. Source and transcription limits are recorded in the adjacent provenance documents.

## Verification

- Production build, TypeScript, 49-project route manifest, design-system blocking checks, and cursor voice contract passed.
- All 160 rendered checks across 80 routes passed at 1207×953 and 390×844. Healthcare and Fintech each timed out under concurrent desktop load and passed the isolated retry. The report retains those recoveries as warnings.
- Browser interaction checks passed for menu contrast in light/dark themes, sample painting, pause, simulated camera start/stop and stream release, deferred film requests, all seven local films plus the editing page, forced media failure/reload, direct Vimeo links, campaign caption cue loading, and silent-video handling.
- All eleven WebVTT files have valid ordered, non-overlapping cues.
- Representative desktop/mobile visual checks completed. The new player preserves the surrounding case-study layouts.
- The same project interaction checks are included in deployment verification and weekly QA through `bun run qa:project-pages`.

## Remaining review limits

Automatic captions and sound descriptions are labelled as such and still require a human listening pass. The QA report continues to flag them. Browser playback tests used muted playback and establish decoding/time advancement, not audio fidelity or transcription accuracy.

Vimeo returned a connection-security restriction during testing. The local player removes that dependency for the seven sourced films; Vimeo links remain an alternative, whose availability depends on the viewer's connection. BreakGen is not a public route in the current route registry; its shared-player conversion was build-checked.

The existing About-page h1 warning was preserved. No production deployment was performed for this change set.
