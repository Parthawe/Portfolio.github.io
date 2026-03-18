export interface CategoryPage {
  slug: string
  title: string
  titleBreak: string
  titleAccent: string
  accentColor: string
  description: string
  ogImage: string
  stats: string[]
  tools: string[]
  featured?: {
    slug: string
    title: string
    description: string
    role: string
    image: string
    bgColor: string
  }
  projects: {
    slug: string
    title: string
    result: string
    role: string
    image: string
  }[]
  approach: {
    num: string
    title: string
    description: string
  }[]
  cta: {
    headline: string
    subtitle: string
  }
}
