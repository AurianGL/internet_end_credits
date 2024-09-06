import { useState } from "react";

export const useEgg = () => {
  const [eggPosition, setEggPosition] = useState({
    x: Math.floor(Math.random() * 400),
    y: -50,
  });
  const [isEggEvil, setIsEggEvil] = useState(false);

  const resetEgg = () => {
    setEggPosition({
      x: Math.floor(Math.random() * 400),
      y: -50,
    });
    setIsEggEvil(Math.random() > 0.7);
  };

  // move egg on a leaf falling pattern
  const moveEgg = () => {
    setEggPosition((prev) => {
      if (prev.y > 400) {
        resetEgg();
      }
      return {
        x: prev.x + Math.floor(Math.random() * 5) - 2,
        y: prev.y + Math.floor(Math.random() * 5),
      };
    });
  };

  return {
    eggPosition,
    isEggEvil,
    resetEgg,
    moveEgg,
  };
};
