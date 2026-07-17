import { useEffect, useState, type CSSProperties } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { Reveal } from '../components/Reveal'
import '../styles/perplexity.css'

const roleNeeds = [
  {
    number: '01',
    title: 'A video engine, not one hero film',
    body: 'The role is production-first: concept, storyboard, animate, finish, and keep a high-volume social pipeline moving without lowering the craft bar.',
  },
  {
    number: '02',
    title: 'Product truth made immediate',
    body: 'AI stories become credible when the viewer can see the question, the work, the sources, and the outcome—not only an abstract promise about intelligence.',
  },
  {
    number: '03',
    title: 'A system that compounds',
    body: 'Motion principles, modular After Effects builds, and planned delivery formats let every launch move faster than the last while remaining distinctly Perplexity.',
  },
]

const storyBeats = [
  ['00–02', 'Ask', 'Open on a useful human intent, already in motion.'],
  ['02–05', 'Understand', 'Turn the prompt into a visible plan instead of a loading abstraction.'],
  ['05–10', 'Work', 'Let research, sources, and actions accumulate with readable cause and effect.'],
  ['10–13', 'Verify', 'Hold on the answer, source trail, or completed action long enough to trust it.'],
  ['13–15', 'Land', 'Resolve to one product sentence and one next step.'],
]

const territories = [
  {
    number: '01',
    label: 'Search + Deep Research',
    title: 'From question to evidence.',
    body: 'A launch-film family that turns the invisible work of research into a legible sequence: intent, branching inquiry, source convergence, cited answer.',
    deliverables: '15s launch · 6s proof · 9:16 source story',
    visual: 'research',
  },
  {
    number: '02',
    label: 'Comet',
    title: 'From prompt to delegated action.',
    body: 'Show the browser doing useful work while preserving control: understand the request, form a plan, act across steps, return for confirmation.',
    deliverables: '30s hero · 15s use case · feature cutdowns',
    visual: 'comet',
  },
  {
    number: '03',
    label: 'Social + GTM',
    title: 'One launch. A complete cut family.',
    body: 'Design the master and its derivatives together so hooks, proof moments, captions, and end cards survive every duration and crop.',
    deliverables: '16:9 · 1:1 · 4:5 · 9:16 · still',
    visual: 'formats',
  },
]

const motionPrinciples = [
  ['Clarity before flourish', 'Movement explains a state, relationship, or result before it adds personality.'],
  ['The answer earns a hold', 'Fast research can feel capable; the final evidence needs enough stillness to be read and trusted.'],
  ['Sources stay attached', 'Citations travel with the claim through transitions, crops, and cutdowns.'],
  ['One spatial model', 'Ask, plan, work, and answer occupy consistent regions so speed never destroys orientation.'],
  ['Sound has an information job', 'Rhythm marks phase changes; quieter moments create space for proof and comprehension.'],
  ['Stillness is part of the system', 'A still is the right output when motion would only repeat information or reduce legibility.'],
]

const productionRows = [
  ['00_MASTER_STORY', 'Narrative markers · music edit · protected ending', 'Master'],
  ['01_CTRL_SYSTEM', 'Tempo · accent · type scale · source count', 'Controls'],
  ['02_PRODUCT_STATES', 'Prompt · plan · research · answer · action', 'Protected'],
  ['03_GTM_MODULES', 'Hook · proof · quote · CTA · end card', 'Swappable'],
  ['04_CAPTIONS_AUDIO', 'Sound-off copy · VO · mix · accessibility', 'Editable'],
  ['90_DELIVERY_FAMILY', '16:9 · 4:5 · 1:1 · 9:16 · still', 'Inherited'],
]

const proof = [
  {
    number: '01',
    title: 'VishwaConclave',
    label: 'Campaign direction',
    body: 'A high-frequency event campaign moving from intrigue to reveal, proof, and conversion across film and social.',
    image: '/Assets/mockups/projects/vishwaconclave_16x9.webp',
    href: '/motion/vishwa-conclave-motion',
  },
  {
    number: '02',
    title: 'Mentra',
    label: 'Hardware GTM',
    body: 'A 15-second advertising hierarchy that moves from human moment to wearable proof and platform value.',
    image: '/Assets/Projects/mentra-brand/photos/render-both-frames.webp',
    href: '/motion/mentra-motion-language',
  },
  {
    number: '03',
    title: 'TransFi',
    label: 'Product-state motion',
    body: 'A transaction story that makes each state observable and protects trust through timing, continuity, and holds.',
    image: '/Assets/Projects/Transfi/public/Frame 427318646.png',
    href: '/motion/transfi-identity-motion',
  },
  {
    number: '04',
    title: 'Editing motion stories',
    label: 'Editorial craft',
    body: 'Four films examined through selects, structure, pacing, sound, motion graphics, and final delivery.',
    image: '/Assets/images/enigma.jpg',
    href: '/motion/editing-motion-stories',
  },
]

