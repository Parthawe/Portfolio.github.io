import { useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link, useLocation } from 'react-router-dom'
import GlasslyDemo from '../components/GlasslyDemo'
import { CONTACT_EMAIL } from '../config/site'
import '../styles/glassly-case-study.css'
import '../styles/glassly-onboarding.css'

const assets = '/Assets/Projects/Glassly'
const chapters = [
  { id: 'pain-points', title: 'Where setup gets stuck', tone: 'problem' },
  { id: 'information-gathering', title: 'What I reviewed', tone: 'neutral' },
  { id: 'goal', title: 'Goal', tone: 'direction' },
  { id: 'development', title: 'Design decisions', tone: 'neutral' },
  { id: 'impact', title: 'Delivery and next tests', tone: 'direction' },
] as const

type Step = 'welcome' | 'check' | 'pair' | 'help' | 'phone' | 'connected'

const setupTitles: Record<Step, string> = {
  welcome: 'Start with Glassly.',
  check: 'Set up Even Realities G2.',
  pair: 'Look for your glasses.',
  help: 'Your G2 didn’t connect.',
  phone: 'Captions on your phone.',
  connected: 'Your G2 is connected.',
}

const captions = [
  'I’ll meet you outside in five minutes.',
  'I’m by the entrance on the left.',
]

function SetupPrototype({ recoveryRequest }: { recoveryRequest: string | null }) {
  const [step, setStep] = useState<Step>(recoveryRequest ? 'help' : 'welcome')
  const [caption, setCaption] = useState(0)
  const [pairingDeferred, setPairingDeferred] = useState(false)
  const heading = useRef<HTMLHeadingElement>(null)
  const interacted = useRef(false)
  const progress: Record<Step, number> = { welcome: 1, check: 2, pair: 3, help: 3, phone: 4, connected: 4 }
  const showGlasses = step === 'welcome' || step === 'check'
  const showCaption = step === 'phone' || step === 'connected'
  const next = (value: Step) => {
    interacted.current = true
    setStep(value)
  }
  const restart = () => {
    setCaption(0)
    setPairingDeferred(false)
    next('welcome')
  }
  useEffect(() => {
    if (recoveryRequest) setStep('help')
  }, [recoveryRequest])
  useEffect(() => {
    if (interacted.current) heading.current?.focus({ preventScroll: true })
  }, [step])

  return <div className="go-phone" aria-label="Glassly first-use prototype">
    <div className="go-phone-status" aria-hidden="true"><span>9:41</span><i /><span>▮▮▮ ▰</span></div>
    <div className="go-app-brand"><img src={`${assets}/logo.svg`} alt="" /> Glassly</div>
    <div className="go-progress" role="progressbar" aria-label="Setup progress" aria-valuemin={1} aria-valuemax={4} aria-valuenow={progress[step]}>
      {[1, 2, 3, 4].map(number => <span key={number} className={number <= progress[step] ? 'go-progress-filled' : ''} />)}
    </div>
    <div className="go-phone-copy">
      <h2 ref={heading} tabIndex={-1}>{setupTitles[step]}</h2>
      {step === 'welcome' && <p>Try a miniapp on your phone, or set up compatible glasses.</p>}
      {step === 'check' && <p>Put your G2 in its charging case before you pair.</p>}
      {step === 'pair' && <p>Keep the case nearby, turn on Bluetooth, and allow Glassly to use it.</p>}
      {step === 'help' && <ol className="go-checks">
        <li>Keep your G2 in its charging case.</li>
        <li>Disconnect it in the Even Realities app if it’s still connected there.</li>
        <li>Check that Bluetooth is on and Glassly has permission to use it.</li>
      </ol>}
      {step === 'phone' && pairingDeferred && <p className="go-connection-note">Pairing paused for Even Realities G2.</p>}
      {step === 'connected' && <p className="go-connection-note">Simulated connection · Even Realities G2</p>}
      {showCaption && <div className="go-sample">
        <span>Sample caption</span>
        <p aria-live="polite">“{captions[caption]}”</p>
        <button type="button" onClick={() => setCaption(value => (value + 1) % captions.length)}>Next caption</button>
      </div>}
    </div>
    {showGlasses && <img className="go-glasses" src={`${assets}/even-realities-g2.webp`} alt="Even Realities G2 smart glasses" />}
    <div className="go-phone-actions">
      {step === 'welcome' && <>
        <button type="button" onClick={() => next('phone')}>Continue with my phone</button>
        <button type="button" onClick={() => next('check')}>Set up with glasses</button>
      </>}
      {step === 'check' && <>
        <button type="button" onClick={() => next('pair')}>Continue with Even Realities G2</button>
        <button type="button" onClick={() => next('welcome')}>Back</button>
      </>}
      {step === 'pair' && <>
        <button type="button" onClick={() => { setPairingDeferred(false); next('connected') }}>Simulate pairing</button>
        <button type="button" onClick={() => next('help')}>My glasses aren’t showing up</button>
        {pairingDeferred && <button type="button" onClick={() => next('phone')}>Back to captions</button>}
      </>}
      {step === 'help' && <>
        <button type="button" onClick={() => next('pair')}>Try pairing again</button>
        <button type="button" onClick={() => { setPairingDeferred(true); next('phone') }}>Continue on my phone</button>
      </>}
      {step === 'phone' && <>
        <button type="button" onClick={() => next(pairingDeferred ? 'pair' : 'check')}>
          {pairingDeferred ? 'Resume pairing' : 'Set up glasses'}
        </button>
        <button type="button" onClick={restart}>Start over</button>
      </>}
      {step === 'connected' && <button type="button" onClick={restart}>Start over</button>}
    </div>
    <div className="go-phone-handle" aria-hidden="true" />
  </div>
}

