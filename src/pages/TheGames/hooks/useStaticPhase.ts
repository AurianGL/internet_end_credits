import { useCallback, useState } from "react";
import { DecisionTreeStep } from "../assets/cinema";

interface StaticProps {
  currentStep: DecisionTreeStep;
  splitText: (text: string, maxLineLength: number) => string[];
}

export const useStaticPhase = ({ currentStep, splitText }: StaticProps) => {
  const [frame, setFrame] = useState(0);

  return useCallback(
    ({ timeFraction, firstFrameTime, now, canvas, ctx }) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // console.log(now - firstFrameTime.current);
      if (now - firstFrameTime.current > 1000) {
        setFrame((prev) => prev + 1);
        firstFrameTime.current = now;
      }

      const staticAlpha = (Math.sin(firstFrameTime.current * 0.001) + 1) / 2;
      ctx.fillStyle = `rgba(255, 255, 255, ${staticAlpha})`;
      for (let i = 0; i < 400; i += 1) {
        for (let j = 0; j < 400; j += 1) {
          if (Math.random() > 0.7) {
            ctx.fillRect(i, j, 1, 1);
          }
        }
      }
      ctx.font = " 16px Arial";
      const questionLines = splitText(currentStep.question, 40);

      questionLines.forEach((line, index) => {
        ctx.fillText(line, 200, 20 + index * 20);
      });
    },
    [currentStep.question, splitText]
  );
};
