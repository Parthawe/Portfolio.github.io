export interface ProjectMeta {
  slug: string
  title: string
  subtitle: string
  description: string
  ogImage: string
  heroImage: string
  projectColor: string
  tags: string[]
  infoItems: { label: string; value: string }[]
  backLink: { label: string; href: string }
  nextProject?: { slug: string; title: string; image: string }
  bottomNavSections?: { id: string; label: string }[]
  sections: ProjectSection[]
  credits?: { role: string; name: string }[]
  categories: string[]
}

export type ProjectSection =
  | OverviewSection
  | TextSection
  | FeaturesSection
  | StatsSection
  | TimelineSection
  | StepsSection
  | InfoGridSection
  | ImageSection
  | ImagePairSection
  | ImageGridSection
  | PullQuoteSection
  | CalloutSection
  | NumberedListSection
  | CreditsSection
  | ThankYouSection

export interface OverviewSection {
  type: 'overview'
  id?: string
  columns: { heading: string; body: string }[]
}

export interface TextSection {
  type: 'text'
  id?: string
  label?: string
  title: string
  body: string[]
}

export interface FeaturesSection {
  type: 'features'
  id?: string
  label?: string
  title: string
  body?: string[]
  cards: { title: string; description: string }[]
}

export interface StatsSection {
  type: 'stats'
  id?: string
  label?: string
  title: string
  body?: string[]
  stats: { label: string; value: string }[]
}

export interface TimelineSection {
  type: 'timeline'
  id?: string
  label?: string
  title: string
  body?: string[]
  items: { date: string; heading: string; description: string }[]
}

export interface StepsSection {
  type: 'steps'
  id?: string
  label?: string
  title: string
  body?: string[]
  steps: { num: number; title: string; description: string }[]
}

export interface InfoGridSection {
  type: 'info-grid'
  id?: string
  items: { key: string; value: string }[]
}

export interface ImageSection {
  type: 'image'
  id?: string
  src: string
  alt: string
}

export interface ImagePairSection {
  type: 'image-pair'
  id?: string
  images: { src: string; alt: string }[]
}

export interface ImageGridSection {
  type: 'image-grid'
  id?: string
  images: { src: string; alt: string }[]
  columns?: 2 | 3 | 4
}

export interface PullQuoteSection {
  type: 'pullquote'
  quote: string
  cite?: string
}

export interface CalloutSection {
  type: 'callout'
  text: string
}

export interface NumberedListSection {
  type: 'numbered-list'
  id?: string
  label?: string
  title: string
  items: string[]
}

export interface CreditsSection {
  type: 'credits'
  id?: string
  credits: { role: string; name: string }[]
}

export interface ThankYouSection {
  type: 'thank-you'
  title?: string
  body?: string
}
