import type React from "react";
import { useContext, useEffect, useRef, useState } from "react";
import { LoadingContext } from "../context";

interface CanvasProps {
  image: string;
}

type Image = {
  bitmap: {
    width: number;
    height: number;
    data: any;
  };
};

export const Canvas: React.FC<CanvasProps> = (props) => {
  const { image } = props;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [width, setWidth] = useState(300);
  const [height, setHeight] = useState(200);
  const { setLoading } = useContext(LoadingContext);

  const canvas = canvasRef.current;
  const context = canvas?.getContext("2d");

  const loadImage = async () => {
    if (context && canvas) {
      setLoading(true);
      context.clearRect(0, 0, canvas.width, canvas.height);
      await fetch(`http://localhost:8000/image/${image}`)
        .then((res) => res.json())
        .then((image: Image) => {
          const { data } = image.bitmap;
          setHeight(image.bitmap.height);
          setWidth(image.bitmap.width);
          context.clearRect(0, 0, width, height);
          const dataImage = context.createImageData(width, height);
          console.log("pixels missing", data.data.length % (width * 4));
          console.log(
            "pixels out of bounds",
            width * height * 4 - data.data.length
          );
          if (width * height * 4 - data.data.length === 0) {
            dataImage.data.set(data.data);
            context.putImageData(dataImage, 0, 0);
          }
          // const dataImage = new ImageData(
          //   new Uint8ClampedArray(data.data),
          //   width,
          //   height
          // );
          // context.drawImage(canvas, 0, 0, canvas.width, canvas.height);
        });
      setLoading(false);
    }
  };

  useEffect(() => {
    loadImage();
  });

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className="w-auto h-full"
    />
  );
};
