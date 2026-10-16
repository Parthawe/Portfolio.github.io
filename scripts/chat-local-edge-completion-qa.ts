import assert from 'node:assert/strict'
import { PassThrough } from 'node:stream'
process.env.GEMINI_API_KEY = 'local-test-placeholder'
const { default: config } = await import('../vite.config.ts')
const settings: any = await (config as any)({ mode: 'test', command: 'serve' })
delete process.env.GEMINI_API_KEY
const plugin = settings.plugins.find((value: any) => value?.name === 'local-gemini-edge')
let handler: any
plugin.configureServer({ middlewares: { use: (_path: string, value: any) => { handler = value } } })
const originalFetch = globalThis.fetch
const configs: any[] = []
;(globalThis as any).fetch = async (_url: string, init: RequestInit) => {
  configs.push(JSON.parse(String(init.body)).generationConfig)
  return Response.json({ candidates: [{ finishReason: configs.length === 1 ? 'MAX_TOKENS' : 'STOP', content: { parts: [{ thought: true, text: 'Private thought.' }, { text: 'Mentra shows product design ownership.' }] } }] })
}
try {
  const req: any = new PassThrough(); req.method = 'POST'
  const result = new Promise<any>((resolve) => {
    const res = { statusCode: 0, setHeader() {}, end: (body: string) => resolve({ status: res.statusCode, body: JSON.parse(body) }) }
    handler(req, res)
  })
  req.end(JSON.stringify({ message: 'What makes him different?', model: 'gemini-2.5-flash', surface: 'panel' }))
  const response = await result
  assert.equal(response.status, 200)
  assert.equal(response.body.answer, 'Mentra shows product design ownership.')
  assert.equal(configs.length, 2)
  assert.equal(configs[0].thinkingConfig.thinkingBudget, 0)
  assert.equal(configs[0].maxOutputTokens, 1024)
  console.log('Vite adapter: token budget, provider finish reason and thought filtering passed. Google transport mocked.')
} finally { globalThis.fetch = originalFetch }
