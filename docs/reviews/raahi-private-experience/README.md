# Raahi private experience entry

The user identified `/experience-preview/raahi-project` as the required destination. This route now presents the working private app instead of the old reconstructed Figma task player. It offers owner-authenticated app, kiosk and vehicle links, a representative journey and an actual capture from the current prototype. It embeds no private source or authenticated frame.

The prototype audience is unchanged. The public page explains owner sign-in, demo fares/tickets, simulated vehicle movement and the isolation of kiosk receipts. The experience remains a draft, preserving the portfolio's approval boundary. Its directory description and classification now describe a private browser study rather than a reconstructed Figma task.

The existing browser QA scripts now verify this route's actual contract: exact private endpoints, separate-tab launch, noopener, no iframe or obsolete player, a loaded mockup, case-study navigation and viewport containment. Other projects retain their existing assertions.

Production build uses the same `VITE_EXPERIENCE_PREVIEWS_ENABLED=1` setting as deployment. Direct routes are generated as static entrypoints. No Figma file was read or modified for this change.

Validation: full TypeScript/production build passed (240 static route entrypoints), changed-source detector returned no findings, and diff checks passed. CUA checked desktop light and mobile dark layouts, loaded image, exact private destinations, no iframe and viewport containment. Mobile launch target is approximately 53px high.
