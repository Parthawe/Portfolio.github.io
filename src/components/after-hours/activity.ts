/** One page-scoped RAF driver, robust to stale visibility after viewport/reflow capture. */
export function illustratedActivity(element: HTMLElement, draw: (time:number)=>void, keepRunning=()=>true) {
  let disposed=false,frame=0,previous=0,elapsed=0,lastTick=0
  const inView=()=>{
    if(document.hidden)return false
    const r=element.getBoundingClientRect()
    return r.width>0&&r.height>0&&r.bottom>0&&r.right>0&&r.top<innerHeight&&r.left<innerWidth
  }
  const stop=()=>{cancelAnimationFrame(frame);frame=0;previous=0}
  const tick=(now:number)=>{
    frame=0
    if(disposed||!inView()){previous=0;return}
    lastTick=now;elapsed+=previous?Math.min(now-previous,80):1000/60;previous=now
    draw(elapsed)
    if(keepRunning())frame=requestAnimationFrame(tick)
    else previous=0
  }
  const wake=()=>{
    if(disposed)return
    if(!inView()){stop();return}
    // A browser can strand an outstanding RAF during viewport emulation/reflow.
    // Recover on a real wake event; no polling timer or second animation loop.
    if(frame&&performance.now()-lastTick<120)return
    if(frame)cancelAnimationFrame(frame)
    frame=requestAnimationFrame(tick)
  }
  const intersection=new IntersectionObserver(()=>{if(inView())wake();else stop()})
  intersection.observe(element)
  const resize=new ResizeObserver(wake);resize.observe(element)
  const events=['pointerenter','pointerleave','pointermove','pointerdown','pointerup','click','keydown','keyup','focusin'] as const
  events.forEach(event=>element.addEventListener(event,wake))
  document.addEventListener('visibilitychange',wake);window.addEventListener('resize',wake)
  wake()
  return{wake,dispose(){disposed=true;stop();intersection.disconnect();resize.disconnect();events.forEach(event=>element.removeEventListener(event,wake));document.removeEventListener('visibilitychange',wake);window.removeEventListener('resize',wake)}}
}
