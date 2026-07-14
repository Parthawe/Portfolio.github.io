import assert from 'node:assert/strict'
import {
  CURSOR_IDENTITY_REPLY,
  CURSOR_SCOPE_REPLY,
  CURSOR_WORD_LIMIT,
  getCursorThinkingLine,
  isCursorAnswerUsable,
  isCursorIdentityQuestion,
  shapeCursorAnswer,
} from '../src/services/parthCursorVoice'

const wordCount = (value: string) => value.split(/\s+/).filter(Boolean).length

const longReply = Array.from({ length: 80 }, (_, index) => `word${index + 1}`).join(' ')
assert.ok(wordCount(shapeCursorAnswer(longReply, 'Tell me more')) <= CURSOR_WORD_LIMIT)

const cleaned = shapeCursorAnswer(
  'Absolutely! Great question! **[Mentra](/mentra)** proves the platform idea. • The app store made it real.',
  'Why Mentra?',
)
assert.equal(cleaned.includes('Great question'), false)
assert.equal(cleaned.includes('Absolutely'), false)
assert.equal(cleaned.includes('**'), false)
assert.equal(cleaned.includes(']('), false)

assert.equal(
  shapeCursorAnswer('Shipped the product with a four-person team.', 'What changed?'),
  'I shipped the product with a four-person team.',
)
assert.equal(
  shapeCursorAnswer('Proves wearables can be a platform.', 'Why this?'),
  'The work proves wearables can be a platform.',
)

const emotional = shapeCursorAnswer(
  'The app store turned a device into a platform.',
  'What changed after the launch?',
  true,
)
assert.match(emotional, /proud|feels good/i)
assert.ok(wordCount(emotional) <= CURSOR_WORD_LIMIT)

const neutral = shapeCursorAnswer('Mentra is the best place to start.', 'Where should I start?', true)
assert.equal(neutral, 'Mentra is the best place to start.')

assert.equal(
  getCursorThinkingLine('What changed?', '/mentra'),
  getCursorThinkingLine('What changed?', '/mentra'),
)
assert.ok(wordCount(CURSOR_SCOPE_REPLY) <= CURSOR_WORD_LIMIT)
assert.ok(wordCount(CURSOR_IDENTITY_REPLY) <= CURSOR_WORD_LIMIT)
assert.equal(isCursorIdentityQuestion('Are you human?'), true)
assert.equal(isCursorIdentityQuestion('What did you own?'), false)
assert.equal(isCursorAnswerUsable('As an AI, I do not have feelings.'), false)
assert.equal(isCursorAnswerUsable("I'm Parth's AI counterpart. I can still have a useful take on the work."), true)

console.log('Parth cursor voice contract passed')
