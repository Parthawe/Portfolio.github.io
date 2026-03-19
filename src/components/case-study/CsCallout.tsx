import type { ReactNode } from "react";

interface CsCalloutProps {
  children: ReactNode;
  style?: React.CSSProperties;
}

export default function CsCallout({ children, style }: CsCalloutProps) {
  return (
    <div className="cs-callout" style={style}>
      {children}
    </div>
  );
}
