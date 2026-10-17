# WebKit cover timeout investigation

17 October 2026. The original failed run is retained in `cover-lifecycle-results.json`.

## Evidence

The original WebKit desktop/light rapid-selection trace contains a response for the optional `CoverPreview` module but no completed body snapshot. Its content size is `-1`; no player observer was registered, no `data-cover-motion` state appeared, and no preview media was requested. The cover still had hover intent. The trace supports an incomplete optional-module load before the player mounted. It does not identify why that request stalled, and does not establish a player scheduling defect.

## Controlled checks

Six fresh WebKit contexts repeated the same Mentra → Raahi → TransFi → Raahi selection sequence:

- Two held the real module request through a seven-second delay before allowing the network request to continue.
- Two downloaded the module first, then held its delivery through a seven-second delay.
- Two used normal module loading without interception.

All six passed. In the four delayed cases, the player reached `playing` within 57–315 ms after release, inside the unchanged eight-second assertion. The three original Raahi screens loaded; the retained trace records request completion. These controlled checks did not reproduce the original stall. Results and timestamps are in `webkit-timeout-investigation.json`.

## Regression coverage

The lifecycle suite now includes delayed-module and failed-module cases for both browser engines and themes. A delayed module must preserve the original cover, load the latest selected screens after release, and switch to an advancing Mentra film with one active player. An aborted module must retain the fully opaque original cover, request no preview media, and leave the actual project link usable. Failed-run diagnostics now include module request completion, resource timings, document visibility and player-observer counts.

`QA_COVER_ENGINE` and `QA_COVER_CASE` can select a bounded reproduction without changing default CI coverage or playback deadlines. An empty selection fails the script.

The expanded final lifecycle run passed all 52 cases. See `cover-lifecycle-final-results.json`. The original eight-second post-release playback assertion remains unchanged.

No runtime player change was made without a reproducible defect. Shuffle and footer sources remain unchanged.
