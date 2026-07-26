import assert from 'node:assert/strict'
import { getProject, PROJECT_PAGE_INTRO_SLUGS } from '../src/data/projects'

const scopedCopy = PROJECT_PAGE_INTRO_SLUGS
  .map(slug => {
    const intro = getProject(slug)?.pageIntro
    assert.ok(intro, `Missing pageIntro for ${slug}`)
    return [intro.what, intro.ownership, intro.result, ...intro.proofs.flatMap(proof => [proof.label, proof.value])].join(' ')
  })
  .join('\n')

for (const unsupported of [
  /\b88%\b/i,
  /\b200\+\s+plays\b/i,
  /\b100\+\s+audience\b/i,
  /\b17\s+production tools\b/i,
  /\bWCAG certified\b/i,
]) {
  assert.doesNotMatch(scopedCopy, unsupported)
}

const ownershipMustMention: Record<string, RegExp> = {
  'ballah-code': /Isaiah Ballah/i,
  'vj-software': /Akshita Anand/i,
  'raahi-project': /collaboration/i,
  medimorpho: /five-person/i,
  'sea-of-salt': /Audrey Oh/i,
}

for (const [slug, collaborator] of Object.entries(ownershipMustMention)) {
  const ownership = getProject(slug)?.pageIntro?.ownership || ''
  assert.match(ownership, collaborator, `${slug} must preserve collaborator attribution`)
}

assert.equal(getProject('tedx')?.year, '2019')
assert.equal(getProject('vishwaconclave')?.year, '2019–21')
assert.equal(getProject('sculpture')?.year, '2019–22')
assert.equal(getProject('the-point-cdc')?.year, '2025')
assert.equal(getProject('black-hole')?.year, '2025')

console.log('Portfolio copy evidence and attribution contract passed')
