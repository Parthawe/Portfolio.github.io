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

`VITE_EDGE_AI_ENDPOINT` selects an explicit endpoint. Otherwise, an enabled client
uses `${VITE_SUPABASE_URL}/functions/v1/folio-answer` when a Supabase project URL
is configured, or `/api/folio-answer` as the local adapter fallback. The Vite
adapter needs server-side Gemini configuration; a static preview cannot serve
that API route by itself.

For local testing against an existing deployed edge function, put its public URL
in the ignored `.env.local`, set `VITE_EDGE_AI_ENABLED=1`, and restart Vite or
rebuild the preview. No Gemini API key belongs in this client configuration.
Build-time environment flags are not changed by opening the chat.

The client and existing edge contract accept questions up to 800 JavaScript
string characters. The panel allows 26 seconds for the endpoint's model fallback
sequence; the cursor keeps its shorter 6.5-second budget. On unavailable,
rate-limited, empty or invalid responses, the chat labels the portfolio-note
fallback and offers an explicit retry. Retry replaces the same answer, preserves
an unsent draft and retains the question's original project context.

The panel rejects cut-off replies and makes at most one completion retry inside
the same 26-second deadline. Persistent fragments fall back to labeled notes.
Local server changes reserve the Flash 2.5 output budget for the visible answer,
check the provider finish reason, and exclude thought parts. These changes need
a separate server deployment; editing this checkout does not update Supabase.
Google documents the shared reasoning/output budget in its
[thinking guide](https://ai.google.dev/gemini-api/docs/generate-content/thinking).

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

The configured default model is `gemini-3.1-flash-lite`. The existing server
chooses its fallback sequence. A successful HTTP response alone does not prove
model generation: verification should check the response's model identifier and
distinguish `portfolio-knowledge` from a live model. The browser does not receive
the server API key.

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
      thinkingConfig: { thinkingBudget: 0 },
      temperature: 0.35,
      maxOutputTokens: 1024
    }
  })
})
```

The prompt should include only the safe public context supplied by the frontend.
For request-access projects, answer with the public glimpse and invite the user
to request access instead of inventing internal details.
