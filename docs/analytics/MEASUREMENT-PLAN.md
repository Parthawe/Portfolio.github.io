# Portfolio analytics and weekly report

Status: proposed measurement contract. No tracker or report delivery is active yet.
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
| Reading | Visible active time, case-study sections reached, full story opened | Scroll depth alone is not proof of reading. Pause active time in hidden tabs. |
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

The provider owns pageviews. Do not combine provider automatic SPA pageviews with a second manual pageview emitter. React rerenders and Strict Mode must not create duplicate events. Click collection uses event delegation, not an observer or timer per card. Deduplication is scoped to a route visit, so legitimate return visits remain measurable.

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
