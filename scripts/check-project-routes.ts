import { experienceRegistry } from '../src/data/projectExperiences'
import { routableProjects } from '../src/data/projects'
import { projectRoutes } from '../src/data/projectRoutes'

const registrySlugs = routableProjects.map((project) => project.slug)
const routeSlugs = projectRoutes.map((route) => route.slug)
const duplicates = routeSlugs.filter((slug, index) => routeSlugs.indexOf(slug) !== index)
const missing = registrySlugs.filter((slug) => !routeSlugs.includes(slug))
const extra = routeSlugs.filter((slug) => !registrySlugs.includes(slug))

if (duplicates.length || missing.length || extra.length) {
  console.error('Project route manifest is out of sync.', { duplicates, missing, extra })
  process.exit(1)
}

console.log(`[routes] manifest matches ${registrySlugs.length} routable projects`)

const experienceSlugs = experienceRegistry.map(item => item.slug)
if (experienceSlugs.length !== routeSlugs.length || new Set(experienceSlugs).size !== experienceSlugs.length || routeSlugs.some(slug => !experienceSlugs.includes(slug))) throw new Error('Experience registry must cover all projects exactly once')
if (experienceRegistry.some(item => !item.evidence || !item.label)) throw new Error('Every experience needs evidence and a visitor task')
const implementedPublicExperiences = new Set(['/shuffle/simulation', '/typeface/workshop'])
if (experienceRegistry.some(item => item.status === 'approved' && !implementedPublicExperiences.has(item.href))) throw new Error('Approval requires an implemented public renderer, not a redirect to the same experience URL')
console.log(`[experiences] audited ${experienceSlugs.length} projects; ${experienceRegistry.filter(item => item.status === 'approved').length} approved`)
