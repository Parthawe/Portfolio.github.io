import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { site } from '@/data/site'

const tools = [
  'Figma', 'Protopie', 'Blender', 'After Effects',
  'React', 'Swift', 'Python', 'Arduino',
  'p5.js', 'TouchDesigner', 'Laser Cutting', '3D Printing',
]

const experience = [
  { date: '2025 — Present', role: 'Head of UI/UX', company: 'Mentra · New York', desc: 'Leading UI/UX for AI-powered smart glasses. Companion app, MentraOS, miniapp store, and developer platform.' },
  { date: '2026', role: 'Product Designer', company: 'Clawed · New York', desc: 'Designed a safety-first AI assistant for smart glasses and web.' },
  { date: '2026', role: 'Designer', company: 'OrgDashboard', desc: 'SaaS platform giving AI agents organizational context.' },
  { date: '2025 — 2026', role: 'Product Designer', company: 'ExecutiveLens.ai', desc: 'AI-powered business intelligence for executives.' },
  { date: '2025', role: 'Founding Product Designer', company: 'ZentiPay · New York', desc: 'Built a fintech super app from 0 to 1. 30% higher transaction success.' },
  { date: '2022 — 2023', role: 'Lead Product Designer', company: 'TransFi · Bangalore', desc: 'Led design for Asia\u2019s leading crypto payments platform. $50M+ monthly volume.' },
  { date: '2024', role: 'Designer', company: 'The Point CDC · New York' },
  { date: '2023 — 2024', role: 'Graduate Teaching Assistant', company: 'NYU Tisch / ITP · 3 semesters' },
  { date: '2020 — 2021', role: 'Research Intern', company: 'IBM · Pune' },
]

const education = [
  { date: '2022 — 2024', role: 'MPS, Interactive Telecommunications Program', company: 'Tisch School of the Arts, NYU' },
  { date: '2018 — 2022', role: 'BE, Computer Science', company: 'Vishwakarma Institute of Technology · Pune' },
]

const recognition = [
  { date: '2024', role: 'Red Burn Scholarship', company: 'NYU' },
  { date: '2024', role: 'Interactive Telecommunications Scholarship', company: 'NYU ITP' },
  { date: '2023', role: 'Tisch Graduate Scholarship', company: 'NYU Tisch' },
  { date: '2021', role: 'Smart India Hackathon — Winner', company: 'Government of India' },
]

const exhibitions = [
  { date: '2024', role: 'Maker Faire Coney Island', company: 'New York' },
  { date: '2024', role: 'WonderVille — New Arcade Game', company: 'Brooklyn' },
  { date: '2024', role: 'NIME — New Interfaces for Musical Expression' },
  { date: '2023 — 2024', role: 'ITP Spring, Winter, and Camp Shows', company: 'NYU ITP' },
]

function ExpRow({ date, role, company, desc, isFirst }: { date: string; role: string; company?: string; desc?: string; isFirst?: boolean }) {
  const ref = useScrollReveal<HTMLDivElement>()
  return (
    <div
      ref={ref}
      className="grid border-b border-ink-08"
      style={{
        gridTemplateColumns: 'minmax(100px, 160px) 1fr',
        gap: 'clamp(1rem, 2vw, 2rem)',
        padding: '1.25rem 0',
        borderTop: isFirst ? '1px solid var(--color-ink-08)' : undefined,
      }}
    >
      <span className="font-mono text-[11px] tracking-wide text-ink-40" style={{ paddingTop: '0.25rem' }}>{date}</span>
      <div>
        <span className="block text-[15px] font-semibold leading-snug">{role}</span>
        {company && <span className="mt-0.5 block text-sm text-ink-40">{company}</span>}
        {desc && <p className="mt-1.5 max-w-[50ch] text-sm leading-[1.6] text-ink-70">{desc}</p>}
      </div>
    </div>
  )
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  const ref = useScrollReveal<HTMLDivElement>()
  return (
    <div ref={ref} style={{ paddingTop: 'clamp(2rem, 4vw, 3rem)', paddingBottom: 'clamp(1rem, 2vw, 2rem)' }}>
      <span className="mb-4 block font-mono text-[11px] uppercase tracking-widest text-ink-40">{label}</span>
      {children}
    </div>
  )
}

