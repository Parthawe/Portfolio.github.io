interface NdaGateProps {
  slug: string
  projectName: string
}

export default function NdaGate({ slug, projectName }: NdaGateProps) {
  return (
    <section className="cs-section reveal" data-nda-slug={slug}>
      <div className="wrap">
        <div className="nda-inline">
          <div className="nda-inline-inner">
            <div className="nda-inline-left">
              <div className="nda-inline-icon">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
              <div className="nda-inline-text">
                <span className="nda-inline-label">Protected Case Study</span>
                <p className="nda-inline-desc">
                  The detailed research, flows, and high-fidelity screens for {projectName} are not shipped in the public portfolio because they are covered by NDA.
                </p>
                <p className="nda-inline-contact">
                  Need the full walkthrough? <a href={`mailto:pawarparth99@gmail.com?subject=${encodeURIComponent(`Access request: ${projectName}`)}`}>Request access</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