const firstNinety = [
  {
    range: '00–30',
    title: 'Learn by shipping',
    body: 'Audit recent launch output, shadow Brand and Growth, map the production pipeline, and ship initial social work inside the existing visual language.',
  },
  {
    range: '31–60',
    title: 'Name the repeatable parts',
    body: 'Codify timing, product-state behavior, source treatment, end cards, caption rules, file architecture, and versioning patterns from real work.',
  },
  {
    range: '61–90',
    title: 'Make the system useful',
    body: 'Turn proven patterns into templates, expressions, review checkpoints, and AI-assisted utilities that remove repetitive work without automating taste.',
  },
]

function useMotionControl() {
  const [playing, setPlaying] = useState(true)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setPlaying(!media.matches)
    sync()
    media.addEventListener('change', sync)
    return () => media.removeEventListener('change', sync)
  }, [])

  return { playing, setPlaying }
}

function PerplexityPrototype({ playing }: { playing: boolean }) {
  return (
    <div className={`perp-prototype${playing ? '' : ' is-paused'}`} role="img" aria-label="Speculative Perplexity launch-film prototype moving from a question through research and cited evidence to a completed action">
      <div className="perp-prototype__top" aria-hidden="true">
        <span>PERPLEXITY / CREATIVE STUDIO STUDY</span>
        <span>15 SEC MASTER · 01</span>
      </div>

      <div className="perp-prototype__scene perp-prototype__scene--ask" aria-hidden="true">
        <p>What changed in AI browsers<br />and what should I try first?</p>
        <span><i /> Ask anything</span>
      </div>

      <div className="perp-prototype__scene perp-prototype__scene--research" aria-hidden="true">
        <div className="perp-research-map">
          <span>Intent</span><i /><span>Compare</span><i /><span>Verify</span><i /><span>Answer</span>
        </div>
        <div className="perp-source-stack">
          <span><b>01</b> Product documentation</span>
          <span><b>02</b> Launch announcement</span>
          <span><b>03</b> Independent reporting</span>
        </div>
        <strong>Research that<br />shows its work.</strong>
      </div>

      <div className="perp-prototype__scene perp-prototype__scene--answer" aria-hidden="true">
        <small>ANSWER / 6 SOURCES</small>
        <h2>The browser becomes an active collaborator.</h2>
        <p>Compare options, act across steps, and keep the source trail visible.</p>
        <div><span>1</span><span>2</span><span>3</span><span>+3</span></div>
      </div>

      <div className="perp-prototype__scene perp-prototype__scene--land" aria-hidden="true">
        <p>Perplexity</p>
        <strong>Knowledge to action.</strong>
        <span>Independent motion study</span>
      </div>

      <div className="perp-prototype__timeline" aria-hidden="true">
        <i /><span>ASK</span><span>RESEARCH</span><span>VERIFY</span><span>LAND</span>
      </div>
    </div>
  )
}

function TerritoryVisual({ type }: { type: string }) {
  if (type === 'research') {
    return (
      <div className="perp-territory-visual perp-territory-visual--research" aria-hidden="true">
        <div><span>Question</span><strong>Why now?</strong></div>
        <i />
        <div><span>Sources</span><b>01</b><b>02</b><b>03</b></div>
        <i />
        <div><span>Answer</span><strong>Because...</strong></div>
      </div>
    )
  }

  if (type === 'comet') {
    return (
      <div className="perp-territory-visual perp-territory-visual--comet" aria-hidden="true">
        <p><span>01</span> Understand</p><p><span>02</span> Plan</p><p><span>03</span> Act</p><p><span>04</span> Confirm</p>
        <i />
      </div>
    )
  }

  return (
    <div className="perp-territory-visual perp-territory-visual--formats" aria-hidden="true">
      <div><span>16:9</span></div><div><span>4:5</span></div><div><span>9:16</span></div>
      <p>One master / every cut</p>
    </div>
  )
}

