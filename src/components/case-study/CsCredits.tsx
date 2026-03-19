interface CsCreditsProps {
  credits: { role: string; name: string }[];
  style?: React.CSSProperties;
}

export default function CsCredits({ credits, style }: CsCreditsProps) {
  return (
    <div className="cs-credits" style={style}>
      {credits.map((c) => (
        <div key={c.role} className="cs-credit-item">
          <span className="cs-credit-role">{c.role}</span>
          <span className="cs-credit-name">{c.name}</span>
        </div>
      ))}
    </div>
  );
}
