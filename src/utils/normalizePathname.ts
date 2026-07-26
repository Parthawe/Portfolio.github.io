/**
 * Return a route key without query/hash fragments or leading/trailing slashes.
 * The empty string represents the site root.
 */
export function normalizePathname(value: string): string {
  return value
    .split(/[?#]/, 1)[0]
    .replace(/^\/+|\/+$/g, '')
}

/** Return the canonical client pathname for a route key. */
export function toCanonicalPathname(value: string): string {
  const route = normalizePathname(value)
  return route ? `/${route}` : '/'
}
