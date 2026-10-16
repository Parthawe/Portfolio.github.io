import assert from 'node:assert/strict'
import { isCompletePanelAnswer } from '../src/services/panelAnswerQuality'
import { isPortfolioQuestion } from '../src/data/portfolioKnowledgeBase'
for (const question of ['Why is he the best?', 'What makes him different?', 'Can you help me?', 'Who are you?']) assert(isPortfolioQuestion(question, {route:'/'}), question)
assert(!isPortfolioQuestion('What is the weather?', {route:'/'}))
assert(!isCompletePanelAnswer('I approach design by focusing on shipping products that bring clarity to complex, often ambiguous systems. I\'m'))
assert(!isCompletePanelAnswer('The implementation connects to'))
assert(!isCompletePanelAnswer('**Mentra is a shipped product.'))
assert(!isCompletePanelAnswer('The work depends on the.'))
assert(isCompletePanelAnswer('**Mentra** connects the glasses OS, companion app and MiniApps.'))
assert(isCompletePanelAnswer('1. A complete point.\n2. Another complete point.'))
assert(isCompletePanelAnswer('Inspect the `input` and compare it with the original.'))
console.log('Homepage question routing and observed incomplete-response regressions passed.')
