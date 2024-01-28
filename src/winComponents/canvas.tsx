import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { atkinson } from '../utils/atkinson'
interface Props {
  draw: boolean
  setDraw: (draw: boolean) => void
  grayscale: boolean
  setGrayscale: (draw: boolean) => void
  mezzotinto: boolean
  setMezzotinto: (draw: boolean) => void
}

const flecktarn = [
  '#a7ad6f', '#616847', '#434a3a', '#734a23', '#2f2d2e'
]
const transparent = 'rgba(0,0,0,0)'

export const Canvas: React.FC<Props> = ({ draw, setDraw, grayscale, setGrayscale, mezzotinto, setMezzotinto }) => {

  const imageRef = useRef(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const topRef = useRef<HTMLCanvasElement>(null)

  // const draw = (context: CanvasRenderingContext2D, frameCount: number) => {
  //   context.clearRect(0, 0, width, context.canvas.height)
  //   context.fillStyle = '#000000'
  //   context.fillRect(0, 0, context.canvas.width, context.canvas.height)
  //   context.beginPath()
  //   context.arc(50, 100, 20 * Math.sin(frameCount * 0.05) ** 2, 0, 2 * Math.PI)
  //   context.fill()
  // }

  // const getRandomColor = () => {
  //   var letters = '0123456789ABCDEF';
  //   var color = '#';
  //   for (var i = 0; i < 6; i++) {
  //     color += letters[Math.floor(Math.random() * 16)];
  //   }
  //   return color;
  // }

  const getFlecktarnColor = () => {
    return flecktarn[Math.floor(Math.random() * flecktarn.length)]
  }

  const skewedRandom = () => {
    const a = Math.pow(Math.random() * 5, 2);
    if (a > 10) return 2
    return Math.max(2, a)
    // if (Math.random() < 0.5) {
    //   return Math.floor(b);
    // }
    // return Math.abs(1 - Math.floor(b));
  }

  const drawShape = useCallback((context: CanvasRenderingContext2D, x: number, y: number, maxScale: number) => {
    const randomColor = getFlecktarnColor()
    context.beginPath();
    context.moveTo(x, y)
    const svg = new Path2D('M 4 18 C 11 18 18 10 20 18 C 22 24 16 26 20 28 C 22 29 26 28 26 32 C 26 38 16 30 16 40 C 16 44 10 36 6 40 Q 0 44 0 28 C 0 25 0 22 2 20 C 3 20 3 18 4 18 M 4 18 Z')
    const camo = new Path2D()
    camo.moveTo(x, y)
    // context.bezierCurveTo(25, 25, 74, 32, 23, 32)
    // context.bezierCurveTo(25, 25, 74, 32, 32, 84)
    // context.bezierCurveTo(25, 25, 74, 32, 84, 43)
    // context.bezierCurveTo(25, 25, 74, 32, 43, 23)
    const scale = Math.floor(Math.random() * maxScale)
    context.setTransform(scale, 0, 0, scale, 0, 0)
    context.translate(x / scale, y / scale)
    context.rotate((Math.random() * 360) * Math.PI / 180)
    camo.addPath(svg)
    context.fillStyle = randomColor
    context.fill(camo)
    context.strokeStyle = randomColor;
    context.stroke();
    // context.translate(-x, -y)

  }, [])

  const drawDot = useCallback((context: CanvasRenderingContext2D, x: number, y: number) => {
    const randomColor = getFlecktarnColor()
    context.beginPath();
    const randomShape = skewedRandom()
    context.arc(x, y, randomShape, 0, randomShape * Math.PI);
    context.fillStyle = randomColor;
    context.fill();
    context.strokeStyle = randomColor;
    context.stroke();
  }, [])

  useMemo(() => {
    const canvas = canvasRef.current
    const topCanvas = topRef.current
    // let animationFrameId: number | undefined
    let interval: NodeJS.Timeout
    if (canvas && topCanvas) {
      const context = canvas.getContext("2d")
      const topContext = topCanvas.getContext('2d')
      if (context && topContext) {
        const width = context.canvas.width
        const height = context.canvas.height
        
        if (draw) {
          setGrayscale(false)
          context.setTransform(1, 0, 0, 1, 0, 0)
          topContext.clearRect(0, 0, width, height)
          context.fillStyle = getFlecktarnColor()
          context.fillRect(0, 0, width, height)
          Array.from({ length: 1000 }, (_x, _i) => {
            drawDot(topContext, Math.random() * width, Math.random() * height);
            if (Math.random() > 0.8) {
              drawShape(context, Math.random() * width, Math.random() * height, 5)
              drawShape(topContext, Math.random() * width, Math.random() * height, 2)
            }
            context.setTransform(1, 0, 0, 1, 0, 0)
            topContext.setTransform(1, 0, 0, 1, 0, 0)
            return 0
          })
        }

        if (grayscale && !draw) {
          const imageData = context.getImageData(0, 0, width, height);
          const ati = atkinson(imageData)
          context.putImageData(ati, 0, 0)
          const imageDataDeux = topContext.getImageData(0, 0, width, height);
          const atiDeux = atkinson(imageDataDeux)
          topContext.putImageData(atiDeux, 0, 0)
        }

        if (mezzotinto) {
        }



        // interval = setInterval(() => {
        //   drawDot(topContext, Math.random() * width, Math.random() * height);
        //   if (Math.random() > 0.7) {
        //     drawShape(context, Math.random() * width, Math.random() * height, 5)
        //     drawShape(topContext, Math.random() * width, Math.random() * height, 2)
        //   }
        //   context.setTransform(1, 0, 0, 1, 0, 0)
        //   topContext.setTransform(1, 0, 0, 1, 0, 0)
        // }, 10)
      }
    }
    setDraw(false)

    // imageRef.onload = () => {
    //   ctx.drawImage(image, 0, 0)
    //   ctx.font = "40px Courier"
    //   ctx.fillText(this.props.text, 210, 75)
    // }

    return () => {
      clearInterval(interval)
    }
  }, [canvasRef, drawDot, drawShape, draw, grayscale, setDraw, setGrayscale])

  return (
    <div className="paint-canvas relative">
      <canvas ref={canvasRef} width={500} height={300} />
      <canvas ref={topRef} width={500} height={300} className='absolute top-0 left-0' />
      <div ref={imageRef} className="hidden" />
    </div>
  )

}
export default Canvas
