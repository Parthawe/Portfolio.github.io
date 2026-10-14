const temporaryStatuses = new Set([502, 503, 504])

/** Retry a route once only when its failures are explained by temporary HTTP errors. */
export function canRetryTemporaryHttp({ httpErrors, consoleErrors, pageErrors, issues, timedOut }) {
  if (!httpErrors.length || pageErrors.length) return false
  if (httpErrors.some(error => !temporaryStatuses.has(error.status))) return false
  const failedUrls = new Set(httpErrors.map(error => error.url))
  if (consoleErrors.some(error => !failedUrls.has(error.url)
    || !/^Failed to load resource:/.test(error.text))) return false
  return issues.every(issue => /^Console errors:|^HTTP (502|503|504)\b|^HTTP resources:/.test(issue)
    || (timedOut && /timeout/i.test(issue)))
}

/** A Pages outage can return HTML with a temporary status before React boots.
 * Retry that document once; permanent HTTP errors and browser errors still fail.
 */
export async function navigateWithTemporaryRetry(page, url, options) {
  const response = await page.goto(url, options)
  if (!response || !temporaryStatuses.has(response.status())) return response
  console.warn(`Temporary document HTTP ${response.status()} at ${url}; retrying once.`)
  await page.waitForTimeout(1000)
  return page.goto(url, options)
}
