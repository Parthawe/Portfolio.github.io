import { digitalExperience } from '../../data/projectExperiences'
import { projects } from '../../data/projects'
import { projectRoutes } from '../../data/projectRoutes'

const objectWorlds = {
  enigma: { title: 'Enigma', setting: 'Light sculpture on an open floor', note: 'Photo-informed sculpture on an open floor. The 200 lights use illustrative activations, not the original trained model.', controls: ['Letter'], initial: [0] },
  jugalbandi: { title: 'Jugalbandi', setting: 'Hexa-18 and the acoustic machines', note: 'Photo-informed Hexa-18, mechanized harp, automated flute and rainsticks. Sound is synthesized in the browser, not recorded from the installation.', controls: ['Pluck', 'Breath', 'Rainstick tilt'], initial: [30, 30, 30] },
  'sea-of-salt': { title: 'Why the Sea is Salt', setting: 'Turn the story mill by hand', note: 'Photo-informed mill and accumulating salt in an imagined room. Grain motion is illustrative.', controls: ['Story progress'], initial: [0] },
  'revolving-stage': { title: 'Revolving Stage', setting: 'A scene change inside a theatre', note: 'A spatial interpretation of the platform and scene walls from the construction drawings. This does not simulate structural loads.', controls: ['Stage rotation', 'Show mechanism'], initial: [0, 0] },
  'moniac-machine': { title: 'Moniac Machine', setting: 'Plywood cabinet with a tilted tablet and valves', note: 'Photo-informed plywood cabinet and valve controls. The screen illustrates the settings; the original rule-based game is available on the case-study page.', controls: ['Tax', 'Spending', 'Interest', 'Investment', 'Consumption', 'Imports', 'Exports'], initial: [30, 45, 25, 50, 55, 30, 40] },
  'black-hole': { title: 'Black Hole', setting: 'Three physical studies in a museum', note: 'Photo-informed time-trap exhibit with spatial studies of fabric and binary motion. These are explanatory models, not numerical relativity simulations.', controls: ['Exhibit', 'Distance / separation'], initial: [0, 65] },
  'uv-light': { title: 'UV Light', setting: 'A room revealed by blacklight', note: 'An imagined room using the original installation photographs. UV reveals the documented marks; this experience does not access your camera.', controls: ['UV intensity'], initial: [0] },
  sculpture: { title: 'Sculpture', setting: 'A photographic study in a gallery', note: 'Original photographs displayed in a 3D gallery. The figure is photographic, not a reconstructed 3D scan.', controls: ['Study'], initial: [0] },
} as const
export type WorldSpec = { title: string; setting: string; note: string; controls: readonly string[]; initial: readonly number[]; kind?: 'screen' | 'gallery' | 'cabinet' | 'watch' | 'set'; image?: string; category?: string }
export type WorldKey = string
export const worlds: Record<WorldKey, WorldSpec> = { ...objectWorlds }
for (const route of projectRoutes) {
  if (route.slug === 'shuffle' || worlds[route.slug] || digitalExperience(route.slug)) continue
  const project = projects.find(item => item.slug === route.slug)
  if (!project || project.access?.mode === 'hidden') continue
  const restricted = project.nda || project.access?.mode === 'request'
  const image = restricted ? project.access?.publicPreviewImage || project.cardMockup || project.image : project.summaryImage || project.cardMockupSource || project.image
  const kind = route.slug === 'the-omakase' ? 'cabinet' : route.slug === 'making-of-time' ? 'watch' : ['drowning','dumb-waiter-set-design'].includes(route.slug) ? 'set' : ['ux','ai','good'].includes(project.category) ? 'screen' : 'gallery'
  worlds[route.slug] = {
    title: project.name, image, kind, category: project.category,
    setting: kind === 'cabinet' ? 'The arcade cabinet in a play room' : kind === 'watch' ? 'Timekeeping studies on a watchmaker’s bench' : kind === 'set' ? 'A scenic study inside a theatre' : kind === 'screen' ? 'Public project artwork in a working studio' : 'Project artwork in an exhibition room',
    note: restricted ? 'An imagined studio displaying the approved public preview. Open the case study for its existing access options.' : kind === 'screen' || kind === 'gallery' ? 'An imagined room displaying public project artwork. The display is an exhibit; open the case study for working demos and documentation.' : 'A spatial interpretation alongside the original project photograph. Dimensions and motion are illustrative; the case study documents the actual build.',
    controls: kind === 'watch' ? ['Hour'] : ['Light level'], initial: kind === 'watch' ? [25] : [70],
  }
}
