/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ELEVENLABS_API_KEY?: string
  readonly VITE_ELEVENLABS_VOICE_ID?: string
  readonly VITE_ENABLE_NDA_DETAILS?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module 'opentype.js' {
  export interface PathCommand {
    type: 'M' | 'L' | 'C' | 'Q' | 'Z'
    x: number
    y: number
    x1?: number
    y1?: number
    x2?: number
    y2?: number
  }

  export interface BoundingBox {
    x1: number
    y1: number
    x2: number
    y2: number
  }

  export interface Path {
    commands: PathCommand[]
    getBoundingBox(): BoundingBox
  }

  export interface Glyph {
    getPath(x: number, y: number, fontSize: number): Path
  }

  export interface Font {
    charToGlyph(char: string): Glyph
  }

  const opentype: {
    load(url: string, callback: (err: Error | null, font: Font | null) => void): void
  }

  export default opentype
}

declare module 'pdfjs-dist/build/pdf.min.mjs' {
  export const GlobalWorkerOptions: {
    workerSrc: string
  }

  export function getDocument(src: string): {
    promise: Promise<{
      numPages: number
      getPage(pageNumber: number): Promise<{
        getViewport(options: { scale: number }): { width: number; height: number }
        render(options: {
          canvasContext: CanvasRenderingContext2D
          viewport: { width: number; height: number }
        }): { promise: Promise<void> }
      }>
    }>
  }
}
