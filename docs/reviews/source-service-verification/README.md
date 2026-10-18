# Source and service verification, 17 October 2026

## Verified

- **Live AI:** four actual model responses passed across desktop Chromium (1440px, light) and mobile WebKit (390px, dark). The deployed Supabase endpoint returned HTTP 200, allowed the production origin, used real Gemini models, retained follow-up context and correctly identified tabla → rainsticks. Empty questions and malformed JSON returned 400, unsupported methods 405, and a foreign origin 403. [Validation results](ai-validation.json). Response times were 7.150s, 8.018s, 2.422s and 1.831s. These four samples do not establish a latency percentile or guarantee every answer is accurate. Questions, answers and model identities are in [live-ai.json](live-ai.json); screenshots and recordings remain in `/tmp/portfolio-source-services/live-ai/`.
- **Caption delivery:** 32 live browser checks passed across eight routes, Chromium/WebKit, desktop/mobile and light/dark themes. Track bytes match the local files; native cue parsing, meaningful seeks, muted playback, downloads and visible-transcript parity passed. [Results](caption-browser.json).
- **Access-request preparation:** the current implementation uses `mailto:parthpawar@nyu.edu`, with no server submission, queue or receipt callback. Eight local browser profiles passed validation, clipboard success, denied-clipboard recovery, retained form data, protected-content boundaries and overflow checks. The separate six-profile reviewer-gate layout suite also passed. Chromium’s actual email-navigation event confirmed the exact recipient, subject and Unicode/special-character encoding. [Handoff evidence](mailto-handoff.json). [Results](access-handoff.json).

## Local correction

The request action now says “Open email draft.” It explains that the visitor must review and send the email, and that the website does not send or track delivery. “Copy request” provides a fallback if no email app is registered. If clipboard access is blocked, the full request appears in a selectable field. Editing the request clears the previous preparation status. The original browser tests sent no email. The separately authorized delivery test is recorded below.

## ExecutiveLens remains unverified

Rechecked `https://executivelens.ai`, `https://www.executivelens.ai` and both HTTP variants: all four connection attempts timed out after 12 seconds in this environment. The independent web reader also failed to open both HTTPS addresses. Exact-name/domain searches and the public GitHub repository search did not identify an authoritative replacement. These results do not prove the product is unavailable everywhere. The existing address remains marked unverified, is excluded from verified-live filtering, and the original captures/local study remain available. [Connection results](executivelens.json).

A current address from the product owner or working original source is needed before changing the destination or its verified status. Unrelated similarly named products are not substitutes.

## Caption warnings remain editorial work

The 14 production warnings are seven route warnings repeated at desktop/mobile widths, covering 11 distinct tracks, including Shuffle. They do not represent 14 missing captions. Source integrity, timing, wrapping and playback pass; those checks cannot certify transcription accuracy.