export default function PerplexityPage() {
  const { playing, setPlaying } = useMotionControl()
  const style = { '--project-color': '#18a999' } as CSSProperties

  return (
    <>
      <Helmet>
        <title>Perplexity Creative Studio Motion Study · Parth Pawar</title>
        <meta name="description" content="An independent motion and GTM system proposal for Perplexity Creative Studio, grounded in product truth, cited answers, reusable After Effects builds, and social delivery." />
        <meta property="og:title" content="Perplexity Creative Studio Motion Study · Parth Pawar" />
        <meta property="og:description" content="What I would build for Perplexity: product-true launch stories, a scalable motion grammar, and a high-output social production system." />
        <link rel="canonical" href="https://designwhich.works/perplexity" />
      </Helmet>

      <Nav />
      <main id="main-content" className="perplexity-page" style={style}>
        <div className="wrap">
          <section className="perp-hero" aria-labelledby="perp-title">
            <div className="perp-hero__eyebrow">
              <span><i /> Independent Creative Studio proposal</span>
              <span>Not commissioned · July 2026</span>
            </div>

            <div className="perp-hero__title">
              <p>Perplexity<br />Motion Study</p>
              <h1 id="perp-title">A motion system for products that think in public.</h1>
            </div>

            <div className="perp-hero__intro">
              <p>Perplexity has a rare motion problem: make fast-moving AI capabilities feel immediate without hiding how the product reached an answer or completed an action.</p>
              <div>
                <a className="perp-button perp-button--solid figma-hover" href="#prototype">View the concept <span>↓</span></a>
                <Link className="perp-button figma-hover" to="/motion">Motion portfolio <span>↗</span></Link>
              </div>
            </div>
          </section>

          <section id="prototype" className="perp-prototype-section" aria-labelledby="prototype-title">
            <div className="perp-section-head">
              <p><span>00</span> Working prototype</p>
              <div>
                <h2 id="prototype-title">Question → work → evidence → action.</h2>
                <button type="button" onClick={() => setPlaying((current) => !current)} aria-pressed={!playing}>
                  <i aria-hidden="true">{playing ? 'Ⅱ' : '▶'}</i>{playing ? 'Pause motion' : 'Play motion'}
                </button>
              </div>
            </div>
            <PerplexityPrototype playing={playing} />
            <div className="perp-prototype-caption">
              <span>Speculative launch-story prototype · product language study, not Perplexity product UI</span>
              <span>CSS motion · reduced-motion safe</span>
            </div>
          </section>

          <Reveal>
            <section className="perp-role" aria-labelledby="role-title">
              <div className="perp-section-head">
                <p><span>01</span> Reading the role</p>
                <div><h2 id="role-title">The brief asks for output and infrastructure.</h2></div>
              </div>
              <div className="perp-role__grid">
                {roleNeeds.map((item) => (
                  <article key={item.number}><span>{item.number}</span><h3>{item.title}</h3><p>{item.body}</p></article>
                ))}
              </div>
              <a className="perp-source-link" href="https://jobs.ashbyhq.com/Perplexity/39d520eb-6b81-4b61-8b23-5efcdac4cad9" target="_blank" rel="noreferrer">
                <span>Source</span><strong>Member of Creative Studio (Motion Designer) · official role</strong><i>↗</i>
              </a>
            </section>
          </Reveal>

          <section className="perp-territories" aria-labelledby="territories-title">
            <div className="perp-section-head">
              <p><span>02</span> Three launch territories</p>
              <div><h2 id="territories-title">What I would make first.</h2><p>Three repeatable stories, each tied to a product truth and built as a family of social outputs.</p></div>
            </div>
            <div className="perp-territories__grid">
              {territories.map((territory) => (
                <Reveal key={territory.number}>
                  <article className="perp-territory-card">
                    <TerritoryVisual type={territory.visual} />
                    <div className="perp-territory-card__copy">
                      <p><span>{territory.number}</span>{territory.label}</p>
                      <h3>{territory.title}</h3>
                      <div><p>{territory.body}</p><small>{territory.deliverables}</small></div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </section>

          <Reveal>
            <section className="perp-story" aria-labelledby="story-title">
              <div className="perp-section-head perp-section-head--light">
                <p><span>03</span> Fifteen-second story</p>
                <div><h2 id="story-title">Speed belongs in the work. Trust belongs in the hold.</h2></div>
              </div>
              <div className="perp-story__track">
                {storyBeats.map(([time, title, body]) => (
                  <article key={time}><span>{time}</span><h3>{title}</h3><p>{body}</p></article>
                ))}
              </div>
              <div className="perp-story__note"><span>Editorial rule</span><p>The film can accelerate through parallel work, but the answer, citation, confirmation, and CTA cannot all arrive on the same frame.</p></div>
            </section>
          </Reveal>

          <section className="perp-principles" aria-labelledby="principles-title">
            <div className="perp-section-head">
              <p><span>04</span> Motion grammar</p>
              <div><h2 id="principles-title">Tighter, not busier.</h2><p>The reference point is the restraint and system thinking visible in Rob Diaz’s Perplexity work—not an imitation of his frames.</p></div>
            </div>
            <div className="perp-principles__grid">
              {motionPrinciples.map(([title, body], index) => (
                <Reveal key={title}><article><span>0{index + 1}</span><h3>{title}</h3><p>{body}</p></article></Reveal>
              ))}
            </div>
            <div className="perp-reference-links">
              <a href="https://robdiaz.com/" target="_blank" rel="noreferrer"><span>Reference</span><strong>Rob Diaz · motion systems and selected Perplexity work</strong><i>↗</i></a>
              <a href="https://robdiaz.com/articles/motion-design-workflow-2026" target="_blank" rel="noreferrer"><span>Process reference</span><strong>Clarity, timing, craft, and scalable production</strong><i>↗</i></a>
              <a href="https://www.perplexity.ai/comet" target="_blank" rel="noreferrer"><span>Product source</span><strong>Comet · the browser that works for you</strong><i>↗</i></a>
            </div>
          </section>

          <Reveal>
            <section className="perp-production" aria-labelledby="production-title">
              <div className="perp-section-head">
                <p><span>05</span> After Effects system</p>
                <div><h2 id="production-title">One editable master. A complete delivery family.</h2><p>Figma preserves product truth; After Effects owns timing, compositing, and reusable modules; Premiere owns editorial and sound; Media Encoder creates controlled outputs.</p></div>
              </div>
              <div className="perp-production__body">
                <div className="perp-ae-map" aria-label="Proposed After Effects project structure">
                  <div className="perp-ae-map__head"><span>After Effects project map</span><span>Speculative production architecture</span></div>
                  {productionRows.map(([name, contents, type], index) => (
                    <div className="perp-ae-map__row" key={name}>
                      <i style={{ '--row': index === 0 ? '#18a999' : index === productionRows.length - 1 ? '#7b61ff' : '#568dff' } as CSSProperties} />
                      <code>{name}</code><span>{contents}</span><small>{type}</small>
                    </div>
                  ))}
                </div>
                <div className="perp-delivery-map">
                  <article className="is-wide"><span>16:9</span><strong>Launch master</strong><i /></article>
                  <article className="is-square"><span>1:1</span><strong>Feed proof</strong><i /></article>
                  <article className="is-vertical"><span>9:16</span><strong>Social story</strong><i /></article>
                  <p>Protected type zones, inherited timing markers, swappable product states, sound-off captions, and one source of truth for every cut.</p>
                </div>
              </div>
            </section>
          </Reveal>

          <section className="perp-proof" aria-labelledby="proof-title">
            <div className="perp-section-head">
              <p><span>06</span> Evidence from current work</p>
              <div><h2 id="proof-title">The proposal is connected to work already done.</h2><p>Each study demonstrates a different part of the role: campaign cadence, GTM storytelling, product-state clarity, or editorial construction.</p></div>
            </div>
            <div className="perp-proof__grid">
              {proof.map((item) => (
                <Reveal key={item.number}>
                  <Link className="perp-proof-card figma-hover" to={item.href}>
                    <div><img src={item.image} alt="" loading="lazy" /></div>
                    <p><span>{item.number} · {item.label}</span><i>↗</i></p>
                    <h3>{item.title}</h3><small>{item.body}</small>
                  </Link>
                </Reveal>
              ))}
            </div>
          </section>

          <Reveal>
            <section className="perp-ninety" aria-labelledby="ninety-title">
              <div className="perp-section-head">
                <p><span>07</span> First ninety days</p>
                <div><h2 id="ninety-title">Ship first. Systematize what proves useful.</h2></div>
              </div>
              <div className="perp-ninety__grid">
                {firstNinety.map((phase) => (
                  <article key={phase.range}><span>{phase.range}</span><small>Days</small><h3>{phase.title}</h3><p>{phase.body}</p></article>
                ))}
              </div>
            </section>
          </Reveal>

          <section className="perp-close" aria-labelledby="close-title">
            <p>Independent study · Parth Pawar</p>
            <h2 id="close-title">Make the intelligence visible.<br />Keep the product believable.</h2>
            <div>
              <Link className="perp-button perp-button--light figma-hover" to="/motion">View motion work <span>↗</span></Link>
              <a className="perp-button perp-button--outline-light figma-hover" href="mailto:parthpawar@nyu.edu">Start a conversation <span>↗</span></a>
            </div>
            <small>This page is an independent portfolio response to a public role. It was not commissioned by, produced for, or approved by Perplexity. Product and role references are linked to their original sources; all proposed campaign concepts and the motion prototype are presented as speculative work.</small>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
