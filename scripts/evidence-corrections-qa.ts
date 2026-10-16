import assert from 'node:assert/strict'
import { readFileSync, readdirSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { routableProjects } from '../src/data/projects'
import { experienceRegistry } from '../src/data/projectExperiences'
import { projectRecords } from '../src/data/projectRecords'
import { practiceEntries } from '../src/data/practiceEntries'

const read = (file: string) => readFileSync(file, 'utf8')
const baseline = process.env.QA_BASE_REV || 'HEAD'
const previous = (file: string) => execFileSync('git', ['show', `${baseline}:${file}`], { encoding: 'utf8' })
assert.equal(routableProjects.length, 50)
assert(routableProjects.every(project => projectRecords[project.slug]), 'all 50 projects have an evidence record')
const oldRegistry = previous('src/data/projectExperiences.ts')
for (const item of experienceRegistry) {
  const old = oldRegistry.split('\n').find(line => line.includes(`"slug": "${item.slug}"`))!
  assert(old.includes(`"status": "${item.status}"`), `${item.slug}: approval unchanged`)
}
// The approved project, its metadata and rendering sources must remain byte-identical.
for (const file of ['src/pages/projects/ShufflePage.tsx', 'src/components/ShuffleInteractive.tsx', 'src/components/shuffle/ShuffleScene.tsx']) {
  assert.equal(read(file), previous(file), `${file}: untouched`)
}
function projectBlock(source: string, slug: string) {
  const start = source.indexOf(`    slug: '${slug}'`)
  const end = source.indexOf('\n    slug:', start + 10)
  return source.slice(start, end < 0 ? undefined : end)
}
assert.equal(projectBlock(read('src/data/projects.ts'), 'shuffle'), projectBlock(previous('src/data/projects.ts'), 'shuffle'))
const directory = 'public/Assets/Projects/Typeface/butlers-slice'
for (const name of readdirSync(directory).filter(name => name.endsWith('.otf'))) {
  const font = readFileSync(`${directory}/${name}`), tables = new Map<string, number>()
  for (let index = 0; index < font.readUInt16BE(4); index++) {
    const at = 12 + index * 16
    tables.set(font.toString('ascii', at, at + 4), font.readUInt32BE(at + 8))
  }
  assert.equal(font.readUInt16BE(tables.get('maxp')! + 4), 338, `${name}: glyph count`)
  assert(!tables.has('fvar'), `${name}: static font`)
}
assert(!projectRecords['clawed-chat'].evidence.includes('six'))
assert(projectRecords.glassly)
for (const slug of Object.keys(practiceEntries)) assert.equal(projectRecords[slug].kind, 'Practice entry')
console.log('50 evidence records; 50 approval states preserved; Shuffle source and metadata identical; supplied fonts verified; 9 practice entries.')
