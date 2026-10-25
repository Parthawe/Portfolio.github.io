import { characterImage } from './artwork'
import { SPRITES } from './sprite-frames'
export function sprite(c:CanvasRenderingContext2D,key:keyof typeof SPRITES,x:number,y:number,w:number,h:number) {
  const image=characterImage();if(!image)return false
  const [sx,sy,sw,sh]=SPRITES[key]
  c.drawImage(image,sx,sy,sw,sh,x,y,w,h)
  return true
}
