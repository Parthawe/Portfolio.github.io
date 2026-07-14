import { normalizeCopy } from '../utils/normalizeCopy'

export const CURSOR_WORD_LIMIT = 42
export const CURSOR_IDENTITY_REPLY = "I'm Parth's AI counterpart, not Parth himself. Think of me as the version that lives inside the portfolio and never needs coffee."

const THINKING_LINES = [
  'Let me think. I want to answer this cleanly.',
  'I have a take. One second.',
  'Connecting this to the work.',
]

const CODAS = {
  challenge: [
    'That tension made the work worth doing.',
    "That was the knot I couldn't ignore.",
  ],
  ownership: [
    'I like owning the messy middle, not just the final frames.',
    'I wanted responsibility for the decision, not just the screen.',
  ],
  impact: [
    "I'm proud of that shift.",
    'That part still feels good.',
  ],
  decision: [
    "I'd make that call again.",
    'That was the bet.',
  ],
} as const

function stableIndex(value: string, length: number) {
  let hash = 0
  for (let index = 0; index < value.length; index += 1) {
    hash = ((hash << 5) - hash + value.charCodeAt(index)) | 0
  }
  return Math.abs(hash) % length
}

function emotionalCoda(question: string) {
  const normalized = question.toLowerCase()
  const key = /\b(why|challenge|problem|constraint|hard|difficult)\b/.test(normalized)
    ? 'challenge'
    : /\b(own|owned|role|responsib|contribut|build)\b/.test(normalized)
      ? 'ownership'
      : /\b(outcome|impact|result|change|changed|ship|launch)\b/.test(normalized)
        ? 'impact'
        : /\b(decision|choose|chose|approach|process|bet)\b/.test(normalized)
          ? 'decision'
          : null

  if (!key) return ''
  const options = CODAS[key]
  return options[stableIndex(question, options.length)]
}

function plainCopy(text: string) {
  return normalizeCopy(text)
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/(^|\s)[•*-]\s+/g, '$1')
    .replace(/^(?:(?:great question|good question|absolutely|certainly|of course)[,!.:\s-]*)+/i, '')
    .replace(/^(shipped|designed|built|created|led)\b/i, match => `I ${match.toLowerCase()}`)
    .replace(/^proves\b/i, 'The work proves')
    .replace(/\s+/g, ' ')
    .trim()
}

export function shapeCursorAnswer(text: string, question: string, addEmotion = false) {
  const plain = plainCopy(text)
  const sentences = plain.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [plain]
  const selectedSentences = sentences.slice(0, 2)
  let concise = selectedSentences.join(' ').trim()

  if (addEmotion && !/\b(i am proud|i'm proud|still feels|i would|i'd|honestly)\b/i.test(concise)) {
    const coda = emotionalCoda(question)
    if (coda) concise = `${selectedSentences[0]?.trim() || concise} ${coda}`
  }

  const words = concise.split(/\s+/).filter(Boolean)
  return words.length > CURSOR_WORD_LIMIT
    ? `${words.slice(0, CURSOR_WORD_LIMIT).join(' ')}...`
    : concise
}

export function getCursorThinkingLine(question: string, route: string) {
  return THINKING_LINES[stableIndex(`${route}:${question}`, THINKING_LINES.length)]
}

export function isCursorAnswerUsable(text: string) {
  const normalized = text.trim().toLowerCase()
  if (!normalized) return false
  return !/^(as an ai|as a language model)|\b(i do not have feelings|i don't have feelings|i cannot feel emotions)\b/.test(normalized)
}

export const CURSOR_SCOPE_REPLY = "I'm staying inside the portfolio here. Ask me about a project, a decision, or whether I'd fit your team."

export function isCursorIdentityQuestion(question: string) {
  return /\b(are you (?:a )?human|are you real|real person|are you parth|human or ai)\b/i.test(question)
}
