# Project cover motion · local review

Reference: [Rachel Chen’s portfolio](https://www.rachelchen.tech/), inspected October 16, 2026. The reference uses inline short films and interface recordings. It informs the treatment; no code, footage, artwork or UI from that site was copied.

## Motion direction

Mode: Experience, within the existing portfolio identity.

Keep the existing still artwork, card dimensions, copy and navigation. The authored moment lives inside the cover: an original product/performance excerpt, a source-screen progression or the supplied typeface’s three actual weights. Titles and metadata stay readable. Small Index row thumbnails stay still; the large Index and Arc artwork use the same player.

Motion starts when someone browses, hovers or focuses a cover. A sequence plays once for at most 4.4 seconds and returns to the still. Later intent can replay it. Only one preview plays at a time. No extra WebGL context, animation framework, API service, audio or endlessly looping video is added. Touch remains normal scrolling and direct project navigation; Escape stops a keyboard preview.

The initial Home and Work loading queue contains no preview footage or screen-derivative requests. Optional player code is split from the initial page. The homepage waits for its normal deferred card visibility before that optional player can mount.

## Source and performance boundaries

Original films are shortened to silent, fast-start H.264 excerpts, 640 pixels wide at 20fps. The supplied source files remain unchanged. Phone sequences use smaller WebP derivatives of the same complete screens, with no interface content invented. Full original screens and demonstrations remain in their case studies. Butler’s Slice uses the real Ultralight, Regular and Bold font files.

Reduced motion, data saving, 2G, very limited memory/CPU and runtime/emergency performance mode keep stills. The existing site’s blanket phone flag was designed for 3D; it does not by itself disable these small, bounded media previews. Offscreen/hidden players pause and release their sources. Missing media or an optional player download failure preserve the still and project link.

Shuffle, its cover, hero rendering, footer source and experience approval states are unchanged. This pass is local and has not been deployed.

Asset provenance is recorded in `film-provenance.json` and `screen-provenance.json`. Rebuild with `python3 scripts/pack-cover-motion.py` using FFmpeg and Pillow (or the optional imageio-ffmpeg helper). The encoder is a development tool, not a website dependency.

The 10 unique excerpts total 883,243 bytes; the six screen derivatives total 286,218 bytes. All assets are demand-loaded; these totals are not the initial page transfer. Mentra and Mentra Brand share one excerpt.

## Catalog coverage

This is an asset-coverage decision for all 50 registry records, not a claim to have recreated or newly approved every experience. Fourteen covers have evidence-backed motion in this pass. A still entry means no suitable short recording/sequence was selected for this pass; it does not mean the original project has no source material.

| Project | Cover treatment |
|---|---|
| Mentra | Original public film excerpt |
| MiniApps in OS | Original screen progression |
| TransFi | Original public film excerpt |
| ZentiPay | Existing still; suitable motion evidence not selected |
| Clawed | Existing still; suitable motion evidence not selected |
| ExecutiveLens | Existing still; suitable motion evidence not selected |
| OrgDashboard | Existing still; suitable motion evidence not selected |
| CueTV | Existing still; suitable motion evidence not selected |
| Health App | Existing still; suitable motion evidence not selected |
| NYU Langone | Existing still; suitable motion evidence not selected |
| IBM Cancer Prognosis | Existing still; suitable motion evidence not selected |
| Ballah Code | Existing still; suitable motion evidence not selected |
| OnCall Lens | Existing still; suitable motion evidence not selected |
| AI Voice | Existing still; suitable motion evidence not selected |
| Raahi | Original screen progression |
| The Point CDC | Existing still; suitable motion evidence not selected |
| Office of Diversity | Existing still; suitable motion evidence not selected |
| Jugalbandi | Original public film excerpt |
| Keyboard Project | Existing still; suitable motion evidence not selected |
| BreakGen | Existing still; suitable motion evidence not selected |
| VJ Parivar | Existing still; suitable motion evidence not selected |
| Enigma | Original public film excerpt |
| Shuffle | Approved still, untouched |
| Making of Time | Original public film excerpt |
| Why the Sea is Salt | Existing still; suitable motion evidence not selected |
| Flow Fields | Existing still; suitable motion evidence not selected |
| Embodied Web | Existing still; suitable motion evidence not selected |
| Feeling Patterns | Existing still; suitable motion evidence not selected |
| Performance by Design | Existing still; suitable motion evidence not selected |
| On Becoming | Existing still; suitable motion evidence not selected |
| Storytelling | Existing still; suitable motion evidence not selected |
| DNA: Speculative Design | Existing still; suitable motion evidence not selected |
| Computational Media | Existing still; suitable motion evidence not selected |
| Hypercinema | Existing still; suitable motion evidence not selected |
| Applications | Existing still; suitable motion evidence not selected |
| Designing for Messy Humans | Existing still; suitable motion evidence not selected |
| Production Studio | Existing still; suitable motion evidence not selected |
| Arcade Lab | Existing still; suitable motion evidence not selected |
| Black Hole | Original public film excerpt |
| UV Light | Existing still; suitable motion evidence not selected |
| The Omakase | Original public film excerpt |
| Revolving Stage | Existing still; suitable motion evidence not selected |
| Moniac Machine | Original public film excerpt |
| Set Design for Pinter's The Dumb Waiter | Existing still; suitable motion evidence not selected |
| Drowning | Original public film excerpt |
| Sculpture | Existing still; suitable motion evidence not selected |
| Mentra Brand & Packaging | Original public film excerpt |
| TEDxVITPune | Existing still; suitable motion evidence not selected |
| Code for Build | Existing still; suitable motion evidence not selected |
| Butler's Slice | Three supplied font weights |
| ArtTown Podcast | Existing still; suitable motion evidence not selected |
| VishwaConclave | Original public film excerpt |
| Glassly | Existing still; suitable motion evidence not selected |

## Verification

`node scripts/cover-motion-qa.mjs` checks actual film progress, finite playback, screen assets, three real weights, single-player ownership, direct keyboard/touch navigation, all three Work views, hidden/offscreen release, live reduced-motion changes, data-saving/low-memory/emergency policies and media/module failure. It also verifies Shuffle has no motion player. Screenshots and a mobile interaction recording accompany the result.

`node scripts/cover-motion-profile.mjs` measures three alternating baseline/candidate pairs with a fresh HTTP cache, records initial transferred bytes/FCP/layout shift and checks that no preview assets enter initial loading. WebGL is disabled in both builds for this isolated measurement. It does not establish a 3D-startup improvement or field performance.

The inspection found full-object cropping, a phone-policy mismatch and inherited sizing in the larger Index/Arc artwork. The corrections keep product films fully framed, preserve complete screen images, retain static mobile Index thumbnails and let capable phones play the bounded previews. The confirmation results and review captures follow below.

## Cover-introduction results (before startup fix)

Four browser/device/theme profiles and six loading/policy/failure scenarios passed, with no reported failures. All 14 registered covers were exercised. Captures: [desktop film](desktop-film.png), [mobile screen progression](mobile-screen-sequence.png), [mobile typeface](mobile-typeface.png). Exact results are in [verification.json](verification.json).

| Initial route | Baseline median FCP | Candidate median FCP | Baseline median bytes | Candidate median bytes | Baseline / candidate maximum CLS |
|---|---:|---:|---:|---:|---:|
| / | 188 ms | 172 ms | 808,051 | 791,567 | 0.000 / 0.021 |
| /work/ | 172 ms | 168 ms | 4,279,552 | 4,285,567 | 0.131 / 0.000 |

No cover footage or derived-screen request occurred before browsing in any of the 12 measured loads. Work’s measured initial transfer increased by 6,015 bytes; the Home byte difference varied with deferred requests. The first-paint differences are small local-run variation, not a speed improvement claim. Full conditions and samples are in [performance.json](performance.json).

A second diagnostic run retained layout-shift sources rather than discarding the first run. Its Home CLS was zero for both builds; Work recorded 0.131 in one candidate load, matching the value previously seen in the baseline. The affected elements were the existing grid overlay, page wrapper, navigation and filter rail, before any cover-media request. This recorded the startup issue addressed in the follow-up below; the raw measurements are retained as the before evidence. See [performance-diagnostics.json](performance-diagnostics.json).

Largest encoded film excerpt: 226,288 bytes. Optional player chunks: CoverPreview-CNmL03bn.js (1,949 bytes gzipped), CoverPreview-D5Queq5U.css (1,179 bytes gzipped). These costs are not decoder, battery or field-speed measurements.

The final Index/Arc sizing correction passed targeted Chromium/light and WebKit/dark checks against the built preview: full-frame film playback, three complete screen images and Escape disposal. See [artwork-verification.json](artwork-verification.json), [Index screens](library-screens.png) and [Arc screens](timeline-screens.png).

Existing Work loading/contrast/reveal checks passed at 390, 1024 and 1440 pixels in both themes. Existing Home, Work and UX Research card text/hover/reduced-motion checks passed at 1187 and 390 pixels. The TypeScript/production build and blocking design audit also passed. [Short mobile interaction recording](mobile-preview.mp4).

## Startup and touch follow-up

The original startup jump came from geometry-changing body classes being applied after paint: Work briefly used the generic narrow page frame, and the ruler preference changed fixed-control insets. Those classes now apply in layout effects before paint. Saved ruler mode also inherited the body’s padding transition; that transition now starts only after the initial loading handoff. Deliberate later ruler toggles retain their existing motion. No content is hidden or delayed to reduce the metric.

Two cover-entry defects were corrected: focus or mouse entry arriving before a visibility callback is honored when the card enters view; touch pointer-leave during a native scroll no longer cancels the viewport preview. Hidden/offscreen/reduced-motion and data-saving stops remain in place.

- All 14 covers passed on Chromium desktop light/dark, Chromium mobile light and WebKit mobile dark: 56 individual cover runs, plus finite playback, single-player ownership, Escape, original screen/font loading and direct project navigation. Six policy/failure scenarios passed. See [verification.json](verification.json).
- A native Chromium touch swipe scrolled the page and started the visible film; a single tap opened its project. Delayed visibility callbacks were tested with film, screen and type previews in Chromium and WebKit. See [entry-verification.json](entry-verification.json). These are browser emulations, not a physical-phone battery test.
- 18 startup cases covered Home and Work, 390/1440 widths, both themes, Chromium/WebKit, 500 ms stylesheet delays and saved ruler mode. First-frame page width, navigation insets and body padding stayed stable. Chromium’s maximum recorded CLS was 0.000984 (small text movement); the original 0.131 page-frame jump and 0.021 ruler-inset jump did not recur. WebKit checked geometry rather than unsupported CLS telemetry. See [startup-verification.json](startup-verification.json).
- Six further candidate cold loads in three alternating baseline/candidate pairs recorded zero CLS and zero preview-media requests before browsing. Home median FCP was 160 ms versus 156 ms before; Work was 156 ms for both. Initial transferred bytes increased by 33 on Home and 44 on Work. These small local differences do not establish a speed improvement or field performance. The comparison baseline is the preceding cover build, not production. See [startup-performance.json](startup-performance.json).
- The final optional player is CoverPreview-CRzLjMuB.js, 1,974 bytes gzipped. Assets and visual composition are unchanged. Work loading/contrast/reveal checks passed at 390/1024/1440 in both themes. TypeScript, production build, protected-build guard and blocking design audit passed.
- Shuffle’s six tracked source files remain byte-identical to the branch base; [hash evidence](shuffle-unchanged.json). No experience approval, project content, hero scene, footer, dependency or deployment configuration was changed.

Review: [desktop cover contact sheet](desktop-all-covers.jpg), [mobile cover contact sheet](mobile-all-covers.jpg), [short mobile recording](mobile-preview.mp4). Current local preview: http://127.0.0.1:5234/work. Prepared for pull-request review; not merged or deployed.

Settled layout geometry matched the preceding cover build on Home, Work and Shuffle at 1440 and 390 pixels. Captures and comparison details: [visual-parity.json](visual-parity.json), [before](before-startup-work.png), [after](after-startup-work.png).

## PR verification

Linux CI exposed fallback text movement when route styles discovered the General Sans 500/600 files late. The existing font files are now preloaded from the document head; no typeface, weight or image changed. The Safari cover test now keeps its focused card in view while deferred rows settle, rather than expecting an offscreen player to continue. Playback and offscreen-stop expectations are unchanged.

After these corrections, all 18 local startup cases recorded zero CLS, and all 56 local cover runs plus the six policy/failure scenarios passed. The six candidate cold loads recorded zero CLS and no initial cover-media requests, with the same measured transfer costs as the preceding startup fix. These remain local browser measurements, not field guarantees. Reports: [startup](pr-startup-verification.json), [covers](pr-cover-verification.json), [paired measurements](pr-startup-performance.json). The PR CI job publishes independent Linux results and captures in its cover-motion-verification artifact.
