# Approved grouping and Mentra source adaptation

All 50 projects have an explicit presentation classification in projectExperiences.ts. This is separate from technical routing and approval. The 18-draft directory separates 3D objects (3), Anatomy (2), interfaces (10), experiments/tools (2) and listening (1). Shuffle remains the only approved experience; its implementation is unchanged. Restricted projects retain case-study routes and access gates.

Mentra now has a source-based pairing adaptation and a separate original-design view retaining the recording and Figma embed. The native app cannot simply run as a static website: its pairing engine requires native Bluetooth. This local adaptation covers Mentra Live and Even Realities G1 using upstream images and route order. Device discovery, permission decisions and connection results are explicitly simulated. No account, native engine, cloud calls or real Bluetooth connection is included.

Source: Mentra-Community/MentraOS, revision a02dade84d5eaa6463d379ceb9d055a1a12dcf8b. Upstream license and per-asset provenance are in public/Assets/Projects/MentraSource. This is a current-source subset, not a claim that the historical Figma design and current native UI are identical. The preview app surface retains a light appearance inside the portfolio's light/dark shell.

Verification: production build; both models; denied permission; empty discovery; connection failure and retry; success; reset; keyboard focus; retained recording; mobile overflow; reduced motion; Chromium desktop/mobile and WebKit mobile, each in light/dark themes. Directory checks include category counts, search, empty states, broken cover images, filtered return navigation and case-study links. Curation checks cover redirects and approval restrictions.

Six-profile initial ready observations were 404–855 ms on local production preview, without network or CPU throttling and while another suite ran. These are smoke measurements, not a performance improvement claim. The pairing component is lazy-loaded; there are no animation loops or polling timers. Images total approximately 716 KiB in their unmodified upstream form. Native-device fidelity and user approval remain outstanding. No deployment.

## Catalog decisions

| Presentation | Projects |
| --- | --- |
| prototype | mentra, mentra-miniapps, transfi-project, zentipay, clawed-chat, executivelens, org-dashboard, cuetv, healthapp, ballah-code, ai-voice, raahi-project, vj-software, code-for-build |
| case-study | medimorpho, ibm, embodied-web, feeling-patterns, performance-by-design, on-becoming, storytelling, dna-speculative, hypercinema, applications, messy-humans, production-studio, arcade-lab, uv-light, dumb-waiter-set-design, sculpture, mentra-brand, tedx, vishwaconclave |
| original-interface | the-point-cdc, office-of-diversity, glassly |
| anatomy | jugalbandi, revolving-stage |
| 3d | enigma, shuffle, sea-of-salt, black-hole |
| original-experiment | making-of-time, flow-fields, comp-media, the-omakase, moniac-machine, drowning, typeface |
| media | atps |
