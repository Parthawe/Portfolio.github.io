import assert from 'node:assert/strict'
import {existsSync,readdirSync,readFileSync,writeFileSync,mkdirSync} from 'node:fs'
import path from 'node:path'
const build=process.env.QA_BUILD_DIR||'dist'
const walk=dir=>readdirSync(dir,{withFileTypes:true}).flatMap(item=>item.isDirectory()?walk(path.join(dir,item.name)):[path.join(dir,item.name)])
for(const forbidden of ['Assets/Projects/MediMorpho/research','Assets/Projects/cuetv-public/refresh/audience-map.png','Assets/Projects/cuetv-public/refresh/mobile-discovery.png'])assert(!existsSync(path.join(build,forbidden)),`private asset excluded: ${forbidden}`)
const text=walk(path.join(build,'bundle')).filter(file=>file.endsWith('.js')).map(file=>readFileSync(file,'utf8')).join('\n')
for(const forbidden of ['/MediMorpho/research/','/cuetv-public/refresh/audience-map.png','/cuetv-public/refresh/mobile-discovery.png','Interpreter wait range cited in the report'])assert(!text.includes(forbidden),`private content not bundled: ${forbidden}`)
assert(existsSync(path.join(build,'Assets/Projects/cuetv-public/refresh/hero-devices.png')))
console.log('Guarded build: public covers retained; research, detailed CueTV screens, reports and source imports excluded.')
