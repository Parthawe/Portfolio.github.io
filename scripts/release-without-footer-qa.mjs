import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { readFileSync, existsSync, readdirSync } from 'node:fs'
const baseline = process.env.QA_BASE_REV || '39d242d'
for (const file of ['src/components/Footer.tsx','src/components/FooterContent.tsx','src/styles/footer.css']) {
  const original = execFileSync('git',['show',`${baseline}:${file}`])
  assert.deepEqual(readFileSync(file), original, `${file} must match the deployed footer`)
}
for (const path of ['src/components/FooterCrowd.tsx','src/components/FooterScene.tsx','src/components/footer-worlds','src/data/footerScenes.ts','src/styles/footer-crowd.css','src/styles/footer-scene.css','public/Assets/footer-crowd','public/Assets/footer-worlds']) assert(!existsSync(path), `Unapproved footer excluded: ${path}`)
for (const path of readdirSync('dist/bundle').filter(name=>/\.(js|css)$/.test(name))) assert(!/open-peeps-sheet|footer-crowd__|footer-world__|footer-scene__/.test(readFileSync(`dist/bundle/${path}`,'utf8')),`No experimental footer in ${path}`)
assert(!existsSync('dist/Assets/footer-crowd'))
assert(!existsSync('dist/Assets/footer-worlds'))
console.log('Footer release boundary passed: production source identical; experimental code, artwork and bundle strings absent.')
