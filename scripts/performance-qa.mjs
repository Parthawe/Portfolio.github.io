import { execFileSync } from 'node:child_process'
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const base = process.env.QA_BASE_URL || 'http://127.0.0.1:4175'
const directory = mkdtempSync(join(tmpdir(), 'portfolio-lighthouse-'))
const runs = []
for (let run = 1; run <= 3; run++) {
  const file = join(directory, `work-${run}.json`)
  execFileSync('bunx', ['lighthouse@13.4.1', `${base}/work/`, '--output=json', `--output-path=${file}`, '--chrome-flags=--headless --no-sandbox --disable-gpu', '--only-categories=performance,accessibility,best-practices,seo', '--quiet'], { stdio: 'inherit' })
  const result = JSON.parse(readFileSync(file, 'utf8'))
  if (result.runtimeError) throw new Error(result.runtimeError.message)
  runs.push(Object.fromEntries(Object.entries(result.categories).map(([key, value]) => [key, Math.round(value.score * 100)])))
  console.log(`Run ${run}: ${JSON.stringify(runs.at(-1))}`)
}
const median = Object.fromEntries(Object.keys(runs[0]).map(key => [key, runs.map(run => run[key]).sort((a,b) => a-b)[1]]))
const report = { base, checkedAt: new Date().toISOString(), runs, median, rawReports: directory }
writeFileSync(process.env.QA_PERFORMANCE_REPORT_PATH || '/tmp/portfolio-performance.json', JSON.stringify(report, null, 2))
console.log(JSON.stringify(report, null, 2))
if (median.performance < 70 || ['accessibility','best-practices','seo'].some(key => median[key] < 100)) process.exitCode = 1
