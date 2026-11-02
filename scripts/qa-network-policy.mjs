const temporaryStatuses = new Set([502, 503, 504])

function scriptUrl(value, base) {
  try {
    const url = new URL(value, base)
    if (!/^https?:$/.test(url.protocol) || !/\.m?js$/.test(url.pathname)) return null
    url.hash = ''
    return url.href
  } catch { return null }
}

function importFailureUrl(message) {
  const match = message.match(/^(?:TypeError: )?Failed to fetch dynamically imported module: (https?:\/\/\S+)$/)
  return match ? scriptUrl(match[1]) : null
}

/** Read only the observed module chain implicated by a loader error. Parsing
 * never executes a bundle; comments and strings cannot invent dependencies. */
export async function collectModuleDependencies({ httpErrors, consoleErrors, pageErrors, scriptResponses }) {
  if (!httpErrors.some(error => temporaryStatuses.has(error.status) && scriptUrl(error.url))) return []
  const pending = [...consoleErrors.map(error => error.text), ...pageErrors].map(importFailureUrl).filter(Boolean)
  const visited = new Set(), modules = []
  let ts
  while (pending.length) {
    const url = pending.pop()
    if (visited.has(url)) continue
    visited.add(url)
    const response = scriptResponses.get(url)
    if (!response) continue
    try {
      ts ||= (await import('typescript')).default
      const source = ts.createSourceFile(url, await response.text(), ts.ScriptTarget.Latest, false, ts.ScriptKind.JS)
      if (source.parseDiagnostics.length) continue
      const imports = source.statements.flatMap(statement => {
        if (!(ts.isImportDeclaration(statement) || ts.isExportDeclaration(statement))
          || !statement.moduleSpecifier || !ts.isStringLiteral(statement.moduleSpecifier)) return []
        const specifier = statement.moduleSpecifier.text
        if (!/^(?:\.{1,2}\/|\/|https?:\/\/)/.test(specifier)) return []
        const dependency = scriptUrl(specifier, url)
        return dependency && new URL(dependency).origin === new URL(url).origin ? [dependency] : []
      })
      modules.push({ url, imports })
      pending.push(...imports)
    } catch {
      // Missing/closed response bodies leave the failure unexplained: no retry.
    }
  }
  return modules
}

/** Retry a route once only when its failures are explained by temporary HTTP errors. */
export function canRetryTemporaryHttp({ httpErrors, consoleErrors, pageErrors, issues, timedOut, moduleDependencies = [] }) {
  if (!httpErrors.length) return false
  if (httpErrors.some(error => !temporaryStatuses.has(error.status))) return false
  const failedUrls = new Set(httpErrors.map(error => error.url))
  const failedScripts = new Set(httpErrors.map(error => scriptUrl(error.url)).filter(Boolean))
  const dependencies = new Map(moduleDependencies.map(module => [module.url, module.imports]))
  const explainedImportFailure = message => {
    const root = importFailureUrl(message)
    if (!root) return false
    const pending = [root], visited = new Set()
    while (pending.length) {
      const url = scriptUrl(pending.pop())
      if (!url || visited.has(url) || new URL(url).origin !== new URL(root).origin) continue
      visited.add(url)
      if (failedScripts.has(url)) return true
      pending.push(...(dependencies.get(url) || []))
    }
    return false
  }
  if (pageErrors.some(error => !explainedImportFailure(error))) return false
  if (consoleErrors.some(error => !(failedUrls.has(error.url) && /^Failed to load resource:/.test(error.text))
    && !explainedImportFailure(error.text))) return false
  return issues.every(issue => /^Console errors:|^HTTP (502|503|504)\b|^HTTP resources:/.test(issue)
    || (pageErrors.length && /^Page errors:/.test(issue))
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
