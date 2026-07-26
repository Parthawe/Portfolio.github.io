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
import { createContext, getResponse } from '../src/data/agentKnowledge'
import { getProject } from '../src/data/projects'
import { isPortfolioQuestion } from '../src/data/portfolioKnowledgeBase'
import { updatePersonaFromMessage } from '../src/services/personaInference'

const wordCount = (value: string) => value.split(/\s+/).filter(Boolean).length

const longReply = Array.from({ length: 80 }, (_, index) => `word${index + 1}`).join(' ')
assert.ok(wordCount(shapeCursorAnswer(longReply, 'Tell me more')) <= CURSOR_WORD_LIMIT)
assert.match(shapeCursorAnswer(longReply, 'Tell me more'), /\.$/)

const cleaned = shapeCursorAnswer(
  'Absolutely! Great question! **[Mentra](/mentra)** proves the platform idea. • The app store made it real.',
  'Why Mentra?',
)
assert.equal(cleaned.includes('Great question'), false)
assert.equal(cleaned.includes('Absolutely'), false)
assert.equal(cleaned.includes('**'), false)
assert.equal(cleaned.includes(']('), false)
assert.equal(shapeCursorAnswer('The playful part is *Jugalbandi*.', 'What is playful?'), 'The playful part is Jugalbandi.')

assert.equal(
  shapeCursorAnswer('Shipped the product with a four-person team.', 'What changed?'),
  'I shipped the product with a four-person team.',
)
assert.equal(
  shapeCursorAnswer('Proves wearables can be a platform.', 'Why this?'),
  'The work proves wearables can be a platform.',
)
assert.equal(
  shapeCursorAnswer(
    'Best fit: design engineer in AI and wearables. I also enjoy owning research, interaction, prototyping, implementation, visual systems, team direction, and every messy decision between them.',
    'What role fits?',
  ),
  'Best fit: design engineer in AI and wearables.',
)
assert.equal(
  shapeCursorAnswer('Hardware momentum is useless without a cohesive software pattern', 'Why?'),
  'Hardware momentum is useless without a cohesive software pattern.',
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
assert.equal(isCursorAnswerUsable('The riskiest bet was rejecting disconnected demos to force'), false)
assert.equal(isCursorAnswerUsable("I'm Parth's AI counterpart. I can still have a useful take on the work."), true)
assert.equal(isCursorAnswerUsable("I'm Parth's AI counterpart. I can still have a useful take on the work.", 'What roles fit?'), false)
assert.equal(isCursorAnswerUsable("I'm Parth's AI counterpart.", 'Are you human?'), true)
assert.equal(isCursorAnswerUsable('I work best as a Lead Designer.', 'What roles fit?'), false)
assert.equal(isCursorAnswerUsable('Best fit: design engineer or senior product designer.', 'What roles fit?'), true)

assert.equal(isPortfolioQuestion('Where should I start?', { route: '/' }), true)
const ownershipContext = createContext('/mentra')
assert.equal(
  getResponse('What did Parth own on Mentra?', ownershipContext).text,
  getProject('mentra')?.pageIntro?.ownership,
)

const recruiterContext = createContext('/about')
updatePersonaFromMessage(recruiterContext, 'Would he fit this design engineer role?')
assert.equal(recruiterContext.persona, 'recruiter')
const founderContext = createContext('/')
updatePersonaFromMessage(founderContext, 'Would this work for an early-stage startup?')
assert.equal(founderContext.persona, 'founder')
const studentContext = createContext('/')
updatePersonaFromMessage(studentContext, 'I am a student looking for portfolio advice')
assert.equal(studentContext.persona, 'student')
assert.match(getResponse('I am a design student. What can I learn here?', studentContext).text, /Start with constraints/)
const ndaContext = createContext('/transfi-project')
assert.match(getResponse('Tell me the private NDA details.', ndaContext).text, /public story/)
assert.match(getResponse('Tell me the private NDA details.', ndaContext).text, /approved access/)

console.log('Parth cursor voice contract passed')
