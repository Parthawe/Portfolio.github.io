# Mentra and TransFi original slides

Source: https://www.figma.com/slides/N4p7rXXnLNYjKIRCpzlBaE

Implemented locally on October 14, 2026. The hero layout and overview structure remain unchanged. Release verification aligned Mentra role/team metadata and first-use results with the numbered source slides. The expanded stories use original slide exports instead of rewritten feature grids, flow diagrams and prose.

- Mentra: 44 slides across product scope, research, first use, runtime, MiniApps, enterprise, website, results and reflection.
- TransFi: 31 slides across payment flows, research, checkout, testing, results, design system and partner integration. Three public interface slides replace the public preview; the other 28 mount after the existing reviewer gate unlocks. The reviewer module is lazy-loaded.
- Repeated presentation builds, interview agendas and unrelated projects are omitted. Source IDs, slide numbers, export methods and source-image hashes are recorded in `case-study-slide-source.json`.
- Figma’s free connector limit interrupted the export. The signed-in desktop app exported a high-quality PDF to Downloads. Eleven final images, including the runtime-results slide, were rendered from the corresponding numbered PDF pages. The full PDF stays outside the website.
- Full-resolution WebP copies were verified against decoded source-render pixels. Responsive 768px and 1280px copies use Lanczos downsampling. All images reserve their source aspect ratio and load lazily. The summary mounts no deck imagery.
- Each slide supports keyboard enlargement, an original-size link, source text and image retry. Some dense interface slides have a labelled text excerpt with a link to the complete Figma slide. Results use the numbered presentation slides: pairing and onboarding (54), first-use time and return (55), and runtime outcomes (78). An alternate illustrative draft was withdrawn. Team metadata matches the role slide (16); no new outcome claims are added.

## Verification

- Production build and blocking design audit passed.
- `node scripts/case-study-slides-qa.mjs` passed all 75 slides across desktop light/dark, 390px light and 320px dark. It checks source proportions, zero summary image requests, locked TransFi image requests, reviewer-code unlocking, keyboard preview/focus restoration, transcripts, chapter deep links and failed-image retry. This test uses an isolated local server with a test-only reviewer hash; production credentials are unchanged.
- Existing `interaction-qa.mjs` passed against the production preview: normal/reduced motion, desktop/mobile navigation, wheel scrolling, browser history, Mentra expansion, lightbox dismissal, results anchors and touch swipes.
- Evidence: `/tmp/portfolio-original-slides-qa/report.json`, eight responsive screenshots and `mentra-original-comparison.png`. Local build and interaction logs use the `/tmp/portfolio-original-slides-` prefix.

No deployment was performed for this change.
