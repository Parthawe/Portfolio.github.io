# Portfolio Agent — Persistent Chat Character

## Context
Add a small animated character that lives on the left side of the portfolio. Visitors can click it to chat about projects, tools, experience, and Parth. Inspired by lilagents.xyz — a companion that walks around, reacts to the page, and makes the portfolio feel alive.

**Critical constraint**: This is a static GitHub Pages site — NO backend, NO API keys. The chat intelligence is a smart pattern-matching engine built on the existing project data in `categories.ts`.

---

## Architecture

```
RootLayout.tsx (persistent)
  └── PortfolioAgent (lazy, deferred ~2s)
        ├── AgentCharacter (SVG + CSS keyframes)
        └── AgentChat (lazy, mounted on first click)
              ├── ChatMessages (aria-live="polite")
              ├── Quick-action chips
              └── ChatInput
```

---

## Files to Create

### 1. `src/components/agent/AgentCharacter.tsx` (~3KB)
- Pure SVG character, ~64px tall, minimal geometric style
- Head (rounded rect + dot eyes + mouth path), body, arms, legs
- Animation states via CSS classes: `--idle`, `--walking`, `--talking`, `--thinking`, `--waving`, `--sleeping`
- Theme-aware: fills use `var(--ink)`, `var(--ink-40)`, `var(--bg-alt)`
- Receives `state` prop, applies corresponding CSS class

### 2. `src/components/agent/AgentChat.tsx` (~4KB)
- Glass-morphism panel (320px wide, 400px tall)
- Message list + text input + send button
- Quick-action chips for first-time: "Tell me about Mentra", "What tools?", "AI projects"
- `role="dialog"`, `aria-label`, focus trap, Escape to close
- Fake thinking delay (300-800ms) for natural feel
- Renders response with bold formatting (`**text**` -> `<strong>`)

### 3. `src/data/agentKnowledge.ts` (~5KB)
- Imports `categories` from `categories.ts`
- Builds a project index (Map<name, info>) at module load
- Hardcodes bio/experience/education/fun-facts from AboutPage data
- ~15 intent patterns with regex matching:
  - greeting, project query, skills/tools, experience, education, current role
  - contact, fun facts, navigation help, category info, this page, thanks, fallback
- Fuzzy project name matching (lowercase, includes-based)
- Context-aware: uses current route for page-specific responses
- Follow-up suggestions with each response

### 4. `src/hooks/useAgentBehavior.ts` (~2KB)
- State machine: idle -> walking -> waving -> sleeping -> talking -> thinking
- Idle timer: 30s no interaction -> sleep
- Micro-animations: random every 8-15s (look around, extra blink)
- Route change detection -> wave + contextual greeting
- Y-position: scroll-linked via rAF (direct DOM, not React state)
- Returns: `{ state, yPosition, contextMessage, wake }`

### 5. `src/components/agent/PortfolioAgent.tsx` (~3KB)
- Orchestrator: mounts character + lazy chat
- Fixed position: `left: 16px`, `z-index: 900`
- On mount: 600ms delay, slides in from left, waves
- Click -> lazy-load AgentChat, open with route-contextual greeting
- Passes route info to knowledge engine for context
- `prefers-reduced-motion`: no walking/bobbing, chat still works

### 6. `src/styles/agent.css` (~3KB)
- @keyframes: idle-bob, blink, walk-cycle, wave, sleep-zzz, think-dots
- Character positioning (fixed, left side)
- Chat panel (glass card, messages, input, chips)
- Mobile (768px): character -> 44px floating button bottom-left, chat -> full-screen overlay
- `prefers-reduced-motion`: disable keyframes, keep opacity transitions

---

## Files to Modify

### `src/components/RootLayout.tsx`
- Add lazy import: `const PortfolioAgent = lazy(() => import('./agent/PortfolioAgent'))`
- Render after HandTracker: `<Suspense fallback={null}><PortfolioAgent /></Suspense>`

### `src/styles/globals.css`
- Add: `@import "./agent.css";`

---

## Character Design
Minimal, geometric, matches the portfolio's restrained aesthetic:
- Not cartoonish — think simple shapes, clean lines
- Subtle animations — gentle bob, soft blink, understated walk
- Color: uses `var(--ink)` so it adapts to light/dark automatically

## Knowledge Coverage
The agent can answer about:
- Any of the 45+ projects (name, description, role, category, year, link)
- 12 tools/skills with proficiency areas
- Full work experience timeline (Mentra, ZentiPay, TransFi, etc.)
- Education (NYU ITP, VIT Pune)
- Awards & exhibitions
- Fun facts / personality traits
- Navigation ("where can I see AI projects?" -> "/ai")
- Current page context

## Performance
- Zero impact on initial load (lazy + deferred 2s)
- CSS-only character animations (no Framer Motion runtime cost)
- Direct DOM manipulation for scroll position (rAF, not setState)
- Knowledge base computed once at import time
- Total bundle: ~17KB gzipped, all lazy-loaded

## Verification
1. `bun run build` — no errors, no new warnings
2. Navigate to every major page type (/, /work, /about, /ai, /mentra) — character appears, waves
3. Click character — chat opens with route-specific greeting
4. Test queries: "Tell me about Mentra", "What tools?", "Who is Parth?", "Show me AI projects"
5. Test idle -> sleep after 30s, wake on interaction
6. Test mobile (< 768px) — floating button, full-screen chat
7. Test dark mode — character colors adapt
8. Test keyboard: Tab through chat, Escape to close, Enter to send
9. Test `prefers-reduced-motion` — no animations, chat still functional
