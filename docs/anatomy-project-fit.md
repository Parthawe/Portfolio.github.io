# Anatomy project follow-up

Local draft only. Shuffle and the homepage are unchanged. No public approval or deployment is part of this work.

## Built: Revolving Stage assembly

The original exploded construction drawing labels a 15 × 8 ft deck and 8 × 8 ft base. It shows a central axle and two rings containing fourteen caster assemblies. The new SVG study uses those footprints and arrangement. Thicknesses, bearing internals and hardware are illustrative; this is not a load simulation or fabrication model.

At `/experience-preview/revolving-stage`, visitors can assemble/separate the structure, inspect each assembly in a fitted close-up, and compare original drawings. The existing 3D rotation study remains available through a separate control and loads on demand. Switching back unmounts it. No animation loop runs in the SVG view. The original case study and public-route restrictions remain intact.

The build-time Anatomy kit is MIT licensed; its source and notice are in `scripts/vendor/anatomy`. Build the 91-solid illustration with `node scripts/build-stage-anatomy.mjs --audit`. The audit covers eleven separation states and reports zero geometry/depth problems. This verifies the illustrative geometry, not engineering safety or exact fabrication dimensions.

## Where to use it next

- **Enigma:** explain the progression from typed letter to sampled input and physical lights. Keep reliable text entry. Clearly distinguish a demonstrative mapping from trained recognition; do not invent inference or restore unvalidated drawing recognition.
- **Moniac:** expose the browser experiment's actual control-to-outcome rules. Its simplified equations can support a causal inspection view. The photographed six-valve cabinet has no recovered policy mapping, so a hydraulic reconstruction would presently imply unsupported behavior.
- **Sea of Salt:** the mill is a useful mechanism candidate once its motion and story sequence are checked against the original recording. Direct crank manipulation should drive the documented action.
- **UI/UX and branding projects:** use task prototypes and original work. An isometric object adds value only when it explains a real interaction or mechanism.

Jugalbandi remains the first Anatomy draft. These decisions do not promote any draft to approved status.

## Verification

- Production build and TypeScript passed. The new lazy workshop chunk is 170.59 KB raw / 26.31 KB gzip, plus 0.94 KB gzip CSS. These are build sizes, not a field performance comparison.
- Browser checks exercise Chromium desktop, Chromium touch and WebKit mobile in both themes: assemble/separate, keyboard slider, part selection, reset, reduced motion, source-image loading and horizontal overflow. Desktop checks also open the existing 3D study and unmount its canvas when returning.
- Anatomy geometry audit passed for 91 solids across eleven states. Its line-end checker reported zero floating ends (this illustration has no independent line markup).
- The registry regression checked fifty projects and retained Shuffle as the sole approved experience. The draft remains gated by the existing preview setting.

Run `node scripts/stage-anatomy-qa.mjs` against the production preview (default port 5211). Screenshots, a recording and timing observations are retained in `docs/reviews/stage-anatomy/`. Timings are local QA observations, not a cold-network benchmark.
- Existing physical draft regression: all 24 checks passed after adding the explicit rotation-mode selection to its stage test. Jugalbandi, Enigma, Revolving Stage, Sea of Salt, Black Hole and Moniac were exercised at desktop/mobile sizes in both themes.
