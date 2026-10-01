# Project detail audit and reading improvements

Reviewed 2026-10-01. Scope: project detail pages only. Changes remain local.

## Reference

[Mital Kamani's product-discovery case study](https://mitalkamani.design/pmfdiscovery) was inspected in the browser. Relevant choices: headings above explanations, evidence following its explanation, a stable reading frame, and faint vertical guide lines. No source copy or assets were imported.

## Fixed in this pass

| Finding | Change | Coverage |
| --- | --- | --- |
| Long headings wrapped into narrow side columns | Shared sections now read vertically; headings precede content | Pages using CsSection |
| Oversized type and abrupt chapter backgrounds | 16px prose, 24–32px headings, stable theme surface and guide lines | Shared project reading styles, with Mentra overrides |
| Summary repeated despite opt-out | Visual header now honors showHeaderSummary | Projects using a separate quick summary |
| Timelines made the opening long | Compact timeline with optional milestones | ProjectHeader |
| Repeated and lengthy introduction copy | Shortened headings and redundant prose without changing metrics | Mentra, Office of Diversity |
| Generic text disclosure | Use an existing public project image; keep text fallback on image failure | CsExpandPreview when no custom preview was supplied |
| Report and inline screenshots could not enlarge | Keyboard/click preview, full-size link, focus return | Shared case-study images and Office report/workshop media |
| Chapter nav rescanned after unrelated mutations | Filter mutations and avoid redundant state updates | BottomNav |
| Invisible footer-adjacent nav could retain tab stops | Hide it from keyboard navigation while visually hidden | Project BottomNav |
| Reading progress stale after content-size changes | Resize observation and one queued frame per update | Case-study reading progress |
| Comparison rows lacked header semantics | Named tables, scoped row/column headers, reduced-motion path | Mentra and Clawed comparison tables |
| Mentra overview link expanded the story | Exclude project-overview from story expansion | Mentra |

## Verification

- TypeScript build passed after component edits.
- Project route manifest matches 49 routable projects.
- Static source scan: 54 project TSX files, 196 literal local media references; no missing referenced files or repeated literal IDs found. Dynamic asset paths were not covered by that scan.
- Office of Diversity: story expansion, four chapter destinations, direct link to deferred report, keyboard image open, Escape close, and focus restoration checked.
- Mentra: full story, six comparison row headers, desktop and 390px mobile layout checked. The updated mobile reading section has 24px headings, 16px body, and no horizontal overflow.
- Light and dark project surfaces inspected. Mechanical design detector returned no findings for the edited targets.
- This is not a visual audit of every section on every route, a screen-reader certification, or a measurement of battery savings.

## Remaining content opportunities

- Extend the manual editing pass to the longer project narratives. Retain methods, decisions, tradeoffs, and evidence; remove repeated setup sentences and make headings name the actual decision.
- Review outcome evidence project by project. Registry summaries exist for all 32 visible projects, but completeness does not establish provenance. Do not add or strengthen metrics without supporting material.
- Keep bespoke demos and NDA pages on their own validation paths. Generic typography changes do not verify their interactions or permissions.

The project's Impeccable context uses an older format. A separate `init` pass can update that metadata; it was not changed as part of this project-page work.

## Final TransFi pass

Removed its repeated public-story summary and fact strip, named the public-story button explicitly, shortened its headline and introduction, and extended the shared type scale to public NDA-story/process headings. Process decisions now precede their visuals in a single column. Public screenshots support keyboard image previews. Switching reading modes no longer forces a scroll to the page top.

Verified on desktop: story expansion, no repeated public summary/facts, keyboard preview and Escape/focus return, no horizontal overflow, and reviewer content remains unmounted without access. Production build and route-entry generation passed; the scoped detector reported no findings. Access requests were not sent.

Mobile verification completed at 390px after applying the viewport and reloading. The public story opens, fits the viewport, and has no horizontal overflow. Moved public-image captions below the artwork so they do not cover small screenshots; made process numbering readable on the dark surface.

## Portfolio-wide rollout

Applied the reading system across the shared project components and all 49 routed project pages. Static page-authored images opt into the shared preview; linked images and images inside controls retain their existing action, decorative images are skipped, and interactive demo internals are unchanged.

Additional fixes:
- Preserve header metadata previously omitted by the visual template, including Scope, Focus, collaborators, and extra dates. Keep the supplied context label rather than calling a platform a team.
- Remove forced page-top scrolling from all remaining project reading-mode handlers.
- Remove repeated overviews on MiniApps, ZentiPay, Code for Build, VJ Software, ArtTown, and Revolving Stage where a separate overview supplies the content.
- Render every supplied public gallery image, instead of discarding all but the first. Remove the generic invented interface fallback; use an existing public preview when available.
- Extend the reading scale to older display headings, overview components, lists, step descriptions, and image captions. Correct the mobile feature-description grid placement.
- Shorten selected MiniApps, Clawed, and Code for Build headings and copy without adding claims.

Verification: all 49 routes received layout smoke checks at 390px and 1440px. The sweeps exercised available story controls; Code for Build and ZentiPay received separate expanded-state checks. The sweep found one main heading per route at mobile width, no horizontal page overflow, and no oversized shared section headings. No broken completed images were detected in the mobile sweep; lazy images outside the loaded area are not covered by that check. Source scan found no missing literal media references or duplicate literal IDs across 54 project source files. Build and route generation passed. Design audit passed blocking checks; existing refactor warnings remain. These checks do not certify every interactive demo, private reviewer content, external service, or every paragraph's factual provenance.

Consistency follow-up: Raahi now uses the shared blurred-image disclosure instead of the last custom text preview, omits its duplicate header summary, and uses shorter sentence-case chapter headings. The header recognizes “My contribution” as the role field to avoid repeating it in metadata. Build and desktop disclosure/layout checks passed. A fresh mobile check could not complete because the browser viewport tools timed out; the earlier 390px route smoke check predates this follow-up.

Typography follow-up: shared project callouts, step/card headings, labels, and captions now use explicit reading sizes and line heights. Raahi's small research labels use neutral theme ink and medium weight instead of low-contrast blue uppercase bold. Interactive demo and typeface-specimen typography is untouched. Build passed; Raahi verified at 390px (24px chapter headings, 16px prose, 14px labels) and 1280px (30.72px chapter headings), without horizontal overflow. Light and dark surfaces inspected. This also completes the previously blocked Raahi mobile layout check. All added selectors are scoped to `.project-main`.

## Critique follow-through — 2026-10-01

Scope: project detail pages only. No publication or shared project-registry edits.

Implemented:
- Thirteen short studies/essays open directly rather than hiding a small amount of content behind a reveal. Their duplicate generated header summaries are suppressed.
- Feeling Patterns: removed universal emotional-response and recognition claims; corrected the description of Mentra's display.
- Messy Humans: replaced unsupported participant percentages, app failure counts, language-ranking claims, and blanket accessibility compliance with concrete review questions.
- Applications and Production Studio: distinguish archived course notes from documented deployed products/exhibition outcomes. Removed unsupported usage/uptime precision.
- Embodied Web: corrected the claim that WebSocket timing measures phone proximity. Added limits on body input and alternatives.
- Hypercinema and Performance by Design: qualified universal perception and dwell-time claims.
- On Becoming: corrected Shuffle's motorized faders and MONIAC's cabinet game; Storytelling now links to actual interaction sequences instead of claiming a documented redesign of every page.
- Flow Fields: identify the static illustration and point to Computational Media's available source-backed study.
- OrgDashboard: foreground the actual review workflow; remove unsupported test precision and the claim that internal writes are inherently safe.
- Health App: describe planning as a concept, not demonstrated burnout prevention.
- MiniApps and TransFi: make the sequence and scope explicit using existing descriptions/screens.
- ATPS: identify historical self-reported totals and missing reporting period.
- ExecutiveLens: separate intended workflow from unquantified beta observations.
- Enigma, MONIAC, Shuffle, Omakase, Drowning and Black Hole: distinguish browser illustrations/adaptations from physical documentation or validated simulation.
- Sea of Salt: shortened the repeated folktale and qualified audience anecdotes. Jugalbandi and Shuffle audience observations are no longer presented as proof of comprehension.
- IBM: clarify that a prognosis visualization does not establish clinical validity. Revolving Stage: distinguish a design load from a certified test. CodeForBuild: label unvalidated learning outcomes.

Verification:
- Production build passes, including TypeScript and all 49 canonical project route checks; 81 static entrypoints generated.
- Design-system blocking checks pass; existing large stylesheet/refactor warnings remain.
- `git diff --check` passes.
- Browser: Feeling Patterns opens all sections without a reveal, body text is 16px and there is no horizontal overflow at 1280px. TransFi public story opens and the reviewer code gate remains present.
- Final mobile recheck could not complete: browser emulation/CDP connection timed out. Earlier mobile results must not be represented as verification of this latest copy pass.

Still requires source material; not complete:
- Original playable/recorded artifacts for Flow Fields, Embodied Web, Hypercinema, Feeling Patterns and Performance by Design.
- Original application builds/links for Applications; named installation and show documentation for Production Studio.
- Dated study protocols/results for product metrics, including OrgDashboard, Mentra and ExecutiveLens; ATPS analytics period/export and episode links.
- Further source-dependent opportunities from the critique: annotated before/after artifacts in CueTV, MediMorpho and AI Voice; gallery curation based on source context; iteration evidence for Sculpture, Typeface, TEDx and Vishwa. Do not treat the copy corrections above as replacement evidence or mark the whole critique complete.

Additional corrections: PointCDC and Office of Diversity now explain the specific navigation/reading-order decision; Raahi and VJ repeated flow copy is shorter. Sculpture, IBM and Office of Diversity open directly. Typeface distinguishes its interactive outline editor from original optical-correction evidence. Final production build passed again. Browser recovery and viewport reset were attempted but also timed out; final responsive/screenshot verification remains incomplete.

## Final QA — 2026-10-01

The browser connection recovered for this pass, superseding the previous mobile-verification limitation.

- All 49 canonical project pages loaded at 390px, each with one main heading and no page-level horizontal overflow.
- All 49 publicly available full stories checked at 390px and 1440px after expansion; no page-level horizontal overflow. Protected material was not unlocked. This checks layout and disclosure mounting, not every embedded interaction or every lazy-loaded asset.
- 246 distinct literal project asset paths resolve locally after stripping query strings. Dynamic paths, remote embeds and every offscreen image were not exhaustively covered by this scan.
- Raahi deep link opens the full story, targets the research section, and moves focus to it.
- Image preview opens using Enter; Escape closes it and restores focus to its trigger.
- Raahi mobile reading visually checked in light and dark themes. Office of Diversity report visually checked at 2560px with no page overflow.
- Computational Media start, pause and clear controls respond and restore the expected button state; no camera permission requested.
- TransFi retains the reviewer-code form and request-access path after opening its public story. No private code entered and no form submitted.
- Fixed duplicated Typeface “Team / context” metadata by recognizing that label in ProjectHeader. Verified one row after the fix.
- Final TypeScript/production build passes, all 49 route-manifest entries match, 81 static entrypoints generated. Design audit passes blocking checks. `git diff --check` clean. Existing large CSS/refactor warnings remain.
- Screenshots: `/tmp/project-final-qa-mobile.png`, `/tmp/project-final-qa-desktop.png`.
- Temporary viewport override reset; no deployment or push performed.

Remaining editorial/source gaps listed above still apply. This QA does not validate research claims, third-party uptime, every possible viewport, or certify accessibility conformance.

### Production verification follow-up

Release b2f88e7 passed build/deploy and the full rendered-route checks, but interaction QA found that the static hero media wrapper inherited `pointer-events: none`, blocking mouse clicks on the newly enabled image-preview trigger. Keyboard-only lightbox coverage had missed this. Added a project-scoped pointer override for static hero images decorated as buttons. Reproduced the production sequence locally (expand Mentra, mouse-click its hero image, close the dialog) successfully. The build passes; the follow-up deployment reruns the existing production checks without weakening them.
