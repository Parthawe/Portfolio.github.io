/** Centralized site-wide constants. Single source of truth for SEO, metadata, and branding. */

export const SITE_NAME = 'Parth Pawar'
/**
 * Origin that actually serves the deployed site. Every canonical, OG, and
 * schema URL derives from these values.
 */
export const SITE_ORIGIN = 'https://designwhich.works'
export const SITE_BASE = ''
/** Absolute prefix for page routes. The router basename strips SITE_BASE from pathnames. */
export const SITE_URL = `${SITE_ORIGIN}${SITE_BASE}`
export const DEFAULT_OG_IMAGE = '/Assets/images/og-product-designer.png'
export const DEFAULT_DESCRIPTION = 'Portfolio of Parth Pawar, a Product Designer crafting trusted systems across AI wearables, fintech, civic tools, creative technology, and physical interaction.'
export const DEFAULT_OG_IMAGE_ALT = 'Parth Pawar, Product Designer for trusted systems.'
export const THEME_COLOR_LIGHT = '#FAFAF8'
export const THEME_COLOR_DARK = '#111110'
export const CONTACT_EMAIL = 'parthpawar@nyu.edu'
export const RESUME_URL = '/Assets/Application_Resume.pdf'
