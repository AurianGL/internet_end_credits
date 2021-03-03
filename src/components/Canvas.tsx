import React, { useEffect, useRef } from 'react';

interface CanvasProps {}
type Image = {
	bitmap: {
		width: number;
		height: number;
		data: {
			data: number[];
		};
	};
};

export const Canvas: React.FC<CanvasProps> = props => {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		const context = canvas?.getContext('2d');

		if (context && canvas) {
			fetch('http://localhost:8000/image/yeux')
				.then(res => res.json())
				.then((image: Image) => {
					console.log(typeof image.bitmap.data);
					const { data, width, height } = image.bitmap;
					const dataImage = context.createImageData(
						width,
						height
          );
          dataImage.data.set(data.data)
					context.putImageData(dataImage, 0, 0);
				});
		}
	}, []);

	return <canvas ref={canvasRef} {...props}></canvas>;
};