export function AboutPage() {
  const heroRef = useScrollReveal<HTMLDivElement>()

  return (
    <>
      <Helmet>
        <title>About · Parth Pawar</title>
        <meta name="description" content="Parth Pawar — Head of UI/UX at Mentra. Product Designer specializing in AI wearables, fintech, and interactive systems. NYU ITP MPS '24." />
        <meta property="og:image" content="/Assets/ParthAboutus.png" />
      </Helmet>

      <div
        className="mx-auto max-w-[--width-container] px-[--spacing-pad]"
        style={{ paddingTop: 'calc(var(--spacing-nav-h) + clamp(3rem, 6vw, 5rem))', paddingBottom: 'clamp(3rem, 6vw, 4rem)' }}
      >
        {/* Hero */}
        <header
          ref={heroRef}
          className="grid items-start gap-8"
          style={{ gridTemplateColumns: 'minmax(0, auto) 1fr' }}
        >
          <div className="hidden md:block" style={{ width: '260px' }}>
            <img
              src="/Assets/ParthAboutus.png"
              alt="Parth Pawar"
              className="w-full rounded-xl"
              loading="eager"
            />
          </div>
          <div>
            <h1
              className="font-serif font-light tracking-tight"
              style={{ fontSize: 'clamp(3rem, 6vw, 4.5rem)', lineHeight: 1.05 }}
            >
              Parth Pawar
            </h1>
            <p className="mt-2 text-[15px] text-ink-40">Product Designer · New York</p>
            <div className="mt-8 space-y-5">
              <p className="max-w-[52ch] text-[15px] leading-[1.75] text-ink-70">
                I think the best interfaces disappear. Not in the trendy &ldquo;invisible design&rdquo; sense &mdash; I mean they earn trust so quickly that people stop noticing them and start doing what they came to do. That&rsquo;s what I optimize for: the moment a user forgets they&rsquo;re using software.
              </p>
              <p className="max-w-[52ch] text-[15px] leading-[1.75] text-ink-70">
                Right now I lead UI/UX at Mentra, where I&rsquo;m designing the OS and app store for AI-powered smart glasses &mdash; a form factor with no established patterns, a peripheral display you never stare at, and voice as the primary input. Before that I was the founding designer at ZentiPay (fintech for migrant workers) and led design at TransFi (crypto payments across six Asian markets). I also design AI products at Clawed and ExecutiveLens.
              </p>
              <p className="max-w-[52ch] text-[15px] leading-[1.75] text-ink-70">
                I studied at NYU&rsquo;s Interactive Telecommunications Program, where I built neural-network music installations, mechanical theatre stages, and VJ software &mdash; the kind of work that taught me to design across hardware, software, and physical space simultaneously. Before that, Computer Science at VIT Pune and an AI research stint at IBM.
              </p>
            </div>
            <div className="mt-8 flex gap-6">
              <a href={`mailto:${site.email}`} className="text-sm text-ink-40 underline decoration-ink-15 underline-offset-[3px] transition-colors duration-200 hover:text-ink hover:decoration-ink">Email</a>
              <a href={site.linkedin} target="_blank" rel="noopener" className="text-sm text-ink-40 underline decoration-ink-15 underline-offset-[3px] transition-colors duration-200 hover:text-ink hover:decoration-ink">LinkedIn</a>
              <a href="https://freight.cargo.site/m/K2505295326952803353443522904598/Parth_Pawar_Resume.pdf" target="_blank" rel="noopener" className="text-sm text-ink-40 underline decoration-ink-15 underline-offset-[3px] transition-colors duration-200 hover:text-ink hover:decoration-ink">Resume</a>
            </div>
          </div>
        </header>

        {/* Currently */}
        <div
          className="mt-14 rounded-xl border border-ink-06 border-l-[3px] border-l-ink bg-surface"
          style={{ padding: 'clamp(1.5rem, 3vw, 2rem)' }}
        >
          <span className="font-mono text-[11px] uppercase tracking-widest text-ink-40">Currently</span>
          <p className="mt-2.5 text-[15px] leading-[1.75] text-ink-70">
            Leading UI/UX at <Link to="/mentra" className="text-ink underline decoration-ink-15 underline-offset-[3px] hover:decoration-ink">Mentra</Link> — designing the OS, companion app, and app store for AI-powered smart glasses. Also building <Link to="/clawed-chat" className="text-ink underline decoration-ink-15 underline-offset-[3px] hover:decoration-ink">Clawed</Link>, a safety-first AI assistant, and <Link to="/ballah-code" className="text-ink underline decoration-ink-15 underline-offset-[3px] hover:decoration-ink">Ballah Code</Link>, an AI-native desktop IDE.
          </p>
        </div>

        {/* Philosophy */}
        <blockquote className="border-l-[3px] border-ink" style={{ margin: 'clamp(2.5rem, 5vw, 4rem) 0', padding: '1.5rem 0 1.5rem 2rem' }}>
          <p className="font-serif font-light" style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.6rem)', lineHeight: 1.55 }}>
            &ldquo;The best interfaces disappear. Not in the trendy &lsquo;invisible design&rsquo; sense &mdash; they earn trust so quickly that people stop noticing them and start doing what they came to do.&rdquo;
          </p>
        </blockquote>

        {/* Tools */}
        <Section label="Tools & Stack">
          <div className="flex flex-wrap gap-2">
            {tools.map((tool) => (
              <span key={tool} className="rounded-full border border-ink-08 bg-ink-04 px-3 py-1.5 font-mono text-[11px] text-ink-70 transition-colors duration-200 hover:border-ink-15 hover:text-ink">
                {tool}
              </span>
            ))}
          </div>
        </Section>

        <hr className="border-ink-06" />

        {/* Experience */}
        <Section label="Experience">
          {experience.map((exp, i) => <ExpRow key={i} {...exp} isFirst={i === 0} />)}
        </Section>

        <hr className="border-ink-06" />

        {/* Education */}
        <Section label="Education">
          {education.map((edu, i) => <ExpRow key={i} {...edu} isFirst={i === 0} />)}
        </Section>

        <hr className="border-ink-06" />

        {/* Recognition */}
        <Section label="Recognition">
          {recognition.map((rec, i) => <ExpRow key={i} {...rec} isFirst={i === 0} />)}
        </Section>

        <hr className="border-ink-06" />

        {/* Exhibitions */}
        <Section label="Exhibitions">
          {exhibitions.map((exh, i) => <ExpRow key={i} {...exh} isFirst={i === 0} />)}
        </Section>
      </div>
    </>
  )
}