function Evidence({ file, alt, caption }: { file: string; alt: string; caption: string }) {
  const url = `${assets}/${file}`
  return <figure className="go-evidence">
    <a href={url} target="_blank" rel="noreferrer" aria-label={`Open full-size image: ${alt}`}>
      <img src={url} alt={alt} loading="lazy" />
    </a>
    <figcaption>{caption}</figcaption>
  </figure>
}

const homepageCaptures = {
  supplied: {
    file: 'homepage-hero.webp',
    alt: 'Selected Glassly homepage with outlined glasses, phone-first miniapp copy and download and demo actions',
    caption: 'Selected Glassly homepage · Selected direction',
  },
  earlier: {
    file: 'website-hero.webp',
    alt: 'Earlier Glassly homepage with an Even Realities G2 image and sample caption',
    caption: 'Earlier website design from the portfolio archive',
  },
  revision: {
    file: 'phone-first-hero.jpg',
    alt: 'Revised homepage with phone-first copy and download and demo actions above the glasses',
    caption: 'Glassly website review branch · Phone-first opening',
  },
}

function HomepageComparison() {
  const [version, setVersion] = useState<keyof typeof homepageCaptures>('supplied')
  return <div className="go-comparison">
    <div className="go-comparison-controls" role="group" aria-label="Homepage comparison">
      <button type="button" aria-pressed={version === 'supplied'} onClick={() => setVersion('supplied')}>Selected homepage</button>
      <button type="button" aria-pressed={version === 'earlier'} onClick={() => setVersion('earlier')}>Earlier design</button>
      <button type="button" aria-pressed={version === 'revision'} onClick={() => setVersion('revision')}>Review branch</button>
    </div>
    <Evidence {...homepageCaptures[version]} />
  </div>
}

function ChapterTitle({ index }: { index: number }) {
  const { id, title, tone } = chapters[index]
  return <h2 className="go-chapter-title" tabIndex={-1} id={`${id}-title`}><span className={`go-dot ${tone}`} aria-hidden="true" />{title}</h2>
}

