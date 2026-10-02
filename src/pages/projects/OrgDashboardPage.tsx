import { Helmet } from 'react-helmet-async'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import ProjectHeader from '../../components/case-study/ProjectHeader'
import CsExpandPreview from "../../components/case-study/CsExpandPreview"
import ProjectOverview from '../../components/case-study/ProjectOverview'
import CsSection from '../../components/case-study/CsSection'
import CsBody from '../../components/case-study/CsBody'
import CsFeatureGrid from '../../components/case-study/CsFeatureGrid'
import CsSteps from '../../components/case-study/CsSteps'
import CsPullquote from '../../components/case-study/CsPullquote'
import CsCallout from '../../components/case-study/CsCallout'
import CsInfoGrid from '../../components/case-study/CsInfoGrid'
import CsCredits from '../../components/case-study/CsCredits'
import CsThanks from '../../components/case-study/CsThanks'
import BottomNav from '../../components/case-study/BottomNav'
import NextProject from '../../components/case-study/NextProject'

function OrgDashboardArtifact() {
  return (
    <div
      className="org-dashboard-artifact"
      role="img"
      aria-label="OrgDashboard interface showing connected sources, structured company knowledge, and a human approval queue"
    >
      <header className="org-dashboard-artifact__top">
        <strong>OrgDashboard</strong>
        <span>Organization context</span>
        <span className="org-dashboard-artifact__command">Command / K</span>
      </header>

      <div className="org-dashboard-artifact__body">
        <nav className="org-dashboard-artifact__nav" aria-label="Illustrative dashboard navigation">
          <strong>Workspace</strong>
          <span className="is-active">Overview</span>
          <span>Knowledge base</span>
          <span>Integrations</span>
          <span>Action queue</span>
        </nav>

        <section className="org-dashboard-artifact__content">
          <div className="org-dashboard-artifact__heading">
            <div>
              <span>Shared company brain</span>
              <h3>Context every agent can use.</h3>
            </div>
            <span className="org-dashboard-artifact__status"><i /> Sources connected</span>
          </div>

          <div className="org-dashboard-artifact__columns">
            <section className="org-dashboard-artifact__knowledge">
              <header>
                <strong>Knowledge structure</strong>
                <span>Agent-readable</span>
              </header>
              <dl>
                <div><dt>Projects</dt><dd>Owners, status, decisions</dd></div>
                <div><dt>Team</dt><dd>Roles and working context</dd></div>
                <div><dt>SOPs</dt><dd>Shared operating knowledge</dd></div>
              </dl>
            </section>

            <section className="org-dashboard-artifact__actions">
              <header>
                <strong>Human approval</strong>
                <span>External actions</span>
              </header>
              <p>Agents can build internal knowledge. Anything that writes outside the system pauses for review.</p>
              <div><i /> Context and rationale attached</div>
              <div><i /> Final action stays with a person</div>
            </section>
          </div>
        </section>
      </div>
    </div>
  )
}

