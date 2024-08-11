import { useCallback, useEffect, useState } from "react";

export const useDefeat = () => {
  const [position, setPosition] = useState({ x: 200, y: 200 });
  const [flicker, setFlicker] = useState(false);

  useEffect(() => {
    const updatePosition = () => {
      const offsetX = Math.random() * 2 - 1; // Random offset between -2 and 2
      const offsetY = Math.random() * 2 - 1; // Random offset between -2 and 2
      setPosition((prev) => ({
        x: 200 + offsetX,
        y: 200 + offsetY,
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

      const text = "You Died";
      const subText = "press E key or A button to re-start";

      if (!flicker) {
        ctx.font = "bold 24px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        // Draw red component
        ctx.fillStyle = "rgba(255, 0, 0, 0.8)";
        ctx.fillText(text, position.x - 2, position.y);

        // Draw green component
        ctx.fillStyle = "rgba(0, 255, 0, 0.8)";
        ctx.fillText(text, position.x + 2, position.y);

        // Draw blue component
        ctx.fillStyle = "rgba(0, 0, 255, 0.8)";
        ctx.fillText(text, position.x, position.y - 2);

        ctx.fillStyle = "white";
        ctx.fillText(text, position.x, position.y);
      }
      ctx.font = "bold 16px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "white";
      ctx.fillText(subText, position.x, position.y + 40);
    },
    [flicker, position.x, position.y]
  );
};
