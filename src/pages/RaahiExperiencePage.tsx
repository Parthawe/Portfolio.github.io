import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import ThemeToggle from '../components/ThemeToggle'
import DraftReviewNav from '../components/DraftReviewNav'
import { useDraftReturn } from '../hooks/useDraftReturn'
import '../styles/raahi-experience.css'

const app = 'https://raahi-interactive-20261023.pawar-d-parth.chatgpt.site/'
export default function RaahiExperiencePage() {
  const directory = useDraftReturn()
  return <main id="main-content" className="raahi-experience-page" data-raahi-private-entry>
    <Helmet><title>Raahi · Private working prototype</title><meta name="robots" content="noindex,nofollow" /></Helmet>
    <header><nav aria-label="Experience navigation"><Link to={directory.href}>All experiences</Link><Link to="/raahi-project">Case study</Link></nav><ThemeToggle /></header>
    <section className="raahi-experience-intro"><div><h1>Raahi</h1><p className="raahi-experience-lead">Plan a journey across Pune.</p><p>Try the working browser app, station kiosk and inside-bus display. The app uses selected Pune Metro and feeder references, with estimated timings and demo fares.</p><a className="raahi-experience-launch" href={app+'#/home'} target="_blank" rel="noopener noreferrer">Open private prototype ↗</a><p className="raahi-experience-access">Opens in a new tab. Sign in with the ChatGPT account that owns the preview. The prototype remains private; these screenshots do not grant access.</p><nav className="raahi-experience-surfaces" aria-label="Private prototype views"><a href={app+'#/kiosk'} target="_blank" rel="noopener noreferrer">Open station kiosk ↗</a><a href={app+'#/vehicle'} target="_blank" rel="noopener noreferrer">Open bus display ↗</a></nav></div><figure><img src="/Assets/Projects/Raahi/service-2026/service-mockup.png" alt="Working Raahi kiosk and bus display with a phone demo QR ticket, composed as concept hardware mockups" /><figcaption>Captures from the working prototype. Hardware shown is a concept.</figcaption></figure></section>
    <section className="raahi-experience-guide"><h2>A trip to try</h2><ol><li>Choose <strong>Vanaz</strong> to <strong>EON IT Park</strong>, then select <strong>Find routes</strong>.</li><li>Compare connections, open a route and select <strong>Try this journey</strong>.</li><li>Advance through the stops, create a demo ticket and complete the trip. Find it again in Activity and Insights.</li></ol><p>Vehicle movement is simulated. No money is collected, and tickets are not valid for travel. Kiosk receipts stay separate from the personal wallet.</p><Link to="/raahi-project#cs-service-blueprint">Explore the service blueprint and research</Link></section>
    <DraftReviewNav project="raahi-project" />
  </main>
}
