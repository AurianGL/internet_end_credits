import { useCallback } from "react";
import { Direction, NonPlayerCharacter } from "../hooks/useNPCsState";
import { drawCharacterOnCanvas } from "../assets/character";
import { dialogs } from "../assets/dialogs";
import { drawEggOnCanvas } from "../assets/eggs";
import { drawHeartsOnCanvas } from "../assets/hearts";
import { Tile, TILE_SIZE } from "../assets/tile";
import { isColliding, randomDirection, isEggColliding } from "../functions";

interface EggPhaseProps {
  collectEgg: () => void;
  eggPosition: { x: number; y: number };
  eggsCollected: number;
  handleIsOutOfBound: () => void;
  handleUserInput: () => void;
  heartCount: number;
  isEggEvil: boolean;
  isOutOfBound: boolean;
  map: Tile[][];
  moveEgg: () => void;
  npcs: NonPlayerCharacter[];
  position: { x: number; y: number };
  resetEgg: () => void;
  setHeartCount: React.Dispatch<React.SetStateAction<number>>;
  setUserSeqIndex: React.Dispatch<React.SetStateAction<number>>;
  updateNPC: (id: number, npc: Partial<NonPlayerCharacter>) => void;
  userInput: string[];
  userSeqIndex: number;
  // ctx: CanvasRenderingContext2D;
  // canvas: HTMLCanvasElement;
}

export const useEggPhase = ({
  collectEgg,
  eggPosition,
  eggsCollected,
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
}: EggPhaseProps) => {
  return useCallback(
    ({ timeFraction, firstFrameTime, now, canvas, ctx }) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (isOutOfBound) {
        handleIsOutOfBound();
        resetEgg();
        return;
      }

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
              const npcIsOutOfBound = x < -25 || x > 425 || y < -25 || y > 425;
              const npcIsColliding = isColliding(position, { x, y });
              if (
                npcIsOutOfBound ||
                (isFriendly &&
                  Math.random() > 0.3 &&
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
                const newDirection: Direction = isEggEvil
                  ? {
                      x: Math.random() < 0.1 ? randomDirection() : direction.x,
                      y: Math.random() < 0.1 ? randomDirection() : direction.y,
                    }
                  : {
                      x:
                        Math.random() < 0.1
                          ? randomDirection()
                          : eggPosition.x - x > 0
                          ? 1
                          : -1,
                      y:
                        Math.random() < 0.1
                          ? randomDirection()
                          : eggPosition.y - y > 0
                          ? 1
                          : -1,
                    };
                updateNPC(id, {
                  position: {
                    x: x + direction.x * 5,
                    y: y + direction.y * 5,
                  },
                  seqIndex: (seqIndex + 1) % 4,
                  direction: newDirection,
                  mood: isFriendly
                    ? Math.random() < -0.8
                      ? "wandering"
                      : "sticky"
                    : "wandering",
                });
              }
              if (npcIsColliding && userInput.includes("e")) {
                setHeartCount((prev) => prev - (isFriendly ? -1 : 1));
              }
              const npcIsCollidingWithEgg = isColliding({ x, y }, eggPosition);
              if (npcIsCollidingWithEgg) {
                resetEgg();
              }
            }
          );
          if (userInput.length > 0) {
            handleUserInput();
          }
        }
        if (eggPosition.y > 400) {
          resetEgg();
        } else {
          moveEgg();
          const eggColliding = isEggColliding(position, eggPosition);
          if (eggColliding && isEggEvil) {
            setHeartCount((prev) => prev - 1);
          }
          if (eggColliding && !isEggEvil) {
            if (userInput.includes("e")) {
              collectEgg();
              resetEgg();
              setHeartCount((prev) => prev + 1);
            }
          }
        }
        setUserSeqIndex((prev) => (prev + 1) % 4);
        firstFrameTime.current = now;
      }
      const eggColor = isEggEvil ? "red" : "gold";
      drawEggOnCanvas(ctx, eggColor, eggPosition);
      npcs.forEach(
        ({
          position: { x, y },
          seqIndex: pnjSeqIndex,
          isFriendly,
          textColor,
          color,
        }) => {
          const npcIsColliding = isColliding(position, { x, y });
          if (npcIsColliding) {
            const text =
              dialogs[isFriendly ? "friendlyNPC" : "enemyNPC"]["greeting"];

            ctx.font = "16px Perfect DOS";
            ctx.fillStyle = "black";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
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
            ctx.fillText(text, 400 / 2, 400 - textHeight + 2);
          }
          drawCharacterOnCanvas(ctx, { x, y }, color, pnjSeqIndex, !isFriendly);
        }
      );
      drawCharacterOnCanvas(ctx, position, "orangered", userSeqIndex, false);
      drawHeartsOnCanvas(ctx, heartCount);
      // show egg count on the top right corner
      ctx.font = "24px Perfect DOS";
      ctx.fillStyle = "white";
      ctx.fillText(eggsCollected.toString(), 380, 20);
    },
    [
      collectEgg,
      eggPosition,
      eggsCollected,
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
    ]
  );
};
