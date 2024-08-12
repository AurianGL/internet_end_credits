import { useState, useEffect } from "react";

export type Phase =
  | "exlibris"
  | "exploration"
  | "cinematic"
  | "fightCthulhu"
  | "victory"
  | "defeat";

export const useGameState = () => {
  const [gameState, setGameState] = useState({
    phase: "exlibris", // 'exploration', 'preFight', 'fightPreparation', 'fightCthulhu', 'victory', 'defeat'
    eggsCollected: 0,
    playerName: "",
    playerHealth: 1, // Assuming 1 represents full health
    dialogs: {
      npcGreeting: "Have you found all the ancient eggs yet?",
      npcNamePrompt: "Tell me, traveler, what is your name?",
      npcChosenOne: "You are the one I was expecting!",
      npcIgnore: "...",
      npcOfferHelp: "The path ahead is perilous. Let me aid you in your fight.",
    },
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

  useEffect(() => {
    if (gameState.playerHealth === 0) {
      setGameState((prevGameState) => ({ ...prevGameState, phase: "defeat" }));
    }
  }, [gameState.playerHealth]);

  const setGamePhase = (phase: Phase) => {
    setGameState((prev) => ({
      ...prev,
      phase,
    }));
  };

  return {
    gameState,
    collectEgg,
    setGamePhase,
  };
};
