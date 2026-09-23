# Campaign caption provenance

Generated on 2026-09-23 from the existing local campaign MP4 files. Captions are labelled automatic in the player and visible transcript. They have not been certified by a human listener.

- `theme-release.mp4`: English narration transcribed with faster-whisper / large-v3-turbo, using word timestamps. Compared with a separate small-model transcript. Several phrases remain uncertain, including “radical to a plant,” “shroud of the leaves,” “Slap your wings,” and “all about man's attempt.” Do not silently upgrade these captions to reviewed status.
- `crafting-decade-theme.mp4`, `crafting-decade-trailer.mp4`, `website-release.mp4`, `event-story.mp4`: the audio classifier identified music throughout sampled ten-second windows. Both speech transcription runs found no sustained intelligible speech. Captions therefore describe music without invented dialogue or instrument detail. These sound descriptions are also automatic.
- `official-product-intro.mp4`: PyAV inspection found a 3.5-second H.264 video stream and no audio stream. The player identifies the clip as silent.

The audio classifier was [MIT AST, fine-tuned on AudioSet](https://huggingface.co/MIT/ast-finetuned-audioset-10-10-0.4593). Classification is evidence for the automatic sound description, not a substitute for human review. The rendered QA report retains an automatic-caption review warning.

The VTT files are in `public/Assets/captions`. Text alternatives in `src/data/campaignCaptions.ts` contain the same source transcription. No original MP4 was altered.

## Project films

The portfolio now also carries compressed local Documentation Lab final edits for Jugalbandi, Enigma, Shuffle, Drowning, Making of Time, Moniac Machine, and The Omakase. The source filenames and SHA-256 hashes are in `project-film-sources.json`; the source folder was `NYU ITP/Documentation Lab/Edit Video/Final Videos`. These are local final exports; the Vimeo links remain available for the published versions.

The copies preserve source timing and audio, with H.264 video at up to 1280×720, CRF 27, a 1.6 Mbps ceiling, and 96 kbps AAC audio. `preload="none"` prevents the films from becoming part of the initial page download.

Jugalbandi contains an instrumental performance and spoken introduction/closing remarks. Its automatic transcript was generated with large-v3-turbo, with a separate pass over the speech windows. The other audible films use automatic sound descriptions derived from the same audio classifier; crowd chatter in Omakase is described rather than given invented dialogue. These captions still require a human listening pass.

The decoded Making of Time audio stream contains only zero-valued samples (peak and RMS both 0.0). Its player is labelled silent and does not require a speech track.
