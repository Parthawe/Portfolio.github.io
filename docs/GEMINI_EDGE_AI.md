# Gemini Edge AI Adapter

The portfolio frontend can now call an optional edge endpoint for agent answers.
It is off by default so the static GitHub Pages build stays fast and does not
ship any private API key.

## Frontend Flags

Use one of these when an edge endpoint exists:

```bash
VITE_EDGE_AI_ENABLED=1
VITE_EDGE_AI_ENDPOINT=/api/folio-answer
VITE_EDGE_AI_MODEL=gemini-2.5-flash
```

If `VITE_EDGE_AI_ENDPOINT` is omitted but `VITE_EDGE_AI_ENABLED=1` is set, the
frontend calls `/api/folio-answer`.

## Endpoint Contract

The endpoint receives:

```json
{
  "message": "Which project should a hiring manager open first?",
  "route": "/work",
  "localAnswer": "The deterministic local answer...",
  "context": {
    "instruction": "Use only this public context...",
    "projects": []
  },
  "model": "gemini-3.5-flash"
}
```

It should return:

```json
{
  "answer": "A concise portfolio answer with safe public links."
}
```

## Security Rule

Do not add `GEMINI_API_KEY` or a Google API key to any `VITE_` variable. Vite
exposes `VITE_` values to the browser bundle. The Gemini key belongs only on a
serverless or edge runtime such as Vercel Edge Functions, Netlify Functions, or
Cloudflare Workers.

## Gemini Request Shape

Use `gemini-2.5-flash` as the default model for the portfolio agent because it
is currently the fastest reliable option for short portfolio chat answers. The
local Vite endpoint can also fall back through Gemini 3 Flash models if a
requested model is rate-limited or temporarily unavailable.

```ts
const model = 'gemini-2.5-flash'
const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`

const response = await fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-goog-api-key': process.env.GEMINI_API_KEY
  },
  body: JSON.stringify({
    contents: [{
      role: 'user',
      parts: [{ text: prompt }]
    }],
    generationConfig: {
      temperature: 0.35,
      maxOutputTokens: 520
    }
  })
})
```

The prompt should include only the safe public context supplied by the frontend.
For request-access projects, answer with the public glimpse and invite the user
to request access instead of inventing internal details.
