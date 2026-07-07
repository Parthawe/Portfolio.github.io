export interface EdgeAIRequest {
  message: string
  route: string
  localAnswer: string
  context: unknown
  model: string
}

interface EdgeAIResponse {
  answer?: string
  text?: string
}

const EDGE_ENDPOINT = import.meta.env.VITE_EDGE_AI_ENDPOINT?.trim()
const EDGE_ENABLED =
  import.meta.env.VITE_EDGE_AI_ENABLED === '1' ||
  import.meta.env.VITE_EDGE_AI_ENABLED === 'true' ||
  Boolean(EDGE_ENDPOINT)

const DEFAULT_ENDPOINT = '/api/folio-answer'
const EDGE_MODEL = import.meta.env.VITE_EDGE_AI_MODEL?.trim() || 'gemini-2.5-flash'

export function isEdgeAIEnabled() {
  return EDGE_ENABLED
}

export function getEdgeAIModel() {
  return EDGE_MODEL
}

export async function getEdgeAIAnswer(payload: EdgeAIRequest, timeoutMs = 2800): Promise<string | null> {
  if (!EDGE_ENABLED || typeof fetch !== 'function') return null

  const controller = new AbortController()
  const timeout = window.setTimeout(() => controller.abort(), timeoutMs)

  try {
    const response = await fetch(EDGE_ENDPOINT || DEFAULT_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    })

    if (!response.ok) return null

    const data = await response.json() as EdgeAIResponse
    const answer = typeof data.answer === 'string' ? data.answer : data.text
    if (!answer) return null

    return answer.trim().slice(0, 2200)
  } catch {
    return null
  } finally {
    window.clearTimeout(timeout)
  }
}
