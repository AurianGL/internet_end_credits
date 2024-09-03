import { useCallback, useMemo, useRef, useState } from "react";
import { Direction, NonPlayerCharacter } from "../hooks/useNPCsState";
import { drawCharacterOnCanvas } from "../assets/character";
import { dialogs, explorationDialogs } from "../assets/dialogs";
import { drawEggOnCanvas } from "../assets/eggs";
import { drawHeartsOnCanvas } from "../assets/hearts";
import { drawMap, Tile, TILE_SIZE } from "../assets/tile";
import {
  isColliding,
  randomDirection,
  isEggColliding,
} from "../utils/functions";
import { drawStars, Star } from "../assets/nightsky";
import { drawWitchOnCanvas, generateWitchOnBroom } from "../assets/witches";
import img from "../../../../public/witchone.png";

interface EggPhaseProps {
  collectEgg: () => void;
  eggPosition: { x: number; y: number };
  eggsCollected: number;
  handleIsOutOfBound: () => void;
  handleUserInput: () => void;
  heartCount: number;
  isEggEvil: boolean;
  isOutOfBound: boolean;
  map: Star[];
  moveEgg: () => void;
  npcs: NonPlayerCharacter[];
  position: { x: number; y: number };
  resetEgg: () => void;
  setHeartCount: React.Dispatch<React.SetStateAction<number>>;
  setUserSeqIndex: React.Dispatch<React.SetStateAction<number>>;
  updateNPC: (id: number, npc: Partial<NonPlayerCharacter>) => void;
  userInput: string[];
  userSeqIndex: number;
  selectedColor: string;
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
  selectedColor,
}: EggPhaseProps) => {
  const [frame, setFrame] = useState(0);
  // const imageDataRef = useRef<ImageData>();

  return useCallback(
    ({ timeFraction, firstFrameTime, now, canvas, ctx }) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (isOutOfBound) {
        handleIsOutOfBound();
        resetEgg();
        return;
      }

      // ctx.filter = "blur(4px)";

      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0.6, "#0e002e"); // Dark blue
      gradient.addColorStop(0.88, "#552f73"); // Mid blue
      gradient.addColorStop(0.94, "#5a166f"); // Orange
      gradient.addColorStop(1, "#670d08"); // Yellow-orange (sunset)

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const stars = map.map((star) => {
        star.size += star.pulse;
        if (star.size > 2 || star.size < 1) {
          star.pulse = -star.pulse;
        }
        return star;
      });
      drawStars(ctx, stars);

      // const imageData = imageDataRef.current ?? drawMap(ctx, map);
      // ctx.putImageData(imageData, 0, 0);
      // ctx.fillStyle = "aqua";
      // ctx.fillRect(0, 0, 400, 400);
      // ctx.filter = "none";
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
                        Math.random() < 0.2
                          ? randomDirection()
                          : eggPosition.x - x > 0
                          ? 1
                          : -1,
                      y:
                        Math.random() < 0.2
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
            resetEgg();
            setHeartCount((prev) => prev - 1);
          }
          if (eggColliding && !isEggEvil) {
            collectEgg();
            resetEgg();
            setHeartCount((prev) => prev + 1);
          }
        }
        setUserSeqIndex((prev) => (prev + 1) % 4);
        setFrame((prev) => prev + 1);
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
            const text = explorationDialogs(frame, eggsCollected);

            ctx.font = "12px monospace";
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
          const image = new Image();

          image.src =
            process.env.PUBLIC_URL +
            (isFriendly ? "/owlone.png" : "/owltwo.png");
          ctx.drawImage(image, x, y, 48, 48);

          // drawWitchOnCanvas(ctx, { x, y }, generateWitchOnBroom(color));
          // drawCharacterOnCanvas(ctx, { x, y }, color, pnjSeqIndex, !isFriendly);
        }
      );
      const image = new Image();
      image.src = process.env.PUBLIC_URL + "/witchone.png";
      ctx.drawImage(image, position.x, position.y, 64, 64);
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
      frame,
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
    ]
  );
};