export default function OrgDashboardPage() {
  return (
    <>
      <Helmet>
        <title>OrgDashboard &middot; Parth Pawar</title>
        <meta name="description" content="OrgDashboard, Designing the SaaS platform that gives AI agents organizational context. Knowledge base, integrations dashboard, and action approval system. Case study by Parth Pawar." />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="OrgDashboard · Parth Pawar" />
        <meta property="og:description" content="SaaS platform that gives AI agents a brain for your company, designing for two users simultaneously." />
        <meta property="og:image" content="https://designwhich.works/Assets/images/org-dashboard.webp" />
      </Helmet>

      <Nav />

      <main id="main-content" className="project-main project-main--org-dashboard" style={{ '--project-color': '#2D3748' } as React.CSSProperties}>

        <ProjectHeader
          backLink="/work"
          categorySlug="ux-design"
          backLabel="Back to Work"
          tags={['SaaS', 'AI', 'Product Design', 'B2B']}
          title="OrgDashboard"
          subtitle="An organizational context platform connecting people, knowledge, and reviewable AI-agent actions."
          info={[
            { label: 'Role', value: 'Designer' },
            { label: 'Type', value: 'SaaS \u00b7 Developer Tools' },
            { label: 'Platform', value: 'Web, CLI, MCP' },
            { label: 'Stack', value: 'React, Tailwind, shadcn/ui' },
            { label: 'Year', value: '2026' },
          ]}
          visualHeroMedia={<OrgDashboardArtifact />}
        />

        <ProjectOverview
          id="cs-problem"
          sections={[
            {
              label: 'The Problem',
              content: 'The design brief addresses repeated context assembly: finding project status, operating procedures, and team knowledge before an agent can propose useful work.',
            },
            {
              label: 'The Solution',
              content: 'A shared knowledge layer pairs structured retrieval for agents with a dashboard where people inspect sources and review proposed external actions.',
            },
          ]}
        />

        <CsExpandPreview>
        <CsSection id="cs-concept" label="Concept" title="Connect context to a reviewable action">
          <CsBody>
            <p>The product addresses a specific workflow problem: agents repeatedly need context from connected company tools, while people need to inspect what an agent plans to change. My design work centers on those two paths: retrieving context and reviewing an action.</p>
            <p>OrgDashboard solves this by creating a persistent, shared knowledge layer. Companies connect their existing tools &mdash; Slack, Linear, QuickBooks, GitHub, PostHog, Google Workspace &mdash; and agents gain organizational awareness through a CLI and MCP server that plugs into any existing harness.</p>
          </CsBody>
          <CsCallout>
            <p>&ldquo;The OrgDashboard CLI is not a standalone agent &mdash; it is an extension to any existing agent harness. When added as an MCP server to Claude Code, Zed, or Cursor, the agent gains organizational awareness without replacing any of the harness&rsquo;s existing tools.&rdquo;</p>
          </CsCallout>
          <div className="cs-slide reveal">
            <OrgDashboardArtifact />
          </div>
          <p className="cs-caption">Illustrative dashboard reconstruction. The left navigation separates sources, knowledge, and the action queue; the main area distinguishes context from actions awaiting review.</p>
        </CsSection>

        <CsSection id="cs-two-users" label="The Design Challenge" title="People and agents need different views">
          <CsBody>
            <p>Agents retrieve structured context through a CLI or API. People need to inspect that same context and decide whether a proposed action should proceed. The two interfaces therefore share names, relationships, and permission boundaries.</p>
          </CsBody>
          <CsPullquote
            quote="If an agent can find it through org kb search, a human should be able to find it through the same logical path in the UI. One data model, two interaction paradigms."
            cite="&mdash; Design principle, OrgDashboard"
          />
          <CsFeatureGrid features={[
            { title: 'AI Agents', desc: 'Operate through CLI commands and MCP tools. Need structured data retrieval, granular KB edits, and a clear action proposal system. Interact programmatically \u2014 every surface must be machine-parseable.' },
            { title: 'Humans', desc: 'Manage, monitor, and approve through the web dashboard. Need visual knowledge exploration, connection management, action queues, and synthesized views of what agents are doing across the org.' },
            { title: 'Shared Knowledge Base', desc: 'Both users read from and write to the same persistent store. The design had to ensure agents could build knowledge incrementally while humans could browse, verify, and correct it visually.' },
            { title: 'Trust Boundary', desc: 'Not all agent actions are safe to auto-approve. The action system needed clear tiers: External actions require review. Internal knowledge edits still need scoped access, provenance, and a recovery path.' },
          ]} />
        </CsSection>

        <CsSection id="cs-decisions" label="Design Decisions" title="Three product decisions">
          <h3 className="cs-section-subtitle">1. Keep retrieval paths consistent</h3>
          <CsBody><p>Projects, team context, and operating procedures use the same structure in the knowledge explorer and agent tools. This lets a reviewer trace a retrieved item without learning a second naming system.</p></CsBody>
          <h3 className="cs-section-subtitle">2. Separate context from authorization</h3>
          <CsBody><p>The overview places the knowledge structure beside the approval queue. Finding information does not grant permission to send a message or change an external system.</p></CsBody>
          <h3 className="cs-section-subtitle">3. Review the proposed change</h3>
          <CsBody><p>A review needs the proposed action, destination, supporting source, and rationale. The design calls for a person to inspect those details before an external write proceeds.</p></CsBody>
          <CsCallout><p><strong>Open evaluation:</strong> test whether a reviewer can identify a wrong destination or stale source. Approval speed alone would not establish that the review interface is safe or understandable.</p></CsCallout>
        </CsSection>

        <CsSection id="cs-system" label="Design System" title="Inspect the system behind each action">
          <CsBody className="cs-body--space-after">
            <p>The design system was built from scratch for a developer-facing SaaS product. Three font families, each with a distinct purpose. A grayscale-first color system. Components that prioritize clarity over personality.</p>
          </CsBody>
          <CsInfoGrid items={[
            { key: 'Heading', value: 'Newsreader' },
            { key: 'Body', value: 'General Sans' },
            { key: 'Mono', value: 'DM Mono' },
            { key: 'Background', value: '#fafafa' },
            { key: 'Foreground', value: '#1c2024' },
            { key: 'Framework', value: 'Tailwind + shadcn/ui' },
          ]} />
          <CsBody><p>Typography separates headings, reading text, and commands. Status treatment is reserved for information a reviewer needs to act on, such as a disconnected source or pending request.</p></CsBody>
        </CsSection>

        <CsSection id="cs-surfaces" label="Product Surfaces" title="Four surfaces in the workflow">
          <CsBody className="cs-body--space-after">
            <p>OrgDashboard lives across four distinct surfaces. Each was designed for its specific context while sharing a unified data model and design language.</p>
          </CsBody>
          <CsSteps steps={[
            { num: '1', title: 'Web Dashboard', desc: 'The human-facing interface. React SPA with Clerk auth, connection management via Composio, knowledge explorer, action approval queue, and synthesized org dashboards. Sidebar navigation keeps org switching in the same workflow.' },
            { num: '2', title: 'CLI', desc: 'The org command that agents use to interact with the platform. Granular KB operations (search, create, update, append, replace), data reading from connected sources, and action proposals. Published to npm.' },
            { num: '3', title: 'MCP Server', desc: 'Maps 1:1 to CLI commands. When added to Claude Code, Zed, or Cursor, the agent gains all OrgDashboard capabilities as native MCP tools. Zero configuration beyond the API key.' },
            { num: '4', title: 'Knowledge Base', desc: 'The shared brain. MongoDB-backed, schema-flexible. Stores entities, SOPs, skills, context, and agent-discovered insights. All writes are versioned with full edit history and rollback capability.' },
          ]} />
        </CsSection>

        <CsSection id="cs-results" label="Results" title="What still needs validation">
          <CsBody>
            <p>OrgDashboard is an early-stage product, so traditional business metrics like revenue or DAU don&rsquo;t tell the full story yet. Instead, we focused on design quality indicators &mdash; signals that the product is solving the right problem in the right way.</p>
          </CsBody>
          <CsFeatureGrid features={[
            { title: 'Task Completion Rate', desc: 'The core review tasks are connecting an integration, searching the knowledge base, and approving an action. A dated protocol and participant-level results are needed before reporting a reliable completion rate.' },
            { title: 'Time to First Value', desc: 'The onboarding target is one connected integration and one useful query. Timing should include authentication, permissions, and any failed connection attempts; the page does not include the underlying timing records.' },
            { title: 'Approval Queue Speed', desc: 'Evaluate whether reviewers understand the recipient, proposed change, and supporting context before approving. Speed alone cannot establish that a decision was correct or confident.' },
            { title: 'What We Haven\u2019t Measured Yet', desc: 'Long-term knowledge compounding, cross-team context reuse, and whether the shared brain model actually reduces repeated context-pasting at scale. These are the metrics that will matter most \u2014 and the ones that need real production usage to validate.' },
          ]} />
        </CsSection>

        <CsSection id="cs-reflections" label="Reflections" title="What Designing for Agents Taught Me">
          <CsBody><p>Sharing a data model makes an agent result easier for a person to inspect. The harder design question is what the reviewer needs before authorizing a change: the source, destination, proposed effect, and a way to recover.</p><p>A recorded task and a review study would be the next evidence to add. The current interface demonstrates the proposed organization of those decisions.</p></CsBody>
        </CsSection>

        <CsSection label="Credits" title="Team">
          <CsCredits credits={[
            { role: 'Designer', name: 'Parth Pawar' },
            { role: 'Scope', name: 'Product Design, Design System, Frontend' },
            { role: 'Stack', name: 'React 19, Tailwind, shadcn/ui, Clerk, Composio' },
            { role: 'Backend', name: 'Bun, Hono, MongoDB, MCP SDK' },
          ]} />
          <CsThanks contactCta className="cs-thanks--separated" />
        </CsSection>

        </CsExpandPreview>

        <BottomNav sections={[
          { id: 'cs-problem', label: 'The Problem' },
          { id: 'cs-concept', label: 'Concept' },
          { id: 'cs-two-users', label: 'Two Users' },
          { id: 'cs-decisions', label: 'Design Decisions' },
          { id: 'cs-system', label: 'Design System' },
          { id: 'cs-surfaces', label: 'Product Surfaces' },
          { id: 'cs-results', label: 'Results' },
          { id: 'cs-reflections', label: 'Reflections' },
        ]} />

      </main>

      <NextProject slug="raahi-project" title="Raahi" image="/Assets/images/raahi.jpg" />
      <Footer />
    </>
  )
}
