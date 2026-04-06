import { useEffect, useRef, useState, useCallback, forwardRef } from 'react';
import HTMLFlipBook from 'react-pageflip';
// @ts-ignore
import * as pdfjsLib from 'pdfjs-dist/build/pdf.min.mjs';

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString();

/* ─── Single PDF page ─── */
const PageImage = forwardRef<HTMLDivElement, { src: string; pageNum: number; total: number }>(
  ({ src, pageNum, total }, ref) => (
    <div className="book-page" ref={ref}>
      <img src={src} alt={`Page ${pageNum}`} className="book-page-img" draggable={false} />
      <span className="book-page-num">{pageNum} / {total}</span>
    </div>
  )
);
PageImage.displayName = 'PageImage';

/* ─── Main BookViewer ─── */
export default function BookViewer({
  pdfUrl = '/Assets/Imagepdfportfolio.pdf',
  onProgress,
  onReady,
}: {
  pdfUrl?: string;
  onProgress?: (loaded: number, total: number) => void;
  onReady?: () => void;
}) {
  const [pages, setPages] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [dimensions, setDimensions] = useState({ width: 650, height: 840 });
  const flipBookRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const aspectRef = useRef(840 / 650);

  /* Calculate optimal dimensions, large, consume most of the screen */
  const calcDimensions = useCallback((aspect: number) => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    let pageW: number;
    if (vw > 1400) pageW = 900;
    else if (vw > 1200) pageW = 820;
    else if (vw > 900) pageW = Math.min(700, (vw - 80) / 2);
    else if (vw > 600) pageW = Math.min(550, (vw - 48) / 2);
    else pageW = vw - 24;
    const pageH = Math.min(pageW * aspect, vh * 0.88);
    return { width: Math.round(pageW), height: Math.round(pageH) };
  }, []);

  /* Render all PDF pages */
  useEffect(() => {
    let cancelled = false;
    const scale = 2.5;

    async function renderPdf() {
      try {
        const pdf = await pdfjsLib.getDocument(pdfUrl).promise;
        const total = pdf.numPages;
        const rendered: string[] = [];

        const firstPage = await pdf.getPage(1);
        const vp = firstPage.getViewport({ scale: 1 });
        const aspect = vp.height / vp.width;
        aspectRef.current = aspect;
        if (!cancelled) setDimensions(calcDimensions(aspect));

        for (let i = 1; i <= total; i++) {
          if (cancelled) return;
          const page = await pdf.getPage(i);
          const viewport = page.getViewport({ scale });
          const canvas = document.createElement('canvas');
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          const ctx = canvas.getContext('2d')!;
          await page.render({ canvasContext: ctx, viewport }).promise;
          rendered.push(canvas.toDataURL('image/jpeg', 0.88));

          if (!cancelled) onProgress?.(i, total);
        }
        if (!cancelled) { setPages(rendered); setLoading(false); onReady?.(); }
      } catch (err) {
        // PDF render error — fail silently in production
        if (!cancelled) setLoading(false);
      }
    }

    renderPdf();
    return () => { cancelled = true; };
  }, [pdfUrl, calcDimensions]);

  /* Resize handler, debounced */
  useEffect(() => {
    if (!pages.length) return;
    let timer: ReturnType<typeof setTimeout>;
    const handle = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        setDimensions(calcDimensions(aspectRef.current));
      }, 150);
    };
    window.addEventListener('resize', handle);
    return () => {
      window.removeEventListener('resize', handle);
      clearTimeout(timer);
    };
  }, [pages.length, calcDimensions]);

  /* Keyboard navigation */
  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        flipBookRef.current?.pageFlip()?.flipNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        flipBookRef.current?.pageFlip()?.flipPrev();
      }
    };
    window.addEventListener('keydown', handle);
    return () => window.removeEventListener('keydown', handle);
  }, []);

  const onFlip = useCallback((e: any) => { setCurrentPage(e.data); }, []);
  const goNext = () => flipBookRef.current?.pageFlip()?.flipNext();
  const goPrev = () => flipBookRef.current?.pageFlip()?.flipPrev();
  const totalPages = pages.length;
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 700;

  return (
    <div className="book-viewer" ref={containerRef}>
      {/* Book */}
      <div className="book-stage">
        {loading ? (
          <div className="book-loading">
            <div className="book-loading-spinner" />
            <span>Preparing your book...</span>
            <span className="book-loading-sub">62 pages of design work</span>
          </div>
        ) : (
          <div className="book-flip-wrapper">
            {/* @ts-ignore */}
            <HTMLFlipBook
              ref={flipBookRef}
              width={dimensions.width}
              height={dimensions.height}
              size="stretch"
              minWidth={280}
              maxWidth={1100}
              minHeight={380}
              maxHeight={1200}
              showCover={true}
              mobileScrollSupport={true}
              onFlip={onFlip}
              className="book-flipbook"
              style={{}}
              startPage={0}
              drawShadow={true}
              flippingTime={700}
              usePortrait={isMobile}
              startZIndex={0}
              autoSize={false}
              maxShadowOpacity={0.5}
              showPageCorners={true}
              disableFlipByClick={false}
              useMouseEvents={true}
              swipeDistance={20}
              clickEventForward={true}
              renderOnlyPageLengthChange={false}
            >
              {pages.map((src, i) => (
                <PageImage key={i} src={src} pageNum={i + 1} total={totalPages} />
              ))}
            </HTMLFlipBook>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="book-controls">
        <button className="book-ctrl-btn" onClick={goPrev} disabled={currentPage <= 0} aria-label="Previous page">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
          <span>Prev</span>
        </button>

        <div className="book-page-info">
          <span className="book-page-indicator">{currentPage + 1} / {totalPages || '...'}</span>
        </div>

        <button className="book-ctrl-btn" onClick={goNext} disabled={currentPage >= totalPages - 1} aria-label="Next page">
          <span>Next</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
        </button>
      </div>

    </div>
  );
}
