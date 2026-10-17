# Document scroll-container correction

Motion's target-based scroll tracking measures offsets against the document scrolling element. The default static positioning on `html` produced its development warning and left the containing block implicit. Give that existing element relative positioning. This does not introduce a new scroll area or change dimensions.

The Index loading, selection and Escape fixes are already part of PR #21 on `main`; this PR does not duplicate them. The only runtime change is in `src/styles/reset.css`.

## Verification evidence

The initial local check covered Work, Index, Mentra and UX Design at desktop and mobile sizes in Chromium and mobile WebKit. All 12 checks reported identical settled geometry and no runtime errors or scroll-container warning after the correction. Eighteen startup checks passed with measured Chromium layout shift of 0. Shuffle's existing WebGL board, view controls, keyboard slider and reset passed in desktop Chromium, mobile Chromium and mobile WebKit; its measured navigation and board geometry stayed unchanged.

Two previous lifecycle stress failures were investigated separately. Saved traces showed an 8-second assertion returning after 16.7 seconds and a 6-second assertion returning after 582.2 seconds. One focused reproduction per case passed with the existing behavior assertions and deadlines: Chromium rapid selection loaded the correct screens and then an advancing film; WebKit screen replay stopped after an observed 4,400 ms and removed its media. Those focused checks do not turn the earlier failed full run into a pass.

That initial evidence came from the local footer-preview checkout. The PR is independently based on current `main` and excludes the unfinished footer and all other local work. PR validation results are recorded in its description and CI artifacts; the production build, startup suite and source-boundary checks must be rerun against this clean branch.

## Scope

Keep Shuffle sources, the production footer, the experience approval registry and access restrictions identical to the base revision. Do not merge or deploy this PR without a later user request.
