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
export const projectExperience = (slug: string) => experienceRegistry.find(item => item.slug === slug)
export const approvedExperiences = () => experienceRegistry.filter(item => item.status === 'approved')
export function experienceHref(slug: string) {
  const item = projectExperience(slug)
  return item?.status === 'approved' ? item.href : `/${slug}`
}
export function experienceLabel(slug: string) {
  return projectExperience(slug)?.label ?? 'Read the case study'
}
export const mentraOnboardingPrototype = 'https://www.figma.com/proto/UqMHlp3DWI2erzruqcCZNd/Mentra-All-in-One--Copy-?node-id=63254-44046&viewport=-612%2C-601%2C0.23&t=McNEtHe1mXIBKbD1-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=63254%3A44046&show-proto-sidebar=1&page-id=63254%3A33903'

export type ExperienceFormat = 'physical' | 'prototype' | 'tool' | 'experiment' | 'media' | 'case-study'
export type ExperienceStatus = 'approved' | 'draft' | 'queued' | 'reference'
export type ProjectExperience = { slug: string; format: ExperienceFormat; status: ExperienceStatus; href: string; label: string; evidence: string }
// Explicit curation: adding a project never automatically creates an experience.
export const experienceRegistry: ProjectExperience[] = [
  {"slug": "mentra", "format": "prototype", "status": "draft", "href": "/mentra/prototype", "label": "Complete glasses onboarding", "evidence": "Original Figma onboarding and recording; browser embedding requires usability review"},
  {"slug": "mentra-miniapps", "format": "prototype", "status": "draft", "href": "/mentra-miniapps/prototype", "label": "Discover and launch a glasses app", "evidence": "Documented discovery and permissions; existing browser adaptation uses sample data"},
  {"slug": "transfi-project", "format": "case-study", "status": "reference", "href": "/transfi-project", "label": "Read public preview and request access", "evidence": "NDA preview and existing access gate; no private workflow in a standalone prototype"},
  {"slug": "zentipay", "format": "case-study", "status": "reference", "href": "/zentipay", "label": "Read public preview and request access", "evidence": "NDA preview and reviewer gate; protected transfer screens remain behind access"},
  {"slug": "clawed-chat", "format": "prototype", "status": "draft", "href": "/clawed-chat/prototype", "label": "Approve an assistant action and inspect its receipt", "evidence": "Documented action safety and receipts; existing prototype uses sample data"},
  {"slug": "executivelens", "format": "prototype", "status": "draft", "href": "/executivelens/prototype", "label": "Inspect a meeting summary citation", "evidence": "Existing MeetingTimeline and prepared transcript; preserve embedded demonstration"},
  {"slug": "org-dashboard", "format": "prototype", "status": "draft", "href": "/org-dashboard/prototype", "label": "Review organizational context and approve an action", "evidence": "Case-study context and knowledge workflow; existing adaptation requires task review"},
  {"slug": "cuetv", "format": "case-study", "status": "reference", "href": "/cuetv", "label": "Read the safe discovery and playback story", "evidence": "NDA public preview; retain existing access gate"},
  {"slug": "healthapp", "format": "prototype", "status": "draft", "href": "/healthapp/prototype", "label": "Rebalance tasks around daily capacity", "evidence": "Documented sleep, food and planning concept; sample-data adaptation requires review"},
  {"slug": "medimorpho", "format": "case-study", "status": "reference", "href": "/medimorpho", "label": "Read the public healthcare research", "evidence": "Protected research story and 20-interview context; no invented patient simulation"},
  {"slug": "ibm", "format": "case-study", "status": "reference", "href": "/ibm", "label": "Read the encrypted-computation research", "evidence": "Research glimpse; no released runnable encryption implementation"},
  {"slug": "ballah-code", "format": "prototype", "status": "draft", "href": "/ballah-code/prototype", "label": "Review a proposed component change", "evidence": "Documented IDE workflow; existing prototype is a browser adaptation"},
  {"slug": "ai-voice", "format": "case-study", "status": "reference", "href": "/ai-voice", "label": "Read the public voice-selection story", "evidence": "NDA preview and existing access gate; no synthetic substitute for protected voice samples"},
  {"slug": "raahi-project", "format": "prototype", "status": "draft", "href": "/raahi-project/prototype", "label": "Plan a journey across transit touchpoints", "evidence": "Research and mobile/kiosk/in-vehicle evidence; current journey uses sample data"},
  {"slug": "the-point-cdc", "format": "case-study", "status": "reference", "href": "/the-point-cdc", "label": "Explore the documented community website", "evidence": "Original website link and case study; no standalone room needed"},
  {"slug": "office-of-diversity", "format": "case-study", "status": "reference", "href": "/office-of-diversity", "label": "Read the report design story", "evidence": "Public report evidence; no room or invented report content"},
  {"slug": "jugalbandi", "format": "physical", "status": "draft", "href": "/jugalbandi/world", "label": "Operate instruments and observe acoustic mechanisms", "evidence": "Installation photographs and film; current synthetic sound and model need fidelity review"},
  {"slug": "vj-software", "format": "prototype", "status": "draft", "href": "/vj-software/prototype", "label": "Select a parking space and review a booking", "evidence": "Parking research and UI evidence; existing prototype uses sample data"},
  {"slug": "enigma", "format": "physical", "status": "draft", "href": "/enigma/world", "label": "Type a letter and inspect the light network", "evidence": "200-neuron sculpture photographs, film and original EnigmaInteractive; handwritten matcher is unapproved"},
  {"slug": "shuffle", "format": "physical", "status": "approved", "href": "/shuffle/simulation", "label": "Rebalance student-life priorities", "evidence": "User-approved motorized-fader reconstruction and existing ShuffleInteractive"},
  {"slug": "making-of-time", "format": "experiment", "status": "reference", "href": "/making-of-time", "label": "Compare shadow, mechanism and software time", "evidence": "Original film and embedded ClockTrio; preserve the experiment rather than a photograph on a bench"},
  {"slug": "sea-of-salt", "format": "physical", "status": "draft", "href": "/sea-of-salt/world", "label": "Turn the mill to advance the salt story", "evidence": "Original mill photographs, story and embedded SaltSimulation; direct rotation requires review"},
  {"slug": "flow-fields", "format": "experiment", "status": "reference", "href": "/flow-fields", "label": "Tune the original generative flow field", "evidence": "Existing GenerativeCanvas with Perlin-noise particle behavior; retain embedded experiment"},
  {"slug": "embodied-web", "format": "case-study", "status": "reference", "href": "/embodied-web", "label": "Read body-input experiment evidence", "evidence": "StudyExplorer and related project evidence; no released standalone pose-controlled experience verified"},
  {"slug": "feeling-patterns", "format": "case-study", "status": "reference", "href": "/feeling-patterns", "label": "Read tactile-interface research", "evidence": "Textile study and related evidence; no verified haptic hardware simulation"},
  {"slug": "performance-by-design", "format": "case-study", "status": "reference", "href": "/performance-by-design", "label": "Read live-performance design studies", "evidence": "StudyExplorer and related evidence; avoid invented cue or audience behavior"},
  {"slug": "on-becoming", "format": "case-study", "status": "reference", "href": "/on-becoming", "label": "Read the practice essay", "evidence": "Reflective writing and related work; no standalone simulation warranted"},
  {"slug": "storytelling", "format": "case-study", "status": "reference", "href": "/storytelling", "label": "Read narrative structure studies", "evidence": "StudyExplorer and related evidence; no separate runnable narrative verified"},
  {"slug": "dna-speculative", "format": "case-study", "status": "reference", "href": "/dna-speculative", "label": "Examine the speculative artifact", "evidence": "Public speculative-design glimpse; no unsupported biology model"},
  {"slug": "comp-media", "format": "experiment", "status": "reference", "href": "/comp-media", "label": "Paint with camera pixels", "evidence": "Existing PixelPainting restoration and original p5.js source; retain embedded experiment"},
  {"slug": "hypercinema", "format": "case-study", "status": "reference", "href": "/hypercinema", "label": "Read immersive media studies", "evidence": "StudyExplorer and related evidence; no verified navigable 360 asset in the standalone room"},
  {"slug": "applications", "format": "case-study", "status": "reference", "href": "/applications", "label": "Read application development studies", "evidence": "StudyExplorer evidence; no project-specific standalone implementation verified"},
  {"slug": "messy-humans", "format": "case-study", "status": "reference", "href": "/messy-humans", "label": "Read inclusive design research", "evidence": "Research and StudyExplorer; no invented personas or task outcomes"},
  {"slug": "production-studio", "format": "case-study", "status": "reference", "href": "/production-studio", "label": "Read collaborative installation production", "evidence": "Production evidence and StudyExplorer; generic room does not demonstrate production work"},
  {"slug": "arcade-lab", "format": "case-study", "status": "reference", "href": "/arcade-lab", "label": "Read controller and party-game studies", "evidence": "Related evidence and Omakase project; no separate arcade-lab game verified"},
  {"slug": "black-hole", "format": "physical", "status": "draft", "href": "/black-hole/world", "label": "Operate each documented physical study", "evidence": "Exhibit photographs and mechanisms; alignment and separate study behavior require review"},
  {"slug": "uv-light", "format": "case-study", "status": "reference", "href": "/uv-light/world", "label": "Reveal documented blacklight marks", "evidence": "Original installation photographs; retain the case study without a photographic room"},
  {"slug": "the-omakase", "format": "experiment", "status": "reference", "href": "/the-omakase", "label": "Play the original two-player sushi game", "evidence": "Original itch.io playable and cabinet film; keep embedded game and document controller differences"},
  {"slug": "revolving-stage", "format": "physical", "status": "draft", "href": "/revolving-stage/world", "label": "Rotate scenes and inspect the supporting mechanism", "evidence": "Stage drawings, photographs and embedded StageRotation; geometry requires fidelity review"},
  {"slug": "moniac-machine", "format": "experiment", "status": "draft", "href": "/moniac-machine", "label": "Operate the original economic strategy experiment", "evidence": "Original MoniacSimulator and cabinet film; remove invented valve mappings in a replacement"},
  {"slug": "dumb-waiter-set-design", "format": "case-study", "status": "reference", "href": "/dumb-waiter-set-design", "label": "Examine the original scenic model", "evidence": "Scenic-model photographs; no measured interactive reconstruction verified"},
  {"slug": "drowning", "format": "experiment", "status": "reference", "href": "/drowning", "label": "Explore lighting on the documented scenic design", "evidence": "Original film and embedded LightingSlider; preserve original demonstration"},
  {"slug": "sculpture", "format": "case-study", "status": "reference", "href": "/sculpture", "label": "Study original figurative sculpture photographs", "evidence": "Photographic evidence only; no scan or faithful reconstructed geometry"},
  {"slug": "mentra-brand", "format": "case-study", "status": "reference", "href": "/mentra-brand", "label": "Examine identity, packaging and campaign work", "evidence": "Brand assets and renders; no documented editable identity rules verified"},
  {"slug": "tedx", "format": "case-study", "status": "reference", "href": "/tedx", "label": "Examine the fabricated parallax stage", "evidence": "Original stage design and build evidence; defer 3D until dimensions and interaction are supported"},
  {"slug": "code-for-build", "format": "prototype", "status": "draft", "href": "/code-for-build/prototype", "label": "Arrange blocks and inspect corresponding code", "evidence": "Documented educational concept; existing browser adaptation needs learning-task review"},
  {"slug": "typeface", "format": "tool", "status": "draft", "href": "/typeface/workshop", "label": "Type, inspect, reshape and export real glyphs", "evidence": "Supplied OTF/WOFF2 files and Glyphs sources; new SVG workshop awaiting user review"},
  {"slug": "atps", "format": "media", "status": "draft", "href": "/atps", "label": "Find and listen to verified conversations", "evidence": "Apple Podcasts show 1524982835 and Anchor RSS located; 45 episode enclosures verified with HTTP 206; native listening archive awaiting review"},
  {"slug": "vishwaconclave", "format": "case-study", "status": "reference", "href": "/vishwaconclave", "label": "Explore event identity across editions", "evidence": "Flattened campaign boards and motion-2021 films; editable identity components and rules not recovered"},
  {"slug": "glassly", "format": "case-study", "status": "reference", "href": "/glassly", "label": "Explore the wearable platform website and original miniapp demo", "evidence": "Original Glassly site source, synchronized phone/glasses HeroDemo and September 2026 brand guidelines; embedded demonstration uses labelled illustrative content"},
]
