# Raahi portfolio prototype entry

Review date: October 26, 2026 (America/New_York).

Branch: `feat/raahi-prototype-entry`, based on `e3827cc`.

Local review: `http://127.0.0.1:4180/raahi-project#cs-prototype`.

The Raahi case study now offers its private working browser prototype from the project header and a new opening section. A three-step sample journey explains how to plan, advance, ticket, and complete a trip. Links lead into the original design decisions and research artifacts. The chapter navigation includes the new prototype section.

## Changed source

- `src/pages/projects/RaahiPage.tsx`: launch links, access explanation, trip guide, accurate simulation limits, and chapter entry.
- `src/data/projectReadingPaths.ts`: the header reading path now points to the prototype guide.
- `src/styles/raahi-prototype-entry.css`: scoped responsive layout and launch styles using existing portfolio tokens.

The original project screens, credits, story disclosure, and other experiences retain their existing behavior. No Figma tools were used. No private prototype assets or application source were copied into the public portfolio.

## Verification

- The full production build passed, including TypeScript, the 50-project route manifest, and 189 static route entrypoints. See `build-summary.txt`.
- The design system audit passed its blocking checks. Existing repository-wide refactor warnings remain. See `design-summary.txt`.
- The Impeccable source detector returned no findings for the changed UI targets during implementation.
- `git diff --check` passed.
- CUA browser checks used the production build at 1280 × 900 and 390 × 844, in light and dark themes. The desktop layout has two 488px columns; the mobile layout has one 358px column. No horizontal overflow was observed.
- The launch button has a 44px height, visible text in both themes, and no article-link underline. Its light-theme foreground/background are `rgb(250,250,248)` / `rgb(26,26,26)`; dark-theme values are `rgb(17,17,16)` / `rgb(237,237,236)`.
- The prototype chapter link scrolls to `cs-prototype` and moves focus there. Keyboard navigation from the launch button reaches the design-decisions link with a visible 2px focus outline.
- The design-decisions link mounts the deferred story and focuses `cs-features`. The research link opens and focuses `cs-research`; reloading that deep link preserves the section and focus.
- Clicking the launch button opens the existing private Site in another tab. Its unauthenticated state displays **Log in to access** and **Continue with ChatGPT**. No authentication or sharing settings were changed. The public story links remain usable without prototype access.
- No browser console errors were captured on the portfolio page during this pass.

Final screenshots: `desktop-light.png`, `desktop-dark.png`, `mobile-light.png`, and `mobile-dark.png`. `private-signin.png` records the expected access gate. The two `*-before.png` files record the inherited article-link contrast defect, corrected before the final screenshots.

## Delivery boundary

This is a local review branch. It has not been pushed, merged, or deployed to the public portfolio. The prototype repository and hosted app remain private.

The current launch supports the authorized owner. Letting ordinary portfolio visitors play the app would require a separate privacy decision. The integration does not make that decision or bypass sign-in; visitors can inspect the existing public case-study material instead.

The earlier build stopped because the machine ran out of disk space. A proposed generated-folder cleanup command was rejected by the command guard and was not retried through another mechanism. After disk space became available, the unchanged build path succeeded. No unrelated cleanup was performed.
