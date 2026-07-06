# Project Access Model

This is a static GitHub Pages portfolio. It cannot enforce a private backend firewall, so private content is handled by not shipping it.

## Modes
- `public`: normal project card, route, metadata, agent answer, and category discovery.
- `request`: safe public glimpse is visible. Full research, client-specific process, product screens, and private details are requested through the inline mailto form.
- `hidden`: excluded from public route generation, listings, category pages, SEO item lists, and agent knowledge. Hidden registry entries point to `NotFoundPage`.

## Rules
- Request-access work uses `access.mode: 'request'` and can keep `nda: true` for compatibility.
- Request-access cards use a safe preview image and "Quick glimpse" language, never a lock.
- Hidden projects should not reference private case-study chunks from `src/data/projects.ts`.
- The agent and SEO layers consume visible projects only.
- NDA pages include an inline reviewer-code form plus a request-access form.
- `VITE_NDA_ACCESS_SHA256` enables the reviewer code path. `VITE_NDA_ACCESS_CODE` is supported only as a local fallback and should not be used for production.
- Because this is a static GitHub Pages site, the reviewer-code gate is a UX/access-control layer. Truly private material should still stay outside the shipped bundle unless a backend is added.

## Threat model (be honest about the limits)
- The gate runs entirely client-side. Anything rendered behind it (or passed as `children`) ships in the public JS bundle and is recoverable from DevTools regardless of the gate state. **Never wrap real client screens, financial figures, or confidential data in `<NdaGate>` expecting protection.**
- The unlock state lives in `sessionStorage` as the SHA-256 of the accepted code and is re-validated against `VITE_NDA_ACCESS_SHA256` on load. This invalidates old grants when the code rotates, but the hash itself is visible in the bundle, so a motivated visitor can still forge it. Treat the gate as "please don't peek," not a lock.
- Rotating the reviewer code: generate a new hash (`node -e "console.log(require('crypto').createHash('sha256').update('new-code').digest('hex'))"`), update the CI secret, redeploy. All previously granted sessions are invalidated automatically.
- If genuinely private material ever needs to be served, it requires a backend (signed URLs, httpOnly session cookie, or a password-protected external deck) — not this gate.
