import assert from 'node:assert/strict'
// Run the real edge handler locally, substituting only its runtime and Google
// transport. No credentials, public endpoint, or deployment are involved.
let handler: (request: Request) => Promise<Response>
let responses: unknown[] = []
let configs: Array<Record<string, unknown>> = []
;(globalThis as any).Deno = {
  env: { get: (name: string) => name === 'GEMINI_API_KEY' ? 'local-test-placeholder' : name === 'GEMINI_MODEL' ? 'gemini-2.5-flash' : undefined },
  serve: (value: typeof handler) => { handler = value },
}
const originalFetch = globalThis.fetch
;(globalThis as any).fetch = async (_url: string, init: RequestInit) => {
  configs.push(JSON.parse(String(init.body)).generationConfig)
  return Response.json(responses.shift() || { candidates: [{ finishReason: 'MAX_TOKENS', content: { parts: [{ text: "I approach design. I'm" }] } }] })
}
await import('../supabase/functions/folio-answer/index.ts')
const candidate = (text: string, finishReason = 'STOP') => ({ candidates: [{ finishReason, content: { parts: [{ text }] } }] })
const request = () => new Request('http://local/folio-answer', { method: 'POST', headers: { origin: 'http://127.0.0.1:5211', 'content-type': 'application/json' }, body: JSON.stringify({ message: 'What makes him different?', surface: 'panel', localAnswer: 'Mentra shows product design ownership.' }) })
try {
  responses = [candidate('Mentra shows ownership.', 'MAX_TOKENS'), candidate('Clawed shows approvals and receipts.')]
  let response = await handler!(request())
  assert.equal(response.status, 200)
  assert.equal((await response.json()).answer, 'Clawed shows approvals and receipts.')
  assert.equal(configs.length, 2)
  assert.deepEqual(configs[0].thinkingConfig, { thinkingBudget: 0 })
  assert.equal(configs[0].maxOutputTokens, 1024)

  configs = []; responses = [candidate("I design. I'm"), candidate('Mentra shows product design ownership.')]
  response = await handler!(request())
  assert.equal((await response.json()).answer, 'Mentra shows product design ownership.')
  assert.equal(configs.length, 2)

  configs = []; responses = [{ candidates: [{ finishReason: 'STOP', content: { parts: [{ thought: true, text: 'Internal reasoning is not public.' }, { text: 'Mentra includes the OS, app and MiniApps.' }] } }] }]
  response = await handler!(request())
  assert.equal((await response.json()).answer, 'Mentra includes the OS, app and MiniApps.')

  configs = []; responses = []
  response = await handler!(request())
  assert.equal(response.status, 502)
  assert.equal(configs.length, 4)
  console.log('Local edge handler: budget, finish reason, fragment rejection, thought exclusion and bounded model fallback passed. Google transport mocked; deployed endpoint unchanged.')
} finally { globalThis.fetch = originalFetch }
