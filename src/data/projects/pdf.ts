import type { ProjectMeta } from '@/types/project'

export const pdf: ProjectMeta = {
  slug: 'pdf',
  title: 'PDF Portfolio',
  subtitle: 'PDF project',
  description: 'PDF project',
  ogImage: '',
  heroImage: '/Assets/images/mentra.png',
  projectColor: '#2F2F2F',
  tags: [],
  infoItems: [],
  backLink: { label: '\u2190 Work', href: '/work' },
  categories: [],
  sections: [
    {
      type: 'callout',
      text: 'This page hosts an interactive flipbook of the PDF portfolio. The flipbook viewer loads Assets/Imagepdfportfolio.pdf with a page-turn duration of 700 ms against a #2F2F2F background.',
    },
    {
      type: 'image',
      src: '/Assets/Imagepdfportfolio.pdf',
      alt: 'PDF Portfolio Flipbook',
    },
  ],
}
