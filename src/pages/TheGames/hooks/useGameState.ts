import { useState } from "react";

export type Phase =
  | "exlibris"
  | "exploration"
  | "cinematic"
  | "static"
  | "victory"
  | "defeat";

export const useGameState = () => {
  const [gameState, setGameState] = useState({
    phase: "exlibris", // 'exploration', 'preFight', 'fightPreparation', 'fightCthulhu', 'victory', 'defeat'
    eggsCollected: 0,
  });

  const collectEgg = () => {
    setGameState((prevGameState) => {
      const newEggsCollected = prevGameState.eggsCollected + 1;
      return {
        ...prevGameState,
        eggsCollected: newEggsCollected,
        phase: newEggsCollected >= 7 ? "preFight" : prevGameState.phase,
      };
    });
  };

  const setGamePhase = (phase: Phase) => {
    setGameState((prev) => ({
      ...prev,
      phase,
    }));
  };

  const resetGame = () => {
    setGameState({
      phase: "exlibris",
      eggsCollected: 0,
    });
  };

  return {
    gameState,
    collectEgg,
    setGamePhase,
    resetGame,
  };
};
