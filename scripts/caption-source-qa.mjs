import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createHash } from 'node:crypto'

const evidence = JSON.parse(readFileSync('docs/reviews/caption-source-check/source-evidence.json', 'utf8'))
const hash = path => createHash('sha256').update(readFileSync(path)).digest('hex')
export function parseCaptions(text) {
  assert(text.startsWith('WEBVTT\n'), 'WebVTT header')
  return text.trim().split(/\n\s*\n/).slice(1).filter(block => !block.startsWith('NOTE')).map(block => {
    const [timing, ...lines] = block.split('\n')
    const match = timing.match(/^(\d{2}):(\d{2}):(\d{2})\.(\d{3}) --> (\d{2}):(\d{2}):(\d{2})\.(\d{3})$/)
    assert(match, `valid cue timing: ${timing}`)
    const ms = offset => Number(match[offset]) * 3600000 + Number(match[offset + 1]) * 60000 + Number(match[offset + 2]) * 1000 + Number(match[offset + 3])
    return { start: ms(1), end: ms(5), text: lines.join('\n'), lines }
  })
}
const parsed = new Map()
for (const media of evidence.media) {
  assert.equal(hash(media.path), media.sha256, `${media.name}: original reviewed film unchanged`)
  const text = readFileSync(media.caption, 'utf8'), cues = parseCaptions(text)
  assert(cues.length > 0)
  let end = 0
  for (const cue of cues) {
    assert(cue.start >= end && cue.end > cue.start, `${media.name}: ordered, non-overlapping cues`)
    assert(cue.end <= media.audioDurationMs, `${media.name}: caption ends inside source audio`)
    assert(cue.text.trim() && cue.lines.length <= 2 && cue.lines.every(line => line.length <= 42), `${media.name}: readable caption lines`)
    end = cue.end
  }
  assert(text.includes('review pending'), `${media.name}: keep automatic review limitation`)
  parsed.set(media.name, cues)
}
const at = (name, ms) => parsed.get(name).find(cue => cue.start <= ms && cue.end > ms)?.text.replaceAll('\n', ' ')
assert.equal(at('jugalbandi', 14600), 'we have Parth.')
assert.equal(at('jugalbandi', 274200), 'Keep it going for Parth.')
assert.equal(at('jugalbandi', 278000), 'That was [unclear].')
assert.match(at('jugalbandi', 293000), /rainstick/)
assert.match(at('jugalbandi', 297000), /tanpura/)
assert.match(at('theme-release', 47000), /^Flap your wings/)
for (const time of [21000, 41000, 60000]) assert.match(at('theme-release', time), /\[unclear\]/)
assert(!parsed.get('jugalbandi').some(cue => /tampura/.test(cue.text)))
assert(!parsed.get('theme-release').some(cue => /Slap|radical to|shroud of the leaves|all about man's/.test(cue.text)))
// The visible campaign transcript must describe the same narration as its track.
const source = readFileSync('src/data/campaignCaptions.ts', 'utf8')
const campaign = JSON.parse(source.slice(source.indexOf('= {') + 2))
const normalize = text => text.replace(/[^\p{L}\p{N}]+/gu, ' ').trim().toLowerCase()
for (const [film, entry] of Object.entries(campaign)) {
  const cues = parsed.get(film.replace('.mp4', ''))
  const narration = cues.filter(cue => !/^\[(?:Music|.*ambience.*)\]$/.test(cue.text)).map(cue => cue.text).join(' ')
  assert.equal(normalize(entry.transcript), normalize(narration || cues.map(cue => cue.text).join(' ')), `${film}: HTML transcript matches caption source`)
}
for (const [path, digest] of Object.entries(evidence.protectedFiles)) assert.equal(hash(path), digest, `${path}: protected source unchanged`)
console.log(`PASS: ${evidence.media.length} original films, timed caption bounds/readability, corrected speech, transcript parity, and ${Object.keys(evidence.protectedFiles).length} protected Shuffle/footer/player sources. Human-review warnings retained.`)
