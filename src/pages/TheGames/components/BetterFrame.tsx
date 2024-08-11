import { useRef, useState } from "react";
import { createMap } from "../assets/tile";
import { usePlayerState } from "../hooks/usePlayerState";
import { useNPCsState } from "../hooks/useNPCsState";

import {
  useAnimationFrame,
  NextAnimationFrameHandlerType,
} from "../hooks/useAnimate";
import { useHandleUserInput } from "../hooks/useHandleUserInput";
import { useGameState } from "../hooks/useGameState";
import { useIsOutOfBound } from "../hooks/useIsOutOfBound";
import { useHandleUserMove } from "../hooks/useHandleUserMove";
import { useEgg } from "../hooks/useEgg";
import { GameBoyInterface } from "./GameBoyInterface";
import { useEggPhase } from "../hooks/useEggPhase";
import { useExlibris } from "../hooks/useExlibris";
import { reset } from "../utils/reset";
import { useDefeat } from "../hooks/useDefeat";

export const BetterFrame = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // const [shouldAnimate, setShouldAnimate] = useState(true);
  const { userInput, handleTouchStart, handleTouchEnd } = useHandleUserInput();

  const {
    position,
    setPosition,
    setUserSeqIndex,
    userSeqIndex,
    isOutOfBound,
    heartCount,
    setHeartCount,
    selectedColor,
    setSelectedColor,
  } = usePlayerState();
  const { npcs, addFoesNPC, addFriendlyNPC, updateNPCs, updateNPC, attackNPC } =
    useNPCsState();

  const { gameState, collectEgg, handleNpcInteraction, setGamePhase } =
    useGameState();
  const { eggPosition, isEggEvil, resetEgg, moveEgg } = useEgg();
  const [map, setMap] = useState(createMap(400, 400));

  const handleIsOutOfBound = useIsOutOfBound({
    position,
    setPosition,
    npcs,
    updateNPCs,
    setMap,
    createMap,
  });
  const handleUserInput = useHandleUserMove({
    userInput,
    setPosition,
  });
  const eggPhase = useEggPhase({
    collectEgg,
    eggPosition,
    eggsCollected: gameState.eggsCollected,
    handleIsOutOfBound,
    handleUserInput,
    heartCount,
    isEggEvil,
    isOutOfBound,
    map,
    moveEgg,
    npcs,
    position,
    resetEgg,
    setHeartCount,
    setUserSeqIndex,
    updateNPC,
    userInput,
    userSeqIndex,
    selectedColor,
  });
  const exlibris = useExlibris({
    selectedColor,
    setSelectedColor,
  });
  const defeat = useDefeat();

  const nextAnimationFrameHandler: NextAnimationFrameHandlerType = ({
    timeFraction,
    firstFrameTime,
    now,
  }) => {
    if (heartCount <= 0) {
      setGamePhase("defeat");
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas?.getContext("2d");

    if (ctx) {
      switch (gameState.phase) {
        case "exlibris":
          exlibris({ timeFraction, firstFrameTime, now, canvas, ctx });
          if (userInput.includes("e")) {
            setGamePhase("exploration");
          }
          break;
        case "exploration":
          eggPhase({ timeFraction, firstFrameTime, now, canvas, ctx });
          break;
        case "defeat":
          defeat({ timeFraction, firstFrameTime, now, canvas, ctx });
          if (userInput.includes("e")) {
            reset({
              setHeartCount,
              setGamePhase,
              setMap,
              setPosition,
              npcs,
              updateNPCs,
              resetEgg,
            });
          }
          break;
        default:
          break;
      }
    }
  };

  useAnimationFrame({
    nextAnimationFrameHandler,
    duration: 1000,
    shouldAnimate: true,
  });

  return (
    <div className="flex flex-col justify-start align-top">
      <canvas ref={canvasRef} width={400} height={400} />
      <GameBoyInterface
        handleTouchStart={handleTouchStart}
        handleTouchEnd={handleTouchEnd}
      />
    </div>
  );
};
