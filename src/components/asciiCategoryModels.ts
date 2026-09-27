import * as THREE from 'three'
import { TeapotGeometry } from 'three/examples/jsm/geometries/TeapotGeometry.js'

export const categoryModels: Record<string, string> = {
  motion: 'reel', ai: 'orbit', 'ai-wearables': 'glasses', 'ux-design': 'knot', ui: 'knot',
  'ux-research': 'lens', 'design-engineering': 'cube', 'design-engineer': 'cube',
  'creative-tech': 'cube', crypto: 'coin', fintech: 'coins',
  brand: 'rings', 'brand-visual': 'rings', 'visual-brand': 'rings',
  installations: 'arch', healthcare: 'cross', 'design-for-good': 'teapot',
}
export const modelNames: Record<string, string> = {
  reel: 'film reel', orbit: 'orbital sphere', glasses: 'glasses', knot: 'torus knot', lens: 'magnifying lens',
  cube: 'engineering frame', coin: 'coin', coins: 'coin stack', rings: 'interlocking rings',
  arch: 'sculptural arch', cross: 'medical cross', teapot: 'Utah teapot',
}

/** Reusable Three.js primitives, assembled and normalized for one shared slot. */
export function createAsciiModel(model: string, material: THREE.Material) {
  const group = new THREE.Group()
  const add = (geometry: THREE.BufferGeometry, position = [0, 0, 0], rotation = [0, 0, 0]) => {
    const mesh = new THREE.Mesh(geometry, material)
    mesh.position.set(...position as [number, number, number])
    mesh.rotation.set(...rotation as [number, number, number])
    group.add(mesh)
    return mesh
  }
  const ring = (radius = .85, tube = .13) => new THREE.TorusGeometry(radius, tube, 16, 80)
  if (model === 'reel') {
    add(ring(.92, .13))
    add(new THREE.CylinderGeometry(.24, .24, .22, 24), [0, 0, 0], [Math.PI / 2, 0, 0])
    for (let index = 0; index < 5; index++) {
      const angle = index * Math.PI * 2 / 5
      add(new THREE.BoxGeometry(.62, .17, .18), [Math.cos(angle) * .54, Math.sin(angle) * .54, 0], [0, 0, angle])
    }
  } else if (model === 'orbit') {
    add(new THREE.SphereGeometry(.45, 32, 20))
    add(ring(1, .075), [0, 0, 0], [.75, .35, 0])
    add(ring(1, .075), [0, 0, 0], [-.75, -.35, .6])
    add(new THREE.SphereGeometry(.14, 16, 12), [1, 0, 0])
  } else if (model === 'glasses') {
    for (const x of [-.62, .62]) {
      const lens = add(ring(.47, .08), [x, 0, 0]); lens.scale.y = .8
      add(new THREE.BoxGeometry(.08, .08, 1), [x * 1.7, .1, -.5])
    }
    add(new THREE.BoxGeometry(.32, .08, .08))
  } else if (model === 'lens') {
    add(ring(.68, .12), [0, .3, 0])
    add(new THREE.CapsuleGeometry(.12, .9, 8, 16), [.68, -.68, 0], [0, 0, .65])
  } else if (model === 'cube') {
    for (const axis of [0, 1, 2]) for (const a of [-.65, .65]) for (const b of [-.65, .65]) {
      const dimensions = [.13, .13, .13]; dimensions[axis] = 1.43
      const position = [a, b]; position.splice(axis, 0, 0)
      add(new THREE.BoxGeometry(...dimensions as [number, number, number]), position)
    }
    add(new THREE.OctahedronGeometry(.48))
  } else if (model === 'coin' || model === 'coins') {
    for (let index = 0; index < (model === 'coin' ? 1 : 3); index++) {
      const y = (index - (model === 'coin' ? 0 : 1)) * .32
      add(new THREE.CylinderGeometry(.8, .8, .17, 64), [0, y, 0])
      add(ring(.7, .045), [0, y + .095, 0], [Math.PI / 2, 0, 0])
      add(new THREE.BoxGeometry(.48, .05, .08), [0, y + .11, 0], [0, -.4, 0])
    }
    group.rotation.x = .85
  } else if (model === 'rings') {
    add(ring(.62, .18), [-.45, 0, 0])
    add(ring(.62, .18), [.45, 0, 0], [Math.PI / 2.8, .25, 0])
  } else if (model === 'arch') {
    add(new THREE.BoxGeometry(.35, 1.6, .5), [-.65, 0, 0])
    add(new THREE.BoxGeometry(.35, 1.6, .5), [.65, 0, 0])
    add(new THREE.BoxGeometry(1.65, .35, .5), [0, .8, 0])
    add(new THREE.SphereGeometry(.32, 24, 16), [0, -.2, 0])
  } else if (model === 'cross') {
    add(new THREE.BoxGeometry(.5, 1.7, .5))
    add(new THREE.BoxGeometry(1.7, .5, .5))
  } else if (model === 'teapot') {
    add(new TeapotGeometry(.64, 12))
  } else {
    add(new THREE.TorusKnotGeometry(.78, .27, 192, 32, 2, 3))
  }
  const bounds = new THREE.Box3().setFromObject(group)
  const center = bounds.getCenter(new THREE.Vector3())
  const size = bounds.getSize(new THREE.Vector3())
  const outer = new THREE.Group()
  group.position.sub(center)
  outer.add(group)
  outer.scale.setScalar((model === 'cube' ? 2.15 : 2.65) / Math.max(size.x, size.y, size.z))
  return outer
}
