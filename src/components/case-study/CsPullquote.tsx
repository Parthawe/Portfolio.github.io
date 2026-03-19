interface CsPullquoteProps {
  quote: string;
  cite?: string;
}

export default function CsPullquote({ quote, cite }: CsPullquoteProps) {
  return (
    <blockquote className="cs-pullquote">
      <p>{quote}</p>
      {cite && <cite>{cite}</cite>}
    </blockquote>
  );
}
