# Campaign caption provenance

Generated on 2026-09-23 from the existing local campaign MP4 files. Captions are labelled automatic in the player and visible transcript. They have not been certified by a human listener.

- `theme-release.mp4`: English narration transcribed with faster-whisper / large-v3-turbo, using word timestamps. Compared with a separate small-model transcript. The initial September pass flagged four phrases, including “radical to a plant,” “shroud of the leaves,” “Slap your wings,” and “all about man's attempt.” The October source check below resolves “Flap” and marks the three remaining gaps explicitly. Do not silently upgrade these captions to reviewed status.
- `crafting-decade-theme.mp4`, `crafting-decade-trailer.mp4`, `website-release.mp4`, `event-story.mp4`: the audio classifier identified music throughout sampled ten-second windows. Both speech transcription runs found no sustained intelligible speech. Captions therefore describe music without invented dialogue or instrument detail. These sound descriptions are also automatic.
- `official-product-intro.mp4`: PyAV inspection found a 3.5-second H.264 video stream and no audio stream. The player identifies the clip as silent.

The audio classifier was [MIT AST, fine-tuned on AudioSet](https://huggingface.co/MIT/ast-finetuned-audioset-10-10-0.4593). Classification is evidence for the automatic sound description, not a substitute for human review. The rendered QA report retains an automatic-caption review warning.

The VTT files are in `public/Assets/captions`. Text alternatives in `src/data/campaignCaptions.ts` contain the same source transcription. No original MP4 was altered.

## Project films

The portfolio now also carries compressed local Documentation Lab final edits for Jugalbandi, Enigma, Shuffle, Drowning, Making of Time, Moniac Machine, and The Omakase. The source filenames and SHA-256 hashes are in `project-film-sources.json`; the source folder was `NYU ITP/Documentation Lab/Edit Video/Final Videos`. These are local final exports; the Vimeo links remain available for the published versions.

The copies preserve source timing and audio, with H.264 video at up to 1280×720, CRF 27, a 1.6 Mbps ceiling, and 96 kbps AAC audio. `preload="none"` prevents the films from becoming part of the initial page download.

Jugalbandi contains an instrumental performance and spoken introduction/closing remarks. Its automatic transcript was generated with large-v3-turbo, with a separate pass over the speech windows. The other audible films use automatic sound descriptions derived from the same audio classifier; crowd chatter in Omakase is described rather than given invented dialogue. These captions still require a human listening pass.

The decoded Making of Time audio stream contains only zero-valued samples (peak and RMS both 0.0). Its player is labelled silent and does not require a speech track.

## Local source check, 17 October 2026

The [caption audit](reviews/caption-source-check/README.md) maps the 14 rendered warnings to seven routes and 11 unique caption tracks. Shuffle is excluded from edits. Ten other recordings were checked against their current local final-export copies, with fresh large-v3-turbo/small-model comparisons, isolated no-VAD speech windows, and decoded audio durations. Exact reviewed-copy hashes and the model comparisons are in `reviews/caption-source-check/source-evidence.json`. No film was re-encoded or edited.

- Jugalbandi: restore “we have” in the introduction and the omitted “Keep it going for Parth” closing remark. Correct the user-confirmed instrument name to “tanpura,” keep “rainstick” together, and align speech boundaries to the source words. The short announcement at 04:36.560–04:39.380 remains “That was [unclear]” because the independent model/window readings disagree on the following words. Proper-name spelling uses the documented performer identity.
- VishwaConclave theme release: isolated 00:45–00:49 windows from both models support “Flap your wings,” correcting “Slap.” Three other ambiguous passages are marked `[unclear]`, rather than publishing uncertain guesses: 00:19.840–00:23.320, 00:39.580–00:42.320 and 00:57.320–01:01.640. The visible transcript and VTT are kept in sync. Online searches and inspection of the [original campaign post](https://www.instagram.com/p/CLEvdDdDYRg/) did not locate a written narration script. The post contains a campaign statement rather than the spoken poem; it does not settle these passages.
- Clip cue ends to decoded source-audio bounds for the Jugalbandi closing applause, The Omakase, Crafting the Decade theme, website release and the 2021 theme release. Do not extend music descriptions beyond the recorded audio.
- The remaining music/ambience descriptions are unchanged. The fresh small-model pass found no sustained intelligible narration in those eight tracks. Three music-only campaign passes returned the isolated token “You”; it was rejected as insufficient speech evidence. Automatic speech recognition, including a no-speech result, is not proof that every background voice has been captured.

All tracks remain labelled automatic. No caption has been promoted to human-reviewed status, and the rendered QA warning is intentionally retained. The original recordings, original `project-film-sources.json` provenance record, Shuffle player/captions, and production/unfinished footer sources remain unchanged. Raw camera audio and an authoritative written narration script were not available in this checkout.
