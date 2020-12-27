import React, { useEffect, useRef, useState } from 'react';

interface CanvasProps {}

export const Canvas: React.FC<CanvasProps> = props => {
  const [deadPixel, setDeadPixel] = useState<number>(0)
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
    const canvas = canvasRef.current
		const context = canvas?.getContext('2d');

		if (context && canvas) {
      // context.fillStyle = '#000000';
			// context.fillRect(0, 0, context.canvas.width, context.canvas.height);
      const imgData = context.getImageData(0, 0, canvas.width, canvas.height)
      for (let i = 0; i < 100000; i += 4) {
        imgData.data[i] = 255
        imgData.data[i + 1] = 255
        imgData.data[i + 2] = 255
        imgData.data[i + 3] = 255
      }
      console.log(imgData)
      context.putImageData(imgData, canvas.width, canvas.height)
    }
	}, []);

	return <canvas ref={canvasRef} {...props}></canvas>;
};
