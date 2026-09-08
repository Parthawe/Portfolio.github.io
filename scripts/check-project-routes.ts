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
