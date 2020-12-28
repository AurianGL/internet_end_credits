import React, { useEffect, useRef } from 'react';

interface CanvasProps {}
type Image = {
  bitmap: {
    width: number,
    height: number,
    data: {
      data: Uint8ClampedArray
    }
  }
}


export const Canvas: React.FC<CanvasProps> = props => {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
    const canvas = canvasRef.current
		const context = canvas?.getContext('2d');

		if (context && canvas) {
      // context.fillStyle = '#000000';
			// context.fillRect(0, 0, context.canvas.width, context.canvas.height);
      // const imgData = context.getImageData(0, 0, canvas.width, canvas.height)
      // for (let i = 0; i < 100000; i += 4) {
      //   imgData.data[i] = 255
      //   imgData.data[i + 1] = 255
      //   imgData.data[i + 2] = 255
      //   imgData.data[i + 3] = 255
      // }
      fetch('https://radiant-inlet-32849.herokuapp.com/http://localhost:8000/image')
        .then(res => res.json())
        .then((image: Image) => {
          const {data, width, height} = image.bitmap
          const imgData = new ImageData(data.data, width, height);
          context.putImageData(imgData, width, height)
        })
    }
	}, []);

	return <canvas ref={canvasRef} {...props}></canvas>;
};
