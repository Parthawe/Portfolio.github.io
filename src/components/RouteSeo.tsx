import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'
import { categories } from '../data/categories'
import { projects } from '../data/projects'

const SITE_NAME = 'Parth Pawar'
const SITE_URL = 'https://parthpawar.com'
const DEFAULT_IMAGE = '/Assets/images/mentra.webp'
const NOINDEX_ROUTES = new Set(['/studio', '/graveyard', '/book'])

interface RouteMeta {
  title: string
  description: string
  image: string
  url: string
  type: 'website' | 'article'
  robots: string
  schema?: Record<string, unknown>
}

function toAbsoluteUrl(path: string) {
  if (path.startsWith('http')) return path
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}

function parseYear(year?: string) {
  const match = year?.match(/\d{4}/)
  return match?.[0]
}

function getHomeSchema() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        name: SITE_NAME,
        url: SITE_URL,
        description: 'Portfolio of Parth Pawar, Design Engineer focused on AI wearables, fintech, and creative technology.',
      },
      {
        '@type': 'Person',
        name: 'Parth Pawar',
        url: SITE_URL,
        jobTitle: 'Design Engineer',
        alumniOf: {
          '@type': 'CollegeOrUniversity',
          name: 'New York University Tisch School of the Arts',
        },
        sameAs: [
          'https://www.linkedin.com/in/parth-pawar-1501/',
          'https://www.instagram.com/designwhich.works',
        ],
        knowsAbout: [
          'UX Design',
          'AI Wearables',
          'Fintech',
          'Creative Technology',
          'Physical Computing',
        ],
      },
    ],
  }
}

function getCategoryProjectName(
  project:
    | (typeof categories)[number]['featured']
    | (typeof categories)[number]['moreProjects'][number][number]
) {
  return 'title' in project ? project.title : project.name
}

function getRouteMeta(pathname: string): RouteMeta {
  const url = pathname === '/' ? SITE_URL : `${SITE_URL}${pathname}`
  const robots = NOINDEX_ROUTES.has(pathname) ? 'noindex, nofollow' : 'index, follow'

  if (pathname === '/') {
    return {
      title: 'Parth Pawar, Design Engineer',
      description: 'Portfolio of Parth Pawar, Design Engineer focused on AI wearables, fintech, creative technology, and product systems.',
      image: toAbsoluteUrl(DEFAULT_IMAGE),
      url,
      type: 'website',
      robots,
      schema: getHomeSchema(),
    }
  }

  if (pathname === '/work') {
    return {
      title: 'Work · Parth Pawar',
      description: 'Selected work by Parth Pawar across AI wearables, fintech, UX design, creative technology, installations, and brand systems.',
      image: toAbsoluteUrl(DEFAULT_IMAGE),
      url,
      type: 'website',
      robots,
      schema: {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Work',
        url,
        description: 'Selected work by Parth Pawar.',
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: projects.slice(0, 12).map((project, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            url: `${SITE_URL}/${project.slug}`,
            name: project.name,
          })),
        },
      },
    }
  }

  if (pathname === '/about') {
    return {
      title: 'About · Parth Pawar',
      description: 'About Parth Pawar, Design Engineer and Head of UI/UX at Mentra. Experience across AI wearables, fintech, and creative technology.',
      image: toAbsoluteUrl('/Assets/Character/me/1.webp'),
      url,
      type: 'website',
      robots,
      schema: {
        '@context': 'https://schema.org',
        '@type': 'ProfilePage',
        name: 'About Parth Pawar',
        url,
        mainEntity: {
          '@type': 'Person',
          name: 'Parth Pawar',
          jobTitle: 'Design Engineer',
          worksFor: {
            '@type': 'Organization',
            name: 'Mentra',
          },
        },
      },
    }
  }

  const category = categories.find(item => pathname === `/${item.slug}`)
  if (category) {
    const projectsInCategory = [category.featured, ...category.moreProjects.flat()]
    return {
      title: category.metaTitle,
      description: category.metaDescription,
      image: toAbsoluteUrl(category.featured.image),
      url,
      type: 'website',
      robots,
      schema: {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: `${category.title} ${category.titleAccent}`,
        url,
        description: category.metaDescription,
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: projectsInCategory.map((project, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            url: `${SITE_URL}/${project.slug}`,
            name: getCategoryProjectName(project),
          })),
        },
      },
    }
  }

  const slug = pathname.replace(/^\//, '')
  const project = projects.find(item => item.slug === slug)
  if (project) {
    const year = parseYear(project.year)
    return {
      title: `${project.name} Case Study · Parth Pawar`,
      description: `${project.desc}. Case study by Parth Pawar.`,
      image: toAbsoluteUrl(project.image || DEFAULT_IMAGE),
      url,
      type: 'article',
      robots,
      schema: {
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        name: `${project.name} Case Study`,
        headline: `${project.name} Case Study`,
        url,
        image: toAbsoluteUrl(project.image || DEFAULT_IMAGE),
        description: `${project.desc}.`,
        author: {
          '@type': 'Person',
          name: 'Parth Pawar',
          url: SITE_URL,
        },
        creator: {
          '@type': 'Person',
          name: 'Parth Pawar',
        },
        datePublished: year,
        keywords: [project.tag, project.category, 'Parth Pawar', 'case study'],
      },
    }
  }

  if (pathname === '/writing') {
    return {
      title: 'Writing · Parth Pawar',
      description: 'Articles on design engineering, AI wearables, fintech trust, and creative practice by Parth Pawar.',
      image: toAbsoluteUrl(DEFAULT_IMAGE),
      url,
      type: 'website',
      robots,
    }
  }

  if (pathname.startsWith('/writing/')) {
    const articleSlug = pathname.replace('/writing/', '')
    return {
      title: `${articleSlug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())} · Parth Pawar`,
      description: 'Article by Parth Pawar, Design Engineer.',
      image: toAbsoluteUrl(DEFAULT_IMAGE),
      url,
      type: 'article',
      robots,
    }
  }

  if (pathname === '/studio') {
    return {
      title: 'Studio · Parth Pawar',
      description: 'Interactive design studio by Parth Pawar.',
      image: toAbsoluteUrl(DEFAULT_IMAGE),
      url,
      type: 'website',
      robots,
    }
  }

  if (pathname === '/book') {
    return {
      title: 'Book · Parth Pawar',
      description: 'Portfolio book by Parth Pawar.',
      image: toAbsoluteUrl(DEFAULT_IMAGE),
      url,
      type: 'website',
      robots,
    }
  }

  if (pathname === '/graveyard') {
    return {
      title: 'Graveyard · Parth Pawar',
      description: 'Archive of previous portfolio experiments by Parth Pawar.',
      image: toAbsoluteUrl(DEFAULT_IMAGE),
      url,
      type: 'website',
      robots,
    }
  }

  return {
    title: 'Parth Pawar · Portfolio',
    description: 'Portfolio of Parth Pawar, Design Engineer.',
    image: toAbsoluteUrl(DEFAULT_IMAGE),
    url,
    type: 'website',
    robots,
  }
}

export default function RouteSeo() {
  const location = useLocation()
  const meta = getRouteMeta(location.pathname)

  return (
    <Helmet>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <meta name="robots" content={meta.robots} />
      <meta name="googlebot" content={meta.robots} />
      <link rel="canonical" href={meta.url} />

      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:type" content={meta.type} />
      <meta property="og:url" content={meta.url} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:image" content={meta.image} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={meta.image} />

      {meta.schema ? (
        <script type="application/ld+json">{JSON.stringify(meta.schema)}</script>
      ) : null}
    </Helmet>
  )
}
