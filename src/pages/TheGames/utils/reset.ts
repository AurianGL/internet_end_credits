import { createMap } from "../assets/tile";
import { NonPlayerCharacter } from "../hooks/useNPCsState";
import { Phase } from "../hooks/useGameState";

interface ResetProps {
  setHeartCount: React.Dispatch<React.SetStateAction<number>>;
  setGamePhase: (phase: Phase) => void;
  setMap: React.Dispatch<React.SetStateAction<any>>;
  setPosition: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>;
  npcs: NonPlayerCharacter[];
  updateNPCs: (npcs: NonPlayerCharacter[]) => void;
  resetEgg: () => void;
}

export const reset = ({
  setHeartCount,
  setGamePhase,
  setMap,
  setPosition,
  npcs,
  updateNPCs,
  resetEgg,
}: ResetProps) => {
  setHeartCount(3);
  setGamePhase("exploration");
  setMap(createMap(400, 400));
  setPosition({ x: 200, y: 200 });
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
  resetEgg();
};
