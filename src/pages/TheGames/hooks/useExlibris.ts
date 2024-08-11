import { useCallback, useEffect, useState } from "react";
import { rgbColors } from "../utils/functions";

interface ExlibrisProps {
  selectedColor: string;
  setSelectedColor: React.Dispatch<React.SetStateAction<string>>;
}

export const useExlibris = ({
  selectedColor,
  setSelectedColor,
}: ExlibrisProps) => {
  const [position, setPosition] = useState({ x: 200, y: 150 });
  const [flicker, setFlicker] = useState(false);

  useEffect(() => {
    const updatePosition = () => {
      const offsetX = Math.random() * 4 - 1; // Random offset between -4 and 4
      const offsetY = Math.random() * 4 - 1; // Random offset between -4 and 4
      setPosition((prev) => ({
        x: 200 + offsetX,
        y: 150 + offsetY,
      }));
    };

    const updateFlicker = () => {
      setFlicker(Math.random() > 0.8); // 50% chance to flicker
    };

    const intervalId = setInterval(() => {
      updatePosition();
      updateFlicker();
    }, 150); // Update every 100ms

    return () => clearInterval(intervalId);
  }, []);

  return useCallback(
    ({ timeFraction, firstFrameTime, now, canvas, ctx }) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const text = "Abyss Fortress";
      const subText = "press E key or A button to start";

      if (!flicker) {
        ctx.font = "bold 24px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        // Draw red component
        if (Math.random() > 0.7) {
          ctx.fillStyle = "rgba(255, 0, 0, 0.8)";
          ctx.fillText(text, position.x - 4, position.y);
        }
        // Draw green component
        if (Math.random() > 0.7) {
          ctx.fillStyle = "rgba(0, 255, 0, 0.8)";
          ctx.fillText(text, position.x + 4, position.y);
        }
        // Draw blue component
        if (Math.random() > 0.7) {
          ctx.fillStyle = "rgba(0, 0, 255, 0.8)";
          ctx.fillText(text, position.x, position.y - 4);
        }
        ctx.fillStyle = "white";
        ctx.fillText(text, position.x, position.y);
      }
      ctx.font = "bold 16px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "white";
      ctx.fillText(subText, position.x, position.y + 40);

      rgbColors(0.8).forEach((color, index) => {
        const x = position.x - 125 + index * 100;
        const y = position.y + 60;

        if (selectedColor === color && flicker) {
          // a randm number between 0.5 and 0.1 with only one decimal
          const alpha = Math.floor(Math.random() * 4 + 1) / 10;
          ctx.fillStyle = rgbColors(alpha)[index];
          ctx.fillRect(x, y, 50, 50); // Flicker effect
        } else {
          ctx.fillStyle = color;
          ctx.fillRect(x, y, 50, 50);
        }
      });

      // Handle square clicks
      canvas.addEventListener("click", (event: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        const clickX = event.clientX - rect.left;
        const clickY = event.clientY - rect.top;

        rgbColors(0.8).forEach((color, index) => {
          const x = position.x - 125 + index * 100;
          const y = position.y + 60;
          if (
            clickX >= x &&
            clickX <= x + 50 &&
            clickY >= y &&
            clickY <= y + 50
          ) {
            setSelectedColor(color);
          }
        });
      });
    },
    [flicker, position.x, position.y, selectedColor]
  );
};
