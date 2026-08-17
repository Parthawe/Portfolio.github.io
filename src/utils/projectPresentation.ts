const PROJECT_ACRONYMS = new Set([
  'AI', 'API', 'AR', 'CSS', 'GDP', 'HTML', 'IBM', 'ML', 'NDA', 'NLP',
  'NYU', 'OS', 'QR', 'SDK', 'UI', 'UI/UX', 'UMLS-BERT', 'URL', 'UX', 'VR',
])

export function projectTitleLengthClass(value: string) {
  const words = value.trim().split(/\s+/).length
  if (value.length > 96 || words > 15) return 'long'
  if (value.length > 58 || words > 9) return 'medium'
  return 'short'
}

export function sentenceCaseProjectLabel(value: string) {
  const trimmed = value.trim()
  if (!trimmed) return value

  const letters = trimmed.replace(/[^A-Za-z]/g, '')
  const isAllCaps = letters.length > 1 && letters === letters.toUpperCase()
  if (!isAllCaps) return trimmed

  let hasStarted = false
  return trimmed.split(/(\s+|\/|–|—)/).map((part) => {
    if (!/[A-Za-z]/.test(part)) return part
    if (PROJECT_ACRONYMS.has(part.toUpperCase())) return part.toUpperCase()

    const lower = part.toLowerCase()
    if (!hasStarted) {
      hasStarted = true
      return lower.charAt(0).toUpperCase() + lower.slice(1)
    }
    return lower
  }).join('')
}

interface ProjectTimelineSource {
  summaryTimeline?: string
  timelineMilestones?: { period: string; label: string }[]
  storyline?: {
    challenge: string
    approach: string
    result: string
  }
}

const TIMELINE_COPY_LIMIT = 82

function compactTimelineCopy(value: string) {
  const normalized = value.trim().replace(/\s+/g, ' ')
  if (normalized.length <= TIMELINE_COPY_LIMIT) return normalized

  const sentence = normalized.split(/(?<=[.!?])\s+/)[0]
  if (sentence.length <= TIMELINE_COPY_LIMIT) return sentence

  const clause = normalized.split(/[,;:]/)[0]
  if (clause.length >= 34 && clause.length <= TIMELINE_COPY_LIMIT) return clause

  const words = normalized.split(' ')
  let compact = ''
  for (const word of words) {
    const candidate = compact ? `${compact} ${word}` : word
    if (candidate.length > TIMELINE_COPY_LIMIT - 1) break
    compact = candidate
  }

  return `${compact.replace(/[.,;:]$/, '')}…`
}

/**
 * Keeps authored chronology when a project has it. Other projects receive a
 * compact process timeline built only from story copy already in the registry,
 * so the shared overview never invents dates or project claims.
 */
export function projectTimelineMilestones(project?: ProjectTimelineSource) {
  if (!project) return []
  if (project.timelineMilestones?.length) return project.timelineMilestones
  if (!project.storyline) return []

  return [
    {
      period: project.summaryTimeline || 'Context',
      label: compactTimelineCopy(project.storyline.challenge),
    },
    {
      period: 'Design',
      label: compactTimelineCopy(project.storyline.approach),
    },
    {
      period: 'Outcome',
      label: compactTimelineCopy(project.storyline.result),
    },
  ]
}
