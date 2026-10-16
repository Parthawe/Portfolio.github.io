import { readFileSync } from 'node:fs'
export function readExperienceRegistry() {
  const source = readFileSync(new URL('../src/data/projectExperiences.ts', import.meta.url), 'utf8')
  const match = source.match(/export const experienceRegistry: ProjectExperience\[\] = (\[[\s\S]+\])/)
  if (!match) throw new Error('Explicit experience registry not found')
  const entries = JSON.parse(match[1].replace(/,\s*\]$/, ']'))
  const routes = [...readFileSync(new URL('../src/data/projectRoutes.ts', import.meta.url), 'utf8').matchAll(/slug: '([^']+)'/g)].map(match => match[1])
  if (entries.length !== routes.length || new Set(entries.map(item => item.slug)).size !== entries.length || routes.some(slug => !entries.some(item => item.slug === slug))) throw new Error('Experience registry must cover every project exactly once')
  return entries
}
