# Portfolio analytics and weekly report

Status: GA4 selected. Consent-gated integration implemented locally; activation and weekly email scheduling pending the Measurement ID, property access, and recipient address. No production collection or report delivery is active yet.
Site: https://designwhich.works
Report timezone: America/New_York
Default reporting window: previous Monday 00:00 through Sunday 23:59, compared with the preceding week.

## Questions to answer

1. How many visits reach the portfolio, and through which sources and landing pages?
2. Which project collections and case studies attract meaningful engagement?
3. Where do visitors leave before viewing a project or taking a contact action?
4. Do mobile visitors encounter more friction than desktop visitors?
5. Are load performance or technical failures associated with lower engagement?

## Metrics and definitions

| Area | Measures | Interpretation |
| --- | --- | --- |
| Audience | Visits, estimated unique visitors, pageviews, views per visit | Visitors are estimates, not an exact count of people. Exclude localhost, staging, and owner QA. |
| Acquisition | Referrer, source/medium/campaign, landing page | Direct/unknown may include private sharing and stripped referrers. Do not infer recruiter identities. |
| Content | Top pages, landing pages, exit pages, project opens | Separate collection browsing from project detail views. |
| Reading | Visible tab time, case-study sections reached, full story opened | Scroll depth alone is not proof of reading. Pause visible time in hidden tabs; it does not measure attention. |
| Intent | Contact click, résumé download click, NDA access-request click, live-project click | Clicks are intent signals, not proof of delivery, download completion, or hiring outcomes. |
| Interaction | First interaction with 3D/ASCII, video play/completion, demo start | Measure once per page visit or playback. Never send mouse movements or animation frames. |
| Friction | 404s, first-party asset failures, grouped JS error codes | Exclude sensitive stack traces, query strings, submitted text, and secrets. |
| Performance | LCP, INP, CLS; sample counts and p75 where supported | Prefer real-user measurements; lab tests are a separate source. |
| Segments | Mobile/desktop/tablet, browser, source, landing page | Show counts with rates. Avoid interpreting tiny segments as trends. |

## Event contract

Only allowlisted event names and properties. Page paths are normalized, query-free public routes. No entered text, emails, guestbook notes, chat content, reviewer codes, or protected case-study details.

| Event | Trigger | Allowed properties |
| --- | --- | --- |
| page_view | Initial public route and completed client-side route changes | page_path, page_type |
| collection_cta | See projects activated | page_path, collection |
| project_open | Public project card/link selected | source_path, project_slug, placement |
| story_open | Collapsed story actually becomes expanded | project_slug |
| story_section_view | Named public section is meaningfully visible | project_slug, section_id |
| contact_click | Mailto link selected | page_path, placement |
| resume_click | Resume link selected | page_path, placement |
| access_request_click | Request-access action selected | project_slug, placement |
| live_project_click | External live-project link selected | project_slug |
| scene_interaction | First pointer/keyboard interaction with scene | page_path, scene_type |
| media_play | Playback begins through a supported player | page_path, media_id |
| media_complete | Supported player reaches completion | page_path, media_id |
| demo_start | Visitor starts a demo/game | page_path, demo_id |
| page_not_found | Site's actual not-found UI rendered | page_type |
| client_error | Allowlisted first-party failure category | page_path, error_code |

The React integration owns pageviews. Disable ALL Enhanced Measurement in the GA4 web stream before enabling VITE_GA4_READY, and keep send_page_view false. Do not combine automatic SPA pageviews with the manual emitter. React rerenders and Strict Mode must not create duplicate events. Click collection uses event delegation, not an observer or timer per card. Deduplication is scoped to a route visit, so legitimate return visits remain measurable.

## Funnels

Report eligible session counts and completion rates for each step. A visitor who arrives directly on a case study does not belong in the homepage-entry funnel.

- Homepage entry → any project detail → contact or résumé click.
- Category entry → project detail → story opened → contact or access-request click.
- Direct project entry → meaningful public section reached → contact, résumé, or live-project click.

Use session-scoped sequential funnels where supported. Drop-off = entrants at a step who do not reach the next eligible step in the same session, divided by entrants at that step. Do not subtract unrelated pageview totals to manufacture a funnel. Report contact and résumé conversion separately as well as combined intent.

Exit is not automatically failure: leaving through a live-project link or an email action may be the intended outcome. Provider limitations, tracking prevention, and sessions crossing the reporting boundary must be stated.

## Weekly report

1. Date range, timezone, tracker coverage, and data freshness.
2. Visits and estimated visitors; week-over-week counts and rates.
3. Top sources, landing pages, and projects.
4. Contact, résumé, and access-request intent counts and conversion rates.
5. Funnel step counts, drop-off rates, and the largest observed loss points.
6. Mobile versus desktop comparison, with denominators.
7. Technical failures and real-user performance, if available.
8. Three evidence-backed actions, distinguishing observations from hypotheses.

