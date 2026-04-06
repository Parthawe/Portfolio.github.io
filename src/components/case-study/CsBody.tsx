import type { ReactNode } from "react";

interface CsBodyProps {
  children: ReactNode;
  style?: React.CSSProperties;
}

export default function CsBody({ children, style }: CsBodyProps) {
  return (
    <div className="cs-body reveal" style={style}>
      {children}
    </div>
  );
}
