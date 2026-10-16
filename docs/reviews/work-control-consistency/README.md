# Work header and control consistency

Local changes; no deployment.

- Removed “The interactive collection” from the experience directory.
- Work places the title and experience action on the left and the role summary on the right above 900px. Smaller screens stack the same content. Editorial category controls retain their separate full-width row.
- Reused `glass-action` for standalone experience links, case-study header navigation, original-screen actions, workshop navigation, Notes actions, analytics preferences, and the footer portfolio-history action.
- Reused `glass-segments` for Work/Experiences navigation.
- Excluded explicit action controls from the case-study prose underline selector. Kept inline citations, contextual prose links, consent-policy links, and card hover feedback as content links. They do not create a third button type.
- Kept project artwork, simulations, access restrictions and approval states intact.

Verification commands:

```
VITE_EXPERIENCE_PREVIEWS_ENABLED=1 npm run build
node scripts/work-controls-review-qa.mjs
node scripts/experience-directory-qa.mjs
```

The focused review covers desktop Chromium, mobile Chromium and mobile WebKit, each in light and dark themes with reduced motion: all three Work views, desktop/sidebar summary placement versus mobile stacking, no horizontal overflow, directory navigation, and keyboard activation of the original-project evidence action. Screenshots and results are written to `/tmp/work-controls-review`.

The directory regression covers all 20 cards, loaded images, filters, search, empty state, keyboard entry and missing-image recovery in six browser/theme profiles. Evidence is written to `/tmp/experience-directory-qa`.
