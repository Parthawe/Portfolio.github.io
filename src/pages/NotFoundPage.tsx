import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

export function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title>404 · Parth Pawar</title>
      </Helmet>
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">
        <h1 className="font-display text-6xl font-bold tracking-tight">404</h1>
        <p className="text-ink-40">Page not found.</p>
        <Link
          to="/"
          className="mt-4 font-mono text-sm text-ink-40 underline decoration-ink-15 underline-offset-4 transition-colors hover:text-ink"
        >
          Go home
        </Link>
      </div>
    </>
  )
}