For the first report, state that no comparable prior week exists. For an unavailable metric, write unavailable rather than zero. Flag partial weeks and low sample counts; do not announce causal conclusions or automatic redesigns from traffic changes. No report should invent data or silently fall back to GitHub repository traffic as website analytics.

## Activation dependencies

- Confirm analytics provider/account and plan supports custom events, session funnels, and report/API access.
- Obtain the public site identifier/tracking snippet through the account. Keep report API credentials server-side, never in VITE_ variables.
- Confirm weekly delivery destination and recipient if email is requested. Monday morning is the proposed cadence.
- Configure public-domain collection and exclude owner/local/test traffic.
- Review data collection and the site's privacy disclosure for the chosen provider; configure consent where required.
- Test direct loads, SPA navigation, Back/Forward, case-study expansion, and event deduplication with mocked analytics requests before enabling production collection.
- Verify received events in the provider dashboard and create the corresponding goals/funnels.
- Schedule reporting only once authorized access and the delivery destination work. Historical visitor analytics cannot be reconstructed from this new tracker.


## GA4 implementation and activation (October 7, 2026)

Implemented locally:
- Basic consent: Google script loads only after Allow analytics; No thanks sends nothing.
- Footer preferences permit withdrawal; withdrawal disables collection, clears GA cookies and reloads to unload the runtime.
- Production hostname allowlist; localhost, automated browsers, and owner exclusion are blocked.
- Manual page views with normalized public paths, page type, and origin-only external referrer. Unknown paths aggregate under /404.
- Project opens, contact clicks, tagged résumé requests, tagged access requests, bottom-nav live-project clicks, story expansion, reading depth and user-played native video events.
- Events deduplicate within a page visit. No form contents, titles, query parameters, hashes, destination URLs, or protected content are included in these custom payloads.
- Reading depth is geometric scroll progress, not proof of reading. Video events currently count once per route visit, not per individual video.

Also implemented locally: LCP/INP/CLS through the official web-vitals package after consent; grouped first-party script/asset failures; public section exposure; visible-tab seconds with no interval timer. Protected sections are excluded.

Not yet implemented: active-reading-time measurement, demo/scene events, campaign attribution, and a custom narrative report. GA4's standard engagement time differs from active reading. Native scheduled reports provide metric tables/PDFs; they do not automatically produce three editorial recommendations.

Activation checklist:
1. Create/select a GA4 property with America/New_York reporting timezone. Create a web stream for https://designwhich.works and obtain its G- Measurement ID.
2. Disable ALL Enhanced Measurement in that stream before enabling this integration. This prevents duplicate history pageviews and automatic forms, search, or outbound-link payloads. Leave Google Signals and advertising features off.
3. Set GitHub repository variables VITE_GA4_MEASUREMENT_ID and VITE_GA4_READY=1 after verifying the property configuration. The ID is public; never place reporting credentials in a VITE_ variable.
4. Review the rendered consent disclosure on mobile and desktop. Deploy only after the pending configuration is verified.
5. Verify initial load, route changes, Back/Forward, consent rejection/withdrawal, and key events in GA4 Realtime/DebugView. Unit tests are not proof of received production events.
6. Register page_type, project_slug, and percent_scrolled as event-scoped custom dimensions if required for reporting. Mark contact_click, resume_click, and access_request_click as key events.
7. Add the report recipient as a property user. As property administrator, use Reports → Share this report → Schedule Email. Set weekly, previous-week range, PDF or CSV, and a descriptive name. Check the recipient and first delivery date before saving. Native schedules expire after at most 12 months and need renewal.
8. Configure acquisition, landing-page, pages, device, and key-event reports. Build session-scoped funnel exploration separately; verify whether the chosen report surface can email the desired funnel output before claiming drop-off delivery is complete.

Owner QA exclusion: set localStorage key portfolio-analytics-exclude to 1 on the production origin before opting in, then reload. Exclusion only affects that browser profile.

Counts cover consenting, unblocked browsers and are estimates. The integration deliberately removes query strings, including UTMs; campaign attribution is not currently available. Do not describe consent-limited counts as all visitors.

Sources checked:
- https://developers.google.com/analytics/devguides/collection/ga4/views
- https://developers.google.com/tag-platform/security/concepts/consent-mode
- https://support.google.com/analytics/answer/13722168

## Local verification, October 7

Five analytics unit tests pass: consent and host exclusions, pageview/interaction deduplication, payload redaction, withdrawal, and diagnostic/section/time payload limits. The consent notice was checked at 390px with its disclosure expanded; both choice callbacks and keyboard activation worked. The temporary UI harness was removed. These checks do not verify receipt in GA4, which remains unconfigured.
