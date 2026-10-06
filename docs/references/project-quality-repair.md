# Project quality repair, 5 October 2026

## Scope

All 49 project detail pages. Homepage, About, Work, navigation design, and category layouts are outside this pass. Local review only; publishing requires the user's confirmation.

The preceding assessment averaged 7/10. This implementation does not assign every page a 9. Original research, dated measurements, failed alternatives, and missing course artifacts cannot be created retrospectively with generated imagery.

## Implemented

- Shared project-record disclosure distinguishes case studies, public previews, concepts, essays, and course archives across 49 routes.
- Eight course pages replace simultaneous feature-card lists with keyboard-operable comparison controls. Input, mapping, response, and an open testing question are visible together. These are explicitly new reading aids.
- Seven archive/essay pages link to relevant documented projects with real project images.
- Two new ChatGPT-generated editorial illustrations: Feeling Patterns material study and Hypercinema viewpoints. Captions identify their provenance immediately below each hero.
- Project images use generated intrinsic dimensions and responsive display variants when available. Original images remain available in the lightbox.
- Project films pause offscreen or when the tab is hidden; no automatic resume. Black Hole's film is user-controlled with a poster and preload none.
- Project introductions are visible immediately, preserving the intentional blurred full-story preview.
- Black Hole's Einstein-ring explanation now follows ESA's source: https://www.esa.int/ESA_Multimedia/Images/2025/02/Einstein_ring_explained
- Narrowed unsupported MONIAC learning claims and unverified numeric audience/access claims. Clarified VishwaConclave's editions/date wording.

## Evidence required to reach the requested quality target

- Mentra: sample sizes, study dates, definitions, and source notes for each comparison.
- Jugalbandi: one trace from model output to physical musical response.
- Omakase: documented control iteration and observation/counting notes.
- Mentra Brand: explain the key packaging revisions using the seven existing iterations.
- Raahi, VJ, Health App, Code for Build: actual usability findings or clearly scoped next-study records.
- TransFi, ZentiPay, CueTV, AI Voice: approved public decision examples, while preserving protected material.
- IBM: individual contribution and reproducible research setup.
- Course archives: original films, cue sheets, sketches, deployed builds, test records, or appropriately scoped archival descriptions.
- ArtTown: available episode links and dated distribution records.

AI assets explain a subject. They are not screenshots of shipped interfaces, original prototypes, user studies, or historical production photographs.

## Asset maintenance

Run `python3 scripts/prepare-project-media.py` with Pillow after adding source media. The generated JSON and display variants are checked-in build inputs; the site build does not require Python. Originals remain untouched. Browser-selected display variants preserve source aspect ratios.

## Verification

- Production build passed: TypeScript, Vite, all 49 registered project routes, 81 static entrypoints.
- Design-system blocking checks passed; existing refactor warnings remain.
- Targeted design detector: no findings in the new shared components and reading CSS.
- 49/49 mobile introductions at 390 × 844: record label present, no document-level horizontal overflow.
- 13 representative desktop routes at 1280px: no document-level horizontal overflow.
- Comparison selection works with Enter. Light and dark phone layouts inspected.
- Black Hole film: controls present, autoplay disabled, user playback works; scrolling out of view pauses playback.
- Image lightbox opens the original source rather than the smaller responsive rendition.
- 361 source-image dimensions; 122 responsive source sets; all generated source paths resolve.
- Browser console errors in the inspected interactions: none.
- This is not a complete screen-reader, cross-browser, or measured battery/CLS audit. Source evidence needed for the quality target remains listed above.
