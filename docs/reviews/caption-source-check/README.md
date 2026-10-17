# Caption source check, 17 October 2026

Prepared on `fix/source-caption-corrections`, based on `f326bd79f7a6a5da243960a8766432597b842bbb`. Submitted for pull-request review only; no merge or deployment is included. Shuffle and both footer versions are excluded from edits.

## What the 14 warnings mean

The previous production report contains seven route warnings repeated at desktop and mobile widths. These cover 11 distinct caption tracks, including Shuffle. They indicate automatic captions awaiting editorial review, rather than missing tracks or failed playback.

| Route | Tracks reported | Result |
| --- | --- | --- |
| `/jugalbandi` | Jugalbandi | Correct missing speech, instrument spelling, timing and wrapping; retain one uncertain announcement. |
| `/enigma` | Enigma | Recheck source; retain music description. |
| `/shuffle` | Shuffle | Inspect existing track delivery only; source, caption and implementation unchanged. |
| `/drowning` | Drowning | Recheck source; retain music description. |
| `/moniac-machine` | Moniac | Recheck source; retain music description. |
| `/motion/vishwa-conclave-motion` | Five campaign films | Correct theme narration and three caption end times. |
| `/motion/editing-motion-stories` | Enigma twice, Omakase, Drowning | Shared tracks checked; correct Omakase end time. |

Omakase's standalone case study is also included in browser checks because it uses the corrected shared track.

## Source evidence and corrections

Use the current local final exports, preserving all MP4 bytes. [Source evidence](source-evidence.json) records exact copy hashes, decoded durations and independent transcription outputs. This is an automated source check, not a human listening certification. It does not replace the original provenance manifest.

Two local faster-whisper models were compared for narrated films. Additional isolated speech windows without voice-activity filtering recovered words that the first pass missed. The eight other audited recordings received a small-model speech check; absence of recognized speech does not prove that every background voice was captured. Three isolated “You” outputs over campaign music were rejected as insufficient evidence.

| Passage | Before | After |
| --- | --- | --- |
| Jugalbandi introduction, 00:13.340 | “Parth.” | “we have Parth.” |
| Jugalbandi closing, 04:33.740 | Omitted | “Keep it going for Parth.” |
| Jugalbandi announcement, 04:36.560 | Included only in “[Applause and audience voices]” | “That was [unclear].” Independent readings disagree. |
| Jugalbandi instruments | “tampura”; rain/stick split across cues | User-confirmed “tanpura”; “rainstick” kept together. |
| Theme film, 00:46.340 | “Slap your wings” | “Flap your wings”, supported by both isolated-window readings. |
| Three theme-film passages | Uncertain guesses presented as words | Explicit `[unclear]` markers; matching visible transcript. |

Cue ends now stay within decoded audio for Jugalbandi, Omakase, Crafting the Decade theme, website release and the 2021 theme release. No sound or instrument detail was invented for music descriptions.

## Remaining source limits

Online searches and inspection of the [original campaign post](https://www.instagram.com/p/CLEvdDdDYRg/) did not find an authoritative written narration. Its post caption is a campaign statement, not the spoken poem. It credits Parallel Studio for animation; that does not establish the narration text.

Unresolved spans are Jugalbandi 04:36.560–04:39.380 and theme release 00:19.840–00:23.320, 00:39.580–00:42.320, 00:57.320–01:01.640. They remain marked `[unclear]`. All tracks retain their automatic status and editorial warnings. No original script or raw camera audio was available in this checkout.

## Verification

- Production build and static route generation passed.
- `node scripts/caption-source-qa.mjs`: ten recording hashes, cue syntax, ordering, audio bounds, line length, transcript parity and 14 protected source hashes passed.
- `node scripts/guarded-build-qa.mjs`: protected-content build boundaries passed.
- `QA_BASE_REV=f326bd79f7a6a5da243960a8766432597b842bbb node scripts/release-without-footer-qa.mjs`: production footer unchanged; experimental footer absent from build.
- All 274 separately preserved unfinished-footer files match their saved checksums.
- Rendered audit: seven routes, 14 desktop/mobile checks, zero failures, 14 automatic-caption warnings intentionally retained. See [report](rendered.md).
- Browser verification passed all 32 route/profile checks with zero failures; results are recorded in the [browser report](browser-report.json). The suite checks native cue parsing, served VTT contents, meaningful seeks, muted playback, keyboard access to downloads, transcript parity, overflow and page exceptions across Chromium/WebKit, desktop/mobile, and light/dark themes. WebGL is disabled only in this media-focused test; no renderer performance claim is made.
- The pull-request workflow runs the source and browser caption suites when caption assets, transcript data, caption tests or this audit change. The job uploads its own screenshots, recording and results; recorded local results above are separate from CI results.

Initial attempts exposed a stopped preview server and a test that counted videos before page hydration. The server was restarted and the test now waits for the route and expected video elements. Neither attempt was counted as a passing application check.

Reproduce with a built preview at `http://127.0.0.1:5236/`:

```sh
QA_OUTPUT_DIR=/tmp/portfolio-caption-browser node scripts/caption-browser-qa.mjs
QA_BASE_URL=http://127.0.0.1:5236 QA_RENDERED_ROUTES=/jugalbandi,/enigma,/shuffle,/drowning,/moniac-machine,/motion/vishwa-conclave-motion,/motion/editing-motion-stories QA_RENDERED_REPORT_PATH=/tmp/caption-rendered.md node scripts/rendered-site-qa.mjs
```

Local review: [Jugalbandi film](http://127.0.0.1:5236/jugalbandi/#cs-film), [VishwaConclave campaign](http://127.0.0.1:5236/motion/vishwa-conclave-motion/).

## Review captures

- Jugalbandi restored closing line: [desktop, light](jugalbandi-chromium-1440-light.png), [mobile, dark](jugalbandi-chromium-390-dark.png).
- Theme-film transcript with corrected “Flap” and explicit uncertainty: [desktop, dark](campaign-transcript-webkit-1440-dark.png), [mobile, light](campaign-transcript-webkit-390-light.png).
- [Mobile interaction recording](mobile-caption-interaction.webm): seeking, native captions, downloads and transcript disclosure across the audited routes. Playback is muted for automation; this recording is visual interaction evidence, not an audio listening review.
