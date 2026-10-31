import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { getProcessCuration, processProjects } from '../src/data/processLibrary'
import { isRequestAccessProject } from '../src/data/projects'
const stages = new Set(['reference', 'material', 'experiment', 'decision', 'outcome'])
let artifacts = 0
for (const { project, curation } of processProjects) {
  assert.equal(curation.slug, project.slug)
  assert(!project.hidden && project.access?.mode !== 'hidden')
  if (isRequestAccessProject(project)) assert.equal(curation.artifacts.length, 0, `${project.slug} must not expose protected material`)
  const ids = new Set<string>()
  for (const a of curation.artifacts) {
    assert(a.id && !ids.has(a.id), `${project.slug}: stable unique artifact IDs`); ids.add(a.id)
    assert(stages.has(a.stage)); assert(a.title && a.caption && a.creator && a.alt)
    assert(a.src.startsWith('/Assets/'), 'Use only existing local public portfolio assets')
    assert(!/private|reviewer|research-screens|figma\.com|api\/assets/i.test(a.src), a.src)
    assert(existsSync(`public${decodeURIComponent(a.src)}`), a.src)
    assert(a.sourceHref.startsWith(`/${project.slug}#`) || a.sourceHref === `/${project.slug}`, a.sourceHref)
    assert(!/taste-index|chatgpt\.site/.test(JSON.stringify(a)), 'Public curation must not depend on private library')
    artifacts++
  }
}
assert.equal(getProcessCuration('not-a-project'), undefined)
assert.equal(getProcessCuration('keyboard'), undefined)
assert(processProjects.find(x => x.project.slug === 'sculpture')?.curation.artifacts.some(a => /failed ideas/i.test(a.title + a.caption)))
assert(getProcessCuration('mentra')?.artifacts.find(a => a.title.includes('Three ways'))?.decision?.limit)
const app = readFileSync('src/App.tsx', 'utf8')
assert(app.includes('path="/process/:slug"') && app.includes('path="/process"'))
const routes = readFileSync('src/data/projectRoutes.ts', 'utf8')
for (const [, slug, module] of routes.matchAll(/slug: '([^']+)', page: \(\) => import\('([^']+)'\)/g)) {
  const source = readFileSync(`src/data/${module}.tsx`, 'utf8')
  assert(/ProjectHeader|PracticeEntry/.test(source), `${slug}: project must expose the shared process entry`)
}
assert(readFileSync('src/components/case-study/ProjectHeader.tsx','utf8').includes('/process/'))
assert(readFileSync('src/components/case-study/PracticeEntry.tsx','utf8').includes('/process/'))
console.log(`Verified ${processProjects.length} public project routes and ${artifacts} curated artifacts; access boundaries and source paths passed.`)
const provenance = JSON.parse(readFileSync('docs/reviews/process-library/public-source-provenance.json', 'utf8')).artifacts as { slug: string; src: string; sourceFile: string; sourceLine: number }[]
for (const { project, curation } of processProjects) for (const artifact of curation.artifacts) {
  const source = provenance.find(row => row.slug === project.slug && row.src === artifact.src)
  assert(source && source.sourceLine > 0 && existsSync(source.sourceFile), `${artifact.id}: recorded public provenance`)
}
assert.equal(provenance.length, artifacts)
