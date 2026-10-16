# Original interface experiences

The interface directory now offers Live products and Figma prototypes. Original or released sources lead each project; the earlier browser adaptations remain optional, explicitly labelled studies and load only when expanded.

## Live sources

- Mentra: official product site. Mobile pairing requires its phone app and compatible hardware.
- MiniApps: real Miniapp Store, independently loaded and verified with populated app cards.
- Clawed: the official site’s hosted `/demo` link, with sign-in for the full product. The site and its demo link were verified; no account was created and no real assistant action was run.
- ExecutiveLens: existing portfolio address retained at the user’s request. Both www and bare-domain attempts failed. It is labelled as needing verification, not represented as working.
- OrgDashboard: the user confirmed it is not active. It appears only as a concept prototype.

## Existing Figma sources

Original Mentra file `UqMHlp3DWI2erzruqcCZNd`:

- Pairing start `63254:44046`, page `63254:33903`.
- Mira `63803:37149` and Streamer `63803:42509`, page `63803:30714`.
- Notes `63254:52310` and Captions `63254:49534`, page `63254:33903`.

Starting points and actual navigation reactions were inspected through Figma. The original files and their sharing settings were not changed. Notes and Captions are historical MentraOS 3 design snapshots, not a claim about the current released interface.

## New Figma task drafts

[Portfolio · Interface click-throughs](https://www.figma.com/design/u9ZRlQnwfUsErk2bFa9Ceq)

The user selected the Portfolio team and authorized using the available evidence. The six new flows cover Health App, Vijay Parivar, Code for Build, Ballah Code, OrgDashboard and Raahi. They contain 21 editable frames, 182 editable text nodes and 32 navigation connections, with back/reset/review paths. No full-screen screenshot fills are used in the Figma deliverable. Website preview posters are exported from those editable frames.

These are source-based, prepared task subsets. They are **not recovered original Figma screens**, complete product replicas or live services. The file and website label that distinction. Source comparisons and references are in `figma/source-notes.md`; frame IDs, connections, reachability and contrast results accompany it. Original screen assets and case studies remain available.

Figma access follows the file’s sharing settings; visitors may need access. No sharing permissions were changed and no public promotion was inferred.

## Verification

- Production build and TypeScript.
- Figma: every target exists, all 21 frames are reachable from their project start, no top-level child overflows, and all 32 action labels meet 4.5:1 contrast (measured minimum 4.651).
- Chromium/WebKit desktop and mobile emulation: filters, context-preserving return links, original MiniApps flow selection, zero iframe requests before Start, controlled iframe reload/close, light/dark themes and lazy legacy studies.
- Existing browser task regressions: 20 task flows across desktop/light and mobile/dark.

Iframe lifecycle tests use controlled responses. They do not establish anonymous Figma access, real hardware behavior, live backend actions or physical-phone interaction. Nothing deployed.

Final browser results: four source-view profiles passed; six directory image/filter/search profiles passed; filter-return checks passed in Chromium and WebKit; all 20 retained browser task checks passed. The new prototype assets add about 200 KiB of static posters across six entries, loaded only on their individual pages. This is an asset total, not a measured startup speedup.
