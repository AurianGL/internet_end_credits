import { useState, useEffect } from "react";

export type Phase =
  | "exlibris"
  | "exploration"
  | "preFight"
  | "fightPreparation"
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

  const handleNpcInteraction = () => {
    switch (gameState.phase) {
      case "preFight":
        setGameState((prevGameState) => ({
          ...prevGameState,
          phase: "fightPreparation",
        }));
        break;
      case "fightPreparation":
        const playerName = prompt(gameState.dialogs.npcNamePrompt) || "";
        const isChosenOne =
          playerName && ["maner", "manon"].includes(playerName.toLowerCase());
        setGameState((prevGameState) => ({
          ...prevGameState,
          playerName,
          phase: isChosenOne ? "fightCthulhu" : prevGameState.phase,
        }));
        break;
      case "fightCthulhu":
        if (gameState.playerHealth <= 0.5) {
          // Logic for NPC offering help
          alert(gameState.dialogs.npcOfferHelp);
        } else {
          // Logic for NPC ignoring
          alert(gameState.dialogs.npcIgnore);
        }
        break;
      default:
        break;
    }
  };

  // Example of updating player health (replace with your game logic)
  const takeDamage = () => {
    setGameState((prevGameState) => ({
      ...prevGameState,
      playerHealth: Math.max(0, prevGameState.playerHealth - 0.5),
    }));
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
    handleNpcInteraction,
    takeDamage,
    setGamePhase,
  };
};
