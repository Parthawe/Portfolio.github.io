import { useLocation, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { categories } from '@/data/categories'
import { LandingHero } from '@/components/landing/LandingHero'
import { LandingFeatured } from '@/components/landing/LandingFeatured'
import { LandingProjectGrid, LandingApproach, LandingCta } from '@/components/landing/LandingGrid'

export function CategoryPage() {
  const { pathname } = useLocation()
  const slug = pathname.replace('/', '')
  const category = categories[slug]

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  if (!category) {
    return <Navigate to="/404" replace />
  }

  return (
    <>
      <Helmet>
        <title>{category.title} · Parth Pawar</title>
        <meta name="description" content={category.description} />
        {category.ogImage && <meta property="og:image" content={category.ogImage} />}
      </Helmet>

      <LandingHero
        titleBreak={category.titleBreak}
        titleAccent={category.titleAccent}
        accentColor={category.accentColor}
        description={category.description}
        stats={category.stats}
        tools={category.tools}
      />

      <hr className="mx-auto max-w-[--width-container] border-ink-12" style={{ margin: '0 auto clamp(1.5rem, 3vw, 3rem)' }} />

      {category.featured && (
        <div className="py-8">
          <LandingFeatured {...category.featured} />
        </div>
      )}

      {category.projects.length > 0 && (
        <LandingProjectGrid projects={category.projects} />
      )}

      <LandingApproach items={category.approach} accentColor={category.accentColor} />

      <LandingCta headline={category.cta.headline} subtitle={category.cta.subtitle} />
    </>
  )
}
