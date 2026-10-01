# Reusable UI library references

Reviewed 2026-10-01. Global skill: `/Users/parth/.codex/skills/ui-libraries/SKILL.md` (invoke as `$ui-libraries`).

Use ThreeUI, React Bits, Xevrion UI Lab, Great UI, and Fancy Components selectively. The skill's `references/catalog.md` records official sources, candidate uses, and access notes; `references/integration.md` records MCP and registry setup.

`components.json` registers React Bits, Fancy, Xevrion, and Great UI for shadcn MCP. This adds discovery/install configuration only; no components, dependencies, CSS, or theme changes are installed. ThreeUI's separate MCP requires OAuth and Pro membership and is not connected.

Before implementation, read `../portfolio-design-system.md` and `threeui.md`, and apply the global anti-vibecoded-design skill. Preserve current typography, palette, responsive behavior, keyboard access, reduced motion, idle limits, and offscreen/hidden-tab suspension. Inspect a component's source, dependencies, and license before using it. Keep changes local unless deployment is authorized.

Verification: shadcn MCP initialization and listing succeeded for all four registries. Its global config uses this repository as process cwd. Restart Codex to load the configured server. The reusable global skill passed its validator.
