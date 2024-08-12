import { useCallback, useMemo, useState } from "react";
import { drawCharacterOnCanvas } from "../assets/character";
import { drawHeartsOnCanvas } from "../assets/hearts";
import { Tile, TILE_SIZE } from "../assets/tile";
import { NonPlayerCharacter } from "./useNPCsState";

interface CinematicProps {
  eggsCollected: number;
  handleIsOutOfBound: () => void;
  handleUserInput: () => void;
  heartCount: number;
  isOutOfBound: boolean;
  map: Tile[][];
  npcs: NonPlayerCharacter[];
  position: { x: number; y: number };
  setHeartCount: React.Dispatch<React.SetStateAction<number>>;
  setUserSeqIndex: React.Dispatch<React.SetStateAction<number>>;
  updateNPC: (id: number, npc: Partial<NonPlayerCharacter>) => void;
  userInput: string[];
  userSeqIndex: number;
  selectedColor: string;
}

const initialAsciiChars = Array.from({ length: 4000 }, () =>
  String.fromCharCode(33 + Math.floor(Math.random() * 94))
);

const insertCharsAtIndex = (
  chars: string[],
  index: number,
  newChars: string[]
) => {
  const updatedChars = [...chars];
  // remove char of newChars length starting at index
  updatedChars.splice(index, newChars.length, ...newChars);
  return updatedChars; // Ensure the array length remains 100
};

export const useCinematic = ({
  eggsCollected,
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
}: CinematicProps) => {
  const [bugPosition, setBugPosition] = useState({ x: 0, y: -400 });
  const [asciiChars, setAsciiChars] = useState<string[]>(initialAsciiChars);
  const [alpha, setAlpha] = useState(0);
  const [frame, setFrame] = useState(0);

  const generateAsciiChars = () => {
    const newChars: string[] = [];
    for (let i = 0; i < 100; i++) {
      newChars.push(String.fromCharCode(33 + Math.floor(Math.random() * 94))); // Random ASCII characters
    }
    setAsciiChars((prev) => {
      const updatedChars = [...prev];
      updatedChars.splice(-100, 100); // Remove the last 10 characters
      updatedChars.unshift(...newChars); // Insert 10 new characters at the beginning
      return updatedChars;
    });
  };

  const isPlayerCollidingWithBug = useMemo(() => {
    return (
      position.x < bugPosition.x + 400 &&
      position.x > bugPosition.x &&
      position.y < bugPosition.y + 400 &&
      position.y > bugPosition.y
    );
  }, [bugPosition, position]);

  return useCallback(
    ({ timeFraction, firstFrameTime, now, canvas, ctx }) => {
      // clear the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (isOutOfBound) {
        handleIsOutOfBound();
        return;
      }
      if (alpha !== 1) {
        for (let i = 0; i < map.length; i += TILE_SIZE) {
          for (let j = 0; j < map[i].length; j += TILE_SIZE) {
            ctx.fillStyle = map[i][j].color;
            ctx.fillRect(i, j, TILE_SIZE, TILE_SIZE);
          }
        }
      }
      // draw a black layer on top of the map with alpha
      ctx.fillStyle = `rgba(0, 0, 0, ${alpha})`;
      ctx.fillRect(0, 0, 400, 400);

      if (now - firstFrameTime.current > 100) {
        setFrame((prev) => prev + 1);
        if (isPlayerCollidingWithBug && heartCount > 1) {
          setHeartCount((prev) => prev - 1);
        }
        // rise the alpha every 10 frames
        if (alpha < 1) {
          setAlpha((prev) => parseFloat((prev + 0.01).toFixed(2)));
        }
        // update the position of nps so they move toward the nearest edge of the map until they are out of bounds
        npcs.forEach(({ id, position: { x, y }, seqIndex }) => {
          const distances: Record<string, number> = {
            top: y,
            bottom: 400 - y,
            left: x,
            right: 400 - x,
          };

          const nearestEdge = Object.keys(distances).reduce((a, b) =>
            distances[a] < distances[b] ? a : b
          );

          let direction = { x: 0, y: 0 };
          switch (nearestEdge) {
            case "top":
              direction.y = -1;
              break;
            case "bottom":
              direction.y = 1;
              break;
            case "left":
              direction.x = -1;
              break;
            case "right":
              direction.x = 1;
              break;
          }

          const nextX = x + direction.x;
          const nextY = y + direction.y;

          if (nextX < 0 || nextX > 400 || nextY < 0 || nextY > 400) {
            updateNPC(id, {
              position: { x: nextX, y: nextY },
            });
          } else {
            updateNPC(id, {
              position: { x: x + direction.x * 10, y: y + direction.y * 10 },
            });
          }
        });

        if (userInput.length > 0) {
          handleUserInput();
        }
        if (frame < 200) {
          generateAsciiChars();
        } else {
          const specificCharsString = "HELLO LOST SOULS";
          const specificChars = specificCharsString.split(""); // Convert string to array of characters
          const specificIndex = Math.round(Math.random() * 4000); // Example index where you want to insert the characters
          setAsciiChars((prev) =>
            insertCharsAtIndex(prev, specificIndex, specificChars)
          );
        }

        setBugPosition((prev) => {
          if (prev.y < 0) {
            return { x: prev.x, y: prev.y + 2 }; // Move down by 2 pixels
          }
          return prev;
        });
        setUserSeqIndex((prev) => (prev + 1) % 4);
        firstFrameTime.current = now;
      }
      npcs.forEach(
        ({ position: { x, y }, seqIndex: pnjSeqIndex, isFriendly, color }) => {
          const npcIsOutOfBound = x < -25 || x > 425 || y < -25 || y > 425;
          if (npcIsOutOfBound) return;
          drawCharacterOnCanvas(ctx, { x, y }, color, pnjSeqIndex, !isFriendly);
        }
      );
      ctx.font = "10px monospace";
      ctx.fillStyle = "white";
      asciiChars.forEach((char, index) => {
        const x = bugPosition.x + (index % 100) * 10;
        const y = bugPosition.y + Math.floor(index / 100) * 10;
        ctx.fillText(char, x, y);
      });
      drawCharacterOnCanvas(ctx, position, selectedColor, userSeqIndex, false);
      drawHeartsOnCanvas(ctx, heartCount);
      // show egg count on the top right corner
      ctx.font = "24px Perfect DOS";
      ctx.fillStyle = "white";
      ctx.fillText(eggsCollected.toString(), 380, 20);
    },
    [
      alpha,
      asciiChars,
      bugPosition.x,
      bugPosition.y,
      eggsCollected,
      frame,
      handleIsOutOfBound,
      handleUserInput,
      heartCount,
      isOutOfBound,
      isPlayerCollidingWithBug,
      map,
      npcs,
      position,
      selectedColor,
      setHeartCount,
      setUserSeqIndex,
      updateNPC,
      userInput.length,
      userSeqIndex,
    ]
  );
};
