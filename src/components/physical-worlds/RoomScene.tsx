import { useEffect, useRef } from 'react'
import * as T from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { createSceneActivity } from '../../utils/sceneActivity'
import { worlds, type WorldKey } from './catalog'

type Props = { project: WorldKey; values: number[]; dark: boolean; reduced: boolean; cameraView: number; revision: number; resetVersion: number; onChange: (index: number, value: number) => void; onFail: () => void }
type Update = (values: number[], time: number, delta: number) => void
const V = (x: number, y: number, z: number) => new T.Vector3(x, y, z)

export default function RoomScene(props: Props) {
  const hostRef = useRef<HTMLDivElement>(null), latest = useRef(props), wake = useRef<(() => void) | null>(null)
  latest.current = props
  useEffect(() => {
    const host = hostRef.current!
    let renderer: T.WebGLRenderer
    try { renderer = new T.WebGLRenderer({ antialias: true, powerPreference: 'low-power' }) } catch { latest.current.onFail(); return }
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75)); renderer.shadowMap.enabled = true; renderer.shadowMap.type = T.PCFSoftShadowMap
    renderer.toneMapping = T.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.1
    renderer.domElement.setAttribute('role', 'img'); renderer.domElement.setAttribute('aria-label', '3D project room. Use the labeled controls below to interact.')
    host.appendChild(renderer.domElement)
    const scene = new T.Scene(), root = new T.Group(); scene.add(root)
    const camera = new T.PerspectiveCamera(40, 1, .05, 60)
    const cameras = [V(5.4, 3.8, 6.5), V(3.4, 2.8, 4.8), V(.05, 8, .1)]
    if (worlds[props.project]?.kind === 'set') cameras[1].set(4.5,3.5,6)
    camera.position.copy(cameras[0])
    const controls = new OrbitControls(camera, renderer.domElement); controls.target.set(0, 1.1, 0)
    controls.enableDamping = true; controls.dampingFactor = .12; controls.enablePan = false
    controls.minDistance = 3.4; controls.maxDistance = 12; controls.minPolarAngle = .01; controls.maxPolarAngle = Math.PI / 2 - .04
    const materials = new Set<T.Material>(), textures = new Set<T.Texture>()
    const mat = (color: string, roughness = .7, metalness = 0) => { const m = new T.MeshStandardMaterial({ color, roughness, metalness }); materials.add(m); return m }
    const timber = mat('#bb9564'), black = mat('#242621'), silver = mat('#a6aaab', .28, .8), white = mat('#eceade'), clay = mat('#9e9b91')
    const mesh = (geo: T.BufferGeometry, material: T.Material, parent: T.Object3D = root, x = 0, y = 0, z = 0) => {
      const m = new T.Mesh(geo, material); m.position.set(x, y, z); m.castShadow = true; m.receiveShadow = true; parent.add(m); return m
    }
    const box = (w: number, h: number, d: number, m: T.Material, p: T.Object3D = root, x = 0, y = 0, z = 0) => mesh(new T.BoxGeometry(w, h, d), m, p, x, y, z)
    const cylinder = (r: number, h: number, m: T.Material, p: T.Object3D = root, x = 0, y = 0, z = 0, r2 = r) => mesh(new T.CylinderGeometry(r, r2, h, 32), m, p, x, y, z)
    const sphere = (r: number, m: T.Material, p: T.Object3D = root, x = 0, y = 0, z = 0) => mesh(new T.SphereGeometry(r, 20, 12), m, p, x, y, z)
    const rod = (a: T.Vector3, b: T.Vector3, radius = .007, m = silver, p: T.Object3D = root) => {
      const object = cylinder(radius, a.distanceTo(b), m, p); object.position.copy(a).add(b).multiplyScalar(.5); object.quaternion.setFromUnitVectors(V(0,1,0), b.clone().sub(a).normalize()); return object
    }
    const label = (text: string, w: number, h: number, p: T.Object3D = root, x = 0, y = 0, z = 0, color = '#deded4', bg = '#20241e') => {
      const c = document.createElement('canvas'); c.width = 1024; c.height = 256
      const ctx = c.getContext('2d')!; ctx.fillStyle = bg; ctx.fillRect(0,0,1024,256)
      ctx.fillStyle = color; ctx.font = '40px Arial'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(text,512,128)
      const texture = new T.CanvasTexture(c); texture.colorSpace = T.SRGBColorSpace; textures.add(texture)
      const material = new T.MeshBasicMaterial({ map: texture }); materials.add(material)
      return mesh(new T.PlaneGeometry(w,h), material, p,x,y,z)
    }
    let activity: ReturnType<typeof createSceneActivity> | undefined
    const photo = (url: string, w: number, h: number, p: T.Object3D = root, x = 0, y = 0, z = 0) => {
      let plane: T.Mesh
      const texture = new T.TextureLoader().load(url, loaded => {
        const image = loaded.image as HTMLImageElement
        const ratio = image.width / image.height
        if (ratio > w/h) plane.scale.y = w / ratio / h
        else plane.scale.x = h * ratio / w
        activity?.wake()
      }, undefined, () => { if (!disposed) latest.current.onFail() }); texture.colorSpace = T.SRGBColorSpace; textures.add(texture)
      const material = new T.MeshBasicMaterial({map:texture}); materials.add(material)
      plane = mesh(new T.PlaneGeometry(w,h),material,p,x,y,z)
      return plane
    }
    const roomMaterial = mat('#d9d3c6'), floorMaterial = mat('#b3ae9f'), wall2 = mat('#bfc4b7')
    box(9,.06,8,floorMaterial,scene,0,-.06,0)
    box(9,4.8,.09,roomMaterial,scene,0,2.3,-3.1)
    box(.09,4.8,8,wall2,scene,-4.4,2.3,.85)
    for(let i=0;i<12;i++) box(9,.002,.012,mat('#a8a395'),scene,0,-.025,-3.8+i*.65)
    box(9,.08,.035,timber,scene,0,.05,-3.02)
    const hemisphere = new T.HemisphereLight('#fff9ec','#4e5146',2);scene.add(hemisphere)
    const key = new T.DirectionalLight('#fff1d9',3);key.position.set(-3,7,4);key.castShadow=true;key.shadow.mapSize.set(1024,1024)
    key.shadow.camera.left=-5;key.shadow.camera.right=5;key.shadow.camera.top=5;key.shadow.camera.bottom=-5;key.shadow.normalBias=.025;scene.add(key)
    const fill = new T.DirectionalLight('#d7e1f2',1);fill.position.set(4,4,-1);scene.add(fill)
    const table = (width = 3.6, depth = 1.8) => {
      box(width,.08,depth,timber,root,0,.75,0)
      for(const x of [-width/2+.12,width/2-.12])for(const z of [-depth/2+.12,depth/2-.12]) box(.09,.72,.09,black,root,x,.36,z)
    }
    const pickables: T.Object3D[] = []
    const pick = (object: T.Object3D, control: number, value?: number) => { object.userData.control=control;object.userData.value=value;pickables.push(object) }
    const updates: Update[] = []

    if (props.project === 'enigma') {
      table(3.4,1.7)
      const layers=[64,64,46,26], points:T.Vector3[][]=[]
      const nodes = new T.InstancedMesh(new T.SphereGeometry(.047,12,8),new T.MeshStandardMaterial({color:'#ffffff',roughness:.48,emissive:'#e5dfce',emissiveIntensity:.18}),200)
      materials.add(nodes.material as T.Material);nodes.castShadow=true;root.add(nodes)
      const dummy=new T.Object3D();let offset=0
      layers.forEach((count,layer)=>{
        const x=-1.12+layer*.73, top=1.75+layer*.3, cols=layer===3?13:8, rows=Math.ceil(count/cols)
        points[layer]=[]
        for(let i=0;i<count;i++){
          const point=V(x,top-(i%rows)*.13,(Math.floor(i/rows)-(cols-1)/2)*.125)
          points[layer].push(point);dummy.position.copy(point);dummy.updateMatrix();nodes.setMatrixAt(offset++,dummy.matrix)
        }
        for(const z of [-.58,.58]) box(.025,top-.79,.025,black,root,x,(top+.79)/2,z)
        rod(V(x,top+.10,-.58),V(x,top+.10,.58),.012,black)
      })
      const wirePoints:number[]=[]
      for(let layer=0;layer<3;layer++)for(let i=0;i<points[layer].length;i++)for(let branch=0;branch<2;branch++){
        const a=points[layer][i],b=points[layer+1][(i*7+branch*13)%points[layer+1].length];wirePoints.push(a.x,a.y,a.z,b.x,b.y,b.z)
      }
      const geometry=new T.BufferGeometry();geometry.setAttribute('position',new T.Float32BufferAttribute(wirePoints,3))
      const wireMaterial=new T.LineBasicMaterial({color:'#b6b5aa',transparent:true,opacity:.45});materials.add(wireMaterial);root.add(new T.LineSegments(geometry,wireMaterial))
      const tablet=new T.Group();tablet.position.set(0,.85,1.0);tablet.rotation.x=-.5;root.add(tablet)
      box(.8,.52,.035,black,tablet);const display=label('A',.72,.43,tablet,0,0,.023,'#ffffff','#080908')
      for(let i=0;i<26;i++){const node=sphere(.028,white,root,1.12,2.7-(i%2)*.13,(Math.floor(i/2)-6)*.125);node.visible=false;pick(node,0,i)}
      let previous=-1,age=0
      updates.push((values,_time,delta)=>{if(values[0]!==previous){previous=values[0];age=0;const texture=(display.material as T.MeshBasicMaterial).map as T.CanvasTexture;const canvas=texture.image as HTMLCanvasElement;const ctx=canvas.getContext('2d')!;ctx.fillStyle='#080908';ctx.fillRect(0,0,1024,256);ctx.fillStyle='#ffffff';ctx.font='100px Arial';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(String.fromCharCode(65+values[0]),512,128);texture.needsUpdate=true}age=latest.current.reduced?1:age+delta
        let k=0;layers.forEach((count,layer)=>{for(let i=0;i<count;i++){const on=age>layer*.16&&((i*17+values[0]*7+layer*13)%23<6||layer===3&&i===values[0]);nodes.setColorAt(k++,new T.Color(on?'#fff8d8':'#575b56'))}});if(nodes.instanceColor)nodes.instanceColor.needsUpdate=true
      })
      label('ENIGMA · 200 NEURONS',2,.18,root,0,.57,.89)
    }
    if (props.project === 'jugalbandi') {
      table(4.2,2)
      const harp=new T.Group();harp.position.set(-1.15,.80,0);root.add(harp)
      rod(V(-.43,0,0),V(.43,0,0),.04,timber,harp);rod(V(-.43,0,0),V(-.43,1.6,0),.04,timber,harp);rod(V(-.43,1.6,0),V(.43,0,0),.04,timber,harp)
      const strings:T.Mesh[]=[]
      for(let i=0;i<8;i++){const x=-.33+i*.086;const string=rod(V(x,.08,0),V(x,1.40-i*.145,0),.004,silver,harp);pick(string,0);strings.push(string);box(.06,.04,.08,black,harp,x,.08,0)}
      const flute=new T.Group();flute.position.set(.35,.9,.38);root.add(flute)
      const bamboo=cylinder(.05,1.25,timber,flute);bamboo.rotation.z=Math.PI/2
      for(let i=0;i<6;i++){sphere(.025,black,flute,-.42+i*.16,.045,.015);box(.1,.08,.10,black,flute,-.42+i*.16,.12,0)}pick(bamboo,1)
      const rain=new T.Group();rain.position.set(1.4,.79,-.30);root.add(rain)
      for(const x of [-.35,.35])box(.06,1.55,.06,timber,rain,x,.78,0)
      box(.76,.06,.06,timber,rain,0,1.55,0)
      const rainsticks:T.Group[]=[]
      for(const x of [-.35,.35]){const pivot=new T.Group();pivot.position.set(x,.85,0);rain.add(pivot);const stick=cylinder(.045,.8,timber,pivot);pick(stick,2);cylinder(.047,.07,white,pivot,0,.40,0);cylinder(.047,.07,white,pivot,0,-.4,0);rainsticks.push(pivot)}
      label('PLUCK',.55,.14,root,-1.15,.58,1.02);label('BREATH',.55,.14,root,.25,.58,1.02);label('RAIN',.55,.14,root,1.4,.58,1.02)
      updates.push((values,time)=>{strings.forEach((s,i)=>{s.position.z=Math.sin(time*35+i)*.015*(values[0]/100)});rainsticks.forEach((r,i)=>r.rotation.z=(values[2]/100-.5)*1.6*(i?-1:1));flute.position.y=.9+Math.sin(time*5)*.01*values[1]/100})
    }
    if (props.project === 'sea-of-salt') {
      table(3.2,2.2);box(3.2,.035,2.2,black,root,0,.81,0)
      cylinder(.42,.40,white,root,0,1.08,-.25)
      const crank=new T.Group();crank.position.set(0,1.32,-.25);root.add(crank)
      const annulus=new T.Shape();annulus.absarc(0,0,.42,0,Math.PI*2,false);const hole=new T.Path();hole.absarc(0,0,.13,0,Math.PI*2,true);annulus.holes.push(hole)
      const top=mesh(new T.ExtrudeGeometry(annulus,{depth:.06,bevelEnabled:false}),white,crank);top.rotation.x=-Math.PI/2
      cylinder(.045,.2,timber,crank,.28,.1,0)
      box(1.6,.045,.28,black,root,0,.855,.72);box(1.3,.015,.035,silver,root,0,.89,.72)
      const cap=box(.12,.06,.11,white,root,-.65,.92,.72);pick(cap,0)
      label('WHY THE SEA IS SALT',2.0,.20,root,0,.58,1.12)
      const grains=new T.InstancedMesh(new T.IcosahedronGeometry(.015,0),white,900);root.add(grains);const dummy=new T.Object3D();let highest=0
      updates.push((values,time)=>{highest=Math.max(highest,values[0]);grains.count=Math.round(highest*9);cap.position.x=(values[0]/100-.5)*1.3;crank.rotation.y=values[0]/100*Math.PI*8
        for(let i=0;i<grains.count;i++){const angle=i*2.39996,radius=.22+Math.sqrt(i/900)*.8;dummy.position.set(Math.cos(angle)*radius,.845+Math.max(0,.18-radius*.15)+.015*Math.sin(i),-.25+Math.sin(angle)*radius);dummy.rotation.set(i,i*1.2,time*0);dummy.updateMatrix();grains.setMatrixAt(i,dummy.matrix)}grains.instanceMatrix.needsUpdate=true})
    }
    if (props.project === 'moniac-machine') {
      table(2.8,2.1)
      const cabinet=new T.Group();cabinet.position.y=.81;root.add(cabinet)
      box(1.5,.10,1.55,timber,cabinet,0,.05,0)
      for(const x of [-.76,.76])box(.045,1.60,.10,timber,cabinet,x,.83,-.65)
      box(1.56,1.6,.055,timber,cabinet,0,.85,-.70)
      box(1.12,1.35,.045,black,cabinet,0,.94,-.65)
      const screen=new T.Group();screen.position.set(0,.95,-.61);cabinet.add(screen)
      const bars:T.Mesh[]=[]
      for(let i=0;i<7;i++){bars.push(box(.075,.3,.01,mat('#5695a7'),screen,-.38+i*.125,-.2,.02));label(['TAX','SPEND','RATE','INV','CONS','IMP','EXP'][i],.12,.045,screen,-.38+i*.125,-.55,.03)}
      label('MONIAC',.85,.12,cabinet,0,1.54,-.61)
      const valves:T.Group[]=[]
      for(let i=0;i<7;i++){const valve=new T.Group();valve.position.set(-.48+(i%3)*.48,.21, .35-Math.floor(i/3)*.30);cabinet.add(valve)
        cylinder(.07,.12,white,valve,0,-.04,0);const wheel=mesh(new T.TorusGeometry(.11,.014,8,24),white,valve);wheel.rotation.x=-Math.PI/2;pick(wheel,i)
        for(let spoke=0;spoke<5;spoke++)rod(V(0,0,0),V(Math.cos(spoke*Math.PI*2/5)*.11,0,Math.sin(spoke*Math.PI*2/5)*.11),.009,white,valve)
        valves.push(valve)}
      updates.push(values=>{bars.forEach((bar,i)=>{const h=.05+values[i]/100*.75;bar.scale.y=h/.3;bar.position.y=-.48+h/2});valves.forEach((valve,i)=>valve.rotation.y=values[i]/100*Math.PI*2)})
    }
    if (props.project === 'revolving-stage') {
      box(5,.16,4,black,root,0,.10,0)
      const stage=new T.Group();stage.position.y=.48;root.add(stage)
      const platform=cylinder(1.65,.12,timber,stage);pick(platform,0)
      const walls:T.Mesh[]=[]
      walls.push(box(3.1,1.45,.05,mat('#a88c65'),stage,0,.77,0));walls.push(box(.05,1.45,1.45,timber,stage,0,.77,-.72))
      for(const x of [-1.15,-.4,.4,1.15]){box(.45,.53,.025,black,stage,x,1.0,.04);box(.39,.46,.02,mat('#809193'),stage,x,1.0,.057)}
      box(.42,.33,.35,mat('#ba7346'),stage,.65,.23,.72)
      cylinder(.015,.85,silver,stage,1.1,.53,.7)
      const umbrella=mesh(new T.ConeGeometry(.43,.23,8),mat('#963d31'),stage,1.1,1.04,.7);umbrella.rotation.y=.15
      for(let i=0;i<12;i++){const angle=i/12*Math.PI*2;const wheel=cylinder(.11,.08,black,root,Math.cos(angle)*1.15,.30,Math.sin(angle)*1.15);wheel.rotation.z=Math.PI/2;box(.18,.04,.14,silver,root,Math.cos(angle)*1.15,.20,Math.sin(angle)*1.15)}
      cylinder(.12,.40,silver,root,0,.26,0)
      // Auditorium seating remains outside the rotating platform.
      for(let row=0;row<3;row++)for(let seat=0;seat<8;seat++){const x=(seat-3.5)*.48,z=2.2+row*.55;box(.34,.25,.32,mat('#573c36'),root,x,.18,z);box(.34,.35,.06,mat('#573c36'),root,x,.42,z+.14)}
      for(const x of [-2.5,2.5])box(.12,3.2,2.2,mat('#4a3030'),root,x,1.6,-.5)
      const transparentPlatform = new T.MeshStandardMaterial({color:'#bb9564',transparent:true,opacity:.35}); materials.add(transparentPlatform)
      updates.push(values=>{stage.rotation.y=-values[0]*Math.PI/180;walls.forEach(w=>w.visible=values[1]<50);platform.material=values[1]>=50?transparentPlatform:timber})
    }
    if (props.project === 'black-hole') {
      const exhibits=[new T.Group(),new T.Group(),new T.Group()];exhibits.forEach(e=>root.add(e))
      const pedestal=box(3.4,.70,1.9,clay,root,0,.35,0);pedestal.receiveShadow=true
      cylinder(1.05,.18,black,exhibits[0],0,.85,0)
      cylinder(.018,.62,black,exhibits[0],0,1.2,0);sphere(.15,black,exhibits[0],0,1.53,0)
      const clocks:T.Group[]=[],hands:T.Mesh[]=[]
      for(let i=0;i<2;i++){const c=new T.Group();c.position.set(i? .7:-.7,1.02,.40);exhibits[0].add(c);const face=cylinder(.16,.04,white,c);face.rotation.x=Math.PI/2;const rim=mesh(new T.TorusGeometry(.17,.014,8,32),silver,c,0,0,.03);rim.rotation.x=0
        for(let tick=0;tick<12;tick++){const a=tick/12*Math.PI*2;box(.012,.025,.007,black,c,Math.sin(a)*.13,Math.cos(a)*.13,.027)}
        const hand=box(.008,.12,.006,black,c,0,.03,.04);hands.push(hand);clocks.push(c)}
      const fabric=new T.PlaneGeometry(2.3,1.5,35,25);fabric.rotateX(-Math.PI/2)
      const fabricMesh=mesh(fabric,new T.MeshStandardMaterial({color:'#657c73',wireframe:true}),exhibits[1],0,1.1,0);materials.add(fabricMesh.material)
      const mass=sphere(.16,black,exhibits[1],0,.92,0);pick(mass,1)
      for(const x of [-1.15,1.15])for(const z of [-.75,.75])box(.04,.45,.04,black,exhibits[1],x,.93,z)
      const pair=[sphere(.18,black,exhibits[2]),sphere(.18,black,exhibits[2])]
      cylinder(.9,.05,white,exhibits[2],0,.76,0)
      label('BLACK HOLE · PHYSICAL STUDIES',2.8,.18,root,0,.43,.965)
      updates.push((values,time)=>{exhibits.forEach((e,i)=>e.visible=values[0]===i);clocks[1].position.x=.15+values[1]/100*.65;hands[0].rotation.z=-time;hands[1].rotation.z=-time*Math.sqrt(.05+.95*values[1]/100)
        const pos=fabric.attributes.position;for(let i=0;i<pos.count;i++){const radius=Math.hypot(pos.getX(i),pos.getZ(i));pos.setY(i,-(.12+values[1]/100*.35)*Math.exp(-radius*radius*3))}pos.needsUpdate=true
        pair.forEach((s,i)=>{const a=time+i*Math.PI,r=.22+values[1]/100*.55;s.position.set(Math.cos(a)*r,.98,Math.sin(a)*r)})})
    }
    if (props.project === 'uv-light') {
      const stage=box(3.8,.08,2.8,black,root,0,.10,0);stage.receiveShadow=true
      const pictures=[photo('/Assets/Projects/UVLight/photos/screenshot-2023-12-26-at-1.08-1.png',1.3,1.5,root,-1.05,1.7,-1.1),photo('/Assets/Projects/UVLight/photos/screenshot-2023-12-26-at-1.10-1.png',1.3,1.5,root,-1.05,1.7,-1.09),photo('/Assets/Projects/UVLight/photos/image-3.png',1.6,1.1,root,.85,1.8,-1.1)]
      const uv=new T.PointLight('#7958e7',0,6);uv.position.set(0,2.5,0);scene.add(uv)
      const tapeMaterial=new T.MeshStandardMaterial({color:'#e3eb98',emissive:'#d3f24e',emissiveIntensity:0});materials.add(tapeMaterial)
      for(let i=0;i<12;i++){const tape=box(.12,.01,.045,tapeMaterial,root,Math.sin(i*2)*1.4,.15,Math.cos(i*3)*1.1);tape.rotation.y=i}
      label('UV / VISIBLE LIGHT',2,.18,root,0,.45,1.3)
      updates.push(values=>{pictures[0].visible=values[0]<50;pictures[1].visible=values[0]>=50;pictures[2].visible=values[0]>=50;uv.intensity=values[0]/100*3;tapeMaterial.emissiveIntensity=values[0]/100*2})
    }
    if (props.project === 'sculpture') {
      box(2.7,1.96,.25,black,root,0,1.65,-1.35)
      const studies=['/Assets/Projects/Sculpture/5.jpg','/Assets/Projects/Sculpture/4.jpg','/Assets/Projects/Sculpture/3.jpg'].map(url=>photo(url,2.55,1.84,root,0,1.75,-1.205))
      box(2.3,.40,.65,clay,root,0,.20,.55)
      label('SCULPTURE · FORM AND ARMATURE',2.5,.18,root,0,.52,-1.20)
      updates.push(values=>studies.forEach((study,i)=>study.visible=values[0]===i))
    }

    const spec = worlds[props.project]
    if (spec.kind && spec.image) {
      const exhibitLight = new T.PointLight('#fff1cf', 5, 8); exhibitLight.position.set(0,3.6,1); root.add(exhibitLight)
      if (spec.kind === 'screen') {
        table(4,2)
        box(2.85,1.72,.12,black,root,0,1.93,-.35)
        photo(spec.image,2.68,1.50,root,0,1.93,-.28)
        box(.13,.37,.13,silver,root,0,.98,-.35); box(.85,.045,.45,silver,root,0,.80,-.3)
        box(1.10,.025,.40,black,root,-.15,.81,.50)
        for(let row=0;row<4;row++)for(let col=0;col<12;col++)box(.066,.008,.055,clay,root,-.62+col*.083,.832,.36+row*.083)
        const mouse=sphere(.09,white,root,.80,.84,.52);mouse.scale.set(.7,.35,1.1)
        box(.40,.025,.50,white,root,-1.4,.82,.35)
        label(spec.title,2.2,.15,root,0,.58,1.01)
      } else if (spec.kind === 'gallery') {
        box(3.9,2.65,.12,black,root,0,2,-1.25)
        photo(spec.image,3.65,2.40,root,0,2,-1.18)
        box(2.6,.38,.7,clay,root,0,.19,.65)
        label(spec.title,2.8,.19,root,0,.55,-1.17)
      } else if (spec.kind === 'cabinet') {
        const cabinet=mat('#22343d');box(1.9,.65,1.15,cabinet,root,0,.32,0)
        box(1.9,1.2,.85,timber,root,0,1.20,-.15)
        box(1.9,1.2,.16,cabinet,root,0,2.05,-.51)
        photo('/Assets/Projects/the-omakase/photos/game-screen-sushi.webp',1.65,.97,root,0,2.02,-.415)
        box(2,.15,.80,black,root,0,1.05,.37)
        for(let player=0;player<2;player++)for(let key=0;key<4;key++)box(.13,.07,.13,mat(['#d2b258','#cd7970','#86a090','#ede5c4'][key]),root,-.70+player*.94+key*.17,1.16,.43)
        box(2,.30,.18,cabinet,root,0,2.85,-.5);label('THE OMAKASE',1.75,.20,root,0,2.85,-.40)
        photo(spec.image,1.5,1.2,root,-2,1.8,-1.45)
      } else if (spec.kind === 'watch') {
        table(4.1,2.3)
        const dial=new T.Group();dial.position.set(-.8,.86,.15);root.add(dial)
        cylinder(.62,.13,silver,dial);cylinder(.56,.015,mat('#2a5265'),dial,0,.08,0)
        for(let i=0;i<12;i++){const marker=box(.04,.012,.11,white,dial,Math.sin(i*Math.PI/6)*.46,.097,Math.cos(i*Math.PI/6)*.46);marker.rotation.y=i*Math.PI/6}
        for(const z of [-1,1])for(let i=0;i<4;i++)box(.70,.09,.20,silver,dial,0,0,z*(.65+i*.22))
        const hand=new T.Group();dial.add(hand);box(.035,.017,.42,white,hand,0,.12,.18)
        const sundial=cylinder(.45,.045,white,root,.88,.83,.30);rod(V(.88,.86,.3),V(.88,1.20,.12),.025,timber)
        pick(sundial,0);photo(spec.image,2.1,1.1,root,0,2.0,-1.1)
        updates.push(values=>hand.rotation.y=values[0]/100*Math.PI*2)
        label('SHADOW · MECHANISM · CODE',2.5,.18,root,0,.58,1.16)
      } else {
        box(4.8,.12,3.6,black,root,0,.06,0)
        const scenic=mat(props.project==='drowning'?'#536754':'#9f9280')
        for(const x of [-2.2,2.2])box(.09,2.6,.09,scenic,root,x,1.42,-1.5)
        if(props.project==='drowning') {
          for(const x of [-1.1,0,1.1])box(.05,2.6,.05,scenic,root,x,1.42,-1.5)
          rod(V(-2.2,2.72,-1.5),V(0,3.45,-1.5),.04,scenic);rod(V(0,3.45,-1.5),V(2.2,2.72,-1.5),.04,scenic)
          for(let i=0;i<7;i++){cylinder(.16,.2,mat('#785646'),root,-1.8+i*.6,.23,-1);for(let j=0;j<3;j++)rod(V(-1.8+i*.6,.3,-1),V(-1.9+i*.6+Math.sin(j)*.25,.7+j*.13,-1+Math.cos(j)*.2),.013,scenic)}
        } else {
          box(4.4,2.6,.10,scenic,root,0,1.42,-1.55)
          box(.65,.42,.25,black,root,0,1.65,-1.45)
          for(const x of [-1.35,1.35]){box(.7,.12,1.3,timber,root,x,.52,.15);for(const z of [-.3,.6])box(.06,.45,.06,black,root,x,.27,z)}
        }
        photo(spec.image,2.6,1.7,root,0,1.8,-1.20)
        label(spec.title,2.5,.16,root,0,.20,1.84)
      }
      updates.push(values=>{exhibitLight.intensity=.5+values[0]/100*6})
    }

    let lastDark:boolean|undefined, lastRevision=-1, cameraMoving=false, elapsed=0, disposed=false
    const render=(delta:number)=>{
      if(disposed)return
      elapsed+=delta
      const state=latest.current
      if(state.dark!==lastDark){lastDark=state.dark;scene.background=new T.Color(state.dark?'#161b17':'#d5d2c8');roomMaterial.color.set(state.dark?'#343d35':'#d9d3c6');wall2.color.set(state.dark?'#29332c':'#bfc4b7');floorMaterial.color.set(state.dark?'#272d26':'#b3ae9f');hemisphere.intensity=state.dark?.85:2;key.intensity=state.dark?2:3}
      if(state.revision!==lastRevision){lastRevision=state.revision;cameraMoving=true}
      if(cameraMoving){camera.position.lerp(cameras[state.cameraView],state.reduced?1:1-Math.exp(-delta*7));if(camera.position.distanceTo(cameras[state.cameraView])<.01)cameraMoving=false}
      updates.forEach(update=>update(state.values,state.reduced?0:elapsed,delta));controls.update();renderer.render(scene,camera)
    }
    activity=createSceneActivity(host,render,{idleMs:2200,introMs:2200,fps:24,interactionFps:60});wake.current=()=>activity?.wake()
    controls.addEventListener('change',()=>activity?.wake())
    controls.addEventListener('start',()=>{cameraMoving=false})
    const resize=()=>{const w=host.clientWidth,h=host.clientHeight;camera.aspect=w/h;camera.fov=w<600?50:40;camera.updateProjectionMatrix();renderer.setSize(w,h);activity?.wake()}
    const resizeObserver=new ResizeObserver(resize);resizeObserver.observe(host);resize()
    const ray=new T.Raycaster(),pointer=new T.Vector2();let drag:{index:number;startX:number;startValue:number;pointerId:number}|null=null
    const down=(event:PointerEvent)=>{if(event.button!==0||drag)return;const r=renderer.domElement.getBoundingClientRect();pointer.set((event.clientX-r.left)/r.width*2-1,-(event.clientY-r.top)/r.height*2+1);ray.setFromCamera(pointer,camera);const hit=ray.intersectObjects(pickables,true)[0];if(!hit)return;const index=hit.object.userData.control as number,value=hit.object.userData.value as number|undefined;if(value!==undefined){latest.current.onChange(index,value);event.stopImmediatePropagation();return}drag={index,startX:event.clientX,startValue:latest.current.values[index],pointerId:event.pointerId};controls.enabled=false;renderer.domElement.setPointerCapture(event.pointerId);event.stopImmediatePropagation()}
    const move=(event:PointerEvent)=>{if(!drag||drag.pointerId!==event.pointerId)return;const max=props.project==='revolving-stage'?360:100;latest.current.onChange(drag.index,Math.max(0,Math.min(max,drag.startValue+(event.clientX-drag.startX)/host.clientWidth*max*2)))}
    const up=(event:PointerEvent)=>{if(!drag||drag.pointerId!==event.pointerId)return;drag=null;controls.enabled=true;if(renderer.domElement.hasPointerCapture(event.pointerId))renderer.domElement.releasePointerCapture(event.pointerId)}
    renderer.domElement.addEventListener('pointerdown',down,true);renderer.domElement.addEventListener('pointermove',move);renderer.domElement.addEventListener('pointerup',up);renderer.domElement.addEventListener('pointercancel',up)
    const lost=(event:Event)=>{event.preventDefault();latest.current.onFail()};renderer.domElement.addEventListener('webglcontextlost',lost)
    return()=>{disposed=true;wake.current=null;activity?.dispose();resizeObserver.disconnect();controls.dispose();renderer.domElement.removeEventListener('pointerdown',down,true);renderer.domElement.removeEventListener('pointermove',move);renderer.domElement.removeEventListener('pointerup',up);renderer.domElement.removeEventListener('pointercancel',up);renderer.domElement.removeEventListener('webglcontextlost',lost)
      const geometries=new Set<T.BufferGeometry>();scene.traverse(object=>{if(object instanceof T.Mesh||object instanceof T.LineSegments){geometries.add(object.geometry);const ms=Array.isArray(object.material)?object.material:[object.material];ms.forEach(m=>materials.add(m))}});geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());textures.forEach(t=>t.dispose());renderer.dispose();renderer.domElement.remove()}
  },[props.project,props.resetVersion])
  useEffect(()=>{wake.current?.()},[props.values,props.dark,props.revision,props.reduced])
  return <div ref={hostRef} style={{width:'100%',height:'100%'}} />
}
