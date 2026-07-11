# Parth Pawar — Portfolio

Design engineering portfolio built with React 19, TypeScript, Tailwind CSS v4, and Vite. Features 60+ project case studies, an AI agent, hand tracking, 3D scenes, and a generative canvas.

## Prerequisites

- [Bun](https://bun.sh/) (package manager & runtime)
- Node.js 20+

## Setup

```bash
# Install dependencies
bun install

# Copy env template and fill in your keys
cp .env.example .env

# Start dev server
bun run dev
```

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `GEMINI_API_KEY` | No | Server-only Gemini key for the local `/api/folio-answer` endpoint |
| `VITE_EDGE_AI_ENABLED` | No | Set to `1` to let the portfolio agent call the edge AI endpoint |
| `VITE_EDGE_AI_ENDPOINT` | No | Defaults to `/api/folio-answer` |
| `VITE_EDGE_AI_MODEL` | No | Defaults to `gemini-2.5-flash` |
| `VITE_ELEVENLABS_API_KEY` | No | ElevenLabs TTS for agent voice |
| `VITE_ELEVENLABS_VOICE_ID` | No | Voice ID (defaults to Rachel) |

## Scripts

```bash
bun run dev       # Start dev server
bun run build     # Type-check + production build
bun run preview   # Preview production build locally
```

## Adding a New Project

1. Create a page component in `src/pages/projects/YourProjectPage.tsx`
2. Add an entry to the `projects` array in `src/data/projects.ts`:
   ```ts
   {
     slug: 'your-project',
     name: 'Your Project',
     image: '/Assets/images/your-project.webp',
     tag: 'UX DESIGN',
     year: '2025',
     desc: 'One-line description',
     category: 'ux',
     page: lazy(() => import('./pages/projects/YourProjectPage')),
     tier: 'a',
   }
   ```
3. Run `node scripts/validate-registry.mjs` to check for errors

## Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── case-study/     # Case study building blocks
│   ├── agent/          # AI portfolio agent
│   └── studio/         # Drawing/design canvas
├── pages/              # Route-level pages
│   └── projects/       # Individual project case studies
├── data/               # Project registry, categories, agent knowledge
├── config/             # Site config
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
└── styles/             # CSS (tokens, reset, components)
```

## Deployment

Pushes to `main` trigger automatic deployment to GitHub Pages via `.github/workflows/deploy.yml`.
