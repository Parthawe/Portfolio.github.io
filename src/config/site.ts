/** Centralized site-wide constants. Single source of truth for SEO, metadata, and branding. */

export const SITE_NAME = 'Parth Pawar'
/**
 * Origin that actually serves the deployed site. If a custom domain is wired
 * up later, update SITE_ORIGIN (and SITE_BASE if the domain serves from the
 * root) — every canonical, OG, and schema URL derives from these two values.
 */
export const SITE_ORIGIN = 'https://parthawe.github.io'
export const SITE_BASE = '/Portfolio.github.io'
/** Absolute prefix for page routes. The router basename strips SITE_BASE from pathnames. */
export const SITE_URL = `${SITE_ORIGIN}${SITE_BASE}`
export const DEFAULT_OG_IMAGE = '/Portfolio.github.io/Assets/images/mentra.webp'
export const CONTACT_EMAIL = 'parthpawar@nyu.edu'
export const RESUME_URL = '/Portfolio.github.io/Assets/Application_Resume.pdf'
