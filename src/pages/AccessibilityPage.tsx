import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import FigmaSelect from '../components/FigmaSelect'
import { CONTACT_EMAIL } from '../config/site'
import { getProjectAccessLabel, visibleProjects } from '../data/projects'

const reviewedItems = [
  {
    label: 'Keyboard path',
    state: 'Handled',
    text: 'Skip link, visible focus styles, semantic links and buttons, Escape-close patterns, and route-level keyboard navigation are part of the current build.',
  },
  {
    label: 'Motion control',
    state: 'Handled',
    text: 'Loader, reveal motion, ambient interaction tools, and animated layers include reduced-motion paths so the page can be scanned without forced movement.',
  },
  {
    label: 'Responsive access',
    state: 'Handled',
    text: 'Work cards, bottom navigation, case-study rails, and footer controls use stable dimensions, safe-area spacing, and touch-sized targets across mobile and desktop.',
  },
  {
    label: 'Private work',
    state: 'Handled',
    text: 'NDA projects show a public glimpse first and mark the card as NDA. Private material is not included in the public static build.',
  },
  {
    label: '3D and canvas parity',
    state: 'Remaining',
    text: 'Decorative 3D scenes are hidden from assistive technology today. If they become navigational, they need equivalent text controls and state descriptions.',
  },
  {
    label: 'Automated verification',
    state: 'Remaining',
    text: 'A manual pass is documented here. A future release should add repeatable Lighthouse or axe checks to catch contrast, name, role, and focus regressions.',
  },
]

const standards = [
  {
    label: 'WCAG 2.2',
    href: 'https://www.w3.org/TR/WCAG22/',
    text: 'Used as the baseline for perceivable, operable, understandable, and robust behavior.',
  },
  {
    label: 'WAI-ARIA keyboard guidance',
    href: 'https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/',
    text: 'Used for focus visibility, keyboard movement, and predictable interactive controls.',
  },
]

export default function AccessibilityPage() {
  useEffect(() => {
    document.body.classList.add('page-accessibility')
    return () => document.body.classList.remove('page-accessibility')
  }, [])

  const ndaProjects = visibleProjects.filter(project => getProjectAccessLabel(project))

  return (
    <>
      <Helmet>
        <title>Accessibility · Parth Pawar</title>
        <meta
          name="description"
          content="Accessibility notes for Parth Pawar portfolio, including current decisions, known concerns, and planned improvements."
        />
      </Helmet>

      <Nav />

      <main id="main-content" className="a11y-page">
        <section className="a11y-hero">
          <div className="wrap a11y-hero__inner">
            <div className="a11y-hero__copy">
              <span className="mono-label a11y-kicker">Accessibility</span>
              <h1>Accessibility is product behavior.</h1>
              <p>
                This page documents what the portfolio already does, what still needs work, and why experimental
                controls remain optional instead of becoming required navigation.
              </p>
            </div>
            <div className="a11y-hero__review" aria-label="Accessibility review summary">
              <span>Last reviewed</span>
              <strong>June 29, 2026</strong>
              <small>Static portfolio, GitHub Pages build</small>
            </div>
          </div>
        </section>

        <section className="a11y-section">
          <div className="wrap a11y-grid">
            {reviewedItems.map(item => (
              <article
                className={`a11y-status-card a11y-status-card--${item.state === 'Handled' ? 'handled' : 'remaining'}`}
                key={item.label}
              >
                <div className="a11y-status-card__head">
                  <span>{item.state}</span>
                  <h2>{item.label}</h2>
                </div>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="a11y-section">
          <div className="wrap a11y-two-col">
            <div className="a11y-panel">
              <span className="mono-label">NDA visibility</span>
              <h2>Private work is marked before you open it.</h2>
              <p>
                Access-limited projects should be obvious on the card itself. The public view gives enough context to
                skip, shortlist, or request details without pretending the full case study is public.
              </p>
              <div className="a11y-nda-list" aria-label="Projects currently marked as NDA">
                {ndaProjects.map(project => (
                  <Link key={project.slug} to={`/${project.slug}`} className="a11y-nda-link figma-hover">
                    <span>{project.name}</span>
                    <small>{getProjectAccessLabel(project)}</small>
                    <FigmaSelect />
                  </Link>
                ))}
              </div>
            </div>

            <div className="a11y-panel">
              <span className="mono-label">Reference standard</span>
              <h2>Built against public guidance, not vibes.</h2>
              <p>
                The practical target is WCAG 2.2 AA behavior: readable text, keyboard access, focus visibility,
                reduced-motion safety, and alternatives for non-text or interactive media.
              </p>
              <div className="a11y-reference-list">
                {standards.map(item => (
                  <a key={item.href} href={item.href} target="_blank" rel="noopener noreferrer" className="a11y-reference figma-hover">
                    <span>{item.label}</span>
                    <small>{item.text}</small>
                    <FigmaSelect />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="a11y-section a11y-section--compact">
          <div className="wrap a11y-report">
            <div>
              <span className="mono-label">Open issues</span>
              <h2>What gets checked next</h2>
            </div>
            <ul>
              <li>Run a repeatable axe or Lighthouse accessibility report before merging this experiment branch.</li>
              <li>Audit every media-heavy case study for captions, transcripts, alt text, and keyboard-visible controls.</li>
              <li>Keep hand controls, crop tools, paint tools, and AI tour controls as enhancements, never the only path.</li>
              <li>Review dark mode contrast after each visual polish pass because overlays and glass surfaces can drift.</li>
            </ul>
            <a
              className="a11y-contact figma-hover"
              href={`mailto:${CONTACT_EMAIL}?subject=Portfolio%20accessibility%20feedback`}
            >
              Report an accessibility issue
              <FigmaSelect />
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
