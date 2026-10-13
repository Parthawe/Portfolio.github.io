import { useEffect, useRef } from 'react'
import * as T from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { createSceneActivity } from '../../utils/sceneActivity'
import { worlds, type WorldKey } from './catalog'
import { buildJugalbandi } from './JugalbandiModel'
import { buildRevolvingStage } from './RevolvingStageModel'
import { buildMoniac } from './MoniacModel'

type Props = { project: WorldKey; values: number[]; dark: boolean; reduced: boolean; cameraView: number; focus: number; revision: number; resetVersion: number; onReset: () => void; onChange: (index: number, value: number) => void; onFail: () => void }
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
    const cameras = [V(5.4, 3.8, 6.5), V(3.4, 2.8, 4.8), V(0, 8, .001)]
    if (props.project === 'enigma') { cameras[0].set(3.6,3.2,5.4); cameras[1].set(1.8,2.8,4.5) }
    if (props.project === 'moniac-machine') { cameras[0].set(3.0,3.4,4.7); cameras[1].set(1.7,3.0,4.2) }
    if (props.project === 'black-hole') { cameras[0].set(4.0,3.0,5.5); cameras[1].set(2.7,2.4,4.2) }
    if (props.project === 'sea-of-salt') { cameras[0].set(3.3,3.2,4.8); cameras[1].set(2.1,2.6,3.8) }
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
      const c = document.createElement('canvas'); c.width = text.length === 1 ? 256 : 1024; c.height = 256
      const ctx = c.getContext('2d')!; ctx.fillStyle = bg; ctx.fillRect(0,0,1024,256)
      ctx.fillStyle = color; ctx.font = text.length === 1 ? '180px Arial' : '40px Arial'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(text,c.width/2,128)
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
    const openFloor = ['enigma','jugalbandi','moniac-machine','sea-of-salt','black-hole','revolving-stage'].includes(props.project)
    if (!openFloor) {
      box(9,4.8,.09,roomMaterial,scene,0,2.3,-3.1)
      box(.09,4.8,8,wall2,scene,-4.4,2.3,.85)
      box(9,.08,.035,timber,scene,0,.05,-3.02)
    }
    for(let i=0;i<(props.project==='jugalbandi'?0:12);i++) box(9,.002,.012,mat('#a8a395'),scene,0,-.025,-3.8+i*.65)
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

    const woodCanvas = document.createElement('canvas'); woodCanvas.width=256; woodCanvas.height=512
    const woodContext=woodCanvas.getContext('2d')!; woodContext.fillStyle='#d8b984';woodContext.fillRect(0,0,256,512)
    for(let i=0;i<100;i++){woodContext.strokeStyle=`rgba(115,78,38,${.025+(i%7)*.009})`;woodContext.beginPath();for(let y=0;y<=512;y+=16){const x=i*2.6+Math.sin(y*.015+i)*1.5;y?woodContext.lineTo(x,y):woodContext.moveTo(x,y)}woodContext.stroke()}
    const woodTexture=new T.CanvasTexture(woodCanvas); woodTexture.colorSpace=T.SRGBColorSpace; textures.add(woodTexture)
    const plywood=mat('#f0dbc0');plywood.map=woodTexture

    if (props.project === 'enigma') {
      table(3.4,3.2)
      const layers=[64,64,46,26], points:T.Vector3[][]=[]
      const nodes=new T.InstancedMesh(new T.SphereGeometry(.053,14,10),new T.MeshStandardMaterial({color:'#ffffff',roughness:.48,emissive:'#e5dfce',emissiveIntensity:.18}),200)
      materials.add(nodes.material as T.Material);nodes.castShadow=true;root.add(nodes)
      const dummy=new T.Object3D();let offset=0
      layers.forEach((count,layer)=>{
        const z=.6-layer*.56, top=1.86+layer*.28, rows=layer===3?3:6, cols=Math.ceil(count/rows)
        points[layer]=[]
        for(let i=0;i<count;i++){
          const row=layer===3?(i<9?0:i<17?1:2):Math.floor(i/cols)
          const col=layer===3?(row===0?i:row===1?i-9:i-17):i%cols
          const rowCols=layer===3?(row===1?8:9):cols
          const point=V((col-(rowCols-1)/2)*.19,top-row*.17,z)
          points[layer].push(point);dummy.position.copy(point);dummy.updateMatrix();nodes.setMatrixAt(offset++,dummy.matrix)
          if(layer===3){const letter=label(String.fromCharCode(65+i),.13,.09,root,point.x,point.y+.095,z+.057,'#eceade','#242621');pick(letter,0,i);const target=sphere(.071,black,root,point.x,point.y,z);target.visible=false;pick(target,0,i)}
        }
        for(const x of [-1.08,1.08])box(.025,top-.79,.025,black,root,x,(top+.79)/2,z)
        rod(V(-1.08,top+.17,z),V(1.08,top+.17,z),.012,black)
        rod(V(-1.08,.81,z),V(1.08,.81,z),.012,black)
      })
      const wirePoints:number[]=[]
      for(let layer=0;layer<3;layer++)for(let i=0;i<points[layer].length;i++)for(let branch=0;branch<2;branch++){
        const a=points[layer][i],b=points[layer+1][(i*7+branch*13)%points[layer+1].length];wirePoints.push(a.x,a.y,a.z,b.x,b.y,b.z)
      }
      const geometry=new T.BufferGeometry();geometry.setAttribute('position',new T.Float32BufferAttribute(wirePoints,3))
      const wireMaterial=new T.LineBasicMaterial({color:'#b6b5aa',transparent:true,opacity:.35});materials.add(wireMaterial);root.add(new T.LineSegments(geometry,wireMaterial))
      const tablet=new T.Group();tablet.position.set(0,.86,1.12);tablet.rotation.x=-Math.PI*.34;root.add(tablet)
      box(.90,.60,.035,black,tablet);const display=label('A',.81,.50,tablet,0,0,.023,'#ffffff','#080908')
      // Alphabet keys sit in front of the tablet and can also be picked directly.
      for(let i=0;i<26;i++){const row=i<13?0:1,x=(i%13-6)*.13,z=1.35+row*.13;box(.115,.024,.105,black,root,x,.825,z);const key=label(String.fromCharCode(65+i),.10,.085,root,x,.84,z,'#eceade','#242621');key.rotation.x=-Math.PI/2;pick(key,0,i)}
      let previous=-1,age=0
      updates.push((values,_time,delta)=>{if(values[0]!==previous){previous=values[0];age=0;const texture=(display.material as T.MeshBasicMaterial).map as T.CanvasTexture;const canvas=texture.image as HTMLCanvasElement;const ctx=canvas.getContext('2d')!;ctx.fillStyle='#080908';ctx.fillRect(0,0,1024,256);ctx.fillStyle='#ffffff';ctx.font='180px Arial';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(String.fromCharCode(65+values[0]),canvas.width/2,128);texture.needsUpdate=true}age=latest.current.reduced?1:age+delta
        let k=0;layers.forEach((count,layer)=>{for(let i=0;i<count;i++){const on=age>layer*.16&&(layer===3?i===values[0]:(i*17+values[0]*7+layer*13)%23<6);nodes.setColorAt(k++,new T.Color(on?'#fff8d8':'#575b56'))}});if(nodes.instanceColor)nodes.instanceColor.needsUpdate=true
      })
    }
    const jugalbandi = props.project === 'jugalbandi' ? buildJugalbandi({root,plywood,black,silver,white,mat,mesh,box,cylinder,rod,pick}) : null
    if (jugalbandi) {
      updates.push(jugalbandi.update)
      controls.minDistance=1.2;controls.maxDistance=20
    }
    if (props.project === 'sea-of-salt') {
      table(3.2,2.2);box(3.2,.035,2.2,black,root,0,.81,0)
      const shell=mesh(new T.CylinderGeometry(.42,.42,.40,48,1,true),white,root,0,1.08,-.25);(shell.material as T.MeshStandardMaterial).side=T.DoubleSide
      cylinder(.42,.035,white,root,0,.90,-.25)
      const crank=new T.Group();crank.position.set(0,1.27,-.25);root.add(crank)
      const annulus=new T.Shape();annulus.absarc(0,0,.42,0,Math.PI*2,false);const hole=new T.Path();hole.absarc(0,0,.13,0,Math.PI*2,true);annulus.holes.push(hole)
      const top=mesh(new T.ExtrudeGeometry(annulus,{depth:.06,bevelEnabled:true,bevelSegments:1,bevelSize:.002,bevelThickness:.002}),white,crank);top.rotation.x=-Math.PI/2
      const handle=cylinder(.045,.2,plywood,crank,.28,.1,0)
      pick(top,0);pick(handle,0);pick(shell,0);top.userData.dragKind='crank';handle.userData.dragKind='crank';shell.userData.dragKind='crank'
      box(1.6,.045,.28,black,root,0,.855,.72);box(1.3,.015,.035,silver,root,0,.89,.72)
      const cap=box(.12,.06,.11,white,root,-.65,.92,.72);pick(cap,0)
      label('WHY THE SEA IS SALT',2.0,.20,root,0,.58,1.12)
      const grains=new T.InstancedMesh(new T.IcosahedronGeometry(.015,0),white,900);root.add(grains);const dummy=new T.Object3D();let highest=0
      updates.push((values,time)=>{highest=Math.max(highest,values[0]);grains.count=Math.round(highest*9);cap.position.x=(values[0]/100-.5)*1.3;crank.rotation.y=values[0]/100*Math.PI*8
        for(let i=0;i<grains.count;i++){const angle=i*2.39996,radius=.22+Math.sqrt(i/900)*.8;dummy.position.set(Math.cos(angle)*radius,.845+Math.max(0,.18-radius*.15)+.015*Math.sin(i),-.25+Math.sin(angle)*radius);dummy.rotation.set(i,i*1.2,time*0);dummy.updateMatrix();grains.setMatrixAt(i,dummy.matrix)}grains.instanceMatrix.needsUpdate=true})
    }
    const moniac=props.project==='moniac-machine'?buildMoniac({root,plywood,black,silver,white,mat,mesh,box,cylinder,rod,pick}):null
    if(moniac){
      controls.minDistance=2
      pick(moniac.reset,-1)
      const screenCanvas=document.createElement('canvas');screenCanvas.width=768;screenCanvas.height=1024
      const texture=new T.CanvasTexture(screenCanvas);texture.colorSpace=T.SRGBColorSpace;textures.add(texture)
      const screenMaterial=new T.MeshBasicMaterial({map:texture});materials.add(screenMaterial)
      mesh(new T.PlaneGeometry(1.24,1.50),screenMaterial,moniac.display,0,.015,.086)
      let previous=''
      updates.push(values=>{
        moniac.update(values)
        const signature=values.join(',');if(signature===previous)return;previous=signature
        const ctx=screenCanvas.getContext('2d')!
        ctx.fillStyle='#11151a';ctx.fillRect(0,0,768,1024)
        ctx.fillStyle='#e6e8e7';ctx.font='30px Arial';ctx.fillText('MONIAC',42,52);ctx.font='18px Arial';ctx.fillText('POLICY STUDY',42,80)
        // Isometric tanks and the blue outer return channel follow the tablet artwork.
        ctx.strokeStyle='#174866';ctx.lineWidth=28;ctx.lineJoin='round';ctx.beginPath();ctx.moveTo(150,895);ctx.lineTo(78,820);ctx.lineTo(78,170);ctx.lineTo(236,97);ctx.lineTo(400,172);ctx.lineTo(400,868);ctx.lineTo(276,951);ctx.lineTo(150,895);ctx.stroke()
        ctx.strokeStyle='#46b1d5';ctx.lineWidth=17;ctx.stroke()
        const names=['TAX','SPENDING','INTEREST','INVESTMENT','CONSUMPTION','IMPORTS','EXPORTS']
        const tank=(index:number,x:number,y:number,w:number,h:number)=>{
          const dx=26,dy=-19,level=h*values[index]/100
          ctx.fillStyle='#29313a';ctx.strokeStyle='#828e98';ctx.lineWidth=1.5
          ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+dx,y+dy);ctx.lineTo(x+w+dx,y+dy);ctx.lineTo(x+w,y);ctx.closePath();ctx.fill();ctx.stroke()
          ctx.fillStyle='#202b35';ctx.beginPath();ctx.moveTo(x+w,y);ctx.lineTo(x+w+dx,y+dy);ctx.lineTo(x+w+dx,y+h+dy);ctx.lineTo(x+w,y+h);ctx.closePath();ctx.fill();ctx.stroke()
          ctx.fillStyle='#242c35';ctx.fillRect(x,y,w,h);ctx.strokeRect(x,y,w,h)
          ctx.fillStyle='#239bc7';ctx.fillRect(x,y+h-level,w,level)
          ctx.fillStyle='#45bce3';ctx.beginPath();ctx.moveTo(x,y+h-level);ctx.lineTo(x+dx,y+h-level+dy);ctx.lineTo(x+w+dx,y+h-level+dy);ctx.lineTo(x+w,y+h-level);ctx.closePath();ctx.fill()
          ctx.strokeStyle='#9ea9b1';ctx.strokeRect(x,y,w,h)
          ctx.fillStyle='#ecf0ee';ctx.font='22px Arial';ctx.fillText(names[index],x-5,y-36);ctx.font='28px Arial';ctx.fillText(`${Math.round(values[index])}%`,x+12,y+h-22)
          ctx.strokeStyle='#45b0d3';ctx.lineWidth=10;ctx.beginPath();ctx.moveTo(index<2?x+w:400,y+h-10);ctx.lineTo(index<2?400:x,y+h-10);ctx.stroke()
        }
        tank(0,173,231,117,177);tank(1,173,495,117,167);tank(4,497,243,150,163);tank(3,462,511,160,91);tank(5,493,696,130,96);tank(6,450,852,160,85)
        ctx.fillStyle='#dadfdc';ctx.font='20px Arial';ctx.fillText(`INTEREST ${Math.round(values[2])}%`,445,72)
        texture.needsUpdate=true
      })
    }
    const revolvingStage=props.project==='revolving-stage'?buildRevolvingStage({root,plywood,black,silver,white,mat,mesh,box,cylinder,pick}):null
    if(revolvingStage){
      updates.push(values=>revolvingStage.update(values))
      const texture=new T.TextureLoader().load('/Assets/Projects/RevolvingStage/Mobile/3.jpg',()=>activity?.wake())
      texture.colorSpace=T.SRGBColorSpace;texture.repeat.set(210/585,135/1338);texture.offset.set(328/585,(1338-720)/1338);textures.add(texture)
      const gardenMaterial=mat('#ffffff');gardenMaterial.map=texture;revolvingStage.garden.material=gardenMaterial
      controls.maxDistance=22
    }

    if (props.project === 'black-hole') {
      const exhibits=[new T.Group(),new T.Group(),new T.Group()];exhibits.forEach(e=>root.add(e))
      const pedestal=box(3.4,.70,1.9,clay,root,0,.35,0);pedestal.receiveShadow=true
      cylinder(.87,.14,black,exhibits[0],0,.77,0)
      cylinder(.018,.62,black,exhibits[0],0,1.2,0);sphere(.15,black,exhibits[0],0,1.53,0)
      const clocks:T.Group[]=[],hands:T.Group[]=[]
      for(let i=0;i<2;i++){const c=new T.Group();c.position.set(i? .7:-.7,1.28,.35);exhibits[0].add(c);const face=cylinder(.16,.04,white,c);face.rotation.x=Math.PI/2;const rim=mesh(new T.TorusGeometry(.17,.014,8,32),silver,c,0,0,.03);rim.rotation.x=0
        for(let tick=0;tick<12;tick++){const a=tick/12*Math.PI*2;box(.012,.025,.007,black,c,Math.sin(a)*.13,Math.cos(a)*.13,.027)}
        const hand=new T.Group();c.add(hand);box(.009,.12,.006,black,hand,0,.05,.04);sphere(.014,black,c,0,0,.045);hands.push(hand);clocks.push(c);cylinder(.018,.28,silver,c,0,-.29,0);box(.28,.025,.20,black,c,0,-.43,0)}
      const fabric=new T.PlaneGeometry(2.3,1.5,35,25);fabric.rotateX(-Math.PI/2)
      const fabricMesh=mesh(fabric,new T.MeshStandardMaterial({color:'#657c73',wireframe:true}),exhibits[1],0,1.25,0);materials.add(fabricMesh.material)
      const mass=sphere(.16,black,exhibits[1],0,.92,0);pick(mass,1)
      for(const x of [-1.15,1.15])for(const z of [-.75,.75])box(.04,.55,.04,black,exhibits[1],x,.975,z)
      const pair=[sphere(.18,black,exhibits[2]),sphere(.18,black,exhibits[2])]
      cylinder(.9,.05,white,exhibits[2],0,.725,0)
      label('BLACK HOLE · PHYSICAL STUDIES',2.8,.18,root,0,.43,.965)
      updates.push((values,time)=>{exhibits.forEach((e,i)=>e.visible=values[0]===i);const separation=.35+values[1]/100*.45;clocks[0].position.x=-separation;clocks[1].position.x=separation;hands[0].rotation.z=-time;hands[1].rotation.z=-time*Math.sqrt(.05+.95*values[1]/100)
        const pos=fabric.attributes.position;for(let i=0;i<pos.count;i++){const radius=Math.hypot(pos.getX(i),pos.getZ(i));pos.setY(i,-(.12+values[1]/100*.35)*Math.exp(-radius*radius*3))}pos.needsUpdate=true;mass.position.y=1.25-(.12+values[1]/100*.35)+.16
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

    const target = controls.target.clone(), destination = camera.position.clone()
    let lastDark:boolean|undefined, lastMechanism=false, lastRevision=-1, cameraMoving=false, elapsed=0, disposed=false
    const render=(delta:number)=>{
      if(disposed)return
      elapsed+=delta
      const state=latest.current
      if(revolvingStage&&(state.values[1]>15)!==lastMechanism){lastMechanism=state.values[1]>15;lastRevision=-1}
      if(state.dark!==lastDark){lastDark=state.dark;scene.background=new T.Color(state.dark?'#161b17':'#d5d2c8');roomMaterial.color.set(state.dark?'#343d35':'#d9d3c6');wall2.color.set(state.dark?'#29332c':'#bfc4b7');floorMaterial.color.set(state.dark?'#272d26':'#b3ae9f');hemisphere.intensity=state.dark?.85:2;key.intensity=state.dark?2:3}
      if(state.revision!==lastRevision){
        lastRevision=state.revision;cameraMoving=true
        target.set(0,1.1,0);destination.copy(cameras[state.cameraView])
        if(moniac&&state.cameraView!==2){
          target.set(0,1.05,0)
          const direction=(state.cameraView===1?V(.06,.48,1):V(.43,.38,1)).normalize()
          const vertical=T.MathUtils.degToRad(camera.fov/2),horizontal=Math.atan(Math.tan(vertical)*camera.aspect)
          const right=V(0,1,0).cross(direction).normalize(),up=direction.clone().cross(right).normalize()
          let distance=1
          for(const x of[-1,1])for(const y of[0,2.25])for(const z of[-1,1]){
            const point=V(x,y,z).sub(target),depth=point.dot(direction)
            distance=Math.max(distance,Math.abs(point.dot(right))/Math.tan(horizontal)+depth,Math.abs(point.dot(up))/Math.tan(vertical)+depth)
          }
          destination.copy(target).add(direction.multiplyScalar(1.13*distance))
        }
        if(revolvingStage){
          const mechanism=state.values[1]>15
          target.set(0,mechanism?.55:1.55,0)
          const direction=(state.cameraView===2?V(0,1,.001):state.cameraView===1?V(.08,.20,1):V(.46,.32,1)).normalize()
          const vertical=T.MathUtils.degToRad(camera.fov/2),horizontal=Math.atan(Math.tan(vertical)*camera.aspect)
          const right=V(0,1,0).cross(direction).normalize(),up=direction.clone().cross(right).normalize()
          let distance=1
          for(const x of[-2.6,2.6])for(const y of[0,mechanism?1.3:3.3])for(const z of[-2.6,2.6]){
            const point=V(x,y,z).sub(target),depth=point.dot(direction)
            distance=Math.max(distance,Math.abs(point.dot(right))/Math.tan(horizontal)+depth,Math.abs(point.dot(up))/Math.tan(vertical)+depth)
          }
          destination.copy(target).add(direction.multiplyScalar(distance*1.08))
        }
        if(jugalbandi){
          jugalbandi.instruments.forEach((instrument,i)=>instrument.visible=state.focus===0||state.focus===i+1)
          root.updateMatrixWorld(true)
          const bounds=new T.Box3()
          jugalbandi.instruments.filter(instrument=>instrument.visible).forEach(instrument=>bounds.union(new T.Box3().setFromObject(instrument)))
          if(state.focus===3){bounds.copy(jugalbandi.instruments[2].userData.focusBounds).applyMatrix4(jugalbandi.instruments[2].matrixWorld)}
          bounds.getCenter(target)
          const vertical=T.MathUtils.degToRad(camera.fov/2),horizontal=Math.atan(Math.tan(vertical)*camera.aspect)
          const direction=(state.cameraView===2?V(0,1,.001):state.cameraView===1?(state.focus===3?V(.22,.72,1):state.focus===1?V(.38,.28,1):V(.18,.12,1)):V(.38,.32,1)).normalize()
          const right=V(0,1,0).cross(direction).normalize(),up=direction.clone().cross(right).normalize()
          let distance=1.2
          for(const x of[bounds.min.x,bounds.max.x])for(const y of[bounds.min.y,bounds.max.y])for(const z of[bounds.min.z,bounds.max.z]){
            const point=V(x,y,z).sub(target),depth=point.dot(direction)
            distance=Math.max(distance,Math.abs(point.dot(right))/Math.tan(horizontal)+depth,Math.abs(point.dot(up))/Math.tan(vertical)+depth)
          }
          destination.copy(target).add(direction.multiplyScalar(distance*1.12))
        }
      }
      if(cameraMoving){camera.position.lerp(destination,state.reduced?1:1-Math.exp(-delta*7));controls.target.lerp(target,state.reduced?1:1-Math.exp(-delta*7));if(camera.position.distanceTo(destination)<.01&&controls.target.distanceTo(target)<.01)cameraMoving=false}
      updates.forEach(update=>update(state.values,state.reduced?0:elapsed,delta));controls.update();renderer.render(scene,camera)
    }
    activity=createSceneActivity(host,render,{idleMs:2200,introMs:2200,fps:24,interactionFps:60});wake.current=()=>activity?.wake()
    controls.addEventListener('change',()=>activity?.wake())
    controls.addEventListener('start',()=>{cameraMoving=false})
    const resize=()=>{const w=host.clientWidth,h=host.clientHeight;camera.aspect=w/h;camera.fov=w<600?50:40;camera.updateProjectionMatrix();renderer.setSize(w,h);if(jugalbandi||revolvingStage||moniac)lastRevision=-1;activity?.wake()}
    const resizeObserver=new ResizeObserver(resize);resizeObserver.observe(host);resize()
    const ray=new T.Raycaster(),pointer=new T.Vector2();let drag:{index:number;startX:number;startValue:number;pointerId:number;crank?:boolean;angle?:number;turn?:number}|null=null
    const crankPlane=new T.Plane(V(0,1,0),-1.33),crankPoint=new T.Vector3()
    const crankAngle=(event:PointerEvent)=>{const r=renderer.domElement.getBoundingClientRect();pointer.set((event.clientX-r.left)/r.width*2-1,-(event.clientY-r.top)/r.height*2+1);ray.setFromCamera(pointer,camera);return ray.ray.intersectPlane(crankPlane,crankPoint)?Math.atan2(crankPoint.z+.25,crankPoint.x):null}
    const down=(event:PointerEvent)=>{if(event.button!==0||drag)return;const r=renderer.domElement.getBoundingClientRect();pointer.set((event.clientX-r.left)/r.width*2-1,-(event.clientY-r.top)/r.height*2+1);ray.setFromCamera(pointer,camera);const hit=ray.intersectObjects(pickables,true).find(hit=>{let object:T.Object3D|null=hit.object;while(object){if(!object.visible)return false;object=object.parent}return true});if(!hit)return;if(hit.object.userData.reset){latest.current.onReset();event.stopImmediatePropagation();return}let picked:T.Object3D=hit.object;while(picked.userData.control===undefined&&picked.parent)picked=picked.parent;const index=picked.userData.control as number,value=picked.userData.value as number|undefined;if(value!==undefined){latest.current.onChange(index,value);event.stopImmediatePropagation();return}const crank=hit.object.userData.dragKind==='crank';drag={index,startX:event.clientX,startValue:latest.current.values[index],pointerId:event.pointerId,crank,angle:crank?(crankAngle(event)??0):undefined,turn:0};controls.enabled=false;renderer.domElement.setPointerCapture(event.pointerId);event.stopImmediatePropagation()}
    const move=(event:PointerEvent)=>{if(!drag||drag.pointerId!==event.pointerId)return;if(drag.crank){const angle=crankAngle(event);if(angle===null)return;let delta=angle-drag.angle!;if(delta>Math.PI)delta-=Math.PI*2;if(delta<-Math.PI)delta+=Math.PI*2;drag.angle=angle;drag.turn!-=delta;latest.current.onChange(drag.index,Math.max(0,Math.min(100,drag.startValue+drag.turn!/(Math.PI*8)*100)));return}const max=props.project==='revolving-stage'&&drag.index===0?360:100;latest.current.onChange(drag.index,Math.max(0,Math.min(max,drag.startValue+(event.clientX-drag.startX)/host.clientWidth*max*2)))}
    const up=(event:PointerEvent)=>{if(!drag||drag.pointerId!==event.pointerId)return;drag=null;controls.enabled=true;if(renderer.domElement.hasPointerCapture(event.pointerId))renderer.domElement.releasePointerCapture(event.pointerId)}
    renderer.domElement.addEventListener('pointerdown',down,true);renderer.domElement.addEventListener('pointermove',move);renderer.domElement.addEventListener('pointerup',up);renderer.domElement.addEventListener('pointercancel',up);renderer.domElement.addEventListener('lostpointercapture',up)
    const lost=(event:Event)=>{event.preventDefault();latest.current.onFail()};renderer.domElement.addEventListener('webglcontextlost',lost)
    return()=>{disposed=true;wake.current=null;activity?.dispose();resizeObserver.disconnect();controls.dispose();renderer.domElement.removeEventListener('pointerdown',down,true);renderer.domElement.removeEventListener('pointermove',move);renderer.domElement.removeEventListener('pointerup',up);renderer.domElement.removeEventListener('pointercancel',up);renderer.domElement.removeEventListener('lostpointercapture',up);renderer.domElement.removeEventListener('webglcontextlost',lost)
      const geometries=new Set<T.BufferGeometry>();scene.traverse(object=>{if(object instanceof T.Mesh||object instanceof T.LineSegments){geometries.add(object.geometry);const ms=Array.isArray(object.material)?object.material:[object.material];ms.forEach(m=>materials.add(m))}});geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());textures.forEach(t=>t.dispose());renderer.dispose();renderer.domElement.remove()}
  },[props.project,props.resetVersion])
  useEffect(()=>{wake.current?.()},[props.values,props.dark,props.revision,props.reduced])
  return <div ref={hostRef} style={{width:'100%',height:'100%'}} />
}
