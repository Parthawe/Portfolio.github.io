import assert from 'node:assert/strict'
import { getRouteMeta } from '../src/components/RouteSeo'
import { getProjectNarrative, createContext, getResponse } from '../src/data/agentKnowledge'
import { getProject, visibleProjects } from '../src/data/projects'
import { normalizePathname, toCanonicalPathname } from '../src/utils/normalizePathname'

assert.equal(normalizePathname('/mentra/?view=quick#proof'), 'mentra')
assert.equal(normalizePathname('///mentra///'), 'mentra')
assert.equal(toCanonicalPathname('/mentra/'), '/mentra')
assert.equal(toCanonicalPathname('/'), '/')

for (const route of ['mentra', 'healthapp']) {
  const bare = getRouteMeta(`/${route}`)
  const slash = getRouteMeta(`/${route}/`)
  const decorated = getRouteMeta(`/${route}/?view=quick#proof`)

  assert.equal(slash.title, bare.title)
  assert.equal(slash.url, bare.url)
  assert.equal(slash.robots, 'index, follow')
  assert.equal(decorated.url, bare.url)
  assert.equal(decorated.robots, 'index, follow')
}

const healthApp = getProject('healthapp')
assert.ok(healthApp, 'Health App must exist in the project registry')
const recruiterProjects = [...visibleProjects, healthApp]
assert.equal(recruiterProjects.length, 33)

for (const project of recruiterProjects) {
  assert.ok(project.pageIntro, `${project.slug} must define pageIntro`)

  const ownership = getResponse('What did you own?', createContext(`/${project.slug}/`)).text
  assert.equal(ownership, project.pageIntro.ownership, `${project.slug} ownership must use pageIntro`)

  const outcome = getResponse('What changed?', createContext(`/${project.slug}/`)).text
  assert.ok(outcome.startsWith(project.pageIntro.result), `${project.slug} result must use pageIntro`)
  for (const proof of project.pageIntro.proofs) {
    assert.ok(outcome.includes(`${proof.label}: ${proof.value}`), `${project.slug} result must include ${proof.label}`)
    if (proof.kind === 'target') {
      assert.ok(outcome.includes(`Target — ${proof.label}`), `${project.slug} target must be labelled`)
    }
  }

  const narrative = getProjectNarrative(`/${project.slug}/?from=test`)
  assert.deepEqual(narrative?.pageIntro, project.pageIntro)
}

console.log('Route and canonical project-agent contracts passed')