Searches for the original VishwaConclave narration and its distinctive spoken lines found no authoritative script. The [original campaign post](https://www.instagram.com/p/CLEvdDdDYRg/) was already checked during the source audit; its written campaign statement does not establish the spoken poem. Four uncertain passages remain:

| Recording | Time | Current wording |
| --- | --- | --- |
| Jugalbandi | 04:36.560–04:39.380 | That was [unclear]. |
| VishwaConclave theme | 00:19.840–00:23.320 | a shack to a skyscraper, [unclear] to a plant, |
| VishwaConclave theme | 00:39.580–00:42.320 | Let us shatter [unclear]. |
| VishwaConclave theme | 00:57.320–01:01.640 | Embrace change as we are [unclear] attempt at false stability. |

[Listen to isolated excerpts](caption-review.html). [Clip provenance](clip-provenance.json) records source hashes and exact excerpt bounds. Excerpts are mono 16kHz WAV derivatives for review only; original recordings and published caption files are unchanged. No human listening certification is claimed. Music/ambience tracks also retain their review status rather than being promoted on the basis of an automatic no-speech result.

The earlier [source audit](../caption-source-check/README.md) and [source QA](../../../scripts/caption-source-qa.mjs) retain the exact corrections and limitations. Shuffle, the production footer, the separate unfinished footer and experience approval states are unchanged. This batch remains local; no merge or deployment was performed.

## Final local checks

Production build and 188 route entrypoints passed. TypeScript, protected-content build checks, caption source hashes and whitespace checks passed. All 274 preserved unfinished-footer files match their saved checksums. The only application change in this batch is request-draft preparation and recovery; no backend or delivery service was deployed.

## Authorized email test, 18 October 2026

The user approved one real QA email. It was sent from the primary NYU Gmail account to the website’s configured recipient `parthpawar@nyu.edu` at 00:22:46 America/New_York, with the subject “Portfolio QA test — access request.” Gmail accepted the send. Exactly one email was sent, without attachments or other recipients.

The final NYU check at 00:25:38 still showed only the SENT copy, with no inbox copy or bounce. Neither connected personal inbox contained the test reference at the earlier check. Receipt remains unconfirmed; a successful send and the absence of a bounce do not establish delivery. Recipient-side confirmation or a later delivery/bounce record is needed. No second test was sent. [Test evidence](email-delivery-test.json).

This tests the configured email destination through Gmail. The website still prepares a draft for the visitor to send; it has no mail-delivery backend. No deployment or other application change was made in this follow-up.

## Receipt recheck and diagnosis, 18 October 2026

Rechecked the original reference and message ID at 00:28:12 America/New_York. It remains in SENT; no received copy or delivery-failure notice was found. Both connected personal inboxes also lacked the reference. No additional email was sent.

The recipient itself is working: five existing external inbox messages were found addressed to `parthpawar@nyu.edu` in the primary NYU Gmail inbox, including messages dated 16 October. One message’s metadata explicitly contains `Delivered-To: parthpawar@nyu.edu` and SMTP receipt for that address. Private sender identities, subjects and message bodies are omitted from this repository.

The QA message was therefore sent from the receiving account to its own alternate address. [Google’s official documentation](https://knowledge.workspace.google.com/admin/support/troubleshooting/messages-sent-to-email-alias-or-group-arent-in-my-inbox?hl=en) says Gmail suppresses inbox copies of mail sent to the sender’s own alias, leaving the message in Sent or All Mail. The observed behavior is consistent with that rule. This explains why the missing inbox copy is not sufficient evidence of failed delivery; it does not establish an independent receipt for this particular QA message.

No broken contact address or delivery failure was established, so no recipient, forwarding, Gmail settings or application configuration was changed. The verification record now distinguishes valid external receipt evidence from this self-alias test’s limitation. Any future independent sender test requires fresh authorization; none was performed. Nothing deployed.

## Independent-sender delivery verified, 18 October 2026

The user authorized one further QA email from a personal Gmail account and selected the sender. Exactly one message was sent to `parthpawar@nyu.edu`, with the subject “Portfolio QA test — personal Gmail delivery,” at 00:37:16 America/New_York.

The message was found in the connected NYU account’s **INBOX**, not just the sender’s Sent folder. The received message has `Delivered-To: parthpawar@nyu.edu`, the same RFC Message-ID as the sent message, and the exact unique test reference. Receipt was verified at 00:37:40. [Delivery evidence](personal-email-delivery-test.json).

The configured destination now has an independently verified QA receipt. The earlier same-account test remains documented separately rather than being retrospectively marked received. This confirms mail delivery to the destination; the website continues to prepare an email draft for a visitor to send. No application, mailbox configuration, or deployment change was made.

## Pull-request verification

The access-request regression suite now runs in the reading CI job. It covers eight desktop/mobile and light/dark profiles across Chromium and WebKit, including invalid email, clipboard success/denial, manual selection, edited requests, delayed clipboard completion, email-draft status, protected-content boundaries and overflow. Tests prepare drafts only; they never send email. Raw mailbox identifiers and personal sender addresses are omitted from the committed evidence.

Representative request states: [desktop manual fallback](access-screenshots/chromium-1440-transfi-project-manual.png), [320px manual fallback](access-screenshots/chromium-320-zentipay-manual.png), and [mobile draft status](access-screenshots/webkit-390-transfi-project-draft.png). The production-build request suite passed all eight profiles, including stale clipboard completion and copy-to-draft status changes.
