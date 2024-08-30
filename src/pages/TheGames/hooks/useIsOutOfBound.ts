import { useCallback } from "react";
import { Tile } from "../assets/tile";
import { NonPlayerCharacter } from "./useNPCsState";
import { nightSky, Star } from "../assets/nightsky";

export const useIsOutOfBound = ({
  position,
  setPosition,
  npcs,
  updateNPCs,
  setMap,
  createMap,
}: {
  position: { x: number; y: number };
  setPosition: React.Dispatch<
    React.SetStateAction<{
      x: number;
      y: number;
    }>
  >;
  npcs: NonPlayerCharacter[];
  updateNPCs: (npcs: NonPlayerCharacter[]) => void;
  setMap: (map: Star[]) => void;
  createMap: (width: number, height: number) => Star[];
}) => {
  return useCallback(() => {
    setMap(nightSky());
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
          x: xOrY === "x" ? Math.floor(Math.random() * 400) : headOrTail,
          y: xOrY === "y" ? Math.floor(Math.random() * 400) : headOrTail,
        },
        mood: "wandering",
      };
    });

    updateNPCs(newNPCsPostions);
  }, [position, setPosition, npcs, updateNPCs, setMap]);
};
