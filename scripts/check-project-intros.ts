import assert from 'node:assert/strict'
import {
  NDA_PROJECT_SLUGS,
  PROJECT_PAGE_INTROS,
  PROJECT_PAGE_INTRO_SLUGS,
  projects,
  visibleProjects,
  type ProjectEvidenceKind,
} from '../src/data/projects'

const evidenceKinds = new Set<ProjectEvidenceKind>([
  'measured',
  'observed',
  'shipped',
  'artifact',
  'target',
  'scope',
])

const expectedSlugs = [...visibleProjects.map(project => project.slug), 'healthapp'].sort()
const introSlugs = [...PROJECT_PAGE_INTRO_SLUGS].sort()

assert.equal(PROJECT_PAGE_INTRO_SLUGS.length, 33, 'The recruiter-facing intro contract must contain 33 projects')
assert.deepEqual(introSlugs, expectedSlugs, 'Intro slugs must be exactly the 32 Work projects plus Health App')
assert.deepEqual(
  Object.keys(PROJECT_PAGE_INTROS).sort(),
  introSlugs,
  'PROJECT_PAGE_INTROS must have exactly one entry for every scoped slug',
)

for (const slug of PROJECT_PAGE_INTRO_SLUGS) {
  const project = projects.find(candidate => candidate.slug === slug)
  assert.ok(project, `Missing project registry entry: ${slug}`)
  assert.ok(project.pageIntro, `Missing pageIntro: ${slug}`)

  const intro = project.pageIntro
  const wordCount = [intro.what, intro.ownership, intro.result]
    .join(' ')
    .split(/\s+/)
    .filter(Boolean).length

  assert.ok(wordCount >= 25 && wordCount <= 55, `${slug} intro has ${wordCount} words; expected 25–55`)
  assert.equal(intro.proofs.length, 2, `${slug} must have exactly two proofs`)

  for (const proof of intro.proofs) {
    assert.ok(proof.label.trim(), `${slug} has a proof without a label`)
    assert.ok(proof.value.trim(), `${slug} has a proof without a value`)
    assert.ok(evidenceKinds.has(proof.kind), `${slug} has an invalid evidence kind: ${proof.kind}`)
  }
}

const scopedSlugs = new Set<string>(PROJECT_PAGE_INTRO_SLUGS)
assert.equal(
  projects.filter(project => project.pageIntro && !scopedSlugs.has(project.slug)).length,
  0,
  'Non-scoped projects must not receive recruiter-facing intros',
)

for (const slug of NDA_PROJECT_SLUGS) {
  const intro = PROJECT_PAGE_INTROS[slug]
  assert.ok(
    intro.proofs.every(proof => proof.kind !== 'measured' && proof.kind !== 'observed'),
    `${slug} must use public-safe scope or artifact proof only`,
  )
}

console.log(`✓ ${PROJECT_PAGE_INTRO_SLUGS.length} project intros satisfy the content contract`)
