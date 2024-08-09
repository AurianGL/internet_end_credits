import { useMemo, useState } from "react";

export const usePlayerState = () => {
  const [position, setPosition] = useState({ x: 205, y: 205 });
  const [userSeqIndex, setUserSeqIndex] = useState(0);
  const [heartCount, setHeartCount] = useState(3);
  const [isInteracting, setIsInteracting] = useState(false);

  const isOutOfBound = useMemo(() => {
    return (
      position.x < 0 || position.x > 400 || position.y < 0 || position.y > 400
    );
  }, [position]);

  return {
    position,
    setPosition,
    userSeqIndex,
    setUserSeqIndex,
    isOutOfBound,
    heartCount,
    setHeartCount,
    isInteracting,
    setIsInteracting,
  };
};
