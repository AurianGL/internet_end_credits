import { useCallback, useMemo, useRef, useState } from "react";
import { createMap } from "../assets/tile";
import { nightSky } from "../assets/nightsky";
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
// import { GameBoyInterface } from "./GameBoyInterface";
import { useEggPhase } from "../hooks/useEggPhase";
import { useExlibris } from "../hooks/useExlibris";
import { reset } from "../utils/reset";
import { useDefeat } from "../hooks/useDefeat";
import { useCinematic } from "../hooks/useCinematic";
import { Formik, Form, Field, FormikHelpers } from "formik";
import { useStaticPhase } from "../hooks/useStaticPhase";
import { useDialogDecisionTree } from "../hooks/useDialogsDecisionTree";
import { dialogsPhases } from "../assets/cinema";
import { WITCH } from "../assets/witches";

export const BetterFrame = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // const [shouldAnimate, setShouldAnimate] = useState(true);
  const { userInput } = useHandleUserInput();
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [witch, setWitch] = useState(0);
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
  const {
    npcs,

    updateNPCs,
    updateNPC,
    resetNPCs,
  } = useNPCsState();

  const { gameState, collectEgg, setGamePhase, resetGame } = useGameState();
  const { eggPosition, isEggEvil, resetEgg, moveEgg } = useEgg();
  const {
    currentStep,
    handleInput,
    handleChoice,
    resetDialog,
    splitText,
    setStep,
  } = useDialogDecisionTree();
  const [map, setMap] = useState(nightSky());

  const handleIsOutOfBound = useIsOutOfBound({
    position,
    setPosition,
    npcs,
    updateNPCs,
    setMap,
    createMap: nightSky,
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
    witch,
  });
  const cinematic = useCinematic({
    eggsCollected: gameState.eggsCollected,
    handleIsOutOfBound,
    handleUserInput,
    heartCount,
    isOutOfBound,
    map,
    npcs,
    position,
    setHeartCount,
    setUserSeqIndex,
    updateNPC,
    userInput,
    userSeqIndex,
    selectedColor,
    setIsInputVisible,
    inputValue,
    setGamePhase,
    currentStep,
    handleInput,
    handleChoice,
    resetDialog,
    splitText,
    witch,
  });
  const exlibris = useExlibris({
    selectedColor,
    setSelectedColor,
    setGamePhase,
    setWitch,
  });
  const defeat = useDefeat();
  const staticPhase = useStaticPhase({
    currentStep,
    splitText,
    witch,
    position,
  });
  const userName = useMemo(() => {
    return window.userName;
  }, []);

  const switchPhases = useCallback(
    (
      timeFraction: number,
      firstFrameTime: React.MutableRefObject<number>,
      now: number,
      canvas: HTMLCanvasElement,
      ctx: CanvasRenderingContext2D
    ) => {
      switch (gameState.phase) {
        case "exlibris":
          resetGame();
          resetNPCs();
          exlibris({ timeFraction, firstFrameTime, now, canvas, ctx });
          if (userInput.includes("e")) {
            setGamePhase("exploration");
          }
          break;
        case "exploration":
          eggPhase({ timeFraction, firstFrameTime, now, canvas, ctx });
          break;
        case "cinematic":
          cinematic({ timeFraction, firstFrameTime, now, canvas, ctx });
          break;
        case "static":
          setInputValue("");
          staticPhase({ timeFraction, firstFrameTime, now, canvas, ctx });
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
    },
    [
      cinematic,
      defeat,
      eggPhase,
      exlibris,
      gameState.phase,
      npcs,
      resetEgg,
      resetGame,
      resetNPCs,
      setGamePhase,
      setHeartCount,
      setPosition,
      staticPhase,
      updateNPCs,
      userInput,
    ]
  );
  const nextAnimationFrameHandler: NextAnimationFrameHandlerType = ({
    timeFraction,
    firstFrameTime,
    now,
  }) => {
    if (heartCount <= 0) {
      setGamePhase("defeat");
    }
    if (gameState.phase === "exploration" && gameState.eggsCollected > 2) {
      setInputValue("");
      setGamePhase("cinematic");
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas?.getContext("2d");

    if (ctx) {
      switchPhases(timeFraction, firstFrameTime, now, canvas, ctx);
    }
  };

  useAnimationFrame({
    nextAnimationFrameHandler,
    duration: 10000,
    shouldAnimate: true,
  });

  const handleSubmit = (
    values: { userName: string },
    { resetForm }: FormikHelpers<{ userName: string }>
  ) => {
    setInputValue(values.userName);
    setIsInputVisible(false);
    // resetForm();
  };

  return (
    <div className="flex flex-col justify-start align-top relative">
      <canvas
        ref={canvasRef}
        width={400}
        height={400}
        style={{
          imageRendering: "pixelated",
        }}
      />
      {isInputVisible && (
        <Formik
          initialValues={{
            userName: "",
          }}
          onSubmit={handleSubmit}
        >
          {({ values, ...rest }) => (
            <Form
              autoComplete="off"
              className="relative text-left"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSubmit(values, { ...rest });
                }
              }}
              style={{
                position: "absolute",
                top: 350,
                left: 100,
                zIndex: 100,
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Field
                id="userName"
                name="userName"
                placeholder="Jane"
                className="text-black"
                autoComplete="true"
              />
            </Form>
          )}
        </Formik>
      )}
      {gameState.phase === "static" && (
        // /(manner|manon|maner)/i.test(window.userName) && (
        <button
          onClick={() => {
            resetDialog();
            setGamePhase("cinematic");
            // setStep(dialogsPhases.FIRST_PHASE[0]);
          }}
          className="absolute z-50 bottom-0 right-0 bg-black text-white"
        >
          reset dialog
        </button>
      )}

      {/* <GameBoyInterface
        handleTouchStart={handleTouchStart}
        handleTouchEnd={handleTouchEnd}
      /> */}
    </div>
  );
};
