/**
 * Figma-style selection overlay: blue border + 4 white-filled corner handles.
 * Place inside any element with className="figma-hover".
 */
export default function FigmaSelect() {
  return (
    <div className="figma-select" aria-hidden="true">
      <div className="figma-select-border" />
      <div className="figma-select-handle figma-select-handle--tl" />
      <div className="figma-select-handle figma-select-handle--tr" />
      <div className="figma-select-handle figma-select-handle--bl" />
      <div className="figma-select-handle figma-select-handle--br" />
    </div>
  )
}
