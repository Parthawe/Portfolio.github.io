import { Helmet } from 'react-helmet-async'
import { site } from '@/data/site'
import { Hero } from '@/components/home/Hero'
import { IntroStatement } from '@/components/home/IntroStatement'
import { StickyCards } from '@/components/home/StickyCards'
import { WorkGrid } from '@/components/home/WorkGrid'
import { FooterHome } from '@/components/home/FooterHome'

export function HomePage() {
  return (
    <>
      <Helmet>
        <title>{site.title}</title>
        <meta name="description" content="Parth Pawar — Product Designer. Head of UI/UX at Mentra (AI smart glasses). Previously ZentiPay, TransFi. NYU ITP." />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Parth Pawar",
          jobTitle: "Product Designer",
          description: "Head of UI/UX at Mentra. Product Designer specializing in AI wearables, fintech, and interactive systems.",
          url: `https://www.${site.domain}`,
          email: `mailto:${site.email}`,
          sameAs: [site.linkedin, site.instagram],
          alumniOf: { "@type": "CollegeOrUniversity", name: "New York University" },
          worksFor: { "@type": "Organization", name: "Mentra" },
        })}</script>
      </Helmet>

      <Hero />
      <IntroStatement />
      <StickyCards />
      <WorkGrid />
      <FooterHome />
    </>
  )
}
