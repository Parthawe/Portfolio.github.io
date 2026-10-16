import { visibleProjects } from '../data/projects'
/** Public, rendered page evidence only. Never read inputs or protected story containers. */
export function getChatSections() {
  const headings = Array.from(document.querySelectorAll<HTMLElement>('main h1, main h2, main h3, footer h2'))
  return headings.filter(el => el.getClientRects().length && !el.closest('[hidden], .nda-gate, .nda-inline-preview, .portfolio-chat-panel') && getComputedStyle(el).visibility !== 'hidden')
    .map(el => {
      const section = el.closest<HTMLElement>('section, article') || el.parentElement || el
      return { title: el.innerText.trim(), text: section.innerText.trim().slice(0, 1800), element: el }
    }).filter(section => section.title).slice(0, 45)
}

export function getChatPageContext() {
  const sections = getChatSections()
  const project = visibleProjects.find(p => `/${p.slug}` === window.location.pathname.replace(/\/$/, ''))
  const restricted = project && (project.nda || (project.access?.mode && project.access.mode !== 'public'))
  return {
    title: document.title,
    sections: restricted ? [] : sections.slice(0, 24).map(({ title, text, element }) => ({ title, text: text.slice(0, 1000), inViewport: element.getBoundingClientRect().top >= 0 && element.getBoundingClientRect().top < window.innerHeight })),
  }
}

export function resolveChatScroll(question: string): { element?: HTMLElement; edge?: 'top' | 'bottom'; label: string } | null {
  const q = question.toLowerCase().trim().replace(/[?.!]+$/, '')
  if (!/^(scroll|show|take|go|jump|next section|previous section|back to top)/.test(q)) return null
  if (/\b(top|beginning)\b/.test(q)) return { edge: 'top', label: 'Top of page' }
  if (/\b(bottom|footer)\b/.test(q)) return { edge: 'bottom', label: 'Bottom of page' }
  const sections = getChatSections()
  if (/\b(next|previous)\b/.test(q)) {
    const section = /previous/.test(q)
      ? sections.filter(s => s.element.getBoundingClientRect().top < 70).slice(-1)[0]
      : sections.find(s => s.element.getBoundingClientRect().top > 140)
    return section ? { element: section.element, label: section.title } : null
  }
  const words = q.replace(/\b(scroll|show|take|go|jump|me|to|the|section|please)\b/g, ' ').trim().split(/\s+/).filter(w => w.length > 2)
  const ranked = sections.map(s => ({ ...s, score: words.filter(w => s.title.toLowerCase().includes(w)).length })).sort((a,b) => b.score-a.score)
  return ranked[0]?.score ? { element: ranked[0].element, label: ranked[0].title } : null
}
