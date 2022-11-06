import React, { useCallback, useEffect, useRef } from 'react';
import { betaPDF } from '../utils/betaRandom';

interface Props {
}

const flecktarn = [
  '#a7ad6f', '#616847', '#434a3a', '#734a23', '#2f2d2e'
]

const Canvas: React.FC<Props> = () => {

  const imageRef = useRef(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const draw = (context: CanvasRenderingContext2D, frameCount: number) => {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height)
    context.fillStyle = '#000000'
    context.fillRect(0, 0, context.canvas.width, context.canvas.height)
    context.beginPath()
    context.arc(50, 100, 20 * Math.sin(frameCount * 0.05) ** 2, 0, 2 * Math.PI)
    context.fill()
  }

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
    if (Math.random() < 0.5) {
        return Math.floor(a);
    }
    return Math.abs(1 - Math.floor(a));
}

  const drawDot = useCallback((context: CanvasRenderingContext2D, x: number, y: number) => {
    const randomColor = getFlecktarnColor()
    context.beginPath();
    const randomShape = skewedRandom()
    console.log(randomShape)
    context.arc(x, y, randomShape, 0, randomShape * Math.PI);
    context.fillStyle = randomColor;
    context.fill();
    context.strokeStyle = randomColor;
    context.stroke();
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    let animationFrameId: number | undefined
    let interval: NodeJS.Timeout
    if (canvas) {
      const context = canvas.getContext("2d")
      if (context) {
        // let frameCount = 0
        context.fillStyle = getFlecktarnColor()
        context.fillRect(0, 0, context.canvas.width, context.canvas.height)

        interval = setInterval(() => {
          drawDot(context, Math.random() * context.canvas.width, Math.random() * context.canvas.height);

        }, 10)
        


        //Our draw came here
        // const render = () => {
        //   frameCount++
        //   draw(context, frameCount)
        //   animationFrameId = window.requestAnimationFrame(render)
        // }
        // render()
      }
    }

    // imageRef.onload = () => {
    //   ctx.drawImage(image, 0, 0)
    //   ctx.font = "40px Courier"
    //   ctx.fillText(this.props.text, 210, 75)
    // }

    return () => {
      clearInterval(interval)
    }
  }, [canvasRef, drawDot])

  return (
    <div className="paint-canvas">
      <canvas ref={canvasRef} width={500} height={300} />
      <div ref={imageRef} className="hidden" />
    </div>
  )

}
export default Canvas
