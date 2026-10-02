# Reusable UI library references

Reviewed 2026-10-01. Global skill: `/Users/parth/.codex/skills/ui-libraries/SKILL.md` (invoke as `$ui-libraries`).

Use ThreeUI, React Bits, Xevrion UI Lab, Great UI, and Fancy Components selectively. The skill's `references/catalog.md` records official sources, candidate uses, and access notes; `references/integration.md` records MCP and registry setup.

`components.json` registers React Bits, Fancy, Xevrion, and Great UI for shadcn MCP. This adds discovery/install configuration only; no components, dependencies, CSS, or theme changes are installed. ThreeUI's separate MCP requires OAuth and Pro membership and is not connected.

Before implementation, read `../portfolio-design-system.md` and `threeui.md`, and apply the global anti-vibecoded-design skill. Preserve current typography, palette, responsive behavior, keyboard access, reduced motion, idle limits, and offscreen/hidden-tab suspension. Inspect a component's source, dependencies, and license before using it. Keep changes local unless deployment is authorized.

Verification: shadcn MCP initialization and listing succeeded for all four registries. Its global config uses this repository as process cwd. Restart Codex to load the configured server. The reusable global skill passed its validator.

## Skiper / Animmaster review — 2026-10-01

- Skiper: https://skiper-ui.com/v1/skiper23 (Minimal Card Expand). Official documentation describes click-driven expansion and Motion transitions. Current install is Pro-gated; free-use text requires attribution. No restricted source, fonts, or assets copied.
- Animmaster: https://animmasterlib.dev/ now advertises 300 components. Catalog includes sliders, hover, scroll, and WebGL effects. No component package downloaded or installed; individual source licenses remain unchecked.
- ThreeUI remains a reference for meaningful spatial demonstrations under the existing rendering contract. No additional canvas introduced for this gallery.

Local application: original `CsScreenExplorer.tsx` uses Skiper's click-to-inspect interaction as a reference, with four existing MiniApps Figma screens, explicit selected states, native keyboard buttons, a stable media frame, captions, loading/error feedback, and original-image links. No new runtime dependency, autoplay, animation timer, or WebGL context. Scope is `/mentra-miniapps` only. Publication requires Parth's approval.
