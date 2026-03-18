import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { RootLayout } from '@/components/layout/RootLayout'

const HomePage = lazy(() => import('@/pages/HomePage').then(m => ({ default: m.HomePage })))
const WorkPage = lazy(() => import('@/pages/WorkPage').then(m => ({ default: m.WorkPage })))
const AboutPage = lazy(() => import('@/pages/AboutPage').then(m => ({ default: m.AboutPage })))
const ProjectPage = lazy(() => import('@/pages/ProjectPage').then(m => ({ default: m.ProjectPage })))
const CategoryPage = lazy(() => import('@/pages/CategoryPage').then(m => ({ default: m.CategoryPage })))
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage').then(m => ({ default: m.NotFoundPage })))

function Lazy({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={null}>{children}</Suspense>
}

const categorySlugs = [
  'ai',
  'ux-design',
  'creative-tech',
  'installations',
  'brand-visual',
  'crypto',
  'fintech',
  'design-for-good',
  'ai-wearables',
]

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: '/', element: <Lazy><HomePage /></Lazy> },
      { path: '/work', element: <Lazy><WorkPage /></Lazy> },
      { path: '/about', element: <Lazy><AboutPage /></Lazy> },
      ...categorySlugs.map((slug) => ({
        path: `/${slug}`,
        element: <Lazy><CategoryPage /></Lazy>,
      })),
      { path: '/:slug', element: <Lazy><ProjectPage /></Lazy> },
      { path: '*', element: <Lazy><NotFoundPage /></Lazy> },
    ],
  },
])
