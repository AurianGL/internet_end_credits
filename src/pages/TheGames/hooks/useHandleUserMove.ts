import { useCallback } from "react";

export const useHandleUserMove = ({
  userInput,
  setPosition,
}: {
  userInput: string[];
  setPosition: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>;
}) => {
  return useCallback(() => {
    if (userInput.includes("ArrowUp")) {
      setPosition((prev) => ({ x: prev.x, y: prev.y - 5 }));
    }
    if (userInput.includes("ArrowDown")) {
      setPosition((prev) => ({ x: prev.x, y: prev.y + 5 }));
    }
    if (userInput.includes("ArrowLeft")) {
      setPosition((prev) => ({ x: prev.x - 5, y: prev.y }));
    }
    if (userInput.includes("ArrowRight")) {
      setPosition((prev) => ({ x: prev.x + 5, y: prev.y }));
    }
  }, [userInput, setPosition]);
};
