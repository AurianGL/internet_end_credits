import { useCallback, useRef, useState } from "react";
import { createMap, TILE_SIZE } from "../assets/tile";
import { usePlayerState } from "../hooks/usePlayerState";
import {
  Direction,
  NonPlayerCharacter,
  useNPCsState,
} from "../hooks/useNPCsState";
import { drawCharacterOnCanvas } from "../assets/character";
import { isColliding, randomDirection } from "../functions";
import {
  useAnimationFrame,
  NexnextAnimationFrameHandlerType,
} from "../hooks/useAnimate";
import { useHandleUserInput } from "../hooks/useHandleUserInput";
import { drawHeartsOnCanvas } from "../assets/hearts";
import { dialogs } from "../assets/dialogs";

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
  } = usePlayerState();
  const { npcs, addFoesNPC, addFriendlyNPC, updateNPCs, updateNPC, attackNPC } =
    useNPCsState();

  const [map, setMap] = useState(createMap(400, 400));

  // const reset = () => {
  //   setHeartCount(2);
  // };

  const nextAnimationFrameHandler: NexnextAnimationFrameHandlerType =
    useCallback(
      ({ timeFraction, firstFrameTime, now }) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas?.getContext("2d");

        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          if (isOutOfBound) {
            setMap(createMap(400, 400));
            if (position.x < 0) setPosition((prev) => ({ x: 395, y: prev.y }));
            if (position.x > 400) setPosition((prev) => ({ x: 5, y: prev.y }));
            if (position.y < 0) setPosition((prev) => ({ x: prev.x, y: 395 }));
            if (position.y > 400) setPosition((prev) => ({ x: prev.x, y: 5 }));
            const xOrY = Math.random() < 0.5 ? "x" : "y";
            const headOrTail = Math.random() < 0.5 ? 0 : 400;
            const newNPCsPostions = npcs.map<NonPlayerCharacter>((npc) => {
              return {
                ...npc,
                position: {
                  x:
                    xOrY === "x" ? Math.floor(Math.random() * 400) : headOrTail,
                  y:
                    xOrY === "y" ? Math.floor(Math.random() * 400) : headOrTail,
                },
                mood: "wandering",
              };
            });
            updateNPCs(newNPCsPostions);
            return;
          }

          // if (npcs.length < 1) {
          //   addFriendlyNPC();
          // }
          // if (Math.random() < 0.1 && npcs.length < 3) {
          //   addFoesNPC();
          // }

          for (let i = 0; i < map.length; i += TILE_SIZE) {
            for (let j = 0; j < map[i].length; j += TILE_SIZE) {
              ctx.fillStyle = map[i][j].color;
              ctx.fillRect(i, j, TILE_SIZE, TILE_SIZE);
            }
          }

          // move npcs if more than 1 second has passed
          if (now - firstFrameTime.current > 100) {
            if (now - firstFrameTime.current > 50 / 2) {
              npcs.forEach(
                ({
                  id,
                  position: { x, y },
                  seqIndex,
                  direction,
                  isFriendly,
                  mood,
                }) => {
                  // if nps is friendly, move it towards the user or is out of bound
                  const npcIsOutOfBound =
                    x < -25 || x > 425 || y < -25 || y > 425;
                  const npcIsColliding = isColliding(position, { x, y });
                  if (
                    npcIsOutOfBound ||
                    (isFriendly &&
                      Math.random() < 0.3 &&
                      mood === "sticky" &&
                      !npcIsColliding)
                  ) {
                    const direction: Direction = {
                      x: position.x - x > 0 ? 1 : -1,
                      y: position.y - y > 0 ? 1 : -1,
                    };
                    updateNPC(id, {
                      position: {
                        x: x + direction.x * 5,
                        y: y + direction.y * 5,
                      },
                      seqIndex: (seqIndex + 1) % 4,
                      direction,
                    });
                  } else {
                    updateNPC(id, {
                      position: {
                        x: x + direction.x * 5,
                        y: y + direction.y * 5,
                      },
                      seqIndex: (seqIndex + 1) % 4,
                      direction: {
                        x:
                          Math.random() < 0.1 ? randomDirection() : direction.x,
                        y:
                          Math.random() < 0.1 ? randomDirection() : direction.y,
                      },
                      mood: isFriendly
                        ? Math.random() < 0.8
                          ? "wandering"
                          : "sticky"
                        : "wandering",
                    });
                  }
                  if (npcIsColliding && userInput.includes("e")) {
                    setHeartCount((prev) => prev - (isFriendly ? -1 : 1));
                  }
                }
              );
              if (userInput.length > 0) {
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
              }
            }
            setUserSeqIndex((prev) => (prev + 1) % 4);
            firstFrameTime.current = now;
          }
          npcs.forEach(
            ({
              position: npcPositon,
              seqIndex: pnjSeqIndex,
              isFriendly,
              textColor,
              color,
            }) => {
              if (isColliding(position, npcPositon)) {
                const text =
                  dialogs[isFriendly ? "friendlyNPC" : "enemyNPC"]["greeting"];

                ctx.font = "16px Perfect DOS";
                ctx.fillStyle = "black";

                // Measure the width of the text
                const textWidth = ctx.measureText(text).width;
                const textHeight = 14; // Approximate height of the text

                // Draw the white background rectangle
                ctx.fillStyle = textColor;
                ctx.fillRect(
                  (400 - textWidth - 8) / 2,
                  400 - textHeight - 8,
                  textWidth + 4,
                  textHeight + 4
                );
                // Draw the text on top of the rectangle
                ctx.fillStyle = "black";
                ctx.fillText(text, (400 - textWidth) / 2, 400 - textHeight / 2);
              }
              drawCharacterOnCanvas(
                ctx,
                npcPositon,
                color,
                pnjSeqIndex,
                !isFriendly
              );
            }
          );
          drawCharacterOnCanvas(
            ctx,
            position,
            "orangered",
            userSeqIndex,
            false
          );
          drawHeartsOnCanvas(ctx, heartCount);
        }
      },
      [
        heartCount,
        isOutOfBound,
        map,
        npcs,
        position,
        setHeartCount,
        setPosition,
        setUserSeqIndex,
        updateNPC,
        updateNPCs,
        userInput,
        userSeqIndex,
      ]
    );

  useAnimationFrame({
    nextAnimationFrameHandler,
    duration: 1000,
    shouldAnimate: true,
  });

  return (
    <div className="flex flex-col justify-start align-top">
      <canvas ref={canvasRef} width={400} height={400} />
      <div className="flex justify-around gap-4 w-full">
        <div className="flex justify-center mt-4">
          <div className="grid grid-cols-3 grid-rows-3 gap-0">
            <div></div>
            <button
              className="select-none rounded-t-lg col-start-2 row-start-1 w-12 h-12  bg-transparent bg-gray-400 text-red-500 font-death text-lg"
              onTouchStart={(e) => handleTouchStart("ArrowUp")}
              onTouchEnd={(e) => handleTouchEnd("ArrowUp")}
            >
              Up
            </button>
            <div></div>

            <button
              className="select-none rounded-l-lg col-start-1 row-start-2 w-12 h-12  bg-transparent  bg-gray-400 text-blue-500 font-death text-lg"
              onTouchStart={(e) => handleTouchStart("ArrowLeft")}
              onTouchEnd={(e) => handleTouchEnd("ArrowLeft")}
            >
              Left
            </button>
            <div className="w-12 h-12  bg-transparent bg-gray-400 font-death text-lg" />
            <button className="select-none rounded-r-lg w-12 h-12  bg-transparent bg-gray-400 text-blue-500 font-death text-lg">
              Right
            </button>
            <button
              className="select-none rounded-b-lg col-start-2 row-start-3 w-12 h-12  bg-transparent  bg-gray-400 text-red-500 font-death text-lg"
              onTouchStart={(e) => handleTouchStart("ArrowDown")}
              onTouchEnd={(e) => handleTouchEnd("ArrowDown")}
            >
              Down
            </button>
            <div></div>
          </div>
          <div className="ml-10 grid grid-cols-2 grid-rows-2 gap-0">
            <button
              className="select-none w-12 h-12 rounded-full bg-red-500 font-death text-lg"
              onTouchStart={(e) => handleTouchStart("e")}
              onTouchEnd={(e) => handleTouchEnd("e")}
            >
              A
            </button>
            <div />
            <div />
            <button
              className="select-none w-12 h-12 rounded-full bg-blue-500 font-death text-lg"
              onTouchStart={(e) => handleTouchStart("q")}
              onTouchEnd={(e) => handleTouchEnd("q")}
            >
              B
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
