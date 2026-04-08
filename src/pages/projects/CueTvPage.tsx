import { Helmet } from 'react-helmet-async'
import NdaGate from '../../components/NdaGate'
import { NDA_DETAILS_ENABLED } from '../../config/nda'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import ProjectHeader from '../../components/case-study/ProjectHeader'
import ProjectOverview from '../../components/case-study/ProjectOverview'
import CsSection from '../../components/case-study/CsSection'
import CsBody from '../../components/case-study/CsBody'
import CsFeatureGrid from '../../components/case-study/CsFeatureGrid'
import CsSteps from '../../components/case-study/CsSteps'
import CsImage from '../../components/case-study/CsImage'
import CsCredits from '../../components/case-study/CsCredits'
import CsThanks from '../../components/case-study/CsThanks'
import NextProject from '../../components/case-study/NextProject'

export default function CueTvPage() {
  return (
    <>
      <Helmet>
        <title>CueTV &middot; Parth Pawar</title>
        <meta name="description" content="CueTV is an OTT platform for opera, ballet, symphonies, and classical music. Designed the discovery, playback, and retargeting ads system with MonsoonFish." />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="CueTV · Parth Pawar" />
        <meta property="og:description" content="OTT platform for opera, ballet, symphonies, designed discovery, playback, and retargeting ads." />
        <meta property="og:image" content="https://parthpawar.com/Assets/images/cuetv.jpg" />
      </Helmet>

      <Nav />

      <main id="main-content" className="project-main" style={{ '--project-color': '#D53F8C' } as React.CSSProperties}>

        <ProjectHeader
          backLink="/work"
          categorySlug="ux-design"
          backLabel="Back to Work"
          tags={['UX', 'Brand', 'Product']}
          title="CueTV"
          subtitle="Making OTT platform a little more accessible, with a service system"
          info={[
            { label: 'Client', value: 'Operabase' },
            { label: 'Scope of Work', value: 'User Research, Retargeting Ads System' },
            { label: 'Role', value: 'UI Designer & Research' },
            { label: 'Duration', value: '7 Months' },
            { label: 'Year', value: '2022' },
          ]}
          liveUrl="https://www.cuetv.online"
        />

        <CsImage src="/Assets/Projects/CueTV/Desktop/1.jpg" alt="CueTV hero, Making OTT Platform a little more accessible, with a service system. Multi-device mockups showing opera streaming on TV, laptop, tablet, and phone." />

        {/* Overview */}
        <ProjectOverview
          sections={[
            {
              label: 'Summary',
              content: 'CueTV is an OTT platform for connoisseurs and professionals for opera, ballet, symphonies, and classical music. Developed in collaboration with MonsoonFish, the platform provides a seamless streaming experience across all devices \u2014 computers, tablets, smartphones, and smart TVs \u2014 bringing world-class performing arts to audiences globally.',
            },
            {
              label: 'The Challenges',
              content: 'The main challenge was to figure out the target audience and tailor the OTT Platform and the Retargeting Ads for the User Audience.',
            },
            {
              label: 'My Role',
              content: 'As a UI Designer & Research, my role was to get to identify the audience and Create Awareness by helping them engage by using Google, Facebook Ads & giving a smooth experience on the OTT Platform for easy movement from Home to the Opera show they want to watch. Also watch across all screens in HD: computers, tablets, smartphones, and smart TVs.',
            },
          ]}
        />

        {/* Tools */}
        <section className="cs-section reveal">
          <div className="wrap">
            <div className="cs-label-row">
              <span className="cs-label-row-key">Tools &amp; Techniques</span>
              <span className="cs-label-row-val">
                <span className="cs-tags" style={{ margin: 0 }}>
                  <span className="cs-tag-item">Figma</span>
                  <span className="cs-tag-item">Illustrator</span>
                  <span className="cs-tag-item">Premiere Pro</span>
                  <span className="cs-tag-item">After Effects</span>
                  <span className="cs-tag-item">Maze</span>
                  <span className="cs-tag-item">Google Ads Analyser</span>
                  <span className="cs-tag-item">Research</span>
                  <span className="cs-tag-item">Heat-Mapping</span>
                  <span className="cs-tag-item">Experience Design</span>
                </span>
              </span>
            </div>
          </div>
        </section>

        {NDA_DETAILS_ENABLED ? (
        <>

        {/* About CueTV */}
        <section className="cs-section reveal">
          <div className="wrap">
            <h3 className="cs-section-title">About CueTV</h3>
            <p className="cs-display" style={{ fontSize: 'clamp(1.6rem,3.5vw,2.4rem)', marginBottom: '2rem' }}>Live Streaming, And Video On Demand Platform For</p>

            <div className="cs-feature-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
              <div className="cs-feature-card" style={{ textAlign: 'center', background: 'none', border: 'none' }}>
                <div className="cs-feature-card-title" style={{ fontFamily: 'var(--display)', fontSize: 'clamp(1.2rem,2vw,1.5rem)', fontStyle: 'normal' }}>Opera</div>
              </div>
              <div className="cs-feature-card" style={{ textAlign: 'center', background: 'none', border: 'none' }}>
                <div className="cs-feature-card-title" style={{ fontFamily: 'var(--display)', fontSize: 'clamp(1.2rem,2vw,1.5rem)', fontStyle: 'normal' }}>Ballet</div>
              </div>
              <div className="cs-feature-card" style={{ textAlign: 'center', background: 'none', border: 'none' }}>
                <div className="cs-feature-card-title" style={{ fontFamily: 'var(--display)', fontSize: 'clamp(1.2rem,2vw,1.5rem)', fontStyle: 'normal' }}>Symphonies</div>
              </div>
              <div className="cs-feature-card" style={{ textAlign: 'center', background: 'none', border: 'none' }}>
                <div className="cs-feature-card-title" style={{ fontFamily: 'var(--display)', fontSize: 'clamp(1.2rem,2vw,1.5rem)', fontStyle: 'normal' }}>Classical</div>
              </div>
            </div>

            <CsBody>
              <p>Cue TV App Is Built For <strong>Connoisseurs And Professionals.</strong> The Fastest-Growing Playlist With Personalized Recommendations &amp; Collections Of <strong>National Premiers, World Premieres, Concerts, Recitals,</strong> And More.</p>
            </CsBody>
          </div>
        </section>

        <CsImage src="/Assets/Projects/CueTV/Desktop/2.jpg" alt="About CueTV, overview, challenges, role, tools, and genre categories: Opera, Ballet, Symphonies, Classical" />

        {/* Problem Statement */}
        <section className="cs-section reveal">
          <div className="wrap">
            <p className="cs-section-label">Research</p>
            <h3 className="cs-section-title">Problem Statement</h3>
            <p className="cs-section-subtitle" style={{ color: 'var(--project-color, #D53F8C)', marginTop: '1rem' }}>How To</p>

            <CsSteps steps={[
              { num: '1', title: 'Identify Audience', desc: 'Understand who the connoisseurs and professionals are across opera, ballet, classical, and symphonies.' },
              { num: '2', title: 'Create Awareness', desc: 'Reach them through the right channels and messaging.' },
              { num: '3', title: 'Engage User', desc: 'Provide a smooth platform experience that keeps them watching and subscribing.' },
            ]} />

            <h4 className="cs-section-subtitle">Identified Use Cases</h4>
            <CsBody>
              <p>We mapped content along multiple dimensions to understand the full scope of the platform:</p>
            </CsBody>
            <ul className="cs-list">
              <li><strong>By payment:</strong> Free titles, pay-per-view, subscription</li>
              <li><strong>By categories:</strong> Video on demand, livestreams, premieres, master class, entire festivals, competitions</li>
              <li><strong>By genres:</strong> Opera, ballet, classical, drama, documentary</li>
              <li><strong>By content within:</strong> Single title, multiple segments, stand-alone performances, multiple days/events, multiple languages</li>
              <li><strong>By duplicates:</strong> Same title with different companies, same title with same company but different year</li>
              <li><strong>By recognition of title:</strong> Award winners, blockbusters, new or CueTV-featured, highly recognized artists/companies, regular</li>
            </ul>
          </div>
        </section>

        <CsImage src="/Assets/Projects/CueTV/Desktop/3.jpg" alt="Problem statement, How to identify audience, create awareness, engage user. Identified use cases mapped by payment, categories, genres, content, duplicates, and recognition." />

        {/* Process */}
        <section className="cs-section reveal">
          <div className="wrap">
            <p className="cs-section-label">Process</p>
            <h3 className="cs-section-title">Process Ahead</h3>
            <CsBody>
              <p>We structured the design process into three interconnected stages:</p>
            </CsBody>
            <CsSteps steps={[
              { num: '1', title: 'Understand Interaction', desc: 'Understanding how a user would want to interact with it' },
              { num: '2', title: 'Build the System', desc: 'Building a system around it aka, how it will be displayed' },
              { num: '3', title: 'Design Visuals', desc: 'Designing visuals for all required cases & turning them into a template' },
            ]} />
          </div>
        </section>

        <CsImage src="/Assets/Projects/CueTV/Desktop/4.jpg" alt="Process ahead, multi-device platform design for Amazon Fire TV, Apple TV, Roku, Xbox, Android TV, Tizen, iPhone, iPad, and Web" />

        {/* Awareness Strategy */}
        <section className="cs-section reveal">
          <div className="wrap">
            <p className="cs-section-label">Strategy</p>
            <h3 className="cs-section-title">Focusing on Awareness</h3>

            <div className="cs-quote-grid" style={{ marginBottom: '2.5rem' }}>
              <div className="cs-quote-card" style={{ background: 'var(--ink-04)', border: '1px solid var(--ink-12)', borderRadius: '12px' }}>
                <p style={{ color: 'var(--ink)', fontWeight: 600, marginBottom: '0.5rem' }}>Experiment 1</p>
                <p style={{ color: 'var(--ink)' }}>Aim: to understand if collaborating with magazines helps us with awareness.</p>
              </div>
              <div className="cs-quote-card" style={{ background: 'var(--ink-04)', border: '1px solid var(--ink-12)', borderRadius: '12px' }}>
                <p style={{ color: 'var(--ink)', fontWeight: 600, marginBottom: '0.5rem' }}>Experiment 2</p>
                <p style={{ color: 'var(--ink)' }}>Aim: to confirm the set 3 user segment, and see how they react to free trial campaign.</p>
              </div>
              <div className="cs-quote-card" style={{ background: 'var(--ink-04)', border: '1px solid var(--ink-12)', borderRadius: '12px' }}>
                <p style={{ color: 'var(--ink)', fontWeight: 600, marginBottom: '0.5rem' }}>Experiment 3</p>
                <p style={{ color: 'var(--ink)' }}>Aim: to experiment where do the users land after targeting ads and evaluate the response.</p>
              </div>
            </div>

            <h4 className="cs-section-subtitle">Plan of Action</h4>
            <div className="cs-process-flow">
              <span className="cs-process-pill" style={{ background: 'var(--project-color, #D53F8C)' }}>Awareness</span>
              <span className="cs-process-pill" style={{ background: '#4a7c59' }}>Discovery</span>
              <span className="cs-process-pill" style={{ background: 'var(--ink)' }}>Validation</span>
              <span className="cs-process-pill" style={{ background: '#c9a94e' }}>Targeting</span>
              <span className="cs-process-pill" style={{ background: 'var(--ink-08)', color: 'var(--ink)' }}>Yay! We got a Sign Up</span>
            </div>

            <CsBody style={{ marginTop: '2rem' }}>
              <p>The plan followed a four-step loop: Awareness &rarr; Discovery &rarr; Validation &rarr; Targeting, ultimately leading to sign-ups.</p>
            </CsBody>
          </div>
        </section>

        <CsImage src="/Assets/Projects/CueTV/Desktop/5.jpg" alt="Awareness strategy, experiments, plan of action flow (Awareness, Discovery, Validation, Targeting), campaign details, and organic traffic flow" />

        {/* Customer Segments */}
        <CsSection label="Research" title="Customer Segments">
          <CsBody>
            <p>We identified three distinct customer segments, each with different motivations, pain points, and channels to reach them:</p>
          </CsBody>
          <CsFeatureGrid features={[
            { title: 'Set 1 \u2014 Casual Enthusiasts', desc: 'Always been able to afford conventional theatre. Inspired by the experience, socially enriched taste. Values favourites, shows at their fingertips across all screens. Reached through luxury travel, tourism, news, and exclusive printed magazines.' },
            { title: 'Set 2 \u2014 Dedicated Patrons', desc: 'Civically engaged to classical art, up to date on conventional theatres. Inspired by appreciation of art and the finer details. Values range of collections and new shows. Reached through art & music newsletters and forums.' },
            { title: 'Set 3 \u2014 Students & Learners', desc: 'Learning, studying the musicality of art. Inspired by the study of art itself. Values accessibility, free trials, and the vast library. Reached through social media, educational institutions, and instrument apps.' },
            { title: 'Types of Ads', desc: 'Google Ads (responsive, image, video, app promotion), Facebook Ads (carousel, image, instant experience, video, collection), and other networks including Criteo, Skim Links, Out Brain, and AppNexus.' },
          ]} />
        </CsSection>

        <CsImage src="/Assets/Projects/CueTV/Desktop/6.jpg" alt="Customer segments detailed breakdown, 3 sets with motivations, pain points, reach strategies. Types of ads: Google Ads, Facebook Ads, and other networks." />

        {/* 30,000+ Ads */}
        <section className="cs-section reveal">
          <div className="wrap">
            <p className="cs-section-label">Output</p>
            <h3 className="cs-display" style={{ textAlign: 'center' }}><span style={{ color: 'var(--project-color, #D53F8C)', fontSize: 'clamp(3rem,8vw,6rem)' }}>30,000+</span> <span style={{ fontStyle: 'italic' }}>Different Ads</span></h3>
            <CsBody style={{ margin: '0 auto 2rem', textAlign: 'center', maxWidth: '680px' }}>
              <p>We produced over 30,000 different ad creatives tailored to each customer segment and platform, covering shows like Romeo and Juliet, Hercules, Carmen, Der Zwerg, Cinderella, Macbeth, Fortunio, Agrippina, Jake Arditti, and many more.</p>
            </CsBody>

            <h4 className="cs-section-subtitle" style={{ textAlign: 'center' }}>Engagement Results</h4>
            <CsBody style={{ margin: '0 auto', textAlign: 'center', maxWidth: '680px' }}>
              <p>The before-and-after comparison showed a significant uplift in both trialist views and subscriber views after deploying the targeted ad campaigns, with a marked spike in engagement visible from August to September 2021.</p>
            </CsBody>
          </div>
        </section>

        <CsImage src="/Assets/Projects/CueTV/Desktop/7.jpg" alt="30,000+ different ad creatives collage and engagement results chart, before and after comparison showing trialist views and subscriber views growth" />

        {/* Platform Optimization */}
        <CsSection label="Product Design" title="Platform Optimization">
          <CsBody>
            <p>Beyond the ad system, we optimized the CueTV platform experience itself across all touchpoints.</p>
          </CsBody>
          <CsFeatureGrid features={[
            { title: 'Watch Live Streams And Premieres', desc: 'The explore tab surfaces recorded streams, live performances, summer festivals, and premieres from opera houses worldwide \u2014 including titles like Siberia, Nerone, La Traviata, and Moise et Pharaon.' },
            { title: 'Find Musical Works', desc: 'A powerful search experience lets users find specific works like Macbeth with preview clips, full performances, and related works like Lady Macbeth of Mtensk.' },
          ]} />
        </CsSection>

        <CsImage src="/Assets/Projects/CueTV/Desktop/8.jpg" alt="Platform optimization, CueTV mobile app showing explore screen with Siberia opera, and search for Macbeth with results. Watch Live Streams and Find Musical Works." />

        {/* More Features */}
        <section className="cs-section reveal">
          <div className="wrap">
            <CsFeatureGrid features={[
              { title: 'Find Composers', desc: 'Search by composer name like Mozart to discover their full catalogue of available performances and recordings.' },
              { title: 'Find Companies & Festivals', desc: "Search by opera house or festival \u2014 such as the Royal Opera House \u2014 to browse collections including Giselle, The Winter's Tale, Madama Butterfly, The Nutcracker, The Sleeping Beauty, and Alice's Adventures in Wonderland." },
              { title: 'Save And Watch Offline', desc: 'Users can download performances to watch offline, making the platform accessible even without an internet connection.' },
            ]} />
          </div>
        </section>

        <CsImage src="/Assets/Projects/CueTV/Desktop/9.jpg" alt="Platform features continued, find composers (Mozart), find companies and festivals (Royal Opera House), save and watch offline" />

        {/* Credits */}
        <section className="cs-section reveal">
          <div className="wrap">
            <p className="cs-section-label">Team</p>
            <h3 className="cs-section-title">Credits</h3>
            <CsCredits credits={[
              { role: 'UX Lead', name: 'Pranav Gupta' },
              { role: 'Designer', name: 'Parth Pawar' },
            ]} />

            <h4 className="cs-section-subtitle">Tools and Techniques</h4>
            <div className="cs-tags">
              <span className="cs-tag-item">Figma</span>
              <span className="cs-tag-item">Illustrator</span>
              <span className="cs-tag-item">Premiere Pro</span>
              <span className="cs-tag-item">After Effects</span>
              <span className="cs-tag-item">Maze</span>
              <span className="cs-tag-item">Google Ads Analyser</span>
              <span className="cs-tag-item">Research</span>
              <span className="cs-tag-item">Heat-Mapping</span>
              <span className="cs-tag-item">Experience Design</span>
            </div>
          </div>
        </section>

        <CsImage src="/Assets/Projects/CueTV/Desktop/10.jpg" alt="Credits, performance stills from opera, ballet, and classical productions. Thanks for Watching! Typeface: Butler's Slice. Done with MonsoonFish." />

        {/* Reflections */}
        <section className="cs-section reveal">
          <div className="wrap">
            <p className="cs-section-label">Reflections</p>
            <h2 className="cs-section-title">What I Learned</h2>
            <CsBody style={{ maxWidth: '720px' }}>
              <p>CueTV was my first experience designing for a niche audience at scale. The natural instinct was to make the platform feel like Netflix or Spotify&mdash;familiar, broad, optimized for casual browsing. But our users were connoisseurs, not casual viewers. They knew exactly what they wanted (a specific production of Carmen by a specific company) and needed tools to find it precisely, not algorithms to surface it serendipitously.</p>
              <p>The ad system taught me that targeting is a design problem, not just a marketing problem. When you produce 30,000+ ad variations, the creative decisions&mdash;which image, which copy, which CTA&mdash;become a design system unto themselves. I built templates and rules so that every variation maintained brand coherence while speaking to its specific audience segment. This systematic approach to creative production is a skill I have carried into every project since.</p>
              <p><em>Done with MonsoonFish.</em></p>
            </CsBody>
          </div>
        </section>

        <CsThanks contactCta />

        </>
        ) : (
          <NdaGate slug="cuetv" projectName="CueTV" />
        )}

      </main>

      <NextProject slug="org-dashboard" title="OrgDashboard" image="/Assets/images/org-dashboard.png" />
      <Footer />
    </>
  )
}
