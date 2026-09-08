import type { IframeHTMLAttributes } from 'react'

/** External players can be blocked independently of the portfolio. */
export default function ExternalVideo(props: IframeHTMLAttributes<HTMLIFrameElement>) {
  return <>
    <iframe {...props} />
    <a href={props.src} target="_blank" rel="noreferrer" className="external-video-fallback"
      aria-label={`Open ${props.title || 'video'} in a separate tab`}>Open video ↗</a>
  </>
}
