interface CsThanksProps {
  style?: React.CSSProperties;
  contactCta?: boolean;
}

export default function CsThanks({ style, contactCta }: CsThanksProps) {
  return (
    <section className="cs-section cs-thanks reveal" style={style}>
      <div className="wrap">
        <h2 className="cs-thanks-title">Thank You</h2>
        {contactCta && (
          <p className="cs-thanks-cta">
            Please contact me to view a detailed case study
          </p>
        )}
        {contactCta && (
          <a href="mailto:parthpawar@nyu.edu" className="cs-thanks-btn">
            Get in Touch
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 12L12 2M12 2H5M12 2V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </a>
        )}
      </div>
    </section>
  );
}
