# Five private working project prototypes

1 November 2026. User requested the Raahi approach for TransFi B2B cross-border payments, ZentiPay, Code for Build, VJ and NYU Langone. TransFi's invoice/recipient/quote/approval/tracking scope was explicitly confirmed. The healthcare format question remains open; its nonclinical communication rehearsal is labelled provisional.

## Delivery boundaries

The independent source repository is `Parthawe/portfolio-working-prototypes` (private). Owner-only Sites project `appgprj_6ae6ee660da081918b523f1606d2e391` hosts the app. This public repository contains launch metadata, new demo-only captures, a proposed blueprint and evaluation notes per project. It does not contain the private application, protected findings, interviews or original private source images. Original Figma files and all NDA gates remain unchanged.

TransFi and ZentiPay do not move money. Quotes, fees, balances, recipients and provider events are fixtures. Approval roles are a local rehearsal, not authentication. VJ does not allocate real spaces or create ownership records. NYU has no hospital connection, patient data, medical advice, interpreter dispatch or clinical translation. Code for Build exports actual HTML/CSS but does not claim measured learning outcomes.

## Implemented flows

- Builder: add/edit/remove/reorder, source-derived block anatomy, live HTML output, undo/redo, safe HTML export and validated project import.
- Parking: floor/vehicle/type filters, one bay per vehicle, five-minute hold, acknowledgment, failed-response recovery, allocation exclusion, persistent history and receipt.
- TransFi: sample invoice and supplier, expiring quote, maker/reviewer separation, simulated failure, atomic one-time settlement, balance and receipt.
- ZentiPay: source-led centred token-transfer view, fixture contacts, quote/review, simulated settlement, persistent ledger/history and receipt.
- NYU provisional: communication preference, sample question, interpreter-request status, unavailable-service recovery, staff handoff, nonclinical next-step prompts and communication card.

## Evidence

- Private app code commit `69bc85e147a0be941d64313f501e374b62931600` passed eight model tests and ten desktop/mobile browser scenarios in private GitHub Actions run `41286454269`.
- Owner-private deployment succeeded at source commit `810ea39941e0a147ab44c2acd30a40792b41f241`. The exact deployed commit also passed the eight model and ten browser scenarios in private run `41286838993`.
- CUA checked all five private app surfaces at 1280×900 and 390×844. Body width matched viewport width on all ten checks. Public entry pages also passed ten desktop/mobile inspections, with correct private destinations, loaded captures and no iframe. Case-study mobile inspection found an inherited grid min-content issue; scoped min-width constraints restore the blueprint’s own scroll region.
- The full preview-enabled portfolio build passed and generated 263 static route entrypoints. Existing approval states are retained. Three reference projects are included in the review directory through an explicit `hasPrivatePrototype` flag.
- Shared public UI detector returned no findings. The private app detector reported square parking-bay selection borders and the incumbent system-sans font; these are intentional Operate-surface conventions, not decorative cards or a new visual identity.

The active release QA suites cover all five public entries. Existing Figma source expectations remain for the other projects. Directory counts change from 20 to 23, interface entries from 10 to 13, and Figma entries from 7 to 5. No unrelated legacy QA script is repaired as part of this change.

## Evaluation remaining

Software checks establish that these fixture flows run. Representative-user comprehension, assistive-technology review, physical parking-plan validity, finance/compliance review, language review and appropriate healthcare professional review remain necessary. No new participant count, impact metric, service performance or clinical benefit is claimed.
