import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { Reveal } from '../components/Reveal'
import { PLAYBOOK_VALUES } from '../data/playbook'
import { CONTACT_EMAIL, SITE_ORIGIN, SITE_BASE } from '../config/site'

/* The names strip loops twice for the infinite marquee — same pattern as
   the clients marquee, inspired by the "Playbook Points" row on
   designwhich.works. */
function NamesStrip() {
  return (
    <div className="pb-strip" aria-hidden="true">
      <div className="pb-strip-track">
        {[0, 1].map((copy) =>
          PLAYBOOK_VALUES.map((value) => (
            <span key={`${copy}-${value.slug}`} className="pb-strip-item">
              <i>✦</i> {value.title}
            </span>
          )),
        )}
      </div>
    </div>
  )
}

export default function PlaybookPage() {
  return (
    <>
      <Helmet>
        <title>Playbook — Parth Pawar</title>
        <meta
          name="description"
          content="Eight values that shape how I design: empathy, holistic thinking, experimentation, collaboration, adaptability, ethics, learning, and user empowerment."
        />
        <link rel="canonical" href={`${SITE_ORIGIN}${SITE_BASE}/playbook`} />
      </Helmet>
      <Nav />

      <main id="main-content" className="pb-page">
        <header className="pb-hero wrap">
          <p className="pb-eyebrow">✦ Playbook</p>
          <h1 className="pb-title">
            Eight values,
            <br />
            <em>every project.</em>
          </h1>
          <p className="pb-sub">
            The principles behind the work — how I think, decide, and collaborate. They travel with me
            from smart glasses to stage design.
          </p>
        </header>

        <NamesStrip />

        <div className="pb-values wrap">
          {PLAYBOOK_VALUES.map((value, index) => (
            <Reveal key={value.slug}>
              <section className="pb-value" id={value.slug} aria-labelledby={`pb-${value.slug}`}>
                <div className="pb-value-rail">
                  <p className="pb-value-num" aria-hidden="true">✦ Value {value.num}</p>
                  <h2 className="pb-value-title" id={`pb-${value.slug}`}>
                    {value.title}
                  </h2>
                </div>
                <div className="pb-value-points">
                  {value.points.map((point) => (
                    <div key={point.lead} className="pb-point">
                      <h3 className="pb-point-lead">{point.lead}</h3>
                      <p className="pb-point-body">{point.body}</p>
                    </div>
                  ))}
                </div>
                {index < PLAYBOOK_VALUES.length - 1 && <hr className="pb-value-divider" />}
              </section>
            </Reveal>
          ))}
        </div>

        <div className="pb-cta wrap">
          <Reveal>
            <p className="pb-cta-line">See the values at work.</p>
            <div className="pb-cta-row">
              <Link to="/work" className="pb-cta-link">Browse the work ↗</Link>
              <a href={`mailto:${CONTACT_EMAIL}?subject=Let%27s%20work%20together`} className="pb-cta-link pb-cta-link--quiet">
                Let&rsquo;s talk
              </a>
            </div>
          </Reveal>
        </div>
      </main>

      <Footer />
    </>
  )
}
