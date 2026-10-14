# Glassly case study

## Plan

Add Glassly last in the curated Work listing and include it in AI & Wearables. Use a case study rather than an automatically generated standalone room.

1. Introduce the wearable miniapp platform using the actual mark and attributed Even Realities G2 photography.
2. Preserve the portfolio’s short overview and expand-on-request story.
3. Explain the product story through original website surfaces: hero, phone/glasses demonstration, device catalog, miniapps and developer path.
4. Embed the original website demo on request. Visitors select the six real demonstration scenes, inspect the larger mirror, pause playback and close the demo. Label sample content and avoid implying a live hardware connection.
5. Show source brand guidelines for palette, typography, product imagery, layout, surface treatment, motion and naming. Link the original 22-page PDF.
6. Describe delivered artifacts. Do not add invented research, team sizes, conversion metrics or hardware-manufacturing claims.
7. Verify catalog ordering, wearables discovery, all controls, keyboard/touch, reduced motion, themes, loading, failure/retry, image proportions, and static route generation.

## Evidence

- Original website repository: `/Users/parth/Documents/ChatGPT/glassly-site`, especially `DESIGN.md`, `src/site/README.md`, `LandingPage.jsx`, `HeroDemo.jsx` and its styles. Sources inspected October 14, 2026.
- Product implementation: `/Users/parth/Documents/ChatGPT/Glassly/README.md` and the existing supplied hardware imagery. No product/backend changes were made.
- Brand guidelines: `/Users/parth/Downloads/Glassly-Brand-Guidelines-v2.pdf`, September 2026 website edition. The business card was excluded because it is unnecessary to the story and includes personal contact details.
- Website captures were made from the existing local website at 1440px with reduced motion; no signup form was submitted.
- The cover combines the original mark and original partner-hardware photograph using a code-rendered composition. No generated imagery or altered logo was used.
- `HeroDemo.jsx` is copied unchanged except for local asset prefixes. The iframe entry adds readiness/size messages. Its original styles are isolated from portfolio CSS. React license files accompany the built demo.

## Scope

The project is a reference case study in the experience registry, with an embedded original demonstration. No new draft room or approved standalone experience is created. Previous Mentra/TransFi changes remain intact. This implementation stays local until deployment is requested.

## Completed checks

- Glassly is last in `allProjectsCurated` and included in the AI category registry. It is visible on both `/ai` and `/ai-wearables`.
- Production build and blocking design audit pass. The route and experience registries cover all 50 projects; Shuffle remains the sole approved standalone experience.
- Glassly QA passes 1440px light/dark, 390px light and 320px dark: uncropped original imagery, on-request loading, all six scene selectors, touch, mirror/Escape, unload, failure/retry, no overflow and legacy URL redirects.
- The full experience-curation check passes all 50 catalog entries, including 100 legacy world/prototype URLs and the unchanged 18-draft directory.
- Screenshots and the interaction recording are saved under `/tmp/portfolio-glassly-qa`. Source hashes are recorded in `glassly-case-study-source.json`. Brand artwork keeps its original colors in both themes.
