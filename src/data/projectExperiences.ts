export type DigitalExperience = { slug: string; mode: 'prototype' | 'access' | 'reference' | 'live'; description: string; href?: string }
export const digitalExperiences: DigitalExperience[] = [
  { slug: 'mentra', mode: 'prototype', description: 'Original Figma onboarding prototype' },
  { slug: 'mentra-miniapps', mode: 'prototype', description: 'Discover an app, inspect permissions, and launch it' },
  { slug: 'clawed-chat', mode: 'prototype', description: 'Edit a draft, approve it, and inspect its receipt' },
  { slug: 'executivelens', mode: 'prototype', description: 'Meeting replay with inspectable summary citations' },
  { slug: 'org-dashboard', mode: 'prototype', description: 'Browse knowledge and review an agent action' },
  { slug: 'healthapp', mode: 'prototype', description: 'Adjust daily capacity and review a lighter plan' },
  { slug: 'ballah-code', mode: 'prototype', description: 'Edit a component and review a proposed change' },
  { slug: 'vj-software', mode: 'prototype', description: 'Choose a parking space and review the booking' },
  { slug: 'code-for-build', mode: 'prototype', description: 'Build a page with blocks and inspect its code' },
  { slug: 'raahi-project', mode: 'prototype', description: 'Plan a sample journey and follow its legs' },
  { slug: 'transfi-project', mode: 'access', description: 'Public preview and reviewer access', href: '/transfi-project#case-study-access-transfi-project' },
  { slug: 'zentipay', mode: 'access', description: 'Public preview and reviewer access', href: '/zentipay#case-study-access-zentipay' },
  { slug: 'cuetv', mode: 'access', description: 'Public preview and reviewer access', href: '/cuetv#case-study-access-cuetv' },
  { slug: 'ai-voice', mode: 'access', description: 'Public preview and reviewer access', href: '/ai-voice#case-study-access-ai-voice' },
  { slug: 'medimorpho', mode: 'reference', description: 'Healthcare research and service concept', href: '/medimorpho' },
  { slug: 'ibm', mode: 'reference', description: 'Encrypted-computation research', href: '/ibm' },
  { slug: 'office-of-diversity', mode: 'reference', description: 'Original interactive-report design', href: '/office-of-diversity#cs-report' },
  { slug: 'the-point-cdc', mode: 'live', description: 'Explore the community website', href: '/the-point-cdc' },
]
export const digitalExperience = (slug: string) => digitalExperiences.find(item => item.slug === slug)
export const digitalHref = (item: DigitalExperience) => item.href ?? `/${item.slug}/prototype`
export function experienceHref(slug: string) {
  const digital = digitalExperience(slug)
  return digital ? digitalHref(digital) : slug === 'shuffle' ? '/shuffle/simulation' : `/${slug}/world`
}
export function experienceLabel(slug: string) {
  const digital = digitalExperience(slug)
  return !digital ? 'Explore this project in a room' : digital.mode === 'prototype' ? 'Try the prototype' : digital.mode === 'access' ? 'Open preview and reviewer access' : digital.mode === 'live' ? 'Explore the website' : 'Explore the documented work'
}
export const mentraOnboardingPrototype = 'https://www.figma.com/proto/UqMHlp3DWI2erzruqcCZNd/Mentra-All-in-One--Copy-?node-id=63254-44046&viewport=-612%2C-601%2C0.23&t=McNEtHe1mXIBKbD1-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=63254%3A44046&show-proto-sidebar=1&page-id=63254%3A33903'