export default function GlasslyOnboardingPage() {
  const { hash, key } = useLocation()
  useEffect(() => {
    if (!hash) return
    const frame = requestAnimationFrame(() => {
      const section = document.getElementById(hash === '#pairing-recovery' ? 'experience' : hash.slice(1))
      section?.scrollIntoView()
      section?.querySelector<HTMLElement>('h2')?.focus({ preventScroll: true })
    })
    return () => cancelAnimationFrame(frame)
  }, [hash, key])

  return <div className="glassly-onboarding">
    <Helmet>
      <title>Glassly · Designing the first few minutes</title>
      <meta name="description" content="A first-person Glassly case study about the website’s phone-first download path and a proposed glasses setup flow." />
      <meta name="robots" content="noindex" />
    </Helmet>
    <a className="go-skip" href="#experience">Skip to prototype</a>
    <aside className="go-brief">
      <header className="go-header">
        <Link to="/glassly"><img src={`${assets}/logo.svg`} alt="" />Glassly</Link>
        <Link to="/work">All work <span aria-hidden="true">↗</span></Link>
      </header>
      <div className="go-brief-scroll">
        <h1>Designing Glassly’s first few minutes</h1>
        <p className="go-intro">I made the phone-only path clearer on the Glassly homepage, then prototyped how someone could try a miniapp while pairing was still unresolved.</p>
        <Link className="go-inline-action" to="#experience">Try the prototype ↓</Link>
        <dl className="go-meta">
          <div><dt>Contribution</dt><dd>Design & front end</dd></div>
          <div><dt>Scope</dt><dd>Website and setup</dd></div>
          <div><dt>Year</dt><dd>2026</dd></div>
        </dl>
        <nav className="go-chapters" aria-label="Case study chapters">
          <p className="go-label">In this study</p>
          {chapters.map(({ id, title, tone }) => <Link key={id} to={`#${id}`} aria-current={hash === `#${id}` ? 'location' : undefined}>
            <span className={`go-dot ${tone}`} aria-hidden="true" />{title}<span aria-hidden="true">›</span>
          </Link>)}
        </nav>
      </div>
      <footer className="go-side-footer"><Link to="/glassly">Original case study ↗</Link><span>Parth Pawar</span></footer>
    </aside>
    <main className="go-story" id="main-content">
      <div className="go-story-inner">
        <section className="go-opening" id="experience" aria-label="Interactive setup concept">
          <div className="go-opening-top"><span>Onboarding prototype</span><a href="https://glasslyos.com/os">Download Glassly ↗</a></div>
          <p className="go-demo-label">Try it with just your phone or simulate pairing an Even Realities G2.</p>
          <SetupPrototype recoveryRequest={hash === '#pairing-recovery' ? key : null} />
          <p className="go-device-credit">Shown with Even Realities G2</p>
          <div className="go-connector" aria-hidden="true" />
        </section>
        <section className="go-section" id="pain-points" aria-labelledby="pain-points-title">
          <ChapterTitle index={0} />
          <dl className="go-findings">
            <div><dt>Before download</dt><dd>The glasses dominated the homepage. I wanted people to see what they could do on a phone before choosing hardware.</dd></div>
            <div><dt>At download</dt><dd>“Download now” opened a platform chooser. Naming the app made the destination easier to anticipate.</dd></div>
            <div><dt>During pairing</dt><dd>The app offered retry or a return home. I wanted the way forward to say exactly what someone could still do.</dd></div>
          </dl>
          <p className="go-reference">I used Jayson Hahn’s onboarding case study to decide where to look for friction. <a href="https://jayson.studio/2026/onboarding">Read the reference ↗</a></p>
        </section>
        <section className="go-section" id="information-gathering" aria-labelledby="information-gathering-title">
          <ChapterTitle index={1} />
          <div className="go-copy">
            <h3>I followed the path from the homepage to the app.</h3>
            <p>Glassly runs miniapps on a phone and can send captions, directions, and notifications to compatible glasses. The app already offers setup with glasses or a simulated device. In the existing G2 flow, readying the case and disconnecting from the Even Realities app are part of preparing to pair.</p>
          </div>
        </section>
        <section className="go-section" id="goal" aria-labelledby="goal-title">
          <ChapterTitle index={2} />
          <div className="go-goal"><h3>Get to a useful miniapp, with or without glasses.</h3><p>Put the phone path up front. Give people with glasses a clear compatibility and pairing path, plus a way to keep going if they get stuck.</p></div>
        </section>
        <section className="go-section" id="development" aria-labelledby="development-title">
          <ChapterTitle index={3} />
          <div className="go-copy"><h3>Move the actions beside the explanation.</h3><p>The selected homepage puts “Download the app” and “Explore the demo” beside the phone-first explanation. The Store and Android widget sections carry that path further down the page. The comparison also keeps the earlier design and review branch available.</p></div>
          <HomepageComparison />
          <div className="go-copy go-workaround">
            <h3>Keep captions available when pairing stalls.</h3>
            <p>I put the G2 checks where the connection fails. Someone can retry there or open sample captions on their phone. When they’re ready to pair again, the prototype keeps their place in captions and returns them to the G2 connection step.</p>
            <Link className="go-inline-action" to="#pairing-recovery">Try the pairing workaround ↑</Link>
          </div>
          <div className="go-original-demo"><h3>Original website demo</h3><p>The six-scene demo shows what changes on the phone and glasses together.</p><GlasslyDemo /></div>
        </section>
        <section className="go-section" id="impact" aria-labelledby="impact-title">
          <ChapterTitle index={4} />
          <div className="go-copy">
            <h3>What reached review</h3>
            <p>The case study includes the selected homepage and the earlier website review branch. The setup and recovery flow is a portfolio prototype.</p>
            <h3>What I’d test next</h3>
            <p>Ask people with and without glasses to find the right download. Then give them a failed pairing attempt and see whether they can reach captions and resume setup without help. I don’t have results from those sessions yet.</p>
          </div>
        </section>
        <footer className="go-footer">
          <Link to="/glassly">Glassly website and brand case study ↗</Link>
          <a href={`mailto:${CONTACT_EMAIL}`}>Contact Parth ↗</a>
          <Link to="#experience">Back to prototype ↑</Link>
        </footer>
      </div>
    </main>
  </div>
}
