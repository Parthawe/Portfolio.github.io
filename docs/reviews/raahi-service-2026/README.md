# Raahi service study, October 31, 2026

The public case study adds official Pune references, a fictional Aditi journey, a five-stage service blueprint, data architecture, failure recovery, a field-study plan and captures from the working phone, kiosk and vehicle views. The original 2022 project and credits remain visible. No Figma tools were used or files modified.

The user authorized publication to the live portfolio. The implementation and playable app remain private: `Parthawe/raahi-prototype` and the existing owner-only Sites project. The public case study links to that access gate. Public PNG mockups are selected, non-personal demo captures; app source and raw Figma exports are not included.

## Evidence and scope

Sources were checked on October 31, 2026. The current Pune Metro project profile supplies station naming and sequence. The operator Aqua feeder PDF supplies selected Vanaz–Bavdhan and Ramwadi–Kharadi corridors. Its effective date is absent, so its fare bands and frequencies are not presented as current quotes. Operator accessibility documentation describes facilities, not their uptime. Google Maps receives named places through documented directions URLs, without a paid API key.

Prototype timings, fares, walking links and coordinates are estimates. Demo connectors are opt-in. Tickets and kiosk receipts are not valid for travel. The display advances manually; no live GPS, payment or validator service is connected. Marathi and Hindi labels need human review. Secondary research and implementation checks do not establish interview findings, participant outcomes or operational readiness.

## Verification

- Private app commit `2112239362343dd44b5d6827184e0b454dd95142`: build, 11 model tests and 6 browser tests pass in GitHub Actions run 41225830033. Includes kiosk isolation and vehicle controls.
- Matching private Sites deployment succeeded, preserving owner-only access.
- Portfolio TypeScript and production build pass, including 50 project routes and 189 static route entrypoints.
- Portfolio design audit passes blocking checks; existing repository-wide warnings remain. The changed source detector returned no findings.
- CUA inspected the production build at 1280 × 900 and 390 × 844. The blueprint remains a horizontally scrollable region; body width matches the viewport at both sizes.
- A collision with an older research-list class was found during mobile inspection and fixed by giving the new list a scoped class name.
- Public prototype, kiosk and bus links retain the private Sites origin. Blueprint CSV and research-notes downloads are nonempty local artifacts.

The mockup board is reproducible from `public/Assets/Projects/Raahi/service-2026/mockup-board.html`. It uses captures of the working prototype and explicitly identifies the equipment composition as a concept. It is not a photograph of installed transit hardware.
